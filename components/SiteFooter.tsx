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
    <footer className="relative z-10 border-t border-white/[0.07] bg-[#060607]">
      <div className="section-container py-10">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.28em] text-[#f4efe7]"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#d39b59]" />
              Yun He
            </Link>
            <p className="mt-4 text-sm leading-7 text-[#8e857b]">
              Personal digital lab for projects, books, notes, and technical studies.
            </p>
          </div>

          <div className="flex gap-12">
            <nav className="flex flex-col gap-2.5">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6e665f]">
                Index
              </p>
              {sections.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="text-sm text-[#8e857b] transition-colors hover:text-[#f4efe7]"
                >
                  {s.label}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-col gap-2.5">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6e665f]">
                Elsewhere
              </p>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-sm text-[#8e857b] transition-colors hover:text-[#f4efe7]"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <p className="mt-10 text-[0.68rem] uppercase tracking-[0.22em] text-[#625b54]">
          &copy; {new Date().getFullYear()} Yun He | built with Next.js, Tailwind, and motion.
        </p>
      </div>
    </footer>
  )
}
