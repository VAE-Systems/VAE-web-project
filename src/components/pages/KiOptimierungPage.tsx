import { BarChart3, BrainCircuit, CheckCircle2, Timer, Workflow } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import MagneticButton from '../ui/buttons/MagneticButton'
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
    <div className="relative z-0 bg-bg-darker text-text-light">
      <Seo
        title="AI-Workflow Optimierung – Prozesse automatisieren | VAE Systems"
        description="Wir entwickeln AI-gestützte Workflows für Ihre Arbeitsinfrastruktur: Dokumentenverarbeitung, Service-Automation, Analytics und kontinuierliche Optimierung."
        canonicalPath="/ki-optimierung"
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#030806] py-20 text-white sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(var(--vae-turquoise-rgb),0.12),transparent_35%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-vae-turquoise" />
        <div className="pointer-events-none absolute right-[-4vw] top-8 hidden select-none text-[18vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.03] xl:block">
          VAE
        </div>

        <div className="container-vae relative z-10 py-4">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex w-fit items-center gap-2 border border-vae-turquoise/35 bg-black px-4 py-2 text-[11px] font-bold uppercase tracking-[0.34em] text-vae-turquoise">
                <BrainCircuit className="h-3.5 w-3.5" /> AI Workflow Optimierung
              </div>
              <h1 className="max-w-3xl">
                <span className="block text-[12vw] font-black uppercase leading-[0.88] tracking-[-0.08em] text-white sm:text-5xl lg:text-[4.8rem]">
                  KI-Automation.
                </span>
                <span className="mt-2 inline-block bg-vae-turquoise px-3 py-2 text-[9vw] font-black uppercase leading-[0.88] tracking-[-0.08em] text-black sm:px-5 sm:py-3 sm:text-4xl lg:text-[3.8rem]">
                  Messbar. Kontrolliert.
                </span>
              </h1>
              <div className="max-w-2xl border-l-4 border-white pl-4 text-base leading-relaxed text-white/75 sm:text-lg">
                Wir automatisieren wiederkehrende Aufgaben, verknüpfen Systeme und messen die Wirkung. Jede Iteration
                bringt neue Effizienzgewinne – ohne Kontrollverlust.
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <MagneticButton intensity={0.08} scaleEffect glowEffect className="isolate w-full sm:w-auto">
                  <Link
                    to="/contact"
                    className="flex w-full items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-black transition-transform hover:-translate-y-0.5 sm:w-auto"
                  >
                    Potenzialanalyse buchen
                  </Link>
                </MagneticButton>
                <MagneticButton intensity={0.05} scaleEffect className="isolate w-full sm:w-auto">
                  <Link
                    to="/testphase"
                    className="flex w-full items-center justify-center gap-2 border border-white/20 bg-transparent px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-vae-turquoise hover:bg-white/5 sm:w-auto"
                  >
                    In Testphase ausprobieren
                  </Link>
                </MagneticButton>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="border border-white/10 bg-white/[0.04] px-4 py-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-vae-turquoise">Ergebnis</p>
                  <p className="mt-0.5 text-sm font-bold text-white">2–3h Zeitgewinn / Woche</p>
                </div>
                <div className="border border-white/10 bg-white/[0.04] px-4 py-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-vae-turquoise">Ansatz</p>
                  <p className="mt-0.5 text-sm font-bold text-white">Iterativ, messbar</p>
                </div>
              </div>
            </div>

            <aside className="border border-vae-turquoise/25 bg-white/[0.03] p-8 text-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-vae-turquoise">
                Häufige AI-Anwendungsfälle
              </p>
              <ul className="mt-5 space-y-4">
                {useCases.map(item => (
                  <li key={item.title} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-vae-turquoise" />
                    <div>
                      <span className="block font-bold uppercase tracking-[0.1em] text-white">{item.title}</span>
                      <span className="block text-sm leading-relaxed text-white/60">{item.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* Iteration cycle */}
      <section className="border-black/8 border-b bg-[#f4f1ec] py-24 dark:border-white/5 dark:bg-bg-dark">
        <div className="container-vae">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-vae-turquoise">Prozess</p>
          <h2 className="mt-3 text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-gray-900 dark:text-white md:text-5xl">
            Unser Optimierungszyklus
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {optimisationCycle.map((step, i) => (
              <div
                key={step}
                className="border border-vae-turquoise/25 bg-white/90 p-6 text-sm leading-relaxed text-gray-700 dark:border-vae-turquoise/20 dark:bg-white/[0.03] dark:text-white/70"
              >
                <span className="mb-3 block text-xs font-black uppercase tracking-[0.28em] text-vae-turquoise">
                  Schritt {i + 1}
                </span>
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="bg-[#faf8f4] py-24 dark:bg-bg-darker">
        <div className="container-vae">
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-vae-turquoise">Ergebnisse</p>
          <h2 className="mt-3 text-center text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-gray-900 dark:text-white md:text-5xl">
            Messbare Wirkung
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="border border-vae-turquoise/25 bg-white/90 p-6 text-center dark:border-vae-turquoise/20 dark:bg-white/[0.03]">
              <Timer className="mx-auto mb-4 h-9 w-9 text-vae-turquoise" />
              <div className="text-5xl font-black tracking-[-0.06em] text-vae-turquoise">2–3h</div>
              <p className="mt-2 text-sm text-gray-700 dark:text-white/60">Zeitgewinn pro Mitarbeiter*in &amp; Woche</p>
            </div>
            <div className="border border-vae-turquoise/25 bg-white/90 p-6 text-center dark:border-vae-turquoise/20 dark:bg-white/[0.03]">
              <Workflow className="mx-auto mb-4 h-9 w-9 text-vae-turquoise" />
              <div className="text-5xl font-black tracking-[-0.06em] text-vae-turquoise">60%</div>
              <p className="mt-2 text-sm text-gray-700 dark:text-white/60">Weniger manuelle Prozesse nach 90 Tagen</p>
            </div>
            <div className="border border-vae-turquoise/25 bg-white/90 p-6 text-center dark:border-vae-turquoise/20 dark:bg-white/[0.03]">
              <BarChart3 className="mx-auto mb-4 h-9 w-9 text-vae-turquoise" />
              <div className="text-5xl font-black tracking-[-0.06em] text-vae-turquoise">100%</div>
              <p className="mt-2 text-sm text-gray-700 dark:text-white/60">
                Transparenz über KPIs &amp; Entscheidungsgrundlagen
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default KiOptimierungPage
