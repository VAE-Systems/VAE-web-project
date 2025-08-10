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


export const tagline = 'Substanz statt KI‑Hype: belastbare, dokumentierte KI‑ & Automations‑Architektur ohne Lock‑In.'

export const outcomes: Outcome[] = [
  {
    key: 'early-utility',
    headline: 'Schnell zum ersten echten Nutzen',
    body: 'Meilenstein-basiert mit klaren Akzeptanzkriterien: frühe interne Nutzung statt monatelanger Stealth-Entwicklung.',
    evidence: ['Sprints', 'Akzeptanzkriterien', 'Produktionsnah'],
    icon: 'rocket_launch'
  },
  {
    key: 'foundation',
    headline: 'Ein Fundament, das mitwächst',
    body: 'Systeme mit Fokus auf zukünftige Ausbaubarkeit: modular, dokumentiert und so gebaut, dass neue Technologien andocken – langfristige Startinvestition statt Wegwerf-Projekt.',
    evidence: ['Modular', 'Dokumentiert', 'Erweiterbar'],
    icon: 'architecture'
  },
  {
    key: 'sovereignty',
    headline: 'Kein versteckter Lock‑In',
    body: 'Wir setzen auf Qualität & interne Dokumentation – Architektur & Runbooks sind so gestaltet, dass Systeme unabhängig von uns bestehen und wachsen können.',
    evidence: ['Runbooks', 'Open Patterns', 'Ownership'],
    icon: 'lock_open'
  },
  {
    key: 'modular-curated',
    headline: 'Architekturen, die Optionen offen halten',
    body: 'Gezielte Komponenten statt unübersichtlicher Tool-Ketten: Baukasten-Logik nutzt Ökosystem-Vorteile – ohne künstliche Einschränkungen.',
    evidence: ['Kuratierter Stack', 'Adapter-Layer', 'Vendor-frei'],
    icon: 'hub'
  }
]

export const principles: Principle[] = [
  { key: 'open-docs', title: 'Offen & dokumentiert', caption: 'Transparenz & Ownership', icon: 'description' },
  { key: 'iterative', title: 'Iterativ & messbar', caption: 'Frühe Wirkung statt Blindflug', icon: 'timeline' },
  { key: 'arch-first', title: 'Architektur first', caption: 'Erweiterbarkeit ohne Rewrite', icon: 'category' },
  { key: 'sparring', title: 'Sparring & Priorisierung', caption: 'Wirtschaftlicher Fokus', icon: 'support_agent' },
  { key: 'curated', title: 'Kuratierter Stack', caption: 'Stabilität statt Hype', icon: 'lightbulb' }
]

export const badges = [
  { key: 'made-de', label: 'Made in Germany', icon: 'flag' },
  { key: 'eu-data', label: 'EU-Datenhoheit', icon: 'public' },
  { key: 'vendor-free', label: 'Vendor-Unabhängigkeit', icon: 'shield' },
  { key: 'open-source', label: 'Open Source Haltung', icon: 'code' }
]

export const testimonial: TestimonialSnippet = {
  quote: 'Struktur & technische Tiefe statt Buzzword-Demo – genau das macht den Unterschied.',
  author: 'Platzhalter',
  role: 'CTO / Beispiel',
  company: '—'
}


