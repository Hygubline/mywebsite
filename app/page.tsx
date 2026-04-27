import Hero from '@/components/Hero'
import Section from '@/components/Section'
import { BentoGrid } from '@/components/BentoGrid'
import { SkillsSection } from '@/components/SkillsSection'
import EssayCard from '@/components/EssayCard'
import { NavigationDock } from '@/components/NavigationDock'
import { getProjects } from '@/lib/getProjects'
import { getPosts } from '@/lib/getPosts'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function Home() {
  const projects = await getProjects()
  const posts = await getPosts()

  return (
    <div>
      <Hero />

      {/* About — like narration */}
      <Section title="About" number="01" subtitle="A brief introduction">
        <div className="max-w-2xl">
          <p className="text-lg leading-[1.9] text-[#8a8278]">
            I build at the intersection of AI and product design.
            My work focuses on creating systems that amplify human capability —
            tools that think alongside you, not for you.
          </p>
          <p className="text-lg leading-[1.9] text-[#6b6359] mt-6">
            Currently exploring cognitive architectures, autonomous agents,
            and the design patterns that emerge when intelligence becomes infrastructure.
          </p>
        </div>
      </Section>

      {/* Projects — immersive case studies */}
      <Section title="Selected Work" number="02" subtitle="Systems I've designed and built">
        <BentoGrid projects={projects.slice(0, 3)} />
      </Section>

      <SkillsSection />

      {/* Essays — like chapters */}
      <Section title="Writing" number="04" subtitle="Ideas worth articulating">
        <div>
          {posts.slice(0, 3).map((post, index) => (
            <EssayCard key={post.slug} post={post} index={index} />
          ))}
        </div>
        {posts.length > 3 && (
          <Link
            href="/writing"
            className="inline-flex items-center gap-3 mt-10 text-[12px] tracking-[0.1em] uppercase text-[#4a443c] hover:text-[#8a8278] transition-colors duration-700 group"
          >
            Read all essays
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-700" />
          </Link>
        )}
      </Section>

      {/* Now — quiet update */}
      <Section title="Now" number="05">
        <div className="max-w-2xl">
          <p className="text-[#8a8278] leading-[1.9]">
            Currently building AI-powered productivity tools. Learning about systems design
            and cognitive architecture. Thinking about leverage and long-term positioning.
          </p>
          <Link
            href="/now"
            className="inline-flex items-center gap-3 mt-8 text-[12px] tracking-[0.1em] uppercase text-[#4a443c] hover:text-[#8a8278] transition-colors duration-700 group"
          >
            See full update
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-700" />
          </Link>
        </div>
      </Section>

      <NavigationDock />
    </div>
  )
}
