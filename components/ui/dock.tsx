'use client'

import {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
} from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from 'framer-motion'
import { cn } from '@/lib/utils'

interface DockContextType {
  mouseX: MotionValue<number>
  hovered: boolean
}

const DockContext = createContext<DockContextType | null>(null)

function useDock() {
  const context = useContext(DockContext)
  if (!context) {
    throw new Error('useDock must be used within a Dock')
  }
  return context
}

interface DockProps {
  children: ReactNode
  className?: string
}

export function Dock({ children, className }: DockProps) {
  const mouseX = useMotionValue(Infinity)
  const [hovered, setHovered] = useState(false)

  return (
    <DockContext.Provider value={{ mouseX, hovered }}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => {
          mouseX.set(Infinity)
          setHovered(false)
        }}
        onMouseEnter={() => setHovered(true)}
        className={cn(
          'mx-auto flex h-14 items-end gap-3 rounded-2xl',
          'border border-white/10 bg-white/5 backdrop-blur-xl',
          'px-3 pb-2',
          className
        )}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  )
}

interface DockCardProps {
  children: ReactNode
  className?: string
  id?: string
}

export function DockCard({ children, className }: DockCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { mouseX } = useDock()

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 60, 40])
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        'aspect-square cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

interface DockCardInnerProps {
  children?: ReactNode
  className?: string
  src?: string
  id?: string
}

export function DockCardInner({ children, className, src }: DockCardInnerProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center rounded-xl',
        src ? 'bg-cover bg-center' : 'bg-white/5',
        className
      )}
      style={src ? { backgroundImage: `url(${src})` } : undefined}
    >
      {children}
    </div>
  )
}

export function DockDivider() {
  return (
    <div className="mx-1 h-8 w-px bg-white/10 self-center" />
  )
}

interface DockIconProps {
  children: ReactNode
  label: string
  href?: string
  onClick?: () => void
  className?: string
}

export function DockIcon({ children, label, href, onClick, className }: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { mouseX } = useDock()
  const [isHovered, setIsHovered] = useState(false)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 56, 40])
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  const content = (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        'relative aspect-square cursor-pointer',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="flex h-full w-full items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
        {children}
      </div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
        className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/10 backdrop-blur-xl border border-white/10 text-white text-xs rounded-lg whitespace-nowrap pointer-events-none"
      >
        {label}
      </motion.div>
    </motion.div>
  )

  if (href) {
    return (
      <a href={href}>
        {content}
      </a>
    )
  }

  return content
}
