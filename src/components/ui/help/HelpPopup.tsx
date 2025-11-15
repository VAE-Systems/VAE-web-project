import { HelpCircle, X } from 'lucide-react'
import React, { useEffect } from 'react'
import { useHelpModeContext } from './HelpModeContext'

interface HelpPopupProps {
  /** Optional custom className for the popup container */
  className?: string
  /** Whether to show the "Verstanden" button (default: true) */
  showConfirmButton?: boolean
}

/**
 * Centered modal popup for displaying help text
 * Automatically manages its visibility based on activeHelp state
 *
 * @example
 * ```tsx
 * // Basic usage (place once in your page/layout)
 * <HelpPopup />
 *
 * // Without confirm button
 * <HelpPopup showConfirmButton={false} />
 * ```
 */
export const HelpPopup: React.FC<HelpPopupProps> = ({ className = '', showConfirmButton = true }) => {
  const { activeHelp, helpTexts, closeHelp } = useHelpModeContext()

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeHelp) {
        closeHelp()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [activeHelp, closeHelp])

  if (!activeHelp || !helpTexts[activeHelp]) return null

  const helpText = helpTexts[activeHelp]

  return (
    <div
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm duration-200"
      onClick={closeHelp}
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-popup-title"
      aria-describedby="help-popup-description"
    >
      <div
        className={`animate-in zoom-in-95 slide-in-from-bottom-4 mx-4 max-w-lg rounded-3xl border border-vae-turquoise/40 bg-white p-8 shadow-2xl duration-300 dark:bg-bg-darker ${className}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-vae-turquoise/20">
                <HelpCircle className="h-5 w-5 text-vae-turquoise" />
              </div>
              <h3 id="help-popup-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                {helpText.title}
              </h3>
            </div>
            <p id="help-popup-description" className="mt-4 text-base leading-relaxed text-gray-700 dark:text-white/80">
              {helpText.description}
            </p>
          </div>
          <button
            type="button"
            onClick={closeHelp}
            className="flex-shrink-0 text-gray-400 transition hover:text-gray-600 dark:text-white/60 dark:hover:text-white"
            aria-label="Schließen"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {showConfirmButton && (
          <button
            type="button"
            onClick={closeHelp}
            className="mt-6 w-full rounded-2xl border border-vae-turquoise/40 bg-vae-turquoise/10 px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-vae-turquoise/20 focus:outline-none focus:ring-2 focus:ring-vae-turquoise/50 dark:text-white"
          >
            Verstanden
          </button>
        )}
      </div>
    </div>
  )
}
