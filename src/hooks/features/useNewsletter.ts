/**
 * Newsletter Hook
 *
 * Custom React hook for managing newsletter subscription state and submission
 */

import { useState, useCallback } from 'react'
import type { NewsletterSubscription, FormState, LoadingState } from '@/types'
import {
  subscribeToNewsletter,
  validateNewsletterSubscription,
  mockNewsletterSubscription,
} from '@/services/newsletterService'

// ============================================================================
// HOOK INTERFACE
// ============================================================================

interface UseNewsletterReturn {
  formData: NewsletterSubscription
  formState: FormState<NewsletterSubscription>
  loadingState: LoadingState

  // Actions
  updateField: (field: keyof NewsletterSubscription, value: string | boolean) => void
  resetForm: () => void
  subscribe: () => Promise<void>

  // Computed values
  canSubmit: boolean
  hasErrors: boolean
  isSubmitting: boolean
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialFormData: NewsletterSubscription = {
  email: '',
  name: '',
  preferences: {
    tech: true,
    business: true,
    updates: true,
  },
  source: 'website',
}

const initialFormState: FormState<NewsletterSubscription> = {
  data: initialFormData,
  errors: [],
  isSubmitting: false,
  isValid: false,
  isDirty: false,
}

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

export const useNewsletter = (
  options: {
    onSuccess?: (subscriptionId: string) => void
    onError?: (error: string) => void
    useMockApi?: boolean
  } = {}
): UseNewsletterReturn => {
  const [formData, setFormData] = useState<NewsletterSubscription>(initialFormData)
  const [formState, setFormState] = useState<FormState<NewsletterSubscription>>(initialFormState)
  const [loadingState, setLoadingState] = useState<LoadingState>('idle')

  // ============================================================================
  // VALIDATION
  // ============================================================================

  const validateForm = useCallback((data: NewsletterSubscription) => {
    const validationErrors = validateNewsletterSubscription(data)
    const errors = validationErrors.map(message => ({
      field: 'email',
      message,
      code: 'VALIDATION_ERROR',
    }))

    setFormState(prev => ({
      ...prev,
      errors,
      isValid: errors.length === 0,
      isDirty: true,
    }))

    return errors.length === 0
  }, [])

  // ============================================================================
  // ACTIONS
  // ============================================================================

  const updateField = useCallback(
    (field: keyof NewsletterSubscription, value: string | boolean) => {
      const newFormData = { ...formData }

      if (field === 'preferences' && typeof value === 'boolean') {
        return
      } else if (typeof value === 'string') {
        ;(newFormData as any)[field] = value
      }

      setFormData(newFormData)

      if (!formState.isDirty) {
        setFormState(prev => ({ ...prev, isDirty: true }))
      }
    },
    [formData, formState.isDirty]
  )

  const resetForm = useCallback(() => {
    setFormData(initialFormData)
    setFormState(initialFormState)
    setLoadingState('idle')
  }, [])

  const subscribe = useCallback(async () => {
    try {
      setLoadingState('loading')
      setFormState(prev => ({ ...prev, isSubmitting: true }))

      if (!validateForm(formData)) {
        setLoadingState('error')
        setFormState(prev => ({ ...prev, isSubmitting: false }))
        return
      }

      const submitFunction = options.useMockApi ? mockNewsletterSubscription : subscribeToNewsletter
      const response = await submitFunction(formData)

      if (response.success && response.data) {
        setLoadingState('success')
        options.onSuccess?.(response.data.subscriptionId)

        setTimeout(() => {
          resetForm()
        }, 2000)
      } else {
        setLoadingState('error')
        const errorMessage = response.error?.message || 'Unbekannter Fehler'
        options.onError?.(errorMessage)

        setFormState(prev => ({
          ...prev,
          errors: [
            {
              field: 'email',
              message: errorMessage,
              code: response.error?.code || 'UNKNOWN_ERROR',
            },
          ],
        }))
      }
    } catch (error) {
      setLoadingState('error')
      const errorMessage = error instanceof Error ? error.message : 'Netzwerkfehler'
      options.onError?.(errorMessage)

      setFormState(prev => ({
        ...prev,
        errors: [
          {
            field: 'email',
            message: errorMessage,
            code: 'NETWORK_ERROR',
          },
        ],
      }))
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }))
    }
  }, [formData, validateForm, options, resetForm])

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  const isEmailValid = !!(formData.email.trim() && formData.email.includes('@'))
  const canSubmit = isEmailValid && !formState.isSubmitting && formState.isDirty
  const hasErrors = formState.errors.length > 0
  const isSubmitting = formState.isSubmitting

  // ============================================================================
  // RETURN
  // ============================================================================

  return {
    formData,
    formState: { ...formState, data: formData },
    loadingState,

    updateField,
    resetForm,
    subscribe,

    canSubmit,
    hasErrors,
    isSubmitting,
  }
}
