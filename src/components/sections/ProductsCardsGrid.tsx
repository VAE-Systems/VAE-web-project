import React from 'react'
import { Link } from 'react-router-dom'
import CtaLink from '@/components/ui/CtaLink'
import { productCategories } from '../navigation/productCategories'

const ProductsCardsGrid: React.FC = () => {
  const visibleKeys = ['solutions', 'tools', 'core'] // Reihenfolge wie gewünscht
  const items = productCategories.filter(p => visibleKeys.includes(p.key))

  return (
    <div className="mt-8 sm:mt-10">
      <div className="container-vae">
        <header className="mb-6 sm:mb-8" data-animate>
          <h3 className="text-base sm:text-lg font-semibold text-text-light dark:text-white">Produkte & Plattform</h3>
          <p className="text-base md:text-sm text-text-secondary">Schnell einsatzfähige Applikationen, Lizenzmodelle und das VAE CORE als Betriebsplattform.</p>
        </header>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 sm:gap-8 items-stretch" data-animate>
          {items.map(cat => (
            <article
              key={cat.key}
              className="group relative rounded-2xl border border-border-primary dark:border-white/10 bg-bg-primary/5 dark:bg-white/5 backdrop-blur-md p-5 sm:p-6 flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-vae-turquoise/40 hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.12),0_10px_40px_-10px_rgba(var(--vae-turquoise-rgb),0.28)]"
            >
              <div className="flex items-start justify-between mb-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-vae-turquoise/10 flex items-center justify-center text-2xl text-vae-turquoise">
                    <span className="material-symbols-outlined">{cat.icon || 'layers'}</span>
                  </div>
                  <div>
                    <h4 className="text-text-light dark:text-white font-semibold text-lg">{cat.title}</h4>
                    <p className="text-sm md:text-xs text-vae-turquoise/70 uppercase tracking-wide mt-1">{cat.tagline}</p>
                  </div>
                </div>

                {cat.badge && (
                  <span className="px-2 py-1 rounded-md bg-vae-turquoise/10 text-vae-turquoise text-[10px] font-medium tracking-wide">{cat.badge}</span>
                )}
              </div>

              <p className="text-base md:text-sm text-text-secondary mb-4">{cat.description}</p>

              <ul className="mb-4 space-y-2 text-sm md:text-[13px] text-text-secondary">
                {cat.points.slice(0, 3).map(p => (
                  <li key={p} className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-vae-turquoise flex-shrink-0"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2"/></svg>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center gap-3">
                <Link to={`/products/${cat.key}`} className="btn-primary btn-compact whitespace-nowrap">Ansehen</Link>
                <CtaLink
                  ctaId="products.contact_email"
                  ctx={{ product: cat.title, fromPage: 'products-grid' }}
                  variant="secondary"
                  className="btn-compact whitespace-nowrap"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsCardsGrid
