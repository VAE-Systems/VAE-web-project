import MagneticButton from '@/components/ui/buttons/MagneticButton'
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
      className="animate-in fade-in fixed inset-0 z-[1050] flex items-center justify-center bg-black/60 backdrop-blur-sm duration-200"
      onClick={closeHelp}
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-popup-title"
      aria-describedby="help-popup-description"
    >
      <div
        className={`animate-in zoom-in-95 slide-in-from-bottom-4 mx-4 max-w-lg rounded-[32px] border border-white/80 bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.18)] duration-300 dark:border-white/20 dark:bg-gradient-to-br dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)] dark:backdrop-blur-xl ${className}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-vae-turquoise/20">
                <HelpCircle className="h-5 w-5 text-vae-turquoise" />
              </div>
              <h3 id="help-popup-title" className="text-xl font-semibold text-[#0f1c17] dark:text-white">
                {helpText.title}
              </h3>
            </div>
            <p id="help-popup-description" className="mt-4 text-lg leading-relaxed text-[#2c3a33] dark:text-white/80">
              {helpText.description}
            </p>
          </div>
          <button
            type="button"
            onClick={closeHelp}
            className="flex-shrink-0 text-slate-500 transition hover:text-slate-900 dark:text-white/60 dark:hover:text-white"
            aria-label="Schließen"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {showConfirmButton && (
          <div className="mt-6">
            <MagneticButton intensity={0.075}>
              <button type="button" onClick={closeHelp} className="btn-primary w-full">
                Verstanden
              </button>
            </MagneticButton>
          </div>
        )}
      </div>
    </div>
  )
}
