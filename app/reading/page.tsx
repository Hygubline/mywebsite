import type { Metadata } from 'next'
import AmbientBackground from '@/components/AmbientBackground'
import ReadingRoom from '@/components/bookshelf/ReadingRoom'
import { getCollection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Bookshelf - Yun He',
  description:
    "Things I've read, things I'm thinking about, and things that left a mark.",
}

export default function ReadingPage() {
  const reading = getCollection('reading')

  return (
    <div className="relative isolate overflow-hidden bg-[#050506] pb-24 pt-24 sm:pb-28 sm:pt-28">
      <AmbientBackground variant="home" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        <ReadingRoom entries={reading} />
      </div>
    </div>
  )
}
