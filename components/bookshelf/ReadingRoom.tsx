import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookMarked, NotebookPen, Sparkles } from 'lucide-react'
import BookCover from '@/components/bookshelf/BookCover'
import BookshelfSculpture from '@/components/bookshelf/BookshelfSculpture'
import ReadingSection from '@/components/bookshelf/ReadingSection'
import type { ContentEntry } from '@/lib/content'

type CoverVariant = 'moon' | 'door' | 'stairs' | 'ribbon' | 'orb'

interface ShelfBook {
  id: string
  title: string
  author: string
  variant: CoverVariant
  accent: string
}

interface WantToReadBook extends ShelfBook {
  note: string
}

const currentlyReading = {
  title: 'The Rings of Saturn',
  author: 'W. G. Sebald',
  progress: 38,
  stage: 'Slowly reading at night',
  note:
    'A wandering book about memory, ruin, weather, and the strange weight that places keep after history has passed through them.',
  tags: ['essay-novel', 'memory', 'landscape'],
  variant: 'moon' as const,
  accent: '#d8b878',
}

const categories = [
  'Literature & interior weather',
  'Psychology & decision-making',
  'Private notes & underlines',
]

const shelfTitles = ['SATURN', 'ALISSA', 'SHANGHAI', 'SYSTEMS']

const wantToRead: WantToReadBook[] = [
  {
    id: 'sea-of-fertility',
    title: 'Runaway Horses',
    author: 'Yukio Mishima',
    variant: 'ribbon',
    accent: '#9a6a39',
    note: 'For severity, beauty, and the danger of ideals when they harden into destiny.',
  },
  {
    id: 'the-argonauts',
    title: 'The Argonauts',
    author: 'Maggie Nelson',
    variant: 'door',
    accent: '#c58a58',
    note: 'For language that can stay intimate while still thinking in public.',
  },
  {
    id: 'solaris',
    title: 'Solaris',
    author: 'Stanislaw Lem',
    variant: 'orb',
    accent: '#d8b878',
    note: 'For intelligence, unknowability, and the question of what counts as contact.',
  },
]

interface ReadingRoomProps {
  entries: ContentEntry[]
}

export default function ReadingRoom({ entries }: ReadingRoomProps) {
  const finishedBooks = entries.slice(0, 3).map((entry, index) => ({
    id: entry.slug,
    title: entry.title,
    author: entry.author ?? 'Unknown author',
    href: `/reading/${entry.slug}`,
    summary: entry.summary ?? 'A note worth returning to later.',
    date: entry.date,
    accent: ['#d8b878', '#b88352', '#8b6a46'][index % 3],
    variant: (['moon', 'door', 'stairs'][index % 3] ?? 'orb') as CoverVariant,
  }))

  const readingNotes = entries.slice(0, 3).map((entry) => ({
    id: entry.slug,
    title: entry.title,
    href: `/reading/${entry.slug}`,
    excerpt: entry.summary ?? 'A fragment I want to preserve.',
    tags: entry.tags?.slice(0, 2) ?? [],
  }))

  return (
    <section className="relative min-h-screen overflow-hidden rounded-[32px] bg-[#08090a] px-5 pb-12 pt-24 shadow-[0_40px_140px_-70px_rgba(0,0,0,0.95)] sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0 scale-[1.08]">
        <Image
          src="/images/bookshelf/hero-shelf-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.14] blur-[22px] saturate-[0.7]"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,7,0.18),rgba(8,9,10,0.68)_42%,rgba(8,9,10,0.94)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.05),transparent_20%),radial-gradient(circle_at_74%_18%,rgba(216,149,74,0.14),transparent_28%),radial-gradient(circle_at_18%_76%,rgba(255,255,255,0.03),transparent_26%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_77%_18%,rgba(227,168,111,0.14),transparent_28%),radial-gradient(circle_at_18%_28%,rgba(255,255,255,0.05),transparent_24%),radial-gradient(circle_at_60%_100%,rgba(255,255,255,0.03),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.85)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.85)_1px,transparent_1px)] [background-size:78px_78px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] gradient-mesh" />

      <div className="relative z-10 grid gap-8 xl:grid-cols-[0.38fr_0.62fr] xl:items-start">
        <div className="max-w-[28rem] pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.34em] text-[#d8b878]">
            <BookMarked className="h-4 w-4" />
            Bookshelf
          </div>

          <h1 className="mt-8 max-w-[9ch] text-[3.2rem] font-normal leading-[0.92] tracking-[-0.05em] text-[#f4eee4] sm:text-[4.2rem] lg:text-[4.8rem] [font-family:Iowan_Old_Style,Georgia,serif]">
            A dark room for reading slowly.
          </h1>

          <p className="mt-7 max-w-[25rem] text-lg leading-9 text-[#a59d93]">
            Part archive, part private study. A place for books that leave residue: paragraphs that sharpen thought, scenes that refuse to fade, and questions that keep following me around.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {categories.map((category) => (
              <span key={category} className="bookshelf-pill-muted">
                {category}
              </span>
            ))}
          </div>

          <div className="mt-10 rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-5 shadow-[0_24px_70px_-50px_rgba(0,0,0,0.95)]">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#d8b878]">Atmosphere</p>
            <p className="mt-3 text-sm leading-7 text-[#b5ac9f]">
              Black stone shelves, warm shelf-light, underlined passages, and a little ambiguity.
            </p>
          </div>
        </div>

        <div className="relative min-h-[560px]">
          <div className="absolute inset-x-[4%] top-[7%] h-[48%] rounded-full bg-[radial-gradient(circle,rgba(227,168,111,0.2),transparent_62%)] blur-[58px]" />
          <div className="absolute right-[4%] top-[5%] h-[60%] w-[44%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_64%)] blur-[46px]" />

          <div className="relative pt-4 xl:pl-20">
            <div className="absolute left-0 top-[16%] z-20 w-full max-w-[21rem] rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(16,16,16,0.92),rgba(10,10,10,0.95))] p-6 backdrop-blur-[18px] shadow-[0_30px_80px_rgba(0,0,0,0.52),0_0_40px_rgba(227,168,111,0.06),inset_0_1px_0_rgba(255,255,255,0.04)]">
              <p className="text-[0.64rem] uppercase tracking-[0.38em] text-[#9f9488]">Currently Reading</p>
              <h2 className="mt-5 text-[2.2rem] font-normal leading-[1.02] text-[#f4eee4] [font-family:Iowan_Old_Style,Georgia,serif]">
                {currentlyReading.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-[#b6aea3]">{currentlyReading.note}</p>
              <p className="mt-6 text-[1.05rem] text-[#d8b878]">{currentlyReading.author}</p>

              <div className="mt-7 flex items-center gap-3">
                <div className="h-[3px] flex-1 rounded-full bg-white/[0.08]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#a86f3a] via-[#d8b878] to-[#f1d29a]"
                    style={{ width: `${currentlyReading.progress}%` }}
                  />
                </div>
                <span className="text-sm text-[#e7dccb]">{currentlyReading.progress}%</span>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {currentlyReading.tags.map((tag) => (
                  <span key={tag} className="bookshelf-pill">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-7 text-sm uppercase tracking-[0.24em] text-[#8f877b]">{currentlyReading.stage}</p>
            </div>

            <div className="relative ml-auto max-w-[48rem]">
              <BookshelfSculpture titles={shelfTitles} />

              <div className="absolute left-[42%] top-[19%] z-10 w-[26%] min-w-[180px] max-w-[220px] animate-float-slower">
                <BookCover
                  title={currentlyReading.title}
                  author={currentlyReading.author}
                  variant={currentlyReading.variant}
                  accent={currentlyReading.accent}
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-10 grid gap-8">
        <ReadingSection
          eyebrow="Section 01"
          title="Currently Reading"
          description="The books still open on the desk. Usually slower, denser, and worth keeping near for a few weeks."
        >
          <div className="grid gap-6 lg:grid-cols-[0.44fr_0.56fr]">
            <article className="group rounded-[24px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-5 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)]">
              <div className="mx-auto w-[76%] max-w-[240px] transition-transform duration-500 group-hover:-translate-y-1">
                <BookCover
                  title={currentlyReading.title}
                  author={currentlyReading.author}
                  variant={currentlyReading.variant}
                  accent={currentlyReading.accent}
                  size="lg"
                />
              </div>
            </article>

            <div className="rounded-[24px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))] p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bookshelf-pill">In progress</span>
                <span className="text-sm uppercase tracking-[0.22em] text-[#8f877b]">{currentlyReading.stage}</span>
              </div>

              <p className="mt-6 text-[2rem] font-normal leading-tight text-[#f4eee4] [font-family:Iowan_Old_Style,Georgia,serif]">
                {currentlyReading.title}
              </p>
              <p className="mt-2 text-base text-[#d8b878]">{currentlyReading.author}</p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#b7aea2]">{currentlyReading.note}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[18px] border border-white/[0.06] bg-black/20 p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[#9a9083]">Reading pace</p>
                  <p className="mt-3 text-3xl font-normal text-[#f4eee4] [font-family:Iowan_Old_Style,Georgia,serif]">
                    {currentlyReading.progress}%
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#9f978b]">Slow enough that the sentences still have texture.</p>
                </div>

                <div className="rounded-[18px] border border-white/[0.06] bg-black/20 p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[#9a9083]">Why now</p>
                  <p className="mt-3 text-sm leading-7 text-[#c1b8ab]">
                    I wanted something meditative, intelligent, and a little haunted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ReadingSection>

        <ReadingSection
          eyebrow="Section 02"
          title="Finished Books"
          description="Books that have already been absorbed into the archive, each one leaving behind a note, a mood, or a changed sentence in my head."
          action={
            <Link
              href="/reading"
              className="inline-flex items-center gap-2 text-[0.76rem] uppercase tracking-[0.24em] text-[#d8b878] transition hover:text-[#f0d2a3]"
            >
              Open Archive
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {finishedBooks.map((book) => (
              <article
                key={book.id}
                className="group rounded-[24px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-5 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.02)] transition-colors hover:border-[rgba(216,184,120,0.16)]"
              >
                <div className="relative mx-auto w-[72%] max-w-[210px] transition-transform duration-500 group-hover:-translate-y-1">
                  <BookCover
                    title={book.title}
                    author={book.author}
                    variant={book.variant}
                    accent={book.accent}
                    size="sm"
                  />
                </div>
                <p className="mt-4 text-[1.02rem] leading-6 text-[#f4eee4]">{book.title}</p>
                <p className="mt-1 text-sm text-[#a59d93]">{book.author}</p>
                <p className="mt-4 text-sm leading-7 text-[#b2a89b]">{book.summary}</p>
                <Link
                  href={book.href}
                  className="mt-5 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.24em] text-[#d8b878] transition hover:text-[#f0d2a3]"
                >
                  Read Notes
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </ReadingSection>

        <div className="grid gap-8 xl:grid-cols-[0.56fr_0.44fr]">
          <ReadingSection
            eyebrow="Section 03"
            title="Notes from Books"
            description="Not summaries. More like afterimages: what stayed, what shifted, and which sentence kept ringing after the book was closed."
          >
            <div className="grid gap-5">
              {readingNotes.map((note) => (
                <article
                  key={note.id}
                  className="rounded-[22px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-5"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <Sparkles className="h-4 w-4 text-[#d8b878]" />
                    {note.tags.map((tag) => (
                      <span key={tag} className="text-[0.64rem] uppercase tracking-[0.24em] text-[#8e8578]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-[1.35rem] font-normal leading-snug text-[#f4eee4] [font-family:Iowan_Old_Style,Georgia,serif]">
                    {note.title}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#b8aea2]">{note.excerpt}</p>

                  <Link href={note.href} className="bookshelf-note-button mt-5">
                    <NotebookPen className="h-4 w-4" />
                    Open Note
                  </Link>
                </article>
              ))}
            </div>
          </ReadingSection>

          <ReadingSection
            eyebrow="Section 04"
            title="Books I Want to Read"
            description="A small waiting list: books that seem likely to open another corridor."
          >
            <div className="grid gap-5">
              {wantToRead.map((book) => (
                <article
                  key={book.id}
                  className="grid gap-4 rounded-[22px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-4 sm:grid-cols-[92px_1fr]"
                >
                  <div className="w-[92px]">
                    <BookCover
                      title={book.title}
                      author={book.author}
                      variant={book.variant}
                      accent={book.accent}
                      size="sm"
                    />
                  </div>
                  <div className="pt-1">
                    <p className="text-[1.12rem] leading-6 text-[#f4eee4]">{book.title}</p>
                    <p className="mt-1 text-sm text-[#d8b878]">{book.author}</p>
                    <p className="mt-3 text-sm leading-7 text-[#afa598]">{book.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </ReadingSection>
        </div>
      </div>
    </section>
  )
}
