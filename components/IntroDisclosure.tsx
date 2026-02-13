'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  title: string
  description: string
  icon?: React.ReactNode
}

interface IntroDisclosureProps {
  steps: Step[]
  featureId: string
  onComplete?: () => void
  onSkip?: () => void
}

export function IntroDisclosure({
  steps,
  featureId,
  onComplete,
  onSkip,
}: IntroDisclosureProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(`intro_${featureId}`)
    if (stored !== 'hidden') {
      const timer = setTimeout(() => setIsOpen(true), 500)
      return () => clearTimeout(timer)
    }
  }, [featureId])

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem(`intro_${featureId}`, 'hidden')
    }
    setIsOpen(false)
    onSkip?.()
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      if (dontShowAgain) {
        localStorage.setItem(`intro_${featureId}`, 'hidden')
      }
      setIsOpen(false)
      onComplete?.()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const step = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'relative w-full max-w-md',
                'rounded-2xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl',
                'shadow-2xl shadow-blue-500/5'
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="p-8">
                {/* Step indicator */}
                <div className="flex items-center gap-1.5 mb-6">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        'h-1 rounded-full transition-all duration-300',
                        index === currentStep
                          ? 'w-8 bg-blue-500'
                          : index < currentStep
                            ? 'w-4 bg-blue-500/50'
                            : 'w-4 bg-white/10'
                      )}
                    />
                  ))}
                </div>

                {/* Icon */}
                {step.icon && (
                  <div className="mb-4 text-blue-400">
                    {step.icon}
                  </div>
                )}

                {/* Title */}
                <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-400 leading-relaxed mb-8">
                  {step.description}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={dontShowAgain}
                      onChange={(e) => setDontShowAgain(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 focus:ring-offset-transparent"
                    />
                    <span className="text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors">
                      Don&apos;t show again
                    </span>
                  </label>

                  <div className="flex items-center gap-2">
                    {currentStep > 0 && (
                      <button
                        onClick={handlePrev}
                        className="flex items-center gap-1 px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                      </button>
                    )}
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-1 px-5 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      {isLastStep ? 'Get Started' : 'Next'}
                      {!isLastStep && <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
