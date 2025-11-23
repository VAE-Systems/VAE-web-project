import MagneticButton from '@/components/ui/buttons/MagneticButton'
import Seo from '@/components/ui/Seo'
import { ArrowRight, Unlock } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const PRINCIPLES = [
  {
    title: 'Open Standards First',
    body: 'Wir setzen auf offene Standards (REST, GraphQL, PostgreSQL, Kubernetes), damit Sie jederzeit Komponenten austauschen können.',
  },
  {
    title: 'Dokumentierte Schlüsselentscheidungen',
    body: 'Wir dokumentieren, warum wir bestimmte Tools gewählt haben und wie Sie sie ersetzen können, falls Sie sich umentscheiden.',
  },
  {
    title: 'Ownership bei Ihnen',
    body: 'Sie besitzen Server-Zugänge, Datenbanken und Backup-Systeme. Kein Vendor-Lock-in, keine versteckten Abhängigkeiten.',
  },
]

const PROCESS_STEPS = [
  {
    label: '01',
    title: 'Abhängigkeits-Audit',
    detail:
      'Wir analysieren, an wen oder was Sie gebunden sind: proprietäre Tools, einzelne Personen, überalterte Hosting-Verträge. Dann priorisieren wir die größten Risiken.',
  },
  {
    label: '02',
    title: 'Migrations-Roadmap',
    detail:
      'Wir ersetzen kritische Komponenten durch offene Alternativen und planen Übergangsmodelle. Wichtig ist, dass Sie Infrastruktur, Code und Zugangsdaten selbst kontrollieren.',
  },
  {
    label: '03',
    title: 'Handover & Training',
    detail:
      'Nach der Migration trainieren wir Ihr Team, damit es Systeme eigenständig betreiben kann. Runbooks, Monitoring und Notfallpläne sind Teil des Deliverys.',
  },
]

const EXAMPLES = [
  {
    title: 'Offene APIs statt Vendor-Plattformen',
    description:
      'Wir bauen API-First-Systeme, die mit jedem Frontend, Backend oder Integrations-Tool funktionieren. So bleiben Sie flexibel, wenn sich Ihre Anforderungen ändern.',
  },
  {
    title: 'Hosting-Unabhängigkeit',
    description:
      'Wir setzen auf deutsche Hosting-Anbieter wie Contabo, Hetzner und netcup. Wenn Sie den Anbieter wechseln wollen, migrieren wir Ihre Infrastruktur ohne Datenverlust.',
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
              Sie können morgen den Partner wechseln, ohne Ihr System zu verlieren. Wir planen offene Schnittstellen,
              dokumentieren Schlüsselentscheidungen und vermeiden proprietäre Lizenzfallen. So bleibt Ihre Organisation
              souverän – unabhängig davon, wer liefert.
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
                <span>Sie besitzen Deployment-Pipelines und Zugänge selbst</span>
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
              oder was Sie gebunden sind – und bauen dann einen Plan, um diese Abhängigkeiten zu reduzieren.
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
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-semibold text-text-light md:text-4xl">Jakob & die Freiheit der Software</h2>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-text-secondary">
                Jakob Dünnebeil (CTO von VAE Systems) ist ein überzeugter Verfechter freier Software. Für ihn ist
                technologische Unabhängigkeit kein Nice-to-have, sondern ein Kernwert – und ein immer seltener
                verfügbares Gut auf den aktuellen Märkten.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-[24px] border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 hover:shadow-[0_30px_80px_rgba(var(--color-vae-turquoise-rgb),0.2)] dark:border-white/10 dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              {/* Gradient background - light/dark mode */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-white transition-all duration-700 dark:from-bg-dark dark:via-bg-darker dark:to-black" />

              {/* Animated grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(var(--color-vae-turquoise-rgb), 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--color-vae-turquoise-rgb), 0.5) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Subtle particles */}
              <div className="absolute inset-0 z-[3]">
                <div className="absolute left-[10%] top-[30%] h-1 w-1 animate-[particle-float_8s_ease-in-out_infinite] rounded-full bg-vae-turquoise/60 dark:bg-vae-turquoise/40" />
                <div className="absolute left-[85%] top-[45%] h-1 w-1 animate-[particle-float_7s_ease-in-out_1s_infinite] rounded-full bg-vae-turquoise/50 dark:bg-vae-turquoise/30" />
                <div className="absolute left-[50%] top-[80%] h-1 w-1 animate-[particle-float_9s_ease-in-out_2s_infinite] rounded-full bg-vae-turquoise/55 dark:bg-vae-turquoise/35" />
                <div className="absolute left-[20%] top-[90%] h-1 w-1 animate-[particle-float_6s_ease-in-out_1.5s_infinite] rounded-full bg-vae-turquoise/45 dark:bg-vae-turquoise/25" />
                <div className="absolute left-[75%] top-[85%] h-1 w-1 animate-[particle-float_8s_ease-in-out_0.5s_infinite] rounded-full bg-vae-turquoise/50 dark:bg-vae-turquoise/30" />
              </div>

              {/* Floating security/freedom symbols */}
              <div className="absolute inset-0 z-[5]">
                {/* Lock/Unlock Symbol */}
                <div className="absolute left-[15%] top-[20%] animate-[float-fade_4s_ease-in-out_infinite] text-vae-turquoise/50 dark:text-vae-turquoise/30">
                  <svg
                    className="h-12 w-12 drop-shadow-[0_0_8px_rgba(var(--color-vae-turquoise-rgb),0.4)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 11V7a4 4 0 0 1 8 0m-4 8v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2z" />
                  </svg>
                </div>

                {/* Shield/Security Symbol */}
                <div className="absolute left-[70%] top-[15%] animate-[float-fade_4s_ease-in-out_0.8s_infinite] text-vae-turquoise/45 dark:text-vae-turquoise/25">
                  <svg
                    className="h-14 w-14 drop-shadow-[0_0_8px_rgba(var(--color-vae-turquoise-rgb),0.4)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>

                {/* Code/Open Source Symbol */}
                <div className="absolute left-[40%] top-[65%] animate-[float-fade_4s_ease-in-out_1.6s_infinite] text-vae-turquoise/50 dark:text-vae-turquoise/30">
                  <svg
                    className="h-10 w-10 drop-shadow-[0_0_8px_rgba(var(--color-vae-turquoise-rgb),0.4)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>

                {/* Key/Freedom Symbol */}
                <div className="absolute left-[25%] top-[70%] animate-[float-fade_4s_ease-in-out_2.4s_infinite] text-vae-turquoise/40 dark:text-vae-turquoise/20">
                  <svg
                    className="h-11 w-11 drop-shadow-[0_0_8px_rgba(var(--color-vae-turquoise-rgb),0.4)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>

                {/* Connection lines between symbols */}
                <svg className="absolute inset-0 h-full w-full" style={{ pointerEvents: 'none' }}>
                  <line
                    x1="15%"
                    y1="20%"
                    x2="40%"
                    y2="65%"
                    stroke="rgba(var(--color-vae-turquoise-rgb), 0.2)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="animate-[pulse_3s_ease-in-out_infinite] dark:stroke-[rgba(var(--color-vae-turquoise-rgb),0.1)]"
                  />
                  <line
                    x1="70%"
                    y1="15%"
                    x2="40%"
                    y2="65%"
                    stroke="rgba(var(--color-vae-turquoise-rgb), 0.2)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="animate-[pulse_3s_ease-in-out_0.5s_infinite] dark:stroke-[rgba(var(--color-vae-turquoise-rgb),0.1)]"
                  />
                </svg>
              </div>

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--color-vae-turquoise-rgb),0.08),transparent_70%)] transition-opacity duration-700 group-hover:opacity-60 dark:bg-[radial-gradient(circle_at_30%_50%,rgba(var(--color-vae-turquoise-rgb),0.12),transparent_70%)] dark:group-hover:opacity-80" />

              {/* Overlay to adjust image brightness */}
              <div className="absolute inset-0 z-[8] bg-white/10 dark:bg-black/25" />

              <picture className="relative z-10">
                <source
                  srcSet="/images/optimized/Jakob-von-hinten-mit-Stift-In-Der-Hand-Malt-an-eine-Tafel-ausgeschnitten.webp"
                  type="image/webp"
                />
                <img
                  src="/images/optimized/Jakob-von-hinten-mit-Stift-In-Der-Hand-Malt-an-eine-Tafel-ausgeschnitten.webp"
                  alt="Jakob Dünnebeil erklärt Architekturentscheidungen an der Tafel"
                  loading="lazy"
                  className="relative z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  width={1600}
                  height={1067}
                  sizes="(min-width: 1024px) 800px, 90vw"
                />
              </picture>

              <style>{`
                @keyframes float-fade {
                  0%, 100% { opacity: 0.3; transform: translateY(0) scale(0.95); }
                  50% { opacity: 1; transform: translateY(-8px) scale(1); }
                }
                @keyframes particle-float {
                  0%, 100% { opacity: 0.2; transform: translateY(0) translateX(0); }
                  50% { opacity: 0.6; transform: translateY(-20px) translateX(10px); }
                }
                @keyframes pulse {
                  0%, 100% { opacity: 0.1; }
                  50% { opacity: 0.3; }
                }
              `}</style>
            </div>

            <div className="space-y-4 text-center">
              <p className="mx-auto max-w-3xl text-base leading-relaxed text-text-secondary">
                Seine Überzeugung: Wer langfristig die Freiheit behält, sich von Produkten abzuwenden, wenn diese in der
                Qualität nachlassen, zwingt Anbieter zu kontinuierlicher Exzellenz. Unabhängigkeit bindet Anbieter
                daran, Qualität zu liefern – weil sie wissen, dass Kunden echte Alternativen haben.
              </p>
              <p className="mx-auto max-w-3xl text-base leading-relaxed text-text-secondary">
                Wer hingegen Wechselbarrieren aufbaut, erschwert bewusst Alternativen – ein klares Signal, dass nicht
                Qualität, sondern Lock-in der Wettbewerbsvorteil sein soll. Für VAE Systems ist das keine Option.
              </p>
            </div>
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
            Lassen Sie uns prüfen, wie wir Ihre Abhängigkeiten reduzieren, kritische Systeme dokumentieren und Ihr Team
            befähigen können, Infrastruktur eigenständig zu betreiben.
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

export default UnabhaengigkeitPage
