'use client'

import { Lock } from 'lucide-react'
import { COUNTRIES, PREVIEW_VISIBLE } from '@/lib/book-data'
import { useBuy } from './buy'

function LockOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-b-lg bg-white/40 backdrop-blur-[6px]">
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white shadow-md">
        <Lock className="h-5 w-5 text-stone-600" aria-hidden />
      </span>
      <p className="mt-2 text-xs font-bold text-stone-700">10 more countries inside</p>
    </div>
  )
}

function BlurredRows({
  rows,
  header,
  isUnlocked = false,
}: {
  rows: string[][]
  header: string[]
  isUnlocked?: boolean
}) {
  const visible = isUnlocked ? rows : rows.slice(0, PREVIEW_VISIBLE)
  const hidden = isUnlocked ? [] : rows.slice(PREVIEW_VISIBLE)
  return (
    <div className="overflow-hidden rounded-lg border border-stone-200 text-xs">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-stone-50 text-left text-[10px] uppercase tracking-wide text-stone-400">
            {header.map((h) => (
              <th key={h} className="px-3 py-2 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visible.map((row) => (
            <tr key={row[0]} className="border-t border-stone-100 bg-white">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-3 py-2 ${
                    ci === 0 ? 'font-semibold text-stone-700' : 'text-stone-500'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!isUnlocked && hidden.length > 0 && (
        <div className="relative">
          <table className="w-full border-collapse">
            <tbody>
              {hidden.map((row) => (
                <tr key={row[0]} className="border-t border-stone-100 bg-white">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-3 py-2 ${
                        ci === 0 ? 'font-semibold text-stone-700' : 'text-stone-500'
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <LockOverlay />
        </div>
      )}
    </div>
  )
}

export function Preview() {
  const { handleBuy, isPaid, downloadBook } = useBuy()

  const changes = COUNTRIES.map((c) => [c.name, c.change])
  const glance = COUNTRIES.map((c) => [c.name, c.tuition, c.stayBack])

  return (
    <section id="preview" className="mx-auto max-w-6xl bg-paper px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
        Preview before you buy
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-stone-500 md:text-base">
        Real pages from the book. The full version has all 15 countries, every
        row, and the 12-month checklist.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Card 1 — 2027 changes */}
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-xl shadow-stone-900/5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900">
              2027 changes at a glance
            </h3>
            {isPaid && (
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                UNLOCKED
              </span>
            )}
          </div>
          <div className="mt-4">
            <BlurredRows
              header={['Country', 'What changed for 2027']}
              rows={changes}
              isUnlocked={isPaid}
            />
          </div>
          <ul className="mt-5 space-y-2">
            <li className="flex items-start gap-2 text-xs text-stone-500">
              <span className="mt-[6px] h-1.5 w-1.5 flex-none rounded-full bg-brand" aria-hidden />
              Every visa &amp; fee change, explained country-by-country
            </li>
            <li className="flex items-start gap-2 text-xs text-stone-500">
              <span className="mt-[6px] h-1.5 w-1.5 flex-none rounded-full bg-brand" aria-hidden />
              What each change means for Indian applicants
            </li>
          </ul>
        </div>

        {/* Card 2 — all countries */}
        <div className="flex flex-col">
          <div className="flex-1 rounded-2xl border border-stone-100 bg-white p-6 shadow-xl shadow-stone-900/5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-stone-900">
                All 15 countries at a glance
              </h3>
              {isPaid && (
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                  UNLOCKED
                </span>
              )}
            </div>
            <div className="mt-4">
              <BlurredRows
                header={['Country', 'Tuition / yr', 'Stay-back']}
                rows={glance}
                isUnlocked={isPaid}
              />
            </div>
          </div>
          {isPaid ? (
            <button
              onClick={downloadBook}
              className="bg-cta mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl py-4 px-8 text-base sm:text-lg font-extrabold text-white shadow-xl shadow-stone-900/20 transition-all hover:brightness-110 hover:scale-[1.01] active:scale-[0.99]"
            >
              Download Complete E-Book PDF
            </button>
          ) : (
            <button
              onClick={handleBuy}
              className="bg-cta mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl py-4 px-8 text-base sm:text-lg font-extrabold text-white shadow-xl shadow-stone-900/20 transition-all hover:brightness-110 hover:scale-[1.01] active:scale-[0.99]"
            >
              Unlock the full book Rs 251
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
