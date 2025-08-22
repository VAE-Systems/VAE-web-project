import React from 'react'
import { Link } from 'react-router-dom'

const cardBase = 'p-6 rounded-2xl bg-white/5 border border-white/10'

const PackagesCta: React.FC = () => (
  <div className="grid md:grid-cols-2 gap-8 mb-10">
    <div className={cardBase}>
      <h4 className="text-sm font-semibold text-white mb-3">Packages</h4>
      <p className="text-sm text-text-secondary">
        Konfigurierte Bündel für typische Einsatzszenarien – modular kombinierbar.
      </p>
    </div>
    <div className={`${cardBase} flex flex-col justify-between`}>
      <div>
        <h4 className="text-sm font-semibold text-white mb-3">Interesse geweckt?</h4>
        <p className="text-sm text-text-secondary mb-4">
          Vereinbare eine Demo oder ein unverbindliches Beratungsgespräch.
        </p>
      </div>
      <div className="flex gap-3">
        <Link to="/contact" className="btn-primary">
          Demo anfragen
        </Link>
        <Link to="/products/vae-core" className="btn-secondary">
          VAE CORE ansehen
        </Link>
      </div>
    </div>
  </div>
)

export default PackagesCta

