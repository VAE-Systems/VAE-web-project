import React from 'react'
import { Link } from 'react-router-dom'
import { privacyContent } from '../../content/privacy'
import Seo from '../ui/Seo'

/**
 * Datenschutz / Privacy Policy
 *
 * Abbild der derzeitigen Datenverarbeitung (Stand: August 2025).
 * Hinweise / Platzhalter sind klar markiert und sollten bei Änderungen (Hosting, Fonts Self‑Hosting, neue Tools) angepasst werden.
 */
const PrivacyPage: React.FC = () => {
  return (
    <div className="relative z-0 min-h-[100dvh] bg-bg-darker">
      <Seo
        title="Datenschutz | VAE Systems"
        description="Datenschutzhinweise der VAE Systems UG (haftungsbeschränkt) – Informationen nach DSGVO zu Art, Umfang und Zweck der Verarbeitung personenbezogener Daten."
        canonicalPath="/privacy"
      />
      <section className="container-vae max-w-4xl pb-24 pt-40">
        <h1 className="h1 heading-gradient mb-10">Datenschutzerklärung</h1>

        {/* Privacy Settings Link */}
        <div className="border-border-primary mb-8 rounded-lg border bg-bg-secondary p-6">
          <h2 className="mb-2 text-lg font-semibold text-text-light">Ihre Datenschutz-Einstellungen</h2>
          <p className="mb-4 text-text-muted">
            Verwalten Sie Ihre Cookie-Einstellungen und Datenschutz-Präferenzen individuell.
          </p>
          <Link to="/privacy/settings" className="btn-primary inline-block">
            Datenschutz-Einstellungen öffnen
          </Link>
        </div>

        <div className="space-y-10 text-sm leading-relaxed text-text-secondary">
          {privacyContent.sections.map(section => (
            <section id={section.id} key={section.id}>
              <h2 className="h3 mb-2 text-text-light">{section.title}</h2>
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
