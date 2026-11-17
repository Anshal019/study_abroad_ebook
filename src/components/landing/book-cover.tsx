type BookCoverProps = {
  size?: 'lg' | 'sm'
  className?: string
}

/**
 * 3D book model with the real cover art (public/book-cover.webp) as the
 * front face — spine + page edges + float animation stay CSS.
 */
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
            {/* front cover — the real cover art */}
            <div className="book-front">
              <img
                src="/book-cover.webp"
                alt="Study Abroad — The Complete Book, 2027 Edition cover"
                width={448}
                height={633}
                fetchPriority={sm ? undefined : 'high'}
                draggable={false}
                className="block h-full w-full select-none object-cover"
              />
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
