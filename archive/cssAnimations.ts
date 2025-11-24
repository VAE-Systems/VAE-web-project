/**
 * CSS-based animation utilities
 *
 * Lightweight alternative to Framer Motion for simple animations.
 * Uses CSS transitions and classes for 0 KB bundle impact.
 *
 * Performance: GPU-accelerated via transform and opacity
 * Bundle size: 0 KB (pure CSS)
 * Browser support: All modern browsers
 */

export type AnimationVariant = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale'
export type AnimationSpeed = 'fast' | 'normal' | 'slow'

interface AnimationOptions {
  /** Animation variant to use */
  variant?: AnimationVariant
  /** Animation speed preset */
  speed?: AnimationSpeed
  /** Custom duration in milliseconds */
  duration?: number
  /** Delay before animation starts (ms) */
  delay?: number
  /** Custom easing function */
  easing?: string
}

const SPEED_MAP: Record<AnimationSpeed, number> = {
  fast: 200,
  normal: 400,
  slow: 600,
}

const EASING_MAP: Record<AnimationSpeed, string> = {
  fast: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-out
  normal: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-out
  slow: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-out
}

/**
 * Get CSS classes for animation
 * Use with className prop
 */
export function getAnimationClasses(options: AnimationOptions = {}): string {
  const { variant = 'fade', speed = 'normal' } = options

  return `animate-${variant} animate-${speed}`
}

/**
 * Get inline styles for animation
 * Use when you need custom duration/delay
 */
export function getAnimationStyles(options: AnimationOptions = {}): React.CSSProperties {
  const { speed = 'normal', duration, delay = 0, easing } = options

  const finalDuration = duration || SPEED_MAP[speed]
  const finalEasing = easing || EASING_MAP[speed]

  return {
    '--animation-duration': `${finalDuration}ms`,
    '--animation-delay': `${delay}ms`,
    '--animation-easing': finalEasing,
  } as React.CSSProperties
}

/**
 * Hook: Trigger animation when element enters viewport
 * Returns ref to attach to element
 *
 * @example
 * const ref = useScrollAnimation({ variant: 'slide-up' });
 * return <div ref={ref}>Content</div>;
 */
export function useScrollAnimation(options: AnimationOptions = {}) {
  const ref = React.useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible, style: getAnimationStyles(options) }
}

/**
 * Stagger animations for child elements
 * Returns array of styles with incremental delays
 */
export function getStaggerStyles(count: number, baseDelay = 100): React.CSSProperties[] {
  return Array.from(
    { length: count },
    (_, i) =>
      ({
        '--animation-delay': `${i * baseDelay}ms`,
      }) as React.CSSProperties
  )
}

// Re-export React for convenience
import React from 'react'
