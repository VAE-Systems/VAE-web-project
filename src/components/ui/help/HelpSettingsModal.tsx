import MagneticButton from '@/components/ui/buttons/MagneticButton'
import { Settings, X } from 'lucide-react'
import React from 'react'
import { useHelpModeContext } from './HelpModeContext'

interface HelpSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Small modal for help system settings
 * Allows users to skip help intro popup for the current session
 *
 * @example
 * ```tsx
 * const [showSettings, setShowSettings] = useState(false)
 *
 * <HelpSettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
 * ```
 */
export const HelpSettingsModal: React.FC<HelpSettingsModalProps> = ({ isOpen, onClose }) => {
  const { skipHelpForSession, setSkipHelpForSession } = useHelpModeContext()

  const handleSave = () => {
    // Settings are automatically saved in context state (in-memory only)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="animate-in fade-in fixed inset-0 z-[1050] flex items-center justify-center bg-black/40 backdrop-blur-sm duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-settings-title"
    >
      <div
        className="animate-in zoom-in-95 slide-in-from-bottom-4 mx-4 max-w-sm rounded-xl border border-text-light/20 bg-white p-6 shadow-xl duration-300 dark:border-white/10 dark:bg-bg-darker"
        onClick={e => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-vae-turquoise" />
            <h3 id="help-settings-title" className="text-lg font-semibold text-text-light dark:text-white">
              Hilfe-Einstellungen
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-text-secondary transition hover:text-text-light focus:outline-none focus:ring-2 focus:ring-vae-turquoise/50 dark:text-white/60 dark:hover:text-white"
            aria-label="Schließen"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          <label className="group flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={skipHelpForSession}
              onChange={e => setSkipHelpForSession(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded-md border-text-light/20 bg-white text-vae-turquoise focus:ring-2 focus:ring-vae-turquoise/50 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-vae-turquoise"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-text-light group-hover:text-text-light/90 dark:text-white dark:group-hover:text-gray-100">
                Intro nicht mehr anzeigen
              </p>
              <p className="text-xs text-text-secondary dark:text-gray-400">
                Überspringt die Einführung dieser Session. Help-Modus bleibt aktiv.
              </p>
            </div>
          </label>
        </div>

        <div className="mt-4">
          <MagneticButton intensity={0.075}>
            <button type="button" onClick={handleSave} className="btn-primary w-full">
              Speichern & Schließen
            </button>
          </MagneticButton>
        </div>
      </div>
    </div>
  )
}
