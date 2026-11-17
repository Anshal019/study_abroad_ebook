'use client'

import { useBuy } from './buy'
import type { LegalModalType } from './legal-modal'

type LinkItem = {
  label: string
  href?: string
  modal?: LegalModalType
}

const GROUPS: { title: string; links: LinkItem[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'Home', href: '#top' },
      { label: 'About Us', modal: 'about' },
      { label: 'Contact Us', modal: 'contact' },
    ],
  },
  {
    title: 'Inside',
    links: [
      { label: 'Countries', href: '#countries' },
      { label: 'Preview', href: '#preview' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms', modal: 'terms' },
      { label: 'Privacy', modal: 'privacy' },
      { label: 'Refund Policy', modal: 'refund' },
    ],
  },
]

export function Footer() {
  const { openLegal } = useBuy()

  return (
    <footer className="mt-auto bg-navy">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-14 sm:px-6 md:pb-12 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <p className="text-sm font-bold text-white">{g.title}</p>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    {l.modal ? (
                      <button
                        type="button"
                        onClick={() => openLegal(l.modal!)}
                        className="text-left text-sm text-stone-400 transition-colors hover:text-white"
                      >
                        {l.label}
                      </button>
                    ) : (
                      <a
                        href={l.href}
                        className="text-sm text-stone-400 transition-colors hover:text-white"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-xs text-stone-500">
            © 2026 StudyAbroad. All rights reserved.
          </p>
          <p className="text-xs text-stone-500">
            Secure Payments Powered by Razorpay · 7-Day Money-Back Guarantee
          </p>
        </div>
      </div>
    </footer>
  )
}
