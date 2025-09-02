/**
 * Privacy Settings Component
 *
 * Detailed privacy settings and cookie preferences management
 */

import React, { useState } from 'react'
import { useConsent } from '../../hooks/useConsent'
import { COOKIE_CATEGORIES } from '../../types/privacy'

const PrivacySettings: React.FC = () => {
  const { consent, updateConsent, resetConsent } = useConsent()
  const [activeTab, setActiveTab] = useState<'overview' | 'cookies' | 'data'>('overview')

  const handleCategoryToggle = (categoryId: string, enabled: boolean) => {
    updateConsent(categoryId as keyof typeof consent, enabled)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-light mb-2">Datenschutz-Einstellungen</h1>
        <p className="text-text-muted">
          Verwalten Sie Ihre Cookie-Einstellungen und Datenschutz-Präferenzen.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-border-primary mb-6">
        {[
          { id: 'overview', label: 'Übersicht' },
          { id: 'cookies', label: 'Cookies' },
          { id: 'data', label: 'Ihre Daten' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'border-vae-turquoise text-vae-turquoise'
                : 'border-transparent text-text-muted hover:text-text-light'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="card-vae">
              <h2 className="text-xl font-semibold text-text-light mb-4">Ihre aktuellen Einstellungen</h2>

              <div className="grid md:grid-cols-2 gap-4">
                {COOKIE_CATEGORIES.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
                    <div>
                      <h3 className="font-medium text-text-light">{category.title}</h3>
                      <p className="text-sm text-text-muted">{category.description}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      consent[category.id as keyof typeof consent]
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {consent[category.id as keyof typeof consent] ? 'Aktiv' : 'Inaktiv'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-vae">
              <h2 className="text-xl font-semibold text-text-light mb-4">Schnellaktionen</h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    COOKIE_CATEGORIES.forEach(cat => {
                      if (!cat.required) {
                        handleCategoryToggle(cat.id, true)
                      }
                    })
                  }}
                  className="btn-primary"
                >
                  Alle aktivieren
                </button>

                <button
                  onClick={() => {
                    COOKIE_CATEGORIES.forEach(cat => {
                      if (!cat.required) {
                        handleCategoryToggle(cat.id, false)
                      }
                    })
                  }}
                  className="btn-outline"
                >
                  Alle deaktivieren
                </button>

                <button
                  onClick={resetConsent}
                  className="text-text-muted hover:text-red-400 transition-colors px-4 py-2 border border-border-primary rounded-lg"
                >
                  Zurücksetzen
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cookies' && (
          <div className="space-y-6">
            <div className="card-vae">
              <h2 className="text-xl font-semibold text-text-light mb-4">Cookie-Kategorien</h2>

              <div className="space-y-4">
                {COOKIE_CATEGORIES.map((category) => (
                  <div key={category.id} className="border border-border-primary rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-text-light mb-2">
                          {category.title}
                          {category.required && (
                            <span className="ml-2 text-sm bg-vae-turquoise/20 text-vae-turquoise px-2 py-0.5 rounded">
                              Erforderlich
                            </span>
                          )}
                        </h3>
                        <p className="text-text-muted mb-3">{category.description}</p>

                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-text-light mb-2">Verwendete Cookies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {category.cookies.map((cookie) => (
                              <span
                                key={cookie}
                                className="px-2 py-1 bg-bg-secondary text-text-light text-xs rounded font-mono"
                              >
                                {cookie}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {!category.required && (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(consent[category.id as keyof typeof consent])}
                            onChange={(e) => handleCategoryToggle(category.id, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-vae-turquoise/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vae-turquoise"></div>
                        </label>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="space-y-6">
            <div className="card-vae">
              <h2 className="text-xl font-semibold text-text-light mb-4">Ihre gespeicherten Daten</h2>

              <div className="space-y-4">
                <div className="p-4 border border-border-primary rounded-lg">
                  <h3 className="font-medium text-text-light mb-2">Cookie-Einwilligung</h3>
                  <p className="text-sm text-text-muted mb-2">
                    Ihre Cookie-Einstellungen vom {new Date(consent.timestamp).toLocaleDateString('de-DE')}
                  </p>
                  <div className="text-xs text-text-secondary">
                    Version: {consent.version}
                  </div>
                </div>

                <div className="p-4 border border-border-primary rounded-lg">
                  <h3 className="font-medium text-text-light mb-2">Newsletter-Daten</h3>
                  <p className="text-sm text-text-muted">
                    Ihre Newsletter-Einstellungen werden in unserem separaten Backend gespeichert.
                  </p>
                </div>

                <div className="p-4 border border-border-primary rounded-lg">
                  <h3 className="font-medium text-text-light mb-2">Analytics-Daten</h3>
                  <p className="text-sm text-text-muted">
                    Falls aktiviert, werden anonyme Nutzungsdaten gesammelt.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-vae">
              <h2 className="text-xl font-semibold text-text-light mb-4">Datenexport & Löschung</h2>
              <p className="text-text-muted mb-4">
                Sie haben das Recht, Ihre Daten einzusehen, zu exportieren oder löschen zu lassen.
              </p>

              <div className="flex flex-wrap gap-3">
                <button className="btn-outline">
                  Daten exportieren
                </button>
                <button className="text-text-muted hover:text-red-400 transition-colors px-4 py-2 border border-border-primary rounded-lg">
                  Alle Daten löschen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PrivacySettings
