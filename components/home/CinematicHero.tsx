'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const heroLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Bookshelf', href: '#bookshelf' },
  { label: 'Lab', href: '#lab' },
  { label: 'Goals', href: '/personal-os' },
  { label: 'Notes', href: '/notes' },
]

const ease = [0.16, 1, 0.3, 1] as const

export default function CinematicHero() {
  return (
    <section className="home-hero-shell relative isolate overflow-hidden">
      <div className="ambient-noise absolute inset-0 opacity-[0.045]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.045),transparent_18%),radial-gradient(circle_at_74%_24%,rgba(216,149,74,0.16),transparent_28%),radial-gradient(circle_at_55%_100%,rgba(255,255,255,0.04),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,8,0.4),rgba(7,7,8,0.68)_55%,rgba(7,7,8,0.92)_100%)]" />
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:112px_112px]" />

      <div className="section-container relative z-10 flex min-h-[100svh] items-end pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[0.68rem] uppercase tracking-[0.34em] text-[#d39b59] backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#d39b59]" />
            New York / Front-End / Motion Studies
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.08, ease }}
            className="mt-8"
          >
            <p className="max-w-[10ch] text-[3.8rem] font-semibold uppercase leading-[0.86] tracking-[-0.08em] text-[#f4efe7] sm:text-[5.8rem] lg:text-[8.4rem]">
              YUN HE
            </p>
            <p className="mt-4 max-w-[20ch] [font-family:Iowan_Old_Style,Georgia,serif] text-[1rem] uppercase tracking-[0.42em] text-[#978d81] sm:text-[1.08rem]">
              PERSONAL DIGITAL LAB
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.18, ease }}
            className="mt-10 max-w-2xl"
          >
            <p className="text-base leading-8 text-[#b8aea1] sm:text-lg sm:leading-9">
              A dark, cinematic index of projects, interface experiments, reading notes,
              and systems-in-progress. Less portfolio, more technical studio diary.
            </p>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease }}
            aria-label="Homepage sections"
            className="mt-12 flex flex-wrap gap-3 text-[0.78rem] uppercase tracking-[0.26em] text-[#8c8378]"
          >
            {heroLinks.map((link) => {
              const classes =
                'group inline-flex items-center gap-3 rounded-full border border-white/8 bg-white/[0.025] px-4 py-2.5 transition-colors duration-300 hover:border-[#d39b59]/28 hover:text-[#f4efe7]'

              return link.href.startsWith('#') ? (
                <a key={link.label} href={link.href} className={classes}>
                  <span className="h-1 w-1 rounded-full bg-[#d39b59]/80 transition-transform duration-300 group-hover:scale-125" />
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} href={link.href} className={classes}>
                  <span className="h-1 w-1 rounded-full bg-[#d39b59]/80 transition-transform duration-300 group-hover:scale-125" />
                  {link.label}
                </Link>
              )
            })}
          </motion.nav>
        </div>
      </div>
    </section>
  )
}
