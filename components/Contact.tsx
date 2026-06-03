'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Github, Linkedin, FileText } from 'lucide-react'

const contactLinks = [
  {
    label: 'hy1269335770@gmail.com',
    href: 'mailto:hy1269335770@gmail.com',
    icon: Mail,
    description: 'Send me an email',
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: Github,
    description: 'Check out my code',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
    description: 'Connect with me',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="py-24 sm:py-32 bg-surface/30">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto"
        >
          <h2 className="text-sm font-medium text-accent-cyan uppercase tracking-widest mb-3">
            Contact
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
            Let&apos;s connect
          </h3>
          <p className="text-muted text-base mb-10">
            I&apos;m actively looking for internship and entry-level opportunities. Feel free to reach out if you&apos;d like to work together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md mx-auto space-y-4"
        >
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-surface hover:border-white/[0.12] hover:bg-surface-light transition-all duration-200 group"
            >
              <div className="p-2.5 rounded-lg bg-accent-cyan/10 group-hover:bg-accent-cyan/15 transition-colors">
                <link.icon size={18} className="text-accent-cyan" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{link.label}</p>
                <p className="text-xs text-muted">{link.description}</p>
              </div>
            </a>
          ))}

          <div className="pt-4 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-cyan text-background font-medium text-sm hover:bg-accent-cyan/90 transition-all duration-200 hover:shadow-lg hover:shadow-accent-cyan/20"
            >
              <FileText size={16} />
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
