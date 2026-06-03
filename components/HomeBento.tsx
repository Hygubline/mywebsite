import Link from 'next/link'
import { NotebookPen, FlaskConical, Hammer, BookOpen, Sparkles, ArrowUpRight } from 'lucide-react'
import Reveal from '@/components/anim/Reveal'

interface Tile {
  href: string
  title: string
  blurb: string
  Icon: typeof NotebookPen
  /** grid span on md+ screens */
  span: string
  accent: string
}

const tiles: Tile[] = [
  {
    href: '/notes',
    title: 'Notes',
    blurb: 'Half-formed thoughts, essays, and things I noticed on a Tuesday.',
    Icon: NotebookPen,
    span: 'md:col-span-2 md:row-span-2',
    accent: 'text-warm',
  },
  {
    href: '/ui-lab',
    title: 'UI Lab',
    blurb: 'Front-end experiments and little animations I build to see if I can.',
    Icon: FlaskConical,
    span: 'md:col-span-2',
    accent: 'text-clay',
  },
  {
    href: '/projects',
    title: 'Projects',
    blurb: 'Things I’m building and the lessons they keep teaching me.',
    Icon: Hammer,
    span: 'md:col-span-1',
    accent: 'text-sage',
  },
  {
    href: '/reading',
    title: 'Reading',
    blurb: 'Notes on books and articles, so I actually remember them.',
    Icon: BookOpen,
    span: 'md:col-span-1',
    accent: 'text-warm',
  },
  {
    href: '/about',
    title: 'About',
    blurb: 'Who I am, what I’m learning, and how to reach me.',
    Icon: Sparkles,
    span: 'md:col-span-2',
    accent: 'text-sage',
  },
]

export default function HomeBento() {
  return (
    <section className="section-container py-20 sm:py-28">
      <Reveal>
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted mb-3">
          Wander around
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-10">
          Five rooms in the garden
        </h2>
      </Reveal>

      <Reveal
        stagger={0.1}
        className="grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4"
      >
        {tiles.map(({ href, title, blurb, Icon, span, accent }) => (
          <Link
            key={href}
            href={href}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-warm/30 hover:bg-surface/70 ${span}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-warm/[0.05] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10 flex items-start justify-between">
              <Icon className={`h-6 w-6 ${accent}`} strokeWidth={1.5} />
              <ArrowUpRight className="h-4 w-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>
            <div className="relative z-10 mt-6">
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{blurb}</p>
            </div>
          </Link>
        ))}
      </Reveal>
    </section>
  )
}
