import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../ui/Seo'

const ServiceCustomSolutionsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="Zustrom Solutions | VAE Systems – Individuelle Umsetzung"
        description="Individuelle Software & Integrationen: API-Connectoren, Spezial-Workflows, domain-spezifische Retrieval Layer – präzise auf Ihren Use Case."
        canonicalPath="/services/custom-solutions"
        jsonLd={[{ '@context':'https://schema.org','@type':'Service','name':'Custom Software & Integration' }]}
      />
      <section className="relative -mt-20 pt-44 pb-24 border-b border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker">
        <div className="container-vae max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold heading-fix mb-8">
            <span className="block text-text-light">Zustrom Solutions</span>
            <span className="block text-gradient">Präzise Umsetzung.</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mb-10">Keine Produktliste – jede Lösung entsteht aus konkretem Engpass. Fokus: tragfähige Architektur, Messbarkeit & späterer Eigenbetrieb ohne Lock‑in.</p>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[{h:'Integrationen',b:['API-Connectoren','Webhook Orchestrierung','Legacy Brücken','Event Normalisierung']},{h:'Automatisierung',b:['Workflow Implementierung','Human-in-the-loop Pfade','Kosten / Latenz Budgets','Fallback / Degradation']},{h:'Retrieval & Data',b:['Domain Embeddings','Index Strategie','Sicherheits-Scoping','Evaluation Hooks']}].map(c => (
              <div key={c.h} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-sm font-semibold text-white mb-3">{c.h}</h3>
                <ul className="text-xs text-text-secondary space-y-1 leading-relaxed list-disc list-inside">{c.b.map(x => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-14">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-vae-turquoise mb-4">Engpass → Blueprint → Build</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">Kurzer Discovery Sprint zur Eingrenzung. Danach modulare Umsetzung mit klaren Metriken (Qualität, Latenz, Betrieb). Handover inkl. Runbooks & Observability Dashboards.</p>
            <p className="text-sm text-text-secondary leading-relaxed">Ergebnis: Kein „Proof of Concept Friedhof“, sondern betreibbarer Wertschöpfungsbaustein.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="btn-primary">Projekt anfragen</Link>
            <Link to="/services" className="btn-secondary">Zurück zur Übersicht</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceCustomSolutionsPage
