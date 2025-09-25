/**
 * Privacy Types
 *
 * TypeScript types for privacy controls, cookie consent, and GDPR compliance
 */

export interface CookieCategory {
  id: string
  title: string
  description: string
  required: boolean
  cookies: string[]
  defaultEnabled: boolean
}

export interface CookieConsent {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
  timestamp: string
  version: string
}

export interface PrivacySettings {
  consent: CookieConsent
  showBanner: boolean
  showPreferences: boolean
  lastUpdated: string
}

export interface ConsentManager {
  consent: CookieConsent
  updateConsent: (category: keyof CookieConsent, enabled: boolean) => void
  acceptAll: () => void
  rejectAll: () => void
  acceptNecessary: () => void
  resetConsent: () => void
  hasConsent: (category: keyof CookieConsent) => boolean
  isConsentGiven: boolean
}

// Cookie Categories Configuration
export const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: 'necessary',
    title: 'Notwendig',
    description:
      'Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.',
    required: true,
    cookies: ['session', 'csrf', 'language'],
    defaultEnabled: true,
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Hilft uns zu verstehen, wie Besucher unsere Website nutzen, um die Erfahrung zu verbessern.',
    required: false,
    cookies: ['_ga', '_gid', '_gat', 'analytics_consent'],
    defaultEnabled: false,
  },
  {
    id: 'marketing',
    title: 'Marketing',
    description: 'Wird für personalisierte Werbung und Newsletter verwendet.',
    required: false,
    cookies: ['newsletter_tracking', 'marketing_consent', 'campaign_tracking'],
    defaultEnabled: false,
  },
  {
    id: 'preferences',
    title: 'Präferenzen',
    description: 'Speichert Ihre Einstellungen für eine bessere Benutzererfahrung.',
    required: false,
    cookies: ['theme', 'language_preference', 'user_settings'],
    defaultEnabled: false,
  },
]

// Default consent state
export const DEFAULT_CONSENT: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
  timestamp: '',
  version: '1.0.0',
}

// GDPR Compliance Constants
export const GDPR_CONSTANTS = {
  CONSENT_VERSION: '1.0.0',
  CONSENT_EXPIRY_DAYS: 365,
  COOKIE_PREFIX: 'vae_consent_',
  STORAGE_KEY: 'vae_privacy_consent',
} as const
