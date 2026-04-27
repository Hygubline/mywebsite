'use client'

import { motion } from 'framer-motion'

const slow = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }
const slower = { duration: 1.8, ease: [0.16, 1, 0.3, 1] as const }

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end pb-20 md:pb-28 overflow-hidden">
      <div className="container-cinema">
        {/* Eyebrow — like a film title card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="mb-10"
        >
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#6b6359]">
            Yun He / Portfolio
          </span>
        </motion.div>

        {/* Main title — editorial scale */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ ...slower, delay: 0.8 }}
          >
            Building
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-12">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ ...slower, delay: 1.0 }}
            className="text-[#8a8278]"
          >
            systems with AI.
          </motion.h1>
        </div>

        {/* Subtitle — like narration text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.6 }}
          className="text-lg md:text-xl text-[#6b6359] max-w-lg leading-[1.8] mb-16"
        >
          I design tools, structure ideas, and explore leverage
          in the age of intelligence.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="flex items-center gap-4"
        >
          <div className="w-[1px] h-12 bg-[#e8e4df]/10 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#e8e4df]/30"
              animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#4a443c]">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  )
}
