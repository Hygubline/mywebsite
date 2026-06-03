import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import EntryCard from '@/components/EntryCard'
import ReadingShelf from '@/components/ReadingShelf'
import Reveal from '@/components/anim/Reveal'
import { getCollection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Reading — Yun He',
  description: 'Notes on books and articles, so I actually remember them.',
}

export default function ReadingPage() {
  const reading = getCollection('reading')

  return (
    <div className="container-main">
      <PageHeader
        eyebrow="Reading"
        title="What I’m reading"
        intro="Notes on books and articles that left a mark — what stuck, and how I want to use it. Less a review, more a memory aid."
      />

      <ReadingShelf />

      {reading.length === 0 ? (
        <p className="text-muted">No reading notes yet — check back soon.</p>
      ) : (
        <Reveal stagger={0.08} className="space-y-3">
          {reading.map((entry, i) => (
            <EntryCard key={entry.slug} entry={entry} basePath="/reading" index={i} />
          ))}
        </Reveal>
      )}
    </div>
  )
}
