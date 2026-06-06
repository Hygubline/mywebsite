import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string
  hint: string
  icon: ReactNode
}

/** Glass stat tile for the top of the dashboard: big number + label + hint. */
export default function StatCard({ label, value, hint, icon }: StatCardProps) {
  return (
    <div className="glass-card glow-hover group rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
        <span className="text-warm/80 transition-colors duration-300 group-hover:text-warm">
          {icon}
        </span>
      </div>
      <p className="mt-4 text-4xl font-bold tracking-tight text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  )
}
