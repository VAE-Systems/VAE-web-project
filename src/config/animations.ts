/**
 * Animation Configuration
 *
 * Centralized animation timing, easing, and effects for consistency
 */

export const ANIMATION = {
  // Duration constants
  DURATION: {
    FAST: 150,
    BASE: 300,
    SLOW: 500,
    MAGNETIC: 350,
    SHEEN: 1300,
    POP_WOBBLE: 650,
    NUDGE: 140,
    DROPDOWN_SCALE: 240,
    FADE_IN: 200,
    REVEAL_SOFT: 700
  } as const,

  // Easing functions
  EASING: {
    MAGNETIC: 'cubic-bezier(.16,.84,.44,1)',
    POP: 'cubic-bezier(.16,.84,.44,1)',
    SOFT: 'cubic-bezier(.16,1,.3,1)',
    FADE: 'ease-out',
    SCALE: 'cubic-bezier(.16,.84,.44,1)'
  } as const,

  // Delays
  DELAY: {
    INITIAL_SIGNAL: 7000,
    SIGNAL_INTERVAL: 60000,
    FORM_SUBMIT: 1000,
    NEWSLETTER_SUBMIT: 800
  } as const,

  // Transform values
  TRANSFORM: {
    MAGNETIC_INTENSITY: 0.3,
    HOVER_LIFT: '-0.5',
    ACTIVE_SCALE: 0.985,
    POP_SCALE: 1.045,
    NUDGE_SCALE: 1.01
  } as const
} as const

// Network simulation delays (for development)
export const NETWORK_DELAY = {
  CONTACT_FORM: { MIN: 1000, MAX: 2000 },
  NEWSLETTER_FORM: { MIN: 800, MAX: 1300 }
} as const
