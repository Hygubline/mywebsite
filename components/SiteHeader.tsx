'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Notes', href: '/notes' },
  { label: 'UI Lab', href: '/ui-lab' },
  { label: 'Projects', href: '/projects' },
  { label: 'Personal OS', href: '/personal-os' },
  { label: 'Reading', href: '/reading' },
  { label: 'About', href: '/about' },
]

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/70 backdrop-blur-xl border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="section-container flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2 text-[15px] font-semibold tracking-tight">
          <span className="inline-block h-2 w-2 rounded-full bg-warm transition-transform duration-300 group-hover:scale-125" />
          Yun He
        </Link>

        {/* Desktop nav — glass pill */}
        <nav className="hidden items-center gap-1 rounded-full border border-border bg-surface/40 p-1 backdrop-blur-md md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200 ${
                isActive(link.href) ? 'text-background' : 'text-muted hover:text-foreground'
              }`}
            >
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-full bg-warm"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="mailto:hy1269335770@gmail.com"
          className="hidden rounded-full border border-warm/20 bg-warm/10 px-4 py-2 text-sm text-warm transition-all duration-200 hover:bg-warm/20 md:inline-block"
        >
          Say hi
        </a>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="p-2 text-muted hover:text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="section-container flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive(link.href)
                      ? 'bg-warm/10 text-warm'
                      : 'text-muted hover:bg-white/5 hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="mailto:hy1269335770@gmail.com"
                onClick={() => setMobileOpen(false)}
                className="mt-1 rounded-lg border border-warm/20 bg-warm/10 px-3 py-2.5 text-center text-sm text-warm"
              >
                Say hi
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
