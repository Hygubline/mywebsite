import Hero from '@/components/Hero'
import Section from '@/components/Section'
import { BentoGrid } from '@/components/BentoGrid'
import { SkillsSection } from '@/components/SkillsSection'
import EssayCard from '@/components/EssayCard'
import { WelcomeIntro } from '@/components/WelcomeIntro'
import { NavigationDock } from '@/components/NavigationDock'
import { getProjects } from '@/lib/getProjects'
import { getPosts } from '@/lib/getPosts'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function Home() {
  const projects = await getProjects()
  const posts = await getPosts()

  return (
    <div className="container-main">
      <WelcomeIntro />
      <Hero />

      <Section title="Selected Projects" subtitle="Systems I've designed and built">
        <BentoGrid projects={projects.slice(0, 3)} />
      </Section>

      <SkillsSection />

      <Section title="Latest Essays" subtitle="Ideas worth articulating">
        <div className="space-y-4">
          {posts.slice(0, 3).map((post, index) => (
            <EssayCard key={post.slug} post={post} index={index} />
          ))}
        </div>
        {posts.length > 3 && (
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 mt-6 text-sm text-neutral-500 hover:text-white transition-colors group"
          >
            Read all essays
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </Section>

      <Section title="Now">
        <div className="glass-card p-6">
          <p className="text-neutral-400 leading-relaxed">
            Currently building AI-powered productivity tools. Learning about systems design
            and cognitive architecture. Thinking about leverage and long-term positioning.
          </p>
          <Link
            href="/now"
            className="inline-flex items-center gap-2 mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors group"
          >
            See full update
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Section>

      <NavigationDock />
    </div>
  )
}
