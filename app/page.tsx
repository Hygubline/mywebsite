import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Hero from '@/components/Hero'
import BentoGrid from '@/components/BentoGrid'
import RecentlyAdded from '@/components/RecentlyAdded'
import CurrentlyExploring from '@/components/CurrentlyExploring'
import SectionTitle from '@/components/SectionTitle'

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section-container py-20 sm:py-28">
        <SectionTitle
          eyebrow="Wander around"
          title="Five rooms in the garden"
          intro="Every door leads somewhere half-finished. Pick one and have a look."
          className="mb-10"
        />
        <BentoGrid />
      </section>

      <section className="section-container pb-8">
        <SectionTitle
          eyebrow="Lately"
          title="Recently added"
          className="mb-8"
          action={
            <Link
              href="/notes"
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-warm"
            >
              All notes
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />
        <RecentlyAdded />
      </section>

      <CurrentlyExploring />
    </>
  )
}
