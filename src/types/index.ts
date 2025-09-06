/**
 * Global Type Definitions for VAE Systems Website
 * 
 * Central location for all TypeScript interfaces and types
 */

// ============================================================================
// CONTACT & COMMUNICATION TYPES
// ============================================================================

export interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
  subject?: string
  source?: 'website' | 'newsletter' | 'referral'
}

export interface NewsletterSubscription {
  email: string
  name?: string
  preferences?: {
    tech: boolean
    business: boolean
    updates: boolean
  }
  source?: string
}


// ============================================================================
// SERVICE TYPES
// ============================================================================

export interface ServiceStat {
  value: string
  desc: string
  note?: string
}

export interface ServiceData {
  key: string
  title: string
  description: string
  iconName: string
  badge: string
  stats: ServiceStat[]
  features: string[]
  cta: string
}

export interface LifecycleBlock {
  title: string
  description: string
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  timestamp: string
}

export interface ContactSubmissionResponse extends ApiResponse {
  data?: {
    submissionId: string
    confirmationSent: boolean
    estimatedResponse: string
  }
}

export interface NewsletterResponse extends ApiResponse {
  data?: {
    subscriptionId: string
    confirmationRequired: boolean
  }
}

// ============================================================================
// SERVICE & CONFIGURATION TYPES
// ============================================================================

export interface EmailConfig {
  provider: 'resend' | 'sendgrid' | 'nodemailer'
  from: string
  replyTo?: string
  templates: {
    contactConfirmation: string
    contactNotification: string
    newsletterWelcome: string
  }
}

export interface NotificationConfig {
  slack?: {
    webhook: string
    channel: string
  }
  email?: {
    to: string[]
    cc?: string[]
  }
  nextcloud?: {
    url: string
    user: string
    token: string
  }
}

// ============================================================================
// FORM VALIDATION TYPES
// ============================================================================

export interface ValidationError {
  field: string
  message: string
  code: string
}

export interface FormState<T> {
  data: T
  errors: ValidationError[]
  isSubmitting: boolean
  isValid: boolean
  isDirty: boolean
}

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface FormComponentProps<T = any> extends BaseComponentProps {
  onSubmit: (data: T) => Promise<void>
  initialData?: Partial<T>
  disabled?: boolean
  showLabels?: boolean
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export type Theme = 'light' | 'dark' | 'auto'

export type BreakPoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'
