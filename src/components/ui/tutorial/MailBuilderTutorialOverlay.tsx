import { SpotlightTutorialController } from '@/hooks/useSpotlightTutorial'
import { useTheme } from '@/contexts/ThemeContext'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, GraduationCap } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface SpotlightTutorialOverlayProps {
  tutorial: SpotlightTutorialController
}

interface ElementRect {
  top: number
  left: number
  width: number
  height: number
}

export const SpotlightTutorialOverlay: React.FC<SpotlightTutorialOverlayProps> = ({ tutorial }) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const { isActive, currentStep, totalSteps, nextStep, previousStep, skipTutorial, getCurrentStepConfig } = tutorial
  const [highlightedRect, setHighlightedRect] = useState<ElementRect | null>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const currentConfig = getCurrentStepConfig()

  // Track and highlight the target element
  useEffect(() => {
    if (!isActive || !currentConfig) {
      setHighlightedRect(null)
      return
    }

    const targetElement = document.querySelector(currentConfig.highlightTarget) as HTMLElement
    if (!targetElement) {
      setHighlightedRect(null)
      return
    }

    // Add highlight class to element
    targetElement.style.position = 'relative'
    targetElement.style.transition = 'all 0.3s ease-out'

    // Get element position
    const updateRect = () => {
      const rect = targetElement.getBoundingClientRect()
      setHighlightedRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      })
    }

    updateRect()

    // Scroll into view
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })

    // Update on window resize
    window.addEventListener('resize', updateRect)
    window.addEventListener('scroll', updateRect)

    return () => {
      targetElement.style.position = ''
      window.removeEventListener('resize', updateRect)
      window.removeEventListener('scroll', updateRect)
    }
  }, [isActive, currentStep, currentConfig])

  if (!isActive || !currentConfig) return null

  const progressPercentage = (currentStep / totalSteps) * 100
  const progressTrackClass = isDark ? 'bg-white/10' : 'bg-slate-900/10'
  const cardBaseClasses = isDark
    ? 'border-white/20 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker text-white shadow-[0_30px_80px_rgba(0,0,0,0.6)]'
    : 'border-black/5 bg-gradient-to-br from-white/95 via-white to-white/95 text-slate-900 shadow-[0_30px_60px_rgba(15,23,42,0.12)]'
  const titleClass = isDark ? 'text-white' : 'text-slate-900'
  const descriptionClass = isDark ? 'text-white/80' : 'text-slate-600'
  const previousButtonClasses = isDark
    ? 'border border-white/10 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10 hover:text-white disabled:hover:border-white/10 disabled:hover:bg-white/5'
    : 'border border-slate-900/10 bg-slate-900/5 text-slate-700 hover:border-slate-900/25 hover:bg-slate-900/10 hover:text-slate-900 disabled:hover:border-slate-900/10 disabled:hover:bg-slate-900/5'
  const skipButtonClasses = isDark ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'
  const primaryButtonTextClass = isDark ? 'text-bg-darker' : 'text-slate-900'
  const positionClasses =
    currentConfig.position === 'right'
      ? 'right-4 top-20 items-start justify-end md:right-8 md:top-24'
      : currentConfig.position === 'left'
        ? 'left-4 top-20 items-start justify-start md:left-8 md:top-24'
        : 'inset-0 items-end justify-center md:items-center'

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999]"
        style={{ pointerEvents: 'none' }}
      >
        {/* Backdrop with cutout for highlighted element */}
        <div className="absolute inset-0" style={{ pointerEvents: 'auto' }}>
          {/* SVG mask for spotlight cutout */}
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <mask id="spotlight-mask">
                <rect width="100%" height="100%" fill="white" />
                {highlightedRect && (
                  <motion.rect
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    x={highlightedRect.left - 12}
                    y={highlightedRect.top - 12}
                    width={highlightedRect.width + 24}
                    height={highlightedRect.height + 24}
                    rx="24"
                    fill="black"
                  />
                )}
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="rgba(0, 0, 0, 0.7)" mask="url(#spotlight-mask)" />
          </svg>

          {/* Blur backdrop (except highlighted area) */}
          <div
            className="absolute inset-0 backdrop-blur-[2px]"
            style={{
              clipPath: highlightedRect
                ? `polygon(
                  0 0, 100% 0, 100% 100%, 0 100%, 0 0,
                  ${highlightedRect.left - 12}px ${highlightedRect.top - 12}px,
                  ${highlightedRect.left - 12}px ${highlightedRect.top + highlightedRect.height + 12}px,
                  ${highlightedRect.left + highlightedRect.width + 12}px ${highlightedRect.top + highlightedRect.height + 12}px,
                  ${highlightedRect.left + highlightedRect.width + 12}px ${highlightedRect.top - 12}px,
                  ${highlightedRect.left - 12}px ${highlightedRect.top - 12}px
                )`
                : 'none',
            }}
          />
        </div>

        {/* Animated ring around highlighted element */}
        {highlightedRect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="pointer-events-none absolute rounded-[28px] border-4 border-vae-turquoise shadow-[0_0_40px_rgba(5,248,200,0.6),inset_0_0_40px_rgba(5,248,200,0.3)]"
            style={{
              top: `${highlightedRect.top - 16}px`,
              left: `${highlightedRect.left - 16}px`,
              width: `${highlightedRect.width + 32}px`,
              height: `${highlightedRect.height + 32}px`,
            }}
          >
            {/* Animated pulse ring */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-2 rounded-[32px] border-2 border-vae-turquoise/40"
            />
          </motion.div>
        )}

        {/* Tutorial Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`pointer-events-none fixed z-10 flex p-4 md:p-8 ${positionClasses}`}
        >
          <div
            className={`relative w-full max-w-lg rounded-[32px] border ${cardBaseClasses} p-8 backdrop-blur-xl ${
              currentStep === 5
                ? 'md:ml-[2%] md:mr-auto'
                : currentConfig.position === 'right'
                  ? ''
                  : 'md:ml-auto md:mr-[2%]'
            }`}
            style={{ pointerEvents: 'auto' }}
          >
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/80">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Tutorial</span>
                </div>
                <span>
                  Schritt {currentStep} / {totalSteps}
                </span>
              </div>
              <div className={`mt-3 h-1.5 w-full overflow-hidden rounded-full ${progressTrackClass}`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-vae-turquoise to-vae-turquoise-dark"
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h3 className={`text-2xl font-semibold ${titleClass}`}>{currentConfig.title}</h3>
              {/* Action Hint - Mini instruction text */}
              <p className="text-sm font-medium text-vae-turquoise/90">{currentConfig.actionHint}</p>
              <p className={`text-base leading-relaxed ${descriptionClass}`}>{currentConfig.description}</p>
            </div>

            {/* Navigation buttons */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                onClick={previousStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-40 ${previousButtonClasses}`}
              >
                <ArrowLeft className="h-4 w-4" />
                Zurück
              </button>

              <button onClick={skipTutorial} className={`text-sm font-medium transition-colors ${skipButtonClasses}`}>
                Tutorial überspringen
              </button>

              <button
                onClick={nextStep}
                className={`flex items-center gap-2 rounded-2xl bg-vae-turquoise px-6 py-2.5 text-sm font-semibold transition-all hover:bg-vae-turquoise-dark hover:shadow-lg hover:shadow-vae-turquoise/30 ${primaryButtonTextClass}`}
              >
                {currentStep === totalSteps ? 'Fertig' : 'Weiter'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export const MailBuilderTutorialOverlay = SpotlightTutorialOverlay
