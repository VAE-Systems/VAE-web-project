export interface ProductCategory {
  key: string
  title: string
  badge?: string
  tagline: string
  description: string
  points: string[]
  cta: string
  accent?: 'core' | 'built'
  icon?: string // Material Symbols icon name
}

export const productCategories: ProductCategory[] = [
  {
    key: 'solutions',
    title: 'Komplettlösungen',
    badge: 'Neu',
    tagline: 'End‑to‑End wie für uns selbst',
    description: 'Von Architektur & Implementierung bis sauberer Übergabe in Ihren Betrieb – dokumentiert & vendor‑lock‑in frei.',
    points: [
      'Architektur & Implementierung',
      'Dokumentation & Übergabe',
      'Vendor-lock-in frei'
    ],
  cta: 'Details ansehen',
  icon: 'deployed_code'
  },
  {
    key: 'tools',
    title: 'Applikationen & Lizenzen',
    tagline: 'Sofort einsetzbar',
  description: 'Fokussierte Applikationen & Module – klarer Nutzen, schlanke Schnittstellen, transparente Lizenzmodelle.',
    points: [
      'Lizenzierbar & wartbar',
      'Klarer Nutzen (Plug‑in)',
      'Optionaler Support'
    ],
  cta: 'Applikationen entdecken',
  icon: 'widgets'
  },
  {
    key: 'core',
    title: 'VAE CORE',
    badge: 'Platform',
    tagline: 'Semantische Betriebsplattform',
  description: 'Plattform-Fundament: Embeddings, Vektorsuche, Workflows, Zugriffskontrolle & Observability für souveräne KI‑Arbeitsräume.',
    points: [
      'On-Prem & Sovereign Cloud',
      'Plug-in Architektur',
      'Observability integriert'
    ],
    cta: 'Mehr über CORE',
  accent: 'core',
  icon: 'hub'
  },
  {
    key: 'built',
    title: 'Built with VAE CORE',
    tagline: 'Ökosystem & Showcases',
  description: 'Showcases & Partnerlösungen auf Basis von VAE CORE – reale Nutzung & Erweiterbarkeit nachvollziehbar.',
    points: [
      'Verifizierte Integrationen',
      'Best Practices',
      'Skalierte Deployments'
    ],
    cta: 'Showcases ansehen',
  accent: 'built',
  icon: 'layers'
  }
]
