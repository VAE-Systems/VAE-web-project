import { useTheme } from '@/contexts/ThemeContext'
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
  ctaText = 'Sparpotenzial anfordern',
  className,
  ctaDataAttribute,
}) => {
  const [internalLocked, setInternalLocked] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isPreviewActive, setIsPreviewActive] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const previewAffectsBlur = isDark && isPreviewActive

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

  const overlayBackgroundClass = isDark
    ? previewAffectsBlur
      ? 'bg-bg-darker/18 backdrop-blur-sm'
      : 'bg-bg-darker/70 backdrop-blur-xl'
    : 'bg-bg-dark/85 backdrop-blur-md'
  const cardToneClass = isDark
    ? 'border-vae-green/60 text-white shadow-[0_0_80px_rgba(5,248,200,0.25)]'
    : 'border-vae-green/20 text-text-light shadow-[0_20px_60px_rgba(26,35,32,0.12)]'
  const cardStateClass = isDark
    ? previewAffectsBlur
      ? 'from-bg-dark/45 via-bg-darker/50 to-bg-dark/45'
      : 'from-bg-dark/96 via-bg-darker/98 to-bg-dark/95'
    : 'from-white via-white to-white'
  const titleClass = isDark ? 'text-white' : 'text-text-light'
  const descriptionClass = isDark ? 'text-text-secondary' : 'text-text-secondary'
  const glowClass = isDark
    ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(5,248,200,0.15),transparent_70%)]'
    : 'bg-[radial-gradient(circle_at_50%_50%,rgba(29,184,122,0.10),transparent_70%)]'

  return (
    <div className={cn('relative', className)}>
      {/* Content with blur effect when locked */}
      <motion.div
        animate={
          isLocked
            ? {
                filter: previewAffectsBlur
                  ? 'blur(4px) brightness(98%)'
                  : isDark
                    ? 'blur(22px) grayscale(60%) brightness(35%)'
                    : 'blur(18px) grayscale(45%) brightness(60%)',
                opacity: previewAffectsBlur ? 0.96 : isDark ? 0.45 : 0.7,
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
            className="absolute inset-0 z-10 flex items-center justify-center p-6"
          >
            {/* Backdrop */}
            <div
              className={cn(
                'absolute inset-0',
                prefersReducedMotion ? '' : 'transition-all duration-500',
                overlayBackgroundClass
              )}
            />

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
              className={cn(
                'relative z-10 mx-auto max-w-md rounded-3xl border-2 bg-gradient-to-br p-8 text-center backdrop-blur-xl',
                prefersReducedMotion ? '' : 'transition-all duration-500',
                cardToneClass,
                cardStateClass
              )}
            >
              {/* Animated Lock Icon */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : isDark
                      ? {
                          rotate: previewAffectsBlur ? 0 : [0, -10, 10, -10, 0],
                          scale: previewAffectsBlur ? 1 : [1, 1.1, 1],
                        }
                      : {
                          scale: isPreviewActive ? 1.06 : 1,
                          rotate: 0,
                        }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : isDark
                      ? {
                          duration: 2,
                          repeat: previewAffectsBlur ? 0 : Infinity,
                          repeatDelay: 3,
                        }
                      : {
                          type: 'spring',
                          stiffness: 260,
                          damping: 18,
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
              <h3 className={cn('mb-3 text-2xl font-semibold', titleClass)}>{overlayTitle}</h3>

              {/* Description */}
              <p className={cn('mb-6 text-base leading-relaxed', descriptionClass)}>{overlayDescription}</p>

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
              <div className={cn('pointer-events-none absolute inset-0 rounded-3xl', glowClass)} />
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
