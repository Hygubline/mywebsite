import Link from 'next/link'
import type { ContentEntry } from '@/lib/content'
import BookCover from '@/components/bookshelf/BookCover'

interface BookshelfPreviewProps {
  current: ContentEntry | null
  secondary: ContentEntry[]
}

export default function BookshelfPreview({
  current,
  secondary,
}: BookshelfPreviewProps) {
  return (
    <section id="bookshelf" className="section-container relative z-10 py-20 sm:py-24">
      <div className="lab-panel relative overflow-hidden rounded-[2rem] border border-white/8 px-5 py-6 sm:px-8 sm:py-8">
        <div className="ambient-noise absolute inset-0 opacity-[0.05]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(216,149,74,0.16),transparent_24%),radial-gradient(circle_at_78%_72%,rgba(255,255,255,0.04),transparent_26%)]" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-xl">
            <p className="text-[0.7rem] uppercase tracking-[0.34em] text-[#d39b59]">
              Bookshelf Preview
            </p>
            <h2 className="mt-4 [font-family:Iowan_Old_Style,Georgia,serif] text-[2.35rem] leading-[1.03] tracking-[-0.05em] text-[#f4efe7] sm:text-[3rem]">
              A darker reading room for books that stay open longer than expected.
            </h2>
            <p className="mt-5 text-sm leading-8 text-[#b5ab9f] sm:text-base">
              Notes, underlines, and the residue a good book leaves behind. Calm, a little
              haunted, and worth revisiting slowly.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/reading" className="btn-secondary">
                Enter the bookshelf
              </Link>
              <Link
                href="/notes"
                className="inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.24em] text-[#978d81] transition-colors hover:text-[#f4efe7]"
              >
                Open notes
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[14rem_minmax(0,1fr)]">
            <div className="rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,15,16,0.94),rgba(8,8,9,0.95))] p-5 shadow-[0_24px_60px_-44px_rgba(0,0,0,0.95)]">
              <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[#8b8278]">
                Current shelf
              </p>
              <div className="mx-auto mt-5 w-[74%] max-w-[160px]">
                <BookCover
                  title={current?.title ?? 'Currently Reading'}
                  author={current?.author ?? 'Reading Notes'}
                  variant="moon"
                  accent="#d39b59"
                  size="lg"
                />
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,15,16,0.94),rgba(8,8,9,0.95))] p-5 sm:p-6">
              <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[#d39b59]">
                Currently reading
              </p>
              <h3 className="mt-4 [font-family:Iowan_Old_Style,Georgia,serif] text-[2rem] leading-tight tracking-[-0.05em] text-[#f4efe7]">
                {current?.title ?? 'A book is waiting here.'}
              </h3>
              <p className="mt-2 text-sm uppercase tracking-[0.22em] text-[#978d81]">
                {current?.author ?? 'Reading archive'}
              </p>
              <p className="mt-5 text-sm leading-7 text-[#b9afa2]">
                {current?.summary ??
                  'A place for slower reading, underlined sentences, and ideas worth returning to after the page ends.'}
              </p>

              {secondary.length ? (
                <div className="mt-8 grid gap-3 border-t border-white/10 pt-5">
                  {secondary.map((entry, index) => (
                    <Link
                      key={entry.slug}
                      href={`/reading/${entry.slug}`}
                      className="group flex items-start justify-between gap-4 rounded-[1.1rem] border border-white/8 bg-white/[0.02] px-4 py-3 transition-colors hover:border-[#d39b59]/24"
                    >
                      <div>
                        <p className="text-[0.66rem] uppercase tracking-[0.24em] text-[#70685f]">
                          {String(index + 2).padStart(2, '0')}
                        </p>
                        <p className="mt-1 text-sm font-medium text-[#f4efe7]">
                          {entry.title}
                        </p>
                      </div>
                      <span className="mt-1 text-[0.68rem] uppercase tracking-[0.22em] text-[#8f877c] transition-transform duration-300 group-hover:translate-x-1">
                        Open
                      </span>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
