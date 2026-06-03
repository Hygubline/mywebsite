import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import EntryCard from '@/components/EntryCard'
import Reveal from '@/components/anim/Reveal'
import { getCollection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Notes — Yun He',
  description: 'Half-formed thoughts, essays, and things I noticed on a Tuesday.',
}

export default function NotesPage() {
  const notes = getCollection('notes')

  return (
    <div className="container-main">
      <PageHeader
        eyebrow="Notes"
        title="Thinking out loud"
        intro="Half-formed thoughts, short essays, and things I want to remember. Written to figure things out, not to conclude them."
      />

      {notes.length === 0 ? (
        <p className="text-muted">No notes yet — check back soon.</p>
      ) : (
        <Reveal stagger={0.08} className="space-y-3">
          {notes.map((note, i) => (
            <EntryCard key={note.slug} entry={note} basePath="/notes" index={i} />
          ))}
        </Reveal>
      )}
    </div>
  )
}
