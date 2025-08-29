import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { outcomes, principles, badges, testimonial, tagline } from '../../content/aboutWhy'

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
        once: true
      })

      const principleItems = el.querySelectorAll('[data-principle]')
      gsap.set(principleItems, { opacity: 0, y: 20 })
      ScrollTrigger.batch(principleItems, {
        start: 'top 85%',
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.05 }),
        once: true
      })

      const badgesRow = el.querySelector('[data-badges]')
      if (badgesRow) {
        gsap.from(badgesRow.children, { opacity: 0, y: 14, duration: 0.5, stagger: 0.05, ease: 'power2.out', scrollTrigger: { trigger: badgesRow, start: 'top 85%', once: true } })
      }
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id={id} className={`relative py-32 about-section theme-e z-10 ${className}`} data-section ref={rootRef} aria-labelledby="why-heading">
      <div className="about-surface-bg" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 opacity-70 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(var(--vae-turquoise-rgb),0.18),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(var(--vae-turquoise-rgb),0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px] mix-blend-overlay" />
      </div>
      <div className="container-vae relative">
        <div className="max-w-6xl mx-auto">
          <header className="max-w-3xl mb-14" data-heading-accent>
            <h2 id="why-heading" className="text-4xl md:text-5xl font-bold text-text-light dark:text-white heading-fix mb-6">
              {tagline}
            </h2>
            <div className="heading-accent-bar h-[3px] w-40 bg-gradient-to-r from-vae-turquoise to-transparent rounded-full mb-6" />
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
              Was Kunden konkret gewinnen – und die Prinzipien, die das ermöglichen.
            </p>
          </header>
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Outcomes */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
              {outcomes.map((o, idx) => (
                <div key={o.key} className="relative group" data-outcome>
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-vae-turquoise/25 to-transparent opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 pointer-events-none" />
                  <div className="h-full flex flex-col rounded-2xl border border-border-primary dark:border-white/10 bg-bg-primary/[0.035] dark:bg-white/[0.035] backdrop-blur-sm p-6 md:p-7 transition-all duration-300 group-hover:border-vae-turquoise/40 group-hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_4px_30px_-6px_rgba(var(--vae-turquoise-rgb),0.3)]">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-11 h-11 rounded-xl bg-vae-turquoise/25 flex items-center justify-center text-vae-turquoise group-hover:scale-110 transition-transform duration-300">
                          <span className="material-symbols-outlined text-[22px]">{o.icon}</span>
                        </div>
                        <span className="text-xs uppercase tracking-wider text-vae-turquoise/70 font-medium">{String(idx + 1).padStart(2, '0')}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-text-light dark:text-white mb-3 leading-snug">{o.headline}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed flex-grow">{o.body}</p>
                    {o.evidence && (
                      <div className="flex flex-wrap gap-2 mt-5" data-chip-group>
                        {o.evidence.map(tag => (
                          <span key={tag} className="px-2.5 py-1 rounded-full bg-bg-primary/5 dark:bg-white/5 border border-border-primary dark:border-white/10 text-[11px] tracking-wide text-text-muted dark:text-white/70 group-hover:border-vae-turquoise/30 group-hover:text-text-light dark:group-hover:text-white transition-colors">{tag}</span>
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
                <h3 className="text-sm font-semibold tracking-wider text-vae-turquoise/80 uppercase mb-4">Warum das funktioniert</h3>
                <ul className="space-y-4">
                  {principles.map(p => (
                    <li key={p.key} className="flex items-start space-x-3" data-principle>
                      <div className="w-8 h-8 rounded-lg bg-vae-turquoise/20 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-vae-turquoise text-sm">{p.icon}</span>
                      </div>
                      <div>
                        <div className="text-text-light dark:text-white text-sm font-medium leading-tight">{p.title}</div>
                        <div className="text-[11px] text-text-secondary tracking-wide">{p.caption}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 rounded-2xl border border-border-primary dark:border-white/10 bg-bg-primary/[0.04] dark:bg-white/[0.04] backdrop-blur-sm" data-principle>
                <blockquote className="text-sm text-text-secondary leading-relaxed mb-3">“{testimonial.quote}”</blockquote>
                <div className="text-xs text-text-muted dark:text-white/70">
                  {testimonial.author && <span className="font-medium text-text-light dark:text-white">{testimonial.author}</span>} {testimonial.role && <> · {testimonial.role}</>} {testimonial.company && <> · {testimonial.company}</>}
                </div>
              </div>
            </aside>
          </div>

          {/* Badges */}
          <div className="mt-14 flex flex-wrap gap-3" data-badges>
            {badges.map(b => (
              <div key={b.key} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-primary/5 dark:bg-white/5 border border-border-primary dark:border-white/10 text-[12px] text-text-muted dark:text-white/70">
                <span className="material-symbols-outlined text-base text-vae-turquoise">{b.icon}</span>
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
