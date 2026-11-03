'use client'

import { createContext, useCallback, useContext, useState } from 'react'

// ── Single buy handler: every Buy button on the page calls this ──
// Razorpay checkout will be wired here later; nothing else changes.
const BuyContext = createContext<() => void>(() => {})

export const useBuy = () => useContext(BuyContext)

export function BuyProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)

  const handleBuy = useCallback(() => {
    // TODO: open Razorpay checkout here (UPI, cards, net banking)
    setVisible(true)
    window.setTimeout(() => setVisible(false), 3800)
  }, [])

  return (
    <BuyContext.Provider value={handleBuy}>
      {children}
      <div
        aria-live="polite"
        className={`pointer-events-none fixed bottom-24 left-1/2 z-[60] w-max max-w-[92vw] -translate-x-1/2 rounded-xl bg-navy px-5 py-3 text-center text-sm font-medium text-white shadow-2xl ring-1 ring-white/15 transition-all duration-300 md:bottom-10 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        }`}
      >
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-brand align-middle" />
        Razorpay checkout is being wired up — UPI, cards & net banking.
      </div>
    </BuyContext.Provider>
  )
}
