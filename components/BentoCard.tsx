import Link from 'next/link'
import { ArrowUpRight, type LucideIcon } from 'lucide-react'
import MagneticCard from '@/components/MagneticCard'

export interface BentoCardProps {
  href: string
  title: string
  description: string
  Icon: LucideIcon
  accent?: 'warm' | 'iris' | 'sage' | 'gold' | 'clay'
  className?: string
}

const accents: Record<NonNullable<BentoCardProps['accent']>, string> = {
  warm: 'text-warm',
  iris: 'text-iris',
  sage: 'text-sage',
  gold: 'text-gold',
  clay: 'text-clay',
}

export default function BentoCard({
  href,
  title,
  description,
  Icon,
  accent = 'warm',
  className = '',
}: BentoCardProps) {
  return (
    <MagneticCard strength={0.08} className={className}>
      <Link
        href={href}
        className="glass glow-hover group flex h-full min-h-[150px] flex-col justify-between overflow-hidden p-6 transition-colors duration-500 hover:border-warm/30"
      >
        <div className="flex items-start justify-between">
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white/[0.03] ${accents[accent]}`}
          >
            <Icon className="h-5 w-5" strokeWidth={1.6} />
          </span>
          <ArrowUpRight className="h-4 w-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
        </div>
      </Link>
    </MagneticCard>
  )
}
