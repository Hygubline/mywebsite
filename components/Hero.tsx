import Link from 'next/link'
import { ArrowRight, ArrowDown } from 'lucide-react'
import AnimatedText from '@/components/AnimatedText'
import FloatingFragments from '@/components/FloatingFragments'
import MagneticCard from '@/components/MagneticCard'

/** Identity labels — edit these to change how you introduce yourself. */
const identityTags = [
  'CS Student',
  'Frontend Learner',
  'AI-assisted Builder',
  'Personal Website Explorer',
]

/**
 * The entrance to the site — a personal digital space. A large wordmark reveals
 * line by line over a soft animated gradient mesh, followed by identity labels,
 * a short personal statement, and magnetic call-to-action buttons.
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
            Personal digital space · est. 2026
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
          Learning in public
        </p>

        {/* identity labels */}
        <div
          className="mt-7 flex animate-slide-up flex-wrap gap-2.5"
          style={{ animationDelay: '1.0s', opacity: 0, animationFillMode: 'forwards' }}
        >
          {identityTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-3.5 py-1.5 text-sm text-foreground/80 backdrop-blur-md transition-colors hover:border-warm/30 hover:text-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-warm/80" />
              {tag}
            </span>
          ))}
        </div>

        <p
          className="mt-7 max-w-xl animate-slide-up text-lg leading-relaxed text-foreground/80 sm:text-xl"
          style={{ animationDelay: '1.15s', opacity: 0, animationFillMode: 'forwards' }}
        >
          I’m building a personal digital space to record what I learn, what I
          build, and how I grow.
        </p>

        <div
          className="mt-10 flex animate-slide-up flex-wrap items-center gap-4"
          style={{ animationDelay: '1.35s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <MagneticCard strength={0.3} className="inline-block">
            <Link href="/projects" className="btn-primary">
              View projects
              <ArrowRight className="relative h-4 w-4" />
            </Link>
          </MagneticCard>
          <MagneticCard strength={0.25} className="inline-block">
            <Link href="/personal-os" className="btn-secondary">
              Open Personal OS
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
