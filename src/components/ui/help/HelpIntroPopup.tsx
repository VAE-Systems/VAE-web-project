import { HelpCircle, X } from 'lucide-react'
import React, { useEffect } from 'react'
import { useHelpModeContext } from './HelpModeContext'

/**
 * Intro popup that appears when help mode is activated
 * Explains how to use the help system
 */
export const HelpIntroPopup: React.FC = () => {
  const { showIntroPopup, closeIntroPopup, helpMode, setSkipHelpForSession } = useHelpModeContext()

  // Close intro popup when help mode is deactivated
  useEffect(() => {
    if (!helpMode && showIntroPopup) {
      closeIntroPopup()
    }
  }, [helpMode, showIntroPopup, closeIntroPopup])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showIntroPopup) {
        closeIntroPopup()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [showIntroPopup, closeIntroPopup])

  if (!showIntroPopup) return null

  return (
    <div
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm duration-200"
      onClick={closeIntroPopup}
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-intro-title"
    >
      <div
        className="animate-in zoom-in-95 slide-in-from-bottom-4 mx-4 max-w-lg rounded-3xl border border-vae-turquoise/40 bg-white p-8 shadow-2xl duration-300 dark:bg-bg-darker"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vae-turquoise/20">
                <HelpCircle className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h3 id="help-intro-title" className="text-2xl font-semibold text-gray-900 dark:text-white">
                Hilfe-Modus aktiviert
              </h3>
            </div>
            <div className="mt-6 space-y-3">
              <p className="text-base leading-relaxed text-gray-700 dark:text-white/80">
                💡 <strong>So funktioniert's:</strong>
              </p>
              <ul className="ml-6 space-y-2 text-sm leading-relaxed text-gray-600 dark:text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-vae-turquoise" />
                  <span>Klicken Sie auf ein beliebiges Feld oder Element</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-vae-turquoise" />
                  <span>Eine detaillierte Erklärung wird angezeigt</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-vae-turquoise" />
                  <span>
                    Drücken Sie{' '}
                    <kbd className="rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold dark:bg-gray-700">ESC</kbd>{' '}
                    oder klicken Sie auf das Fragezeichen-Icon, um den Modus zu beenden
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <button
            type="button"
            onClick={closeIntroPopup}
            className="flex-shrink-0 text-gray-400 transition hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-vae-turquoise/50 dark:text-white/60 dark:hover:text-white"
            aria-label="Schließen"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={closeIntroPopup}
            className="w-full rounded-2xl border border-vae-turquoise/40 bg-vae-turquoise/10 px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-vae-turquoise/20 focus:outline-none focus:ring-2 focus:ring-vae-turquoise/50 dark:text-white"
          >
            Verstanden, los geht's!
          </button>

          <button
            type="button"
            onClick={() => {
              setSkipHelpForSession(true)
              closeIntroPopup()
            }}
            className="w-full rounded-2xl border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-700"
          >
            Nicht mehr anzeigen bis zum nächsten Besuch
          </button>
        </div>
      </div>
    </div>
  )
}
