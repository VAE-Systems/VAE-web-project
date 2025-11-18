/**
 * Contact Form Component
 *
 * Modern, accessible contact form with validation and loading states
 */

import { cn } from '@/lib/classNames'
import React from 'react'
import { useContactForm } from '../../hooks/useContactForm'
import type { FormComponentProps } from '../../types'

// ============================================================================
// COMPONENT PROPS
// ============================================================================

interface ContactFormProps extends Omit<FormComponentProps, 'onSubmit'> {
  onSuccess?: (submissionId: string) => void
  onError?: (error: string) => void
  useMockApi?: boolean
  compact?: boolean
}

// ============================================================================
// COMPONENT
// ============================================================================

const ContactForm: React.FC<ContactFormProps> = ({
  className = '',
  onSuccess,
  onError,
  useMockApi = true, // Use mock API during development
  compact = false,
  disabled = false,
  showLabels = true,
}) => {
  const { formData, formState, loadingState, updateField, submitForm, canSubmit, hasErrors, isSubmitting } =
    useContactForm({
      onSuccess,
      onError,
      useMockApi,
    })

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (canSubmit && !disabled) {
      await submitForm()
    }
  }

  const handleInputChange =
    (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateField(field, e.target.value)
    }

  // ============================================================================
  // STYLES
  // ============================================================================

  const baseInputClasses = `
    w-full px-4 py-3 bg-bg-secondary border border-bg-tertiary rounded-lg
    text-text-light placeholder-text-muted
    focus:outline-none focus:ring-2 focus:ring-vae-turquoise/50 focus:border-vae-turquoise
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  const errorInputClasses = hasErrors ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : ''

  // ============================================================================
  // SUCCESS STATE
  // ============================================================================

  if (loadingState === 'success') {
    return (
      <div className={cn(className)}>
        <p className="mb-4 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
        <div className="rounded-lg border border-vae-turquoise/30 bg-vae-turquoise/10 p-8 text-center">
          <div className="mb-4 text-2xl text-vae-turquoise">✓</div>
          <h3 className="mb-2 text-lg font-medium text-text-light">Nachricht erfolgreich gesendet!</h3>
          <p className="text-text-muted">
            Vielen Dank für Ihre Anfrage. Wir melden uns innerhalb von 24-48 Stunden bei Ihnen.
          </p>
        </div>
      </div>
    )
  }

  // ============================================================================
  // FORM RENDER
  // ============================================================================

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      {/* Name & Email Row */}
      <div className={compact ? 'grid grid-cols-1 gap-4 md:grid-cols-2' : 'space-y-4'}>
        {/* Name Field */}
        <div>
          {showLabels && (
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-light">
              Name *
            </label>
          )}
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange('name')}
            placeholder="Ihr vollständiger Name"
            disabled={disabled || isSubmitting}
            className={cn(baseInputClasses, formState.errors.name && errorInputClasses)}
            required
          />
        </div>

        {/* Email Field */}
        <div>
          {showLabels && (
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-light">
              E-Mail *
            </label>
          )}
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            placeholder="ihre.email@beispiel.de"
            disabled={disabled || isSubmitting}
            className={cn(baseInputClasses, formState.errors.email && errorInputClasses)}
            required
          />
        </div>
      </div>

      {/* Company & Phone Row (Optional) */}
      {!compact && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Company Field */}
          <div>
            {showLabels && (
              <label htmlFor="company" className="mb-2 block text-sm font-medium text-text-light">
                Unternehmen
              </label>
            )}
            <input
              id="company"
              type="text"
              value={formData.company || ''}
              onChange={handleInputChange('company')}
              placeholder="Ihr Unternehmen (optional)"
              disabled={disabled || isSubmitting}
              className={baseInputClasses}
            />
          </div>

          {/* Phone Field */}
          <div>
            {showLabels && (
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-text-light">
                Telefon
              </label>
            )}
            <input
              id="phone"
              type="tel"
              value={formData.phone || ''}
              onChange={handleInputChange('phone')}
              placeholder="+49 123 456789 (optional)"
              disabled={disabled || isSubmitting}
              className={baseInputClasses}
            />
          </div>
        </div>
      )}

      {/* Subject Field */}
      {!compact && (
        <div>
          {showLabels && (
            <label htmlFor="subject" className="mb-2 block text-sm font-medium text-text-light">
              Betreff
            </label>
          )}
          <input
            id="subject"
            type="text"
            value={formData.subject || ''}
            onChange={handleInputChange('subject')}
            placeholder="Worum geht es in Ihrer Anfrage?"
            disabled={disabled || isSubmitting}
            className={baseInputClasses}
          />
        </div>
      )}

      {/* Message Field */}
      <div>
        {showLabels && (
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-text-light">
            Nachricht *
          </label>
        )}
        <textarea
          id="message"
          value={formData.message}
          onChange={handleInputChange('message')}
          placeholder="Beschreiben Sie Ihr Anliegen..."
          disabled={disabled || isSubmitting}
          rows={compact ? 4 : 6}
          className={`${baseInputClasses} ${errorInputClasses} resize-none`}
          required
        />
      </div>

      {/* Error Display */}
      {hasErrors && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
          <div className="text-sm text-red-400">
            {formState.errors.map((error, index) => (
              <div key={index}>{error.message}</div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!canSubmit || disabled}
        className={`
          w-full rounded-lg px-6 py-3 font-medium transition-all duration-200
          ${
            canSubmit && !disabled
              ? 'bg-vae-turquoise text-bg-darker hover:bg-vae-turquoise-dark active:scale-95'
              : 'bg-bg-tertiary cursor-not-allowed text-text-muted'
          }
          ${isSubmitting ? 'animate-pulse' : ''}
        `}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-bg-darker border-t-transparent"></div>
            <span>Wird gesendet...</span>
          </span>
        ) : (
          'Nachricht senden'
        )}
      </button>

      {/* Privacy Notice */}
      <p className="text-center text-xs text-text-muted">
        Durch das Absenden stimmen Sie unserer{' '}
        <a href="/privacy" className="text-vae-turquoise hover:underline">
          Datenschutzerklärung
        </a>{' '}
        zu.
      </p>
    </form>
  )
}

export default ContactForm
