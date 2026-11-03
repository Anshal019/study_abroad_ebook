'use client'

import { useEffect, useState } from 'react'
import { useBuy } from './buy'

// Mobile-only sticky buy bar — appears after scrolling past the hero.
export function StickyBar() {
  const buy = useBuy()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('top')
      const past = hero ? hero.getBoundingClientRect().bottom < 80 : window.scrollY > 480
      setShow(past)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy transition-transform duration-300 md:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!show}
    >
      <div
        className="flex items-center justify-between px-4 pt-3"
        style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom))' }}
      >
        <p className="text-sm font-bold text-white">
          Rs 251
          <span className="ml-2 font-medium text-slate-400">| one-time</span>
        </p>
        <button
          onClick={buy}
          tabIndex={show ? 0 : -1}
          className="bg-cta rounded-lg px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-black/25"
        >
          Buy now
        </button>
      </div>
    </div>
  )
}
