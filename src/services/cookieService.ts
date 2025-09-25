/**
 * Cookie Service
 *
 * Manages cookie operations, consent storage, and GDPR compliance
 */

import type { CookieConsent, PrivacySettings } from '../types/privacy'
import { GDPR_CONSTANTS } from '../types/privacy'

// ============================================================================
// COOKIE MANAGEMENT
// ============================================================================

export class CookieService {
  private static instance: CookieService
  private consent: CookieConsent | null = null

  static getInstance(): CookieService {
    if (!CookieService.instance) {
      CookieService.instance = new CookieService()
    }
    return CookieService.instance
  }

  // ============================================================================
  // CONSENT MANAGEMENT
  // ============================================================================

  /**
   * Get current consent from localStorage
   */
  getConsent(): CookieConsent | null {
    if (this.consent) return this.consent

    try {
      const stored = localStorage.getItem(GDPR_CONSTANTS.STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as PrivacySettings

        // Check if consent is still valid
        if (this.isConsentValid(parsed)) {
          this.consent = parsed.consent
          return this.consent
        } else {
          // Consent expired, remove it
          this.clearConsent()
        }
      }
    } catch (error) {
      console.warn('Error reading consent from localStorage:', error)
    }

    return null
  }

  /**
   * Save consent to localStorage
   */
  saveConsent(consent: CookieConsent): void {
    const settings: PrivacySettings = {
      consent,
      showBanner: false,
      showPreferences: false,
      lastUpdated: new Date().toISOString(),
    }

    try {
      localStorage.setItem(GDPR_CONSTANTS.STORAGE_KEY, JSON.stringify(settings))
      this.consent = consent

      // Apply consent to actual cookies
      this.applyConsent(consent)
    } catch (error) {
      console.error('Error saving consent:', error)
    }
  }

  /**
   * Clear all consent data
   */
  clearConsent(): void {
    try {
      localStorage.removeItem(GDPR_CONSTANTS.STORAGE_KEY)
      this.consent = null
      this.removeNonEssentialCookies()
    } catch (error) {
      console.error('Error clearing consent:', error)
    }
  }

  /**
   * Check if consent is still valid
   */
  private isConsentValid(settings: PrivacySettings): boolean {
    if (!settings.consent.timestamp) return false

    const consentDate = new Date(settings.consent.timestamp)
    const now = new Date()
    const daysSinceConsent = (now.getTime() - consentDate.getTime()) / (1000 * 60 * 60 * 24)

    return daysSinceConsent <= GDPR_CONSTANTS.CONSENT_EXPIRY_DAYS
  }

  // ============================================================================
  // COOKIE OPERATIONS
  // ============================================================================

  /**
   * Set a cookie with consent check
   */
  setCookie(name: string, value: string, days: number = 365, category: keyof CookieConsent = 'necessary'): void {
    if (category !== 'necessary' && !this.hasConsent(category)) {
      console.warn(`Cannot set ${category} cookie: no consent given`)
      return
    }

    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)

    document.cookie = `${GDPR_CONSTANTS.COOKIE_PREFIX}${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
  }

  /**
   * Get a cookie value
   */
  getCookie(name: string): string | null {
    const fullName = `${GDPR_CONSTANTS.COOKIE_PREFIX}${name}`
    const nameEQ = fullName + '='
    const ca = document.cookie.split(';')

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

  /**
   * Remove a specific cookie
   */
  removeCookie(name: string): void {
    document.cookie = `${GDPR_CONSTANTS.COOKIE_PREFIX}${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
  }

  /**
   * Remove all non-essential cookies
   */
  private removeNonEssentialCookies(): void {
    // Remove analytics cookies
    this.removeCookie('_ga')
    this.removeCookie('_gid')
    this.removeCookie('_gat')

    // Remove marketing cookies
    this.removeCookie('newsletter_tracking')
    this.removeCookie('marketing_consent')
    this.removeCookie('campaign_tracking')

    // Remove preference cookies
    this.removeCookie('theme')
    this.removeCookie('language_preference')
    this.removeCookie('user_settings')
  }

  // ============================================================================
  // CONSENT CHECKS
  // ============================================================================

  /**
   * Check if user has given consent for a category
   */
  hasConsent(category: keyof CookieConsent): boolean {
    const consent = this.getConsent()
    if (!consent) return category === 'necessary' // Necessary is always allowed

    return consent[category] === true
  }

  /**
   * Check if any consent has been given
   */
  hasAnyConsent(): boolean {
    return this.getConsent() !== null
  }

  // ============================================================================
  // CONSENT APPLICATION
  // ============================================================================

  /**
   * Apply consent settings to actual cookies and services
   */
  private applyConsent(consent: CookieConsent): void {
    // Analytics consent
    if (consent.analytics) {
      this.enableAnalytics()
    } else {
      this.disableAnalytics()
    }

    // Marketing consent
    if (consent.marketing) {
      this.enableMarketing()
    } else {
      this.disableMarketing()
    }

    // Preferences consent
    if (consent.preferences) {
      this.enablePreferences()
    } else {
      this.disablePreferences()
    }
  }

  private enableAnalytics(): void {
    // Enable Google Analytics, etc.
    console.log('Analytics enabled')
    // TODO: Initialize analytics services
  }

  private disableAnalytics(): void {
    // Disable Google Analytics, etc.
    console.log('Analytics disabled')
    // TODO: Disable analytics services
  }

  private enableMarketing(): void {
    // Enable marketing tracking
    console.log('Marketing enabled')
    // TODO: Initialize marketing services
  }

  private disableMarketing(): void {
    // Disable marketing tracking
    console.log('Marketing disabled')
    // TODO: Disable marketing services
  }

  private enablePreferences(): void {
    // Enable preference storage
    console.log('Preferences enabled')
  }

  private disablePreferences(): void {
    // Disable preference storage
    console.log('Preferences disabled')
  }
}

// Export singleton instance
export const cookieService = CookieService.getInstance()
