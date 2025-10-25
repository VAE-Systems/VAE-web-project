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
    key: 'infrastruktur',
    title: 'Open Source Infrastruktur Pakete',
    badge: 'Kostenersparnis',
    tagline: 'Nextcloud, Odoo & Business-Tools',
    description:
      'Standardisierte Infrastruktur-Bundles für Kollaboration, CRM und Dateiverwaltung – inkl. Hosting, Security & Wartung.',
    points: ['Nextcloud & Odoo Bundles', 'Managed Hosting & Backups', 'SLA & Support-Optionen'],
    cta: 'Pakete vergleichen',
    icon: 'cloud',
  },
  {
    key: 'automation',
    title: 'AI Automations-Bausteine',
    badge: 'Produktivität',
    tagline: 'Workflows, Bots & Analytics',
    description:
      'Wiederverwendbare Automationsmodule für Dokumente, Kundenservice und Reporting – integriert in bestehende Systeme.',
    points: ['Dokumenten-Pipelines', 'Service-Bots & Routing', 'Analytics & KPI Dashboards'],
    cta: 'Automationsmodule entdecken',
    icon: 'smart_toy',
  },
  {
    key: 'packages',
    title: 'Business Packages',
    tagline: 'Planbare Einführung',
    description: 'Kombinierte Beratungs- und Umsetzungspakete mit klaren Deliverables, Zeitplänen und Budgetrahmen.',
    points: ['Startpaket Mittelstand', 'Scale-up Infrastruktur', 'Compliance & Governance Paket'],
    cta: 'Pakete ansehen',
    icon: 'inventory_2',
  },
  {
    key: 'cases',
    title: 'Case Studies & Referenzen',
    tagline: 'Ergebnisse aus Projekten',
    description: 'Reale Kundenprojekte mit messbaren Ergebnissen, Lessons Learned und Skalierungspfaden.',
    points: ['Kostensenkung vs. SaaS', 'AI-Automation Impact', 'Projektaufbau & Teamstruktur'],
    cta: 'Case Studies lesen',
    icon: 'insights',
  },
]
