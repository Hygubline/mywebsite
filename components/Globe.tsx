'use client'

import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

export interface GlobeMarker {
  location: [number, number]
  size: number
}

interface GlobeProps {
  markers: GlobeMarker[]
  /** [lat, lng] to smoothly rotate to, or null to auto-rotate */
  focusLocation: [number, number] | null
}

/** Convert a [lat, lng] into cobe's [phi, theta] facing angles. */
function locationToAngles(lat: number, long: number): [number, number] {
  return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180]
}

/**
 * Interactive point-cloud globe (cobe). Auto-rotates, can be dragged to spin,
 * and smoothly turns to a focused location when one is provided.
 */
export default function Globe({ markers, focusLocation }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const focusRef = useRef<[number, number] | null>(null)

  // Keep the focus target in sync without re-creating the globe.
  useEffect(() => {
    focusRef.current = focusLocation
      ? locationToAngles(focusLocation[0], focusLocation[1])
      : null
  }, [focusLocation])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let width = 0
    let phi = 0
    let theta = 0.25
    const drag = { active: false, x: 0 }
    const doublePi = Math.PI * 2

    const onResize = () => {
      width = canvas.offsetWidth
    }
    onResize()
    window.addEventListener('resize', onResize)

    const onPointerDown = (e: PointerEvent) => {
      drag.active = true
      drag.x = e.clientX
      canvas.style.cursor = 'grabbing'
      canvas.setPointerCapture(e.pointerId)
    }
    const onPointerUp = (e: PointerEvent) => {
      drag.active = false
      canvas.style.cursor = 'grab'
      try {
        canvas.releasePointerCapture(e.pointerId)
      } catch {
        /* pointer already released */
      }
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!drag.active) return
      const delta = e.clientX - drag.x
      drag.x = e.clientX
      phi -= delta * 0.006
      focusRef.current = null // a manual drag cancels any focus
    }

    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointerout', onPointerUp)
    canvas.addEventListener('pointermove', onPointerMove)

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.32, 0.3, 0.38],
      markerColor: [0.89, 0.66, 0.43],
      glowColor: [0.18, 0.16, 0.22],
      markers,
    })

    // cobe v2 is driven frame-by-frame via update() — run our own loop.
    let raf = 0
    const render = () => {
      const target = focusRef.current
      if (target) {
        const [tp, tt] = target
        // rotate phi along the shortest arc toward the target longitude
        const dp = ((tp - phi + Math.PI) % doublePi) - Math.PI
        phi += dp * 0.1
        theta += (tt - theta) * 0.1
      } else if (!drag.active) {
        phi += 0.0035
      }
      globe.update({ phi, theta, width: width * 2, height: width * 2 })
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      globe.destroy()
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointerout', onPointerUp)
      canvas.removeEventListener('pointermove', onPointerMove)
    }
    // markers are static for the component's lifetime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="aspect-square w-full cursor-grab touch-none select-none"
      style={{ maxWidth: 460 }}
    />
  )
}
