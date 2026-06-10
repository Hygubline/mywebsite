'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import BookCover from '@/components/bookshelf/BookCover'
import { statusLabel, type Book } from '@/lib/books'

interface BookCardProps {
  book: Book
}

const statusDot: Record<Book['status'], string> = {
  reading: 'bg-warm',
  read: 'bg-sage',
  'want-to-read': 'bg-muted/50',
}

/**
 * A single book standing on the wall. The cover carries real depth — a printed
 * spine down the left edge and layered page-block on the right — and on hover it
 * tips up and lifts, as if drawn off the shelf, while a one-line note rises from
 * the foot.
 */
export default function BookCard({ book }: BookCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      className="group flex flex-col [perspective:1200px]"
    >
      {/* the book body — tilts and lifts on hover */}
      <motion.div
        whileHover={{ y: -12, rotateX: 6, rotateY: -10, scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="relative aspect-[2/3] w-full rounded-l-[3px] rounded-r-[5px] [transform-style:preserve-3d]"
        style={{
          boxShadow:
            '0 14px 26px -14px rgba(0,0,0,0.75), 0 4px 10px -6px rgba(0,0,0,0.6)',
        }}
      >
        {/* page block: a sliver of stacked pages along the right edge for thickness */}
        <div className="pointer-events-none absolute inset-y-[2px] -right-[3px] w-[6px] rounded-r-[5px] bg-gradient-to-r from-[#d9cfbe] to-[#a99f8c] [transform:translateZ(-1px)]" />
        <div className="pointer-events-none absolute inset-y-[2px] -right-[3px] w-[6px] rounded-r-[5px] bg-[repeating-linear-gradient(90deg,transparent_0,transparent_1px,rgba(0,0,0,0.18)_1px,rgba(0,0,0,0.18)_2px)] opacity-60" />

        {/* the cover face */}
        <div className="relative h-full w-full overflow-hidden rounded-l-[3px] rounded-r-[5px] ring-1 ring-inset ring-white/10 transition-[box-shadow] duration-500 group-hover:ring-white/20">
          <BookCover book={book} />

          {/* spine: a dark gutter down the left edge with a hairline highlight */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-[11px] w-px bg-white/10" />

          {/* note that rises from the foot on hover */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-background/95 via-background/85 to-transparent px-4 pb-4 pt-10 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-[12px] italic leading-snug text-foreground/85">
              &ldquo;{book.note}&rdquo;
            </p>
          </div>
        </div>

        {/* warm glow ring on hover */}
        <div className="pointer-events-none absolute -inset-px rounded-l-[3px] rounded-r-[5px] opacity-0 ring-1 ring-warm/40 transition-opacity duration-500 group-hover:opacity-100" />
      </motion.div>

      {/* caption beneath the book */}
      <div className="mt-4 px-0.5">
        <p className="line-clamp-1 text-[13px] font-medium text-foreground/90">{book.title}</p>
        <p className="mt-0.5 line-clamp-1 text-[11px] text-muted">{book.author}</p>

        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-muted/80">
            <span className={`h-1.5 w-1.5 rounded-full ${statusDot[book.status]}`} />
            {statusLabel[book.status]}
          </span>
          {book.finishedDate && (
            <span className="text-[10px] tracking-wide text-muted/45">{book.finishedDate}</span>
          )}
          {typeof book.rating === 'number' && (
            <span className="ml-auto flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < book.rating! ? 'fill-warm text-warm' : 'text-muted/25'}`}
                />
              ))}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
