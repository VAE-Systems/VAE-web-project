import React from 'react'
import { Link } from 'react-router-dom'

const cardBase = 'p-6 rounded-2xl bg-white/5 border border-white/10'

const PackagesCta: React.FC = () => (
  <div className="mb-10 grid gap-8 md:grid-cols-2">
    <div className={cardBase}>
      <h4 className="mb-3 text-sm font-semibold text-white">Packages</h4>
      <p className="text-sm text-text-secondary">
        Konfigurierte Bündel für typische Einsatzszenarien – modular kombinierbar.
      </p>
    </div>
    <div className={`${cardBase} flex flex-col justify-between`}>
      <div>
        <h4 className="mb-3 text-sm font-semibold text-white">Interesse geweckt?</h4>
        <p className="mb-4 text-sm text-text-secondary">
          Vereinbare eine Demo oder ein unverbindliches Beratungsgespräch.
        </p>
      </div>
      <div className="flex gap-3">
        <Link to="/contact" className="btn-primary btn-compact whitespace-nowrap">
          Demo anfragen
        </Link>
        <Link to="/products/vae-core" className="btn-secondary btn-compact whitespace-nowrap">
          VAE CORE ansehen
        </Link>
      </div>
    </div>
  </div>
)

export default PackagesCta
