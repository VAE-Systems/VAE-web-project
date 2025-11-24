/**
 * Contact Form Hook
 *
 * Custom React hook for managing contact form state, validation, and submission
 */

import { useState, useCallback } from 'react'
import type { ContactFormData, FormState, LoadingState } from '@/types'
import { submitContactForm, validateContactForm, mockContactSubmission } from '@/services/contactService'

// ============================================================================
// HOOK INTERFACE
// ============================================================================

interface UseContactFormReturn {
  formData: ContactFormData
  formState: FormState<ContactFormData>
  loadingState: LoadingState

  // Actions
  updateField: (field: keyof ContactFormData, value: string) => void
  resetForm: () => void
  submitForm: () => Promise<void>

  // Computed values
  canSubmit: boolean
  hasErrors: boolean
  isSubmitting: boolean
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  subject: '',
  source: 'website',
}

const initialFormState: FormState<ContactFormData> = {
  data: initialFormData,
  errors: [],
  isSubmitting: false,
  isValid: false,
  isDirty: false,
}

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

export const useContactForm = (
  options: {
    onSuccess?: (submissionId: string) => void
    onError?: (error: string) => void
    useMockApi?: boolean
  } = {}
): UseContactFormReturn => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [formState, setFormState] = useState<FormState<ContactFormData>>(initialFormState)
  const [loadingState, setLoadingState] = useState<LoadingState>('idle')

  // ============================================================================
  // VALIDATION
  // ============================================================================

  const validateForm = useCallback((data: ContactFormData) => {
    const validationErrors = validateContactForm(data)
    const errors = validationErrors.map(message => ({
      field: 'general', // We could make this more specific
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
    (field: keyof ContactFormData, value: string) => {
      const newFormData = { ...formData, [field]: value }
      setFormData(newFormData)

      // Mark form as dirty when user types
      if (!formState.isDirty) {
        setFormState(prev => ({ ...prev, isDirty: true }))
      }

      // Only validate if user has already tried to submit (better UX)
      if (formState.isDirty && formState.errors.length > 0) {
        validateForm(newFormData)
      }
    },
    [formData, validateForm, formState.isDirty, formState.errors.length]
  )

  const resetForm = useCallback(() => {
    setFormData(initialFormData)
    setFormState(initialFormState)
    setLoadingState('idle')
  }, [])

  const submitForm = useCallback(async () => {
    try {
      setLoadingState('loading')
      setFormState(prev => ({ ...prev, isSubmitting: true }))

      // Final validation
      if (!validateForm(formData)) {
        setLoadingState('error')
        setFormState(prev => ({ ...prev, isSubmitting: false }))
        return
      }

      // Submit form
      const submitFunction = options.useMockApi ? mockContactSubmission : submitContactForm
      const response = await submitFunction(formData)

      if (response.success && response.data) {
        setLoadingState('success')
        options.onSuccess?.(response.data.submissionId)

        // Reset form on successful submission
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
              field: 'general',
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
            field: 'general',
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

  const isFormComplete = !!(formData.name.trim() && formData.email.trim() && formData.message.trim())
  const canSubmit = isFormComplete && !formState.isSubmitting && formState.isDirty
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
    submitForm,

    canSubmit,
    hasErrors,
    isSubmitting,
  }
}
