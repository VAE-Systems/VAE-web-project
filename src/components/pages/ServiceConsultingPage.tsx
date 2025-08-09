import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../ui/Seo'

const ServiceConsultingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="Beratung | VAE Systems – Strategie, Architektur, Compliance"
        description="Strategische KI- & Automationsberatung: Roadmaps, Sicherheits- & Governance Audits, EU AI Act Orientierung, Machbarkeitsanalysen."
        canonicalPath="/services/consulting"
        jsonLd={[{ '@context':'https://schema.org','@type':'ProfessionalService','name':'VAE Systems Consulting' }]}
      />
      <section className="relative -mt-20 pt-44 pb-24 border-b border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker">
        <div className="container-vae max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold heading-fix mb-8">
            <span className="block text-text-light">Beratungen</span>
            <span className="block text-gradient">Richtung & Klarheit.</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mb-10">Wir schaffen Entscheidungsgrundlagen: Architektur-Optionen, Kosten-/Risiko-Bewertung & Regulatorik-Einordnung – ohne Hype, faktenbasiert.</p>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[{h:'Architektur & Roadmap',b:['Ist-Analyse','Zielbild / Gaps','Migrationspfade','Kostenpfad / TCO']},{h:'Compliance & Governance',b:['EU AI Act Orientierung','Data Act Schnittstellen','Risikoklassifizierung','Auditierbare Artefakte']},{h:'Security & Operations',b:['Bedrohungsmodellierung','Zugriffskontrollen','Betriebs-Playbooks','Observability Review']}].map(c => (
              <div key={c.h} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-sm font-semibold text-white mb-3">{c.h}</h3>
                <ul className="text-xs text-text-secondary space-y-1 leading-relaxed list-disc list-inside">{c.b.map(x => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-14">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-vae-turquoise mb-4">Arbeitsweise</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">Kurze Validierungszyklen, transparente Annahmen, dokumentierte Entscheidungsbäume. Ziel: interne Anschlussfähigkeit statt Berater-PDF.</p>
            <p className="text-sm text-text-secondary leading-relaxed">Optional: Shadowing Ihrer Teams zur realitätsnahen Gap-Erhebung.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="btn-primary">Erstgespräch sichern</Link>
            <Link to="/services" className="btn-secondary">Zurück zur Übersicht</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceConsultingPage
