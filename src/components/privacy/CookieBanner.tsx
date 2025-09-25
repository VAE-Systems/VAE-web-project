/**
 * Cookie Banner Component
 *
 * GDPR-compliant cookie consent banner with category selection
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useConsent } from '../../hooks/useConsent'
import { COOKIE_CATEGORIES } from '../../types/privacy'
import Icon from '@/components/ui/Icon'

const CookieBanner: React.FC = () => {
  const { consent, acceptAll, rejectAll, acceptNecessary, updateConsent, hasConsent, isConsentGiven } = useConsent()
  const [showDetails, setShowDetails] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Show banner if no consent given yet
  useEffect(() => {
    if (!isConsentGiven) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [isConsentGiven])

  // Hide banner if consent is given
  useEffect(() => {
    if (isConsentGiven) {
      setIsVisible(false)
    }
  }, [isConsentGiven])

  if (!isVisible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-vae-turquoise/20 bg-bg-darker shadow-2xl"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <div className="container-vae">
        <div className="px-4 py-6 md:px-6">
          {/* Main Banner */}
          {!showDetails ? (
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="flex-1">
                <h2 id="cookie-banner-title" className="mb-2 text-lg font-semibold text-text-light">
                  🍪 Cookie-Einstellungen
                </h2>
                <p id="cookie-banner-description" className="text-sm leading-relaxed text-text-muted">
                  Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und unsere Services anzubieten. Mit Ihrer
                  Zustimmung helfen Sie uns, unsere Website zu optimieren.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                <button
                  onClick={acceptAll}
                  className="btn-primary px-6 py-2 text-sm"
                  aria-label="Alle Cookies akzeptieren"
                >
                  Alle akzeptieren
                </button>

                <button
                  onClick={() => setShowDetails(true)}
                  className="btn-outline px-6 py-2 text-sm"
                  aria-label="Detaillierte Cookie-Einstellungen anzeigen"
                >
                  Einstellungen
                </button>

                <button
                  onClick={acceptNecessary}
                  className="px-4 py-2 text-sm text-text-muted transition-colors hover:text-text-light"
                  aria-label="Nur notwendige Cookies akzeptieren"
                >
                  Nur notwendig
                </button>
              </div>
            </div>
          ) : (
            /* Detailed Settings */
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-text-light">Cookie-Einstellungen</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-1 text-text-muted hover:text-text-light"
                  aria-label="Einstellungen schließen"
                >
                  <Icon name="close" />
                </button>
              </div>

              <div className="mb-6 space-y-4">
                {COOKIE_CATEGORIES.map(category => (
                  <div key={category.id} className="border-border-primary rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="mb-1 font-medium text-text-light">
                          {category.title}
                          {category.required && (
                            <span className="ml-2 rounded bg-vae-turquoise/20 px-2 py-0.5 text-xs text-vae-turquoise">
                              Erforderlich
                            </span>
                          )}
                        </h3>
                        <p className="mb-2 text-sm text-text-muted">{category.description}</p>
                        <div className="text-xs text-text-secondary">Cookies: {category.cookies.join(', ')}</div>
                      </div>

                      <label className="relative ml-4 inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={hasConsent(category.id as keyof typeof consent)}
                          onChange={e => {
                            if (!category.required) {
                              updateConsent(category.id as keyof typeof consent, e.target.checked)
                            }
                          }}
                          disabled={category.required}
                          className="peer sr-only"
                          aria-label={`${category.title} Cookies ${hasConsent(category.id as keyof typeof consent) ? 'aktivieren' : 'deaktivieren'}`}
                        />
                        <div
                          className={`peer h-6 w-11 rounded-full bg-gray-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-vae-turquoise peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-vae-turquoise/25 ${category.required ? 'cursor-not-allowed opacity-50' : ''}`}
                        ></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col justify-end gap-3 sm:flex-row">
                <Link
                  to="/privacy/settings"
                  className="px-4 py-2 text-sm text-text-muted transition-colors hover:text-vae-turquoise"
                  onClick={() => setShowDetails(false)}
                >
                  Erweiterte Einstellungen
                </Link>

                <button
                  onClick={rejectAll}
                  className="btn-outline px-6 py-2 text-sm"
                  aria-label="Alle optionalen Cookies ablehnen"
                >
                  Nur notwendig
                </button>

                <button
                  onClick={acceptAll}
                  className="btn-primary px-6 py-2 text-sm"
                  aria-label="Alle Cookies akzeptieren"
                >
                  Alle Cookies akzeptieren
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CookieBanner
