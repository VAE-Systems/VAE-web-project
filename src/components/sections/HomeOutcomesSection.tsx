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
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06, force3D: true }),
        once: true
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  // Nur die ersten 3 Outcomes auf Home (kompakt)
  const primary = outcomes.slice(0, 3)

  return (
    <section id={id} ref={ref} className={`relative py-20 sm:py-28 border-t border-vae-turquoise/10 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary dark:from-bg-darker dark:via-bg-dark dark:to-bg-secondary overflow-hidden ${className}`.trim()} aria-labelledby="outcomes-heading">
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(var(--vae-turquoise-rgb),0.14),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(var(--vae-turquoise-rgb),0.10),transparent_60%)]" />
      </div>
      <div className="container-vae relative">
        <header className="max-w-4xl mb-16">
          <h2 id="outcomes-heading" className="h2 fluid-h2 heading-gradient h-space mb-4">{homeOutcomesHeading}</h2>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            {homeOutcomesDescription.before}
            <a href="/about#warum" className="text-vae-turquoise hover:underline">Über Uns</a>
            {homeOutcomesDescription.after}
          </p>
        </header>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-14 items-stretch">
          {primary.map((o, i) => (
            <Card as="div" key={o.key} data-outcome-card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-vae-turquoise/25 flex items-center justify-center text-vae-turquoise">
                    <Icon name={o.icon || 'hub'} className="text-vae-turquoise" size={22} />
                  </div>
                  <span className="text-xs uppercase tracking-wider text-vae-turquoise/70 font-medium">{String(i+1).padStart(2,'0')}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-text-light mb-3 leading-snug">{o.headline}</h3>
              <p className="text-sm text-text-secondary leading-relaxed flex-grow">{o.body}</p>
              {o.evidence && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {o.evidence.slice(0,3).map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-vae-turquoise/10 border border-vae-turquoise/20 text-[11px] tracking-wide text-vae-turquoise group-hover:border-vae-turquoise/40 group-hover:bg-vae-turquoise/20 transition-colors">{tag}</span>
                  ))}
                </div>
              )}
            </Card>
          ))} 
        </div>
        <div className="flex flex-wrap gap-3 mb-10">
          {badges.slice(0,3).map(b => (
            <div key={b.key} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-vae-turquoise/10 border border-vae-turquoise/20 text-[12px] text-vae-turquoise">
              <Icon name={b.icon} className="text-vae-turquoise" size={16} />
              <span>{b.label}</span>
            </div>
          ))}
        </div>
        <div className="text-sm text-text-muted">
          <a href="/about#warum" className="inline-flex items-center gap-1 text-vae-turquoise hover:underline">Mehr Outcomes & Prinzipien ansehen <Icon name="arrow_forward" size={16} /></a>
        </div>
      </div>
    </section>
  )
}

export default HomeOutcomesSection
