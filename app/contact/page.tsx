import type { Metadata } from 'next'
import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import SectionTitle from '@/components/SectionTitle'
import Reveal from '@/components/anim/Reveal'

export const metadata: Metadata = {
  title: 'Contact — Yun He',
  description: 'Say hi, ask a question, or just see what I’m building.',
}

const links = [
  {
    label: 'Email',
    value: 'hy1269335770@gmail.com',
    href: 'mailto:hy1269335770@gmail.com',
    Icon: Mail,
  },
  { label: 'GitHub', value: 'github.com/Hygubline', href: 'https://github.com/Hygubline', Icon: Github },
  { label: 'LinkedIn', value: 'Connect with me', href: 'https://linkedin.com', Icon: Linkedin },
]

export default function ContactPage() {
  return (
    <div className="container-main">
      <SectionTitle
        as="h1"
        eyebrow="Contact"
        title="Let’s talk"
        intro="I’m a CS student looking for frontend / software internships, and always happy to chat about building for the web. The fastest way to reach me is email."
        className="mb-10"
      />

      <Reveal stagger={0.08} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {links.map(({ label, value, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="glass-card glow-hover group flex flex-col rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
          >
            <Icon className="h-5 w-5 text-warm transition-transform duration-300 group-hover:scale-110" />
            <span className="mt-4 text-sm font-medium text-foreground">{label}</span>
            <span className="mt-0.5 truncate text-xs text-muted">{value}</span>
          </a>
        ))}
      </Reveal>

      <Reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-8 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <MapPin className="h-4 w-4 text-warm" /> New York · open to NY / NJ & remote
        </span>
      </Reveal>
    </div>
  )
}
