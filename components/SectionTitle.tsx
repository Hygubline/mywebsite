import type { ReactNode } from 'react'
import Reveal from '@/components/anim/Reveal'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  intro?: string
  /** optional element pinned to the right of the title row (e.g. a link) */
  action?: ReactNode
  /** use h1 for page headers, h2 for in-page sections (default) */
  as?: 'h1' | 'h2'
  className?: string
}

/**
 * Shared heading block for page headers and home sections — an eyebrow label,
 * a large title, and an optional intro line, revealed on scroll.
 */
export default function SectionTitle({
  eyebrow,
  title,
  intro,
  action,
  as: Heading = 'h2',
  className = '',
}: SectionTitleProps) {
  return (
    <Reveal className={className}>
      {eyebrow && (
        <p className="mb-4 flex items-center gap-3">
          <span className="gilded-rule w-10" />
          <span className="eyebrow">{eyebrow}</span>
        </p>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Heading
          className={`font-display font-semibold tracking-tight text-foreground ${
            Heading === 'h1' ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'
          }`}
        >
          {title}
        </Heading>
        {action}
      </div>
      {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{intro}</p>}
    </Reveal>
  )
}
