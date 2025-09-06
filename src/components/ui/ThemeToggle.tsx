import React, { createContext, useContext, useState, useEffect } from 'react'

type ThemeMode = 'light' | 'dark' | 'auto'
type ColorScheme = 'default' | 'high-contrast' | 'colorblind'

interface ThemeContextType {
  mode: ThemeMode
  colorScheme: ColorScheme
  setMode: (mode: ThemeMode) => void
  setColorScheme: (scheme: ColorScheme) => void
  isDark: boolean
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    muted: string
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

/**
 * Enhanced Theme Provider with multiple color schemes and accessibility options
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('auto')
  const [colorScheme, setColorScheme] = useState<ColorScheme>('default')

  // Detect system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = mode === 'dark' || (mode === 'auto' && prefersDark)

  // Dynamic color schemes
  const getColors = () => {
    const baseColors = {
      light: {
        primary: '#00ffa5',
        secondary: '#00a5ff',
        accent: '#a500ff',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#1e293b',
        muted: '#64748b'
      },
      dark: {
        primary: '#00ffa5',
        secondary: '#00a5ff',
        accent: '#a500ff',
        background: '#0a0a0a',
        surface: '#1a1a1a',
        text: '#f1f5f9',
        muted: '#94a3b8'
      }
    }

    const currentBase = baseColors[isDark ? 'dark' : 'light']

    // Apply color scheme modifications
    switch (colorScheme) {
      case 'high-contrast':
        return {
          ...currentBase,
          primary: isDark ? '#00ff88' : '#008844',
          secondary: isDark ? '#0088ff' : '#004466',
          accent: isDark ? '#aa00ff' : '#6600aa',
          text: isDark ? '#ffffff' : '#000000',
          muted: isDark ? '#cccccc' : '#333333'
        }

      case 'colorblind':
        return {
          ...currentBase,
          primary: '#ff6b35',
          secondary: '#f7931e',
          accent: '#0066cc',
          text: currentBase.text,
          muted: currentBase.muted
        }

      default:
        return currentBase
    }
  }

  const colors = getColors()

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement

    // Set CSS custom properties
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value)
    })

    // Set data attributes for CSS selectors
    root.setAttribute('data-theme-mode', isDark ? 'dark' : 'light')
    root.setAttribute('data-color-scheme', colorScheme)
    root.setAttribute('data-theme', `${isDark ? 'dark' : 'light'}-${colorScheme}`)

  }, [isDark, colorScheme, colors])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (mode === 'auto') {
        // Force re-render by updating colors
        setMode('auto')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [mode])

  const value: ThemeContextType = {
    mode,
    colorScheme,
    setMode,
    setColorScheme,
    isDark,
    colors
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Hook to use theme context
 */
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

/**
 * Theme Toggle Component
 */
export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { mode, setMode, colorScheme, setColorScheme } = useTheme()

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Mode Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setMode('light')}
          className={`p-2 rounded-lg transition-colors ${
            mode === 'light' ? 'bg-theme-primary text-theme-background' : 'hover:bg-theme-surface'
          }`}
          aria-label="Light mode"
        >
          ☀️
        </button>
        <button
          onClick={() => setMode('dark')}
          className={`p-2 rounded-lg transition-colors ${
            mode === 'dark' ? 'bg-theme-primary text-theme-background' : 'hover:bg-theme-surface'
          }`}
          aria-label="Dark mode"
        >
          🌙
        </button>
        <button
          onClick={() => setMode('auto')}
          className={`p-2 rounded-lg transition-colors ${
            mode === 'auto' ? 'bg-theme-primary text-theme-background' : 'hover:bg-theme-surface'
          }`}
          aria-label="Auto mode"
        >
          ⚙️
        </button>
      </div>

      {/* Color Scheme Toggle */}
      <div className="flex items-center gap-2">
        <select
          value={colorScheme}
          onChange={(e) => setColorScheme(e.target.value as ColorScheme)}
          className="px-3 py-1 rounded-lg bg-theme-surface border border-theme-muted text-theme-text"
        >
          <option value="default">Standard</option>
          <option value="high-contrast">Hoher Kontrast</option>
          <option value="colorblind">Farbenblind</option>
        </select>
      </div>
    </div>
  )
}
