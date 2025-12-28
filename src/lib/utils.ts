/**
 * Utility Functions
 *
 * Common helper functions used throughout the application
 */

import { ANIMATION } from '../config'
import type { LoadingState } from '../types'

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[\d\s\-()]{7,}$/
  return phoneRegex.test(phone.trim())
}

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// ============================================================================
// STRING UTILITIES
// ============================================================================

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const truncate = (text: string, maxLength: number, suffix = '...'): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - suffix.length) + suffix
}

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export const formatNumber = (num: number, locale: string = 'de-DE'): string => {
  return new Intl.NumberFormat(locale).format(num)
}

export const formatCurrency = (amount: number, currency: string = 'EUR', locale: string = 'de-DE'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export const formatPercentage = (value: number, decimals: number = 1, locale: string = 'de-DE'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100)
}

export const formatName = (firstName: string, lastName?: string): string => {
  const first = capitalize(firstName.trim())
  const last = lastName ? capitalize(lastName.trim()) : ''
  return [first, last].filter(Boolean).join(' ')
}

// ============================================================================
// DATE & TIME UTILITIES
// ============================================================================

export const formatDate = (date: Date | string, locale = 'de-DE'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString(locale)
}

export const formatDateTime = (date: Date | string, locale = 'de-DE'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleString(locale)
}

export const getRelativeTime = (date: Date | string, locale = 'de-DE'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  if (diffInSeconds < 60) return 'gerade eben'
  if (diffInSeconds < 3600) return `vor ${Math.floor(diffInSeconds / 60)} Minuten`
  if (diffInSeconds < 86400) return `vor ${Math.floor(diffInSeconds / 3600)} Stunden`
  if (diffInSeconds < 604800) return `vor ${Math.floor(diffInSeconds / 86400)} Tagen`

  return formatDate(dateObj, locale)
}

// ============================================================================
// ARRAY UTILITIES
// ============================================================================

export const unique = <T>(array: T[]): T[] => {
  return [...new Set(array)]
}

export const groupBy = <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
  return array.reduce(
    (groups, item) => {
      const group = String(item[key])
      return {
        ...groups,
        [group]: [...(groups[group] || []), item],
      }
    },
    {} as Record<string, T[]>
  )
}

export const shuffle = <T>(array: T[]): T[] => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// ============================================================================
// OBJECT UTILITIES
// ============================================================================

export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

export const omit = <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj }
  keys.forEach(key => {
    delete result[key]
  })
  return result
}

export const isEmpty = (value: any): boolean => {
  if (value == null) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

// ============================================================================
// LOADING STATE UTILITIES
// ============================================================================

export const isLoading = (state: LoadingState): boolean => {
  return state === 'loading'
}

export const isSuccess = (state: LoadingState): boolean => {
  return state === 'success'
}

export const isError = (state: LoadingState): boolean => {
  return state === 'error'
}

export const isIdle = (state: LoadingState): boolean => {
  return state === 'idle'
}

// ============================================================================
// URL & QUERY UTILITIES
// ============================================================================

export const buildUrl = (base: string, params: Record<string, string | number | boolean>): string => {
  const url = new URL(base)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value))
  })
  return url.toString()
}

export const parseQueryString = (search: string): Record<string, string> => {
  const params = new URLSearchParams(search)
  const result: Record<string, string> = {}
  params.forEach((value, key) => {
    result[key] = value
  })
  return result
}

// ============================================================================
// LOCAL STORAGE UTILITIES
// ============================================================================

export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    // SSR Guard: localStorage is not available during server-side rendering
    if (typeof window === 'undefined') return defaultValue || null

    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch {
      return defaultValue || null
    }
  },

  set: <T>(key: string, value: T): void => {
    // SSR Guard: localStorage is not available during server-side rendering
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn('Failed to save to localStorage:', error)
    }
  },

  remove: (key: string): void => {
    // SSR Guard: localStorage is not available during server-side rendering
    if (typeof window === 'undefined') return

    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error)
    }
  },

  clear: (): void => {
    // SSR Guard: localStorage is not available during server-side rendering
    if (typeof window === 'undefined') return

    try {
      localStorage.clear()
    } catch (error) {
      console.warn('Failed to clear localStorage:', error)
    }
  },
}

// ============================================================================
// DEBOUNCE & THROTTLE
// ============================================================================

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number = ANIMATION.DELAY.FORM_SUBMIT
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  delay: number = ANIMATION.DURATION.BASE
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}
