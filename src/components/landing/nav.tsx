'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useBuy } from './buy'

const LINKS = [
  { label: 'Inside', href: '#inside' },
  { label: 'Countries', href: '#countries' },
  { label: 'Preview', href: '#preview' },
  { label: 'FAQ', href: '#faq' },
]

export function Nav() {
  const buy = useBuy()
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
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={buy}
            className="bg-cta rounded-full px-5 py-2 text-sm font-bold text-white shadow-md shadow-black/20 transition-[filter] hover:brightness-110"
          >
            Buy Rs 251
          </button>
        </div>

        <button
          className="rounded-lg p-2 text-slate-200 hover:bg-white/10 md:hidden"
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
              className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false)
              buy()
            }}
            className="bg-cta mt-2 w-full rounded-lg px-5 py-3 text-sm font-bold text-white"
          >
            Buy Rs 251
          </button>
        </div>
      )}
    </header>
  )
}
