import React from 'react'
import { ThemeToggle } from './ThemeToggle'

/**
 * Demo component showcasing the enhanced theme system
 */
export const ThemeDemo: React.FC = () => {
  return (
    <div className="min-h-screen theme-bg-background theme-text-text p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold theme-text-primary mb-4">
            🎨 Enhanced Theme System
          </h1>
          <p className="text-lg theme-text-muted mb-8">
            Erweiterte Farbschemata mit Accessibility-Unterstützung
          </p>

          <ThemeToggle className="mb-8" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Color Palette Demo */}
          <div className="theme-card">
            <h3 className="text-xl font-semibold theme-text-primary mb-4">
              🎨 Farbpalette
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded theme-bg-primary"></div>
                <span className="theme-text-text">Primary</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded theme-bg-secondary"></div>
                <span className="theme-text-text">Secondary</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded theme-bg-accent"></div>
                <span className="theme-text-text">Accent</span>
              </div>
            </div>
          </div>

          {/* Component Demo */}
          <div className="theme-card">
            <h3 className="text-xl font-semibold theme-text-primary mb-4">
              🧩 Komponenten
            </h3>
            <div className="space-y-4">
              <button className="theme-button w-full">
                Theme Button
              </button>
              <input
                type="text"
                placeholder="Theme Input"
                className="theme-input w-full"
              />
            </div>
          </div>

          {/* Accessibility Demo */}
          <div className="theme-card">
            <h3 className="text-xl font-semibold theme-text-primary mb-4">
              ♿ Accessibility
            </h3>
            <div className="space-y-3">
              <div className="text-sm theme-text-muted">
                • Hoher Kontrast Modus
              </div>
              <div className="text-sm theme-text-muted">
                • Farbenblind-freundlich
              </div>
              <div className="text-sm theme-text-muted">
                • Automatische Anpassung
              </div>
            </div>
          </div>
        </div>

        {/* Gradient Demo */}
        <div className="mt-12 theme-card">
          <h3 className="text-xl font-semibold theme-text-primary mb-6">
            🌈 Gradient Themes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-32 rounded-lg theme-gradient-primary flex items-center justify-center">
              <span className="text-white font-semibold">Primary Gradient</span>
            </div>
            <div className="h-32 rounded-lg theme-gradient-accent flex items-center justify-center">
              <span className="text-white font-semibold">Accent Gradient</span>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-12 theme-card">
          <h3 className="text-xl font-semibold theme-text-primary mb-6">
            ✨ Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 theme-text-text">
              <li>✅ Light/Dark Mode</li>
              <li>✅ Auto System Detection</li>
              <li>✅ High Contrast Mode</li>
              <li>✅ Colorblind Friendly</li>
            </ul>
            <ul className="space-y-2 theme-text-text">
              <li>✅ CSS Custom Properties</li>
              <li>✅ TypeScript Support</li>
              <li>✅ Local Storage Persistence</li>
              <li>✅ Accessibility Compliant</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
