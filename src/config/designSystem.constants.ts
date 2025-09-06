/**
 * Design System Constants
 * Zentrale Konfiguration für das Design-System
 */

import type { DesignSystemConfig } from '../types/designSystem'

export const DESIGN_SYSTEM_CONFIG: DesignSystemConfig = {
  SCALE_FACTOR: 1.0,
  TYPOGRAPHY: {
    BASE_SIZE: 16,
    SCALE_RATIO: 1.25, // Major Third
    LINE_HEIGHT_BASE: 1.5,
    LETTER_SPACING_BASE: 0,
  },
  SPACING: {
    BASE: 1,
    SCALE_RATIO: 1.5,
  },
  BREAKPOINTS: {
    MOBILE: 640,
    TABLET: 768,
    DESKTOP: 1024,
    WIDE: 1280,
  },
  CONTAINER: {
    MOBILE: 100,
    TABLET: 90,
    DESKTOP: 85,
    WIDE: 80,
  }
} as const

// Typografie-Skalen-Definitionen
export const TYPOGRAPHY_SCALE_DEFINITIONS = {
  xs: { min: 12, max: 14, mobile: 12 },
  sm: { min: 14, max: 16, mobile: 14 },
  base: { min: 16, max: 18, mobile: 16 },
  lg: { min: 18, max: 20, mobile: 18 },
  xl: { min: 20, max: 24, mobile: 20 },
  '2xl': { min: 24, max: 32, mobile: 24 },
  '3xl': { min: 32, max: 40, mobile: 32 },
  '4xl': { min: 40, max: 48, mobile: 40 },
  '5xl': { min: 48, max: 64, mobile: 48 },
  '6xl': { min: 64, max: 80, mobile: 64 }
} as const

// Spacing-Skalen-Definitionen
export const SPACING_SCALE_DEFINITIONS = {
  xs: 0.25,
  sm: 0.5,
  base: 1,
  lg: 1.5,
  xl: 2,
  '2xl': 3,
  '3xl': 4,
  '4xl': 6,
  '5xl': 8
} as const

// CSS-Variable-Namen
export const CSS_VARIABLES = {
  SCALE_FACTOR: '--ds-scale-factor',
  FONT_SIZE_PREFIX: '--ds-font-size-',
  SPACING_PREFIX: '--ds-spacing-',
  LINE_HEIGHT_PREFIX: '--ds-line-height-',
  LETTER_SPACING_PREFIX: '--ds-letter-spacing-'
} as const

// Event-Namen für Design-System-Änderungen
export const DESIGN_SYSTEM_EVENTS = {
  SCALE_CHANGED: 'designSystemScaleChanged',
  INITIALIZED: 'designSystemInitialized'
} as const
