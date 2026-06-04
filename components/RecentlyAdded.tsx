import Link from 'next/link'
import { NotebookPen, FlaskConical, BookOpen, type LucideIcon } from 'lucide-react'
import Reveal from '@/components/anim/Reveal'
import { getCollection } from '@/lib/content'

interface RecentItem {
  kind: string
  Icon: LucideIcon
  accent: string
  title: string
  date: string
  href: string
  summary?: string
}

function latest(collection: string, kind: string, Icon: LucideIcon, accent: string, basePath: string): RecentItem | null {
  const [entry] = getCollection(collection)
  if (!entry) return null
  return {
    kind,
    Icon,
    accent,
    title: entry.title,
    date: entry.date,
    href: `${basePath}/${entry.slug}`,
    summary: entry.summary,
  }
}

export default function RecentlyAdded() {
  const items = [
    latest('notes', 'Note', NotebookPen, 'text-warm', '/notes'),
    latest('ui-lab', 'Experiment', FlaskConical, 'text-iris', '/ui-lab'),
    latest('reading', 'Reading', BookOpen, 'text-gold', '/reading'),
  ].filter((x): x is RecentItem => x !== null)

  if (items.length === 0) return null

  return (
    <Reveal stagger={0.1} className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="glass group flex flex-col p-6 transition-colors duration-300 hover:border-warm/25"
        >
          <div className="flex items-center gap-2">
            <item.Icon className={`h-4 w-4 ${item.accent}`} strokeWidth={1.6} />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {item.kind}
            </span>
            <time className="ml-auto font-mono text-[10px] text-muted/60">
              {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </time>
          </div>
          <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight text-foreground/90 transition-colors group-hover:text-foreground">
            {item.title}
          </h3>
          {item.summary && (
            <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">{item.summary}</p>
          )}
        </Link>
      ))}
    </Reveal>
  )
}
