import type { ReactNode } from 'react'

type TagTone = 'default' | 'warm' | 'iris' | 'sage'

interface TagProps {
  children: ReactNode
  tone?: TagTone
  className?: string
}

const tones: Record<TagTone, string> = {
  default: 'border-border text-muted',
  warm: 'border-warm/25 text-warm',
  iris: 'border-iris/30 text-iris',
  sage: 'border-sage/30 text-sage',
}

export default function Tag({ children, tone = 'default', className = '' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border bg-white/[0.02] px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
