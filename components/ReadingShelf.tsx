import Link from 'next/link'
import type { ReactNode } from 'react'
import Reveal from '@/components/anim/Reveal'
import BookCover from '@/components/bookshelf/BookCover'
import { recentlyRead, type ShelfBook } from '@/lib/recentlyRead'

function Book({ book }: { book: ShelfBook }) {
  const inner = (
    <>
      <span className="book-3d relative block aspect-[2/3] w-28 overflow-hidden rounded-l-[3px] rounded-r-md shadow-[0_18px_30px_-12px_rgba(0,0,0,0.7)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-[0_28px_45px_-12px_rgba(0,0,0,0.8)] sm:w-32">
        <BookCover title={book.title} author={book.author} />
        <span className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/35 to-transparent" />
        <span className="pointer-events-none absolute inset-y-0 left-2.5 w-px bg-white/10" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15" />
        <span className="pointer-events-none absolute inset-0 rounded-l-[3px] rounded-r-md ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:ring-warm/40" />
      </span>

      <span className="mt-4 block w-28 sm:w-32">
        <span className="line-clamp-2 text-xs font-medium leading-snug text-foreground/90 transition-colors group-hover:text-foreground">
          {book.title}
        </span>
        <span className="mt-0.5 block truncate text-[11px] text-muted">{book.author}</span>
      </span>
    </>
  )

  const wrapperClass = 'group flex shrink-0 flex-col items-center text-center [perspective:1000px]'

  return book.noteSlug ? (
    <Link href={`/reading/${book.noteSlug}`} className={wrapperClass}>
      {inner}
    </Link>
  ) : (
    <div className={wrapperClass} title={`${book.title} - ${book.author}`}>
      {inner}
    </div>
  )
}

export default function ReadingShelf(): ReactNode {
  if (recentlyRead.length === 0) return null

  return (
    <section className="mb-14">
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted">Recently read</p>

      <div className="relative">
        <Reveal
          stagger={0.08}
          y={16}
          className="flex gap-7 overflow-x-auto pb-4 sm:gap-9 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {recentlyRead.map((book) => (
            <Book key={book.title} book={book} />
          ))}
        </Reveal>

        <div className="pointer-events-none absolute inset-x-0 bottom-[4.75rem] -z-10 h-px bg-gradient-to-r from-transparent via-warm/25 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-[4.75rem] -z-10 h-6 bg-gradient-to-b from-black/40 to-transparent blur-md" />
      </div>
    </section>
  )
}
