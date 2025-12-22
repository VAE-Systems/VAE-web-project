/**
 * Contact Service
 *
 * Handles all contact form submissions, validations, and API calls
 */

import type { ContactFormData, ContactSubmissionResponse } from '../types'

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

export const validateContactForm = (data: ContactFormData): string[] => {
  const errors: string[] = []

  // Required field validation
  if (!data.name?.trim()) {
    errors.push('Name ist erforderlich')
  }

  if (!data.email?.trim()) {
    errors.push('E-Mail ist erforderlich')
  } else if (!isValidEmail(data.email)) {
    errors.push('Ungültige E-Mail-Adresse')
  }

  if (!data.message?.trim()) {
    errors.push('Nachricht ist erforderlich')
  } else if (data.message.length < 10) {
    errors.push('Nachricht muss mindestens 10 Zeichen lang sein')
  }

  // Optional phone validation
  if (data.phone && !isValidPhone(data.phone)) {
    errors.push('Ungültige Telefonnummer')
  }

  return errors
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[\d\s\-()]{7,}$/
  return phoneRegex.test(phone)
}

// ============================================================================
// API FUNCTIONS
// ============================================================================

export const submitContactForm = async (data: ContactFormData): Promise<ContactSubmissionResponse> => {
  try {
    // Validate data first
    const validationErrors = validateContactForm(data)
    if (validationErrors.length > 0) {
      return {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validierungsfehler',
          details: validationErrors,
        },
        timestamp: new Date().toISOString(),
      }
    }

    // DISABLED: Contact form API is disabled - using mailto link instead
    // Users should use the mailto: link in the contact section
    // To re-enable: Uncomment below and provide real API endpoint

    // Fallback: Return success but inform user to use mailto
    return {
      success: true,
      data: {
        submissionId: generateSubmissionId(),
        confirmationSent: false,
        estimatedResponse: 'Bitte nutzen Sie den mailto-Link',
      },
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error('Contact form submission error:', error)

    return {
      success: false,
      error: {
        code: 'SUBMISSION_ERROR',
        message: 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      timestamp: new Date().toISOString(),
    }
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const generateSubmissionId = (): string => {
  return `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// ============================================================================
// MOCK FUNCTIONS (FOR DEVELOPMENT)
// ============================================================================

export const mockContactSubmission = async (): Promise<ContactSubmissionResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

  // Simulate occasional errors for testing
  if (Math.random() < 0.1) {
    return {
      success: false,
      error: {
        code: 'MOCK_ERROR',
        message: 'Simulierter Serverfehler für Testing',
      },
      timestamp: new Date().toISOString(),
    }
  }

  return {
    success: true,
    data: {
      submissionId: generateSubmissionId(),
      confirmationSent: true,
      estimatedResponse: '24-48 Stunden',
    },
    timestamp: new Date().toISOString(),
  }
}
