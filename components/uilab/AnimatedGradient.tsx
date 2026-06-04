'use client'

/** Experiment: a slow, living gradient mesh that pans forever behind content. */
export default function AnimatedGradient() {
  return (
    <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden">
      <div className="gradient-mesh absolute inset-0" />
      <div className="absolute inset-0 bg-background/30" />
      <p className="relative z-10 max-w-xs text-center text-lg font-medium text-foreground/90">
        A warm gradient drifting like light through a window.
      </p>
    </div>
  )
}
