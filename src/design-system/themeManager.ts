import { defaultTheme, themeRegistry } from './tokens'
import type { ThemeDefinition, ThemeMode } from './types'

const STORAGE_KEY = 'vae-theme'

const isBrowser = () => typeof window !== 'undefined'

function setDataAttributes(root: HTMLElement, theme: ThemeDefinition) {
  root.dataset.themeMode = theme.mode
  root.dataset.colorScheme = theme.mode
  root.classList.remove('theme-light', 'theme-dark')
  root.classList.add(`theme-${theme.mode}`)
  // Ensure Tailwind's dark mode toggles continue to work
  if (theme.mode === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

function setCssVariables(root: HTMLElement, theme: ThemeDefinition) {
  const { palette, typography, radius, spacing, shadow, transition } = theme

  const variablePairs: Array<[string, string]> = []

  Object.entries(palette).forEach(([token, value]) => {
    variablePairs.push([`--ds-color-${token}`, value])
  })

  variablePairs.push(
    ['--theme-background', palette.background],
    ['--theme-surface', palette.surface],
    ['--theme-surface-muted', palette.surfaceMuted],
    ['--theme-text', palette.text],
    ['--theme-text-muted', palette.textMuted],
    ['--theme-primary', palette.primary],
    ['--theme-secondary', palette.secondary],
    ['--theme-accent', palette.accent]
  )

  Object.entries(typography).forEach(([token, config]) => {
    variablePairs.push(
      [`--ds-typography-${token}-font-family`, config.fontFamily],
      [`--ds-typography-${token}-font-size`, config.fontSize],
      [`--ds-typography-${token}-line-height`, String(config.lineHeight)],
      [`--ds-typography-${token}-font-weight`, String(config.fontWeight)],
      [`--ds-typography-${token}-letter-spacing`, config.letterSpacing ?? 'normal'],
      [`--ds-typography-${token}-text-transform`, config.textTransform ?? 'none']
    )
  })

  Object.entries(spacing).forEach(([token, value]) => {
    variablePairs.push([`--ds-space-${token}`, value])
  })

  Object.entries(radius).forEach(([token, value]) => {
    variablePairs.push([`--ds-radius-${token}`, value])
  })

  Object.entries(shadow).forEach(([token, value]) => {
    variablePairs.push([`--ds-shadow-${token}`, value])
  })

  Object.entries(transition).forEach(([token, value]) => {
    variablePairs.push([`--ds-transition-${token}`, value])
  })

  for (const [variable, value] of variablePairs) {
    root.style.setProperty(variable, value)
  }

  root.style.setProperty('color-scheme', theme.mode)
}

export const resolveTheme = (mode?: ThemeMode | null): ThemeDefinition => {
  if (!mode) {
    return themeRegistry[defaultTheme]
  }
  return themeRegistry[mode] ?? themeRegistry[defaultTheme]
}

export const getSystemTheme = (): ThemeMode => {
  if (!isBrowser()) return defaultTheme
  try {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  } catch {
    return defaultTheme
  }
}

export const getStoredTheme = (): ThemeMode | null => {
  if (!isBrowser()) return null
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    return null
  }
}

export const persistTheme = (mode: ThemeMode) => {
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(STORAGE_KEY, mode)
  } catch {
    // noop: storage might be disabled
  }
}

export const applyTheme = (mode: ThemeMode) => {
  if (!isBrowser()) return
  const theme = resolveTheme(mode)
  const root = document.documentElement

  // Add transition class for smooth theme switching
  root.classList.add('theme-transitioning')

  setDataAttributes(root, theme)
  setCssVariables(root, theme)

  // Remove transition class after transition completes
  setTimeout(() => {
    root.classList.remove('theme-transitioning')
  }, 300)
}

export const initialiseTheme = (): ThemeMode => {
  const stored = getStoredTheme()
  const mode = stored ?? getSystemTheme()
  applyTheme(mode)
  return mode
}

export const listAvailableThemes = (): ThemeMode[] => Object.keys(themeRegistry) as ThemeMode[]
