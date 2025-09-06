/**
 * Design System Control Panel
 * Einfaches Tool zum Testen und Anpassen der Skalierung
 */

import React, { useEffect, useState } from 'react'
import { getCurrentScaleFactor, resetDesignSystem, scaleDesignSystem, updateDesignSystem } from '../../config/designSystem'

export interface DesignSystemControlsProps {
  className?: string
}

const DesignSystemControls: React.FC<DesignSystemControlsProps> = ({ className = '' }) => {
  const [scaleFactor, setScaleFactor] = useState(getCurrentScaleFactor())
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Aktualisiere den lokalen State wenn sich der Scale Factor ändert
    const handleScaleChange = () => {
      setScaleFactor(getCurrentScaleFactor())
    }

    // Custom Event für Scale Factor Änderungen
    window.addEventListener('designSystemScaleChange', handleScaleChange)
    return () => window.removeEventListener('designSystemScaleChange', handleScaleChange)
  }, [])

  const handleScaleChange = (newScale: number) => {
    updateDesignSystem(newScale)
    setScaleFactor(newScale)
    window.dispatchEvent(new CustomEvent('designSystemScaleChange'))
  }

  const handleQuickScale = (factor: number) => {
    scaleDesignSystem(factor)
    setScaleFactor(getCurrentScaleFactor())
    window.dispatchEvent(new CustomEvent('designSystemScaleChange'))
  }

  const handleReset = () => {
    resetDesignSystem()
    setScaleFactor(getCurrentScaleFactor())
    window.dispatchEvent(new CustomEvent('designSystemScaleChange'))
  }

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 bg-vae-turquoise text-white px-4 py-2 rounded-lg shadow-lg hover:bg-vae-turquoise-light transition-colors"
        title="Design System Controls"
      >
        🎨 DS
      </button>
    )
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 bg-black/90 backdrop-blur-sm border border-vae-turquoise/30 rounded-lg p-4 shadow-xl ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-vae-turquoise font-semibold">Design System</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {/* Aktueller Scale Factor */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Scale Factor: {scaleFactor.toFixed(2)}
          </label>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.05"
            value={scaleFactor}
            onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Quick Scale Buttons */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Quick Scale:</label>
          <div className="flex gap-2">
            <button
              onClick={() => handleQuickScale(0.9)}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
            >
              -10%
            </button>
            <button
              onClick={() => handleQuickScale(1.1)}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
            >
              +10%
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1 bg-vae-turquoise hover:bg-vae-turquoise-light rounded text-sm transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Test Text */}
        <div className="border-t border-gray-700 pt-4">
          <p className="text-xs text-gray-400 mb-2">Test Text:</p>
          <div className="space-y-2">
            <p className="ds-text-xs">Extra Small Text (xs)</p>
            <p className="ds-text-sm">Small Text (sm)</p>
            <p className="ds-text-base">Base Text (base)</p>
            <p className="ds-text-lg">Large Text (lg)</p>
            <p className="ds-text-xl">Extra Large Text (xl)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignSystemControls
