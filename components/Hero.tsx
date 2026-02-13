'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-sm text-neutral-500">AI Builder & Systems Thinker</span>
        </div>

        <h1 className="mb-6 tracking-tight">
          <span className="gradient-text">Building systems</span>
          <br />
          <span className="text-white">with AI.</span>
        </h1>

        <p className="text-xl text-neutral-400 mb-10 max-w-xl leading-relaxed">
          I design tools, structure ideas, and explore leverage in the age of intelligence.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link href="/projects" className="btn-primary group">
            View Projects
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/writing" className="btn-secondary">
            Read Essays
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
