import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('vae-theme')
    if (saved === 'light' || saved === 'dark') return saved

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light'
    }
    return 'dark'
  })

  useEffect(() => {
    const root = document.documentElement

    // Remove previous theme classes
    root.classList.remove('theme-dark', 'theme-light', 'dark')

    // Add current theme class
    root.classList.add(`theme-${theme}`)
    // Ensure Tailwind dark: variants work by toggling the 'dark' class
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Update CSS custom properties based on theme
    if (theme === 'light') {
      // Light mode colors
      root.style.setProperty('--color-bg-darker', '0 0% 98%')
      root.style.setProperty('--color-bg-dark', '0 0% 95%')
      root.style.setProperty('--color-bg-secondary', '0 0% 92%')
      root.style.setProperty('--color-text-light', '0 0% 10%')
      root.style.setProperty('--color-text-secondary', '0 0% 30%')
      root.style.setProperty('--color-text-muted', '0 0% 50%')
      root.style.setProperty('--color-vae-turquoise', '157 85% 32%') // Calmer turquoise on light backgrounds
      root.style.setProperty('--color-vae-black', '0 0% 10%')
    } else {
      // Dark mode colors (original)
      root.style.setProperty('--color-bg-darker', '0 0% 4%')
      root.style.setProperty('--color-bg-dark', '0 0% 8%')
      root.style.setProperty('--color-bg-secondary', '0 0% 12%')
      root.style.setProperty('--color-text-light', '0 0% 95%')
      root.style.setProperty('--color-text-secondary', '0 0% 70%')
      root.style.setProperty('--color-text-muted', '0 0% 50%')
      root.style.setProperty('--color-vae-turquoise', '157 100% 47%')
      root.style.setProperty('--color-vae-black', '0 0% 4%')
    }

    // Save to localStorage
    localStorage.setItem('vae-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
