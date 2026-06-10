import type { Goal } from '@/lib/personalOs'
import CircularProgress from './CircularProgress'
import StatusBadge from './StatusBadge'

interface GoalCardProps {
  goal: Goal
}

/** ring tint follows the goal's status */
const toneByStatus: Record<Goal['status'], 'warm' | 'iris' | 'sage' | 'gold'> = {
  Done: 'sage',
  'On Track': 'warm',
  'In Progress': 'iris',
  Planned: 'gold',
}

export default function GoalCard({ goal }: GoalCardProps) {
  return (
    <div className="glass-card glow-hover flex items-center gap-5 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
      <CircularProgress value={goal.progress} tone={toneByStatus[goal.status]} size={64} />

      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground">
          {goal.title}
        </h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          {goal.category}
        </p>
        <div className="mt-3">
          <StatusBadge status={goal.status} />
        </div>
      </div>
    </div>
  )
}
