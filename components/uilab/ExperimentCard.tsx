import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Tag from '@/components/Tag'
import MagneticCard from '@/components/MagneticCard'
import MiniPreview from '@/components/uilab/MiniPreview'
import StatusBadge from '@/components/uilab/StatusBadge'
import type { ContentEntry } from '@/lib/content'

export default function ExperimentCard({ entry }: { entry: ContentEntry }) {
  return (
    <MagneticCard strength={0.05} className="h-full">
      <Link
        href={`/ui-lab/${entry.slug}`}
        className="glass glow-hover group flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-warm/30"
      >
        <MiniPreview motif={entry.preview} />
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between">
            <StatusBadge status={entry.status} />
            <ArrowUpRight className="h-4 w-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-warm" />
          </div>
          <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
            {entry.title}
          </h3>
          {entry.summary && (
            <p className="mt-1.5 text-sm leading-relaxed text-muted line-clamp-2">
              {entry.summary}
            </p>
          )}
          {entry.tags?.length ? (
            <div className="mt-auto flex flex-wrap gap-2 pt-4">
              {entry.tags.slice(0, 3).map((tag) => (
                <Tag key={tag} tone="iris">
                  {tag}
                </Tag>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </MagneticCard>
  )
}
