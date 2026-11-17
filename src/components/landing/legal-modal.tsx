'use client'

import { X } from 'lucide-react'

export type LegalModalType = 'terms' | 'privacy' | 'refund' | 'contact' | 'about' | null

interface LegalModalProps {
  type: LegalModalType
  onClose: () => void
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-white text-stone-800 shadow-2xl border border-stone-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4 bg-stone-50/70">
          <h2 className="text-lg font-bold text-stone-900">
            {type === 'terms' && 'Terms and Conditions'}
            {type === 'privacy' && 'Privacy Policy'}
            {type === 'refund' && 'Refund and Cancellation Policy'}
            {type === 'contact' && 'Contact Support'}
            {type === 'about' && 'About StudyAbroad 2027'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-200/60 hover:text-stone-700 transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto px-6 py-6 text-sm leading-relaxed text-stone-600 space-y-4">
          {type === 'terms' && (
            <>
              <p className="font-semibold text-stone-900">Last updated: November 2026</p>
              <p>
                Welcome to StudyAbroad 2027. By purchasing or using the StudyAbroad 2027 E-Book
                and website, you agree to comply with and be bound by the following terms.
              </p>
              <h3 className="font-bold text-stone-800 pt-2">1. Digital License</h3>
              <p>
                Upon completing payment of Rs 251, you are granted a non-exclusive, non-transferable,
                personal license to download, read, and print the StudyAbroad 2027 PDF guide for your
                own educational planning purposes. Unauthorized reselling, commercial redistribution,
                or public sharing is strictly prohibited.
              </p>
              <h3 className="font-bold text-stone-800 pt-2">2. Information Nature</h3>
              <p>
                StudyAbroad 2027 is an independent informational guide. We do not provide admission
                filing, immigration advice, or visa sponsorship. University fees, currency exchange
                rates, and embassy rules evolve; readers should always verify final requirements on
                official portals before making financial commitments.
              </p>
            </>
          )}

          {type === 'privacy' && (
            <>
              <p className="font-semibold text-stone-900">Last updated: November 2026</p>
              <p>
                Your privacy is of utmost importance to us. This policy details how we collect and
                safeguard your information.
              </p>
              <h3 className="font-bold text-stone-800 pt-2">1. Information We Collect</h3>
              <p>
                When you purchase the e-book, we collect your name, email address, and phone number
                solely to process the transaction, issue your digital invoice, and deliver your PDF
                download link.
              </p>
              <h3 className="font-bold text-stone-800 pt-2">2. Payment Security</h3>
              <p>
                All online payments are securely processed through Razorpay. We do not store, view,
                or possess access to your Credit/Debit Card numbers, UPI PINs, or banking passwords.
              </p>
              <h3 className="font-bold text-stone-800 pt-2">3. No Spam</h3>
              <p>
                We do not sell, rent, or trade your contact details with educational loan agents,
                consultancies, or third parties.
              </p>
            </>
          )}

          {type === 'refund' && (
            <>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-emerald-900">
                <p className="font-bold">7-Day 100% Money-Back Guarantee</p>
                <p className="mt-1 text-xs text-emerald-800">
                  If the guide does not deliver practical value for your 2027 study abroad planning,
                  we will refund you in full. No questions asked.
                </p>
              </div>
              <h3 className="font-bold text-stone-800 pt-2">How to Request a Refund</h3>
              <p>
                To initiate a refund, simply send an email to{' '}
                <a
                  href="mailto:support@studyabroad2027.com"
                  className="font-semibold text-brand underline"
                >
                  support@studyabroad2027.com
                </a>{' '}
                within 7 days of purchase. Include your Order ID or the email address used during checkout.
              </p>
              <p>
                Refunds are processed through Razorpay directly back to your original payment method
                (UPI, card, or net banking) within 3 to 5 business days.
              </p>
            </>
          )}

          {type === 'contact' && (
            <>
              <p>
                Have a question about the guide, need help downloading your file, or want to share feedback?
                Our team is here to assist you.
              </p>
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-2">
                <p>
                  <span className="font-semibold text-stone-900">Email:</span>{' '}
                  <a
                    href="mailto:support@studyabroad2027.com"
                    className="font-semibold text-brand underline"
                  >
                    support@studyabroad2027.com
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-stone-900">Response Window:</span> Within 24
                  hours (Monday through Saturday, 9:00 AM – 7:00 PM IST)
                </p>
                <p>
                  <span className="font-semibold text-stone-900">Payment Gateway Queries:</span>{' '}
                  Supported via Razorpay Merchant Desk
                </p>
              </div>
            </>
          )}

          {type === 'about' && (
            <>
              <p>
                StudyAbroad 2027 is an independent editorial publication designed specifically for
                Indian students, parents, and working professionals planning international degrees.
              </p>
              <p>
                We do not take commissions from universities or student-loan lenders. Every number,
                living cost estimate, and visa rule in this guide is derived directly from official
                consular bulletins and verified government databases.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-stone-100 px-6 py-3.5 bg-stone-50 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-stone-900 px-5 py-2 text-sm font-semibold text-white hover:bg-stone-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
