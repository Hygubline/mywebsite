import Link from 'next/link'
import type { ReactNode } from 'react'
import Reveal from '@/components/anim/Reveal'
import { recentlyRead, initials, type ShelfBook } from '@/lib/recentlyRead'

/** A single circular book — links to its note if one exists. */
function Circle({ book }: { book: ShelfBook }) {
  const inner = (
    <>
      <span
        className={`relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ring-1 ring-border transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-warm/40 sm:h-24 sm:w-24 ${
          book.color ?? 'from-warm to-clay'
        }`}
      >
        {book.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.cover}
            alt={book.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-mono text-lg font-semibold tracking-tight text-background/80">
            {initials(book.title)}
          </span>
        )}
      </span>
      <span className="mt-3 block w-24 sm:w-28">
        <span className="line-clamp-2 text-xs font-medium leading-snug text-foreground/90">
          {book.title}
        </span>
        <span className="mt-0.5 block truncate text-[11px] text-muted">{book.author}</span>
      </span>
    </>
  )

  const wrapperClass = 'group flex shrink-0 flex-col items-center text-center'

  return book.noteSlug ? (
    <Link href={`/reading/${book.noteSlug}`} className={wrapperClass}>
      {inner}
    </Link>
  ) : (
    <div className={wrapperClass} title={`${book.title} — ${book.author}`}>
      {inner}
    </div>
  )
}

export default function ReadingShelf(): ReactNode {
  if (recentlyRead.length === 0) return null

  return (
    <section className="mb-14">
      <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        Recently read
      </p>
      <Reveal
        stagger={0.08}
        y={16}
        className="flex gap-6 overflow-x-auto pb-3 sm:gap-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {recentlyRead.map((book) => (
          <Circle key={book.title} book={book} />
        ))}
      </Reveal>
    </section>
  )
}
