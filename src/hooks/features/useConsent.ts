/**
 * useConsent Hook
 *
 * React hook for managing cookie consent state and operations
 */

import { useState, useEffect, useCallback } from 'react'
import type { CookieConsent, ConsentManager } from '@/types/privacy'
import { DEFAULT_CONSENT, GDPR_CONSTANTS } from '@/types/privacy'
import { cookieService } from '@/services/cookieService'

export const useConsent = (): ConsentManager => {
  const [consent, setConsent] = useState<CookieConsent>(() => {
    return cookieService.getConsent() || DEFAULT_CONSENT
  })

  const [isConsentGiven, setIsConsentGiven] = useState<boolean>(() => {
    return cookieService.hasAnyConsent()
  })

  // ============================================================================
  // CONSENT ACTIONS
  // ============================================================================

  const updateConsent = useCallback(
    (category: keyof CookieConsent, enabled: boolean) => {
      const newConsent: CookieConsent = {
        ...consent,
        [category]: enabled,
        timestamp: new Date().toISOString(),
        version: GDPR_CONSTANTS.CONSENT_VERSION,
      }

      setConsent(newConsent)
      cookieService.saveConsent(newConsent)
      setIsConsentGiven(true)
    },
    [consent]
  )

  const acceptAll = useCallback(() => {
    const newConsent: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: new Date().toISOString(),
      version: GDPR_CONSTANTS.CONSENT_VERSION,
    }

    setConsent(newConsent)
    cookieService.saveConsent(newConsent)
    setIsConsentGiven(true)
  }, [])

  const rejectAll = useCallback(() => {
    const newConsent: CookieConsent = {
      necessary: true, // Necessary is always required
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: new Date().toISOString(),
      version: GDPR_CONSTANTS.CONSENT_VERSION,
    }

    setConsent(newConsent)
    cookieService.saveConsent(newConsent)
    setIsConsentGiven(true)
  }, [])

  const acceptNecessary = useCallback(() => {
    const newConsent: CookieConsent = {
      ...DEFAULT_CONSENT,
      timestamp: new Date().toISOString(),
      version: GDPR_CONSTANTS.CONSENT_VERSION,
    }

    setConsent(newConsent)
    cookieService.saveConsent(newConsent)
    setIsConsentGiven(true)
  }, [])

  const resetConsent = useCallback(() => {
    cookieService.clearConsent()
    setConsent(DEFAULT_CONSENT)
    setIsConsentGiven(false)
  }, [])

  // ============================================================================
  // CONSENT CHECKS
  // ============================================================================

  const hasConsent = useCallback((category: keyof CookieConsent): boolean => {
    return cookieService.hasConsent(category)
  }, [])

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Load consent on mount
  useEffect(() => {
    const storedConsent = cookieService.getConsent()
    if (storedConsent) {
      setConsent(storedConsent)
      setIsConsentGiven(true)
    }
  }, [])

  // Listen for storage changes (cross-tab consent updates)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === GDPR_CONSTANTS.STORAGE_KEY && e.newValue) {
        try {
          const settings = JSON.parse(e.newValue)
          setConsent(settings.consent)
          setIsConsentGiven(true)
        } catch (error) {
          console.warn('Error parsing consent from storage event:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return {
    consent,
    updateConsent,
    acceptAll,
    rejectAll,
    acceptNecessary,
    resetConsent,
    hasConsent,
    isConsentGiven,
  }
}
