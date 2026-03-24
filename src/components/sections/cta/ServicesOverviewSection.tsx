import MagneticButton from '@/components/ui/buttons/MagneticButton'
import Icon from '@/components/ui/Icon'
import { BeratungIllustration, BetreuungIllustration, SetupIllustration } from '@/components/ui/icons/VaeIllustrations'
import { servicesOverviewCards } from '@/content/home'
import React from 'react'
import { Link } from 'react-router-dom'

const SERVICE_ILLUSTRATIONS: Record<string, React.FC<{ size?: number }>> = {
  beratung: BeratungIllustration,
  setup: SetupIllustration,
  betreuung: BetreuungIllustration,
}

const ServicesOverviewSection: React.FC = () => {
  return (
    <section
      id="services"
      className="accent-section border-border-primary/20 from-bg-primary relative overflow-hidden border-t bg-gradient-to-b to-bg-secondary py-20 dark:from-bg-darker dark:to-bg-dark sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(var(--vae-turquoise-rgb),0.12),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(var(--vae-turquoise-rgb),0.08),transparent_38%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(var(--vae-turquoise-rgb),0.16),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_38%)]" />
      </div>

      <div className="container-vae relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-vae-turquoise/90">Leistungsmodell</p>
          <h2 className="fluid-h2 mt-3 font-semibold text-text-light">Drei Wege zu Ihrer eigenen Infrastruktur</h2>
          <p className="mt-4 text-base text-text-secondary">
            Klar priorisiert, einzeln buchbar und oft als saubere Abfolge umgesetzt.
          </p>
          <p className="mt-2 text-sm text-text-secondary/80">
            Erst Klarheit, dann produktiver Aufbau, danach Betrieb und Weiterentwicklung.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicesOverviewCards.map((card, index) => (
            <article
              key={card.id}
              className="flex h-full flex-col rounded-[1.75rem] border border-vae-turquoise/20 bg-white/95 p-6 text-slate-900 shadow-[0_16px_50px_-34px_rgba(15,23,42,0.24)] transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/45 hover:shadow-[0_20px_60px_-30px_rgba(13,148,136,0.28)] dark:border-white/10 dark:bg-white/[0.04] dark:text-text-light"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="text-vae-turquoise/95">
                  {React.createElement(SERVICE_ILLUSTRATIONS[card.id], { size: 96 })}
                </div>
                <span className="rounded-full border border-vae-turquoise/20 bg-vae-turquoise/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-vae-turquoise dark:border-white/10 dark:bg-white/[0.03] dark:text-text-secondary/80">
                  Etappe {index + 1}
                </span>
              </div>

              <div className="border-b border-vae-turquoise/20 pb-4 dark:border-white/10">
                <div className="mb-3 flex items-center gap-3">
                  <div className="bg-vae-turquoise/12 flex h-10 w-10 items-center justify-center rounded-xl text-vae-turquoise">
                    <Icon name={card.icon} size={20} />
                  </div>
                  <span className="rounded-full border border-vae-turquoise/25 bg-vae-turquoise/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-vae-turquoise dark:border-white/10 dark:bg-white/[0.03] dark:text-text-secondary/80">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-text-light">{card.title}</h3>
                {card.subtitle && (
                  <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-text-secondary/90">
                    {card.subtitle}
                  </p>
                )}
              </div>

              <div className="mt-5 flex flex-1 flex-col gap-5 text-sm text-slate-700 dark:text-text-secondary">
                <p className="text-sm leading-relaxed text-slate-700 dark:text-text-secondary">{card.description}</p>

                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 dark:text-text-light">
                    Was Sie bekommen
                  </p>
                  <ul className="space-y-2">
                    {card.inclusions.slice(0, 3).map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-vae-turquoise" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 dark:text-text-light">
                    Ideal wenn
                  </p>
                  <div className="flex flex-col gap-2">
                    {card.audience.slice(0, 2).map(item => (
                      <div
                        key={item}
                        className="bg-vae-turquoise/8 flex items-center gap-2 rounded-xl border border-vae-turquoise/20 px-3 py-2.5 text-xs font-medium text-slate-800 dark:border-vae-turquoise/15 dark:bg-vae-turquoise/5 dark:text-text-light"
                      >
                        <svg
                          className="h-3 w-3 flex-shrink-0 text-vae-turquoise dark:text-vae-turquoise/70"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="flex-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex min-h-[36px] items-center">
                  {card.secondaryBadge && (
                    <span className="inline-flex rounded-full border border-emerald-400/40 bg-emerald-500/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-600 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-200">
                      {card.secondaryBadge}
                    </span>
                  )}
                </div>
              </div>

              <MagneticButton className="w-full">
                <Link
                  to={card.cta.href}
                  className="btn-convert accent-keep flex w-full items-center justify-center gap-2 px-8 py-4 text-base font-semibold"
                  aria-label={`${card.title} – Details ansehen`}
                >
                  {card.id === 'beratung'
                    ? 'Mehr zur Strategieberatung'
                    : card.id === 'setup'
                      ? 'Setup-Details'
                      : 'Betreuungs-Details'}
                  <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </Link>
              </MagneticButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesOverviewSection
