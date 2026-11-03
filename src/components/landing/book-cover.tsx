type BookCoverProps = {
  size?: 'lg' | 'sm'
  className?: string
}

// CSS-only 3D book cover: navy cover, saffron band, gold badge, spine + pages edge.
export function BookCover({ size = 'lg', className = '' }: BookCoverProps) {
  const sm = size === 'sm'
  return (
    <div className={`book-scene ${className}`}>
      <div className="animate-floaty">
        <div className="relative">
          <div className={`book3d ${sm ? 'book3d-sm' : ''}`}>
            {/* pages edge (right) */}
            <div className="book-pages" aria-hidden />
            {/* spine (left) */}
            <div className="book-spine" aria-hidden />
            {/* front cover */}
            <div className="book-front">
              <div className={`flex h-full flex-col justify-between ${sm ? 'p-3.5' : 'p-4'}`}>
                <div className={sm ? 'mt-2' : 'mt-3'}>
                  <p
                    className={`font-semibold uppercase tracking-[0.18em] text-brand ${
                      sm ? 'text-[8px]' : 'text-[10px]'
                    }`}
                  >
                    For Indian Students
                  </p>
                  <p
                    className={`mt-2 font-extrabold leading-tight text-white ${
                      sm ? 'text-xl' : 'text-[26px]'
                    }`}
                  >
                    Study Abroad
                  </p>
                  <p
                    className={`mt-1 font-bold leading-tight text-white/90 ${
                      sm ? 'text-sm' : 'text-base'
                    }`}
                  >
                    The Complete Book
                  </p>
                  <p
                    className={`mt-2 font-extrabold text-saffron ${
                      sm ? 'text-sm' : 'text-lg'
                    }`}
                  >
                    2027 Edition
                  </p>
                </div>
                <p
                  className={`mb-2 font-medium text-white/70 ${
                    sm ? 'text-[8px]' : 'text-[10px]'
                  }`}
                >
                  15 countries · Real numbers · Updated Nov 2026
                </p>
              </div>
              {/* saffron band */}
              <div className="book-band flex flex-col justify-center px-4">
                <p
                  className={`font-extrabold tracking-wide text-navy-deep ${
                    sm ? 'text-[11px]' : 'text-sm'
                  }`}
                >
                  74 PAGES · 15 COUNTRIES
                </p>
                <p
                  className={`font-semibold text-navy-deep/80 ${
                    sm ? 'text-[8px]' : 'text-[10px]'
                  }`}
                >
                  Plan right. Spend less.
                </p>
              </div>
            </div>
          </div>
          {/* gold badge — overlaid on the cover's top-right corner */}
          <div
            aria-hidden
            className="book-badge z-10"
            style={sm ? { top: '-46px', left: '128px' } : { top: '-56px', left: '172px' }}
          >
            <span className={sm ? 'text-[8px] font-bold' : 'text-[9px] font-bold'}>
              JUST
            </span>
            <span
              className={`font-extrabold leading-none ${
                sm ? 'text-[13px]' : 'text-base'
              }`}
            >
              ₹251
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
