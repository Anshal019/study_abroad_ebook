'use client'

import { CalendarCheck, CheckCircle2, Download, Globe2 } from 'lucide-react'
import { useBuy } from './buy'
import { BookCover } from './book-cover'
import { FLAG_MARQUEE } from '@/lib/book-data'

const TRUST = [
  { icon: Globe2, label: '15 countries' },
  { icon: CalendarCheck, label: 'Updated Nov 2026' },
  { icon: Download, label: 'Instant PDF download' },
]

export function Hero() {
  const { handleBuy, isPaid, downloadBook } = useBuy()

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
        <div className="grid items-center gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
          {/* left — copy */}
          <div>
            <h1 className="max-w-xl text-[32px] font-extrabold leading-[1.16] tracking-tight text-white sm:text-[38px] lg:max-w-none lg:text-[34px] lg:leading-[1.18] xl:text-[40px]">
              Plan your study abroad 2027
              <br className="hidden lg:block" /> with real, updated numbers
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-stone-300 md:text-lg">
              The complete reference for Indian students — costs, visa
              rules, scholarships and stay-back rights across 15 countries.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {isPaid ? (
                <button
                  onClick={downloadBook}
                  className="bg-cta flex items-center gap-2.5 rounded-xl px-8 py-4 text-base sm:text-lg font-extrabold text-white shadow-xl shadow-black/30 transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="h-5 w-5" />
                  Download E-Book (PDF)
                </button>
              ) : (
                <button
                  onClick={handleBuy}
                  className="bg-cta rounded-xl px-8 py-4 text-base sm:text-lg font-extrabold text-white shadow-xl shadow-black/30 transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get the book Rs 251
                </button>
              )}
              <a
                href="#inside"
                className="rounded-xl border border-white/40 px-7 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
              >
                See what&apos;s inside
              </a>
              {isPaid && (
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
                  <CheckCircle2 className="h-4 w-4" />
                  Full Access Unlocked
                </span>
              )}
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {TRUST.map((t) => (
                <li
                  key={t.label}
                  className="flex items-center gap-1.5 text-xs font-medium text-stone-400"
                >
                  <t.icon className="h-3.5 w-3.5 text-stone-500" aria-hidden />
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
                className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -transtone-x-1/2 -transtone-y-1/2 rounded-full bg-brand/30 blur-[80px]"
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

      {/* flag marquee — sits above the floating stats card so flags stay visible */}
      <div className="relative z-20 border-t border-white/10 bg-navy-deep">
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
