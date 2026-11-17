'use client'

import { useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { useBuy } from './buy'

const LINKS = [
  { label: 'Inside', href: '#inside' },
  { label: 'Countries', href: '#countries' },
  { label: 'Preview', href: '#preview' },
  { label: 'FAQ', href: '#faq' },
]

export function Nav() {
  const { handleBuy, isPaid, downloadBook } = useBuy()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-navy/90">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-baseline gap-1.5">
          <span className="text-lg font-extrabold tracking-tight text-white">
            StudyAbroad
          </span>
          <span className="text-lg font-extrabold tracking-tight text-saffron">2027</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-stone-300 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          {isPaid ? (
            <button
              onClick={downloadBook}
              className="bg-cta flex items-center gap-2 rounded-full px-6 py-2.5 text-base font-extrabold text-white shadow-lg shadow-black/25 transition-all hover:brightness-110 hover:scale-105 active:scale-95"
            >
              <Download className="h-4 w-4" />
              Download E-Book
            </button>
          ) : (
            <button
              onClick={handleBuy}
              className="bg-cta rounded-full px-6 py-2.5 text-base font-extrabold text-white shadow-lg shadow-black/25 transition-all hover:brightness-110 hover:scale-105 active:scale-95"
            >
              Buy Rs 251
            </button>
          )}
        </div>

        <button
          className="rounded-lg p-2 text-stone-200 hover:bg-white/10 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-navy px-4 pb-4 pt-2 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-medium text-stone-300 hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          {isPaid ? (
            <button
              onClick={() => {
                setOpen(false)
                downloadBook()
              }}
              className="bg-cta mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 px-6 text-base font-extrabold text-white shadow-lg shadow-black/20"
            >
              <Download className="h-4 w-4" />
              Download E-Book (PDF)
            </button>
          ) : (
            <button
              onClick={() => {
                setOpen(false)
                handleBuy()
              }}
              className="bg-cta mt-3 w-full rounded-xl py-3.5 px-6 text-base font-extrabold text-white shadow-lg shadow-black/20"
            >
              Buy Rs 251
            </button>
          )}
        </div>
      )}
    </header>
  )
}
