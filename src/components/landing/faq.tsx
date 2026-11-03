'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQS } from '@/lib/book-data'

export function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="bg-paper-deep/80 px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-stone-100 bg-white px-6 shadow-xl shadow-stone-900/5 md:px-8">
        <h2 className="pt-8 text-2xl font-bold tracking-tight text-stone-900 md:text-3xl md:pt-10">
          FAQ
        </h2>

        <div className="mt-2 divide-y divide-stone-100">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-sm font-semibold text-stone-800 md:text-base">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-none text-stone-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden
                  />
                </button>
                <div
                  className={`grid transition-all duration-200 ${
                    isOpen ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <p className="overflow-hidden pr-8 text-sm leading-relaxed text-stone-500">
                    {f.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
