import MagneticButton from '@/components/ui/buttons/MagneticButton'
import Icon from '@/components/ui/Icon'
import {
  BetreuungIllustration,
  GermanyServerIcon,
  LocalAIIcon,
  SetupIllustration,
} from '@/components/ui/icons/VaeIllustrations'
import { servicesOverviewCards } from '@/content/home'
import React from 'react'
import { Link } from 'react-router-dom'

const SERVICE_ILLUSTRATIONS: Record<string, React.FC<{ size?: number }>> = {
  hosting: GermanyServerIcon,
  betreuung: BetreuungIllustration,
  infrastruktur: SetupIllustration,
  custom: LocalAIIcon,
}

const getCompactSentence = (text: string) => {
  const match = text.match(/.*?[.!?](\s|$)/)
  return match?.[0]?.trim() ?? text
}

const ServicesOverviewSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-bg-darker py-20 text-text-light dark:text-white sm:py-28"
      style={{
        clipPath: 'polygon(0 3vw, 100% 0, 100% 97%, 0 100%)',
        paddingTop: 'calc(5rem + 3vw)',
        paddingBottom: 'calc(5rem + 3vw)',
      }}
    >
      <div className="pointer-events-none absolute left-0 top-0 hidden select-none text-[20vw] font-black uppercase leading-none tracking-[-0.08em] text-text-light/[0.04] dark:text-white/[0.04] lg:block">
        03
      </div>

      <div className="container-vae relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.38em] text-vae-turquoise">Leistungsmodell</p>
          <h2 className="mt-3 text-balance text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-text-light dark:text-white sm:text-6xl lg:text-7xl">
            Vier Einstiege.
            <br />
            Ein System.
          </h2>
          <p className="dark:text-white/72 mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
            Vom ersten Hosting bis zum maßgeschneiderten KI-Tool. Einzeln buchbar, natürlich aufbauend — jede Stufe ist
            der Einstieg in die nächste.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 xl:grid-cols-4">
          {servicesOverviewCards.map((card, index) => (
            <article
              key={card.id}
              className="flex h-full flex-col border-2 border-text-light bg-white shadow-[0_20px_50px_-24px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:-translate-y-1 dark:border-white dark:bg-bg-dark dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)]"
            >
              <div className="flex items-start justify-between border-b-2 border-text-light p-5 dark:border-white">
                <div className="bg-vae-turquoise/8 flex h-24 w-24 items-center justify-center border border-vae-turquoise/20 text-vae-turquoise">
                  {React.createElement(SERVICE_ILLUSTRATIONS[card.id], { size: 80 })}
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-text-light/45 dark:text-white/45">
                    Etappe
                  </p>
                  <p className="mt-1 text-5xl font-black leading-none tracking-[-0.08em] text-text-light dark:text-white">
                    {index + 1}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-text-light text-white dark:bg-white dark:text-black">
                    <Icon name={card.icon} size={20} />
                  </div>
                  <span className="bg-vae-turquoise px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-black">
                    {card.badge}
                  </span>
                  {card.secondaryBadge && (
                    <span className="border border-text-light/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-text-secondary dark:border-white/15 dark:text-white/60">
                      {card.secondaryBadge}
                    </span>
                  )}
                </div>

                <h3 className="text-[2.15rem] font-black uppercase leading-[0.92] tracking-[-0.06em] text-text-light dark:text-white">
                  {card.title}
                </h3>
                {card.subtitle && (
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-text-light/50 dark:text-white/50">
                    {card.subtitle}
                  </p>
                )}
                <p className="dark:text-white/72 mt-5 text-base leading-relaxed text-text-secondary">
                  {getCompactSentence(card.description)}
                </p>

                <div className="mt-6 border-t border-text-light/10 pt-5 dark:border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-vae-turquoise">Kernpunkte</p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text-secondary dark:text-white/75">
                    {card.inclusions.slice(0, 2).map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-vae-turquoise" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.24em] text-text-light/45 dark:text-white/45">
                  Ideal für
                </p>
                <p className="dark:text-white/68 mt-2 text-sm leading-relaxed text-text-secondary">
                  {card.audience[0]}
                </p>

                <div className="mt-auto pt-6">
                  <MagneticButton className="w-full">
                    <Link
                      to={card.cta.href}
                      className="btn-primary flex w-full items-center justify-between px-5 py-4 text-sm font-black uppercase tracking-[0.14em]"
                      aria-label={`${card.title} – Details ansehen`}
                    >
                      <span>{card.cta.label}</span>
                      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesOverviewSection
