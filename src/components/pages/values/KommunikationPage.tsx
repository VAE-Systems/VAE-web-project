import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import MagneticButton from '@/components/ui/buttons/MagneticButton'
import Seo from '@/components/ui/Seo'
import { ArrowRight, MessageSquare } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const PRINCIPLES = [
  {
    title: 'Zielgruppen-gerechte Updates',
    body: 'C-Level braucht Executive Summaries, Fachbereiche Technical Deep Dives. Wir passen Format und Frequenz an jeden Stakeholder an.',
  },
  {
    title: 'Asynchrone Transparenz',
    body: 'Loom-Videos, annotierte Screenshots und schriftliche Status-Updates halten alle auf dem gleichen Stand – ohne endlose Meetings.',
  },
  {
    title: 'Frühwarnsystem',
    body: 'Probleme, Verzögerungen und Budgetverschiebungen melden wir sofort – inklusive Handlungsempfehlung. Keine Überraschungen am Ende.',
  },
]

const PROCESS_STEPS = [
  {
    label: '01',
    title: 'Kommunikationsarchitektur',
    detail:
      'Zu Projektbeginn definieren wir: Wer braucht welche Info, in welchem Takt und in welcher Tiefe? So vermeiden wir Info-Overload und Info-Gaps.',
  },
  {
    label: '02',
    title: 'Workshops & Translation',
    detail:
      'Komplexe Technik übersetzen wir in Entscheidungs-Vorlagen für Business-Teams. Keine Buzzwords, sondern klare Vor- und Nachteile jeder Option.',
  },
  {
    label: '03',
    title: 'Eskalations-Protokoll',
    detail:
      'Wenn etwas schiefläuft, eskalieren wir nach einem klaren Protokoll – strukturiert, dokumentiert und mit konkreten nächsten Schritten.',
  },
]

const EXAMPLES = [
  {
    title: 'Status-Reports mit Kontext',
    description:
      'Statt "Feature X ist zu 70 % fertig" schreiben wir: "Feature X ist API-seitig fertig, Frontend fehlt noch – erwartete Fertigstellung: Freitag."',
  },
  {
    title: 'Stakeholder-Matrix',
    description:
      'Wir erstellen eine Matrix, die zeigt, wer welche Entscheidung treffen kann und muss. So vermeiden wir Verantwortungs-Ping-Pong.',
  },
  {
    title: 'Change-Kommunikation',
    description:
      'Wenn sich Scope, Budget oder Timeline ändert, dokumentieren wir den Grund, die Auswirkungen und die neuen Erwartungen – schriftlich und bestätigt.',
  },
]

const KOMMUNIKATION_BREADCRUMBS = [
  { label: 'Home', path: '/' },
  { label: 'Wissen' },
  { label: 'Kommunikation', path: '/wissen/klare-projektkommunikation' },
]

const KommunikationPage: React.FC = () => {
  return (
    <div className="bg-bg-darker text-text-light">
      <Seo
        title="Klare Kommunikation | VAE Systems"
        description="Wie VAE Systems Projektkommunikation strukturiert: Stakeholder-Updates, frühzeitige Warnungen und zielgruppen-gerechte Formate."
        canonicalPath="/wissen/klare-projektkommunikation"
      />
      <Breadcrumbs items={KOMMUNIKATION_BREADCRUMBS} className="mb-4" />

      <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-bg-darker via-bg-dark to-bg-darker py-24 dark:border-white/5">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.16),transparent_60%)]" />
        </div>

        <div className="container-vae relative grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/80">
              <MessageSquare className="h-4 w-4" /> Kommunikation
            </span>
            <h1 className="text-balance text-4xl font-semibold leading-tight text-text-light md:text-5xl">
              Klare Kommunikation — Die Grundlage für Erfolg
            </h1>
            <p className="text-lg leading-relaxed text-text-secondary">
              Sie erhalten Klartext statt Buzzword-Salven. Wir melden Abweichungen unmittelbar – nicht erst im
              Monatsreport. Jede Zielgruppe erhält das Format, das sie braucht, damit Ihr Projekt steuerbar bleibt. So
              wissen Sie jederzeit, was als Nächstes passiert.
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton className="inline-flex">
                <Link to="/contact" className="btn-primary flex items-center gap-3">
                  <ArrowRight className="h-4 w-4" /> Projekt besprechen
                </Link>
              </MagneticButton>
              <Link to="/ueber-uns/werte" className="btn-ghost inline-flex items-center gap-2">
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
                <span>Workshops übersetzen komplexe Technik in Entscheidungen für Business-Teams</span>
              </li>
              <li className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-vae-turquoise">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                <span>Status-Reports zeigen Abweichungen früh statt im Nachgang</span>
              </li>
              <li className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-vae-turquoise">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                <span>Stakeholder erhalten personalisierte Updates – C-Level, Fachbereiche, Betriebsrat</span>
              </li>
              <li className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-vae-turquoise">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                <span>Entscheidungen werden schriftlich bestätigt, damit niemand überrascht wird</span>
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
            <h2 className="text-3xl font-semibold text-text-light md:text-4xl">
              Strukturierte Kommunikation von Anfang an
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              Wir starten jedes Mandat mit einer Kommunikationsarchitektur: Wer braucht welche Information, in welchem
              Takt und in welcher Tiefe? So verschwinden Missverständnisse, bevor sie teuer werden.
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
            <h2 className="text-3xl font-semibold text-text-light md:text-4xl">So kommunizieren wir bei VAE</h2>
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
          <h2 className="text-3xl font-semibold text-text-light md:text-4xl">Kommunikation als Erfolgsfaktor</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            Lassen Sie uns prüfen, wie wir Ihre Stakeholder-Kommunikation strukturieren, Eskalationsprozesse definieren
            und Missverständnisse vermeiden können.
          </p>
          <MagneticButton className="mx-auto mt-10 inline-flex">
            <a
              href="https://nc.intern.vae.systems/apps/calendar/appointment/RgxJERqNkfZz"
              target="_blank"
              rel="noreferrer"
              className="btn-primary flex min-w-[260px] items-center justify-center gap-3"
            >
              <ArrowRight className="h-4 w-4" /> Erstgespräch buchen
            </a>
          </MagneticButton>
        </div>
      </section>
    </div>
  )
}

export default KommunikationPage
