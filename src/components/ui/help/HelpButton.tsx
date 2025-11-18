import { HelpCircle } from 'lucide-react'
import React from 'react'
import { useHelpModeContext } from './HelpModeContext'

interface HelpButtonProps {
  /** Optional custom className for styling */
  className?: string
  /** Position of the button (default: inline) */
  position?: 'inline' | 'fixed'
  /** Custom label text (default: "Hilfe") */
  label?: string
}

/**
 * Reusable help mode toggle button
 * Displays a question mark icon that activates help mode when clicked
 *
 * @example
 * ```tsx
 * // Inline button (default)
 * <HelpButton />
 *
 * // Fixed floating button
 * <HelpButton position="fixed" />
 *
 * // Custom styling
 * <HelpButton className="my-custom-class" />
 * ```
 */
export const HelpButton: React.FC<HelpButtonProps> = ({ className = '', position = 'inline', label }) => {
  const { helpMode, toggleHelpMode } = useHelpModeContext()

  const baseClasses = `flex items-center justify-center rounded-full border transition-all duration-300 ${
    helpMode
      ? 'border-vae-turquoise/60 bg-vae-turquoise/20 text-vae-turquoise shadow-[0_0_20px_rgba(5,248,200,0.3)]'
      : 'border-gray-300 bg-gray-100 text-gray-600 hover:border-vae-turquoise/40 hover:bg-vae-turquoise/10 hover:text-vae-turquoise dark:border-white/20 dark:bg-white/5 dark:text-white/60'
  }`

  const positionClasses =
    position === 'fixed' ? 'fixed bottom-8 right-8 h-14 w-14 z-40 shadow-2xl' : 'h-12 w-12 flex-shrink-0'

  return (
    <button
      type="button"
      onClick={toggleHelpMode}
      className={`${baseClasses} ${positionClasses} ${className}`}
      title={helpMode ? 'Hilfe-Modus deaktivieren' : 'Hilfe-Modus aktivieren'}
      aria-label={helpMode ? 'Hilfe-Modus deaktivieren' : 'Hilfe-Modus aktivieren'}
      aria-pressed={helpMode}
    >
      <HelpCircle className="h-5 w-5" />
      {label && <span className="ml-2 text-sm font-medium">{label}</span>}
    </button>
  )
}

/**
 * Help mode indicator banner
 * Shows a message when help mode is active
 *
 * @example
 * ```tsx
 * <HelpModeIndicator />
 * ```
 */
export const HelpModeIndicator: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { helpMode } = useHelpModeContext()

  if (!helpMode) return null

  return (
    <div
      className={`animate-in fade-in slide-in-from-top-2 rounded-2xl border border-vae-turquoise/30 bg-vae-turquoise/5 px-5 py-3 duration-300 ${className}`}
    >
      <p className="text-sm text-vae-turquoise">
        <strong>Hilfe-Modus aktiv:</strong> Klicken Sie auf ein Feld, um eine Erklärung zu erhalten.
      </p>
    </div>
  )
}
