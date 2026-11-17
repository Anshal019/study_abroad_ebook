import { GraduationCap, Scale, ShieldCheck } from 'lucide-react'
import { AUDIENCES } from '@/lib/book-data'

const ICONS = {
  student: GraduationCap,
  parent: ShieldCheck,
  comparer: Scale,
} as const

export function Audience() {
  return (
    <section className="bg-paper-deep/80 px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
          Who is this for
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {AUDIENCES.map((a) => {
            const Icon = ICONS[a.icon as keyof typeof ICONS]
            return (
              <div
                key={a.title}
                className="rounded-xl border border-stone-100 bg-white p-6 shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
                  <Icon className="h-5 w-5 text-brand-600" aria-hidden />
                </span>
                <p className="mt-4 text-base font-bold text-stone-900">{a.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-500">{a.line}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
