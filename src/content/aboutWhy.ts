// Structured content for the revamped "Warum VAE" (Outcomes & Principles)
// This allows reuse + easier future A/B testing.

export interface Outcome {
  key: string
  headline: string
  body: string
  evidence?: string[]
  icon?: string
}

export interface Principle {
  key: string
  title: string
  caption: string
  icon?: string
}

export interface TestimonialSnippet {
  quote: string
  author?: string
  role?: string
  company?: string
}

export const tagline =
  'Arbeitsinfrastruktur, KI-Optimierung und Betreuung aus einer Hand – dokumentiert, messbar und ohne Vendor-Lock-in.'

export const outcomes: Outcome[] = [
  {
    key: 'experience',
    headline: 'Erprobte Self-Hosting-Erfahrung',
    body: 'Unsere eigene Infrastruktur läuft seit über zwei Jahren vollständig auf Nextcloud, Odoo & Co. – wir wissen aus erster Hand, was im Alltag funktioniert.',
    evidence: ['Eigenbetrieb seit 2023', 'Dokumentierte Playbooks', 'Produktiver Einsatz'],
    icon: 'verified',
  },
  {
    key: 'partnership',
    headline: 'Komplettbetreuung statt Einmalprojekt',
    body: 'Wir planen, setzen um und betreuen dauerhaft – inklusive Feature-Releases, Security-Checks und Support. Ihre Systeme wachsen mit Ihren Anforderungen.',
    evidence: ['Monatliche Roadmaps', 'SLA & Support', 'Langfristige Sparrings'],
    icon: 'handshake',
  },
  {
    key: 'costs',
    headline: 'Messbare Kosteneinsparung',
    body: 'Statt mehrere SaaS-Abos zu bezahlen, hosten Sie Ihre Infrastruktur selbst: €89/Monat in der Testphase, €289/Monat im Vollbetrieb.',
    evidence: ['SaaS vs. Self-Host Vergleich', 'Transparente Kalkulation', 'Keine versteckten Gebühren'],
    icon: 'savings',
  },
  {
    key: 'ai-first',
    headline: 'AI-Ready von Anfang an',
    body: 'Ihre Infrastruktur wird so aufgesetzt, dass AI-Workflows sofort andocken: Dokumentenverarbeitung, Automationen und Reporting sind vorbereitet.',
    evidence: ['Workflows & Automation', 'KPI-Dashboards', 'Iterative Optimierung'],
    icon: 'auto_awesome',
  },
]

export const principles: Principle[] = [
  { key: 'open-docs', title: 'Offen & dokumentiert', caption: 'Transparenz & Ownership', icon: 'description' },
  { key: 'iterative', title: 'Iterativ & messbar', caption: 'Frühe Wirkung statt Blindflug', icon: 'timeline' },
  { key: 'arch-first', title: 'Architektur first', caption: 'Erweiterbarkeit ohne Rewrite', icon: 'category' },
  { key: 'sparring', title: 'Sparring & Priorisierung', caption: 'Wirtschaftlicher Fokus', icon: 'support_agent' },
  { key: 'curated', title: 'Kuratierter Stack', caption: 'Stabilität statt Hype', icon: 'lightbulb' },
]

export const badges = [
  { key: 'made-de', label: 'Made in Germany', icon: 'flag' },
  { key: 'eu-data', label: 'EU-Datenhoheit', icon: 'public' },
  { key: 'vendor-free', label: 'Vendor-Unabhängigkeit', icon: 'shield' },
  { key: 'open-source', label: 'Self-Hosted-First', icon: 'code' },
]

export const testimonial: TestimonialSnippet = {
  quote: 'Struktur & technische Tiefe statt Buzzword-Demo – genau das macht den Unterschied.',
  author: 'Platzhalter',
  role: 'CTO / Jakob Dünnebeil',
  company: '—',
}
