"""Re-theme landing components to the book-cover-derived warm palette.
Mechanical class swaps; structural token edits live in globals.css."""
import pathlib
import re

landing = pathlib.Path('/home/z/my-project/src/components/landing')
files = sorted(landing.glob('*.tsx')) + [pathlib.Path('/home/z/my-project/src/app/page.tsx')]

# ordered swaps: specific first, generic last
swaps = [
    # alternating sections -> deeper cream
    ('bg-slate-50/80', 'bg-paper-deep/80'),
    # teal washes -> gold washes
    ('text-teal-900', 'text-brand-900'),
    ('shadow-teal-900/20', 'shadow-stone-900/15'),
    ('border-teal-200', 'border-brand/30'),
    ('bg-teal-50', 'bg-brand-50'),
    # section-level white -> paper cream (targeted unique contexts)
    ('max-w-6xl bg-white px-4', 'max-w-6xl bg-paper px-4'),          # preview section
    ('"bg-white px-4 py-16', '"bg-paper px-4 py-16'),                # pricing section
    ('"bg-white px-4 py-14', '"bg-paper px-4 py-14'),                # disclaimer section
    ('overflow-x-clip bg-white', 'overflow-x-clip bg-paper'),        # page root
    # generic cool gray -> warm stone
    ('slate-', 'stone-'),
    ('teal-', 'brand-'),  # any leftover teal scale classes -> gold family
]

for f in files:
    src = f.read_text()
    orig = src
    for old, new in swaps:
        if isinstance(old, str):
            src = src.replace(old, new)
        else:
            src = old.sub(new, src)
    if src != orig:
        f.write_text(src)
        print('updated', f.name)
