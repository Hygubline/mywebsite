'use client'

import { useMousePosition } from '@/lib/useMousePosition'

function PaperSheet({
  width,
  height,
  style,
  lineCount = 8,
  showFold = true,
  showCorner = false,
  showMargin = false,
  parallaxFactor = 1,
}: {
  width: string
  height: string
  style: React.CSSProperties
  lineCount?: number
  showFold?: boolean
  showCorner?: boolean
  showMargin?: boolean
  parallaxFactor?: number
}) {
  const { nx, ny } = useMousePosition()

  const rotateY = (nx - 0.5) * 16 * parallaxFactor
  const rotateX = -(ny - 0.5) * 12 * parallaxFactor
  const tx = (nx - 0.5) * 50 * parallaxFactor
  const ty = (ny - 0.5) * 30 * parallaxFactor

  const lines = Array.from({ length: lineCount }, (_, i) => i)

  return (
    <div
      className="hero-paper"
      style={{
        width,
        height,
        ...style,
        transform: `translate3d(${tx}px, ${ty}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
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
        {showMargin && <div className="hero-paper-margin" />}
        {showFold && <div className="hero-paper-fold" />}
        {showCorner && <div className="hero-paper-corner" />}
      </div>
    </div>
  )
}

export function FloatingPapers() {
  return (
    <div className="hero-paper-container" aria-hidden="true">
      {/* Volumetric light cone behind main paper */}
      <div className="hero-light-cone" />

      {/* Main paper — the centerpiece */}
      <PaperSheet
        width="clamp(340px, 42vw, 580px)"
        height="clamp(460px, 58vw, 800px)"
        lineCount={14}
        showFold
        showCorner
        showMargin
        parallaxFactor={1}
        style={{
          right: '4%',
          top: '4%',
          opacity: 0.09,
        }}
      />

      {/* Mid-distance paper — left side depth */}
      <PaperSheet
        width="clamp(140px, 16vw, 200px)"
        height="clamp(190px, 22vw, 280px)"
        lineCount={6}
        showFold
        parallaxFactor={0.5}
        style={{
          left: '8%',
          bottom: '12%',
          opacity: 0.04,
          animationName: 'paperDrift',
          animationDuration: '25s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
          animationDelay: '-8s',
        }}
      />

      {/* Far paper — tiny, subtle depth */}
      <PaperSheet
        width="clamp(70px, 8vw, 100px)"
        height="clamp(90px, 10vw, 130px)"
        lineCount={3}
        showFold={false}
        parallaxFactor={0.25}
        style={{
          left: '48%',
          bottom: '5%',
          opacity: 0.025,
          animationName: 'paperDrift',
          animationDuration: '30s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
          animationDelay: '-15s',
        }}
      />

      {/* Top-left ghost paper — very faint */}
      <PaperSheet
        width="clamp(80px, 9vw, 110px)"
        height="clamp(110px, 12vw, 150px)"
        lineCount={4}
        showFold={false}
        parallaxFactor={0.35}
        style={{
          left: '25%',
          top: '8%',
          opacity: 0.02,
          animationName: 'paperDrift',
          animationDuration: '22s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
          animationDelay: '-4s',
        }}
      />
    </div>
  )
}
