'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { MapPin } from 'lucide-react'
import { visitedPlaces } from '@/lib/visitedPlaces'
import type { GlobeMarker } from '@/components/Globe'

// WebGL only runs in the browser — load the globe without SSR.
const Globe = dynamic(() => import('@/components/Globe'), {
  ssr: false,
  loading: () => <div className="aspect-square w-full max-w-[460px] animate-pulse rounded-full bg-white/[0.03]" />,
})

const markers: GlobeMarker[] = visitedPlaces.map((p) => ({
  location: [p.lat, p.lng],
  size: 0.06,
}))

export default function VisitedGlobe() {
  const [active, setActive] = useState<number | null>(null)

  const focusLocation =
    active != null ? ([visitedPlaces[active].lat, visitedPlaces[active].lng] as [number, number]) : null

  return (
    <div className="glass-card glow-hover grid items-center gap-6 rounded-2xl p-5 sm:p-7 md:grid-cols-[1.1fr_1fr]">
      {/* Globe */}
      <div className="flex justify-center">
        <Globe markers={markers} focusLocation={focusLocation} />
      </div>

      {/* Places legend */}
      <div>
        <div className="mb-4 flex items-baseline justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-warm/70">Been there</p>
          <span className="text-xs text-muted">{visitedPlaces.length} places</span>
        </div>

        <ul className="space-y-1">
          {visitedPlaces.map((place, i) => {
            const isActive = active === i
            return (
              <li key={`${place.name}-${i}`}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                    isActive ? 'bg-warm/10' : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <MapPin
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive ? 'text-warm' : 'text-muted group-hover:text-warm/70'
                    }`}
                  />
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-sm font-medium transition-colors ${
                        isActive ? 'text-foreground' : 'text-foreground/80'
                      }`}
                    >
                      {place.name}
                    </span>
                    {place.note && (
                      <span className="block truncate text-[11px] text-muted">{place.note}</span>
                    )}
                  </span>
                  <span className="shrink-0 text-[11px] text-muted">{place.country}</span>
                </button>
              </li>
            )
          })}
        </ul>

        <p className="mt-4 px-3 text-[11px] leading-relaxed text-muted/70">
          Drag the globe to spin it, or hover a place to fly there.
        </p>
      </div>
    </div>
  )
}
