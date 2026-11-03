const GROUPS = [
  {
    title: 'Company',
    links: [
      { label: 'Home', href: '#top' },
      { label: 'About Us', href: '#top' },
      { label: 'Contact Us', href: '#top' },
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
      { label: 'Terms', href: '#top' },
      { label: 'Privacy', href: '#top' },
      { label: 'Refund Policy', href: '#top' },
    ],
  },
]

export function Footer() {
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
                    <a
                      href={l.href}
                      className="text-sm text-stone-400 transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs text-stone-500">
            © 2026 StudyAbroad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
