import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Hero from '@/components/Hero'
import HomeBento from '@/components/HomeBento'
import EntryCard from '@/components/EntryCard'
import Reveal from '@/components/anim/Reveal'
import { getCollection } from '@/lib/content'

export default function Home() {
  const recentNotes = getCollection('notes').slice(0, 3)

  return (
    <>
      <Hero />
      <HomeBento />

      {recentNotes.length > 0 && (
        <section className="section-container pb-28">
          <Reveal>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  Lately
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  From the notebook
                </h2>
              </div>
              <Link
                href="/notes"
                className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-warm"
              >
                All notes
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <Reveal stagger={0.1} className="space-y-3">
            {recentNotes.map((note, i) => (
              <EntryCard key={note.slug} entry={note} basePath="/notes" index={i} />
            ))}
          </Reveal>
        </section>
      )}
    </>
  )
}
