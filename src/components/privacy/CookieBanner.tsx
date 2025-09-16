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
      className="fixed bottom-0 left-0 right-0 z-50 bg-bg-darker border-t border-vae-turquoise/20 shadow-2xl"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <div className="container-vae">
        <div className="py-6 px-4 md:px-6">
          {/* Main Banner */}
          {!showDetails ? (
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h2 id="cookie-banner-title" className="text-lg font-semibold text-text-light mb-2">
                  🍪 Cookie-Einstellungen
                </h2>
                <p id="cookie-banner-description" className="text-text-muted text-sm leading-relaxed">
                  Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und unsere Services anzubieten.
                  Mit Ihrer Zustimmung helfen Sie uns, unsere Website zu optimieren.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={acceptAll}
                  className="btn-primary text-sm px-6 py-2"
                  aria-label="Alle Cookies akzeptieren"
                >
                  Alle akzeptieren
                </button>

                <button
                  onClick={() => setShowDetails(true)}
                  className="btn-outline text-sm px-6 py-2"
                  aria-label="Detaillierte Cookie-Einstellungen anzeigen"
                >
                  Einstellungen
                </button>

                <button
                  onClick={acceptNecessary}
                  className="text-text-muted hover:text-text-light text-sm px-4 py-2 transition-colors"
                  aria-label="Nur notwendige Cookies akzeptieren"
                >
                  Nur notwendig
                </button>
              </div>
            </div>
          ) : (
            /* Detailed Settings */
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-text-light">
                  Cookie-Einstellungen
                </h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-text-muted hover:text-text-light p-1"
                  aria-label="Einstellungen schließen"
                >
                  <Icon name="close" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {COOKIE_CATEGORIES.map((category) => (
                  <div key={category.id} className="border border-border-primary rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-text-light mb-1">
                          {category.title}
                          {category.required && (
                            <span className="ml-2 text-xs bg-vae-turquoise/20 text-vae-turquoise px-2 py-0.5 rounded">
                              Erforderlich
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-text-muted mb-2">
                          {category.description}
                        </p>
                        <div className="text-xs text-text-secondary">
                          Cookies: {category.cookies.join(', ')}
                        </div>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          checked={hasConsent(category.id as keyof typeof consent)}
                          onChange={(e) => {
                            if (!category.required) {
                              updateConsent(category.id as keyof typeof consent, e.target.checked)
                            }
                          }}
                          disabled={category.required}
                          className="sr-only peer"
                          aria-label={`${category.title} Cookies ${hasConsent(category.id as keyof typeof consent) ? 'aktivieren' : 'deaktivieren'}`}
                        />
                        <div className={`w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-vae-turquoise/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vae-turquoise ${category.required ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Link
                  to="/privacy/settings"
                  className="text-text-muted hover:text-vae-turquoise text-sm px-4 py-2 transition-colors"
                  onClick={() => setShowDetails(false)}
                >
                  Erweiterte Einstellungen
                </Link>

                <button
                  onClick={rejectAll}
                  className="btn-outline text-sm px-6 py-2"
                  aria-label="Alle optionalen Cookies ablehnen"
                >
                  Nur notwendig
                </button>

                <button
                  onClick={acceptAll}
                  className="btn-primary text-sm px-6 py-2"
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
