'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Tag from '@/components/Tag'
import { estimateReadTime, type ContentEntry } from '@/lib/content-shared'

interface ContentCardProps {
  entry: ContentEntry
  /** route prefix, e.g. "/notes" or "/reading" */
  basePath: string
  index?: number
  showReadTime?: boolean
}

/**
 * Article card for the Notes / Reading archives — date, title, excerpt, tags,
 * reading time, with a cursor-following glow and a quiet hover lift on its
 * inner content (root transform is left alone so scroll reveals don't fight).
 */
export default function ContentCard({
  entry,
  basePath,
  index = 0,
  showReadTime = true,
}: ContentCardProps) {
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const num = String(index + 1).padStart(2, '0')

  return (
    <Link
      ref={ref}
      href={`${basePath}/${entry.slug}`}
      onMouseMove={handleMove}
      className="glass glow-hover group block p-6 transition-colors duration-300 hover:border-warm/25 md:p-8"
      style={{ ['--mx' as string]: `${mouse.x}%`, ['--my' as string]: `${mouse.y}%` }}
    >
      <div className="mb-5 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
        <span className="text-warm/60">{num}</span>
        <span className="h-px w-4 bg-border" />
        <time>
          {new Date(entry.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </time>
        {entry.author && <span className="text-muted/70">{entry.author}</span>}
        {showReadTime && (
          <>
            <span className="h-px w-4 bg-border" />
            <span className="text-muted/70">{estimateReadTime(entry.raw)} min</span>
          </>
        )}
      </div>

      <h3 className="text-xl font-bold tracking-tight text-foreground/90 transition-colors duration-300 group-hover:text-foreground md:text-2xl">
        {entry.title}
      </h3>

      {entry.summary && (
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted line-clamp-2">
          {entry.summary}
        </p>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
        <div className="flex flex-wrap gap-2">
          {entry.tags?.slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-warm" />
      </div>
    </Link>
  )
}
