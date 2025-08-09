export interface ProductCategory {
  key: string
  title: string
  badge?: string
  tagline: string
  description: string
  points: string[]
  cta: string
  accent?: 'core' | 'built'
}

export const productCategories: ProductCategory[] = [
  {
    key: 'solutions',
    title: 'Komplettlösungen',
    badge: 'Neu',
    tagline: 'End-to-End umgesetzt',
    description: 'Schlüsselfertige KI & Automations-Pakete – von Architektur bis Deployment, inkl. Monitoring & Handover.',
    points: [
      'Architektur & Implementierung',
      'Dokumentation & Übergabe',
      'Vendor-lock-in frei'
    ],
    cta: 'Details ansehen'
  },
  {
    key: 'tools',
    title: 'Werkzeuge & Module',
    tagline: 'Bausteine für Teams',
    description: 'Wiederverwendbare Open-Source-nahe Komponenten für Datenpipelines, Inferenz, Orchestrierung und Observability.',
    points: [
      'Schneller integrierbar',
      'Modular & erweiterbar',
      'Optimiert für Edge & Cloud'
    ],
    cta: 'Module entdecken'
  },
  {
    key: 'core',
    title: 'VAE CORE',
    badge: 'Platform',
    tagline: 'Semantische Betriebsplattform',
    description: 'Zentrale Plattform für datensouveräne KI-Arbeitsräume: Embeddings, Vektorsuche, Workflows, Zugriffskontrolle.',
    points: [
      'On-Prem & Sovereign Cloud',
      'Plug-in Architektur',
      'Observability integriert'
    ],
    cta: 'Mehr über CORE',
    accent: 'core'
  },
  {
    key: 'built',
    title: 'Built with VAE CORE',
    tagline: 'Ökosystem & Showcases',
    description: 'Referenz-Anwendungen und Partnerlösungen, die auf VAE CORE aufsetzen – Qualität & Erweiterbarkeit sichtbar gemacht.',
    points: [
      'Verifizierte Integrationen',
      'Best Practices',
      'Skalierte Deployments'
    ],
    cta: 'Showcases ansehen',
    accent: 'built'
  }
]
