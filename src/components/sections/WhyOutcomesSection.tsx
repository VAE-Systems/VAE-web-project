import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { outcomes, principles, badges, testimonial, tagline } from '../../content/aboutWhy'
import Icon from '@/components/ui/Icon'

interface WhyOutcomesSectionProps {
  className?: string
  id?: string
}

const WhyOutcomesSection: React.FC<WhyOutcomesSectionProps> = ({ className = '', id = 'warum' }) => {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
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
    return () => ctx.revert()
  }, [])

  return (
    <section
      id={id}
      className={`about-section theme-e relative z-10 py-32 ${className}`}
      data-section
      ref={rootRef}
      aria-labelledby="why-heading"
    >
      <div className="about-surface-bg" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(var(--vae-turquoise-rgb),0.18),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(var(--vae-turquoise-rgb),0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--color-white-rgb),0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--color-white-rgb),0.05)_1px,transparent_1px)] bg-[size:70px_70px] mix-blend-overlay" />
      </div>
      <div className="container-vae relative">
        <div className="mx-auto max-w-6xl">
          <header className="mb-14 max-w-3xl" data-heading-accent>
            <h2 id="why-heading" className="fluid-h2 heading-fix mb-6 font-bold text-text-light dark:text-white">
              {tagline}
            </h2>
            <div className="heading-accent-bar mb-6 h-[3px] w-40 rounded-full bg-gradient-to-r from-vae-turquoise to-transparent" />
            <p className="text-lg leading-relaxed text-text-secondary md:text-xl">
              Was Kunden konkret gewinnen – und die Prinzipien, die das ermöglichen.
            </p>
          </header>
          <div className="grid items-start gap-12 lg:grid-cols-3">
            {/* Outcomes */}
            <div className="grid gap-8 md:grid-cols-2 lg:col-span-2">
              {outcomes.map((o, idx) => (
                <div key={o.key} className="group relative" data-outcome>
                  <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-vae-turquoise/25 to-transparent opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="border-border-primary bg-bg-primary/[0.035] flex h-full flex-col rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-vae-turquoise/40 group-hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_4px_30px_-6px_rgba(var(--vae-turquoise-rgb),0.3)] dark:border-white/10 dark:bg-white/[0.035] md:p-7">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-vae-turquoise/25 text-vae-turquoise transition-transform duration-300 group-hover:scale-110">
                          <Icon name={o.icon} className="text-vae-turquoise" size={22} />
                        </div>
                        <span className="text-xs font-medium uppercase tracking-wider text-vae-turquoise/70">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                    <h3 className="mb-3 text-lg font-semibold leading-snug text-text-light dark:text-white">
                      {o.headline}
                    </h3>
                    <p className="flex-grow text-sm leading-relaxed text-text-secondary">{o.body}</p>
                    {o.evidence && (
                      <div className="mt-5 flex flex-wrap gap-2" data-chip-group>
                        {o.evidence.map(tag => (
                          <span
                            key={tag}
                            className="bg-bg-primary/5 border-border-primary rounded-full border px-2.5 py-1 text-[11px] tracking-wide text-text-muted transition-colors group-hover:border-vae-turquoise/30 group-hover:text-text-light dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:group-hover:text-white"
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
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-vae-turquoise/80">
                  Warum das funktioniert
                </h3>
                <ul className="space-y-4">
                  {principles.map(p => (
                    <li key={p.key} className="flex items-start space-x-3" data-principle>
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-vae-turquoise/20">
                        <Icon name={p.icon} className="text-vae-turquoise" size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-medium leading-tight text-text-light dark:text-white">
                          {p.title}
                        </div>
                        <div className="text-[11px] tracking-wide text-text-secondary">{p.caption}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="border-border-primary bg-bg-primary/[0.04] rounded-2xl border p-5 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]"
                data-principle
              >
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
                className="bg-bg-primary/5 border-border-primary flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] text-text-muted dark:border-white/10 dark:bg-white/5 dark:text-white/70"
              >
                <Icon name={b.icon} className="text-vae-turquoise" size={16} />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-divider-horizontal" aria-hidden="true" />
    </section>
  )
}

export default WhyOutcomesSection
