import { cn } from '@/lib/classNames'
import { AnimatePresence, motion } from 'framer-motion'
import { Lock, LockOpen } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import MagneticButton from './buttons/MagneticButton'

interface LockedSectionProps {
  children: React.ReactNode
  isLocked?: boolean
  onUnlock?: () => void
  overlayTitle?: string
  overlayDescription?: string
  ctaText?: string
  className?: string
  ctaDataAttribute?: string
}

/**
 * LockedSection: Reusable component for content that requires user action to reveal.
 *
 * Features:
 * - Dramatic blur/grayscale effect on locked content
 * - Prominent centered overlay with CTA
 * - Smooth unlock animation with Framer Motion
 * - Respects prefers-reduced-motion
 * - Mobile-optimized (tap instead of hover)
 */
const LockedSection: React.FC<LockedSectionProps> = ({
  children,
  isLocked: externalLocked,
  onUnlock,
  overlayTitle = 'Inhalt freischalten',
  overlayDescription = 'Klicken Sie, um den vollständigen Inhalt zu sehen',
  ctaText = 'Sparpotenzial ermitteln',
  className,
  ctaDataAttribute,
}) => {
  const [internalLocked, setInternalLocked] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isPreviewActive, setIsPreviewActive] = useState(false)

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Use external control if provided, otherwise use internal state
  const isLocked = externalLocked !== undefined ? externalLocked : internalLocked

  useEffect(() => {
    if (!isLocked) {
      setIsPreviewActive(false)
    }
  }, [isLocked])

  const handleUnlock = useCallback(() => {
    if (externalLocked === undefined) {
      setInternalLocked(false)
    }
    onUnlock?.()
  }, [externalLocked, onUnlock])

  const enablePreview = useCallback(() => {
    setIsPreviewActive(true)
  }, [])

  const disablePreview = useCallback(() => {
    setIsPreviewActive(false)
  }, [])

  return (
    <div className={cn('relative', className)}>
      {/* Content with blur effect when locked */}
      <motion.div
        animate={
          isLocked
            ? {
                filter: isPreviewActive
                  ? 'blur(12px) grayscale(25%) brightness(75%)'
                  : 'blur(22px) grayscale(60%) brightness(40%)',
                opacity: isPreviewActive ? 0.85 : 0.5,
              }
            : {
                filter: 'blur(0px) grayscale(0%) brightness(100%)',
                opacity: 1,
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: 0.7,
                ease: [0.4, 0, 0.2, 1],
              }
        }
      >
        {children}
      </motion.div>
      {/* Overlay when locked */}
      <AnimatePresence>
        {isLocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
            className="absolute inset-0 z-40 flex items-center justify-center p-6"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-bg-darker/60 backdrop-blur-xl" />

            {/* CTA Card */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { scale: 0.9, y: 20 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { scale: 0.9, y: 20 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1],
                    }
              }
              className="border-vae-green/60 from-bg-dark/98 via-bg-darker/98 to-bg-dark/98 relative z-10 mx-auto max-w-md rounded-3xl border-2 bg-gradient-to-br p-8 text-center shadow-[0_0_80px_rgba(5,248,200,0.25)] backdrop-blur-xl"
            >
              {/* Animated Lock Icon */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        rotate: isPreviewActive ? 0 : [0, -10, 10, -10, 0],
                        scale: isPreviewActive ? 1 : [1, 1.1, 1],
                      }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        duration: 2,
                        repeat: isPreviewActive ? 0 : Infinity,
                        repeatDelay: 3,
                      }
                }
                className="mb-6 flex justify-center"
              >
                <div className="bg-vae-green/10 rounded-full p-4">
                  {isPreviewActive ? (
                    <LockOpen className="text-vae-green h-12 w-12" strokeWidth={2} />
                  ) : (
                    <Lock className="text-vae-green h-12 w-12" strokeWidth={2} />
                  )}
                </div>
              </motion.div>

              {/* Title */}
              <h3 className="mb-3 text-2xl font-semibold text-white">{overlayTitle}</h3>

              {/* Description */}
              <p className="mb-6 text-base leading-relaxed text-text-secondary">{overlayDescription}</p>

              {/* CTA Button */}
              <MagneticButton intensity={0.12} scaleEffect className="block">
                <button
                  type="button"
                  onClick={handleUnlock}
                  onMouseEnter={enablePreview}
                  onMouseLeave={disablePreview}
                  onFocus={enablePreview}
                  onBlur={disablePreview}
                  onTouchStart={enablePreview}
                  onTouchEnd={disablePreview}
                  data-calculator-tutorial={ctaDataAttribute}
                  className="btn-primary flex w-full items-center justify-center gap-2 px-6 py-3.5 text-base"
                >
                  {ctaText}
                </button>
              </MagneticButton>

              {/* Decorative glow */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_50%_50%,rgba(5,248,200,0.15),transparent_70%)]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success glow ring after unlock (optional visual feedback) */}
      <AnimatePresence>
        {!isLocked && !prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="border-vae-green/40 pointer-events-none absolute -inset-2 rounded-3xl border-2 shadow-[0_0_40px_rgba(5,248,200,0.4)]"
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default LockedSection
