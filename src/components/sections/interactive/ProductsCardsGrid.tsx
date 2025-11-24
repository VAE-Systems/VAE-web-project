import React from 'react'
import { Link } from 'react-router-dom'
import CtaLink from '@/components/ui/CtaLink'
import { productCategories } from '@/components/navigation/productCategories'
import Icon from '@/components/ui/Icon'

const ProductsCardsGrid: React.FC = () => {
  const visibleKeys = ['infrastruktur', 'automation', 'packages'] // Reihenfolge wie gewünscht
  const items = productCategories.filter(p => visibleKeys.includes(p.key))

  return (
    <div className="mt-8 sm:mt-10">
      <div className="container-vae">
        <header className="mb-6 sm:mb-8" data-animate>
          <h3 className="text-base font-semibold text-text-light dark:text-white sm:text-lg">Produkte & Plattform</h3>
          <p className="text-base text-text-secondary md:text-sm">
            Schnell einsatzfähige Applikationen, Lizenzmodelle und das VAE CORE als Betriebsplattform.
          </p>
        </header>

        <div className="grid items-stretch gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3" data-animate>
          {items.map(cat => (
            <article
              key={cat.key}
              id={cat.key}
              className="border-border-primary bg-bg-primary/5 group relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 backdrop-blur-md transition-all duration-300 hover:border-vae-turquoise/40 hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.12),0_10px_40px_-10px_rgba(var(--vae-turquoise-rgb),0.28)] dark:border-white/10 dark:bg-white/5 sm:p-6"
            >
              <div className="relative z-10 mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-vae-turquoise/10 text-2xl text-vae-turquoise">
                    <Icon name={cat.icon || 'layers'} className="text-vae-turquoise" size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-text-light dark:text-white">{cat.title}</h4>
                    <p className="mt-1 text-sm uppercase tracking-wide text-vae-turquoise/70 md:text-xs">
                      {cat.tagline}
                    </p>
                  </div>
                </div>

                {cat.badge && (
                  <span className="rounded-md bg-vae-turquoise/10 px-2 py-1 text-[10px] font-medium tracking-wide text-vae-turquoise">
                    {cat.badge}
                  </span>
                )}
              </div>

              <p className="mb-4 text-base text-text-secondary md:text-sm">{cat.description}</p>

              <ul className="mb-4 space-y-2 text-sm text-text-secondary md:text-[13px]">
                {cat.points.slice(0, 3).map(p => (
                  <li key={p} className="flex items-center gap-2">
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

              <div className="mt-auto flex items-center gap-3">
                <Link to={`/solutions#${cat.key}`} className="btn-primary btn-compact whitespace-nowrap">
                  Ansehen
                </Link>
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
