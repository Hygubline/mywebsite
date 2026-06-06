import type { Goal } from '@/lib/personalOs'
import ProgressBar from './ProgressBar'
import StatusBadge from './StatusBadge'

interface GoalCardProps {
  goal: Goal
}

/** progress tint follows the goal's status */
const toneByStatus: Record<Goal['status'], 'warm' | 'iris' | 'sage' | 'gold'> = {
  Done: 'sage',
  'On Track': 'warm',
  'In Progress': 'iris',
  Planned: 'gold',
}

export default function GoalCard({ goal }: GoalCardProps) {
  return (
    <div className="glass-card glow-hover rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground">
            {goal.title}
          </h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {goal.category}
          </p>
        </div>
        <StatusBadge status={goal.status} />
      </div>

      <div className="mt-5">
        <ProgressBar value={goal.progress} tone={toneByStatus[goal.status]} />
      </div>
    </div>
  )
}
