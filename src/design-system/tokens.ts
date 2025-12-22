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

// Light mode shadows - stronger, visible on sage background
const lightShadow: ThemeDefinition['shadow'] = {
  xs: '0 1px 2px rgba(26, 35, 32, 0.08)',
  sm: '0 2px 8px rgba(26, 35, 32, 0.12)',
  md: '0 4px 16px rgba(26, 35, 32, 0.14)',
  lg: '0 8px 32px rgba(26, 35, 32, 0.18)',
  inner: 'inset 0 1px 0 rgba(255, 255, 255, 0.5)',
  glow: '0 0 24px rgba(29, 184, 122, 0.25)', // VAE green glow
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
  // Core surfaces - Sage-inspired, warm neutrals
  background: '#f5f7f5', // Soft sage background (deine Farbe)
  surface: '#FFFFFF', // Pure white for cards/elevated content
  surfaceMuted: '#e8ebe9', // Muted sage for secondary surfaces
  overlay: 'rgba(26, 35, 32, 0.65)', // Deep forest overlay with stronger presence

  // Borders & dividers - subtle but visible
  border: '#c5ccc8', // Medium sage border
  divider: '#d8ddd9', // Light sage divider

  // Text hierarchy - strong contrast with your colors
  text: '#1a2320', // Deep forest text (deine Farbe) - WCAG AAA contrast
  textMuted: '#394642', // Slate gray muted text (deine Farbe)

  // Brand colors
  primary: '#1db87a', // VAE Green (deine Farbe)
  primaryMuted: '#16a068', // Darker variant for hover states

  // Accent colors - adjusted for light mode
  secondary: 'hsl(212 85% 50%)',
  accent: 'hsl(278 75% 55%)',
  success: '#1db87a', // Use primary green for success
  warning: 'hsl(38 92% 48%)',
  danger: 'hsl(358 80% 52%)',
  info: 'hsl(210 85% 48%)',
  focus: 'rgba(29, 184, 122, 0.35)', // Primary green with alpha
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
    shadow: lightShadow, // Use light-specific shadows
    transition,
  },
  dark: {
    mode: 'dark',
    palette: darkPalette,
    typography,
    radius,
    spacing,
    shadow, // Use dark-specific shadows
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
