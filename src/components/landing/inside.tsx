'use client'

import { useState } from 'react'
import { ChevronDown, Sparkles } from 'lucide-react'
import {
  APPENDICES,
  COUNTRIES,
  COUNTRY_TOPICS,
  START_CHAPTERS,
} from '@/lib/book-data'
import { DottedMap } from './dotted-map'

const STATS = [
  { n: '74', label: 'pages' },
  { n: '15', label: 'countries' },
  { n: '12', label: 'months checklist' },
  { n: '6', label: 'planning chapters' },
]

const TABS = [
  { key: 'start', label: 'Start here', sub: '6 general chapters' },
  { key: 'countries', label: '15 country chapters', sub: '12 topics each' },
  { key: 'appendix', label: 'Appendices', sub: '5 practical tools' },
] as const

type TabKey = (typeof TABS)[number]['key']

// ── Floating stats card ──────────────────────────────────────
function StatsCard() {
  return (
    <div className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-4xl grid-cols-2 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-900/5 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`p-6 text-center border-slate-100 ${
              i === 0 ? 'border-r border-b md:border-b-0' : ''
            } ${i === 1 ? 'border-b md:border-b-0 md:border-r' : ''} ${
              i === 2 ? 'border-r' : ''
            }`}
          >
            <p className="text-3xl font-extrabold tracking-tight text-slate-900">
              {s.n}
            </p>
            <p className="mt-1 text-xs font-medium text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Country card with popover ────────────────────────────────
function CountryCard({
  code,
  name,
  align,
  open,
  onToggle,
}: {
  code: string
  name: string
  align: 'left' | 'right'
  open: boolean
  onToggle: () => void
}) {
  const [hover, setHover] = useState(false)
  const show = hover || open
  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="w-full rounded-xl border border-slate-200 bg-white p-3 shadow-sm outline-none transition-all hover:border-brand hover:bg-brand-50 focus-visible:ring-2 focus-visible:ring-brand"
      >
        <img
          src={`/flags/${code}.svg`}
          alt={`${name} flag`}
          loading="lazy"
          className="mx-auto h-10 w-[54px] rounded-md border border-slate-200 object-cover"
        />
        <p className="mt-2.5 text-center text-sm font-semibold text-slate-700">
          {name}
        </p>
      </button>

      {/* popover — below the card, edge-aligned on mobile, centered from sm up */}
      <div
        role="tooltip"
        className={`absolute top-full z-40 mt-3 w-64 rounded-xl bg-navy p-4 text-left shadow-2xl transition-opacity duration-200 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 ${
          align === 'left' ? 'left-0 right-auto' : 'left-auto right-0'
        } ${
          show
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <img
              src={`/flags/${code}.svg`}
              alt=""
              aria-hidden
              className="h-4 w-[22px] rounded-[3px] object-cover"
            />
            <p className="text-sm font-bold text-white">{name}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-white" aria-hidden />
        </div>
        <p className="mt-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
          Topics covered
        </p>
        <ul className="mt-2 grid grid-cols-1 gap-1.5">
          {COUNTRY_TOPICS.map((t) => (
            <li key={t} className="flex items-start gap-1.5 text-[11px] leading-4 text-slate-300">
              <span className="mt-[5px] h-1 w-1 flex-none rounded-full bg-brand" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
        <div
          aria-hidden
          className={`absolute -top-1.5 h-3 w-3 rotate-45 rounded-[2px] bg-navy sm:left-1/2 sm:-ml-1.5 ${
            align === 'left' ? 'left-5' : 'right-5'
          }`}
        />
      </div>
    </div>
  )
}

// ── Section ──────────────────────────────────────────────────
export function WhatsInside() {
  const [tab, setTab] = useState<TabKey>('countries')
  const [openCard, setOpenCard] = useState<string | null>(null)

  return (
    <div className="relative bg-white">
      {/* faint dotted world map, top-right */}
      <DottedMap
        className="pointer-events-none absolute -top-6 right-0 hidden text-slate-400 opacity-[0.08] lg:block"
      />

      <StatsCard />

      <section id="inside" className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          What&apos;s inside
        </h2>

        {/* segmented tabs */}
        <div className="mt-6 inline-flex max-w-full flex-col gap-0.5 rounded-xl bg-slate-100 p-1 sm:flex-row">
          {TABS.map((t) => {
            const active = tab === t.key
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 rounded-lg px-4 py-2 text-left transition-all sm:text-center ${
                  active
                    ? 'border-b-2 border-brand bg-white shadow-sm'
                    : 'border-b-2 border-transparent hover:text-slate-700'
                }`}
              >
                <span
                  className={`block whitespace-nowrap text-sm font-semibold ${
                    active ? 'text-slate-900' : 'text-slate-500'
                  }`}
                >
                  {t.label}
                </span>
                <span
                  className={`block whitespace-nowrap text-[11px] ${
                    active ? 'text-slate-400' : 'text-slate-400'
                  }`}
                >
                  {t.sub}
                </span>
              </button>
            )
          })}
        </div>

        {/* tab content */}
        <div className="mt-8">
          {tab === 'start' && (
            <div className="grid gap-3 sm:grid-cols-2">
              {START_CHAPTERS.map((c) => (
                <div
                  key={c.n}
                  className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-brand-50 text-sm font-extrabold text-brand-600">
                    {c.n}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{c.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'countries' && (
            <>
              <div
                id="countries"
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
              >
                {COUNTRIES.map((c, idx) => (
                  <CountryCard
                    key={c.code}
                    code={c.code}
                    name={c.name}
                    align={idx % 2 === 0 ? 'left' : 'right'}
                    open={openCard === c.code}
                    onToggle={() => setOpenCard(openCard === c.code ? null : c.code)}
                  />
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-400 md:hidden">
                Tap a country to see its 12 chapter topics.
              </p>
            </>
          )}

          {tab === 'appendix' && (
            <div className="grid gap-3 sm:grid-cols-2">
              {APPENDICES.map((a) => (
                <div
                  key={a.n}
                  className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-slate-100 text-sm font-extrabold text-slate-600">
                    {a.n}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{a.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* callout */}
        <div className="mt-10 flex items-center gap-3 rounded-xl border border-teal-200 bg-teal-50 px-5 py-4">
          <Sparkles className="h-5 w-5 flex-none text-brand-600" aria-hidden />
          <p className="text-sm font-semibold text-teal-900">
            Every country starts with a 2027 UPDATES box
          </p>
        </div>
      </section>
    </div>
  )
}
