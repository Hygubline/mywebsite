import type { Metadata } from 'next'
import { Github, Linkedin, Mail, MapPin, GraduationCap } from 'lucide-react'
import SectionTitle from '@/components/SectionTitle'
import Tag from '@/components/Tag'
import Reveal from '@/components/anim/Reveal'
import VisitedGlobe from '@/components/VisitedGlobe'

export const metadata: Metadata = {
  title: 'About — Yun He',
  description: 'Who I am, and why this little corner of the internet exists.',
}

const learning = [
  'Front-end animation — GSAP, motion, and the small details that make an interface feel alive',
  'Design systems, and how to make a personal site feel like one coherent place',
  'Writing more, and editing myself a little less harshly',
  'Reading with intention, and keeping notes that survive past the last page',
]

const tools = ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Python', 'Figma']

const links = [
  { label: 'GitHub', href: 'https://github.com', Icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: Linkedin },
  { label: 'Email', href: 'mailto:hy1269335770@gmail.com', Icon: Mail },
]

export default function AboutPage() {
  return (
    <div className="container-main">
      <SectionTitle
        as="h1"
        eyebrow="About"
        title="Hi, I’m Yun."
        intro="Less a portfolio, more a place to think out loud."
        className="mb-10"
      />

      <Reveal className="prose">
        <p>
          I study computer science, build small web things, and use this site as a place to
          collect thoughts, experiments, reading notes, and unfinished ideas. I’m especially
          drawn to the expressive corners of front-end work — a button that leans toward your
          cursor, a page that fades in just so, an interface that feels considered.
        </p>
        <p>
          This corner of the internet is a garden, not a résumé. Things here are half-grown on
          purpose. <strong>It’s not meant to be perfect. It’s meant to grow.</strong>
        </p>
      </Reveal>

      <Reveal className="mt-12">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">
          Things I’m learning
        </h2>
        <ul className="space-y-3">
          {learning.map((item) => (
            <li key={item} className="flex items-start gap-3 text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warm" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-12">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">Tools I use</h2>
        <div className="flex flex-wrap gap-2.5">
          {tools.map((tool) => (
            <Tag key={tool} tone="warm">
              {tool}
            </Tag>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">
          Places I’ve been
        </h2>
        <VisitedGlobe />
      </Reveal>

      <Reveal className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-warm" /> CS @ Hunter College
        </span>
        <span className="inline-flex items-center gap-2">
          <MapPin className="h-4 w-4 text-warm" /> New York
        </span>
      </Reveal>

      <Reveal className="mt-10 border-t border-border pt-8">
        <p className="mb-4 text-sm text-muted">Say hi, or just see what I’m up to:</p>
        <div className="flex flex-wrap gap-3">
          {links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-warm/30 hover:bg-white/5"
            >
              <Icon className="h-4 w-4 text-warm" />
              {label}
            </a>
          ))}
        </div>
      </Reveal>
    </div>
  )
}
