import MagneticButton from '@/components/ui/buttons/MagneticButton'
import Seo from '@/components/ui/Seo'
import { ArrowRight, Award } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const PRINCIPLES = [
  {
    title: 'Qualitäts-Gates',
    body: 'Pairing, automatisierte Tests, Observability und klare Definition-of-Done-Kriterien verhindern, dass technische Schulden entstehen.',
  },
  {
    title: 'Design- und Tech-Reviews',
    body: 'Bevor Code live geht, prüfen wir Architektur, Performance und Wartbarkeit. Qualität ist nicht optional, sondern Teil des Prozesses.',
  },
  {
    title: 'Dokumentation als Code',
    body: 'Architecture Decision Records (ADRs) und Inline-Dokumentation halten Wissen lebendig – auch wenn Teams wechseln.',
  },
]

const PROCESS_STEPS = [
  {
    label: '01',
    title: 'Architektur-Planung',
    detail:
      'Wir starten mit einem Technical Design Document (TDD), das Anforderungen, Constraints und Trade-offs dokumentiert. So vermeiden wir Fehlentscheidungen, bevor Code geschrieben wird.',
  },
  {
    label: '02',
    title: 'Iteratives Delivery',
    detail:
      'Statt Monate an Features zu arbeiten, liefern wir in kleinen Inkrementen. Jedes Release ist getestet, dokumentiert und produktionsbereit.',
  },
  {
    label: '03',
    title: 'Observability & Feedback',
    detail:
      'Monitoring, Alerting und Error-Tracking starten mit dem ersten Deploy. So sehen wir Probleme, bevor Nutzer:innen sie spüren.',
  },
]

const EXAMPLES = [
  {
    title: 'Lesbarer Code',
    description:
      'Wir schreiben Code so, dass neue Entwickler:innen ihn in Minuten verstehen. Clean Code und SOLID-Prinzipien sind Standard, nicht Kür.',
  },
  {
    title: 'Automatisierte Tests',
    description:
      'Unit-, Integration- und E2E-Tests sichern Änderungen ab. So können Teams Features schneller ausliefern, ohne Regressionen zu fürchten.',
  },
  {
    title: 'Performance-Budgets',
    description:
      'Jede Seite hat ein Ladezeit-Budget (z.B. < 2s). Wenn neue Features das Budget sprengen, optimieren wir, bevor wir releasen.',
  },
]

const QualitaetPage: React.FC = () => {
  return (
    <div className="bg-bg-darker text-text-light">
      <Seo
        title="Exzellenz als Standard | VAE Systems"
        description="Wie VAE Systems Qualität liefert: saubere Architektur, automatisierte Tests und langfristig wartbare Systeme."
        canonicalPath="/wissen/handwerkskunst-statt-schnellschuss"
      />

      <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-bg-darker via-bg-dark to-bg-darker py-24 dark:border-white/5">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.16),transparent_60%)]" />
        </div>

        <div className="container-vae relative grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/80">
              <Award className="h-4 w-4" /> Qualität
            </span>
            <h1 className="text-balance text-4xl font-semibold leading-tight text-text-light md:text-5xl">
              Exzellenz als Standard — Handwerkskunst statt Schnellschuss
            </h1>
            <p className="text-lg leading-relaxed text-text-secondary">
              Schnelle Hacks kosten langfristig mehr als sauber geplante Systeme. Wir liefern Architektur, die wächst,
              Code, der lesbar bleibt, und Tests, die Änderungen absichern. Qualität ist kein Luxus, sondern die
              günstigste Art, komplexe Plattformen zu betreiben.
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
                <span>Lesbarer Code und Architecture Decision Records beschleunigen Onboarding</span>
              </li>
              <li className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-vae-turquoise">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                <span>Automatisierte Tests und Observability reduzieren Ausfälle</span>
              </li>
              <li className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-vae-turquoise">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                <span>Design- und Tech-Reviews verhindern technische Schulden</span>
              </li>
              <li className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-vae-turquoise">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                <span>Saubere Systeme bleiben günstiger zu betreiben</span>
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
            <h2 className="text-3xl font-semibold text-text-light md:text-4xl">Qualität als Teil des Prozesses</h2>
            <p className="text-base leading-relaxed text-text-secondary">
              Wir planen mit Qualitäts-Gates: Pairing, automatisierte Tests, Observability und klare
              Definition-of-Done-Kriterien. Dadurch bleibt das System verlässlich und Änderungswünsche landen schneller
              in Produktion.
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
            <h2 className="text-3xl font-semibold text-text-light md:text-4xl">So liefern wir Qualität</h2>
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
          <h2 className="text-3xl font-semibold text-text-light md:text-4xl">Qualität zahlt sich langfristig aus</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            Lass uns prüfen, wie wir deine Systeme wartbarer, schneller und robuster machen – durch saubere Architektur,
            automatisierte Tests und klare Prozesse.
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

export default QualitaetPage
