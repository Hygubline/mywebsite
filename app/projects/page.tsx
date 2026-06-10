import type { Metadata } from 'next'
import AmbientBackground from '@/components/AmbientBackground'
import ProjectIndex from '@/components/work/ProjectIndex'
import { workIndexProjects } from '@/lib/workIndex'

export const metadata: Metadata = {
  title: 'Selected Work - Yun He',
  description:
    'A cinematic index of personal projects, systems, and interface experiments by Yun He.',
}

export default function ProjectsPage() {
  return (
    <div className="work-page-shell relative isolate min-h-screen overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24">
      <AmbientBackground variant="work" />
      <ProjectIndex
        title="SELECTED WORK"
        intro="Personal systems, studio-style builds, and interface experiments arranged as a darker, more deliberate project index."
        projects={workIndexProjects}
      />
    </div>
  )
}
