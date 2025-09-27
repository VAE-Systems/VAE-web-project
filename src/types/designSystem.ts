/**
 * Design System Types
 * Zentrale Typ-Definitionen für das Design-System
 */

export interface DesignSystemConfig {
  SCALE_FACTOR: number
  TYPOGRAPHY: TypographyConfig
  SPACING: SpacingConfig
  BREAKPOINTS: BreakpointsConfig
  CONTAINER: ContainerConfig
}

export interface TypographyConfig {
  BASE_SIZE: number
  SCALE_RATIO: number
  LINE_HEIGHT_BASE: number
  LETTER_SPACING_BASE: number
}

export interface SpacingConfig {
  BASE: number
  SCALE_RATIO: number
}

export interface BreakpointsConfig {
  MOBILE: number
  TABLET: number
  DESKTOP: number
  WIDE: number
}

export interface ContainerConfig {
  MOBILE: number
  TABLET: number
  DESKTOP: number
  WIDE: number
}

export interface ScaleValue {
  min: number
  max: number
  mobile: number
}

export interface TypographyScale {
  [key: string]: ScaleValue
}

export interface SpacingScale {
  [key: string]: number
}

export interface DesignSystemState {
  currentScaleFactor: number
  typographyScale: Record<string, string>
  spacingScale: Record<string, string>
  isInitialized: boolean
}

export interface DesignSystemActions {
  updateScaleFactor: (factor: number) => void
  scaleByFactor: (multiplier: number) => void
  reset: () => void
  getCurrentScale: () => number
  generateTypographyScale: () => Record<string, string>
  generateSpacingScale: () => Record<string, string>
}

export type DesignSystemHook = () => {
  state: DesignSystemState
  actions: DesignSystemActions
}
