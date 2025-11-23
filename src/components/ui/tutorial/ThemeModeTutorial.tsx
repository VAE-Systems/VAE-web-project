import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { useTheme } from '@/contexts/ThemeContext'

const THEME_TUTORIAL_KEY = 'vae-theme-tutorial-shown'

/**
 * ThemeModeTutorial - Mini-Tooltip zum Theme-Toggle
 *
 * Erscheint beim ersten Besuch der Website (einmalig) und zeigt dem User
 * den Light/Dark Mode Toggle im Header. Verschwindet nach Interaction oder Timer.
 */
export const ThemeModeTutorial: React.FC = () => {
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null)
  // Track initial theme to detect actual user interaction (not just re-renders)
  const initialThemeRef = React.useRef<string | null>(null)

  useEffect(() => {
    // Check if tutorial was already shown
    const hasSeenTutorial = localStorage.getItem(THEME_TUTORIAL_KEY)

    if (hasSeenTutorial) {
      return
    }

    // Nur auf Desktop zeigen (Mindestbreite 1024px)
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return
    }

    // Wait for DOM to be ready, then show tutorial
    const timer = setTimeout(() => {
      const themeButton = document.querySelector('[aria-label="Darstellung wechseln"]')

      if (themeButton) {
        const rect = themeButton.getBoundingClientRect()
        setButtonRect(rect)
        setIsVisible(true)

        // Mark as shown
        localStorage.setItem(THEME_TUTORIAL_KEY, 'true')
      }
    }, 2000) // Show after 2s delay (page load complete + user oriented)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
  }

  // Store initial theme when tutorial becomes visible
  useEffect(() => {
    if (isVisible && initialThemeRef.current === null) {
      initialThemeRef.current = theme
    }
  }, [isVisible, theme])

  // Auto-dismiss after 15 seconds
  useEffect(() => {
    if (!isVisible) return

    const autoHideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 15000)

    return () => clearTimeout(autoHideTimer)
  }, [isVisible])

  // Hide when theme changes (user interacted with theme toggle)
  useEffect(() => {
    if (!isVisible || initialThemeRef.current === null) return

    // Only hide if theme actually changed from the initial theme when tutorial was shown
    if (theme !== initialThemeRef.current) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false)
      }, 600)
      return () => clearTimeout(hideTimer)
    }
  }, [theme, isVisible])

  if (!isVisible || !buttonRect) return null

  const isDark = theme === 'dark'

  // Position tooltip below and slightly to the left of the theme button for better visibility
  const tooltipStyle: React.CSSProperties = {
    position: 'fixed',
    top: `${buttonRect.bottom + 12}px`,
    right: `${window.innerWidth - buttonRect.right}px`,
    zIndex: 9999,
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={tooltipStyle}
        className="pointer-events-auto"
      >
        {/* Arrow pointing up to button - positioned on the right side */}
        <div className="relative mb-2 flex justify-end pr-4">
          <div
            className={`h-3 w-3 rotate-45 ${
              isDark
                ? 'bg-gradient-to-br from-vae-turquoise to-vae-turquoise-dark'
                : 'bg-gradient-to-br from-vae-turquoise to-emerald-400'
            }`}
          />
        </div>

        {/* Tooltip Card */}
        <div
          className={`relative max-w-[280px] rounded-2xl border p-5 shadow-2xl backdrop-blur-xl ${
            isDark
              ? 'border-vae-turquoise/40 bg-gradient-to-br from-bg-dark/95 via-bg-darker/95 to-bg-dark/95 text-white shadow-vae-turquoise/20'
              : 'border-vae-turquoise/30 bg-gradient-to-br from-white/95 via-white to-white/95 text-slate-900 shadow-slate-900/10'
          }`}
        >
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className={`absolute right-3 top-3 rounded-full p-1.5 transition-colors ${
              isDark
                ? 'text-white/60 hover:bg-white/10 hover:text-white'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
            }`}
            aria-label="Tutorial schließen"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          {/* Content */}
          <div className="space-y-3 pr-6">
            <div className="flex items-center gap-2">
              {isDark ? (
                <Moon className="h-5 w-5 text-vae-turquoise" />
              ) : (
                <Sun className="h-5 w-5 text-vae-turquoise" />
              )}
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-vae-turquoise">Tipp</h4>
            </div>

            <p className={`text-sm leading-relaxed ${isDark ? 'text-white/90' : 'text-slate-700'}`}>
              {isDark ? (
                <>
                  Die Website ist im <strong>Dark Mode</strong>. Du kannst jederzeit zum <strong>Light Mode</strong>{' '}
                  wechseln!
                </>
              ) : (
                <>
                  Die Website ist im <strong>Light Mode</strong>. Du kannst jederzeit zum <strong>Dark Mode</strong>{' '}
                  wechseln!
                </>
              )}
            </p>

            <div
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium ${
                isDark
                  ? 'border-white/10 bg-white/5 text-white/70'
                  : 'border-slate-900/10 bg-slate-900/5 text-slate-600'
              }`}
            >
              <span className="text-vae-turquoise">↑</span>
              Klick auf das Icon im Header
            </div>
          </div>

          {/* Pulse animation on arrow - positioned to match arrow */}
          <motion.div
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-5 right-4"
          >
            <div className="h-4 w-4 rounded-full bg-vae-turquoise/60 blur-sm" />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
