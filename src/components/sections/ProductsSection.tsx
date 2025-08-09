import React from 'react'
import { productCategories } from '../navigation/productCategories'
import { ParallaxBackdrop, ParticleField } from './BackgroundEffects'

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
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            Von modularen Komponenten bis zur vollintegrierten Plattform – wählen Sie den Grad an Umsetzung, der zu Ihrer Roadmap passt.
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
              <button className="mt-auto w-full rounded-lg py-3 text-sm font-medium bg-vae-turquoise/15 text-vae-turquoise border border-vae-turquoise/40 hover:bg-vae-turquoise hover:text-bg-darker hover:shadow-lg hover:shadow-vae-turquoise/30 transition-all">
                {cat.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsSection
