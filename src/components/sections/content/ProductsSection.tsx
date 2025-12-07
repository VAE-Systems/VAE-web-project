/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  PRODUCTS SECTION                                                         ┃
 * ┃  "Consulting Solutions" Grid → Lösungs-Pakete als Cards.                  ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎛️ CORE
 * └── productCategories[]  → Kategorien aus navigation/productCategories
 *
 * 🎨 LAYERS
 * ├── ParallaxBackdrop     → Mouse-following depth
 * ├── ParticleField        → Ambient particles
 * ├── Radial gradient bg   → Subtle glow
 * └── 4-col card grid      → Product category cards
 */

import { productCategories } from '@/components/navigation/productCategories'
import Icon from '@/components/ui/Icon'
import React from 'react'
import { Link } from 'react-router-dom'
import { ParallaxBackdrop, ParticleField } from '../effects/BackgroundEffects'

// ═══════════════════════════════════════════════════════════════════════════
// 🚪 ORCHESTRATOR — ProductsSection
// ═══════════════════════════════════════════════════════════════════════════
const ProductsSection: React.FC = () => {
  return (
    <section
      id="solutions"
      className="surface-alt relative overflow-hidden border-t border-vae-turquoise/10 py-24 md:py-32"
    >
      <ParallaxBackdrop strength={10} />
      <ParticleField count={18} />
      {/* Background subtle gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,hsla(var(--color-vae-turquoise),0.12),transparent_55%)]" />
      </div>

      <div className="container-vae relative">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="h2 fluid-h2 heading-gradient mb-5">Consulting Solutions</h2>
          <p className="mb-4 text-lg leading-relaxed text-text-secondary md:text-xl">
            Unsere Lösungs-Pakete verbinden Beratung, Implementierung und Betrieb. Ziel: Effizienz, Datenhoheit und
            schnelle Umsetzung ohne Vendor-Lock-in.
          </p>
          <p className="text-sm leading-relaxed text-text-muted">
            Wir kombinieren bewährte Open-Source-Bausteine mit AI Automationen und koordinieren erfahrene Teams. So
            entstehen skalierbare Lösungen mit klaren Ergebnissen.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {productCategories.map(cat => {
            const link = `/solutions#${cat.key}`
            return (
              <div
                key={cat.key}
                className={`duration-400 group relative flex flex-col overflow-hidden rounded-2xl border border-vae-turquoise/20 bg-vae-turquoise/5 p-6 backdrop-blur-md transition-all hover:-translate-y-2 hover:border-vae-turquoise/40 hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_8px_34px_-6px_rgba(var(--vae-turquoise-rgb),0.35)]`}
              >
                <div className="pointer-events-none absolute -inset-px bg-[radial-gradient(circle_at_32%_22%,rgba(var(--vae-turquoise-rgb),0.18),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 mb-5 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-vae-turquoise/20 text-vae-turquoise`}
                    >
                      <Icon name={cat.icon || 'apps'} className="text-vae-turquoise" size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold leading-tight text-text-light">{cat.title}</h3>
                      <p className="mt-1 text-[10px] uppercase tracking-wide text-vae-turquoise/70">{cat.tagline}</p>
                    </div>
                  </div>
                  {cat.badge && (
                    <span className="rounded-md border border-vae-turquoise/30 bg-vae-turquoise/10 px-2 py-1 text-[10px] font-semibold text-vae-turquoise">
                      {cat.badge}
                    </span>
                  )}
                </div>
                <p className="relative z-10 mb-4 flex-grow text-sm leading-relaxed text-text-secondary">
                  {cat.description}
                </p>
                <ul className="relative z-10 mb-6 space-y-2">
                  {cat.points.map(p => (
                    <li key={p} className="flex items-center gap-2 text-[12px] text-text-secondary">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="flex-shrink-0 text-vae-turquoise"
                      >
                        <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link to={link} className="btn-convert relative z-10 mt-auto gap-2">
                  {cat.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 18 18 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M9 6h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M18 6v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProductsSection
