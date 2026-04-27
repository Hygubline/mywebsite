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
  AnimatePresence,
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
          'border border-[#e8e4df]/[0.08] bg-[#0a0a0a]/80 backdrop-blur-2xl',
          'px-3 pb-2',
          'shadow-[0_4px_30px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(232,228,223,0.04)]',
          className
        )}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  )
}

export function DockDivider() {
  return (
    <div className="mx-1 h-8 w-px bg-[#e8e4df]/[0.06] self-center" />
  )
}

interface DockIconProps {
  children: ReactNode
  label: string
  href?: string
  onClick?: () => void
  className?: string
}

export function DockIcon({ children, label, onClick, className }: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { mouseX } = useDock()
  const [isHovered, setIsHovered] = useState(false)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 58, 40])
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
        'relative aspect-square cursor-pointer',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#e8e4df]/[0.03] border border-[#e8e4df]/[0.06] hover:bg-[#e8e4df]/[0.06] hover:border-[#e8e4df]/[0.12] transition-all duration-300">
        {children}
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#e8e4df]/[0.08] text-[#e8e4df] text-[10px] tracking-[0.05em] rounded-lg whitespace-nowrap pointer-events-none"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
