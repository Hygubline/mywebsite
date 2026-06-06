import type { GoalStatus, ProjectStatus } from '@/lib/personalOs'

type AnyStatus = GoalStatus | ProjectStatus

interface StatusBadgeProps {
  status: AnyStatus
}

/** dot + label color per status, mapped onto the site's accent palette */
const styles: Record<AnyStatus, string> = {
  Done: 'border-sage/30 text-sage bg-sage/10',
  Shipped: 'border-sage/30 text-sage bg-sage/10',
  'On Track': 'border-warm/30 text-warm bg-warm/10',
  Building: 'border-warm/30 text-warm bg-warm/10',
  'In Progress': 'border-iris/30 text-iris bg-iris/10',
  Designing: 'border-iris/30 text-iris bg-iris/10',
  Planned: 'border-border text-muted bg-white/[0.03]',
  Planning: 'border-border text-muted bg-white/[0.03]',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
