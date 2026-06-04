import type { ExperimentStatus } from '@/lib/content'

const config: Record<ExperimentStatus, { label: string; dot: string; text: string }> = {
  idea: { label: 'idea', dot: 'bg-muted', text: 'text-muted' },
  building: { label: 'building', dot: 'bg-warm animate-pulse-soft', text: 'text-warm' },
  finished: { label: 'finished', dot: 'bg-sage', text: 'text-sage' },
}

export default function StatusBadge({ status }: { status?: ExperimentStatus }) {
  const c = config[status ?? 'idea']
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.02] px-2.5 py-1">
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      <span className={`font-mono text-[10px] uppercase tracking-[0.15em] ${c.text}`}>
        {c.label}
      </span>
    </span>
  )
}
