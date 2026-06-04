import type { Metadata } from 'next'
import SectionTitle from '@/components/SectionTitle'
import ContentCard from '@/components/ContentCard'
import Reveal from '@/components/anim/Reveal'
import { getCollection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Notes — Yun He',
  description: 'A personal thought archive — essays, stray thoughts, and learning reflections.',
}

export default function NotesPage() {
  const notes = getCollection('notes')

  return (
    <div className="container-main">
      <SectionTitle
        as="h1"
        eyebrow="Thought Archive"
        title="Notes"
        intro="Half-formed thoughts, short essays, and things I want to remember. Written to figure things out, not to conclude them."
        className="mb-12"
      />

      {notes.length === 0 ? (
        <p className="text-muted">No notes yet — check back soon.</p>
      ) : (
        <Reveal stagger={0.08} className="space-y-4">
          {notes.map((note, i) => (
            <ContentCard key={note.slug} entry={note} basePath="/notes" index={i} />
          ))}
        </Reveal>
      )}
    </div>
  )
}
