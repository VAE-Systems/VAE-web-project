import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import MagneticButton from '@/components/ui/buttons/MagneticButton'
import Seo from '@/components/ui/Seo'
import { ArrowRight, Shield } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const PRINCIPLES = [
  {
    title: 'Open Source First',
    body: 'Proprietäre Tools binden Sie langfristig. Open Source gibt Ihnen Kontrolle, Anpassbarkeit und die Freiheit, jederzeit den Partner zu wechseln.',
  },
  {
    title: 'Dokumentation als Standard',
    body: 'Jede Entscheidung wird in Git, eigenen Notiz-Sharing-Systemen oder Tickets festgehalten. So können Sie jederzeit nachvollziehen, warum etwas so gebaut wurde.',
  },
  {
    title: 'Live-Transparenz',
    body: 'Statusupdates landen direkt in Ihren Tools – nicht erst im Monatsreport. Sie sehen Fortschritt und Probleme in Echtzeit.',
  },
]

const PROCESS_STEPS = [
  {
    label: '01',
    title: 'Zugänge & Ownership',
    detail:
      'Sie erhalten Admin-Rechte auf allen Repositories, Cloud-Accounts und Deployment-Pipelines. Keine Black Boxes, keine Abhängigkeiten.',
  },
  {
    label: '02',
    title: 'Architektur-Dokumentation',
    detail:
      'Architecture Decision Records (ADRs) erklären, warum wir bestimmte Technologien gewählt haben und welche Alternativen wir verworfen haben.',
  },
  {
    label: '03',
    title: 'Audits & Reviews',
    detail:
      'Code, Infrastruktur und Sicherheitskonzepte werden versioniert und sind jederzeit auditierbar – intern oder durch externe Prüfer.',
  },
]

const EXAMPLES = [
  {
    title: 'Git als Single Source of Truth',
    description:
      'Infrastruktur-Code, Deployment-Skripte und Dokumentation liegen in Ihren Repos. Kein Vendor-Lock-in, keine versteckten Konfigurationen.',
  },
  {
    title: 'Pull Requests mit Kontext',
    description:
      'Wir kommentieren jeden PR so, dass auch Nicht-Entwickler:innen verstehen, was sich ändert und warum. Transparenz für alle Stakeholder.',
  },
  {
    title: 'Retrospektiven & Learnings',
    description:
      'Nach jedem Sprint dokumentieren wir, was gut lief und was nicht. Diese Learnings bleiben zugänglich und fließen in zukünftige Projekte ein.',
  },
]

const TRANSPARENZ_BREADCRUMBS = [
  { label: 'Home', path: '/' },
  { label: 'Wissen' },
  { label: 'Transparenz', path: '/wissen/transparenz-open-source' },
]

const TransparenzPage: React.FC = () => {
  return (
    <div className="bg-bg-darker text-text-light">
      <Seo
        title="Transparenz & Open Source | VAE Systems"
        description="Wie VAE Systems Transparenz lebt: Open Source First, Live-Dokumentation und vollständige Ownership für Ihre Organisation."
        canonicalPath="/wissen/transparenz-open-source"
      />
      <Breadcrumbs items={TRANSPARENZ_BREADCRUMBS} className="mb-4" />

      <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-bg-darker via-bg-dark to-bg-darker py-24 dark:border-white/5">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.16),transparent_60%)]" />
        </div>

        <div className="container-vae relative grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/80">
              <Shield className="h-4 w-4" /> Transparenz
            </span>
            <h1 className="text-balance text-4xl font-semibold leading-tight text-text-light md:text-5xl">
              Transparenz & Ehrlichkeit — Der Anfang von Vertrauen
            </h1>
            <p className="text-lg leading-relaxed text-text-secondary">
              Sie sehen jede Entscheidung – Architektur, Budget, Risiken – weil sie direkt in Ihren Tools dokumentiert
              wird. Wir kommentieren Pull Requests so, dass Sie sie auch als Nicht-Entwicklerin nachvollziehen können.
              Open Source als Prinzip bedeutet, dass Sie Code, Infrastruktur und Daten behalten.
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
                <span>
                  Live-Dokumentation in Git, eigenen Notiz-Sharing-Systemen und Tickets statt Präsentationen im Nachgang
                </span>
              </li>
              <li className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-vae-turquoise">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                <span>Kunden-Accounts in unseren Systemen ermöglichen direkten Austausch und Kollaboration</span>
              </li>
              <li className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-vae-turquoise">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                <span>Risiken und Annahmen werden sofort gekennzeichnet – kein Schönreden</span>
              </li>
              <li className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-vae-turquoise">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                <span>Open-Source-Stacks geben Ihnen die volle Kontrolle über Code und Infrastruktur</span>
              </li>
              <li className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-vae-turquoise">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                <span>Audits bleiben möglich, weil jedes Artefakt versioniert ist</span>
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
            <h2 className="text-3xl font-semibold text-text-light md:text-4xl">Transparenz von Tag 1 an</h2>
            <p className="text-base leading-relaxed text-text-secondary">
              Wir starten jedes Projekt mit einem Onboarding in Ihre Tools: Git, eigene Notiz-Sharing-Systeme, Tickets,
              Slack. Sie erhalten Admin-Rechte und sehen jeden Commit, jedes Ticket, jede Entscheidung – live und
              ungefiltert.
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

      <section className="border-b border-black/5 bg-bg-dark py-20 dark:border-white/5">
        <div className="container-vae">
          <div className="mx-auto max-w-3xl">
            <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <picture>
                <source srcSet="/images/optimized/Bild-von-OpenProject-Ticketing-Software-3.jpg" type="image/jpeg" />
                <img
                  src="/images/optimized/Bild-von-OpenProject-Ticketing-Software-3.jpg"
                  alt="Live-Dokumentation in OpenProject: Tickets, Zeiterfassung und Projektstatus in Echtzeit"
                  loading="lazy"
                  className="h-full w-full object-cover"
                  width={1600}
                  height={1067}
                  sizes="(min-width: 1024px) 800px, 90vw"
                />
              </picture>
            </div>
            <p className="mt-6 text-center text-sm leading-relaxed text-text-secondary">
              Live-Dokumentation in OpenProject: Sie sehen Tickets, Zeiterfassung und Projektstatus in Echtzeit – keine
              versteckten Statusupdates.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bg-darker py-24">
        <div className="container-vae">
          <div className="flex flex-col gap-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">Praxis-Beispiele</p>
            <h2 className="text-3xl font-semibold text-text-light md:text-4xl">So sieht Transparenz bei VAE aus</h2>
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
          <h2 className="text-3xl font-semibold text-text-light md:text-4xl">
            Transparenz als Wettbewerbsvorteil nutzen
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            Lassen Sie uns prüfen, wie wir Ihre Prozesse, Entscheidungen und Systeme nachvollziehbarer machen – für Ihr
            Team, Ihre Stakeholder und externe Audits.
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

export default TransparenzPage
