/**
 * Design System Demo Page
 * Zeigt alle verfügbaren Größen und wie sie zusammenarbeiten
 */

import React from 'react'
import DesignSystemControls from '../components/ui/DesignSystemControls'

const DesignSystemDemo: React.FC = () => {
  return (
    <div className="bg-dark min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-bold text-vae-turquoise">🎨 Design System Demo</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Typografie Demo */}
          <div className="bg-secondary rounded-lg p-6">
            <h2 className="mb-4 text-2xl font-semibold text-vae-turquoise">Typografie-Skala</h2>
            <div className="space-y-4">
              <p className="ds-text-xs">Extra Small (xs) - clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem)</p>
              <p className="ds-text-sm">Small (sm) - clamp(0.875rem, 0.8rem + 0.25vw, 1rem)</p>
              <p className="ds-text-base">Base (base) - clamp(1rem, 0.9rem + 0.3vw, 1.125rem)</p>
              <p className="ds-text-lg">Large (lg) - clamp(1.125rem, 1rem + 0.4vw, 1.25rem)</p>
              <p className="ds-text-xl">Extra Large (xl) - clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)</p>
              <p className="ds-text-2xl">2XL - clamp(1.5rem, 1.3rem + 0.7vw, 2rem)</p>
              <p className="ds-text-3xl">3XL - clamp(2rem, 1.7rem + 1vw, 2.5rem)</p>
              <p className="ds-text-4xl">4XL - clamp(2.5rem, 2rem + 1.3vw, 3rem)</p>
              <p className="ds-text-5xl">5XL - clamp(3rem, 2.5rem + 1.8vw, 4rem)</p>
              <p className="ds-text-6xl">6XL - clamp(4rem, 3rem + 2.5vw, 5rem)</p>
            </div>
          </div>

          {/* Spacing Demo */}
          <div className="bg-secondary rounded-lg p-6">
            <h2 className="mb-4 text-2xl font-semibold text-vae-turquoise">Spacing-Skala</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-vae-turquoise"></div>
                <span className="text-sm">xs: 0.25rem</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-vae-turquoise"></div>
                <span className="text-sm">sm: 0.5rem</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-vae-turquoise"></div>
                <span className="text-sm">base: 1rem</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded bg-vae-turquoise"></div>
                <span className="text-sm">lg: 1.5rem</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-16 w-16 rounded bg-vae-turquoise"></div>
                <span className="text-sm">xl: 2rem</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-20 w-20 rounded bg-vae-turquoise"></div>
                <span className="text-sm">2xl: 3rem</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-24 w-24 rounded bg-vae-turquoise"></div>
                <span className="text-sm">3xl: 4rem</span>
              </div>
            </div>
          </div>

          {/* Responsive Demo */}
          <div className="bg-secondary rounded-lg p-6">
            <h2 className="mb-4 text-2xl font-semibold text-vae-turquoise">Responsive Verhalten</h2>
            <div className="space-y-4">
              <div className="bg-dark rounded p-4">
                <p className="ds-text-base mb-2">Mobile-first Design:</p>
                <p className="text-xs md:text-sm lg:text-base">Dieser Text skaliert automatisch mit dem Viewport</p>
              </div>
              <div className="bg-dark rounded p-4">
                <p className="ds-text-base mb-2">Proportionale Skalierung:</p>
                <p className="text-sm">Alle Elemente skalieren zusammen - kein Design-Break!</p>
              </div>
              <div className="bg-dark rounded p-4">
                <p className="ds-text-base mb-2">Clamp-Funktionen:</p>
                <p className="text-xs">
                  min → fluid → max
                  <br />
                  Perfekt für alle Bildschirmgrößen
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-secondary mt-12 rounded-lg p-6">
          <h2 className="mb-4 text-2xl font-semibold text-vae-turquoise">🚀 Wie es funktioniert</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-medium text-white">1. Zentrales Design-System</h3>
              <p className="text-sm text-gray-300">
                Alle Größen werden aus einem einzigen Scale-Factor berechnet. Änderungen wirken sich proportional auf
                das gesamte System aus.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium text-white">2. Responsive clamp()-Funktionen</h3>
              <p className="text-sm text-gray-300">
                Automatische Anpassung zwischen Minimum, fluidem Bereich und Maximum. Keine Media-Queries nötig!
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium text-white">3. CSS-Variablen</h3>
              <p className="text-sm text-gray-300">
                Alle Werte werden als CSS-Variablen gespeichert und können zur Laufzeit aktualisiert werden.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium text-white">4. Konsistente Skalierung</h3>
              <p className="text-sm text-gray-300">
                Spacing, Typografie und alle anderen Elemente skalieren zusammen. Das Design bleibt immer harmonisch.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Design System Controls */}
      <DesignSystemControls />
    </div>
  )
}

export default DesignSystemDemo
