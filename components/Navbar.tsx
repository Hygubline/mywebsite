'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Notes', href: '/notes' },
  { label: 'UI Lab', href: '/ui-lab' },
  { label: 'Projects', href: '/projects' },
  { label: 'Reading', href: '/reading' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container flex items-center justify-between h-16">
        <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
          Yun He<span className="text-warm">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-200 ${
                isActive(link.href)
                  ? 'text-foreground'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:hy1269335770@gmail.com"
            className="text-sm px-4 py-2 rounded-lg bg-warm/10 text-warm border border-warm/20 hover:bg-warm/20 transition-all duration-200"
          >
            Say hi
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-muted hover:text-foreground p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-5 pb-6 pt-2"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm transition-colors ${
                  isActive(link.href) ? 'text-foreground' : 'text-muted hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="mailto:hy1269335770@gmail.com"
              onClick={() => setMobileOpen(false)}
              className="text-sm px-4 py-2 rounded-lg bg-warm/10 text-warm border border-warm/20 text-center"
            >
              Say hi
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
