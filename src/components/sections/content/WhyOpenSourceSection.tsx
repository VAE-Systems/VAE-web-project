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
      className="relative overflow-hidden bg-[#f4f1ec] py-20 text-black dark:bg-[#030806] dark:text-white sm:py-28"
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
        <div className="grid gap-8 border-2 border-black bg-white text-black dark:border-white dark:bg-[#050b08] dark:text-white lg:grid-cols-[minmax(0,1.15fr)_320px]">
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

          <div className="border-t-2 border-black bg-black p-8 text-white dark:border-white lg:border-l-2 lg:border-t-0">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-vae-turquoise">Der Unterschied</p>
            <div className="mt-5 space-y-4">
              <div className="border border-white/15 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">Fremde Bank</p>
                <p className="mt-2 text-lg font-black uppercase leading-tight">
                  Die Bank sieht alles. Bestimmt die Regeln. Ändert die Preise.
                </p>
              </div>
              <div className="bg-vae-turquoise p-4 text-black">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-black/55">Eigenes Haus</p>
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
          <article className="border-2 border-black bg-black p-6 text-white dark:border-white sm:p-8">
            <header className="border-white/12 mb-8 flex items-end justify-between gap-4 border-b pb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400">Das Problem</p>
                <h3 className="mt-2 text-3xl font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-4xl">
                  Der Tresor in fremder Hand
                </h3>
              </div>
              <span className="text-white/12 text-6xl font-black leading-none tracking-[-0.08em]">A</span>
            </header>

            <div className="grid gap-4">
              {openSourcePainPoints.map((point, index) => {
                const PainIcon = PAIN_ICONS[index]
                return (
                  <article key={point.title} className="border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="shrink-0 text-red-400">
                          <PainIcon size={52} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-red-400/90">
                            Risiko {String(index + 1).padStart(2, '0')}
                          </p>
                          <h4 className="mt-2 text-2xl font-black uppercase leading-[0.94] tracking-[-0.04em]">
                            {point.title}
                          </h4>
                        </div>
                      </div>
                      <span className="shrink-0 text-4xl font-black leading-none tracking-[-0.08em] text-red-400/25">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="text-white/72 mt-3 text-sm leading-relaxed sm:text-base">{point.description}</p>
                    {point.bullets && (
                      <ul className="text-white/78 mt-4 space-y-2 border-t border-white/10 pt-4 text-sm leading-relaxed">
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

          <article className="border-2 border-black bg-vae-turquoise p-6 text-black dark:border-white sm:p-8">
            <header className="border-black/12 mb-8 flex items-end justify-between gap-4 border-b pb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/55">Die Alternative</p>
                <h3 className="mt-2 text-3xl font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-4xl">
                  Der Tresor im eigenen Haus
                </h3>
              </div>
              <span className="text-6xl font-black leading-none tracking-[-0.08em] text-black/10">B</span>
            </header>

            <div className="grid gap-4">
              {openSourceAdvantages.map((point, index) => {
                const AdvIcon = ADV_ICONS[index]
                return (
                  <article key={point.title} className="border border-black/15 bg-white/35 p-5 backdrop-blur-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="shrink-0 text-black/70">
                          <AdvIcon size={52} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-black/45">
                            Vorteil {String(index + 1).padStart(2, '0')}
                          </p>
                          <h4 className="mt-2 text-2xl font-black uppercase leading-[0.94] tracking-[-0.04em]">
                            {point.title}
                          </h4>
                        </div>
                      </div>
                      <span className="text-black/18 shrink-0 text-4xl font-black leading-none tracking-[-0.08em]">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="text-black/76 mt-3 text-sm leading-relaxed sm:text-base">{point.description}</p>
                    {point.bullets && (
                      <ul className="mt-4 space-y-2 border-t border-black/10 pt-4 text-sm leading-relaxed text-black/80">
                        {point.bullets.map(bullet => (
                          <li key={bullet} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-black" aria-hidden />
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

        <div className="mt-10 grid gap-4 border-2 border-black bg-white p-6 dark:border-white dark:bg-[#050b08] sm:p-8 lg:grid-cols-[minmax(0,1fr)_220px_220px]">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-vae-turquoise">Entscheidungsfrage</p>
            <p className="mt-3 max-w-2xl text-2xl font-black uppercase leading-[0.95] tracking-[-0.05em] sm:text-3xl">
              Wo soll Ihr Tresor stehen — in Ihrem Haus oder bei der Bank?
            </p>
          </div>
          <MagneticButton className="w-full">
            <Link
              to="/leistungen/strategie"
              className="flex w-full items-center justify-between bg-black px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-vae-turquoise hover:text-black"
            >
              <span>Strategie ansehen</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </MagneticButton>
          <MagneticButton className="w-full">
            <Link
              to="/leistungen/infrastruktur"
              className="flex w-full items-center justify-between border-2 border-black px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition-colors hover:border-vae-turquoise hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:border-vae-turquoise dark:hover:bg-vae-turquoise dark:hover:text-black"
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
