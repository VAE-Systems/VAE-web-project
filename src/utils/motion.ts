export const Motion = {
  ease: 'power3.out',
  easeInOut: 'power2.inOut',
  enter: 0.8,
  fade: 0.6,
  long: 2.0,
  stagger: 0.06,
} as const

export type MotionKeys = keyof typeof Motion

// Framer spring presets (safe defaults across devices)
export const Springs = {
  gentle: { type: 'spring', stiffness: 140, damping: 18, mass: 1 },
  standard: { type: 'spring', stiffness: 200, damping: 22, mass: 1 },
  snappy: { type: 'spring', stiffness: 280, damping: 22, mass: 0.9 },
  heavy: { type: 'spring', stiffness: 220, damping: 30, mass: 1.15 },
} as const

// Common variants for Reveal components
export const Variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: (delay = 0) => ({ opacity: 1, transition: { ...Springs.gentle, delay } }),
  },
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { ...Springs.gentle, delay } }),
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: (delay = 0) => ({ opacity: 1, scale: 1, transition: { ...Springs.standard, delay } }),
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -24 },
    visible: (delay = 0) => ({ opacity: 1, x: 0, transition: { ...Springs.gentle, delay } }),
  },
  slideInRight: {
    hidden: { opacity: 0, x: 24 },
    visible: (delay = 0) => ({ opacity: 1, x: 0, transition: { ...Springs.gentle, delay } }),
  },
} as const

// Default viewport options for reveal-on-scroll
export const DefaultViewport = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -10% 0px',
} as const

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && 'matchMedia' in window
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

// Helper to build a staggered parent container
export function staggerContainer(opts: { stagger?: number; delayChildren?: number } = {}) {
  const { stagger = 0.06, delayChildren = 0 } = opts
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  }
}
