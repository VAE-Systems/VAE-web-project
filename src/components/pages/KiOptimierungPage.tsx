import { BarChart3, BrainCircuit, CheckCircle2, Timer, Workflow } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../ui/Seo'

const useCases = [
  {
    title: 'Dokumenten-Automation',
    description:
      'Eingehende Dokumente werden automatisch kategorisiert, verarbeitet und in Nextcloud/CRM abgelegt – inklusive Extraktion relevanter Informationen.',
  },
  {
    title: 'Service- & Support-Workflows',
    description:
      'Tickets werden priorisiert, Antworten vorbereitet und an die richtigen Personen verteilt. Ihr Team spart mehrere Stunden pro Woche.',
  },
  {
    title: 'Analytics & Reporting',
    description:
      'Daten aus CRM, Kommunikation und Workflows werden automatisch ausgewertet. Dashboards liefern Entscheidungsgrundlagen in Echtzeit.',
  },
]

const optimisationCycle = [
  'Analyse & Messpunkte definieren – Welche Prozesse kosten Zeit? Welche KPIs messen Erfolg?',
  'Prototyp & Validierung – Wir entwickeln einen fokussierten Workflow, testen ihn gemeinsam und messen den Effekt.',
  'Rollout & Training – Automationen gehen live, das Team erhält Playbooks, und wir überwachen den Betrieb.',
  'Iteration & Ausbau – Alle 4–6 Wochen evaluieren wir neue Potenziale und erweitern den Automationsumfang.',
]

const KiOptimierungPage: React.FC = () => {
  return (
    <div className="bg-bg-darker text-text-light">
      <Seo
        title="AI-Workflow Optimierung – Prozesse automatisieren | VAE Systems"
        description="Wir entwickeln AI-gestützte Workflows für Ihre Arbeitsinfrastruktur: Dokumentenverarbeitung, Service-Automation, Analytics und kontinuierliche Optimierung."
        canonicalPath="/ki-optimierung"
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-vae-turquoise/25 bg-gradient-to-br from-bg-dark via-[#0f1f1f] to-bg-dark py-28">
        <div className="pointer-events-none absolute inset-0 opacity-35">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(var(--vae-turquoise-rgb),0.22),transparent_55%),radial-gradient(circle_at_80%_35%,rgba(var(--vae-turquoise-rgb),0.16),transparent_60%)]" />
        </div>
        <div className="container-vae relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-vae-turquoise">
              <BrainCircuit className="h-4 w-4" /> AI Workflow Optimierung
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Mit KI Prozesse kontinuierlich verbessern
            </h1>
            <p className="text-lg leading-relaxed text-text-secondary">
              Wir automatisieren wiederkehrende Aufgaben, verknüpfen Systeme und messen die Wirkung. Jede Iteration
              bringt neue Effizienzgewinne – ohne Kontrollverlust oder komplizierte Handoffs.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/contact" className="btn-primary flex items-center justify-center gap-2 text-base">
                Potenzialanalyse buchen
              </Link>
              <Link to="/testphase" className="btn-outline flex items-center justify-center gap-2 text-base">
                In Testphase ausprobieren
              </Link>
            </div>
            <p className="text-sm text-text-secondary">
              Typische Ergebnisse: <span className="font-semibold text-text-light">2–3 Stunden Zeitgewinn</span> pro
              Mitarbeiter*in und messbare Qualitätssteigerungen in Service & Dokumentation.
            </p>
          </div>

          <aside className="bg-bg-primary/10 rounded-2xl border border-vae-turquoise/25 p-8 text-sm text-text-secondary">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-vae-turquoise/80">
              Häufige AI-Anwendungsfälle
            </h3>
            <ul className="space-y-3">
              {useCases.map(item => (
                <li key={item.title} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 text-vae-turquoise" />
                  <div>
                    <span className="block font-medium text-text-light">{item.title}</span>
                    <span className="block text-sm text-text-secondary/90">{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Iteration cycle */}
      <section className="border-b border-bg-secondary py-24">
        <div className="container-vae">
          <h2 className="h2 heading-gradient mb-10 text-text-light">Unser Optimierungszyklus</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {optimisationCycle.map(step => (
              <div
                key={step}
                className="bg-bg-primary/10 rounded-2xl border border-vae-turquoise/20 p-6 text-sm leading-relaxed text-text-secondary"
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="py-24">
        <div className="container-vae">
          <h2 className="h2 heading-gradient mb-12 text-center text-text-light">Messbare Wirkung</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-bg-primary/10 rounded-2xl border border-vae-turquoise/20 p-6 text-center">
              <Timer className="mx-auto mb-4 h-9 w-9 text-vae-turquoise" />
              <div className="text-3xl font-semibold text-text-light">2–3h</div>
              <p className="mt-2 text-sm text-text-secondary">Zeitgewinn pro Mitarbeiter*in & Woche</p>
            </div>
            <div className="bg-bg-primary/10 rounded-2xl border border-vae-turquoise/20 p-6 text-center">
              <Workflow className="mx-auto mb-4 h-9 w-9 text-vae-turquoise" />
              <div className="text-3xl font-semibold text-text-light">60%</div>
              <p className="mt-2 text-sm text-text-secondary">Weniger manuelle Prozesse nach 90 Tagen</p>
            </div>
            <div className="bg-bg-primary/10 rounded-2xl border border-vae-turquoise/20 p-6 text-center">
              <BarChart3 className="mx-auto mb-4 h-9 w-9 text-vae-turquoise" />
              <div className="text-3xl font-semibold text-text-light">100%</div>
              <p className="mt-2 text-sm text-text-secondary">Transparenz über KPIs & Entscheidungsgrundlagen</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default KiOptimierungPage
