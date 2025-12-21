/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  WHY OPEN SOURCE SECTION                                                  ┃
 * ┃  Problem/Lösung-Gegenüberstellung: SaaS-Dilemma vs. Open-Source.          ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎛️ CORE
 * ├── openSourcePainPoints[] → Probleme mit SaaS (content/home)
 * └── openSourceAdvantages[] → Vorteile von Open Source
 *
 * 🎨 LAYERS
 * ├── Left Card (rose tint)  → "Das Problem" / SaaS-Dilemma
 * └── Right Card (turquoise) → "Die Lösung" / Open-Source-Alternative
 *
 * 📐 LAYOUT
 * └── 2-spaltig auf Desktop, gestackt auf Mobile
 */

import AnimatedSaaSTransformation from '@/components/ui/animations/AnimatedSaaSTransformation'
import MagneticButton from '@/components/ui/buttons/MagneticButton'
import { openSourceAdvantages, openSourcePainPoints } from '@/content/home'
import { motion } from 'framer-motion'
import { ArrowRight, Lightbulb } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

// ═══════════════════════════════════════════════════════════════════════════
// 🚪 ORCHESTRATOR — WhyOpenSourceSection
// ═══════════════════════════════════════════════════════════════════════════
const WhyOpenSourceSection: React.FC = () => {
  return (
    <section
      id="why-open-source"
      className="border-border-primary from-bg-primary relative border-t bg-gradient-to-b to-bg-secondary py-20 dark:border-white/5 dark:from-bg-darker dark:to-bg-dark/80 sm:py-28"
    >
      <div className="container-vae">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/70">
            Infrastruktur neu gedacht
          </p>
          <h2 className="fluid-h2 mt-3 text-balance font-semibold text-text-light">
            Warum Unternehmen auf selbstgehostete Systeme setzen
          </h2>
        </div>

        <div className="mt-10">
          <AnimatedSaaSTransformation autoPlayDelay={3600} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 rounded-2xl border border-vae-turquoise/30 bg-vae-turquoise/5 p-6 backdrop-blur-sm"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-vae-turquoise/15">
              <Lightbulb className="h-5 w-5 text-vae-turquoise" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-vae-turquoise">Vision</p>
              <p className="text-base font-semibold leading-relaxed text-text-light">
                <span className="text-vae-turquoise">SaaS mieten oder Infrastruktur besitzen?</span>{' '}
                Open-Source-Infrastruktur für jedes Unternehmen zugänglich machen – mit Standards, Transparenz und
                echter Datensouveränität.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <article className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 shadow-[0_30px_120px_-50px_rgba(5,212,182,0.35)] backdrop-blur-sm">
            <header className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-red-400 dark:text-red-300">
                Das Problem
              </p>
              <h3 className="text-3xl font-bold text-text-light lg:text-4xl">Das SaaS-Dilemma</h3>
            </header>
            <ul className="divide-y divide-white/5">
              {openSourcePainPoints.map(point => (
                <li key={point.title} className="py-6 first:pt-0 last:pb-0">
                  <p className="inline-block text-lg font-bold text-text-light lg:text-xl">
                    {point.title}
                    <span className="mt-2 block h-[2px] w-10 rounded-full bg-red-400/50" />
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary/70 lg:text-base">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-vae-turquoise/20 bg-vae-turquoise/5 p-8 backdrop-blur-sm">
            <header className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-vae-turquoise/90">Die Lösung</p>
              <h3 className="text-3xl font-bold text-text-light lg:text-4xl">Die VAE-Alternative</h3>
            </header>
            <ul className="divide-y divide-vae-turquoise/15">
              {openSourceAdvantages.map(point => (
                <li key={point.title} className="py-6 first:pt-0 last:pb-0">
                  <p className="inline-block text-lg font-bold text-text-light lg:text-xl">
                    {point.title}
                    <span className="mt-2 block h-[2px] w-10 rounded-full bg-vae-turquoise/60" />
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary/70 lg:text-base">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <MagneticButton className="w-full sm:w-auto">
            <Link
              to="/leistungen/strategie"
              className="btn-primary flex w-full items-center justify-center gap-2 px-6 py-3 text-sm font-semibold sm:w-auto"
            >
              <span className="sm:hidden">Strategie ansehen</span>
              <span className="hidden sm:inline">Erfahren Sie mehr über eine Digitalisierungsstrategie</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </MagneticButton>
          <MagneticButton className="w-full sm:w-auto">
            <Link
              to="/leistungen/infrastruktur"
              className="btn-outline flex w-full items-center justify-center gap-2 px-6 py-3 text-sm font-semibold sm:w-auto"
            >
              Mehr zu Infrastruktur-Design
              <ArrowRight className="h-4 w-4" />
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}

export default WhyOpenSourceSection
