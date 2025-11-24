import type { ThemeDefinition, ThemeMetadata, ThemeMode, ThemeRegistry } from './types'

const spacing: ThemeDefinition['spacing'] = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
}

const radius: ThemeDefinition['radius'] = {
  xs: '4px',
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '18px',
  full: '999px',
}

const shadow: ThemeDefinition['shadow'] = {
  xs: '0 1px 2px rgba(15, 23, 42, 0.1)',
  sm: '0 4px 8px rgba(15, 23, 42, 0.18)',
  md: '0 8px 24px rgba(15, 23, 42, 0.16)',
  lg: '0 20px 40px rgba(15, 23, 42, 0.18)',
  inner: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
  glow: '0 0 24px rgba(0, 255, 165, 0.35)',
}

const transition: ThemeDefinition['transition'] = {
  default: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
  fast: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 0.45s cubic-bezier(0.33, 1, 0.68, 1)',
}

const typography: ThemeDefinition['typography'] = {
  display: {
    fontFamily: 'var(--font-display, "Space Grotesk", system-ui)',
    fontSize: 'clamp(2.75rem, 2.2vw + 1.5rem, 3.5rem)',
    lineHeight: 1.1,
    fontWeight: 600,
    letterSpacing: '-0.02em',
  },
  headline: {
    fontFamily: 'var(--font-display, "Space Grotesk", system-ui)',
    fontSize: 'clamp(2rem, 1.5vw + 1rem, 2.75rem)',
    lineHeight: 1.15,
    fontWeight: 600,
    letterSpacing: '-0.015em',
  },
  subheadline: {
    fontFamily: 'var(--font-display, "Space Grotesk", system-ui)',
    fontSize: 'clamp(1.375rem, 1vw + 1rem, 1.75rem)',
    lineHeight: 1.2,
    fontWeight: 500,
    letterSpacing: '-0.01em',
  },
  body: {
    fontFamily: 'var(--font-base, "Geist", system-ui)',
    fontSize: '1rem',
    lineHeight: 1.6,
    fontWeight: 400,
    letterSpacing: '-0.005em',
  },
  bodySmall: {
    fontFamily: 'var(--font-base, "Geist", system-ui)',
    fontSize: '0.9375rem',
    lineHeight: 1.55,
    fontWeight: 400,
    letterSpacing: '-0.003em',
  },
  label: {
    fontFamily: 'var(--font-base, "Geist", system-ui)',
    fontSize: '0.8125rem',
    lineHeight: 1.4,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  mono: {
    fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
    fontSize: '0.875rem',
    lineHeight: 1.5,
    fontWeight: 500,
    letterSpacing: '0.01em',
  },
}

const lightPalette: ThemeDefinition['palette'] = {
  background: 'hsl(0 0% 98%)',
  surface: 'hsl(210 20% 96%)',
  surfaceMuted: 'hsl(210 24% 94%)',
  overlay: 'hsla(210, 24%, 10%, 0.4)',
  border: 'hsl(210 20% 82%)',
  divider: 'hsl(210 16% 88%)',
  text: 'hsl(220 47% 15%)',
  textMuted: 'hsl(220 15% 45%)',
  primary: 'hsl(157 95% 45%)',
  primaryMuted: 'hsl(157 72% 52%)',
  secondary: 'hsl(212 90% 56%)',
  accent: 'hsl(278 90% 60%)',
  success: 'hsl(148 70% 40%)',
  warning: 'hsl(40 100% 45%)',
  danger: 'hsl(358 85% 55%)',
  info: 'hsl(210 80% 50%)',
  focus: 'hsla(157, 95%, 45%, 0.35)',
}

const darkPalette: ThemeDefinition['palette'] = {
  background: 'hsl(222 47% 6%)',
  surface: 'hsl(222 47% 8%)',
  surfaceMuted: 'hsl(222 36% 12%)',
  overlay: 'hsla(222, 63%, 5%, 0.6)',
  border: 'hsl(220 30% 20%)',
  divider: 'hsl(220 27% 18%)',
  text: 'hsl(215 25% 92%)',
  textMuted: 'hsl(216 12% 64%)',
  primary: 'hsl(157 100% 47%)',
  primaryMuted: 'hsl(157 80% 38%)',
  secondary: 'hsl(212 88% 56%)',
  accent: 'hsl(278 96% 62%)',
  success: 'hsl(155 85% 45%)',
  warning: 'hsl(40 100% 52%)',
  danger: 'hsl(356 95% 60%)',
  info: 'hsl(210 100% 64%)',
  focus: 'hsla(157, 100%, 47%, 0.45)',
}

export const themeRegistry: ThemeRegistry = {
  light: {
    mode: 'light',
    palette: lightPalette,
    typography,
    radius,
    spacing,
    shadow,
    transition,
  },
  dark: {
    mode: 'dark',
    palette: darkPalette,
    typography,
    radius,
    spacing,
    shadow,
    transition,
  },
}

export const defaultTheme: ThemeMode = 'dark'

export const themeMetadata: ThemeMetadata[] = [
  {
    name: 'light',
    label: 'Light Mode',
    description: 'Hohe Lesbarkeit, neutrale Flächen, moderne Akzente.',
  },
  {
    name: 'dark',
    label: 'Dark Mode',
    description: 'Kontrastierte Flächen, Fokus auf Inhalte und Tiefe.',
  },
]
