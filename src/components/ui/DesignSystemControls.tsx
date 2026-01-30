/**
 * Design System Control Panel
 * Einfaches Tool zum Testen und Anpassen der Skalierung
 */

import React, { useEffect, useState } from 'react'
import {
  getCurrentScaleFactor,
  resetDesignSystem,
  scaleDesignSystem,
  updateDesignSystem,
} from '../../config/designSystem'

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
        className="fixed bottom-4 right-4 z-[1020] rounded-lg bg-vae-turquoise px-4 py-2 text-white shadow-lg transition-colors hover:bg-vae-turquoise-light"
        title="Design System Controls"
      >
        🎨 DS
      </button>
    )
  }

  return (
    <div
      className={`fixed bottom-4 right-4 z-[1020] rounded-lg border border-vae-turquoise/30 bg-black/90 p-4 shadow-xl backdrop-blur-sm ${className}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-vae-turquoise">Design System</h3>
        <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-white">
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {/* Aktueller Scale Factor */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">Scale Factor: {scaleFactor.toFixed(2)}</label>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.05"
            value={scaleFactor}
            onChange={e => handleScaleChange(parseFloat(e.target.value))}
            className="slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
          />
        </div>

        {/* Quick Scale Buttons */}
        <div>
          <span className="mb-2 block text-sm text-gray-300">Quick Scale:</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleQuickScale(0.9)}
              className="rounded bg-gray-700 px-3 py-1 text-sm transition-colors hover:bg-gray-600"
            >
              -10%
            </button>
            <button
              onClick={() => handleQuickScale(1.1)}
              className="rounded bg-gray-700 px-3 py-1 text-sm transition-colors hover:bg-gray-600"
            >
              +10%
            </button>
            <button
              onClick={handleReset}
              className="rounded bg-vae-turquoise px-3 py-1 text-sm transition-colors hover:bg-vae-turquoise-light"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Test Text */}
        <div className="border-t border-gray-700 pt-4">
          <p className="mb-2 text-xs text-gray-400">Test Text:</p>
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
