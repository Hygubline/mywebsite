import type { Metadata } from 'next'
import { Github, Linkedin, Mail, MapPin, GraduationCap } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/anim/Reveal'

export const metadata: Metadata = {
  title: 'About — Yun He',
  description: 'Who I am, what I’m learning, and how to reach me.',
}

const learning = [
  'Front-end animation — GSAP, motion, and the small details that make interfaces feel alive',
  'Design systems and how to make a personal site feel cohesive',
  'Writing more, and editing less harshly',
  'Reading with intention and keeping notes that survive past the last page',
]

const links = [
  { label: 'GitHub', href: 'https://github.com', Icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: Linkedin },
  { label: 'Email', href: 'mailto:hy1269335770@gmail.com', Icon: Mail },
]

export default function AboutPage() {
  return (
    <div className="container-main">
      <PageHeader
        eyebrow="About"
        title="Hi, I’m Yun."
        intro="This site is less a portfolio and more a place to think out loud."
      />

      <Reveal className="prose">
        <p>
          I’m a Computer Science student at Hunter College in New York. I like building
          things for the web — especially the small, expressive details: a button that
          leans toward your cursor, a page that fades in just so, an interface that feels
          considered.
        </p>
        <p>
          This corner of the internet is where I collect ideas, run little front-end
          experiments, write notes to myself, and keep track of what I’m reading. It’s a
          garden, not a résumé — things here are half-grown on purpose. I’m figuring it out
          as I go, in the open.
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
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-warm/30 hover:bg-white/5"
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
