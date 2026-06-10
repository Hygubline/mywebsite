'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Personal OS', href: '/personal-os' },
  { label: 'Reading', href: '/reading' },
  { label: 'Inspiration', href: '/inspiration' },
  { label: 'Contact', href: '/contact' },
]

const readingNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/notes' },
  { label: 'Bookshelf', href: '/reading' },
  { label: 'Photography', href: '/inspiration' },
  { label: 'Contact', href: '/contact' },
]

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isReadingPage = pathname === '/reading' || pathname.startsWith('/reading/')
  const links = isReadingPage ? readingNavLinks : navLinks

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
        isReadingPage
          ? 'border-b border-white/[0.06] bg-[rgba(9,10,11,0.32)] backdrop-blur-2xl'
          : scrolled
            ? 'border-b border-border bg-background/70 backdrop-blur-xl'
            : 'bg-transparent'
      }`}
    >
      <div
        className={`section-container flex items-center justify-between ${
          isReadingPage ? 'h-[74px]' : 'h-16'
        }`}
      >
        <Link
          href="/"
          className={`group flex items-center gap-3 ${
            isReadingPage
              ? 'text-[15px] font-semibold tracking-tight text-[#f4eee4]'
              : 'text-[15px] font-semibold tracking-tight'
          }`}
        >
          <>
            <span className="inline-block h-2 w-2 rounded-full bg-warm transition-transform duration-300 group-hover:scale-125" />
            Yun He
          </>
        </Link>

        <nav
          className={`hidden items-center md:flex ${
            isReadingPage
              ? 'gap-8 rounded-full border border-white/[0.08] bg-[rgba(10,10,10,0.45)] px-6 py-2.5 text-[0.92rem] text-[#c8beb0] backdrop-blur-[16px]'
              : 'gap-1 rounded-full border border-border bg-surface/40 p-1 backdrop-blur-md'
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative transition-colors duration-200 ${
                isReadingPage
                  ? isActive(link.href)
                    ? 'text-[#f4eee4]'
                    : 'text-[#b7aea0] hover:text-[#f4eee4]'
                  : `rounded-full px-3.5 py-1.5 text-sm ${
                      isActive(link.href) ? 'text-background' : 'text-muted hover:text-foreground'
                    }`
              }`}
            >
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-active"
                  className={`absolute -z-10 ${
                    isReadingPage
                      ? 'left-0 right-0 -bottom-[18px] h-[2px] bg-[#f59a23]'
                      : 'inset-0 rounded-full bg-warm'
                  }`}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {link.label}
            </Link>
          ))}
        </nav>

        {isReadingPage ? (
          <div className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-[rgba(10,10,10,0.45)] text-[#f4eee4] backdrop-blur-[16px] md:inline-flex">
            <span className="text-lg">◌</span>
          </div>
        ) : (
          <a
            href="mailto:hy1269335770@gmail.com"
            className="hidden rounded-full border border-warm/20 bg-warm/10 px-4 py-2 text-sm text-warm transition-all duration-200 hover:bg-warm/20 md:inline-block"
          >
            Say hi
          </a>
        )}

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
            className={`overflow-hidden md:hidden ${
              isReadingPage
                ? 'border-b border-white/6 bg-[rgba(9,10,11,0.92)] backdrop-blur-2xl'
                : 'border-b border-border bg-background/95 backdrop-blur-xl'
            }`}
          >
            <div className="section-container flex flex-col gap-1 py-4">
              {links.map((link) => (
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
              {!isReadingPage && (
                <a
                  href="mailto:hy1269335770@gmail.com"
                  onClick={() => setMobileOpen(false)}
                  className="mt-1 rounded-lg border border-warm/20 bg-warm/10 px-3 py-2.5 text-center text-sm text-warm"
                >
                  Say hi
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
