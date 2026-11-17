'use client'

import { useEffect, useState } from 'react'
import { useBuy } from './buy'

// Mobile-only sticky buy bar — appears after scrolling past the hero.
export function StickyBar() {
  const { handleBuy, isPaid, downloadBook } = useBuy()
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
        show ? 'transtone-y-0' : 'transtone-y-full'
      }`}
      aria-hidden={!show}
    >
      <div
        className="flex items-center justify-between px-4 pt-3"
        style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom))' }}
      >
        <p className="text-sm font-bold text-white">
          {isPaid ? 'StudyAbroad 2027' : 'Rs 251'}
          <span className="ml-2 font-medium text-stone-400">
            {isPaid ? '| Full Access' : '| Buy now'}
          </span>
        </p>
        {isPaid ? (
          <button
            onClick={downloadBook}
            tabIndex={show ? 0 : -1}
            className="bg-cta rounded-xl px-7 py-3 text-base font-extrabold text-white shadow-lg shadow-black/30"
          >
            Download PDF
          </button>
        ) : (
          <button
            onClick={handleBuy}
            tabIndex={show ? 0 : -1}
            className="bg-cta rounded-xl px-7 py-3 text-base font-extrabold text-white shadow-lg shadow-black/30"
          >
            Buy now Rs 251
          </button>
        )}
      </div>
    </div>
  )
}
