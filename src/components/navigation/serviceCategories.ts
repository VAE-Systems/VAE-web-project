export interface ServiceCategory {
  key: string
  title: string
  tagline: string
  description: string
  points: string[]
  badge?: string
  cta: string
}

export const serviceCategories: ServiceCategory[] = [
  {
    key: 'consulting',
    title: 'Strategische Beratung',
    tagline: 'Roadmaps & Governance',
    description:
      'Wir analysieren Prozesse, definieren Zielbilder und entwickeln klare Roadmaps für Self-Hosted-Infrastruktur und AI-Automatisierung.',
    points: [
      'Business- & IT-Assessment',
      'Kosten- & Effizienzanalysen',
      'Compliance & AI-Governance',
      'Umsetzungs-Roadmaps',
    ],
    cta: 'Services ansehen',
  },
  {
    key: 'infrastructure',
    title: 'Self-Hosted Infrastruktur',
    tagline: 'Nextcloud & Odoo',
    description:
      'Planung, Implementierung und Betrieb kompletter Self-Hosted-Stacks für Kollaboration, CRM und Geschäftsprozesse.',
    points: ['Nextcloud Kollaboration', 'Odoo ERP/CRM', 'Security & Backups', 'DSGVO-konforme Hosting-Modelle'],
    cta: 'Infrastruktur planen',
  },
  {
    key: 'automation',
    title: 'AI Workflow Automation',
    tagline: 'Intelligente Prozesse',
    description:
      'Wir automatisieren Dokumenten- und Serviceprozesse mit AI, integrieren bestehende Tools und schaffen messbare KPIs.',
    points: ['Dokumentenautomatisierung', 'Kundenservice-Workflows', 'Analytics & Reporting', 'Tool-Integrationen'],
    cta: 'Automationspotenzial prüfen',
  },
  {
    key: 'coordination',
    title: 'Projektkoordination',
    tagline: 'Entwicklernetzwerk',
    description:
      'Koordination erfahrener Entwickler:innen, Qualitätssicherung und transparente Projektsteuerung mit klarer Verantwortung.',
    points: [
      'Projektmanagement & PMO',
      'Entwicklernetzwerk Zugriff',
      'Code Reviews & QA',
      'Transparente Kostenstruktur',
    ],
    cta: 'Projekt besprechen',
  },
]
