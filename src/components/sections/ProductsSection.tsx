import React from 'react'
import { productCategories } from '../navigation/productCategories'
import { ParallaxBackdrop, ParticleField } from './BackgroundEffects'
import { Link } from 'react-router-dom'
import NewsletterForm from '../forms/NewsletterForm'

const ProductsSection: React.FC = () => {
  return (
  <section id="products" className="relative py-32 overflow-hidden border-t border-white/5 surface-alt">
      <ParallaxBackdrop strength={10} />
      <ParticleField count={18} />
      {/* Background subtle gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 70% 20%, hsla(var(--color-vae-turquoise),0.12), transparent 55%)`
          }}
        />
      </div>

      <div className="container-vae relative">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-5 text-gradient">Produkte & Plattform</h2>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-4">
            Vier Erlebniswelten – Lösungen, Applikationen, Plattform & Ökosystem. Alles folgt einem Prinzip: pragmatischer Nutzen ohne versteckte Abhängigkeiten.
          </p>
          <p className="text-sm text-text-muted leading-relaxed">
            Studien & Branchenreports zeigen wiederholt: Fragmentierte Tool‑Landschaften, fehlende Betriebs- & Integrationskompetenzen sowie mangelnde Observability bremsen Skalierung. Unsere Suite adressiert genau diese Lücken schrittweise.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {productCategories.map(cat => (
            <div
              key={cat.key}
              className={`group relative flex flex-col rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/15 backdrop-blur-xl hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-vae-turquoise/15 will-change-transform ${cat.accent === 'core' ? 'border-vae-turquoise/40 from-vae-turquoise/15 to-bg-darker' : ''} ${cat.accent === 'built' ? 'from-bg-darker/90 to-vae-turquoise/10' : ''}`}
            >
              {/* Accent bar */}
              <div className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${cat.accent === 'core' ? 'bg-gradient-to-r from-vae-turquoise via-vae-turquoise-light to-vae-turquoise' : 'bg-gradient-to-r from-vae-turquoise/70 to-vae-turquoise-dark/70'}`} />
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white leading-tight">{cat.title}</h3>
                  <p className="text-xs uppercase tracking-wide text-vae-turquoise/80 mt-1">{cat.tagline}</p>
                </div>
                {cat.badge && (
                  <span className="px-2 py-1 text-[10px] font-semibold rounded-full bg-vae-turquoise/15 text-vae-turquoise border border-vae-turquoise/30">
                    {cat.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-text-secondary mb-5 flex-grow leading-relaxed group-hover:text-white/90 transition-colors">{cat.description}</p>
              <ul className="space-y-2 mb-6 text-sm">
                {cat.points.map(p => (
                  <li key={p} className="flex items-start gap-2 text-text-secondary group-hover:text-white/80 transition-colors">
                    <span className="mt-0.5 w-2 h-2 rounded-full bg-vae-turquoise/70 group-hover:bg-vae-turquoise" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={
                  cat.key === 'solutions' ? '/products/solutions'
                  : cat.key === 'tools' ? '/products/tools'
                  : cat.key === 'core' ? '/products/vae-core'
                  : cat.key === 'built' ? '/products/showcases'
                  : '/products'
                }
                className="mt-auto w-full text-center rounded-lg py-3 text-sm font-medium bg-vae-turquoise/15 text-vae-turquoise border border-vae-turquoise/40 hover:bg-vae-turquoise hover:text-bg-darker hover:shadow-lg hover:shadow-vae-turquoise/30 transition-all"
              >
                {cat.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-32 max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[linear-gradient(140deg,rgba(5,12,10,0.85),rgba(10,28,24,0.85))] backdrop-blur-xl p-10 md:p-14">
            <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_80%_30%,rgba(0,255,165,0.18),transparent_60%)]" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
              <div className="md:max-w-md">
                <h3 className="text-2xl font-semibold text-white mb-4">Produkt‑ & Architektur‑Updates</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  Kurz, kuratiert, kein Spam: Releasenotizen, Learnings aus Projekten, Hinweise zu Governance & Observability.
                </p>
                <p className="text-[11px] text-text-muted">Frequenz ca. 1× pro Monat. Abmeldung jederzeit.</p>
              </div>
              <div className="flex-1">
                <NewsletterForm inline />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductsSection
