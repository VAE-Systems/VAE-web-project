import MagneticButton from '@/components/ui/buttons/MagneticButton'
import Seo from '@/components/ui/Seo'
import { ArrowRight, TrendingUp } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const PRINCIPLES = [
  {
    title: 'Kapazitäts-Planung',
    body: 'Wir planen Systeme nach deinen Drei- bis Fünf-Jahres-Zielen. So wächst Infrastruktur mit, ohne Re-Writes oder Notfall-Migrationen.',
  },
  {
    title: 'Cloud-native wo sinnvoll',
    body: 'Microservices, Event-Streaming und Serverless kommen nur zum Einsatz, wenn sie echten Nutzen bringen – nicht aus Hype.',
  },
  {
    title: 'Observability ab Tag 1',
    body: 'Monitoring, Alerting und Lasttests starten mit dem ersten Deploy. So siehst du Engpässe, bevor sie zum Problem werden.',
  },
]

const PROCESS_STEPS = [
  {
    label: '01',
    title: 'Szenario-Planung',
    detail:
      'Wir definieren Szenarien: doppelter Traffic, neue Märkte, regulatorische Anforderungen. Für jedes Szenario planen wir Architektur, Kosten und Betrieb durch.',
  },
  {
    label: '02',
    title: 'Lastests & Benchmarks',
    detail:
      'Bevor wir live gehen, testen wir mit realistischen Lasten. So wissen wir, wann das System an Grenzen stößt und können proaktiv skalieren.',
  },
  {
    label: '03',
    title: 'Runbooks & Handover',
    detail:
      'Skalierung ist kein Hexenwerk – wenn Prozesse dokumentiert sind. Runbooks und Playbooks sichern den Betrieb im eigenen Team.',
  },
]

const EXAMPLES = [
  {
    title: 'Horizontale Skalierung',
    description:
      'Statt größere Server kaufen wir mehr kleine. So kannst du Kapazität linear hochfahren – ohne Downtime oder teure Refactorings.',
  },
  {
    title: 'Caching-Strategien',
    description:
      'Nicht jede Anfrage muss die Datenbank treffen. Intelligente Caching-Layer (Redis, CDN) reduzieren Last und Kosten um bis zu 80 %.',
  },
  {
    title: 'Event-Driven Architecture',
    description:
      'Asynchrone Events entkoppeln Services und ermöglichen unabhängige Skalierung. Perfekt für Plattformen mit unterschiedlichen Traffic-Mustern.',
  },
]

const SkalierbarkeitPage: React.FC = () => {
  return (
    <div className="bg-bg-darker text-text-light">
      <Seo
        title="Skalierbarkeit als Fundament | VAE Systems"
        description="Wie VAE Systems skalierbare Systeme plant: Cloud-native Patterns, Observability ab Tag 1 und zukunftssichere Architektur."
        canonicalPath="/wissen/skalierbare-architektur"
      />

      <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-bg-darker via-bg-dark to-bg-darker py-24 dark:border-white/5">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.16),transparent_60%)]" />
        </div>

        <div className="container-vae relative grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/80">
              <TrendingUp className="h-4 w-4" /> Skalierbarkeit
            </span>
            <h1 className="text-balance text-4xl font-semibold leading-tight text-text-light md:text-5xl">
              Skalierbarkeit als Fundament — Ideen brauchen Raum
            </h1>
            <p className="text-lg leading-relaxed text-text-secondary">
              Wir planen Plattformen so, dass sie heute effizient laufen und morgen zehnmal so viele Nutzer:innen
              tragen. Kapazitäten, Datenflüsse und Betriebsprozesse werden von Anfang an gemessen. So wächst dein System
              ohne Re-Write und ohne Überraschungskosten.
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton className="inline-flex">
                <Link to="/contact" className="btn-primary flex items-center gap-3">
                  <ArrowRight className="h-4 w-4" /> Projekt besprechen
                </Link>
              </MagneticButton>
              <Link
                to="/ueber-uns/werte"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-text-secondary transition hover:border-vae-turquoise/50 hover:text-text-light"
              >
                Zurück zu den Werten
              </Link>
            </div>
          </div>

          <div className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">Konkreter Nutzen</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-vae-turquoise">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                <span>Kapazitätsplanung orientiert sich an deinen Drei- bis Fünf-Jahres-Zielen</span>
              </li>
              <li className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-vae-turquoise">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                <span>Cloud-native Patterns kommen nur zum Einsatz, wenn sie echten Nutzen bringen</span>
              </li>
              <li className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-vae-turquoise">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                <span>Observability und Alerting starten mit dem ersten Deploy</span>
              </li>
              <li className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-vae-turquoise">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                <span>Runbooks und Handover sichern den Betrieb im eigenen Team</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-black/5 bg-bg-dark py-20 dark:border-white/5">
        <div className="container-vae grid gap-8 md:grid-cols-3">
          {PRINCIPLES.map(principle => (
            <article
              key={principle.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_15px_35px_rgba(0,0,0,0.35)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">Prinzip</p>
              <h2 className="mt-3 text-xl font-semibold text-text-light">{principle.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{principle.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-black/5 bg-gradient-to-b from-bg-dark to-bg-darker py-24 dark:border-white/5">
        <div className="container-vae grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">Ablauf</p>
            <h2 className="text-3xl font-semibold text-text-light md:text-4xl">Von heute auf morgen skalieren</h2>
            <p className="text-base leading-relaxed text-text-secondary">
              Viele Plattformen sind nach dem ersten Wachstumsschub am Limit. Das ist vermeidbar, wenn Skalierungsziele
              von Anfang an Teil des Scope sind. Wir planen Szenarien, testen Lasten und dokumentieren Betriebsprozesse.
            </p>
          </div>
          <div className="space-y-6">
            {PROCESS_STEPS.map(step => (
              <div key={step.label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/60">{step.label}</p>
                <h3 className="mt-2 text-2xl font-semibold text-text-light">{step.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-darker py-24">
        <div className="container-vae">
          <div className="flex flex-col gap-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">Praxis-Beispiele</p>
            <h2 className="text-3xl font-semibold text-text-light md:text-4xl">So skalieren wir Systeme</h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {EXAMPLES.map(example => (
              <article
                key={example.title}
                className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              >
                <h3 className="text-lg font-semibold text-text-light">{example.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{example.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-vae-turquoise/10 bg-gradient-to-br from-bg-dark via-bg-darker to-bg-dark py-24">
        <div className="container-vae text-center">
          <h2 className="text-3xl font-semibold text-text-light md:text-4xl">Wachstum ohne Überraschungen</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            Lass uns prüfen, wie wir deine Systeme auf Wachstum vorbereiten – durch Kapazitäts-Planung, Lasttests und
            klare Skalierungs-Strategien.
          </p>
          <MagneticButton className="mx-auto mt-10 inline-flex">
            <Link to="/contact" className="btn-primary flex min-w-[260px] items-center justify-center gap-3">
              <ArrowRight className="h-4 w-4" /> Erstgespräch buchen
            </Link>
          </MagneticButton>
        </div>
      </section>
    </div>
  )
}

export default SkalierbarkeitPage
