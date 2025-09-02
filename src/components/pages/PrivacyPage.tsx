import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../ui/Seo'
import { privacyContent } from '../../content/privacy'

/**
 * Datenschutz / Privacy Policy
 *
 * Abbild der derzeitigen Datenverarbeitung (Stand: August 2025).
 * Hinweise / Platzhalter sind klar markiert und sollten bei Änderungen (Hosting, Fonts Self‑Hosting, neue Tools) angepasst werden.
 */
const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-[100dvh] bg-bg-darker">
      <Seo
        title="Datenschutz | VAE Systems"
        description="Datenschutzhinweise der VAE Systems UG (haftungsbeschränkt) – Informationen nach DSGVO zu Art, Umfang und Zweck der Verarbeitung personenbezogener Daten."
        canonicalPath="/privacy"
      />
      <section className="pt-40 pb-24 container-vae max-w-4xl">
        <h1 className="h1 heading-gradient mb-10">Datenschutzerklärung</h1>

        {/* Privacy Settings Link */}
        <div className="mb-8 p-6 bg-bg-secondary border border-border-primary rounded-lg">
          <h2 className="text-lg font-semibold text-text-light mb-2">Ihre Datenschutz-Einstellungen</h2>
          <p className="text-text-muted mb-4">
            Verwalten Sie Ihre Cookie-Einstellungen und Datenschutz-Präferenzen individuell.
          </p>
          <Link
            to="/privacy/settings"
            className="btn-primary inline-block"
          >
            Datenschutz-Einstellungen öffnen
          </Link>
        </div>

        <div className="space-y-10 text-sm leading-relaxed text-text-secondary">
          {privacyContent.sections.map(section => (
            <section id={section.id} key={section.id}>
              <h2 className="h3 text-text-light mb-2">{section.title}</h2>
              {typeof section.body === 'string' ? <p>{section.body}</p> : section.body}
            </section>
          ))}
          <p className="text-[11px] text-text-muted">Stand: {privacyContent.updated}</p>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPage
