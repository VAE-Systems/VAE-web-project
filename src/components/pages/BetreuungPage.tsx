import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../ui/Seo'
import { CalendarCheck, ShieldCheck, RefreshCcw, LifeBuoy, CheckCircle2 } from 'lucide-react'

const serviceModules = [
  {
    title: 'Feature-Roadmap & Releases',
    description: 'Monatliche Abstimmung der Prioritäten, Release-Planung und Umsetzung neuer Anforderungen.',
    icon: RefreshCcw,
  },
  {
    title: 'Security & Compliance Checks',
    description: 'Regelmäßige Updates, Patch-Management, Backup-Tests und DSGVO-konforme Dokumentation.',
    icon: ShieldCheck,
  },
  {
    title: 'Support & Incident Handling',
    description: 'Direkter Ansprechpartner, Priorisierung von Tickets und schnelle Reaktionszeiten dank SLA.',
    icon: LifeBuoy,
  },
]

const BetreuungPage: React.FC = () => {
  return (
    <div className="bg-bg-darker text-text-light">
      <Seo
        title="Langfristige Betreuung & Ausbau | VAE Systems"
        description="Wir betreuen Ihre Open-Source-Arbeitsinfrastruktur dauerhaft: Feature-Roadmap, Security, Support und kontinuierliche Optimierung."
        canonicalPath="/betreuung"
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-vae-turquoise/25 bg-gradient-to-br from-bg-dark via-[#12151a] to-bg-dark py-28">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(var(--vae-turquoise-rgb),0.22),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(var(--vae-turquoise-rgb),0.16),transparent_60%)]" />
        </div>
        <div className="container-vae relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-vae-turquoise">
              <CalendarCheck className="h-4 w-4" /> Langfristige Betreuung
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Wir entwickeln Ihre Systeme dauerhaft weiter
            </h1>
            <p className="text-lg leading-relaxed text-text-secondary">
              Statt nach der Implementierung abzutauchen, bleiben wir an Ihrer Seite: Updates, Feature-Releases,
              Security und Support sind Teil eines kontinuierlichen Betreuungsmodells – für nur €289/Monat.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/contact" className="btn-primary flex items-center justify-center gap-2 text-base">
                Betreuung anfragen
              </Link>
              <Link to="/testphase" className="btn-outline flex items-center justify-center gap-2 text-base">
                Erst 3 Monate testen
              </Link>
            </div>
            <p className="text-sm text-text-secondary">
              Infrastruktur-only Betrieb ist ebenfalls möglich:{' '}
              <span className="font-semibold text-text-light">€89/Monat</span>. Wechsel zwischen den Modellen jederzeit
              möglich.
            </p>
          </div>

          <aside className="bg-bg-primary/10 rounded-2xl border border-vae-turquoise/25 p-8 text-sm text-text-secondary">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-vae-turquoise/80">
              Bestandteile unseres Service
            </h3>
            <ul className="space-y-3">
              {serviceModules.map(module => (
                <li key={module.title} className="flex items-start gap-3">
                  <module.icon className="mt-1 h-5 w-5 text-vae-turquoise" />
                  <div>
                    <span className="block font-medium text-text-light">{module.title}</span>
                    <span className="block text-sm text-text-secondary/90">{module.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Service tiers */}
      <section className="border-b border-bg-secondary py-24">
        <div className="container-vae">
          <h2 className="h2 heading-gradient mb-12 text-center text-text-light">Betreuungsmodelle im Überblick</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-bg-primary/10 rounded-2xl border border-vae-turquoise/20 p-6 text-sm text-text-secondary">
              <h3 className="mb-2 text-lg font-semibold text-text-light">Infrastruktur only · €89/Monat</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 h-4 w-4 text-vae-turquoise" />
                  Betrieb & Monitoring Ihrer Systeme
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 h-4 w-4 text-vae-turquoise" />
                  Security-Patches & Backup-Tests
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 h-4 w-4 text-vae-turquoise" />
                  Zugang zu Runbooks & Dokumentationen
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-vae-turquoise/40 bg-vae-turquoise/10 p-6 text-sm text-text-secondary">
              <h3 className="mb-2 text-lg font-semibold text-text-light">Vollservice · €289/Monat</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 h-4 w-4 text-vae-turquoise" />
                  Alle Leistungen des Infrastruktur-Pakets
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 h-4 w-4 text-vae-turquoise" />
                  Kontinuierliche AI-Optimierung & Feature-Rollouts
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 h-4 w-4 text-vae-turquoise" />
                  Monatliche Roadmap- und KPI-Reviews
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 h-4 w-4 text-vae-turquoise" />
                  SLA-gestützter Support & Incident Handling
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BetreuungPage
