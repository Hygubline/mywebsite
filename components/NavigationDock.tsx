'use client'

import { useRouter } from 'next/navigation'
import {
  FolderOpen,
  Pen,
  Compass,
  Sparkles,
  Mail,
} from 'lucide-react'
import { Dock, DockIcon, DockDivider } from '@/components/ui/dock'

const navItems = [
  {
    icon: FolderOpen,
    label: 'Projects',
    href: '/projects',
  },
  {
    icon: Pen,
    label: 'Writing',
    href: '/writing',
  },
  {
    icon: Compass,
    label: 'Now',
    href: '/now',
  },
  null, // divider
  {
    icon: Sparkles,
    label: 'Philosophy',
    href: '/philosophy',
  },
  {
    icon: Mail,
    label: 'Contact',
    href: '/contact',
  },
]

export function NavigationDock() {
  const router = useRouter()

  return (
    <div className="py-12">
      <p className="text-center text-sm text-neutral-600 mb-4">
        Explore
      </p>
      <Dock>
        {navItems.map((item, index) => {
          if (item === null) {
            return <DockDivider key={`divider-${index}`} />
          }

          const Icon = item.icon
          return (
            <DockIcon
              key={item.href}
              label={item.label}
              onClick={() => router.push(item.href)}
            >
              <Icon className="h-5 w-5 text-neutral-400" />
            </DockIcon>
          )
        })}
      </Dock>
    </div>
  )
}
