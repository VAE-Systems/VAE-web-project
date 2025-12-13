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
import { servicesOverviewCards } from '@/content/home'
import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

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
  // Blur: Light Mode stark (weniger Ablenkung), Dark Mode subtiler
  const blurLight = useTransform(scrollYProgress, [0, 0.5, 1], [12, 8, 12])
  const blurDark = useTransform(scrollYProgress, [0, 0.5, 1], [4, 2.5, 4])

  return (
    <section ref={sectionRef} id="services" className="border-border-primary/30 relative border-t py-20 sm:py-28">
      {/* Background Image Layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gradient Base: hell VAE-grün oben links → dunkel unten rechts - nur Desktop */}
        <div className="absolute inset-0 hidden bg-gradient-to-br from-vae-turquoise/30 via-vae-turquoise/10 to-bg-darker/80 dark:from-vae-turquoise/20 dark:via-bg-darker/40 dark:to-bg-darker sm:block" />

        {/* Hintergrundbild mit Parallax & Zoom - Light Mode mit starkem Blur */}
        <motion.div
          className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat opacity-40 dark:hidden sm:block"
          style={{
            backgroundImage: "url('/images/raw/Background-3Wege-ausgeschnitten.png')",
            y,
            scale,
            filter: useTransform(blurLight, val => `blur(${val}px)`),
          }}
        />
        {/* Hintergrundbild mit Parallax & Zoom - Dark Mode mit subtilerem Blur */}
        <motion.div
          className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat opacity-50 dark:block sm:hidden sm:dark:block"
          style={{
            backgroundImage: "url('/images/raw/Background-3Wege-ausgeschnitten.png')",
            y,
            scale,
            filter: useTransform(blurDark, val => `blur(${val}px)`),
          }}
        />

        {/* Overlays für bessere Lesbarkeit */}
        <div className="from-bg-primary/90 via-bg-primary/80 to-bg-primary/90 absolute inset-0 bg-gradient-to-b dark:from-bg-darker/90 dark:via-bg-darker/80 dark:to-bg-darker/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--vae-turquoise-rgb),0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(var(--vae-turquoise-rgb),0.08),transparent_65%)]" />
      </div>
      <div className="container-vae relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-vae-turquoise/80">Unser Ansatz</p>
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
              className="border-border-primary/50 bg-bg-primary flex h-full flex-col rounded-3xl border p-6 backdrop-blur-lg transition-all hover:-translate-y-1 hover:border-vae-turquoise/50 hover:shadow-[0_20px_70px_-40px_rgba(var(--vae-turquoise-rgb),0.8)] dark:border-white/10 dark:bg-white/[0.08]"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-vae-turquoise/15 text-vae-turquoise">
                    <Icon name={card.icon} size={22} />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-text-secondary/80">
                    {card.badge}
                  </span>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-text-secondary/80">
                  Etappe {index + 1}
                </span>
              </div>
              <div className="border-b-2 border-vae-turquoise/30 pb-3 dark:border-vae-turquoise/40">
                <h3 className="text-2xl font-bold text-text-light">{card.title}</h3>
                {'subtitle' in card && card.subtitle && (
                  <p className="mt-1 text-sm font-semibold text-text-secondary/90">{card.subtitle}</p>
                )}
              </div>
              <div className="mt-4 flex flex-1 flex-col gap-6 text-sm text-text-secondary">
                <p className="line-clamp-4 text-sm leading-relaxed text-text-secondary">{card.description}</p>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text-light">Was enthalten</p>
                    <ul className="space-y-1.5">
                      {card.inclusions.slice(0, 4).map(item => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-vae-turquoise" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text-light">Für wen</p>
                    <div className="flex flex-wrap gap-2">
                      {card.audience.slice(0, 3).map(item => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[12px] font-medium leading-none text-text-secondary"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <MagneticButton className="mt-auto w-full pt-4">
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
