import MagneticButton from '@/components/ui/buttons/MagneticButton'
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
      className="animate-in fade-in fixed inset-0 z-[1050] flex items-center justify-center bg-black/60 backdrop-blur-sm duration-200"
      onClick={closeIntroPopup}
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-intro-title"
    >
      <div
        className="animate-in zoom-in-95 slide-in-from-bottom-4 mx-4 max-w-lg rounded-[32px] border border-white/20 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker p-8 shadow-[0_30px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl duration-300"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vae-turquoise/20">
                <HelpCircle className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h3 id="help-intro-title" className="text-2xl font-semibold text-white">
                Hilfe-Modus aktiviert
              </h3>
            </div>
            <div className="mt-6 space-y-3">
              <p className="text-lg font-semibold leading-relaxed text-white">So funktioniert&apos;s:</p>
              <ul className="ml-6 space-y-2 text-base leading-relaxed text-white/80">
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
                    <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-xs font-semibold text-white/90">ESC</kbd>{' '}
                    oder klicken Sie auf das Fragezeichen-Icon, um den Modus zu beenden
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <button
            type="button"
            onClick={closeIntroPopup}
            className="flex-shrink-0 text-white/60 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-vae-turquoise/50"
            aria-label="Schließen"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <MagneticButton intensity={0.075}>
            <button type="button" onClick={closeIntroPopup} className="btn-primary w-full">
              Verstanden, los geht&apos;s!
            </button>
          </MagneticButton>

          <MagneticButton intensity={0.075}>
            <button
              type="button"
              onClick={() => {
                setSkipHelpForSession(true)
                closeIntroPopup()
              }}
              className="btn-ghost w-full"
            >
              Nicht mehr anzeigen bis zum nächsten Besuch
            </button>
          </MagneticButton>
        </div>
      </div>
    </div>
  )
}
