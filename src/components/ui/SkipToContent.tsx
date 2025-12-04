import React from 'react'

/**
 * SkipToContent Component
 *
 * Accessibility-Feature für Keyboard-Navigation:
 * - Ermöglicht das Überspringen der Navigation
 * - Wird nur bei Keyboard-Focus sichtbar
 * - Springt direkt zum Haupt-Content
 *
 * WCAG 2.1 Level AA Compliance
 */
const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="skip-to-content focus-ring fixed left-4 top-4 z-[1035] -translate-y-20 rounded-lg bg-vae-turquoise px-6 py-3 font-semibold text-white shadow-2xl transition-transform focus:translate-y-0"
      tabIndex={0}
    >
      Zum Hauptinhalt springen
    </a>
  )
}

export default SkipToContent
