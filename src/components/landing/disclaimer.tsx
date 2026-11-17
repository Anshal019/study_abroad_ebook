import { DISCLAIMER } from '@/lib/book-data'

export function Disclaimer() {
  return (
    <section className="bg-paper px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-sm font-bold uppercase tracking-wide text-stone-500">
          Honest disclaimer
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-stone-500">{DISCLAIMER}</p>
      </div>
    </section>
  )
}
