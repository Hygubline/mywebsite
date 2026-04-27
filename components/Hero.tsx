'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const slower = { duration: 1.8, ease: [0.16, 1, 0.3, 1] as const }
const slow = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const noMotion = { opacity: 1, y: 0 }
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -80])

  return (
    <section ref={sectionRef} className="relative h-screen -mt-16 flex flex-col justify-end overflow-hidden">
      {/* Cinematic top gradient — dark room ceiling */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#0a0a0a] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      <motion.div
        style={prefersReduced ? {} : { opacity: heroOpacity, y: heroY }}
        className="container-cinema pb-20 md:pb-28 relative z-10"
      >
        {/* Eyebrow — film title card */}
        <motion.div
          initial={prefersReduced ? noMotion : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-[1px] bg-[#4a443c]" />
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#6b6359]">
              Archive / 2024
            </span>
          </div>
        </motion.div>

        {/* Main title — massive, editorial */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={prefersReduced ? noMotion : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ ...slower, delay: 0.6 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10rem] font-bold tracking-[-0.05em] leading-[0.85] text-[#e8e4df]"
          >
            Building
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1
            initial={prefersReduced ? noMotion : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ ...slower, delay: 0.85 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10rem] font-bold tracking-[-0.05em] leading-[0.85] text-[#8a8278]"
          >
            systems.
          </motion.h1>
        </div>

        {/* Subtitle block */}
        <div className="flex items-start gap-8 md:gap-12 mb-16">
          <motion.div
            initial={prefersReduced ? noMotion : { opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ ...slow, delay: 1.4 }}
            className="w-[1px] h-20 bg-gradient-to-b from-[#4a443c] to-transparent origin-top hidden md:block flex-shrink-0"
          />
          <motion.p
            initial={prefersReduced ? noMotion : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-[#6b6359] max-w-md leading-[1.9]"
          >
            AI tools, cognitive architectures, and the systems
            that emerge when intelligence becomes infrastructure.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={prefersReduced ? noMotion : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="flex items-center gap-4"
        >
          <div className="w-[1px] h-12 bg-[#e8e4df]/10 relative overflow-hidden">
            {!prefersReduced && (
              <motion.div
                className="absolute top-0 left-0 w-full bg-[#e8e4df]/30"
                animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </div>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#4a443c]">
            Scroll to explore
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
