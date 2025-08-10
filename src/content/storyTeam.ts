// Compact Story & Team content model
export interface FounderBio {
  key: string
  name: string
  role: string
  highlight: string
  points: string[]
  icon?: string
  link?: string
}

export const storyIntro = {
  headline: 'Wer wir sind & warum es uns gibt',
  lead: 'Gegründet 2025 in Heidelberg – aus tiefer Praxis mit KI-Systemen seit 2022. Unser Antrieb: Substanz statt Hype und echte technische Souveränität für Unternehmen in Deutschland & Europa.',
  body: [
    'Wir kommen aus Mathematik, Informatik, Volkswirtschaft & Produktdesign – verbunden durch frühe, intensive Arbeit mit LLMs, Self‑Hosting und Automatisierungs-Stacks.',
    'Unsere Haltung: Architektur, Dokumentation & Ownership sind der Unterschied zwischen flüchtigem Experiment und tragfähiger Wertschöpfungsschicht.',
    'Europäische Datenhoheit & offene Systeme sind für uns kein Marketing, sondern Design-Kriterium.'
  ],
  microFacts: [
    { label: 'Gründung', value: '2025' },
    { label: 'Herkunft', value: 'Heidelberg' },
    { label: 'Lock‑In Haltung', value: '0%' },
    { label: 'LLM Praxis', value: 'seit 2022' }
  ]
}

export const founders: FounderBio[] = [
  {
    key: 'julian',
    name: 'Julian Darius Goertz-Dini',
    role: 'CEO & Gründer',
    highlight: 'Struktur & Umsetzung komplexer Vorhaben, Community & Verantwortungsaufbau',
    points: [
      'Enkel des Bildhauers Jürgen Görtz – geprägt von großer Form & langlebigen Projekten',
      'Vorstand Aktiv Kollektiv Heidelberg – Organisations- & Enablement-Fokus',
      'Priorisiert klare Übergabefähigkeit & dokumentierte Betriebsmodelle'
    ],
    icon: 'engineering'
  },
  {
    key: 'jakob',
    name: 'Jakob Dünnebeil',
    role: 'CTO & Gründer',
    highlight: 'Frühe Programmier- & Hosting-Erfahrung, Open Source & Systemarchitektur',
    points: [
      'Seit Kindheit Software & Infrastrukturprojekte',
      'Fokus: Modularisierung, Adapter-Layer, Testbarkeit',
      'Self-Hosting & Observability Praxis'
    ],
    icon: 'terminal'
  },
  {
    key: 'ninaad',
    name: 'Ninaad Anirrudah Deswandikar',
    role: 'CPO & Gründer',
    highlight: 'Produktstrategie, UX & nutzerzentrierte KI-Integrationen',
    points: [
      'Aufgewachsen im Umfeld globaler Tech-Einflüsse (Vater 19 Jahre bei Google)',
      'Übersetzt technische Möglichkeiten in nutzbare Produktinkremente',
      'Schnittstelle: Nutzer-Feedback ↔ Architekturentscheidungen'
    ],
    icon: 'lightbulb'
  }
]
