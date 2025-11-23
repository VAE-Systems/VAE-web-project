import Icon from '@/components/ui/Icon'
import { servicesOverviewCards } from '@/content/home'
import React from 'react'
import { Link } from 'react-router-dom'
import MagneticButton from '../ui/buttons/MagneticButton'

const ServicesOverviewSection: React.FC = () => {
  return (
    <section
      id="services"
      className="border-border-primary/30 bg-bg-primary/40 relative border-t py-20 dark:border-white/5 dark:bg-bg-darker/60 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--vae-turquoise-rgb),0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(var(--vae-turquoise-rgb),0.08),transparent_65%)]" />
      </div>
      <div className="container-vae relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-vae-turquoise/80">Unser Ansatz</p>
          <h2 className="fluid-h2 mt-3 font-semibold text-text-light">Drei Wege, mit uns zu arbeiten</h2>
          <p className="mt-4 text-base text-text-secondary">Von Beratung bis Langzeit-Partnerschaft</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicesOverviewCards.map(card => (
            <article
              key={card.id}
              className="border-border-primary/50 bg-bg-primary/80 flex h-full flex-col rounded-3xl border p-6 backdrop-blur-lg transition-all hover:-translate-y-1 hover:border-vae-turquoise/50 hover:shadow-[0_20px_70px_-40px_rgba(var(--vae-turquoise-rgb),0.8)] dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-vae-turquoise/15 text-vae-turquoise">
                    <Icon name={card.icon} size={22} />
                  </div>
                  <span className="rounded-full border border-white/5 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.3em] text-text-secondary/60">
                    {card.badge}
                  </span>
                </div>
              </div>
              <div className="border-b-2 border-vae-turquoise/30 pb-3 dark:border-vae-turquoise/40">
                <h3 className="text-2xl font-bold text-text-light">{card.title}</h3>
                {'subtitle' in card && card.subtitle && (
                  <p className="mt-1 text-sm font-medium text-text-secondary">{card.subtitle}</p>
                )}
              </div>
              <p className="mt-4 text-sm text-text-secondary">{card.description}</p>
              <div className="mt-5 space-y-3 text-sm text-text-secondary">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text-light">Was enthalten</p>
                <ul className="space-y-1.5">
                  {card.inclusions.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-vae-turquoise" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 space-y-3 text-sm text-text-secondary">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text-light">Für wen</p>
                <ul className="space-y-1.5">
                  {card.audience.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/40" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <MagneticButton className="mt-8 w-full">
                <Link
                  to={card.cta.href}
                  className="btn-convert flex w-full items-center justify-center gap-2 text-sm font-semibold"
                  aria-label={`${card.title} – Details ansehen`}
                >
                  {card.id === 'beratung'
                    ? 'Mehr zur Strategieberatung'
                    : card.id === 'setup'
                      ? 'Setup-Details'
                      : 'Betreuungs-Details'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
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
