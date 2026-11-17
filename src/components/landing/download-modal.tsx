'use client'

import { CheckCircle2, Download, ExternalLink, FileText, Lock, Sparkles, X } from 'lucide-react'

interface DownloadModalProps {
  isOpen: boolean
  onClose: () => void
  orderInfo: {
    orderId: string
    paymentId: string
    downloadToken: string
    customerEmail?: string
    date?: string
  } | null
}

export function DownloadModal({ isOpen, onClose, orderInfo }: DownloadModalProps) {
  if (!isOpen) return null

  const token = orderInfo?.downloadToken || 'dl_authorized'
  const downloadUrl = `/api/download?token=${encodeURIComponent(token)}`

  const handleDownload = () => {
    // Trigger download
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = 'StudyAbroad_2027_The_Complete_Book.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 md:p-8 shadow-2xl border border-stone-100 text-stone-900 overflow-hidden">
        {/* Soft background glow */}
        <div
          aria-hidden
          className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-brand-50 blur-3xl pointer-events-none"
        />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-900">
            <Sparkles className="h-3.5 w-3.5 text-brand" />
            Full Access Granted
          </span>

          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-stone-900">
            Thank you for your purchase!
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Your payment of <span className="font-semibold text-stone-800">₹251</span> via Razorpay
            was successfully verified.
          </p>
        </div>

        {/* Ebook details card */}
        <div className="mt-6 rounded-xl border border-stone-200 bg-stone-50/80 p-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-navy text-white shadow-sm">
              <FileText className="h-6 w-6 text-brand" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-stone-900">
                StudyAbroad 2027 — The Complete Book
              </h3>
              <p className="mt-0.5 text-xs text-stone-500">
                PDF Edition · Updated Nov 2026 · All 15 Countries
              </p>
              {orderInfo?.paymentId && (
                <p className="mt-1.5 font-mono text-[11px] text-stone-400">
                  Payment ID: {orderInfo.paymentId}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleDownload}
            className="bg-cta flex w-full items-center justify-center gap-2 rounded-xl py-3.5 px-6 text-base font-bold text-white shadow-lg shadow-stone-900/15 transition-all hover:brightness-110 active:scale-[0.99]"
          >
            <Download className="h-5 w-5" />
            Download E-Book (PDF)
          </button>

          <a
            href={`${downloadUrl}&inline=true`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white py-2.5 px-4 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            Open directly in browser tab
          </a>
        </div>

        {/* Notice */}
        <div className="mt-6 border-t border-stone-100 pt-4 text-center">
          <p className="text-xs text-stone-400">
            {orderInfo?.customerEmail ? (
              <>A receipt and backup download link were sent to <span className="font-semibold text-stone-600">{orderInfo.customerEmail}</span>.</>
            ) : (
              <>Your access has been saved to this browser. You can re-download anytime.</>
            )}
          </p>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
            <Lock className="h-3 w-3 text-stone-400" />
            <span>7-day 100% money-back guarantee · Support: support@studyabroad2027.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}
