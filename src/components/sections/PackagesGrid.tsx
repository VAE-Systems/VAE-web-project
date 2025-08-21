import React from 'react'
import { RePackage } from '@/content/reSuite'

interface PackagesGridProps {
  packages: RePackage[]
}

const PackagesGrid: React.FC<PackagesGridProps> = ({ packages }) => {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
      <h4 className="text-sm font-semibold text-white mb-3">Packages</h4>
      <div className="space-y-4">
        {packages.map((pkg) => (
          <div key={pkg.name}>
            <h5 className="text-sm font-medium text-white mb-1">{pkg.name}</h5>
            <ul className="text-xs text-text-secondary mb-1 list-disc list-inside">
              {pkg.contains.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-xs text-text-secondary">{pkg.benefit}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PackagesGrid

