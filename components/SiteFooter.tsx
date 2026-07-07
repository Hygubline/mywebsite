import Link from 'next/link'

const sections = [
  { label: 'Projects', href: '/projects' },
  { label: 'Notes', href: '/notes' },
  { label: 'Contact', href: '/#contact' },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Email', href: 'mailto:hy1269335770@gmail.com' },
]

export default function SiteFooter() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-warm/10 bg-[#06060c]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64"
        style={{
          background:
            'radial-gradient(60rem 16rem at 50% 120%, rgba(230, 184, 119, 0.08), transparent 70%)',
        }}
      />

      <div className="section-container relative py-14">
        <p className="font-display max-w-2xl text-3xl font-medium italic leading-snug text-foreground/90 sm:text-4xl">
          Built slowly, <span className="text-gold-foil">kept honestly</span> - a
          smaller personal space for work and thought.
        </p>

        <div className="gilded-rule mt-10 w-full opacity-60" />

        <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="flex items-center gap-3 font-display text-lg font-semibold italic text-foreground"
            >
              <span className="inline-block h-1.5 w-1.5 rotate-45 bg-warm" />
              Yun He
            </Link>
            <p className="mt-4 text-sm leading-7 text-muted">
              A focused home for selected projects, personal notes, and a simple way to connect.
            </p>
          </div>

          <div className="flex gap-12">
            <nav className="flex flex-col gap-2.5">
              <p className="eyebrow mb-1 !text-[10px] !tracking-[0.2em] text-warm/50">
                Index
              </p>
              {sections.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="text-sm text-muted transition-colors hover:text-warm"
                >
                  {s.label}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-col gap-2.5">
              <p className="eyebrow mb-1 !text-[10px] !tracking-[0.2em] text-warm/50">
                Elsewhere
              </p>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-sm text-muted transition-colors hover:text-warm"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <p className="mt-12 text-[0.68rem] uppercase tracking-[0.22em] text-muted/60">
          &copy; {new Date().getFullYear()} Yun He | built with Next.js, Tailwind, and motion.
        </p>
      </div>
    </footer>
  )
}
