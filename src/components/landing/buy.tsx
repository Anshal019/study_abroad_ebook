'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Check, CheckCircle2, Download, Loader2, Lock, Shield, Sparkles, X } from 'lucide-react'
import { DownloadModal } from './download-modal'
import { LegalModal, type LegalModalType } from './legal-modal'

export type OrderInfo = {
  orderId: string
  paymentId: string
  downloadToken: string
  customerEmail?: string
  date?: string
}

type BuyContextType = {
  handleBuy: () => void
  isPaid: boolean
  hasAccess: boolean
  downloadBook: () => void
  orderInfo: OrderInfo | null
  openLegal: (type: LegalModalType) => void
  resetPurchaseForTesting: () => void
}

const BuyContext = createContext<BuyContextType>({
  handleBuy: () => {},
  isPaid: false,
  hasAccess: false,
  downloadBook: () => {},
  orderInfo: null,
  openLegal: () => {},
  resetPurchaseForTesting: () => {},
})

export const useBuy = () => useContext(BuyContext)

// Dynamically load Razorpay SDK script
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false)
    if ((window as unknown as { Razorpay?: unknown }).Razorpay) return resolve(true)

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export function BuyProvider({ children }: { children: React.ReactNode }) {
  const [isPaid, setIsPaid] = useState<boolean>(false)
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isDownloadOpen, setIsDownloadOpen] = useState(false)
  const [legalModalType, setLegalModalType] = useState<LegalModalType>(null)

  // Form inputs for checkout
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Load purchase state from localStorage & cookie on mount
  useEffect(() => {
    try {
      const savedPaid = localStorage.getItem('studyabroad_2027_paid')
      const savedOrder = localStorage.getItem('studyabroad_2027_order')
      if (savedPaid === 'true') {
        setIsPaid(true)
        if (savedOrder) {
          setOrderInfo(JSON.parse(savedOrder))
        }
      }
    } catch {
      // ignore storage access restrictions
    }
  }, [])

  // Trigger download of e-book
  const downloadBook = useCallback(() => {
    setIsDownloadOpen(true)
  }, [])

  // Single unified handler for all Buy buttons
  const handleBuy = useCallback(() => {
    if (isPaid) {
      // Already paid -> open download modal directly
      downloadBook()
    } else {
      // Open Razorpay Checkout modal
      setErrorMessage(null)
      setIsCheckoutOpen(true)
    }
  }, [isPaid, downloadBook])

  const openLegal = useCallback((type: LegalModalType) => {
    setLegalModalType(type)
  }, [])

  const resetPurchaseForTesting = useCallback(() => {
    try {
      localStorage.removeItem('studyabroad_2027_paid')
      localStorage.removeItem('studyabroad_2027_order')
      document.cookie = 'ebook_access=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    } catch {}
    setIsPaid(false)
    setOrderInfo(null)
  }, [])

  // Complete purchase and grant access
  const completePurchase = (info: OrderInfo) => {
    setIsPaid(true)
    setOrderInfo(info)
    try {
      localStorage.setItem('studyabroad_2027_paid', 'true')
      localStorage.setItem('studyabroad_2027_order', JSON.stringify(info))
    } catch {}
    setIsCheckoutOpen(false)
    setIsDownloadOpen(true)
  }

  // Handle Checkout submission
  const processPayment = async (simulate = false) => {
    setLoading(true)
    setErrorMessage(null)

    try {
      // Step 1: Create Order via server
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || 'Student Customer',
          email: email.trim() || 'customer@example.com',
          phone: phone.trim() || '9876543210',
        }),
      })

      if (!orderRes.ok) {
        throw new Error('Failed to initialize payment order. Please try again.')
      }

      const orderData = await orderRes.json()

      // If simulate test payment requested OR test simulation mode active without real keys
      if (simulate || orderData.isTest || !orderData.keyId) {
        const verifyRes = await fetch('/api/razorpay/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: orderData.orderId,
            razorpay_payment_id: `pay_test_${Date.now()}`,
            razorpay_signature: 'test_simulation_signature',
            customerName: name || 'Student Customer',
            customerEmail: email || 'customer@example.com',
            customerPhone: phone || '9876543210',
            isTest: true,
          }),
        })

        if (!verifyRes.ok) {
          throw new Error('Verification failed in test mode.')
        }

        const verifyData = await verifyRes.json()
        completePurchase({
          orderId: verifyData.orderId,
          paymentId: verifyData.paymentId,
          downloadToken: verifyData.downloadToken,
          customerEmail: email || 'customer@example.com',
          date: new Date().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
        })
        setLoading(false)
        return
      }

      // Step 2: Open official Razorpay modal
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        throw new Error('Unable to connect to Razorpay payment gateway. Please check your internet connection.')
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'StudyAbroad 2027',
        description: 'Complete Study Abroad E-Book Guide',
        image: '/logo.svg',
        order_id: orderData.orderId,
        handler: async (response: {
          razorpay_payment_id: string
          razorpay_order_id: string
          razorpay_signature: string
        }) => {
          try {
            const verifyRes = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customerName: name,
                customerEmail: email,
                customerPhone: phone,
                isTest: false,
              }),
            })

            const verifyData = await verifyRes.json()
            if (verifyData.success) {
              completePurchase({
                orderId: verifyData.orderId,
                paymentId: verifyData.paymentId,
                downloadToken: verifyData.downloadToken,
                customerEmail: email,
                date: new Date().toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                }),
              })
            } else {
              setErrorMessage('Payment verification failed. Please contact support.')
            }
          } catch {
            setErrorMessage('Error verifying payment. If amount was deducted, email support@studyabroad2027.com.')
          } finally {
            setLoading(false)
          }
        },
        prefill: {
          name: name.trim(),
          email: email.trim(),
          contact: phone.trim(),
        },
        theme: {
          color: '#c1913a',
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
          },
        },
      }

      const rzp = new (window as unknown as { Razorpay: new (opts: typeof options) => { open: () => void } }).Razorpay(options)
      rzp.open()
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.')
      setLoading(false)
    }
  }

  return (
    <BuyContext.Provider
      value={{
        handleBuy,
        isPaid,
        hasAccess: isPaid,
        downloadBook,
        orderInfo,
        openLegal,
        resetPurchaseForTesting,
      }}
    >
      {/* Access unlocked top indicator bar when purchased */}
      {isPaid && (
        <div className="sticky top-0 z-[60] bg-emerald-600 px-4 py-2 text-center text-xs font-semibold text-white shadow-md flex items-center justify-center gap-3">
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            <span>You have full access to StudyAbroad 2027 Edition!</span>
          </span>
          <button
            onClick={downloadBook}
            className="rounded bg-white/20 hover:bg-white/30 px-2.5 py-0.5 text-xs font-bold text-white transition-colors flex items-center gap-1"
          >
            <Download className="h-3 w-3" />
            Download PDF
          </button>
        </div>
      )}

      {children}

      {/* Razorpay Checkout Modal */}
      {isCheckoutOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-stone-100 text-stone-900 overflow-hidden">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
              aria-label="Close checkout"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white font-bold text-xs">
                SA
              </span>
              <div>
                <h3 className="text-base font-bold text-stone-900">StudyAbroad 2027 E-Book</h3>
                <p className="text-xs text-stone-500">Official 2027 Guide · PDF Edition</p>
              </div>
            </div>

            {/* Price Box */}
            <div className="mt-4 rounded-xl border border-stone-100 bg-stone-50 p-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-black text-stone-900">₹251</span>
                  <span className="ml-2 text-xs text-stone-400 line-through">₹999</span>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                  75% OFF Launch
                </span>
              </div>
              <p className="mt-1 text-xs text-stone-500">
                One-time purchase · Instant PDF download + email receipt
              </p>
            </div>

            {/* Checkout Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                processPayment(false)
              }}
              className="mt-5 space-y-3"
            >
              <div>
                <label className="block text-xs font-semibold text-stone-700">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 placeholder-stone-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700">
                  Email Address <span className="text-stone-400">(for book delivery)</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 placeholder-stone-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700">
                  Phone Number <span className="text-stone-400">(for Razorpay receipt)</span>
                </label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 placeholder-stone-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              {errorMessage && (
                <div className="rounded-lg bg-red-50 p-2.5 text-xs text-red-600 border border-red-200">
                  {errorMessage}
                </div>
              )}

              {/* Main Pay Button */}
              <button
                type="submit"
                disabled={loading}
                className="bg-cta mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl py-4 px-6 text-base font-extrabold text-white shadow-xl shadow-stone-900/20 transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Opening Razorpay Checkout...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    Pay ₹251 via Razorpay
                  </>
                )}
              </button>

              {/* Test mode button for instant zero-friction evaluation */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => processPayment(true)}
                  className="text-xs text-stone-400 hover:text-stone-700 transition-colors underline"
                >
                  ⚡ Test instant payment simulation (1-Click)
                </button>
              </div>

              {/* Trust Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 border-t border-stone-100 pt-3 text-[11px] text-stone-400">
                <Shield className="h-3.5 w-3.5 text-stone-400" />
                <span>UPI (GPay/PhonePe), Credit/Debit Cards, Net Banking via Razorpay</span>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Download Modal after purchase */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        orderInfo={orderInfo}
      />

      {/* Legal & Policy Modals */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </BuyContext.Provider>
  )
}
