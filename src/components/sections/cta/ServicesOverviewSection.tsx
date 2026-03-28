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

const ServicesOverviewSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#f4f1ec] py-20 text-black dark:bg-[#030806] dark:text-white sm:py-28"
      style={{
        clipPath: 'polygon(0 3vw, 100% 0, 100% 97%, 0 100%)',
        paddingTop: 'calc(5rem + 3vw)',
        paddingBottom: 'calc(5rem + 3vw)',
      }}
    >
      <div className="pointer-events-none absolute left-0 top-0 hidden select-none text-[20vw] font-black uppercase leading-none tracking-[-0.08em] text-black/[0.04] dark:text-white/[0.04] lg:block">
        03
      </div>

      <div className="container-vae relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.38em] text-vae-turquoise">Leistungsmodell</p>
          <h2 className="mt-3 text-balance text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-black dark:text-white sm:text-6xl lg:text-7xl">
            Vier Einstiege.
            <br />
            Ein System.
          </h2>
          <p className="dark:text-white/72 mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black/70 sm:text-lg">
            Vom ersten Hosting bis zum maßgeschneiderten KI-Tool. Einzeln buchbar, natürlich aufbauend — jede Stufe ist
            der Einstieg in die nächste.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 xl:grid-cols-4">
          {servicesOverviewCards.map((card, index) => (
            <article
              key={card.id}
              className="flex h-full flex-col border-2 border-black bg-white shadow-[0_20px_50px_-24px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-1 dark:border-white dark:bg-[#050b08] dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)]"
            >
              <div className="flex items-start justify-between border-b-2 border-black p-5 dark:border-white">
                <div className="text-vae-turquoise">
                  {React.createElement(SERVICE_ILLUSTRATIONS[card.id], { size: 104 })}
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-black/45 dark:text-white/45">
                    Etappe
                  </p>
                  <p className="mt-1 text-5xl font-black leading-none tracking-[-0.08em] text-black dark:text-white">
                    {index + 1}
                  </p>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center bg-black text-white dark:bg-white dark:text-black">
                    <Icon name={card.icon} size={20} />
                  </div>
                  <span className="bg-vae-turquoise px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-black">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-3xl font-black uppercase leading-[0.95] tracking-[-0.05em] text-black dark:text-white">
                  {card.title}
                </h3>
                {card.subtitle && (
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-black/55 dark:text-white/55">
                    {card.subtitle}
                  </p>
                )}
              </div>

              <div className="border-t-2 border-black bg-black p-5 text-white dark:border-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/55">Kurz gesagt</p>
                <p className="text-white/86 mt-3 text-base leading-relaxed">{card.description}</p>
              </div>

              <div className="grid gap-0 border-t-2 border-black dark:border-white sm:grid-cols-1">
                <div className="border-b-2 border-black bg-[#f4f1ec] p-5 dark:border-white dark:bg-[#0d1813]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-black/50 dark:text-white/45">
                    Was Sie bekommen
                  </p>
                  <ul className="text-black/78 mt-3 space-y-2 text-sm leading-relaxed dark:text-white/75">
                    {card.inclusions.slice(0, 3).map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-vae-turquoise" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-vae-turquoise p-5 text-black">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-black/55">Ideal wenn</p>
                  <ul className="text-black/82 mt-3 space-y-2 text-sm leading-relaxed">
                    {card.audience.slice(0, 2).map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-black" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-auto border-t-2 border-black p-5 dark:border-white">
                {card.secondaryBadge && (
                  <div className="mb-4 inline-flex bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-[0.26em] text-vae-turquoise dark:bg-white dark:text-black">
                    {card.secondaryBadge}
                  </div>
                )}

                <MagneticButton className="w-full">
                  <Link
                    to={card.cta.href}
                    className="flex w-full items-center justify-between bg-black px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-vae-turquoise hover:text-black dark:bg-white dark:text-black dark:hover:bg-vae-turquoise"
                    aria-label={`${card.title} – Details ansehen`}
                  >
                    <span>{card.cta.label}</span>
                    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </Link>
                </MagneticButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesOverviewSection
