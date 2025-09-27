/**
 * VAE Blog Color System Demo
 * Zeigt alle Farbmodi und deren Anwendung
 */

import React, { useState } from 'react'
import { applyColorMode, getCurrentColorMode } from '../config/colorSystem'

const ColorSystemDemo: React.FC = () => {
  const [currentMode, setCurrentMode] = useState(getCurrentColorMode())

  const handleModeChange = (mode: 'light' | 'dark' | 'contrast') => {
    applyColorMode(mode)
    setCurrentMode(mode)
  }

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mx-auto mb-12 max-w-6xl">
        <h1 className="mb-4 text-4xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
          🎨 VAE Blog - Farbsystem Demo
        </h1>
        <p className="mb-8 text-lg" style={{ color: 'var(--color-text-secondary)' }}>
          Vollständige Farbpalette für Light, Dark und High Contrast Modi
        </p>

        {/* Mode Switcher */}
        <div className="mb-8 flex gap-4">
          <button
            onClick={() => handleModeChange('light')}
            className={`rounded-lg px-6 py-3 font-medium transition-colors ${
              currentMode === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🌞 Light Mode
          </button>
          <button
            onClick={() => handleModeChange('dark')}
            className={`rounded-lg px-6 py-3 font-medium transition-colors ${
              currentMode === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🌙 Dark Mode
          </button>
          <button
            onClick={() => handleModeChange('contrast')}
            className={`rounded-lg px-6 py-3 font-medium transition-colors ${
              currentMode === 'contrast' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ⚡ High Contrast
          </button>
        </div>
      </div>

      {/* Color Palette Display */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Brand Colors */}
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            🏷️ Brand Colors
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div
                className="h-12 w-12 rounded-lg border-2"
                style={{ backgroundColor: 'var(--color-brand-primary)' }}
              ></div>
              <div>
                <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                  Primary
                </div>
                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  VAE Türkis - Innovation & Technologie
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className="h-12 w-12 rounded-lg border-2"
                style={{ backgroundColor: 'var(--color-brand-secondary)' }}
              ></div>
              <div>
                <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                  Secondary
                </div>
                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  Professionalität & Seriosität
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Colors */}
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            🎨 Background Colors
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div
                className="mb-2 h-16 w-full rounded-lg border"
                style={{ backgroundColor: 'var(--color-bg-primary)' }}
              ></div>
              <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                Primary
              </div>
            </div>
            <div>
              <div
                className="mb-2 h-16 w-full rounded-lg border"
                style={{ backgroundColor: 'var(--color-bg-secondary)' }}
              ></div>
              <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                Secondary
              </div>
            </div>
            <div>
              <div
                className="mb-2 h-16 w-full rounded-lg border"
                style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
              ></div>
              <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                Tertiary
              </div>
            </div>
            <div>
              <div
                className="mb-2 h-16 w-full rounded-lg border"
                style={{ backgroundColor: 'var(--color-bg-accent)' }}
              ></div>
              <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                Accent
              </div>
            </div>
          </div>
        </div>

        {/* Text Colors */}
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            📝 Text Colors
          </h2>
          <div className="space-y-3">
            <div style={{ color: 'var(--color-text-primary)' }}>
              <strong>Primary Text:</strong> Haupttitel und wichtiger Inhalt
            </div>
            <div style={{ color: 'var(--color-text-secondary)' }}>
              <strong>Secondary Text:</strong> Untertitel und Beschreibungen
            </div>
            <div style={{ color: 'var(--color-text-tertiary)' }}>
              <strong>Tertiary Text:</strong> Meta-Informationen
            </div>
            <div style={{ color: 'var(--color-text-muted)' }}>
              <strong>Muted Text:</strong> Hinweise und weniger wichtige Infos
            </div>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            🎯 Interactive Elements
          </h2>
          <div className="space-y-4">
            <button
              className="w-full rounded-lg px-4 py-3 font-medium transition-colors"
              style={{
                backgroundColor: 'var(--color-brand-primary)',
                color: 'var(--color-bg-primary)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-interactive-hover)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-brand-primary)'
              }}
            >
              Primary Button
            </button>

            <div
              className="cursor-pointer rounded-lg border-2 p-4 transition-colors"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderColor: 'var(--color-border-medium)',
                color: 'var(--color-text-primary)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-interactive-focus)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border-medium)'
              }}
            >
              Hover me for focus effect
            </div>

            <a
              href="#"
              className="inline-block rounded px-4 py-2 transition-colors"
              style={{ color: 'var(--color-link)' }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--color-link-hover)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--color-link)'
              }}
            >
              Beispiel-Link mit Hover-Effekt
            </a>
          </div>
        </div>

        {/* Semantic Colors */}
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            🔗 Semantic Colors
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: 'var(--color-accent-success)' }}></div>
              <span style={{ color: 'var(--color-text-primary)' }}>Success State</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: 'var(--color-accent-warning)' }}></div>
              <span style={{ color: 'var(--color-text-primary)' }}>Warning State</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: 'var(--color-accent-error)' }}></div>
              <span style={{ color: 'var(--color-text-primary)' }}>Error State</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: 'var(--color-accent-info)' }}></div>
              <span style={{ color: 'var(--color-text-primary)' }}>Info State</span>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            💻 Code Example
          </h2>
          <div
            className="rounded-lg p-4 font-mono text-sm"
            style={{
              backgroundColor: 'var(--color-code-bg)',
              color: 'var(--color-code)',
              border: '1px solid var(--color-border-medium)',
            }}
          >
            <div>
              <span style={{ color: 'var(--color-accent-info)' }}>const</span> colorSystem = {'{'}
            </div>
            <div>
              {' '}
              primary: <span style={{ color: 'var(--color-brand-primary)' }}>'#00ffa5'</span>,
            </div>
            <div>
              {' '}
              background: <span style={{ color: 'var(--color-bg-primary)' }}>'var(--color-bg-primary)'</span>
            </div>
            <div>{'}'}</div>
          </div>
        </div>
      </div>

      {/* Implementation Guide */}
      <div className="mx-auto mt-12 max-w-6xl">
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            🚀 Implementierung
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                CSS-Verwendung
              </h3>
              <pre
                className="rounded p-3 text-sm"
                style={{
                  backgroundColor: 'var(--color-code-bg)',
                  color: 'var(--color-code)',
                  border: '1px solid var(--color-border-medium)',
                }}
              >
                {`.element {
  color: var(--color-text-primary);
  background: var(--color-bg-secondary);
}`}
              </pre>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                JavaScript-Integration
              </h3>
              <pre
                className="rounded p-3 text-sm"
                style={{
                  backgroundColor: 'var(--color-code-bg)',
                  color: 'var(--color-code)',
                  border: '1px solid var(--color-border-medium)',
                }}
              >
                {`import { applyColorMode } from './colorSystem'

// Modus setzen
applyColorMode('dark')`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorSystemDemo
