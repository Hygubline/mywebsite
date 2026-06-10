import { ArrowRight } from 'lucide-react'
import type { Project } from '@/lib/personalOs'
import Tag from '@/components/Tag'
import CircularProgress from './CircularProgress'
import StatusBadge from './StatusBadge'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="glass-card glow-hover flex flex-col rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-semibold tracking-tight text-foreground">{project.name}</h3>
          <p className="mt-1 text-sm text-muted">{project.stage}</p>
        </div>
        <CircularProgress value={project.progress} tone="warm" size={56} strokeWidth={4} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <StatusBadge status={project.status} />
        {project.tech.map((t) => (
          <Tag key={t} tone="iris">
            {t}
          </Tag>
        ))}
      </div>

      <div className="mt-5 flex items-start gap-2 border-t border-border pt-4 text-sm text-muted">
        <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-warm/70" />
        <span>
          <span className="text-foreground/70">Next:</span> {project.nextStep}
        </span>
      </div>
    </div>
  )
}
