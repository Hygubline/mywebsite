'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

export function FloatingPapers() {
  const paperRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const mousePos = useRef({ x: 0.5, y: 0.5 })
  const currentTransform = useRef({ x: 0, y: 0, rotateX: 0, rotateY: 0 })
  const rafId = useRef<number>(0)

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t

  const animate = useCallback(() => {
    const targetRotateY = (mousePos.current.x - 0.5) * 12
    const targetRotateX = -(mousePos.current.y - 0.5) * 8
    const targetX = (mousePos.current.x - 0.5) * 30
    const targetY = (mousePos.current.y - 0.5) * 20

    currentTransform.current.rotateY = lerp(currentTransform.current.rotateY, targetRotateY, 0.03)
    currentTransform.current.rotateX = lerp(currentTransform.current.rotateX, targetRotateX, 0.03)
    currentTransform.current.x = lerp(currentTransform.current.x, targetX, 0.03)
    currentTransform.current.y = lerp(currentTransform.current.y, targetY, 0.03)

    if (paperRef.current) {
      paperRef.current.style.transform = `
        translate3d(${currentTransform.current.x}px, ${currentTransform.current.y}px, 0)
        rotateX(${currentTransform.current.rotateX}deg)
        rotateY(${currentTransform.current.rotateY}deg)
      `
    }

    rafId.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [animate])

  if (!mounted) return null

  const lines = Array.from({ length: 9 }, (_, i) => i)

  return (
    <div className="hero-paper-container" aria-hidden="true">
      {/* Main large floating paper */}
      <div
        ref={paperRef}
        className="hero-paper animate-paper-drift"
        style={{
          width: 'clamp(280px, 35vw, 500px)',
          height: 'clamp(380px, 48vw, 680px)',
          right: '8%',
          top: '10%',
          opacity: 0.06,
          animationDuration: '20s',
        }}
      >
        <div className="hero-paper-surface animate-paper-breathe">
          <div className="hero-paper-lines">
            {lines.map((i) => (
              <div
                key={i}
                className="hero-paper-line"
                style={{
                  width: `${45 + ((i * 17) % 40)}%`,
                  marginTop: i === 0 ? '10%' : undefined,
                }}
              />
            ))}
          </div>
          <div className="hero-paper-fold" />
          <div className="hero-paper-corner" />
        </div>
      </div>

      {/* Small secondary paper — subtle depth */}
      <div
        className="hero-paper animate-paper-drift"
        style={{
          width: 'clamp(100px, 12vw, 160px)',
          height: 'clamp(140px, 16vw, 220px)',
          left: '12%',
          bottom: '18%',
          opacity: 0.03,
          animationDuration: '25s',
          animationDelay: '-8s',
        }}
      >
        <div className="hero-paper-surface">
          <div className="hero-paper-lines">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="hero-paper-line"
                style={{ width: `${50 + ((i * 13) % 35)}%` }}
              />
            ))}
          </div>
          <div className="hero-paper-fold" />
        </div>
      </div>

      {/* Tiny distant paper */}
      <div
        className="hero-paper animate-paper-drift"
        style={{
          width: 'clamp(60px, 7vw, 90px)',
          height: 'clamp(80px, 9vw, 120px)',
          left: '55%',
          bottom: '8%',
          opacity: 0.02,
          animationDuration: '28s',
          animationDelay: '-14s',
        }}
      >
        <div className="hero-paper-surface">
          <div className="hero-paper-lines">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="hero-paper-line"
                style={{ width: `${40 + i * 15}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
