'use client'

import { useMousePosition } from '@/lib/useMousePosition'

export function MouseSpotlight() {
  const { x, y } = useMousePosition()

  return (
    <div
      className="mouse-spotlight"
      aria-hidden="true"
      style={{
        '--spot-x': `${x}px`,
        '--spot-y': `${y}px`,
      } as React.CSSProperties}
    />
  )
}
