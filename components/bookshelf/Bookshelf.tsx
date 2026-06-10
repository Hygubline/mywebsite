'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BookCard from '@/components/bookshelf/BookCard'
import FeaturedBook from '@/components/bookshelf/FeaturedBook'
import {
  books,
  currentlyReading,
  presentCategories,
  presentStatuses,
  statusLabel,
  type Book,
  type BookCategory,
  type BookStatus,
} from '@/lib/books'

/** A filter is either a reading status or a category — kept flat for one tidy row. */
type Filter = 'all' | BookStatus | BookCategory

/** Built from the actual library so a filter never lands on an empty shelf. */
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  ...presentStatuses.map((s) => ({ id: s as Filter, label: statusLabel[s] })),
  ...presentCategories.map((c) => ({ id: c as Filter, label: c })),
]

function matches(book: Book, filter: Filter): boolean {
  if (filter === 'all') return true
  if (filter === 'reading' || filter === 'read' || filter === 'want-to-read') {
    return book.status === filter
  }
  return book.category === filter
}

export default function Bookshelf() {
  const [filter, setFilter] = useState<Filter>('all')

  const visible = useMemo(() => books.filter((b) => matches(b, filter)), [filter])

  return (
    <section>
      {/* ── Currently reading: the featured shelf ───────────────────────── */}
      {currentlyReading.length > 0 && (
        <div className="mb-16">
          <div
            className={`grid gap-5 ${
              currentlyReading.length > 1 ? 'sm:grid-cols-2' : 'max-w-xl'
            }`}
          >
            {currentlyReading.map((book, i) => (
              <FeaturedBook key={book.id} book={book} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── Filter row ──────────────────────────────────────────────────── */}
      <div className="mb-9 flex flex-wrap gap-2">
        {FILTERS.map(({ id, label }) => {
          const active = filter === id
          return (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`relative rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-200 ${
                active ? 'text-background' : 'text-muted hover:text-foreground'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="shelf-filter-active"
                  className="absolute inset-0 -z-10 rounded-full bg-warm"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {label}
            </button>
          )
        })}
      </div>

      {/* ── The wall of covers ──────────────────────────────────────────── */}
      <motion.div
        layout
        className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="py-12 text-center text-sm text-muted">
          Nothing on this shelf yet.
        </p>
      )}
    </section>
  )
}
