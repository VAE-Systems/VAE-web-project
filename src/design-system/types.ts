export type ThemeMode = 'light' | 'dark'

export interface PaletteTokens {
  background: string
  surface: string
  surfaceMuted: string
  overlay: string
  border: string
  divider: string
  text: string
  textMuted: string
  primary: string
  primaryMuted: string
  secondary: string
  accent: string
  success: string
  warning: string
  danger: string
  info: string
  focus: string
}

export interface TypographyScale {
  fontFamily: string
  fontSize: string
  lineHeight: number
  fontWeight: number
  letterSpacing?: string
  textTransform?: 'none' | 'uppercase'
}

export interface TypographyTokens {
  display: TypographyScale
  headline: TypographyScale
  subheadline: TypographyScale
  body: TypographyScale
  bodySmall: TypographyScale
  label: TypographyScale
  mono: TypographyScale
}

export interface RadiusTokens {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  full: string
}

export interface SpacingTokens {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

export interface ShadowTokens {
  xs: string
  sm: string
  md: string
  lg: string
  inner: string
  glow: string
}

export interface TransitionTokens {
  default: string
  fast: string
  slow: string
}

export interface ThemeDefinition {
  mode: ThemeMode
  palette: PaletteTokens
  typography: TypographyTokens
  radius: RadiusTokens
  spacing: SpacingTokens
  shadow: ShadowTokens
  transition: TransitionTokens
}

export type ThemeRegistry = Record<ThemeMode, ThemeDefinition>

export interface ThemeMetadata {
  name: ThemeMode
  label: string
  description: string
}
