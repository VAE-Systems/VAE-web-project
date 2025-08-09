import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../ui/Seo'

const ServiceTrainingsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="Schulungen | VAE Systems – Enablement & Wissensaufbau"
        description="Hands-on Trainings für Teams: VAE CORE Admin, Prompt Engineering, Datenarchitektur & produktive Automations-Workflows."
        canonicalPath="/services/trainings"
        jsonLd={[{ '@context':'https://schema.org','@type':'Course','name':'VAE CORE Admin Schulung' }]}
      />
      <section className="relative -mt-20 pt-44 pb-24 border-b border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker">
        <div className="container-vae max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold heading-fix mb-8">
            <span className="block text-text-light">Schulungen</span>
            <span className="block text-gradient">Enablement beschleunigt.</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mb-10">Strukturierte Formate statt einmaliger Ad-hoc Sessions. Ziel: Interne Kompetenz, weniger externe Abhängigkeit und sicherer Betrieb.</p>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[{h:'VAE CORE Admin',b:['Install / Upgrade Pfade','Index & Retrieval Basics','Policies & Rollen','Observability Einstieg']},{h:'Prompt / Retrieval',b:['Prompt Patterns','Evaluation Metriken','Context Windows','Halluzination Reduktion']},{h:'Datenarchitektur',b:['Quellenmodellierung','Versionierung','Klassifizierung','Lifecycle & Retention']}].map(c => (
              <div key={c.h} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-sm font-semibold text-white mb-3">{c.h}</h3>
                <ul className="text-xs text-text-secondary space-y-1 leading-relaxed list-disc list-inside">{c.b.map(x => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-14">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-vae-turquoise mb-4">Format & Ablauf</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">Alle Trainings kombinieren kurze Theorieblöcke mit direkt anwendbaren Labs. Umgebung wahlweise bereitgestellt oder Nutzung kundeneigener Infrastruktur.</p>
            <p className="text-sm text-text-secondary leading-relaxed">Erweiterbar um Follow-up Sprechstunden, Code Reviews oder Betriebsbegleitung.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="btn-primary">Anfrage stellen</Link>
            <Link to="/services" className="btn-secondary">Zurück zur Übersicht</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceTrainingsPage
