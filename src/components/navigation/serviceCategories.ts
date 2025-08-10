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
    key: 'trainings',
    title: 'Trainings',
    tagline: 'Enablement',
    description: 'Gezielte Schulungen & Workshops für schnellere interne Umsetzungskompetenz ohne dauerhafte externe Abhängigkeit.',
    points: [
      'VAE CORE Administration',
      'Prompt- & Retrieval-Strategien',
      'Architektur / Datenmodell Basics',
      'Hands-on Deployment Sessions'
    ],
    cta: 'Workshop ansehen'
  },
  {
    key: 'consulting',
    title: 'Consulting',
    tagline: 'Strategie & Governance',
    description: 'Architektur, Roadmaps, Compliance & Security – faktenbasiert statt Hype. Entscheidungsgrundlagen klar dokumentiert.',
    points: [
      'Architektur & Roadmap',
      'EU AI Act Orientierung',
      'Security & Operations',
      'Kosten / TCO Bewertung'
    ],
    cta: 'Beratung entdecken'
  },
  {
    key: 'custom',
  title: 'Custom Solutions',
    tagline: 'Individuelle Umsetzung',
    description: 'Spezifische Integrationen, Automationspfade & Retrieval-Layer – modulare Bausteine statt generischer SaaS-Katalog.',
    points: [
      'API / System-Integrationen',
      'Workflow Automatisierung',
      'Retrieval & Index Layer',
      'Observability / Betrieb'
    ],
    cta: 'Solution Details'
  }
]
