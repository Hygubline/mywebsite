interface AmbientBackgroundProps {
  variant?: 'home' | 'work'
}

export default function AmbientBackground({
  variant = 'home',
}: AmbientBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${
        variant === 'work' ? 'ambient-background ambient-background-work' : 'ambient-background'
      }`}
    >
      <div className="ambient-background__glow" />
      <div className="ambient-background__glow ambient-background__glow-secondary" />
      <div className="ambient-background__noise" />
      <div className="ambient-background__grid" />
      <div className="ambient-background__scanlines" />
    </div>
  )
}
