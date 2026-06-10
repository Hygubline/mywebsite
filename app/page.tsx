import AmbientBackground from '@/components/AmbientBackground'
import CinematicHero from '@/components/home/CinematicHero'
import InteractiveWorkIndex from '@/components/home/InteractiveWorkIndex'
import LabPreviewGrid from '@/components/home/LabPreviewGrid'
import BookshelfPreview from '@/components/home/BookshelfPreview'
import QuietHomeFooter from '@/components/home/QuietHomeFooter'
import { getCollection } from '@/lib/content'
import { getProjects } from '@/lib/getProjects'

export default async function Home() {
  const reading = getCollection('reading')
  const labEntries = getCollection('ui-lab')
  const projectEntries = await getProjects()

  return (
    <div className="relative isolate overflow-hidden bg-[#050506]">
      <AmbientBackground variant="home" />
      <CinematicHero />
      <InteractiveWorkIndex projects={projectEntries} />
      <LabPreviewGrid entries={labEntries.slice(0, 3)} />
      <BookshelfPreview current={reading[0] ?? null} secondary={reading.slice(1, 3)} />
      <QuietHomeFooter />
    </div>
  )
}
