import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { outcomes, badges } from '../../content/aboutWhy'
import { homeOutcomesHeading, homeOutcomesDescription } from '../../content/home'
import Card from '../ui/Card'
import Icon from '@/components/ui/Icon'

/**
 * HomeOutcomesSection
 * Schlanke, homepage-spezifische Variante (keine Prinzipien/Testimonial),
 * neue Kurz-Tagline, um Dopplung "Substanz statt KI-Hype" zu vermeiden.
 */
const HomeOutcomesSection: React.FC<{ id?: string; className?: string }> = ({ id = 'outcomes', className = '' }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return
      const el = ref.current
      if (!el) return
      const cards = el.querySelectorAll('[data-outcome-card]')
      gsap.set(cards, { opacity: 0, y: 34 })
      ScrollTrigger.batch(cards, {
        start: 'top 80%',
        onEnter: batch =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06, force3D: true }),
        once: true,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  // Nur die ersten 3 Outcomes auf Home (kompakt)
  const primary = outcomes.slice(0, 3)

  return (
    <section
      id={id}
      ref={ref}
      className={`from-bg-primary to-bg-primary relative overflow-hidden border-t border-vae-turquoise/10 bg-gradient-to-br via-bg-secondary py-20 dark:from-bg-darker dark:via-bg-dark dark:to-bg-secondary sm:py-28 ${className}`.trim()}
      aria-labelledby="outcomes-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(var(--vae-turquoise-rgb),0.14),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(var(--vae-turquoise-rgb),0.10),transparent_60%)]" />
      </div>
      <div className="container-vae relative">
        <header className="mb-16 max-w-4xl">
          <h2 id="outcomes-heading" className="h2 fluid-h2 heading-gradient h-space mb-4">
            {homeOutcomesHeading}
          </h2>
          <p className="text-lg leading-relaxed text-text-secondary md:text-xl">
            {homeOutcomesDescription.before}
            <a href="/about#warum" className="text-vae-turquoise hover:underline">
              Über Uns
            </a>
            {homeOutcomesDescription.after}
          </p>
        </header>
        <div className="mb-14 grid items-stretch gap-8 sm:grid-cols-2 md:grid-cols-3">
          {primary.map((o, i) => (
            <Card as="div" key={o.key} data-outcome-card className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-vae-turquoise/25 text-vae-turquoise">
                    <Icon name={o.icon || 'hub'} className="text-vae-turquoise" size={22} />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-vae-turquoise/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
              <h3 className="mb-3 text-lg font-semibold leading-snug text-text-light">{o.headline}</h3>
              <p className="flex-grow text-sm leading-relaxed text-text-secondary">{o.body}</p>
              {o.evidence && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {o.evidence.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="rounded-full border border-vae-turquoise/20 bg-vae-turquoise/10 px-2.5 py-1 text-[11px] tracking-wide text-vae-turquoise transition-colors group-hover:border-vae-turquoise/40 group-hover:bg-vae-turquoise/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
        <div className="mb-10 flex flex-wrap gap-3">
          {badges.slice(0, 3).map(b => (
            <div
              key={b.key}
              className="flex items-center gap-2 rounded-full border border-vae-turquoise/20 bg-vae-turquoise/10 px-3 py-1.5 text-[12px] text-vae-turquoise"
            >
              <Icon name={b.icon} className="text-vae-turquoise" size={16} />
              <span>{b.label}</span>
            </div>
          ))}
        </div>
        <div className="text-sm text-text-muted">
          <a href="/about#warum" className="inline-flex items-center gap-1 text-vae-turquoise hover:underline">
            Mehr Outcomes & Prinzipien ansehen <Icon name="arrow_forward" size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default HomeOutcomesSection
