import type { Metadata } from 'next'
import SectionTitle from '@/components/SectionTitle'
import ContentCard from '@/components/ContentCard'
import ReadingShelf from '@/components/ReadingShelf'
import Reveal from '@/components/anim/Reveal'
import { getCollection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Reading — Yun He',
  description: 'Notes from books, literature, and ideas that stayed with me.',
}

export default function ReadingPage() {
  const reading = getCollection('reading')

  return (
    <div className="container-main">
      <SectionTitle
        as="h1"
        eyebrow="Reading"
        title="What stayed with me"
        intro="Reflections on books and literature — the ideas that lingered, and the single sentence I never want to forget from each one."
        className="mb-12"
      />

      <ReadingShelf />

      {reading.length === 0 ? (
        <p className="text-muted">No reading notes yet — check back soon.</p>
      ) : (
        <Reveal stagger={0.08} className="space-y-4">
          {reading.map((entry, i) => (
            <ContentCard
              key={entry.slug}
              entry={entry}
              basePath="/reading"
              index={i}
              showReadTime={false}
            />
          ))}
        </Reveal>
      )}
    </div>
  )
}
