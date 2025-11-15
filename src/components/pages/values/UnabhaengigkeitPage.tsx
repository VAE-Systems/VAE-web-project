import MagneticButton from '@/components/ui/buttons/MagneticButton'
import Seo from '@/components/ui/Seo'
import { ArrowRight, Unlock } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const PRINCIPLES = [
  {
    title: 'Open Standards First',
    body: 'Wir setzen auf offene Standards (REST, GraphQL, PostgreSQL, Kubernetes), damit du jederzeit Komponenten austauschen kannst.',
  },
  {
    title: 'Dokumentierte Schlüsselentscheidungen',
    body: 'Architecture Decision Records (ADRs) erklären, warum wir bestimmte Tools gewählt haben – und wie du sie ersetzen kannst.',
  },
  {
    title: 'Ownership bei dir',
    body: 'Du besitzt Deployment-Pipelines, Cloud-Accounts und Zugangsdaten. Kein Vendor-Lock-in, keine versteckten Abhängigkeiten.',
  },
]

const PROCESS_STEPS = [
  {
    label: '01',
    title: 'Abhängigkeits-Audit',
    detail:
      'Wir analysieren, an wen oder was du gebunden bist: proprietäre Tools, einzelne Personen, überalterte Hosting-Verträge. Dann priorisieren wir die größten Risiken.',
  },
  {
    label: '02',
    title: 'Migrations-Roadmap',
    detail:
      'Wir ersetzen kritische Komponenten durch offene Alternativen oder orchestrieren Übergangsmodelle. Wichtig ist, dass du Infrastruktur, Code und Zugangsdaten selbst kontrollierst.',
  },
  {
    label: '03',
    title: 'Handover & Training',
    detail:
      'Nach der Migration trainieren wir dein Team, damit es Systeme eigenständig betreiben kann. Runbooks, Monitoring und Notfallpläne sind Teil des Deliverys.',
  },
]

const EXAMPLES = [
  {
    title: 'Offene APIs statt Vendor-Plattformen',
    description:
      'Wir bauen API-First-Systeme, die mit jedem Frontend, Backend oder Integrations-Tool funktionieren. So bleibst du flexibel, wenn sich deine Anforderungen ändern.',
  },
  {
    title: 'Cloud-Agnostisch',
    description:
      'Infrastruktur-Code (Terraform, Pulumi) funktioniert auf AWS, Azure und GCP. Du kannst Provider wechseln, ohne von vorn zu beginnen.',
  },
  {
    title: 'Key-Person-Risk minimieren',
    description:
      'Wir dokumentieren Prozesse so, dass kein einzelner Entwickler kritisch wird. Onboarding-Guides und Runbooks halten Wissen zugänglich.',
  },
]

const UnabhaengigkeitPage: React.FC = () => {
  return (
    <div className="bg-bg-darker text-text-light">
      <Seo
        title="Unabhängigkeit & Freiheit | VAE Systems"
        description="Wie VAE Systems technologische Souveränität sichert: Vendor-Lock-ins vermeiden, offene Standards nutzen und vollständige Ownership garantieren."
        canonicalPath="/wissen/vendor-lock-in-vermeiden"
      />

      <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-bg-darker via-bg-dark to-bg-darker py-24 dark:border-white/5">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.16),transparent_60%)]" />
        </div>

        <div className="container-vae relative grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/80">
              <Unlock className="h-4 w-4" /> Unabhängigkeit
            </span>
            <h1 className="text-balance text-4xl font-semibold leading-tight text-text-light md:text-5xl">
              Unabhängigkeit & Freiheit — Das Recht zu wählen
            </h1>
            <p className="text-lg leading-relaxed text-text-secondary">
              Du kannst morgen den Partner wechseln, ohne dein System zu verlieren. Wir planen offene Schnittstellen,
              dokumentieren Schlüsselentscheidungen und vermeiden proprietäre Lizenzfallen. So bleibt deine Organisation
              souverän – unabhängig davon, wer liefert.
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
                <span>Vendor-Lock-ins werden identifiziert und durch offene Alternativen ersetzt</span>
              </li>
              <li className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-vae-turquoise">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                <span>Schlüsselprozesse sind dokumentiert, damit kein Einzelner kritisch ist</span>
              </li>
              <li className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-vae-turquoise">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                <span>Architekturentscheidungen priorisieren austauschbare Komponenten</span>
              </li>
              <li className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-vae-turquoise">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                <span>Du besitzt Deployment-Pipelines und Zugänge selbst</span>
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
            <h2 className="text-3xl font-semibold text-text-light md:text-4xl">Von Abhängigkeit zu Souveränität</h2>
            <p className="text-base leading-relaxed text-text-secondary">
              Echte Partnerschaft entsteht, wenn beide Seiten freiwillig bleiben. Deshalb analysieren wir zuerst, an wen
              oder was du gebunden bist – und bauen dann einen Plan, um diese Abhängigkeiten zu reduzieren.
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
            <h2 className="text-3xl font-semibold text-text-light md:text-4xl">So sichern wir Unabhängigkeit</h2>
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
          <h2 className="text-3xl font-semibold text-text-light md:text-4xl">Technologische Souveränität aufbauen</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            Lass uns prüfen, wie wir deine Abhängigkeiten reduzieren, kritische Systeme dokumentieren und dein Team
            befähigen können, Infrastruktur eigenständig zu betreiben.
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

export default UnabhaengigkeitPage
