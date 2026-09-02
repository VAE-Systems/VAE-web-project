/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  SOVEREIGNTY LADDER SECTION                                               ┃
 * ┃  Drei Stufen zur digitalen Unabhängigkeit. Ruhig, beratend, seriös.       ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎛️ CORE
 * ├── sovereigntyContent  → Heading, Intro, CTA (content/home)
 * └── sovereigntySteps[]  → Die drei Stufen (Stufe 3 = highlight)
 *
 * 🎨 DESIGN
 * ├── Vollbild: Treppen-Bild + Teal-Overlay → Hintergrund ist in BEIDEN
 * │   Themes dunkel. Deshalb durchgehend weißer Text (kein Token-Flip nötig,
 * │   keine !important-Hacks, keine Inline-Styles).
 * └── Desktop: 3 Spalten treppenartig versetzt; Mobile: gestackt.
 *
 * ⚖️ TONALITÄT: Kein Alarmismus. Nextcloud wird positiv referenziert.
 */

import MagneticButton from '@/components/ui/buttons/MagneticButton'
import CtaLink from '@/components/ui/CtaLink'
import { sovereigntyContent, sovereigntySteps } from '@/content/home'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import React from 'react'

// Treppen-Versatz: links tief, rechts hoch (nur ≥lg)
const stepOffsets = ['lg:mt-20', 'lg:mt-10', 'lg:mt-0']

const SovereigntyLadderSection: React.FC = () => {
  return (
    <section
      id="souveraenitaet"
      className="accent-section border-border-primary relative overflow-hidden border-t bg-vae-turquoise py-20 text-white dark:border-white/5 dark:bg-bg-darker sm:py-28"
    >
      {/* LAYER 0: Treppen-Bild, vollflächig */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90 mix-blend-multiply dark:opacity-[0.46] dark:mix-blend-normal"
        style={{ backgroundImage: "url('/images/blog/souveraenitaets-treppe.webp')" }}
      />
      {/* LAYER 1: Teal-Tönung (light) / dunkle Tönung (dark) für Lesbarkeit */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(15,118,110,0.42)_0%,rgba(15,118,110,0.24)_42%,rgba(15,118,110,0.5)_100%)] dark:bg-[radial-gradient(circle_at_28%_20%,rgba(var(--vae-turquoise-rgb),0.18),transparent_42%),linear-gradient(180deg,rgba(6,10,9,0.84)_0%,rgba(6,10,9,0.6)_42%,rgba(6,10,9,0.9)_100%)]"
      />

      <div className="container-vae relative z-10">
        {/* ── HEADER ── */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/90">{sovereigntyContent.eyebrow}</p>
          <h2 className="fluid-h2 mt-3 text-balance font-semibold text-white">{sovereigntyContent.heading}</h2>
          <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">{sovereigntyContent.intro}</p>
        </div>

        {/* ── TREPPE ── */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {sovereigntySteps.map((step, index) => (
            <motion.article
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className={[
                'flex flex-col rounded-3xl border p-8 shadow-[0_18px_60px_-40px_rgba(0,0,0,0.55)] backdrop-blur-md transition-colors duration-300',
                stepOffsets[index],
                step.highlight
                  ? 'border-white/40 bg-white/15 dark:shadow-[0_24px_70px_-40px_rgba(0,255,165,0.4)] dark:border-vae-turquoise/40 dark:bg-vae-turquoise/[0.08]'
                  : 'border-white/18 bg-white/10 dark:border-white/10 dark:bg-white/[0.03]',
              ].join(' ')}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span
                  className={['text-4xl font-bold tabular-nums', step.highlight ? 'text-white' : 'text-white/60'].join(
                    ' '
                  )}
                  aria-hidden
                >
                  {step.step}
                </span>
                <span
                  className={[
                    'text-[11px] font-semibold uppercase tracking-[0.2em]',
                    step.highlight ? 'text-white' : 'text-white/70',
                  ].join(' ')}
                >
                  {step.label}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white sm:text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">{step.description}</p>
            </motion.article>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="mt-14 flex flex-col items-center gap-3 text-center">
          <MagneticButton>
            <CtaLink
              ctaId="contact.schedule_call"
              ctx={{ fromPage: 'home', intent: 'sovereignty-ladder' }}
              variant="custom"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base font-semibold"
            >
              {sovereigntyContent.ctaLabel}
              <ArrowRight className="h-5 w-5" />
            </CtaLink>
          </MagneticButton>
          <p className="text-xs text-white/70">{sovereigntyContent.ctaNote}</p>
        </div>
      </div>
    </section>
  )
}

export default SovereigntyLadderSection
