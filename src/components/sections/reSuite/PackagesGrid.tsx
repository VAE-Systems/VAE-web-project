import React from 'react'
import { Link } from 'react-router-dom'
import { rePackages } from '../../../content/reSuite'

/**
 * PackagesGrid lists predefined package bundles of Re: Suite.
 * Displays modules included and their benefit with optional actions.
 */
const PackagesGrid: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
      <h4 className="text-sm font-semibold text-white mb-4">Packages</h4>

      <div className="space-y-6">
        {rePackages.map(pkg => (
          <article key={pkg.name} className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0 flex flex-col">
            <h5 className="text-white font-medium mb-2">{pkg.name}</h5>

            <ul className="space-y-1 text-xs text-text-secondary mb-3">
              {pkg.contains.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-vae-turquoise flex-shrink-0"
                  >
                    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm text-text-secondary mb-4">{pkg.benefit}</p>

            <div className="mt-auto flex gap-3">
              <Link to="/contact" className="btn-primary">
                Demo anfragen
              </Link>
              <Link to="/products/solutions" className="btn-secondary">
                Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default PackagesGrid

