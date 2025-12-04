import { AlertCircle, X } from 'lucide-react'
import React, { useEffect } from 'react'

interface ValidationPopupProps {
  /** Error message to display */
  message: string
  /** Whether the popup is visible */
  isOpen: boolean
  /** Callback to close the popup */
  onClose: () => void
  /** Optional title (default: "Pflichtfelder fehlen") */
  title?: string
  /** Optional custom className */
  className?: string
  /** Auto-close duration in ms (default: 5000, set to 0 to disable) */
  autoCloseDuration?: number
}

/**
 * Reusable centered validation error popup
 * Displays validation errors in a prominent, accessible modal
 *
 * @example
 * ```tsx
 * const [error, setError] = useState('')
 *
 * <ValidationPopup
 *   message={error}
 *   isOpen={!!error}
 *   onClose={() => setError('')}
 * />
 * ```
 */
export const ValidationPopup: React.FC<ValidationPopupProps> = ({
  message,
  isOpen,
  onClose,
  title = 'Pflichtfelder fehlen',
  autoCloseDuration = 5000,
}) => {
  // Auto-close after duration
  useEffect(() => {
    if (isOpen && autoCloseDuration > 0) {
      const timer = setTimeout(onClose, autoCloseDuration)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose, autoCloseDuration])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="animate-in fade-in fixed inset-0 z-[1050] flex items-center justify-center bg-black/60 backdrop-blur-sm duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="validation-popup-title"
      aria-describedby="validation-popup-description"
    >
      <div
        className="animate-in zoom-in-95 slide-in-from-bottom-4 mx-4 max-w-md rounded-3xl border border-red-300 bg-white p-6 shadow-2xl duration-300 dark:border-red-500/30 dark:bg-bg-darker"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1">
            <h3 id="validation-popup-title" className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p
              id="validation-popup-description"
              className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-white/80"
            >
              {message}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 transition hover:text-gray-600 dark:text-white/60 dark:hover:text-white"
            aria-label="Schließen"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Simple inline validation error display
 * For less critical errors that don't need a modal
 *
 * @example
 * ```tsx
 * {error && <ValidationBanner message={error} onClose={() => setError('')} />}
 * ```
 */
export const ValidationBanner: React.FC<{
  message: string
  onClose?: () => void
  className?: string
}> = ({ message, onClose, className = '' }) => {
  return (
    <div
      className={`animate-in fade-in slide-in-from-top-2 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 duration-300 ${className}`}
      role="alert"
    >
      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
      <p className="flex-1 text-sm text-red-200">{message}</p>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="flex-shrink-0 text-red-300/60 transition hover:text-red-200"
          aria-label="Schließen"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
