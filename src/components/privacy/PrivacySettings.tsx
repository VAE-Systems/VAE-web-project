/**
 * Privacy Settings Component
 *
 * Detailed privacy settings and cookie preferences management
 */

import React, { useState } from 'react'
import { useConsent } from '../../hooks'
import { COOKIE_CATEGORIES } from '../../types/privacy'

const PrivacySettings: React.FC = () => {
  const { consent, updateConsent, resetConsent, acceptAll, rejectAll } = useConsent()
  const [activeTab, setActiveTab] = useState<'overview' | 'cookies' | 'data'>('overview')

  const handleCategoryToggle = (categoryId: string, enabled: boolean) => {
    updateConsent(categoryId as keyof typeof consent, enabled)
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-text-light">Datenschutz-Einstellungen</h1>
        <p className="text-text-muted">Verwalten Sie Ihre Cookie-Einstellungen und Datenschutz-Präferenzen.</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-border-primary mb-6 flex border-b">
        {[
          { id: 'overview', label: 'Übersicht' },
          { id: 'cookies', label: 'Cookies' },
          { id: 'data', label: 'Ihre Daten' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
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
              <h2 className="mb-4 text-xl font-semibold text-text-light">Ihre aktuellen Einstellungen</h2>

              <div className="grid gap-4 md:grid-cols-2">
                {COOKIE_CATEGORIES.map(category => (
                  <div
                    key={category.id}
                    className="border-border-primary flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <h3 className="font-medium text-text-light">{category.title}</h3>
                      <p className="text-sm text-text-muted">{category.description}</p>
                    </div>
                    <div
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        consent[category.id as keyof typeof consent]
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {consent[category.id as keyof typeof consent] ? 'Aktiv' : 'Inaktiv'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-vae">
              <h2 className="mb-4 text-xl font-semibold text-text-light">Schnellaktionen</h2>
              <div className="flex flex-wrap gap-3">
                <button onClick={acceptAll} className="btn-primary">
                  Alle aktivieren
                </button>

                <button onClick={rejectAll} className="btn-secondary">
                  Alle deaktivieren
                </button>

                <button onClick={resetConsent} className="btn-ghost">
                  Zurücksetzen
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cookies' && (
          <div className="space-y-6">
            <div className="card-vae">
              <h2 className="mb-4 text-xl font-semibold text-text-light">Cookie-Kategorien</h2>

              <div className="space-y-4">
                {COOKIE_CATEGORIES.map(category => (
                  <div key={category.id} className="border-border-primary rounded-lg border p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="mb-2 text-lg font-medium text-text-light">
                          {category.title}
                          {category.required && (
                            <span className="ml-2 rounded bg-vae-turquoise/20 px-2 py-0.5 text-sm text-vae-turquoise">
                              Erforderlich
                            </span>
                          )}
                        </h3>
                        <p className="mb-3 text-text-muted">{category.description}</p>

                        <div className="mb-3">
                          <h4 className="mb-2 text-sm font-medium text-text-light">Verwendete Cookies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {category.cookies.map(cookie => (
                              <span
                                key={cookie}
                                className="rounded bg-bg-secondary px-2 py-1 font-mono text-xs text-text-light"
                              >
                                {cookie}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {!category.required && (
                        <label
                          className="relative inline-flex cursor-pointer items-center"
                          aria-label={`${category.title} ${consent[category.id as keyof typeof consent] ? 'aktiviert' : 'deaktiviert'}`}
                        >
                          <input
                            type="checkbox"
                            checked={Boolean(consent[category.id as keyof typeof consent])}
                            onChange={e => handleCategoryToggle(category.id, e.target.checked)}
                            className="peer sr-only"
                            aria-describedby={`category-${category.id}-desc`}
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-vae-turquoise peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-vae-turquoise/25"></div>
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
              <h2 className="mb-4 text-xl font-semibold text-text-light">Ihre gespeicherten Daten</h2>

              <div className="space-y-4">
                <div className="border-border-primary rounded-lg border p-4">
                  <h3 className="mb-2 font-medium text-text-light">Cookie-Einwilligung</h3>
                  <p className="mb-2 text-sm text-text-muted">
                    {consent.timestamp
                      ? `Ihre Cookie-Einstellungen vom ${new Date(consent.timestamp).toLocaleDateString('de-DE')}`
                      : 'Noch keine Cookie-Einstellungen gespeichert'}
                  </p>
                  <div className="text-xs text-text-secondary">Version: {consent.version}</div>
                </div>

                <div className="border-border-primary rounded-lg border p-4">
                  <h3 className="mb-2 font-medium text-text-light">Newsletter-Daten</h3>
                  <p className="text-sm text-text-muted">
                    Ihre Newsletter-Einstellungen werden in unserem separaten Backend gespeichert.
                  </p>
                </div>

                <div className="border-border-primary rounded-lg border p-4">
                  <h3 className="mb-2 font-medium text-text-light">Analytics-Daten</h3>
                  <p className="text-sm text-text-muted">Falls aktiviert, werden anonyme Nutzungsdaten gesammelt.</p>
                </div>
              </div>
            </div>

            <div className="card-vae">
              <h2 className="mb-4 text-xl font-semibold text-text-light">Datenexport & Löschung</h2>
              <p className="mb-4 text-text-muted">
                Sie haben das Recht, Ihre Daten einzusehen, zu exportieren oder löschen zu lassen.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:info@vae.systems?subject=DSGVO%20Anfrage%3A%20Datenexport&body=Sehr%20geehrtes%20VAE%20Systems%20Team%2C%0A%0Ahiermit%20m%C3%B6chte%20ich%20gem%C3%A4%C3%9F%20Art.%2015%20DSGVO%20eine%20Kopie%20aller%20zu%20meiner%20Person%20gespeicherten%20Daten%20anfordern.%0A%0AMeine%20Kontaktdaten%3A%0AName%3A%20%0AE-Mail%3A%20%0A%0AVielen%20Dank%20f%C3%BCr%20die%20Bearbeitung.%0A%0AMit%20freundlichen%20Gr%C3%BC%C3%9Fen"
                  className="btn-secondary"
                >
                  Daten exportieren
                </a>
                <a
                  href="mailto:info@vae.systems?subject=DSGVO%20Anfrage%3A%20Datenl%C3%B6schung&body=Sehr%20geehrtes%20VAE%20Systems%20Team%2C%0A%0Ahiermit%20beantrage%20ich%20gem%C3%A4%C3%9F%20Art.%2017%20DSGVO%20die%20L%C3%B6schung%20aller%20zu%20meiner%20Person%20gespeicherten%20Daten.%0A%0AMeine%20Kontaktdaten%3A%0AName%3A%20%0AE-Mail%3A%20%0A%0AVielen%20Dank%20f%C3%BCr%20die%20Bearbeitung.%0A%0AMit%20freundlichen%20Gr%C3%BC%C3%9Fen"
                  className="btn-ghost"
                >
                  Alle Daten löschen
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PrivacySettings
