'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { CHIP_RANKS, CHIPS, COUNTRIES, factFor, type ChipKey } from '@/lib/book-data'

type Result = { code: string; name: string; fact: string }

function computeResults(selected: ChipKey[]): Result[] {
  if (selected.length === 0) return []
  const byName = new Map(COUNTRIES.map((c) => [c.name, c]))
  const score = new Map<string, { score: number; fact: string }>()

  for (const key of selected) {
    CHIP_RANKS[key].forEach((name, rank) => {
      const c = byName.get(name)
      if (!c) return
      const prev = score.get(name)
      const gain = selected.length - rank * 0.1 // earlier rank = stronger
      if (prev) {
        prev.score += gain
      } else {
        score.set(name, { score: gain, fact: factFor(c, key) })
      }
    })
  }

  return [...score.entries()]
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 4)
    .map(([name, v]) => ({ code: byName.get(name)!.code, name, fact: v.fact }))
}

export function Picker() {
  const [selected, setSelected] = useState<Set<ChipKey>>(new Set(['stayback']))

  const toggle = (key: ChipKey) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const results = computeResults([...selected])

  return (
    <section className="bg-slate-50/80 px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-900/5 md:p-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Pick the right country
        </h2>
        <p className="mt-2 text-sm text-slate-500 md:text-base">
          Tick what matters to you — see where the book sends you first.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {CHIPS.map((chip) => {
            const active = selected.has(chip.key)
            return (
              <button
                key={chip.key}
                onClick={() => toggle(chip.key)}
                aria-pressed={active}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-semibold transition-all ${
                  active
                    ? 'border-brand bg-teal-50 text-teal-900 shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span
                  className={`flex h-5 w-5 flex-none items-center justify-center rounded-md border transition-colors ${
                    active ? 'border-brand bg-brand text-white' : 'border-slate-300 bg-white'
                  }`}
                  aria-hidden
                >
                  {active && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
                {chip.label}
              </button>
            )
          })}
        </div>

        <div className="mt-6">
          {results.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-center text-sm text-slate-400">
              Tick a filter above to see the top matches.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {results.map((r, i) => (
                <div
                  key={r.name}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <img
                    src={`/flags/${r.code}.svg`}
                    alt={`${r.name} flag`}
                    loading="lazy"
                    className="h-8 w-11 flex-none rounded border border-slate-200 object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900">
                      {r.name}
                      {i === 0 && (
                        <span className="ml-2 rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-brand-600">
                          TOP PICK
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-slate-500" title={r.fact}>
                      {r.fact}
                    </p>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 flex-none text-brand" aria-hidden />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
