/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  PROCESS SECTION                                                          ┃
 * ┃  "Wie wir starten & liefern" → Strukturierte Schritte mit Artefakten.     ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎛️ CORE
 * ├── processSteps[]       → Schritte aus content/process
 * ├── annotateWithHints()  → Inline-Glossar-Links für Fachbegriffe
 * └── processDisclaimer    → Fußnote mit Flexibilitäts-Hinweis
 *
 * ⛓️ GATES
 * └── prefers-reduced-motion → Skip GSAP animations
 *
 * 🔁 SIDE-EFFECTS
 * └── GSAP ScrollTrigger.batch → Staggered card entrance
 *
 * 🎨 LAYERS
 * ├── about-surface-bg     → Themed background
 * ├── Header + accent bar
 * └── 2-col grid of step cards
 */

import { TermHint } from '@/components/ui/Glossary'
import Icon from '@/components/ui/Icon'
import { processDisclaimer, processSteps } from '@/content/process'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════════════════════════════
// 🎛️ CORE — Glossary Annotation Helper
// ═══════════════════════════════════════════════════════════════════════════
// Wrap glossary term occurrences inside text with TermHint (underline hover)
function annotateWithHints(text: string, terms: string[]): (string | JSX.Element)[] {
  if (!terms.length) return [text]
  const sorted = [...terms].sort((a, b) => b.length - a.length)
  const pattern = new RegExp(`(${sorted.map(t => t.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')).join('|')})`, 'gi')
  const parts: (string | JSX.Element)[] = []
  let last = 0
  let m: RegExpExecArray | null
  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const matchText = m[0]
    parts.push(<TermHint key={parts.length + matchText} term={matchText} />)
    last = m.index + matchText.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

interface ProcessSectionProps {
  id?: string
  className?: string
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚪 ORCHESTRATOR — ProcessSection
// ═══════════════════════════════════════════════════════════════════════════
const ProcessSection: React.FC<ProcessSectionProps> = ({ id = 'prozess', className = '' }) => {
  const ref = useRef<HTMLDivElement>(null)

  // ── 🔁 SIDE-EFFECT — GSAP ScrollTrigger Batch Animation ──
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    // ⛓️ GATE — Accessibility Check
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
        once: true,
      })
    }, ref)
    // 🧹 CLEANUP
    return () => ctx.revert()
  }, [])

  return (
    <section
      id={id}
      className={`about-section theme-c relative z-10 py-32 ${className}`}
      data-section
      ref={ref}
      aria-labelledby="process-heading"
    >
      <div className="about-surface-bg" aria-hidden="true" />
      <div className="container-vae relative mx-auto max-w-6xl">
        <header className="mb-14 max-w-3xl" data-heading-accent>
          <h2 id="process-heading" className="heading-fix mb-6 text-4xl font-bold text-white md:text-5xl">
            Wie wir starten & liefern
          </h2>
          <div className="heading-accent-bar mb-6 h-[3px] w-36 rounded-full bg-gradient-to-r from-vae-turquoise to-transparent" />
          <p className="text-lg leading-relaxed text-text-secondary md:text-xl">
            Strukturierte Schritte – klare Artefakte – früh nutzbare Ergebnisse. Keine Blackbox, kein Hype-Spiel.
          </p>
        </header>
        <ol className="relative grid gap-8 md:grid-cols-2">
          {processSteps.map((s, i) => (
            <li key={s.key} data-step className="group relative">
              <div
                className="absolute -inset-px rounded-2xl bg-gradient-to-br from-vae-turquoise/25 to-transparent opacity-0 blur-md transition group-hover:opacity-100"
                aria-hidden="true"
              />
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm md:p-7">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-vae-turquoise/25 text-vae-turquoise">
                      <Icon name={s.icon} className="text-vae-turquoise" size={22} />
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wider text-vae-turquoise/70">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  {s.durationHint && (
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-text-secondary dark:text-white/60">
                      {s.durationHint}
                    </span>
                  )}
                </div>
                <h3 className="mb-3 text-lg font-semibold leading-snug text-text-light dark:text-white">{s.title}</h3>
                <p className="mb-4 flex-grow text-sm leading-relaxed text-text-secondary">
                  {annotateWithHints(
                    s.summary,
                    (s.glossary || []).map(g => g.term)
                  )}
                </p>
                {s.deliverables.length > 0 && (
                  <ul className="mb-4 space-y-1.5">
                    {s.deliverables.map(d => {
                      const annotated = annotateWithHints(
                        d,
                        (s.glossary || []).map(g => g.term)
                      )
                      return (
                        <li key={d} className="flex items-start gap-2 text-[12px] text-text-secondary">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="mt-[3px] flex-shrink-0 text-vae-turquoise"
                          >
                            <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" />
                          </svg>
                          <span>{annotated}</span>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-[11px] tracking-wide text-text-secondary">{processDisclaimer}</p>
      </div>
      <div className="section-divider-horizontal" aria-hidden="true" />
    </section>
  )
}

export default ProcessSection
