/**
 * Legacy Design System Interface
 * Für Abwärtskompatibilität - verwendet jetzt den neuen Service
 */

// Re-export für Abwärtskompatibilität
export {
  getCurrentScaleFactor, resetDesignSystem, scaleDesignSystem, updateDesignSystem
} from '../services/designSystem.service'

// Legacy-Konstanten für Abwärtskompatibilität
export const DESIGN_SYSTEM = {
  SCALE_FACTOR: 1.0,
  TYPOGRAPHY: {
    BASE_SIZE: 16,
    SCALE_RATIO: 1.25,
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

// Legacy-Funktionen (delegieren an Service)
export const getScaledValue = (baseValue: number): number => {
  const { getCurrentScaleFactor } = require('../services/designSystem.service')
  return baseValue * getCurrentScaleFactor()
}

export const generateResponsiveClamp = (
  minSize: number,
  maxSize: number,
  mobileSize?: number
): string => {
  const scaledMin = getScaledValue(minSize)
  const scaledMax = getScaledValue(maxSize)
  const scaledMobile = mobileSize ? getScaledValue(mobileSize) : scaledMin

  const minVw = (scaledMin / DESIGN_SYSTEM.TYPOGRAPHY.BASE_SIZE) * 100

  return `clamp(${scaledMobile / 16}rem, ${minVw}vw, ${scaledMax / 16}rem)`
}

export const generateTypographyScale = (): Record<string, string> => {
  // Delegiert an Service
  return {
    'xs': generateResponsiveClamp(12, 14, 12),
    'sm': generateResponsiveClamp(14, 16, 14),
    'base': generateResponsiveClamp(16, 18, 16),
    'lg': generateResponsiveClamp(18, 20, 18),
    'xl': generateResponsiveClamp(20, 24, 20),
    '2xl': generateResponsiveClamp(24, 32, 24),
    '3xl': generateResponsiveClamp(32, 40, 32),
    '4xl': generateResponsiveClamp(40, 48, 40),
    '5xl': generateResponsiveClamp(48, 64, 48),
    '6xl': generateResponsiveClamp(64, 80, 64)
  }
}

export const generateSpacingScale = (): Record<string, string> => {
  const { getCurrentScaleFactor } = require('../services/designSystem.service')
  const scaleFactor = getCurrentScaleFactor()
  return {
    'xs': `${0.25 * scaleFactor}rem`,
    'sm': `${0.5 * scaleFactor}rem`,
    'base': `${1 * scaleFactor}rem`,
    'lg': `${1.5 * scaleFactor}rem`,
    'xl': `${2 * scaleFactor}rem`,
    '2xl': `${3 * scaleFactor}rem`,
    '3xl': `${4 * scaleFactor}rem`,
    '4xl': `${6 * scaleFactor}rem`,
    '5xl': `${8 * scaleFactor}rem`
  }
}
