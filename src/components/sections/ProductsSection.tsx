import React from 'react'
import { productCategories } from '../navigation/productCategories'
import { ParallaxBackdrop, ParticleField } from './BackgroundEffects'
import { Link } from 'react-router-dom'

const ProductsSection: React.FC = () => {
  return (
  <section id="products" className="relative py-24 md:py-32 overflow-hidden border-t border-white/5 surface-alt">
      <ParallaxBackdrop strength={10} />
      <ParticleField count={18} />
      {/* Background subtle gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,hsla(var(--color-vae-turquoise),0.12),transparent_55%)]"
        />
      </div>

      <div className="container-vae relative">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="h2 heading-gradient mb-5">Produkte & Plattform</h2>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-4">
            Vier Erlebniswelten – Lösungen, Applikationen, Plattform & Ökosystem. Alles folgt einem Prinzip: pragmatischer Nutzen ohne versteckte Abhängigkeiten.
          </p>
          <p className="text-sm text-text-muted leading-relaxed">
            Studien & Branchenreports zeigen wiederholt: Fragmentierte Tool‑Landschaften, fehlende Betriebs- & Integrationskompetenzen sowie mangelnde Observability bremsen Skalierung. Unsere Suite adressiert genau diese Lücken schrittweise.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {productCategories.map(cat => {
            const link = cat.key === 'solutions' ? '/products/solutions'
              : cat.key === 'tools' ? '/products/tools'
              : cat.key === 'core' ? '/products/vae-core'
              : cat.key === 'built' ? '/products/showcases'
              : '/products'
            return (
              <Link
                key={cat.key}
                to={link}
                className={`group relative flex flex-col rounded-2xl overflow-hidden p-6 bg-white/[0.04] border border-white/10 backdrop-blur-md hover:-translate-y-2 transition-all duration-400 hover:border-vae-turquoise/40 hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_8px_34px_-6px_rgba(var(--vae-turquoise-rgb),0.35)]`}
              >
                <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_32%_22%,rgba(var(--vae-turquoise-rgb),0.18),transparent_65%)]" />
                <div className="flex items-start justify-between mb-5 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-vae-turquoise/20 text-vae-turquoise`}>
                      <span className="material-symbols-outlined text-xl">{cat.icon || 'apps'}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white leading-tight">{cat.title}</h3>
                      <p className="text-[10px] uppercase tracking-wide text-vae-turquoise/70 mt-1">{cat.tagline}</p>
                    </div>
                  </div>
                  {cat.badge && (
                    <span className="px-2 py-1 text-[10px] font-semibold rounded-md bg-vae-turquoise/10 text-vae-turquoise border border-vae-turquoise/30">
                      {cat.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed flex-grow relative z-10">{cat.description}</p>
                <ul className="space-y-2 mb-6 relative z-10">
                  {cat.points.map(p => (
                    <li key={p} className="flex items-center gap-2 text-[12px] text-text-secondary">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-vae-turquoise flex-shrink-0"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2"/></svg>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <span
                  className="btn-convert mt-auto gap-2 relative z-10 inline-flex items-center"
                >
                  {cat.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 18 18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 6h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M18 6v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProductsSection
