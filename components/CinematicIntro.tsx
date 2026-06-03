'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function CinematicIntro() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setShow(false)
      return
    }
    const timer = setTimeout(() => setShow(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Top curtain */}
          <motion.div
            className="fixed inset-x-0 top-0 h-1/2 bg-[#0a0a0a] z-[10000]"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />
          {/* Bottom curtain */}
          <motion.div
            className="fixed inset-x-0 bottom-0 h-1/2 bg-[#0a0a0a] z-[10000]"
            initial={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />
          {/* Center line that splits */}
          <motion.div
            className="fixed left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] z-[10001]"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              scaleX: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
              opacity: { duration: 0.4, delay: 0.3 },
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#e8e4df]/30 to-transparent" />
          </motion.div>
          {/* Center title flash */}
          <motion.div
            className="fixed inset-0 z-[10001] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.6, delay: 0.8 },
            }}
          >
            <motion.span
              className="text-[11px] font-mono tracking-[0.4em] uppercase text-[#6b6359]"
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              animate={{ opacity: 1, letterSpacing: '0.4em' }}
              exit={{ opacity: 0, letterSpacing: '0.6em' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            >
              Yun He
            </motion.span>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
