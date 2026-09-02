import { defaultTheme, themeRegistry } from './tokens'
import type { ThemeDefinition, ThemeMode } from './types'

const STORAGE_KEY = 'vae-theme'

const isBrowser = () => typeof window !== 'undefined'

const THEME_COLORS: Record<ThemeMode, string> = {
  light: '#1db87a',
  dark: '#0a0a0a',
}

const THEME_FAVICONS: Record<ThemeMode, string> = {
  light: '/App_Logo_dark.svg',
  dark: '/App_Logo_light.svg',
}

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

// Single source of truth for brand/theme values is src/styles/tokens.css, read via
// the `.theme-light` class toggle (setDataAttributes). The old runtime injection of
// `--ds-*` / `--theme-*` inline variables was dead weight — nothing in the live CSS
// consumed them (theme.css / design-system.css are not imported). Only `color-scheme`
// is still meaningful (native form controls / scrollbars), so that's all we set here.
function setColorScheme(root: HTMLElement, theme: ThemeDefinition) {
  root.style.setProperty('color-scheme', theme.mode)
}

function updateBrowserMeta(themeMode: ThemeMode) {
  const themeColor = THEME_COLORS[themeMode]
  const faviconHref = THEME_FAVICONS[themeMode]

  const themeColorMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', themeColor)
  }

  const faviconLink = document.querySelector<HTMLLinkElement>('link[rel="icon"][data-theme-favicon="true"]')
  if (faviconLink) {
    faviconLink.setAttribute('href', faviconHref)
  }
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
  setColorScheme(root, theme)
  updateBrowserMeta(theme.mode)

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
