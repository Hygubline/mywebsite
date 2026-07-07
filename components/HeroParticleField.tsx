'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  angle: number
  baseRadius: number
  speed: number
  wobble: number
  wobbleSpeed: number
  size: number
  alpha: number
  offset: number
  driftX: number
  driftY: number
  color: string
}

const PARTICLE_COLORS = [
  '230, 184, 119',
  '241, 234, 219',
  '160, 142, 232',
]

export default function HeroParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false }
    const particles: Particle[] = []
    let frame = 0
    let raf = 0
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const buildParticles = () => {
      particles.length = 0

      const count = width < 640 ? 54 : width < 1024 ? 74 : 110
      const radiusMin = Math.min(width, height) * 0.18
      const radiusMax = Math.min(width, height) * 0.33

      for (let i = 0; i < count; i += 1) {
        particles.push({
          angle: Math.random() * Math.PI * 2,
          baseRadius: radiusMin + Math.random() * (radiusMax - radiusMin),
          speed: 0.0007 + Math.random() * 0.0016,
          wobble: 10 + Math.random() * 34,
          wobbleSpeed: 0.6 + Math.random() * 1.8,
          size: 0.75 + Math.random() * 2,
          alpha: 0.22 + Math.random() * 0.45,
          offset: Math.random() * Math.PI * 2,
          driftX: -24 + Math.random() * 48,
          driftY: -18 + Math.random() * 36,
          color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
        })
      }
    }

    const resize = () => {
      width = window.innerWidth
      height = Math.max(window.innerHeight, 820)
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      context.setTransform(1, 0, 0, 1, 0, 0)
      context.scale(dpr, dpr)
      buildParticles()
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    const draw = () => {
      frame += 1
      context.clearRect(0, 0, width, height)

      const time = frame * 0.012
      const centerX = width * 0.5 + (pointer.active ? (pointer.x - width * 0.5) * 0.03 : 0)
      const centerY = height * 0.37 + (pointer.active ? (pointer.y - height * 0.37) * 0.02 : 0)
      const positions: Array<{ x: number; y: number; alpha: number; color: string }> = []

      for (const particle of particles) {
        particle.angle += particle.speed

        const swirl = Math.sin(time * particle.wobbleSpeed + particle.offset) * particle.wobble
        const radius =
          particle.baseRadius +
          swirl +
          (pointer.active ? Math.sin(time + particle.offset) * 8 : 0)
        const ellipseX = radius * 1.05
        const ellipseY = radius * 0.68

        const x =
          centerX +
          Math.cos(particle.angle) * ellipseX +
          Math.sin(time * 0.7 + particle.offset) * particle.driftX
        const y =
          centerY +
          Math.sin(particle.angle) * ellipseY +
          Math.cos(time * 0.85 + particle.offset) * particle.driftY

        positions.push({ x, y, alpha: particle.alpha, color: particle.color })

        const glow = context.createRadialGradient(x, y, 0, x, y, particle.size * 10)
        glow.addColorStop(0, `rgba(${particle.color}, ${particle.alpha})`)
        glow.addColorStop(1, `rgba(${particle.color}, 0)`)

        context.beginPath()
        context.fillStyle = glow
        context.arc(x, y, particle.size * 5.2, 0, Math.PI * 2)
        context.fill()

        context.beginPath()
        context.fillStyle = `rgba(${particle.color}, ${Math.min(particle.alpha + 0.16, 0.85)})`
        context.arc(x, y, particle.size, 0, Math.PI * 2)
        context.fill()
      }

      for (let i = 0; i < positions.length; i += 1) {
        const a = positions[i]

        for (let j = i + 1; j < positions.length; j += 1) {
          const b = positions[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance > 68) continue

          const opacity = (1 - distance / 68) * 0.16
          context.beginPath()
          context.strokeStyle = `rgba(241, 234, 219, ${opacity})`
          context.lineWidth = 0.55
          context.moveTo(a.x, a.y)
          context.lineTo(b.x, b.y)
          context.stroke()
        }
      }

      raf = window.requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(circle_at_center,black_0%,black_48%,transparent_88%)]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-70 mix-blend-screen"
      />
    </div>
  )
}
