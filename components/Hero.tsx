import Link from 'next/link'
import { ArrowRight, ArrowDown } from 'lucide-react'
import AnimatedText from '@/components/AnimatedText'
import FloatingFragments from '@/components/FloatingFragments'
import MagneticCard from '@/components/MagneticCard'

/**
 * The entrance to the archive. A large wordmark that reveals line by line over
 * a soft animated gradient mesh, a radial spotlight, drifting glass fragments,
 * and magnetic call-to-action buttons.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* atmosphere */}
      <div className="gradient-mesh absolute inset-0 opacity-50" />
      <div className="hero-spotlight absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/55 to-background" />
      <FloatingFragments />

      <div className="section-container relative z-10 py-32">
        <div
          className="mb-8 inline-flex animate-fade-in items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1.5 backdrop-blur-md"
          style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <span className="h-2 w-2 animate-pulse-soft rounded-full bg-warm" />
          <span className="text-xs font-medium tracking-wide text-muted">
            Personal Digital Archive · est. 2026
          </span>
        </div>

        <AnimatedText
          as="h1"
          text="YUN HE"
          delay={0.15}
          stagger={0.08}
          className="text-6xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-7xl md:text-8xl"
        />

        <p
          className="text-archive-gradient mt-3 animate-slide-up text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl"
          style={{ animationDelay: '0.85s', opacity: 0, animationFillMode: 'forwards' }}
        >
          Digital Archive
        </p>

        <p
          className="mt-8 max-w-xl animate-slide-up text-lg leading-relaxed text-foreground/80 sm:text-xl"
          style={{ animationDelay: '1.1s', opacity: 0, animationFillMode: 'forwards' }}
        >
          A living collection of code, projects, notes, books, and fragments of
          thought — slowly assembled into a small personal world.
        </p>

        <div
          className="mt-10 flex animate-slide-up flex-wrap items-center gap-4"
          style={{ animationDelay: '1.3s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <MagneticCard strength={0.3} className="inline-block">
            <Link href="/notes" className="btn-primary">
              Enter the archive
              <ArrowRight className="relative h-4 w-4" />
            </Link>
          </MagneticCard>
          <MagneticCard strength={0.25} className="inline-block">
            <Link href="/ui-lab" className="btn-secondary">
              Front-end experiments
            </Link>
          </MagneticCard>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted/40">
        <ArrowDown size={20} className="animate-bounce" />
      </div>
    </section>
  )
}
