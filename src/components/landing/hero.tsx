'use client'

import { BookOpen, CalendarCheck, Download, Globe2 } from 'lucide-react'
import { useBuy } from './buy'
import { BookCover } from './book-cover'
import { FLAG_MARQUEE } from '@/lib/book-data'

const TRUST = [
  { icon: BookOpen, label: '74 pages' },
  { icon: Globe2, label: '15 countries' },
  { icon: CalendarCheck, label: 'Updated Nov 2026' },
  { icon: Download, label: 'Instant PDF download' },
]

export function Hero() {
  const buy = useBuy()

  return (
    <section id="top" className="relative overflow-hidden bg-navy">
      {/* soft teal glow behind the book */}
      <div
        aria-hidden
        className="absolute -top-10 right-[4%] h-[420px] w-[420px] rounded-full bg-brand/25 blur-[110px]"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-[10%] h-[220px] w-[320px] rounded-full bg-brand/10 blur-[90px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 md:pb-20 md:pt-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          {/* left — copy */}
          <div>
            <h1 className="max-w-xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white md:text-5xl md:leading-[1.1]">
              Plan your study abroad 2027 with real, updated numbers
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-300 md:text-lg">
              The complete 74-page reference for Indian students — costs, visa
              rules, scholarships and stay-back rights across 15 countries.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={buy}
                className="bg-cta rounded-lg px-6 py-3 text-sm font-bold text-white shadow-lg shadow-black/25 transition-[filter] hover:brightness-110"
              >
                Get the book Rs 251
              </button>
              <a
                href="#inside"
                className="rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                See what&apos;s inside
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {TRUST.map((t) => (
                <li
                  key={t.label}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-400"
                >
                  <t.icon className="h-3.5 w-3.5 text-slate-500" aria-hidden />
                  {t.label}
                </li>
              ))}
            </ul>
          </div>

          {/* right — 3D book */}
          <div className="relative flex justify-center lg:justify-end lg:pr-10">
            <div className="relative">
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/30 blur-[80px]"
              />
              <BookCover />
              {/* drop shadow */}
              <div
                aria-hidden
                className="animate-floaty-shadow mx-auto mt-6 h-5 w-44 rounded-[100%] bg-black/60 blur-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* flag marquee */}
      <div className="relative border-t border-white/10 bg-navy-deep">
        <div className="marquee-mask overflow-hidden py-3.5">
          <div className="animate-marquee flex w-max items-center gap-7 pr-7">
            {[...FLAG_MARQUEE, ...FLAG_MARQUEE].map((c, i) => (
              <img
                key={`${c.code}-${i}`}
                src={`/flags/${c.code}.svg`}
                alt=""
                aria-hidden={i >= FLAG_MARQUEE.length}
                loading="lazy"
                className="h-6 w-8 flex-none rounded-[4px] border border-white/15 object-cover shadow-sm"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
