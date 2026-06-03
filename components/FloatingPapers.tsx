'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useMousePosition } from '@/lib/useMousePosition'

const ease = [0.16, 1, 0.3, 1] as const

interface PaperConfig {
  width: string
  height: string
  style: React.CSSProperties
  lineCount: number
  showFold: boolean
  showCorner: boolean
  showMargin: boolean
  parallaxFactor: number
  /** Framer Motion float keyframes */
  float: {
    x: number[]
    y: number[]
    rotateX: number[]
    rotateY: number[]
    rotateZ: number[]
    duration: number
  }
  delay: number
}

const papers: PaperConfig[] = [
  // Main paper — centerpiece
  {
    width: 'clamp(340px, 42vw, 580px)',
    height: 'clamp(460px, 58vw, 800px)',
    lineCount: 14,
    showFold: true,
    showCorner: true,
    showMargin: true,
    parallaxFactor: 1,
    style: { right: '4%', top: '4%', opacity: 0.09 },
    float: {
      x: [0, 8, -5, 10, 0],
      y: [0, -12, -20, -8, 0],
      rotateX: [-2, 3, -4, 2, -2],
      rotateY: [3, -2, 5, -3, 3],
      rotateZ: [-1, 2, -2, 1, -1],
      duration: 20,
    },
    delay: 0,
  },
  // Mid-distance paper — left side
  {
    width: 'clamp(140px, 16vw, 200px)',
    height: 'clamp(190px, 22vw, 280px)',
    lineCount: 6,
    showFold: true,
    showCorner: false,
    showMargin: false,
    parallaxFactor: 0.5,
    style: { left: '8%', bottom: '12%', opacity: 0.04 },
    float: {
      x: [0, -10, 6, -8, 0],
      y: [0, -8, -16, -4, 0],
      rotateX: [0, -3, 4, -2, 0],
      rotateY: [0, 4, -3, 5, 0],
      rotateZ: [0, -2, 3, -1, 0],
      duration: 25,
    },
    delay: 0.8,
  },
  // Far paper — tiny subtle depth
  {
    width: 'clamp(70px, 8vw, 100px)',
    height: 'clamp(90px, 10vw, 130px)',
    lineCount: 3,
    showFold: false,
    showCorner: false,
    showMargin: false,
    parallaxFactor: 0.25,
    style: { left: '48%', bottom: '5%', opacity: 0.025 },
    float: {
      x: [0, 5, -3, 7, 0],
      y: [0, -6, -10, -4, 0],
      rotateX: [0, 2, -3, 1, 0],
      rotateY: [0, -2, 3, -1, 0],
      rotateZ: [0, 1, -1, 2, 0],
      duration: 30,
    },
    delay: 1.5,
  },
  // Top-left ghost paper
  {
    width: 'clamp(80px, 9vw, 110px)',
    height: 'clamp(110px, 12vw, 150px)',
    lineCount: 4,
    showFold: false,
    showCorner: false,
    showMargin: false,
    parallaxFactor: 0.35,
    style: { left: '25%', top: '8%', opacity: 0.02 },
    float: {
      x: [0, -6, 4, -5, 0],
      y: [0, -5, -12, -3, 0],
      rotateX: [0, 3, -2, 4, 0],
      rotateY: [0, -3, 2, -4, 0],
      rotateZ: [0, 2, -1, 1, 0],
      duration: 22,
    },
    delay: 2.2,
  },
]

function PaperSheet({ config }: { config: PaperConfig }) {
  const { nx, ny } = useMousePosition()
  const prefersReduced = useReducedMotion()

  const mouseRotateY = (nx - 0.5) * 16 * config.parallaxFactor
  const mouseRotateX = -(ny - 0.5) * 12 * config.parallaxFactor
  const mouseTx = (nx - 0.5) * 50 * config.parallaxFactor
  const mouseTy = (ny - 0.5) * 30 * config.parallaxFactor

  const lines = Array.from({ length: config.lineCount }, (_, i) => i)

  return (
    <motion.div
      className="hero-paper"
      style={{
        width: config.width,
        height: config.height,
        ...config.style,
        transform: `translate3d(${mouseTx}px, ${mouseTy}px, 0) rotateX(${mouseRotateX}deg) rotateY(${mouseRotateY}deg)`,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={
        prefersReduced
          ? { opacity: config.style.opacity as number, scale: 1 }
          : {
              opacity: config.style.opacity as number,
              scale: [1, 1.02, 1],
              x: config.float.x,
              y: config.float.y,
            }
      }
      transition={
        prefersReduced
          ? { duration: 0.6 }
          : {
              opacity: { duration: 2, delay: config.delay, ease },
              scale: {
                duration: config.float.duration * 0.6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: config.delay,
              },
              x: {
                duration: config.float.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: config.delay,
              },
              y: {
                duration: config.float.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: config.delay,
              },
            }
      }
    >
      <div className="hero-paper-surface">
        <div className="hero-paper-lines">
          {lines.map((i) => (
            <div
              key={i}
              className="hero-paper-line"
              style={{
                width: `${35 + ((i * 19) % 50)}%`,
                marginTop: i === 0 ? '8%' : undefined,
              }}
            />
          ))}
        </div>
        {config.showMargin && <div className="hero-paper-margin" />}
        {config.showFold && <div className="hero-paper-fold" />}
        {config.showCorner && <div className="hero-paper-corner" />}
      </div>
    </motion.div>
  )
}

export function FloatingPapers() {
  return (
    <div className="hero-paper-container" aria-hidden="true">
      <div className="hero-light-cone" />
      {papers.map((config, i) => (
        <PaperSheet key={i} config={config} />
      ))}
    </div>
  )
}
