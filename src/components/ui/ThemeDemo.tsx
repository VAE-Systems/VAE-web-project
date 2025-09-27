import React from 'react'
import { ThemeToggle } from './ThemeToggle'

/**
 * Demo component showcasing the enhanced theme system
 */
export const ThemeDemo: React.FC = () => {
  return (
    <div className="theme-bg-background theme-text-text min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <h1 className="theme-text-primary mb-4 text-4xl font-bold">🎨 Enhanced Theme System</h1>
          <p className="theme-text-muted mb-8 text-lg">Erweiterte Farbschemata mit Accessibility-Unterstützung</p>

          <ThemeToggle className="mb-8" />
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Color Palette Demo */}
          <div className="theme-card">
            <h3 className="theme-text-primary mb-4 text-xl font-semibold">🎨 Farbpalette</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="theme-bg-primary h-8 w-8 rounded"></div>
                <span className="theme-text-text">Primary</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="theme-bg-secondary h-8 w-8 rounded"></div>
                <span className="theme-text-text">Secondary</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="theme-bg-accent h-8 w-8 rounded"></div>
                <span className="theme-text-text">Accent</span>
              </div>
            </div>
          </div>

          {/* Component Demo */}
          <div className="theme-card">
            <h3 className="theme-text-primary mb-4 text-xl font-semibold">🧩 Komponenten</h3>
            <div className="space-y-4">
              <button className="theme-button w-full">Theme Button</button>
              <input type="text" placeholder="Theme Input" className="theme-input w-full" />
            </div>
          </div>

          {/* Accessibility Demo */}
          <div className="theme-card">
            <h3 className="theme-text-primary mb-4 text-xl font-semibold">♿ Accessibility</h3>
            <div className="space-y-3">
              <div className="theme-text-muted text-sm">• Hoher Kontrast Modus</div>
              <div className="theme-text-muted text-sm">• Farbenblind-freundlich</div>
              <div className="theme-text-muted text-sm">• Automatische Anpassung</div>
            </div>
          </div>
        </div>

        {/* Gradient Demo */}
        <div className="theme-card mt-12">
          <h3 className="theme-text-primary mb-6 text-xl font-semibold">🌈 Gradient Themes</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="theme-gradient-primary flex h-32 items-center justify-center rounded-lg">
              <span className="font-semibold text-white">Primary Gradient</span>
            </div>
            <div className="theme-gradient-accent flex h-32 items-center justify-center rounded-lg">
              <span className="font-semibold text-white">Accent Gradient</span>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="theme-card mt-12">
          <h3 className="theme-text-primary mb-6 text-xl font-semibold">✨ Features</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ul className="theme-text-text space-y-2">
              <li>✅ Light/Dark Mode</li>
              <li>✅ Auto System Detection</li>
              <li>✅ High Contrast Mode</li>
              <li>✅ Colorblind Friendly</li>
            </ul>
            <ul className="theme-text-text space-y-2">
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
