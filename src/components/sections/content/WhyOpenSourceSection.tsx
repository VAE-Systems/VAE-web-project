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
import { openSourceAdvantages, openSourcePainPoints } from '@/content/home'
import { ArrowRight, Lightbulb } from 'lucide-react'
import { motion } from 'framer-motion'
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
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/70">Warum Open Source?</p>
          <h2 className="fluid-h2 mt-3 text-balance font-semibold text-text-light">
            Warum wechseln Unternehmen von SaaS zu Open Source?
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vae-turquoise">Vision</p>
              <p className="text-base leading-relaxed text-text-secondary">
                Wir wollen eine Zukunft, in der Open-Source-Infrastruktur für jedes Unternehmen zugänglich ist. VAE
                dokumentiert Standards, sorgt für transparente Prozesse und liefert echte Datensouveränität – damit Ihre
                Systeme nicht nur günstiger, sondern auch planbar und kontrollierbar bleiben.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <article className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 shadow-[0_30px_120px_-50px_rgba(5,212,182,0.35)] backdrop-blur-sm">
            <header className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-400 dark:text-red-300">
                Das Problem
              </p>
              <h3 className="text-2xl font-semibold text-text-light">Das SaaS-Dilemma</h3>
            </header>
            <ul className="space-y-5 text-sm leading-relaxed text-text-secondary">
              {openSourcePainPoints.map(point => (
                <li key={point.title}>
                  <p className="font-semibold text-text-light">{point.title}</p>
                  <p>{point.description}</p>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-vae-turquoise/20 bg-vae-turquoise/5 p-8 backdrop-blur-sm">
            <header className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/80">Die Lösung</p>
              <h3 className="text-2xl font-semibold text-text-light">Die Open-Source-Alternative</h3>
            </header>
            <ul className="space-y-5 text-sm leading-relaxed text-text-secondary">
              {openSourceAdvantages.map(point => (
                <li key={point.title}>
                  <p className="font-semibold text-text-light">{point.title}</p>
                  <p>{point.description}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/leistungen/strategie"
            className="inline-flex items-center gap-2 text-sm font-semibold text-vae-turquoise transition-colors hover:text-vae-turquoise/80"
          >
            Kostenlose Erstberatung vereinbaren
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default WhyOpenSourceSection
