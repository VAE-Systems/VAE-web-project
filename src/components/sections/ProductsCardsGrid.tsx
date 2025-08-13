import React from 'react'
import { Link } from 'react-router-dom'
import { productCategories } from '../navigation/productCategories'

const ProductsCardsGrid: React.FC = () => {
  const visibleKeys = ['solutions', 'tools', 'core'] // Reihenfolge wie gewünscht
  const items = productCategories.filter(p => visibleKeys.includes(p.key))

  return (
    <div className="mt-10">
      <div className="container-vae">
        <header className="mb-8" data-animate>
          <h3 className="text-lg font-semibold text-white">Produkte & Plattform</h3>
          <p className="text-sm text-text-secondary">Schnell einsatzfähige Applikationen, Lizenzmodelle und das VAE CORE als Betriebsplattform.</p>
        </header>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8" data-animate>
          {items.map(cat => (
            <article
              key={cat.key}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-md p-6 flex flex-col overflow-hidden transition-all duration-300 hover:border-vae-turquoise/40 hover:shadow-[0_0_0_1px_rgba(0,255,165,0.12),0_10px_40px_-10px_rgba(0,255,165,0.28)]"
            >
              <div className="flex items-start justify-between mb-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-vae-turquoise/10 flex items-center justify-center text-2xl text-vae-turquoise">
                    <span className="material-symbols-outlined">{cat.icon || 'layers'}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">{cat.title}</h4>
                    <p className="text-xs text-vae-turquoise/70 uppercase tracking-wide mt-1">{cat.tagline}</p>
                  </div>
                </div>

                {cat.badge && (
                  <span className="px-2 py-1 rounded-md bg-vae-turquoise/10 text-vae-turquoise text-[10px] font-medium tracking-wide">{cat.badge}</span>
                )}
              </div>

              <p className="text-sm text-text-secondary mb-4">{cat.description}</p>

              <ul className="mb-4 space-y-2 text-[13px] text-text-secondary">
                {cat.points.slice(0, 3).map(p => (
                  <li key={p} className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-vae-turquoise flex-shrink-0"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2"/></svg>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center gap-3">
                <Link to={`/products/${cat.key}`} className="btn-primary">Ansehen</Link>
                <Link to="/contact" className="btn-secondary">Kontakt</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsCardsGrid
