/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  WHY OUTCOMES SECTION                                                     ┃
 * ┃  "Warum VAE" mit Outcomes, Principles, Badges, Testimonial.               ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎛️ CORE
 * ├── outcomes[]           → Haupt-Vorteile mit Icon + Description
 * ├── principles[]         → Arbeits-Prinzipien
 * ├── badges[]             → Trust-Signale
 * └── testimonial          → Kundenreferenz
 *
 * ⛓️ GATES
 * └── prefers-reduced-motion → Skip GSAP animations
 *
 * 🔁 SIDE-EFFECTS
 * └── GSAP ScrollTrigger.batch → Cards, Principles, Badges entrance
 *
 * 🎨 LAYERS
 * ├── Outcomes grid (3-col)
 * ├── Principles list
 * ├── Badges row
 * └── Testimonial quote
 */

import Icon from '@/components/ui/Icon'
import { badges, outcomes, principles, tagline, testimonial } from '@/content/aboutWhy'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef } from 'react'

interface WhyOutcomesSectionProps {
  className?: string
  id?: string
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚪 ORCHESTRATOR — WhyOutcomesSection
// ═══════════════════════════════════════════════════════════════════════════
const WhyOutcomesSection: React.FC<WhyOutcomesSectionProps> = ({ className = '', id = 'warum' }) => {
  const rootRef = useRef<HTMLDivElement>(null)

  // ── 🔁 SIDE-EFFECT — GSAP ScrollTrigger Batch Animations ──
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    // ⛓️ GATE — Accessibility Check
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return
      const el = rootRef.current
      if (!el) return

      const cards = el.querySelectorAll('[data-outcome]')
      gsap.set(cards, { opacity: 0, y: 36 })
      ScrollTrigger.batch(cards, {
        start: 'top 80%',
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 }),
        once: true,
      })

      const principleItems = el.querySelectorAll('[data-principle]')
      gsap.set(principleItems, { opacity: 0, y: 20 })
      ScrollTrigger.batch(principleItems, {
        start: 'top 85%',
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.05 }),
        once: true,
      })

      const badgesRow = el.querySelector('[data-badges]')
      if (badgesRow) {
        gsap.from(badgesRow.children, {
          opacity: 0,
          y: 14,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: { trigger: badgesRow, start: 'top 85%', once: true },
        })
      }
    }, rootRef)
    // 🧹 CLEANUP
    return () => ctx.revert()
  }, [])

  return (
    <section
      id={id}
      className={`relative z-10 bg-[#faf8f4] py-24 text-black dark:bg-[#030806] dark:text-white sm:py-32 ${className}`}
      data-section
      ref={rootRef}
      aria-labelledby="why-heading"
    >
      <div className="container-vae relative">
        <div className="mx-auto max-w-6xl">
          <header className="mb-14 max-w-3xl" data-heading-accent>
            <p className="text-[11px] font-black uppercase tracking-[0.34em] text-vae-turquoise">Warum VAE</p>
            <h2
              id="why-heading"
              className="mt-4 text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-gray-900 dark:text-white md:text-5xl"
            >
              Was unsere Kunden wirklich bekommen
            </h2>
            <div className="my-5 h-[3px] w-32 bg-vae-turquoise" />
            <p className="text-base leading-relaxed text-gray-700 dark:text-white/70 sm:text-lg">{tagline}</p>
          </header>
          <div className="grid items-start gap-12 lg:grid-cols-3">
            {/* Outcomes */}
            <div className="grid gap-8 md:grid-cols-2 lg:col-span-2">
              {outcomes.map((o, idx) => (
                <div key={o.key} className="group relative" data-outcome>
                  <div className="flex h-full flex-col border border-gray-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/50 dark:border-white/10 dark:bg-white/5 md:p-7">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-11 w-11 items-center justify-center bg-vae-turquoise/20 text-vae-turquoise">
                          <Icon name={o.icon} className="text-vae-turquoise" size={22} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-wider text-vae-turquoise">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                    <h3 className="mb-3 text-base font-black uppercase leading-[0.92] tracking-[-0.03em] text-gray-900 dark:text-white">
                      {o.headline}
                    </h3>
                    <p className="flex-grow text-sm leading-relaxed text-text-secondary">{o.body}</p>
                    {o.evidence && (
                      <div className="mt-5 flex flex-wrap gap-2" data-chip-group>
                        {o.evidence.map(tag => (
                          <span
                            key={tag}
                            className="border border-vae-turquoise/25 bg-vae-turquoise/5 px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-vae-turquoise"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Principles + Testimonial */}
            <aside className="space-y-8" aria-label="Prinzipien & Beleg">
              <div>
                <h3 className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-vae-turquoise">
                  Warum das funktioniert
                </h3>
                <ul className="space-y-4">
                  {principles.map(p => (
                    <li key={p.key} className="flex items-start space-x-3" data-principle>
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center bg-vae-turquoise/20">
                        <Icon name={p.icon} className="text-vae-turquoise" size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-black uppercase leading-tight text-gray-900 dark:text-white">
                          {p.title}
                        </div>
                        <div className="text-[11px] tracking-wide text-text-secondary">{p.caption}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-white/5" data-principle>
                <blockquote className="mb-3 text-sm leading-relaxed text-text-secondary">
                  “{testimonial.quote}”
                </blockquote>
                <div className="text-xs text-text-muted dark:text-white/70">
                  {testimonial.author && (
                    <span className="font-medium text-text-light dark:text-white">{testimonial.author}</span>
                  )}{' '}
                  {testimonial.role && <> · {testimonial.role}</>}{' '}
                  {testimonial.company && <> · {testimonial.company}</>}
                </div>
              </div>
            </aside>
          </div>

          {/* Badges */}
          <div className="mt-14 flex flex-wrap gap-3" data-badges>
            {badges.map(b => (
              <div
                key={b.key}
                className="flex items-center gap-2 border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
              >
                <Icon name={b.icon} className="text-vae-turquoise" size={16} />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyOutcomesSection
