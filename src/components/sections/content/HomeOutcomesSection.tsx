/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  HOME OUTCOMES SECTION                                                    ┃
 * ┃  Homepage-spezifische Darstellung: Highlights + Metrics.                  ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎛️ CORE
 * ├── whyVaeHighlights[]   → Warum VAE (Icon, Title, Description, Proof)
 * └── outcomeMetrics[]     → Kennzahlen als Social Proof
 *
 * ⛓️ GATES
 * └── prefers-reduced-motion → Skip GSAP animations
 *
 * 🔁 SIDE-EFFECTS
 * └── GSAP ScrollTrigger.batch → Staggered card entrance
 *
 * 🎨 LAYERS
 * ├── Radial gradient bg   → Ambient glow
 * ├── Highlight cards grid → Links
 * └── Metrics sidebar      → Rechts
 */

import Icon from '@/components/ui/Icon'
import { homeOutcomesDescription, homeOutcomesHeading, outcomeMetrics, whyVaeHighlights } from '@/content/home'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════════════════════════════
// 🚪 ORCHESTRATOR — HomeOutcomesSection
// ═══════════════════════════════════════════════════════════════════════════
const HomeOutcomesSection: React.FC<{ id?: string; className?: string }> = ({ id = 'outcomes', className = '' }) => {
  const ref = useRef<HTMLDivElement>(null)

  // 🧮 Hilfsfunktion: Zahl aus KPI-String extrahieren (z.B. "68 %", "€2.400", "9,6 / 10")
  // Berücksichtigt Tausenderpunkte ("2.400" → 2400) und Komma-Decimals ("9,6" → 9.6).
  const parseNumericValue = (raw: string) => {
    const cleaned = raw.replace(/[^0-9,.-]/g, '')
    // Entferne Tausenderpunkte (nur wenn vor exakt 3 Ziffern) und konvertiere Komma zu Punkt
    const normalized = cleaned.replace(/\.(?=\d{3}(?:\D|$))/g, '').replace(',', '.')
    const match = normalized.match(/-?\d+(?:\.\d+)?/)
    return match ? parseFloat(match[0]) : 0
  }

  const normalizedMetrics = React.useMemo(() => {
    const parsed = outcomeMetrics.map(m => ({
      ...m,
      numeric: parseNumericValue(m.value),
    }))
    const max = parsed.reduce((acc, cur) => (cur.numeric > acc ? cur.numeric : acc), 0) || 1
    const minWidth = 24 // % Mindestbreite für Sichtbarkeit
    return parsed.map(m => ({
      ...m,
      width: Math.max(minWidth, Math.min(100, minWidth + (m.numeric / max) * (100 - minWidth))),
    }))
  }, [])

  // ── 🔁 SIDE-EFFECT — GSAP ScrollTrigger Batch Animation ──
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    // ⛓️ GATE — Accessibility Check
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
    // 🧹 CLEANUP
    return () => ctx.revert()
  }, [])

  return (
    <section
      id={id}
      ref={ref}
      className={`from-bg-primary to-bg-primary relative overflow-hidden border-t border-vae-turquoise/10 bg-gradient-to-br via-bg-secondary py-20 dark:from-bg-darker dark:via-bg-dark dark:to-bg-secondary sm:py-28 ${className}`.trim()}
      aria-labelledby="outcomes-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(var(--vae-turquoise-rgb),0.22),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(var(--vae-turquoise-rgb),0.16),transparent_60%)]" />
      </div>
      <div className="container-vae relative">
        <header className="mb-16 max-w-4xl">
          <h2 id="outcomes-heading" className="h2 fluid-h2 heading-gradient h-space mb-4">
            {homeOutcomesHeading}
          </h2>
          <p className="text-lg leading-relaxed text-text-secondary md:text-xl">
            {homeOutcomesDescription.before}
            {homeOutcomesDescription.after}
          </p>
        </header>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)]">
          <div className="grid gap-6" data-why-list>
            {whyVaeHighlights.map((item, index) => (
              <article
                key={item.title}
                data-outcome-card
                className="border-border-primary bg-bg-primary/[0.04] relative overflow-hidden rounded-xl border p-6 backdrop-blur-sm transition-all duration-300 hover:border-vae-turquoise/40 hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.2),0_16px_52px_-20px_rgba(var(--vae-turquoise-rgb),0.4)] dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div
                  className="absolute -top-10 right-4 h-24 w-24 rounded-full bg-vae-turquoise/10 blur-3xl"
                  aria-hidden="true"
                />
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-vae-turquoise/25 text-vae-turquoise">
                    <Icon name={item.icon} className="text-vae-turquoise" size={22} />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-vae-turquoise dark:text-vae-turquoise/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mb-3 text-lg font-semibold leading-snug text-text-light">{item.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-vae-turquoise/80">
                  {item.proof}
                </p>
              </article>
            ))}
          </div>
          <aside
            className="border-border-primary bg-bg-primary/[0.05] sticky top-28 rounded-xl border p-6 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04] lg:p-8"
            data-outcome-card
            aria-label="Kennzahlen"
          >
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-vae-turquoise dark:text-vae-turquoise/70">
                KPIs
              </span>
              <h3 className="mt-2 text-xl font-semibold text-text-light">Was Pilotkund:innen erreichen</h3>
            </div>
            <ul className="space-y-6">
              {normalizedMetrics.map(metric => (
                <li key={metric.label} className="flex items-start gap-4">
                  <div className="relative flex flex-col">
                    <span className="text-4xl font-bold leading-none text-vae-turquoise sm:text-5xl">
                      {metric.value}
                    </span>
                    <span className="mt-2 block h-1.5 w-28 overflow-hidden rounded-full bg-white/15">
                      <span
                        className="block h-full rounded-full bg-gradient-to-r from-vae-turquoise to-vae-turquoise-dark transition-all duration-500"
                        style={{ width: `${metric.width}%` }}
                        aria-hidden
                      />
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-text-secondary sm:text-base">{metric.label}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default HomeOutcomesSection
