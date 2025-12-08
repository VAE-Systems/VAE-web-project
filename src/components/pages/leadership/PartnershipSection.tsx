import { useFadeIn } from '@/components/pages/values/useFadeIn'
import { PARTNERSHIP_SECTION } from '@/content/shared/leadershipData'
import MagneticButton from '@/components/ui/buttons/MagneticButton'
import { Activity, Shield, Signal, Target } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import React, { useMemo } from 'react'

export const PartnershipSection: React.FC = () => {
  const { ref, isVisible } = useFadeIn({ threshold: 0.2 })
  const prefersReducedMotion = useReducedMotion()

  const iconMap = useMemo(
    () => ({
      'Agile Führung': Activity,
      Kontingenzplanung: Shield,
      'Lernen durch Signale': Signal,
      'Markt- und Wettbewerbsblick': Target,
    }),
    []
  )

  return (
    <section
      ref={ref}
      aria-labelledby="partnership-title"
      className={`relative z-0 border-t border-white/5 bg-bg-dark py-20 transition duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="container-vae space-y-12">
        <div className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/80">Führung</p>
          <h2 id="partnership-title" className="text-3xl font-semibold text-text-light md:text-4xl">
            {PARTNERSHIP_SECTION.title}
          </h2>
          <p className="mx-auto max-w-4xl text-base text-text-light/80">{PARTNERSHIP_SECTION.intro}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {PARTNERSHIP_SECTION.methodology.map((item, idx) => {
            const Icon = iconMap[item.label as keyof typeof iconMap] ?? Activity
            return (
              <motion.div
                key={item.label}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-white/[0.06] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-md"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 1, y: 0, transition: { delay: idx * 0.08, duration: 0.4 } }
                }
                whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.01, transition: { duration: 0.25 } }}
              >
                <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100" aria-hidden>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,214,175,0.14),transparent_50%)]" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-vae-turquoise/15 text-vae-turquoise">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="text-xl font-semibold text-text-light">{item.label}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text-light/75">{item.description}</p>
                <div
                  className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  aria-hidden
                />
                <p className="mt-3 text-xs uppercase tracking-[0.3em] text-vae-turquoise/80">Führung • VAE</p>
              </motion.div>
            )
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-3" aria-label="SEO Schlagworte">
          {PARTNERSHIP_SECTION.seoKeywords.map(keyword => (
            <span
              key={keyword}
              className="border-white/12 rounded-full border bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.32em] text-text-muted shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold text-vae-turquoise">
          {PARTNERSHIP_SECTION.links.map((link, idx) => (
            <MagneticButton key={link.href} intensity={0.08} scaleEffect>
              <motion.a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-ghost inline-flex items-center gap-2 border border-vae-turquoise/30 px-4 py-2"
                whileHover={
                  prefersReducedMotion ? undefined : { x: 2, transition: { duration: 0.2, delay: idx * 0.02 } }
                }
              >
                {link.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </motion.a>
            </MagneticButton>
          ))}
        </div>
      </div>
    </section>
  )
}
