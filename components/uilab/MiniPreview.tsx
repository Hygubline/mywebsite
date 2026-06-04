/**
 * A small, CSS-only animated motif shown in the preview area of each UI Lab
 * card. Pure CSS (no JS) keeps the gallery cheap to render even with many
 * cards. The `preview` key in an experiment's frontmatter picks the motif.
 */
export default function MiniPreview({ motif }: { motif?: string }) {
  return (
    <div className="relative flex h-36 items-center justify-center overflow-hidden border-b border-border bg-background/40">
      <div className="gradient-mesh absolute inset-0 opacity-30" />
      <div className="relative z-10">{renderMotif(motif)}</div>
    </div>
  )
}

function renderMotif(motif?: string) {
  switch (motif) {
    case 'gradient':
      return <div className="gradient-mesh h-16 w-40 rounded-xl opacity-90" />

    case 'text':
      return (
        <span className="bg-gradient-to-r from-foreground/20 via-foreground to-foreground/20 bg-[length:200%_100%] bg-clip-text font-bold text-4xl text-transparent animate-shimmer">
          Reveal
        </span>
      )

    case 'tilt':
      return (
        <div className="h-20 w-32 rounded-xl border border-warm/30 bg-surface/70 shadow-xl shadow-black/40 [transform:perspective(500px)_rotateX(14deg)_rotateY(-16deg)]" />
      )

    case 'magnetic':
      return (
        <span className="flex items-center gap-2 rounded-full border border-warm/40 bg-warm/10 px-5 py-2.5 text-xs text-warm">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-warm" /> hover me
        </span>
      )

    case 'cursor':
      return (
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 animate-pulse-soft rounded-full bg-warm/30 blur-xl" />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-warm" />
        </div>
      )

    case 'grid':
      return (
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="h-5 w-5 animate-pulse-soft rounded-md bg-iris/40"
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </div>
      )

    case 'scroll':
      return (
        <div className="flex flex-col items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 animate-pulse-soft rounded-full bg-sage/50"
              style={{ width: `${88 - i * 22}px`, animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </div>
      )

    case 'transition':
      return (
        <div className="flex gap-2">
          <span className="h-16 w-12 animate-pulse-soft rounded-lg bg-clay/40" />
          <span
            className="h-16 w-12 animate-pulse-soft rounded-lg bg-warm/40"
            style={{ animationDelay: '0.3s' }}
          />
        </div>
      )

    default:
      return (
        <div className="h-2 w-40 rounded-full bg-gradient-to-r from-transparent via-warm/60 to-transparent bg-[length:200%_100%] animate-shimmer" />
      )
  }
}
