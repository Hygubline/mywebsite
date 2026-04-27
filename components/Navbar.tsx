'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/now', label: 'Now' },
  { href: '/philosophy', label: 'Philosophy' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium tracking-[-0.02em] text-white hover:opacity-50 transition-opacity duration-700"
          >
            Yun He
          </Link>

          <div className="flex items-center gap-8">
            {navItems.slice(1).map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[12px] tracking-[0.05em] uppercase transition-opacity duration-700 ${
                    isActive
                      ? 'text-white opacity-100'
                      : 'text-white opacity-40 hover:opacity-70'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
