import type { Metadata } from 'next'
import { Target, FolderKanban, CalendarCheck } from 'lucide-react'
import SectionTitle from '@/components/SectionTitle'
import Reveal from '@/components/anim/Reveal'
import StatCard from '@/components/personalos/StatCard'
import GoalCard from '@/components/personalos/GoalCard'
import ProjectCard from '@/components/personalos/ProjectCard'
import WeeklyPlan from '@/components/personalos/WeeklyPlan'
import SkillBar from '@/components/personalos/SkillBar'
import { yearGoals, weeklyPlan, projects, learningStack, dashboardStats } from '@/lib/personalOs'

export const metadata: Metadata = {
  title: 'Personal OS — Yun He',
  description: 'A living dashboard for my 2026 goals, weekly plan, and project progress.',
}

const statIcons = [
  <Target key="goals" className="h-5 w-5" />,
  <FolderKanban key="projects" className="h-5 w-5" />,
  <CalendarCheck key="focus" className="h-5 w-5" />,
]

export default function PersonalOsPage() {
  return (
    <div className="section-container relative z-10 pt-28 pb-24">
      {/* soft spotlight behind the header */}
      <div className="hero-spotlight pointer-events-none absolute inset-x-0 top-10 -z-10 h-72" />

      <SectionTitle
        as="h1"
        eyebrow="Personal OS"
        title="Personal OS"
        intro="Tracking goals, projects, and the systems I am building."
        className="mb-10"
      />

      {/* Top stats */}
      <Reveal stagger={0.1} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {dashboardStats.map((stat, i) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            hint={stat.hint}
            icon={statIcons[i]}
          />
        ))}
      </Reveal>

      {/* Year Goals */}
      <section className="mt-16">
        <SectionTitle eyebrow="2026" title="Year Goals" className="mb-6" />
        <Reveal stagger={0.08} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {yearGoals.map((goal) => (
            <GoalCard key={goal.title} goal={goal} />
          ))}
        </Reveal>
      </section>

      {/* Weekly Plan */}
      <section className="mt-16">
        <SectionTitle
          eyebrow="This Week"
          title="Weekly Plan"
          intro="A rhythm to keep momentum — today's row is highlighted."
          className="mb-6"
        />
        <Reveal>
          <WeeklyPlan plan={weeklyPlan} />
        </Reveal>
      </section>

      {/* Project Tracker */}
      <section className="mt-16">
        <SectionTitle eyebrow="In Motion" title="Project Tracker" className="mb-6" />
        <Reveal stagger={0.08} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </Reveal>
      </section>

      {/* Learning Progress */}
      <section className="mt-16">
        <SectionTitle
          eyebrow="Skills"
          title="Learning Progress"
          intro="An honest snapshot of where I am — these move as I keep building."
          className="mb-6"
        />
        <Reveal className="glass-card rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
            {learningStack.map((skill) => (
              <SkillBar
                key={skill.label}
                label={skill.label}
                value={skill.value}
                level={skill.level}
              />
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  )
}
