'use client'

import { CheckCircle2, Lock } from 'lucide-react'
import { PRICING_CHECKLIST } from '@/lib/book-data'
import { BookCover } from './book-cover'
import { useBuy } from './buy'

export function Pricing() {
  const { handleBuy, isPaid, downloadBook } = useBuy()

  return (
    <section className="bg-paper px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
          Get the book
        </h2>

        <div className="mt-8 grid items-center gap-10 rounded-2xl border border-stone-100 bg-white p-6 shadow-xl shadow-stone-900/5 md:grid-cols-[auto_1fr] md:p-10">
          {/* book mockup */}
          <div className="flex justify-center">
            <BookCover size="sm" />
          </div>

          {/* price + checklist */}
          <div>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-4xl font-extrabold tracking-tight text-stone-900">
                Rs 251
              </span>
              <span className="text-sm font-medium text-stone-400">one-time</span>
              <span className="text-lg font-semibold text-stone-400 line-through">
                Rs 999
              </span>
            </div>

            <ul className="mt-6 space-y-3">
              {PRICING_CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-[18px] w-[18px] flex-none text-brand"
                    aria-hidden
                  />
                  <span className="text-sm text-stone-600">{item}</span>
                </li>
              ))}
            </ul>

            {isPaid ? (
              <button
                onClick={downloadBook}
                className="bg-cta mt-8 flex w-full items-center justify-center gap-3 rounded-xl py-4 sm:py-5 px-8 text-lg sm:text-xl font-extrabold text-white shadow-xl shadow-stone-900/20 transition-all hover:brightness-110 hover:scale-[1.01] active:scale-[0.99]"
              >
                Download E-Book (PDF)
              </button>
            ) : (
              <button
                onClick={handleBuy}
                className="bg-cta mt-8 flex w-full items-center justify-center gap-3 rounded-xl py-4 sm:py-5 px-8 text-lg sm:text-xl font-extrabold text-white shadow-xl shadow-stone-900/20 transition-all hover:brightness-110 hover:scale-[1.01] active:scale-[0.99]"
              >
                Buy Rs 251 — Instant Access
              </button>
            )}
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-stone-400">
              <Lock className="h-3.5 w-3.5" aria-hidden />
              Secure payment via Razorpay: UPI, cards, net banking
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
