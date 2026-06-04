import Link from 'next/link'

const sections = [
  { label: 'Notes', href: '/notes' },
  { label: 'UI Lab', href: '/ui-lab' },
  { label: 'Projects', href: '/projects' },
  { label: 'Reading', href: '/reading' },
  { label: 'About', href: '/about' },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Email', href: 'mailto:hy1269335770@gmail.com' },
]

export default function SiteFooter() {
  return (
    <footer className="relative z-10 mt-10 border-t border-border">
      <div className="section-container py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
              <span className="inline-block h-2 w-2 rounded-full bg-warm" />
              Yun He
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              A quiet corner of the internet, tended slowly and out in the open. Not meant to
              be perfect — meant to grow.
            </p>
          </div>

          <div className="flex gap-16">
            <nav className="flex flex-col gap-2.5">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/60">
                Garden
              </p>
              {sections.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {s.label}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-col gap-2.5">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/60">
                Elsewhere
              </p>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <p className="mt-10 text-xs text-muted/60">
          &copy; {new Date().getFullYear()} Yun He · built with Next.js, Tailwind & GSAP.
        </p>
      </div>
    </footer>
  )
}
