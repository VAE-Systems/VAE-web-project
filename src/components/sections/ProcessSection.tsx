import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { processSteps, processDisclaimer } from '../../content/process'

interface ProcessSectionProps { id?: string; className?: string }

const ProcessSection: React.FC<ProcessSectionProps> = ({ id = 'prozess', className = '' }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [hoverTerm, setHoverTerm] = useState<{ term: string; explanation: string } | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return
      const el = ref.current
      if (!el) return
      const cards = el.querySelectorAll('[data-step]')
      gsap.set(cards, { opacity: 0, y: 40 })
      ScrollTrigger.batch(cards, {
        start: 'top 85%',
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 }),
        once: true
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id={id} className={`relative py-32 about-section theme-c z-10 ${className}`} data-section ref={ref} aria-labelledby="process-heading">
      <div className="about-surface-bg" aria-hidden="true" />
      <div className="container-vae relative max-w-6xl mx-auto">
        <header className="max-w-3xl mb-14" data-heading-accent>
          <h2 id="process-heading" className="text-4xl md:text-5xl font-bold text-white heading-fix mb-6">
            Wie wir starten & liefern
          </h2>
          <div className="heading-accent-bar h-[3px] w-36 bg-gradient-to-r from-vae-turquoise to-transparent rounded-full mb-6" />
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">Strukturierte Schritte – klare Artefakte – früh nutzbare Ergebnisse. Keine Blackbox, kein Hype-Spiel.</p>
        </header>
        <ol className="grid md:grid-cols-2 gap-8 relative">
          {processSteps.map((s, i) => (
            <li key={s.key} data-step className="relative group">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-vae-turquoise/25 to-transparent opacity-0 group-hover:opacity-100 blur-md transition" aria-hidden="true" />
              <div className="h-full flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 md:p-7">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-vae-turquoise/25 flex items-center justify-center text-vae-turquoise">
                      <span className="material-symbols-outlined text-[22px]">{s.icon}</span>
                    </div>
                    <span className="text-xs uppercase tracking-wider text-vae-turquoise/70 font-medium">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  {s.durationHint && <span className="text-[11px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/60">{s.durationHint}</span>}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 leading-snug">{s.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-grow">{s.summary}</p>
                {s.deliverables.length > 0 && (
                  <ul className="space-y-1.5 mb-4">
                    {s.deliverables.map(d => (
                      <li key={d} className="flex items-start gap-2 text-[12px] text-text-secondary">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-vae-turquoise flex-shrink-0 mt-[3px]"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2"/></svg>
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
                {s.glossary && s.glossary.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {s.glossary.map(g => (
                      <button
                        key={g.term}
                        type="button"
                        onMouseEnter={() => setHoverTerm(g)}
                        onFocus={() => setHoverTerm(g)}
                        onMouseLeave={() => setHoverTerm(null)}
                        onBlur={() => setHoverTerm(null)}
                        className="text-[11px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-vae-turquoise/40 transition-colors"
                        aria-describedby={g.term + '-def'}
                      >
                        {g.term}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
        <p className="text-[11px] text-text-secondary mt-8 tracking-wide">{processDisclaimer}</p>
        {hoverTerm && (
          <div className="fixed bottom-6 right-6 max-w-xs p-4 rounded-xl bg-bg-darker/90 border border-white/10 backdrop-blur-md shadow-lg text-sm z-50" role="status">
            <div className="flex items-center justify-between mb-1">
              <strong className="text-white text-xs uppercase tracking-wider">{hoverTerm.term}</strong>
              <button onClick={() => setHoverTerm(null)} className="text-white/50 hover:text-white text-xs">×</button>
            </div>
            <p className="text-text-secondary leading-relaxed text-[12px]">{hoverTerm.explanation}</p>
          </div>
        )}
      </div>
      <div className="section-divider-horizontal" aria-hidden="true" />
    </section>
  )
}

export default ProcessSection
