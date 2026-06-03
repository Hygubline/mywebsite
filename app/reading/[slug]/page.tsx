import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ExternalLink, Star } from 'lucide-react'
import ArticleView from '@/components/ArticleView'
import { getCollection, getEntry } from '@/lib/content'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getCollection('reading').map((entry) => ({ slug: entry.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const entry = getEntry('reading', params.slug)
  if (!entry) return { title: 'Reading Note Not Found' }
  return { title: `${entry.title} — Reading — Yun He`, description: entry.summary }
}

export default function ReadingNotePage({ params }: Props) {
  const entry = getEntry('reading', params.slug)
  if (!entry) notFound()

  const meta = (
    <div className="mb-10 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-surface/40 px-5 py-4 text-sm text-muted">
      {entry.author && (
        <span>
          <span className="text-muted/60">by </span>
          <span className="text-foreground">{entry.author}</span>
        </span>
      )}
      {entry.source && <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs">{entry.source}</span>}
      {typeof entry.rating === 'number' && (
        <span className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${i < entry.rating! ? 'fill-warm text-warm' : 'text-muted/30'}`}
            />
          ))}
        </span>
      )}
      {entry.link && (
        <a
          href={entry.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-1.5 text-warm transition-colors hover:text-warm/80"
        >
          Source <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  )

  return (
    <ArticleView entry={entry} backHref="/reading" backLabel="Back to reading" beforeBody={meta} />
  )
}
