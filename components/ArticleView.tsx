import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import type { ContentEntry } from '@/lib/content'
import { estimateReadTime } from '@/lib/content'

interface ArticleViewProps {
  entry: ContentEntry
  backHref: string
  backLabel: string
  /** rendered above the prose body — e.g. a live demo or reading meta */
  beforeBody?: ReactNode
}

export default function ArticleView({ entry, backHref, backLabel, beforeBody }: ArticleViewProps) {
  return (
    <div className="container-main">
      <Link
        href={backHref}
        className="group mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {backLabel}
      </Link>

      <article>
        <header className="mb-10 border-b border-border pb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
            <time>
              {new Date(entry.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="h-px w-4 bg-border" />
            <span>{estimateReadTime(entry.raw)} min read</span>
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {entry.title}
          </h1>
          {entry.summary && (
            <p className="text-lg leading-relaxed text-muted">{entry.summary}</p>
          )}
          {entry.tags?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        {beforeBody}

        <div className="prose" dangerouslySetInnerHTML={{ __html: entry.content }} />
      </article>
    </div>
  )
}
