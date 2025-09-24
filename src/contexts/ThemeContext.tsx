import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from 'react'

import {
  applyTheme,
  defaultTheme,
  getStoredTheme,
  getSystemTheme,
  initialiseTheme,
  listAvailableThemes,
  persistTheme,
  resolveTheme,
  type ThemeDefinition,
  type ThemeMode
} from '@design-system/index'

interface ThemeContextValue {
  theme: ThemeMode
  definition: ThemeDefinition
  availableThemes: ThemeMode[]
  toggleTheme: () => void
  setTheme: (mode: ThemeMode) => void
  isReady: boolean
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const isBrowser = () => typeof window !== 'undefined'

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(defaultTheme)
  const [isReady, setIsReady] = useState(false)
  const hasExplicitPreference = useRef<boolean>(!!getStoredTheme())

  // Hydrate theme on client once DOM APIs are available
  useEffect(() => {
    if (!isBrowser()) return
    const mode = initialiseTheme()
    setTheme(mode)
    hasExplicitPreference.current = !!getStoredTheme()
    setIsReady(true)
  }, [])

  // Re-apply theme whenever the mode changes (after hydration)
  useEffect(() => {
    if (!isBrowser() || !isReady) return
    applyTheme(theme)
    if (hasExplicitPreference.current) {
      persistTheme(theme)
    }
  }, [theme, isReady])

  // Respond to system theme changes when user has not set an explicit preference
  useEffect(() => {
    if (!isBrowser()) return
    if (hasExplicitPreference.current) return

    const media = window.matchMedia('(prefers-color-scheme: light)')
    const handleChange = () => {
      const systemTheme = media.matches ? 'light' : 'dark'
      setTheme(systemTheme)
    }

    try {
      media.addEventListener('change', handleChange)
      return () => media.removeEventListener('change', handleChange)
    } catch {
      // Fallback for older browsers
      media.onchange = handleChange
      return () => {
        media.onchange = null
      }
    }
  }, [])

  const availableThemes = useMemo(() => listAvailableThemes(), [])
  const definition = useMemo(() => resolveTheme(theme), [theme])

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      hasExplicitPreference.current = true
      persistTheme(next)
      return next
    })
  }, [])

  const setThemeSafe = useCallback((mode: ThemeMode) => {
    const next = resolveTheme(mode).mode
    hasExplicitPreference.current = true
    persistTheme(next)
    setTheme(next)
  }, [])

  const value = useMemo<ThemeContextValue>(() => ({
    theme,
    definition,
    availableThemes,
    toggleTheme,
    setTheme: setThemeSafe,
    isReady
  }), [theme, definition, availableThemes, toggleTheme, setThemeSafe, isReady])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}

export const getInitialTheme = (): ThemeMode => {
  if (!isBrowser()) return defaultTheme
  return getStoredTheme() ?? getSystemTheme()
}
