import type { Metadata } from 'next'
import { Mail, Twitter, Linkedin, Github, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact — Yun He',
  description: 'Get in touch for collaborations and opportunities.',
}

const socials = [
  { icon: Mail, label: 'Email', value: 'your@email.com', href: 'mailto:your@email.com' },
  { icon: Twitter, label: 'X', value: '@yourusername', href: 'https://twitter.com/yourusername' },
  { icon: Linkedin, label: 'LinkedIn', value: '/in/yourusername', href: 'https://linkedin.com/in/yourusername' },
  { icon: Github, label: 'GitHub', value: '@yourusername', href: 'https://github.com/yourusername' },
]

const openTo = [
  'AI product collaborations',
  'Technical consulting',
  'Speaking opportunities',
  'Interesting conversations',
]

export default function ContactPage() {
  return (
    <div className="container-main">
      <div className="mb-12">
        <h1 className="mb-4">Contact</h1>
        <p className="text-xl text-neutral-500">
          I work best with founders building AI-native tools.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-6 tracking-tight">
            Get in Touch
          </h2>
          <div className="space-y-4">
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="flex items-center gap-4 text-neutral-400 hover:text-white transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-neutral-600">{social.label}</span>
                    <p className="text-white">{social.value}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
                </a>
              )
            })}
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-6 tracking-tight">
            Open to
          </h2>
          <ul className="space-y-3">
            {openTo.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="text-blue-400">→</span>
                <span className="text-neutral-400">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
