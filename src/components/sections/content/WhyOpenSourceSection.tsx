import AnimatedSaaSTransformation from '@/components/ui/animations/AnimatedSaaSTransformation'
import MagneticButton from '@/components/ui/buttons/MagneticButton'
import {
  BillGrowIcon,
  BrokenShieldIcon,
  ConnectedPlatformIcon,
  EyeServerIcon,
  FixedCostIcon,
  GermanyServerIcon,
  LocalAIIcon,
  OverpaidBoxIcon,
} from '@/components/ui/icons/VaeIllustrations'
import { openSourceAdvantages, openSourcePainPoints } from '@/content/home'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const PAIN_ICONS = [BillGrowIcon, EyeServerIcon, BrokenShieldIcon, OverpaidBoxIcon]
const ADV_ICONS = [ConnectedPlatformIcon, FixedCostIcon, GermanyServerIcon, LocalAIIcon]

const WhyOpenSourceSection: React.FC = () => {
  return (
    <section
      id="why-open-source"
      className="relative overflow-hidden bg-bg-darker py-20 text-text-light dark:text-white sm:py-28"
      style={{
        clipPath: 'polygon(0 3vw, 100% 0, 100% 97%, 0 100%)',
        paddingTop: 'calc(5rem + 3vw)',
        paddingBottom: 'calc(5rem + 3vw)',
      }}
    >
      <div className="pointer-events-none absolute right-[-3vw] top-8 hidden select-none text-[18vw] font-black uppercase leading-none tracking-[-0.08em] text-black/[0.05] dark:text-white/[0.04] lg:block">
        04
      </div>

      <div className="container-vae relative z-10">
        <div className="grid gap-8 border-2 border-text-light bg-white text-text-light dark:border-white dark:bg-bg-dark dark:text-white lg:grid-cols-[minmax(0,1.15fr)_320px]">
          <div className="p-8 sm:p-10">
            <p className="text-[11px] font-black uppercase tracking-[0.34em] text-vae-turquoise">Das Tresor-Prinzip</p>
            <h2 className="mt-4 max-w-4xl text-balance text-5xl font-black uppercase leading-[0.88] tracking-[-0.07em] sm:text-6xl lg:text-7xl">
              Fremde Bank oder eigenes Haus?
            </h2>
            <div className="text-black/72 dark:text-white/74 mt-6 max-w-3xl border-l-4 border-black pl-4 text-base leading-relaxed dark:border-white sm:text-lg">
              Bei einer Cloud-Lösung mieten Sie einen Tresor in einem fremden Bankgebäude. Self-Hosting bedeutet: Ihr
              Tresor steht in Ihrem Gebäude. Sie haben die Schlüssel. Niemand sonst kommt rein.
            </div>
          </div>

          <div className="bg-bg-primary border-t-2 border-text-light p-8 text-text-light dark:border-white dark:bg-bg-dark dark:text-white lg:border-l-2 lg:border-t-0">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-vae-turquoise">Der Unterschied</p>
            <div className="mt-5 space-y-4">
              <div className="border border-red-500/15 bg-red-500/[0.04] p-4 dark:border-white/15 dark:bg-white/[0.03]">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-red-500/70 dark:text-white/45">
                  Fremde Bank
                </p>
                <p className="mt-2 text-lg font-black uppercase leading-tight text-text-light dark:text-white">
                  Die Bank sieht alles. Bestimmt die Regeln. Ändert die Preise.
                </p>
              </div>
              <div className="bg-vae-turquoise/12 border border-vae-turquoise/20 p-4 text-text-light dark:border-vae-turquoise/20 dark:bg-vae-turquoise/10 dark:text-white">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-vae-turquoise/80">Eigenes Haus</p>
                <p className="mt-2 text-lg font-black uppercase leading-tight">
                  Sie haben die Schlüssel. Niemand sonst kommt rein.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <AnimatedSaaSTransformation autoPlayDelay={3600} />
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-2">
          <article className="border-2 border-red-500/20 bg-white p-6 text-text-light dark:border-white dark:bg-bg-dark dark:text-white sm:p-8">
            <header className="border-red-500/12 dark:border-white/12 mb-8 flex items-end justify-between gap-4 border-b pb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400">Das Problem</p>
                <h3 className="mt-2 text-3xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-text-light dark:text-white sm:text-4xl">
                  Der Tresor in fremder Hand
                </h3>
              </div>
              <span className="text-6xl font-black leading-none tracking-[-0.08em] text-red-500/20 dark:text-white/30">
                A
              </span>
            </header>

            <div className="grid gap-4">
              {openSourcePainPoints.map((point, index) => {
                const PainIcon = PAIN_ICONS[index]
                return (
                  <article
                    key={point.title}
                    className="border border-red-500/15 bg-red-500/[0.04] p-5 text-text-light dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center border border-red-500/15 bg-white text-red-500 shadow-[0_10px_24px_rgba(18,24,20,0.08)] dark:bg-red-500/10 dark:text-red-300 dark:shadow-none">
                          <PainIcon size={48} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-red-400/90">
                            Risiko {String(index + 1).padStart(2, '0')}
                          </p>
                          <h4 className="mt-2 text-xl font-black uppercase leading-[0.94] tracking-[-0.04em] text-text-light dark:text-white sm:text-[1.7rem]">
                            {point.title}
                          </h4>
                        </div>
                      </div>
                      <span className="shrink-0 text-3xl font-black leading-none tracking-[-0.08em] text-red-400/30 sm:text-4xl">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="dark:text-white/78 mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
                      {point.description}
                    </p>
                    {point.bullets && (
                      <ul className="dark:text-white/82 mt-4 space-y-2 border-t border-red-500/10 pt-4 text-sm leading-relaxed text-text-secondary dark:border-white/10">
                        {point.bullets.map(bullet => (
                          <li key={bullet} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-red-400" aria-hidden />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                )
              })}
            </div>
          </article>

          <article className="bg-bg-primary border-2 border-vae-turquoise/25 p-6 text-text-light dark:border-white dark:bg-vae-turquoise/10 dark:text-white sm:p-8">
            <header className="dark:border-white/12 mb-8 flex items-end justify-between gap-4 border-b border-vae-turquoise/20 pb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-vae-turquoise/80">
                  Die Alternative
                </p>
                <h3 className="mt-2 text-3xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-text-light dark:text-white sm:text-4xl">
                  Der Tresor im eigenen Haus
                </h3>
              </div>
              <span className="text-vae-turquoise/28 text-6xl font-black leading-none tracking-[-0.08em] dark:text-white/25">
                B
              </span>
            </header>

            <div className="grid gap-4">
              {openSourceAdvantages.map((point, index) => {
                const AdvIcon = ADV_ICONS[index]
                return (
                  <article
                    key={point.title}
                    className="border-vae-turquoise/18 bg-white/82 border p-5 backdrop-blur-sm dark:border-vae-turquoise/20 dark:bg-white/[0.05]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center border border-vae-turquoise/15 bg-white text-vae-turquoise shadow-[0_10px_24px_rgba(18,24,20,0.08)] dark:bg-white/90 dark:text-vae-turquoise dark:shadow-none">
                          <AdvIcon size={48} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-vae-turquoise/75">
                            Vorteil {String(index + 1).padStart(2, '0')}
                          </p>
                          <h4 className="mt-2 text-xl font-black uppercase leading-[0.94] tracking-[-0.04em] text-text-light dark:text-white sm:text-[1.7rem]">
                            {point.title}
                          </h4>
                        </div>
                      </div>
                      <span className="text-vae-turquoise/32 shrink-0 text-3xl font-black leading-none tracking-[-0.08em] sm:text-4xl">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="dark:text-white/78 mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
                      {point.description}
                    </p>
                    {point.bullets && (
                      <ul className="dark:text-white/82 mt-4 space-y-2 border-t border-vae-turquoise/10 pt-4 text-sm leading-relaxed text-text-secondary dark:border-white/10">
                        {point.bullets.map(bullet => (
                          <li key={bullet} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-vae-turquoise" aria-hidden />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                )
              })}
            </div>
          </article>
        </div>

        <div className="mt-10 grid gap-4 border-2 border-text-light bg-white p-6 dark:border-white dark:bg-bg-dark sm:p-8 lg:grid-cols-[minmax(0,1fr)_220px_220px]">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-vae-turquoise">Entscheidungsfrage</p>
            <p className="mt-3 max-w-2xl text-2xl font-black uppercase leading-[0.95] tracking-[-0.05em] sm:text-3xl">
              Wo soll Ihr Tresor stehen — in Ihrem Haus oder bei der Bank?
            </p>
          </div>
          <MagneticButton className="w-full">
            <Link
              to="/leistungen/strategie"
              className="btn-primary flex w-full items-center justify-between px-5 py-4 text-sm font-black uppercase tracking-[0.14em]"
            >
              <span>Strategie ansehen</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </MagneticButton>
          <MagneticButton className="w-full">
            <Link
              to="/leistungen/infrastruktur"
              className="btn-secondary flex w-full items-center justify-between px-5 py-4 text-sm font-black uppercase tracking-[0.14em]"
            >
              <span>Setup verstehen</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}

export default WhyOpenSourceSection
