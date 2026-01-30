import { AnimatePresence, motion } from 'framer-motion'
import { Lightbulb, Moon, Sun, X } from 'lucide-react'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { useTheme } from '@/contexts/ThemeContext'

const THEME_TUTORIAL_KEY = 'vae-theme-tutorial-shown'

interface ElementRect {
  top: number
  left: number
  width: number
  height: number
}

/**
 * ThemeModeTutorial - Spotlight-Tutorial zum Theme-Toggle
 *
 * Erscheint beim ersten Besuch der Website (einmalig) und zeigt dem User
 * den Light/Dark Mode Toggle im Header mit Spotlight-Effekt.
 */
export const ThemeModeTutorial: React.FC = () => {
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [highlightedRect, setHighlightedRect] = useState<ElementRect | null>(null)
  const [cardStyle, setCardStyle] = useState<React.CSSProperties>({})
  const cardRef = useRef<HTMLDivElement>(null)
  // Track initial theme to detect actual user interaction (not just re-renders)
  const initialThemeRef = React.useRef<string | null>(null)

  const isDark = theme === 'dark'

  useEffect(() => {
    // Check if tutorial was already shown
    const hasSeenTutorial = localStorage.getItem(THEME_TUTORIAL_KEY)

    if (hasSeenTutorial) {
      return
    }

    // Nur auf Desktop zeigen (Mindestbreite 1024px = lg breakpoint, ab hier kein Hamburger-Menü mehr)
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return
    }

    // Wait for DOM to be ready, then show tutorial
    const timer = setTimeout(() => {
      const themeButton = document.querySelector('[data-theme-toggle]') as HTMLElement

      if (themeButton) {
        const rect = themeButton.getBoundingClientRect()
        setHighlightedRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        })
        setIsVisible(true)

        // Mark as shown (only on desktop)
        localStorage.setItem(THEME_TUTORIAL_KEY, 'true')
      }
    }, 2000) // Show after 2s delay (page load complete + user oriented)

    return () => clearTimeout(timer)
  }, [])

  // Hide tutorial if window is resized below desktop breakpoint (hamburger menu appears)
  useEffect(() => {
    if (!isVisible) return

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsVisible(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isVisible])

  const handleDismiss = () => {
    setIsVisible(false)
  }

  // Store initial theme when tutorial becomes visible
  useEffect(() => {
    if (isVisible && initialThemeRef.current === null) {
      initialThemeRef.current = theme
    }
  }, [isVisible, theme])

  // Auto-dismiss after 20 seconds
  useEffect(() => {
    if (!isVisible) return

    const autoHideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 20000)

    return () => clearTimeout(autoHideTimer)
  }, [isVisible])

  // Hide when theme changes (user interacted with theme toggle)
  useEffect(() => {
    if (!isVisible || initialThemeRef.current === null) return

    // Only hide if theme actually changed from the initial theme when tutorial was shown
    if (theme !== initialThemeRef.current) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false)
      }, 800)
      return () => clearTimeout(hideTimer)
    }
  }, [theme, isVisible])

  // Update highlighted rect on scroll/resize
  useEffect(() => {
    if (!isVisible) return

    const updateRect = () => {
      const themeButton = document.querySelector('[data-theme-toggle]') as HTMLElement
      if (themeButton) {
        const rect = themeButton.getBoundingClientRect()
        setHighlightedRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        })
      }
    }

    window.addEventListener('resize', updateRect)
    window.addEventListener('scroll', updateRect)

    return () => {
      window.removeEventListener('resize', updateRect)
      window.removeEventListener('scroll', updateRect)
    }
  }, [isVisible])

  // Position the card below the highlighted element
  useLayoutEffect(() => {
    if (!isVisible || !highlightedRect) return

    const updateCardPosition = () => {
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const margin = 20
      const cardRect = cardRef.current?.getBoundingClientRect()
      const cardWidth = cardRect?.width ?? 0
      const cardHeight = cardRect?.height ?? 0

      // Position below the button, aligned to the right
      let top = highlightedRect.top + highlightedRect.height + 20
      let left = highlightedRect.left + highlightedRect.width - cardWidth

      // Ensure card stays within viewport
      left = Math.min(Math.max(left, margin), viewportWidth - cardWidth - margin)
      top = Math.min(Math.max(top, margin), viewportHeight - cardHeight - margin)

      setCardStyle({
        top,
        left,
        right: 'auto',
        bottom: 'auto',
      })
    }

    updateCardPosition()
    window.addEventListener('resize', updateCardPosition)
    window.addEventListener('scroll', updateCardPosition)

    return () => {
      window.removeEventListener('resize', updateCardPosition)
      window.removeEventListener('scroll', updateCardPosition)
    }
  }, [highlightedRect, isVisible])

  if (!isVisible || !highlightedRect) return null

  const cardBaseClasses = isDark
    ? 'border-white/20 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker text-white shadow-[0_30px_80px_rgba(0,0,0,0.6)]'
    : 'border-black/5 bg-gradient-to-br from-white/95 via-white to-white/95 text-slate-900 shadow-[0_30px_60px_rgba(15,23,42,0.12)]'
  const titleClass = isDark ? 'text-white' : 'text-slate-900'
  const descriptionClass = isDark ? 'text-white/80' : 'text-slate-600'

  return (
    <AnimatePresence mode="wait">
      <motion.div
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
              <mask id="theme-spotlight-mask">
                <rect width="100%" height="100%" fill="white" />
                <motion.rect
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  x={highlightedRect.left - 12}
                  y={highlightedRect.top - 12}
                  width={highlightedRect.width + 24}
                  height={highlightedRect.height + 24}
                  rx="16"
                  fill="black"
                />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="rgba(0, 0, 0, 0.7)" mask="url(#theme-spotlight-mask)" />
          </svg>

          {/* Blur backdrop (except highlighted area) */}
          <div
            className="absolute inset-0 backdrop-blur-[2px]"
            style={{
              clipPath: `polygon(
                0 0, 100% 0, 100% 100%, 0 100%, 0 0,
                ${highlightedRect.left - 12}px ${highlightedRect.top - 12}px,
                ${highlightedRect.left - 12}px ${highlightedRect.top + highlightedRect.height + 12}px,
                ${highlightedRect.left + highlightedRect.width + 12}px ${highlightedRect.top + highlightedRect.height + 12}px,
                ${highlightedRect.left + highlightedRect.width + 12}px ${highlightedRect.top - 12}px,
                ${highlightedRect.left - 12}px ${highlightedRect.top - 12}px
              )`,
            }}
          />
        </div>

        {/* Animated ring around highlighted element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="pointer-events-none absolute rounded-[20px] border-4 border-vae-turquoise shadow-[0_0_40px_rgba(5,248,200,0.6),inset_0_0_40px_rgba(5,248,200,0.3)]"
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
            className="absolute -inset-2 rounded-[24px] border-2 border-vae-turquoise/40"
          />
        </motion.div>

        {/* Tutorial Card */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="pointer-events-none fixed z-10"
          style={cardStyle}
        >
          <div
            ref={cardRef}
            className={`relative w-full max-w-[380px] rounded-[24px] border ${cardBaseClasses} p-6 shadow-xl backdrop-blur-xl`}
            style={{ pointerEvents: 'auto' }}
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className={`absolute right-4 top-4 rounded-full p-2 transition-colors ${
                isDark
                  ? 'text-white/60 hover:bg-white/10 hover:text-white'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
              aria-label="Tutorial schließen"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Content */}
            <div className="space-y-4 pr-8">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-vae-turquoise/10 p-2.5">
                  <Lightbulb className="h-6 w-6 text-vae-turquoise" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${titleClass}`}>Theme-Modus</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-vae-turquoise">Tipp</p>
                </div>
              </div>

              <p className={`text-sm leading-relaxed ${descriptionClass}`}>
                {isDark ? (
                  <>
                    Die Website ist im <strong>Dark Mode</strong>. Klicken Sie auf das{' '}
                    <Moon className="inline h-4 w-4" /> Icon, um zum <strong>Light Mode</strong> zu wechseln.
                  </>
                ) : (
                  <>
                    Die Website ist im <strong>Light Mode</strong>. Klicken Sie auf das{' '}
                    <Sun className="inline h-4 w-4" /> Icon, um zum <strong>Dark Mode</strong> zu wechseln.
                  </>
                )}
              </p>

              <button onClick={handleDismiss} className="btn-primary w-full">
                Verstanden
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
