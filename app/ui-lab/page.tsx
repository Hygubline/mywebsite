import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/anim/Reveal'
import { getCollection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'UI Lab — Yun He',
  description: 'Front-end experiments and little animations I build to see if I can.',
}

export default function UILabPage() {
  const experiments = getCollection('ui-lab')

  return (
    <div className="container-main">
      <PageHeader
        eyebrow="UI Lab"
        title="Experiments &amp; playthings"
        intro="Small front-end experiments — micro-interactions, motion studies, and interface ideas I build just to see how they feel. Each one is live; poke at it."
      />

      {experiments.length === 0 ? (
        <p className="text-muted">No experiments yet — check back soon.</p>
      ) : (
        <Reveal stagger={0.08} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {experiments.map((exp) => (
            <Link
              key={exp.slug}
              href={`/ui-lab/${exp.slug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-warm/30 hover:bg-surface/70"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-warm/[0.05] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-warm/60">
                  experiment
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-warm" />
              </div>
              <div className="relative z-10 mt-8">
                <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                {exp.summary && (
                  <p className="mt-1.5 text-sm leading-relaxed text-muted line-clamp-2">
                    {exp.summary}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </Reveal>
      )}
    </div>
  )
}
