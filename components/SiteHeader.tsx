'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Notes', href: '/notes' },
  { label: 'Contact', href: '/#contact' },
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

  const isActive = (href: string) => {
    if (href.includes('#')) return false
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-warm/10 bg-background/70 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-3 font-display text-lg font-semibold italic tracking-tight text-foreground"
        >
          <span className="inline-block h-2 w-2 rotate-45 bg-warm transition-transform duration-300 group-hover:rotate-[135deg]" />
          Yun He
        </Link>

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
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #f0d19a 0%, #e6b877 50%, #cf9552 100%)',
                    boxShadow: '0 4px 18px -6px rgba(230, 184, 119, 0.6)',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden min-w-[82px] justify-end md:flex">
          <a
            href="mailto:hy1269335770@gmail.com"
            className="rounded-full border border-warm/20 bg-warm/10 px-4 py-2 text-sm text-warm transition-all duration-200 hover:bg-warm/20"
          >
            Say hi
          </a>
        </div>

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
