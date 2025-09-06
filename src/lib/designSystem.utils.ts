/**
 * Design System Utilities
 * Hilfsfunktionen für Berechnungen und Transformationen
 */

import { DESIGN_SYSTEM_CONFIG, TYPOGRAPHY_SCALE_DEFINITIONS } from '../config/designSystem.constants'
import type { ScaleValue } from '../types/designSystem'

/**
 * Berechnet einen skalierten Wert basierend auf dem aktuellen Scale Factor
 */
export const scaleValue = (baseValue: number, scaleFactor: number): number => {
  return baseValue * scaleFactor
}

/**
 * Generiert eine responsive clamp-Funktion für Typografie
 */
export const generateClamp = (
  minSize: number,
  maxSize: number,
  mobileSize: number,
  scaleFactor: number
): string => {
  const scaledMin = scaleValue(minSize, scaleFactor)
  const scaledMax = scaleValue(maxSize, scaleFactor)
  const scaledMobile = scaleValue(mobileSize, scaleFactor)

  const minVw = (scaledMin / DESIGN_SYSTEM_CONFIG.TYPOGRAPHY.BASE_SIZE) * 100

  return `clamp(${scaledMobile / 16}rem, ${minVw}vw, ${scaledMax / 16}rem)`
}

/**
 * Generiert clamp-Funktion für eine Typografie-Skala
 */
export const generateTypographyClamp = (
  scaleKey: keyof typeof TYPOGRAPHY_SCALE_DEFINITIONS,
  scaleFactor: number
): string => {
  const scale = TYPOGRAPHY_SCALE_DEFINITIONS[scaleKey]
  return generateClamp(scale.min, scale.max, scale.mobile, scaleFactor)
}

/**
 * Generiert clamp-Funktion für Spacing
 */
export const generateSpacingClamp = (
  baseValue: number,
  scaleFactor: number
): string => {
  const scaledValue = scaleValue(baseValue, scaleFactor)
  return `${scaledValue}rem`
}

/**
 * Validiert einen Scale Factor
 */
export const validateScaleFactor = (factor: number): boolean => {
  return factor >= 0.5 && factor <= 2.0 && !isNaN(factor)
}

/**
 * Rundet einen Wert auf eine bestimmte Anzahl Dezimalstellen
 */
export const roundToDecimals = (value: number, decimals: number = 2): number => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

/**
 * Konvertiert Pixel zu rem
 */
export const pxToRem = (px: number): number => {
  return px / DESIGN_SYSTEM_CONFIG.TYPOGRAPHY.BASE_SIZE
}

/**
 * Konvertiert rem zu Pixel
 */
export const remToPx = (rem: number): number => {
  return rem * DESIGN_SYSTEM_CONFIG.TYPOGRAPHY.BASE_SIZE
}

/**
 * Berechnet eine Typografie-Skala basierend auf dem Scale Ratio
 */
export const calculateTypographyScale = (
  baseSize: number,
  scaleRatio: number,
  steps: number
): ScaleValue[] => {
  const scale: ScaleValue[] = []

  for (let i = -steps; i <= steps; i++) {
    const multiplier = Math.pow(scaleRatio, i)
    const size = baseSize * multiplier

    scale.push({
      min: size * 0.9,
      max: size * 1.1,
      mobile: size
    })
  }

  return scale
}

/**
 * Debounce-Funktion für Performance-Optimierung
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle-Funktion für Performance-Optimierung
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}
