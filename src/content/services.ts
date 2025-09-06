import { PERCENTAGES, TIME_ESTIMATES } from '../config'

// Services Content - Zentralisiert lange Texte aus ServicesPage.tsx
export const servicesHero = {
  title: "Services",
  subtitle: "Schulungen & Workshops, strategische Beratung & individuelle KI-/Automationslösungen.",
  description: "Von Analyse bis Umsetzung – souverän & nachvollziehbar."
}

export const servicesLifecycle = {
  title: "Lifecycle statt Einzelleistung.",
  description1: "Wir entwickeln nicht nur Software – wir begleiten den gesamten Lebenszyklus: Analyse, Architektur, Implementierung, Enablement, Betrieb & Übergabe. So entstehen keine 'Abwurfprojekte', sondern betreibbare Lösungen.",
  description2: "Schulungen & Workshops bauen interne Kompetenz auf, Beratung schafft Klarheit & Richtung, Custom Solutions liefern präzise Bausteine oder vollständige Automationspfade – kombinierbar nach Reifegrad.",
  platformLink: "Plattform‑ & Lizenzangebote unter /products. Services adressieren Ihren spezifischen Kontext."
}

export const lifecycleBenefits = [
  {
    title: "Enablement",
    benefits: ["Team handlungsfähig", "Reduktion externer Abhängigkeit", "Dokumentierte Artefakte"]
  },
  {
    title: "Governance & Compliance",
    benefits: ["Frühe AI Act Orientierung", "Sicherheitsmodell klar", "Transparente Audits"]
  },
  {
    title: "Umsetzung",
    benefits: ["Fokus reale Engpässe", "Messbare Qualitätskriterien", "Souveräner Betrieb"]
  }
]

export const servicesCategories = [
  {
    key: 'trainings',
    title: 'Schulungen & Workshops',
    icon: 'school',
    focus: 'Enablement & Wissenstransfer – Teams schneller produktiv.',
    examples: ['VAE CORE Admin', 'Prompt Patterns Lab', 'Architektur Grundlagen'],
    to: '/services/trainings'
  },
  {
    key: 'consulting',
    title: 'Beratung',
    icon: 'handshake',
    focus: 'Strategische Architektur-, Prozess- & Compliance-Begleitung.',
    examples: ['KI-Integrations-Roadmap', 'Security & Governance Audit', 'Regulatorische Analyse'],
    to: '/services/consulting'
  },
  {
    key: 'custom',
    title: 'Custom Solutions',
    icon: 'extension',
    focus: 'Individuelle Software & Integrationen – gezielte Umsetzung statt Produktkatalog.',
    examples: ['API-Connector', 'Workflow Automatisierung', 'Retrieval Layer'],
    to: '/services/custom-solutions'
  }
]

export const comparisonMatrix = {
  title: "Wann welches Format?",
  subtitle: "Schnell erkennbare Zuordnung: Wissen aufbauen, Richtung festlegen oder spezifisch umsetzen. Überlappungen bewusst minimal.",
  criteria: [
    { key: 'ziel', label: 'Primäres Ziel', trainings: 'Kompetenz & Routinen', consulting: 'Richtung & Governance', custom: 'Produktiver Baustein' },
    { key: 'output', label: 'Output', trainings: 'Unterlagen, Übungen, Cheatsheets', consulting: 'Roadmap, Architektur, KPI/Risiko', custom: 'Software, Runbooks, Dashboards' },
    { key: 'tiefe', label: 'Technische Tiefe', trainings: 'Fundament & Patterns', consulting: 'Architektur & Optionen', custom: 'Implementierung & Integrationen' },
    { key: 'dauer', label: 'Typische Dauer', trainings: '1 Tag / Modul', consulting: 'Tage – wenige Wochen', custom: 'Wochen – Inkremente' },
    { key: 'team', label: 'Interne Beteiligung', trainings: 'Aktives Lernen', consulting: 'Workshops & Entscheidungen', custom: 'Review + Co-Development' },
    { key: 'metriken', label: 'Messpunkte', trainings: 'Lernziele / Erfolg', consulting: 'Reifegrad, Risiko, TCO', custom: 'Qualität, Latenz, Kosten' },
    { key: 'lockin', label: 'Lock‑in Risiko', trainings: 'Keins', consulting: 'Sehr gering', custom: 'Niedrig (Open-first)' }
  ],
  footnote: "Bereiche können separat gebucht oder in direktem Kontakt sinnvoll kombiniert werden – abhängig von Reifegrad & Zielbild.",
  sequenceNote: "Typische Sequenz: Klarheit (Beratung) → Enablement (Schulungen & Workshops) → Umsetzung spezifischer Bausteine (Custom Solutions)."
}

export const finalCta = {
  title: "Nächster Schritt?",
  subtitle: "Senden Sie uns Kernziel, Zeithorizont & vorhandene Systeme – wir melden uns innerhalb von 24h mit einem Vorschlag für das Erstgespräch.",
  buttons: [
    { to: "/contact", text: "Kontakt aufnehmen", primary: true },
    { href: "/service-katalog.pdf", text: "Service-Katalog (PDF, 1.2 MB)", secondary: true }
  ],
  disclaimer: "PDF ist Vorab-Version – Inhalte können sich ändern."
}

export const servicesData = [
  {
    key: 'trainings',
    badge: 'Core Säule',
    title: 'Schulungen & Workshops – Enablement & Rollenkompetenz',
    description: 'Hands-on Formate für Dev, Ops & Knowledge Steward. Schnelle interne Souveränität statt dauerhafte externe Abhängigkeit.',
    stats: [
      { value: '2–4', desc: 'Wochen initiales Setup', note: '3' },
      { value: '100%', desc: 'Enablement Fokus' }
    ],
    features: ['Workshops & Labs', 'Artefakte / Playbooks', 'Mentoring & Shadowing'],
    cta: 'Schulungen ansehen',
    iconName: 'school'
  },
  {
    key: 'consulting',
    badge: 'Core Säule',
    title: 'Beratung – Architektur & Governance',
    description: 'Architektur, Governance, Compliance & Roadmaps für souveräne KI- & Automationslandschaften. Fokus: Transparenz, Austauschbarkeit, Betrieb statt POC-Silos.',
    stats: [
      { value: PERCENTAGES.COST_REDUCTION_LICENSE, desc: 'ø Lizenz-/Vendor Kosten Reduktion', note: '1' },
      { value: TIME_ESTIMATES.DECISION_CYCLE_IMPROVEMENT, desc: 'Schnellere Entscheidungszyklen', note: '2' }
    ],
    features: ['Architektur-Assessment', 'Roadmap & Reifegradmodell', 'Governance / AI Act Vororientierung'],
    cta: 'Beratung ansehen',
    iconName: 'handshake'
  },
  {
    key: 'solutions',
    badge: 'Core Säule',
    title: 'Custom Solutions – Integration & Automation',
    description: 'Gezielte Automations- & Retrieval-Bausteine. Von Connectoren über Evaluierung bis Observability – modular kombinierbar.',
    stats: [
      { value: TIME_ESTIMATES.MVP_IMPLEMENTATION, desc: 'Wochen MVP Umsetzung', note: '4' },
      { value: PERCENTAGES.EFFICIENCY_GAIN_AVERAGE, desc: 'Avg. Effizienzgewinn', note: '5' }
    ],
    features: ['Workflow Orchestrierung', 'Retrieval / Index Layer', 'Evaluierung & Monitoring'],
    cta: 'Use Cases',
    iconName: 'extension'
  }
]

export const lifecycleBlocks = [
  {
    title: 'Lifecycle Ansatz',
    description: 'Analyse → Architektur → Umsetzung → Enablement → Betrieb. Keine „Throwaway" POCs – inkrementell produktionsfähig.'
  },
  {
    title: 'Messbarkeit',
    description: 'Evaluationssets, Quality Gates & Betriebsmesswerte eingebaut statt nachgelagert. Entscheidungen werden datenbasiert.'
  },
  {
    title: 'Souveränität',
    description: 'Open Source & lokale Ausführbarkeit verhindern unerwünschten Lock‑in. Austauschbare Index & Modell Layer.'
  }
]
