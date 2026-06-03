'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { ContentEntry } from '@/lib/content'

interface EntryCardProps {
  entry: ContentEntry
  /** route prefix, e.g. "/notes" or "/reading" */
  basePath: string
  index?: number
}

/**
 * Editorial list card with a cursor-following highlight. Used across the
 * Notes, Reading and UI Lab archives so every collection feels consistent.
 */
export default function EntryCard({ entry, basePath, index = 0 }: EntryCardProps) {
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
      className="archive-card group block"
    >
      <span
        className="archive-card-highlight"
        style={{ ['--mx' as string]: `${mouse.x}%`, ['--my' as string]: `${mouse.y}%` }}
      />
      <div className="relative z-10 p-6 md:p-8">
        <div className="mb-5 flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.2em] text-warm/60">{num}</span>
          <span className="h-px w-4 bg-border" />
          <time className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
            {new Date(entry.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
          {entry.author && (
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted/70">
              {entry.author}
            </span>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground/90 transition-colors duration-300 group-hover:text-foreground">
          {entry.title}
        </h3>

        {entry.summary && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted line-clamp-2">
            {entry.summary}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted transition-colors group-hover:text-warm">
            {entry.tags?.length ? entry.tags.slice(0, 3).join(' · ') : 'Read'}
          </span>
          <ArrowUpRight className="h-4 w-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-warm" />
        </div>
      </div>
    </Link>
  )
}
