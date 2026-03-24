/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  SERVICES OVERVIEW SECTION                                                ┃
 * ┃  "Drei Wege, mit uns zu arbeiten" → Service-Cards mit CTAs.               ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎛️ CORE
 * └── servicesOverviewCards[] → 3 Service-Optionen (Beratung, Setup, Betreuung)
 *
 * 🎨 LAYERS
 * ├── Radial gradients bg     → Dual glow (top + bottom)
 * └── 3-col card grid         → Je Card: Icon, Title, Description, Inclusions, Audience, CTA
 *
 * 🚪 ORCHESTRATOR
 * └── ServicesOverviewSection → Bindet Cards + MagneticButton + Router Links
 */

import MagneticButton from '@/components/ui/buttons/MagneticButton'
import Icon from '@/components/ui/Icon'
import { BeratungIllustration, BetreuungIllustration, SetupIllustration } from '@/components/ui/icons/VaeIllustrations'
import { servicesOverviewCards } from '@/content/home'
import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

const SERVICE_ILLUSTRATIONS: Record<string, React.FC<{ size?: number }>> = {
  beratung: BeratungIllustration,
  setup: SetupIllustration,
  betreuung: BetreuungIllustration,
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚪 ORCHESTRATOR — ServicesOverviewSection
// ═══════════════════════════════════════════════════════════════════════════
const ServicesOverviewSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Parallax: Bild bewegt sich langsamer (40% der Scroll-Geschwindigkeit)
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '30%'])
  // Zoom: Startet normal, zoomed beim Scrollen rein, dann wieder raus
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1])
  // Opacity statt animiertem Blur für bessere Performance
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="accent-section border-border-primary/30 relative border-t bg-vae-turquoise py-20 dark:bg-gradient-to-b dark:from-bg-darker dark:via-bg-dark/80 dark:to-bg-dark sm:py-28"
    >
      {/* Background Image Layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Radial gradient overlay (dark only) */}
        <div className="absolute inset-0 opacity-0 dark:bg-transparent dark:opacity-100" />

        {/* Gradient Base: hell VAE-grün oben links → dunkel unten rechts - nur Desktop */}
        <div className="absolute inset-0 hidden opacity-0 dark:bg-gradient-to-br dark:from-vae-turquoise/20 dark:via-bg-darker/40 dark:to-bg-darker dark:opacity-100 sm:block" />

        {/* Hintergrundbild mit Parallax & Zoom - Light Mode mit statischem Blur */}
        <motion.div
          className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat blur-[6px] dark:hidden sm:block"
          style={{
            backgroundImage: "url('/images/optimized/Background-3Wege-ausgeschnitten-2.webp')",
            y,
            scale,
            opacity,
            willChange: 'transform, opacity',
          }}
        />
        {/* Hintergrundbild mit Parallax & Zoom - Dark Mode mit subtilerem Blur */}
        <motion.div
          className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat blur-[6px] dark:block sm:hidden sm:dark:block"
          style={{
            backgroundImage: "url('/images/optimized/Background-3Wege-ausgeschnitten-2.webp')",
            y,
            scale,
            opacity,
            willChange: 'transform, opacity',
          }}
        />

        {/* Overlays für bessere Lesbarkeit */}
        <div className="from-bg-primary/70 via-bg-primary/55 to-bg-primary/70 absolute inset-0 bg-gradient-to-b opacity-0 dark:from-bg-darker/90 dark:via-bg-darker/80 dark:to-bg-darker/90 dark:opacity-100" />
        <div className="absolute inset-0 opacity-0 dark:bg-[radial-gradient(circle_at_top,rgba(var(--vae-turquoise-rgb),0.20),transparent_60%)] dark:opacity-100" />
        <div className="absolute inset-0 opacity-0 dark:bg-[radial-gradient(circle_at_bottom,rgba(var(--vae-turquoise-rgb),0.08),transparent_65%)] dark:opacity-100" />
      </div>
      <div className="container-vae relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-white/85 dark:text-vae-turquoise/80">
            Unser Ansatz
          </p>
          <h2 className="fluid-h2 mt-3 font-semibold text-text-light">Drei Wege, mit uns zu arbeiten</h2>
          <p className="mt-4 text-base text-text-secondary">Von Beratung bis Langzeit-Partnerschaft</p>
          <p className="mt-2 text-sm text-text-secondary/80">
            Oft als Abfolge genutzt – alle Bausteine sind auch einzeln buchbar.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicesOverviewCards.map((card, index) => (
            <article
              key={card.id}
              className="flex h-full flex-col rounded-3xl border-2 border-white/70 bg-white p-6 text-slate-900 transition-all hover:-translate-y-1 hover:border-vae-turquoise hover:shadow-[0_10px_22px_rgba(18,24,20,0.12)] dark:border-white/10 dark:bg-white/[0.08] dark:text-text-light dark:hover:border-vae-turquoise/50 dark:hover:shadow-[0_20px_70px_-40px_rgba(var(--vae-turquoise-rgb),0.8)]"
            >
              {/* Illustration — groß, oben, visueller Anker */}
              {SERVICE_ILLUSTRATIONS[card.id] && (
                <div className="mb-6 flex items-center justify-between">
                  <div className="text-vae-turquoise">
                    {React.createElement(SERVICE_ILLUSTRATIONS[card.id], { size: 96 })}
                  </div>
                  <span className="rounded-full border border-vae-turquoise/20 bg-vae-turquoise/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-vae-turquoise dark:border-white/10 dark:bg-white/[0.03] dark:text-text-secondary/80">
                    Etappe {index + 1}
                  </span>
                </div>
              )}
              <div className="mb-4 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-vae-turquoise/15 text-vae-turquoise transition-all duration-300 hover:rotate-6 hover:scale-110 hover:bg-vae-turquoise/25">
                      <Icon name={card.icon} size={20} />
                    </div>
                    <span className="rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-vae-turquoise dark:border-white/10 dark:bg-white/[0.03] dark:text-text-secondary/80">
                      {card.badge}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-b-2 border-vae-turquoise/30 pb-3 dark:border-vae-turquoise/40">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-text-light">{card.title}</h3>
                {'subtitle' in card && card.subtitle && (
                  <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-text-secondary/90">
                    {card.subtitle}
                  </p>
                )}
              </div>
              <div className="mt-4 flex flex-1 flex-col gap-6 text-sm text-slate-700 dark:text-text-secondary">
                <p className="min-h-[120px] text-sm leading-relaxed text-slate-700 dark:text-text-secondary">
                  {card.description}
                </p>

                <div className="grid min-h-[280px] gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 dark:text-text-light">
                      Was enthalten
                    </p>
                    <ul className="space-y-1.5">
                      {card.inclusions.map(item => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-vae-turquoise" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 dark:text-text-light">
                      Ideal bei
                    </p>
                    <div className="flex flex-col gap-2">
                      {card.audience.map(item => (
                        <div
                          key={item}
                          className="flex items-center gap-2 rounded-lg border border-vae-turquoise/30 bg-vae-turquoise/10 px-3 py-2 text-xs font-medium text-slate-800 transition-all duration-200 hover:border-vae-turquoise/50 hover:bg-vae-turquoise/15 dark:border-vae-turquoise/20 dark:bg-vae-turquoise/5 dark:text-text-light dark:hover:border-vae-turquoise/40 dark:hover:bg-vae-turquoise/10"
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
                </div>
              </div>

              {/* Spacer: gleiche Höhe für alle Cards, Badge nur bei Betreuung sichtbar */}
              <div className="mt-2 flex min-h-[40px] items-center justify-center">
                {card.secondaryBadge && (
                  <span className="inline-flex rounded-full border border-emerald-400/40 bg-emerald-500/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-600 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-200">
                    {card.secondaryBadge}
                  </span>
                )}
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
