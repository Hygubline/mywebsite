'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react'

// WebGL canvas can't render on the server — load it only in the browser.
const Lanyard = dynamic(() => import('@/components/Lanyard'), { ssr: false })

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void) => number
  cancelIdleCallback?: (id: number) => void
}

export default function Hero() {
  // Defer the heavy three.js bundle until the page is idle so the text paints first.
  const [show3D, setShow3D] = useState(false)

  useEffect(() => {
    const w = window as IdleWindow
    const schedule = w.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300))
    const id = schedule(() => setShow3D(true))
    return () => {
      if (w.cancelIdleCallback) w.cancelIdleCallback(id)
      else window.clearTimeout(id)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent-cyan/[0.03] via-transparent to-transparent" />
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-accent-blue/[0.04] rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-accent-gold/[0.03] rounded-full blur-[100px]" />

      {/* Interactive 3D lanyard — drag the card. Hidden on small screens for performance. */}
      <div className="hidden lg:block absolute top-0 right-0 z-[1] h-full w-1/2 pointer-events-auto">
        {show3D && <Lanyard position={[0, 0, 16]} gravity={[0, -40, 0]} fov={20} />}
      </div>

      <div className="section-container relative z-10 py-32 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl lg:max-w-xl pointer-events-auto"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            <span className="text-xs text-accent-cyan font-medium">Open to Opportunities</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-accent-cyan to-accent-blue bg-clip-text text-transparent">
              Yun He.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted leading-relaxed mb-4 max-w-2xl">
            Computer Science student building web applications, data tools, and practical software for real-world business needs.
          </p>

          <p className="text-sm sm:text-base text-muted/70 leading-relaxed mb-10 max-w-2xl">
            I work with React, Next.js, TypeScript, Python, SQL, and modern web technologies. I&apos;m currently looking for software engineering internship, frontend development, Python/SQL, and technical support opportunities.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-accent-cyan text-background font-medium text-sm hover:bg-accent-cyan/90 transition-all duration-200 hover:shadow-lg hover:shadow-accent-cyan/20"
            >
              View Projects
            </a>
            <a
              href="#"
              className="px-6 py-3 rounded-lg border border-white/10 text-foreground font-medium text-sm hover:bg-white/5 transition-all duration-200"
            >
              Download Resume
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:hy1269335770@gmail.com"
              className="text-muted hover:text-foreground transition-colors duration-200"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto"
        >
          <a href="#about" className="text-muted/40 hover:text-muted transition-colors">
            <ArrowDown size={20} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
