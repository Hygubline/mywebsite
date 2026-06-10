'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import BookCover from '@/components/bookshelf/BookCover'
import type { Book } from '@/lib/books'

interface FeaturedBookProps {
  book: Book
  index?: number
}

/**
 * A "currently reading" highlight — a larger book paired with a longer-form note,
 * laid out like a quiet recommendation card rather than a shelf item.
 */
export default function FeaturedBook({ book, index = 0 }: FeaturedBookProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card glow-hover group flex gap-5 p-5 sm:gap-7 sm:p-7"
    >
      {/* the standing book */}
      <div className="shrink-0 [perspective:1200px]">
        <motion.div
          whileHover={{ rotateY: -14, y: -6, scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="relative aspect-[2/3] w-28 rounded-l-[3px] rounded-r-[6px] [transform-style:preserve-3d] sm:w-36"
          style={{
            boxShadow:
              '0 22px 40px -18px rgba(0,0,0,0.8), 0 6px 14px -8px rgba(0,0,0,0.7)',
          }}
        >
          <div className="pointer-events-none absolute inset-y-[2px] -right-[4px] w-[8px] rounded-r-[6px] bg-gradient-to-r from-[#d9cfbe] to-[#a99f8c] [transform:translateZ(-1px)]" />
          <div className="relative h-full w-full overflow-hidden rounded-l-[3px] rounded-r-[6px] ring-1 ring-inset ring-white/10">
            <BookCover book={book} size="lg" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-3.5 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-[13px] w-px bg-white/10" />
          </div>
        </motion.div>
      </div>

      {/* meta + note */}
      <div className="flex min-w-0 flex-col justify-center">
        <p className="mb-2 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-warm/80">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warm/60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-warm" />
          </span>
          Currently reading
        </p>

        <h3 className="text-lg font-semibold leading-tight tracking-tight text-foreground sm:text-xl">
          {book.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{book.author}</p>

        {typeof book.rating === 'number' && (
          <span className="mt-2.5 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < book.rating! ? 'fill-warm text-warm' : 'text-muted/25'}`}
              />
            ))}
          </span>
        )}

        <p className="mt-3.5 max-w-md text-sm italic leading-relaxed text-foreground/75">
          &ldquo;{book.note}&rdquo;
        </p>
      </div>
    </motion.article>
  )
}
