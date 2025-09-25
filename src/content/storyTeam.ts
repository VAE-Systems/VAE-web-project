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
    'Europäische Datenhoheit & offene Systeme sind für uns kein Marketing, sondern Design-Kriterium.',
  ],
  microFacts: [
    { label: 'Gründung', value: '2025' },
    { label: 'Herkunft', value: 'Heidelberg' },
    { label: 'Lock‑In Haltung', value: '0%' },
    { label: 'LLM Praxis', value: 'seit 2022' },
  ],
}

export const founders: FounderBio[] = [
  {
    key: 'julian',
    name: 'Julian Darius Goertz Dini',
    role: 'CEO & Gründer',
    highlight: 'Strukturiert komplexe Vorhaben & baut belastbare Organisationslogik auf',
    points: [
      'Geprägt von skulpturaler Langfrist-Perspektive (Enkel des Bildhauers Jürgen Goertz)',
      'Vorstand Aktiv Kollektiv Heidelberg – Aufbau effizienter Arbeits- & Informationsstrukturen',
      'Treibende Kraft für dokumentierte Übergabefähigkeit & klare Betriebsmodelle',
    ],
    icon: 'engineering',
  },
  {
    key: 'jakob',
    name: 'Jakob Dünnebeil',
    role: 'CTO & Gründer',
    highlight: 'Architektur & Systemsauberkeit – seit früher Jugend tief in Code & Infrastruktur',
    points: [
      'Frühe eigene Software- & Hosting-Projekte (Langjährige Praxis statt kurzfristiger Trend)',
      'Modularisierung & Adapter-Layer für wartbare Erweiterbarkeit',
      'Self-Hosting, Observability & Testbarkeit als Default',
    ],
    icon: 'terminal',
  },
  {
    key: 'ninaad',
    name: 'Ninaad Anirrudah Deswandikar',
    role: 'CPO & Gründer',
    highlight: 'Verbindet technische Möglichkeiten mit nutzerzentrierter Produktführung',
    points: [
      'Aufgewachsen im Umfeld globaler Tech-Einflüsse (Vater 19 Jahre bei Microsoft)',
      'Übersetzt komplexe Architekturentscheidungen in klare Produktinkremente',
      'Brücke zwischen Nutzer-Feedback, Priorisierung & Engineering',
    ],
    icon: 'lightbulb',
  },
]
