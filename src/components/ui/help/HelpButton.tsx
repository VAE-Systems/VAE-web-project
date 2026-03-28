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

  const baseClasses = `flex items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${
    helpMode
      ? 'border-white/90 bg-white text-vae-turquoise shadow-[0_12px_30px_rgba(15,23,42,0.18)] hover:border-white hover:bg-white/95 hover:shadow-[0_16px_38px_rgba(15,23,42,0.16)] dark:border-vae-turquoise/60 dark:bg-vae-turquoise/20 dark:text-vae-turquoise dark:shadow-[0_0_20px_rgba(5,248,200,0.3)] dark:hover:shadow-[0_0_28px_rgba(5,248,200,0.4)]'
      : 'border-gray-300 bg-white text-gray-700 hover:border-white/90 hover:bg-white hover:text-vae-turquoise hover:shadow-[0_0_0_3px_rgba(255,255,255,0.7),0_8px_18px_rgba(15,23,42,0.12)] dark:border-white/20 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:hover:shadow-[0_0_0_3px_rgba(255,255,255,0.2),0_8px_18px_rgba(0,0,0,0.35)]'
  }`

  const positionClasses =
    position === 'fixed' ? 'fixed bottom-8 right-8 h-14 w-14 z-[1020] shadow-2xl' : 'h-12 w-12 flex-shrink-0'

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
      className={`animate-in fade-in slide-in-from-top-2 rounded-none border border-white/70 bg-white/85 px-5 py-3 shadow-[0_12px_32px_rgba(15,23,42,0.12)] duration-300 dark:border-vae-turquoise/30 dark:bg-vae-turquoise/5 dark:shadow-none ${className}`}
    >
      <p className="text-sm text-vae-turquoise">
        <strong>Hilfe-Modus aktiv:</strong> Klicken Sie auf ein Feld, um eine Erklärung zu erhalten.
      </p>
    </div>
  )
}
