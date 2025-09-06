/**
 * Newsletter Service
 * 
 * Handles newsletter subscriptions, validations, and email management
 */

import type { NewsletterSubscription, NewsletterResponse } from '../types'
import { NETWORK_DELAY } from '../config'

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

export const validateNewsletterSubscription = (data: NewsletterSubscription): string[] => {
  const errors: string[] = []

  if (!data.email?.trim()) {
    errors.push('E-Mail ist erforderlich')
  } else if (!isValidEmail(data.email)) {
    errors.push('Ungültige E-Mail-Adresse')
  }

  // Optional name validation
  if (data.name && data.name.trim().length < 2) {
    errors.push('Name muss mindestens 2 Zeichen lang sein')
  }

  return errors
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// ============================================================================
// API FUNCTIONS
// ============================================================================

export const subscribeToNewsletter = async (data: NewsletterSubscription): Promise<NewsletterResponse> => {
  try {
    // Validate data first
    const validationErrors = validateNewsletterSubscription(data)
    if (validationErrors.length > 0) {
      return {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validierungsfehler',
          details: validationErrors
        },
        timestamp: new Date().toISOString()
      }
    }

    // TODO: Replace with actual API endpoint when backend is ready
    // For now, simulate API call
    const response = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: data.source || 'website'
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const result = await response.json()
    
    return {
      success: true,
      data: {
        subscriptionId: result.id || generateSubscriptionId(),
        confirmationRequired: true
      },
      timestamp: new Date().toISOString()
    }

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    
    return {
      success: false,
      error: {
        code: 'SUBSCRIPTION_ERROR',
        message: 'Fehler bei der Newsletter-Anmeldung. Bitte versuchen Sie es später erneut.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      timestamp: new Date().toISOString()
    }
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const generateSubscriptionId = (): string => {
  return `newsletter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// ============================================================================
// MOCK FUNCTIONS (FOR DEVELOPMENT)
// ============================================================================

export const mockNewsletterSubscription = async (): Promise<NewsletterResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, NETWORK_DELAY.NEWSLETTER_FORM.MIN + Math.random() * (NETWORK_DELAY.NEWSLETTER_FORM.MAX - NETWORK_DELAY.NEWSLETTER_FORM.MIN)))
  
  // Simulate occasional errors for testing
  if (Math.random() < 0.05) {
    return {
      success: false,
      error: {
        code: 'MOCK_ERROR',
        message: 'Simulierter Serverfehler für Testing'
      },
      timestamp: new Date().toISOString()
    }
  }

  return {
    success: true,
    data: {
      subscriptionId: generateSubscriptionId(),
      confirmationRequired: true
    },
    timestamp: new Date().toISOString()
  }
}
