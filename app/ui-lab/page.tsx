import type { Metadata } from 'next'
import SectionTitle from '@/components/SectionTitle'
import ExperimentCard from '@/components/uilab/ExperimentCard'
import Reveal from '@/components/anim/Reveal'
import { getCollection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'UI Lab — Yun He',
  description: 'A gallery of front-end motion experiments and interface ideas I want to learn.',
}

export default function UILabPage() {
  const experiments = getCollection('ui-lab')

  return (
    <div className="container-main">
      <SectionTitle
        as="h1"
        eyebrow="Experiments"
        title="UI Lab"
        intro="A gallery of front-end animation and interface experiments — beautiful web effects I’ve built or want to learn. Some are finished, some are still just ideas. Poke at the live ones."
        className="mb-12"
      />

      {experiments.length === 0 ? (
        <p className="text-muted">No experiments yet — check back soon.</p>
      ) : (
        <Reveal stagger={0.07} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {experiments.map((exp) => (
            <div key={exp.slug} className="h-full">
              <ExperimentCard entry={exp} />
            </div>
          ))}
        </Reveal>
      )}
    </div>
  )
}
