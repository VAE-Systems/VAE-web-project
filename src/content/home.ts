export const heroTitle = ['Business Efficiency', 'durch Open Source und AI'] as const

export const heroTypewriterTexts = [
  'Open-Source-Infrastruktur statt Vendor-Lock-in',
  'KI-optimierte Workflows statt manueller Overhead',
  'Langfristige Partnerschaft statt einmaliger Installation',
] as const

export const heroDescription =
  'Wir ersetzen teure SaaS-Tools durch Open-Source-Alternativen, optimieren eure Workflows mit KI und betreuen euch langfristig. Für mittelständische Teams, die Effizienz steigern und Kosten senken wollen — ohne Abhängigkeit von Microsoft, Google oder Salesforce.'

export interface HeroBenefit {
  title: string
  description: string
  icon: string
}

export const heroBenefits: HeroBenefit[] = [
  {
    title: 'Komplett-Setup',
    description: 'Nextcloud, CRM, Automationen – produktionsbereit in 3–6 Wochen.',
    icon: 'dns',
  },
  {
    title: 'KI-Optimierung',
    description: 'Workflows werden intelligenter, schneller, effizienter – kontinuierlich.',
    icon: 'bolt',
  },
  {
    title: 'Langzeit-Partnerschaft',
    description: 'Updates, Security, neue Features – wir bleiben an eurer Seite.',
    icon: 'support_agent',
  },
]

export const testphaseBanner = {
  headline: '3 Monate testen – volle Infrastruktur, planbare Kosten',
  description:
    'Wir liefern eine komplette Arbeitsumgebung, begleiten Ihr Team durch die Pilotphase und geben klare Entscheidungsgrundlagen für den anschließenden Rollout.',
  inclusions: [
    'Nextcloud Business Setup (Dateien, Kommunikation, Freigaben)',
    'CRM-Konfiguration (Odoo oder alternative Open-Source-Stacks)',
    'AI-Workflows für Dokumente, Prozesse & Automationen',
    'Backup-, Security- & Monitoring-Framework',
    'Trainings & Onboarding für alle Rollen',
    'Begleitender Support und KPI-Reviews',
  ],
  pricingHeadline: 'Transparente Testphase',
  pricingDetails:
    '3 Monate: €189/Monat (Server & Betrieb) · Danach: €489/Monat Vollservice oder €149/Monat Infrastruktur only',
  primaryCta: 'Testphase jetzt starten',
  secondaryCta: 'Mehr Details anzeigen',
} as const

export const whyVaeHighlights = [
  {
    title: 'Doppelte Expertise',
    description:
      'Arbeitssysteme (Nextcloud, CRM, Automationen) UND KI-Implementationen – mit Kompetenz in Open-Source-KI-Modellen sowie großen Anbietern (OpenAI, Anthropic).',
    proof: 'Systeme + KI aus einer Hand',
    icon: 'task_alt',
  },
  {
    title: 'AI-Workflows mit Wirkung',
    description:
      'Konkrete Automationen, KPI-Dashboards und Auswertungen aus echten Pilotprojekten, nicht nur Labs oder Demos.',
    proof: 'Messbare Inkremente alle 3–6 Wochen',
    icon: 'insights',
  },
  {
    title: 'Enterprise Support',
    description:
      'Monitoring, Security-Checks und Feature-Releases sind Teil der Betreuung – ohne Vendor-Lock-in, aber mit klaren SLAs.',
    proof: 'Monatliche Reviews & Roadmap-Fortschritt',
    icon: 'security',
  },
] as const

export const homeOutcomesHeading = 'Resultate & Referenzen'

export interface LinkText {
  before: string
  after: string
}

export const homeOutcomesDescription: LinkText = {
  before: 'Vier Kennzahlen, an denen wir uns messen – ausführlich erläutert in den ',
  after: ' Referenzen.',
}

export const outcomeMetrics = [
  {
    value: '68 %',
    label: 'Durchschnittliche Zeiteinsparung bei Dokumenten-Workflows',
  },
  {
    value: '4 Wochen',
    label: 'Bis zur produktiven Übergabe des Infrastruktur-Setups',
  },
  {
    value: '€2.400',
    label: 'Monatliche SaaS-Ersparnis bei typischer Pilotgröße',
  },
  {
    value: '9,6 / 10',
    label: 'Zufriedenheit der Teams nach Onboarding-Sessions',
  },
] as const

export const finalCtaHome = {
  eyebrow: 'Finaler Schritt',
  title: 'Bereit für Business Efficiency?',
  description:
    'Der erste Schritt ist ein kostenloses Beratungsgespräch. Wir analysieren eure Situation und zeigen, wie Open Source und KI euer Business effizienter machen.',
  primary: {
    label: 'Kostenlose Beratung buchen (45 Min)',
    ctaId: 'contact.schedule_call',
  },
  note: 'Binnen 48h Termin verfügbar. Keine Verpflichtung, kein Sales-Pitch.',
} as const

export const homeProcessHeading = 'Wie wir arbeiten'

export const homeProcessDescription =
  'Klare Schritte, transparente Ergebnisse. Wir liefern Analyse, Setup und Betreuung ohne Überraschungen.'

export const homeProcessNote = 'Kompletten Prozess ansehen →'

export interface HomeProcessTeaserStep {
  number: string
  title: string
  duration: string
  description: string
}

export const homeProcessTeaserSteps: HomeProcessTeaserStep[] = [
  {
    number: '01',
    title: 'Analyse & Strategie',
    duration: '1–2 Wochen',
    description: 'Wir verstehen eure Situation, analysieren Systeme und entwickeln 3 realistische Optionen.',
  },
  {
    number: '02',
    title: 'Setup & Migration',
    duration: '3–5 Wochen',
    description: 'Wir bauen eure Infrastruktur auf, migrieren Daten und schulen euer Team.',
  },
  {
    number: '03',
    title: 'Betreuung & Optimierung',
    duration: 'laufend',
    description: 'Optional betreuen wir eure Systeme langfristig und optimieren kontinuierlich.',
  },
] as const

export interface OpenSourcePoint {
  title: string
  description: string
}

export const openSourcePainPoints: OpenSourcePoint[] = [
  {
    title: 'Kosten wachsen unkontrolliert',
    description:
      'Microsoft 365, Salesforce, OpenAI API, Anthropic — monatliche Gebühren pro Mitarbeiter:in oder API-Call. Je größer euer Team und je mehr KI-Einsatz, desto teurer wird es. Keine Kontrolle über Preissteigerungen.',
  },
  {
    title: 'Vendor-Lock-in',
    description:
      'Eure Daten und KI-Workflows liegen bei US-Konzernen. Features verschwinden? Akzeptieren. API-Preise steigen? Zahlen. Modelle wechseln? Neuintegration. Kein Mitspracherecht.',
  },
  {
    title: 'DSGVO-Risiken',
    description:
      'Cloud Act, Datentransfers in die USA bei Arbeitssystemen UND KI-APIs, unklare Compliance. Rechtsunsicherheit für europäische Unternehmen.',
  },
] as const

export const openSourceAdvantages: OpenSourcePoint[] = [
  {
    title: 'Signifikante Kosteneinsparungen',
    description:
      'Nextcloud statt Microsoft 365. Odoo statt Salesforce. Llama/Mistral statt OpenAI API. Self-hosted, keine monatlichen Lizenzgebühren. Investition in Setup, dann planbare Betriebskosten.',
  },
  {
    title: 'Volle Kontrolle',
    description:
      'Eure Daten, eure KI-Modelle, euer Server, eure Regeln. Keine versteckten Preiserhöhungen, keine Feature-Entfernungen. Digitale Souveränität bei Systemen UND KI.',
  },
  {
    title: 'DSGVO-konform by Design',
    description:
      'Server in Deutschland, volle Datenhoheit bei Arbeitssystemen und KI-Inferenz, keine US-Cloud-Transfers. Rechtssicherheit ohne Kompromisse.',
  },
] as const

export interface ServiceOverviewCard {
  id: string
  icon: string
  title: string
  badge: string
  description: string
  inclusions: string[]
  audience: string[]
  cta: { label: string; href: string }
}

export const servicesOverviewCards: ServiceOverviewCard[] = [
  {
    id: 'beratung',
    icon: 'explore',
    title: 'Strategische Beratung',
    badge: 'Startpunkt',
    description:
      'Ihr wisst noch nicht genau, was ihr braucht? Wir analysieren eure Situation, zeigen Optionen und entwickeln einen realistischen Fahrplan.',
    inclusions: [
      'Kostenlose Erstberatung (45 Min)',
      'System-Analyse & Kosten-Nutzen-Rechnung',
      '3 realistische Migrations-Optionen',
      'Schriftliches Angebot',
    ],
    audience: ['Teams am Anfang ihrer Open-Source-Reise', 'Unsichere über beste Strategie'],
    cta: { label: 'Mehr erfahren', href: '/services/beratung' },
  },
  {
    id: 'setup',
    icon: 'dns',
    title: 'Infrastructure-Setup',
    badge: '3–6 Wochen',
    description:
      'Von SaaS zu Open Source in 3–6 Wochen. Wir bauen eure komplette Infrastruktur auf — produktionsbereit, migriert, geschult.',
    inclusions: [
      'Kompletter Server-Aufbau',
      'Tool-Installation & Konfiguration',
      'Daten-Migration',
      'Team-Training & Dokumentation',
    ],
    audience: ['Teams bereit für den Wechsel', 'Wollen professionelles Setup'],
    cta: { label: 'Setup Details', href: '/services/setup' },
  },
  {
    id: 'betreuung',
    icon: 'support_agent',
    title: 'Langfristige Betreuung',
    badge: 'Kontinuierlich',
    description:
      'Eure Infrastruktur läuft. Wir sorgen dafür, dass sie es bleibt. Updates, Security, KI-Optimierung — wir sind euer IT-Rückgrat.',
    inclusions: [
      'Monatliche Updates & Security-Patches',
      '24/7-Monitoring & Backups',
      'KI-Workflow-Optimierung',
      'Prioritäts-Support (< 6h)',
    ],
    audience: ['Teams ohne IT-Abteilung', 'Fokus auf Kernbusiness, nicht IT'],
    cta: { label: 'Betreuung Details', href: '/services/betreuung' },
  },
] as const

export interface TechShowcaseTool {
  id: string
  name: string
  tagline: string
  description: string
  accent: string
  logo?: string
  href?: string
}

export const techShowcaseTools: TechShowcaseTool[] = [
  {
    id: 'nextcloud',
    name: 'Nextcloud',
    tagline: 'Files, Calendar, Contacts, Talk',
    description: 'Die Microsoft-365-Alternative für Teams, komplett self-hosted.',
    accent: 'from-sky-500/20 to-sky-500/5 text-sky-200',
  },
  {
    id: 'odoo',
    name: 'Odoo',
    tagline: 'CRM, ERP, Sales, Invoicing',
    description: 'Salesforce-Alternative mit vollständigem Prozess-Scope.',
    accent: 'from-purple-500/20 to-purple-500/5 text-purple-200',
  },
  {
    id: 'n8n',
    name: 'n8n',
    tagline: 'Workflow Automation',
    description: 'Low-Code-Automation – die Zapier-Alternative ohne Lock-in.',
    accent: 'from-orange-500/20 to-orange-500/5 text-orange-200',
  },
  {
    id: 'onlyoffice',
    name: 'OnlyOffice',
    tagline: 'Docs, Sheets, Slides',
    description: 'Office-kompatible Dokumente direkt im Browser.',
    accent: 'from-rose-500/20 to-rose-500/5 text-rose-200',
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    tagline: 'ACID database',
    description: 'Robuste Datenplattform für strukturierte Informationen.',
    accent: 'from-blue-500/20 to-blue-500/5 text-blue-200',
  },
  {
    id: 'docker',
    name: 'Docker',
    tagline: 'Container Platform',
    description: 'Portables Deployment & saubere DevOps-Handovers.',
    accent: 'from-cyan-500/20 to-cyan-500/5 text-cyan-200',
  },
  {
    id: 'traefik',
    name: 'Traefik',
    tagline: 'Reverse Proxy',
    description: 'Traffic-Steuerung, SSL-Management & Routing.',
    accent: 'from-amber-500/20 to-amber-500/5 text-amber-200',
  },
  {
    id: 'qdrant',
    name: 'Qdrant',
    tagline: 'Vector Database',
    description: 'Vector-Suche für KI-Embeddings & RAG-Workflows.',
    accent: 'from-pink-500/20 to-pink-500/5 text-pink-200',
  },
] as const

export interface ReferenceProject {
  id: string
  client: string
  title: string
  description: string
  highlights: string[]
  status: string
  badge: string
  logo?: string
  role?: string
  invertOnDark?: boolean
  invertOnLight?: boolean
}

export const referenceProjects: ReferenceProject[] = [
  {
    id: 'aktiv-kollektiv',
    client: 'Aktiv Kollektiv e.V.',
    title: 'Leitung der Open-Source-Infrastruktur',
    description:
      'Nextcloud für Zusammenarbeit, Twenty CRM für Mitgliederverwaltung, n8n für Prozess-Automatisierung. Komplettes Setup inkl. Migration und laufende Infrastruktur-Leitung.',
    highlights: ['Self-hosted auf deutschem Server', 'DSGVO-konform', 'Keine monatlichen SaaS-Gebühren mehr'],
    status: 'Live',
    badge: 'Live seit 2025',
    logo: '/Kollektiv-Logo.svg',
    role: 'Julian Goertz ist Vorstand bei Aktiv Kollektiv e.V.',
    invertOnDark: true,
  },
  {
    id: 'qr-mail',
    client: 'Art Affair',
    title: 'Pilot-Projekt: QR-Code-Automation für art KARLSRUHE',
    description:
      'Automatisierte Lead-Erfassung per QR-Code für den Stand auf der art KARLSRUHE. Entwickelt mit ActivePieces und eigenen Automationen, nahtlos in die bestehende Infrastruktur integriert.',
    highlights: [
      'ActivePieces + Custom-Code-Automationen',
      'Integration in bestehende Infrastruktur',
      'Pilot-Projekt für Event-Automation',
    ],
    status: 'Produktiv im Einsatz',
    badge: 'Pilot 2025',
    logo: '/art-affair-logo.svg',
    invertOnLight: true,
  },
] as const

export interface ReferenceInsight {
  id: string
  title: string
  description: string
  icon: string
}

export const referenceInsights: ReferenceInsight[] = [
  {
    id: 'effizienz',
    title: 'Effizienzsteigerung',
    description: 'Workflows werden durch KI-Optimierung messbar effizienter.',
    icon: 'trending_up',
  },
  {
    id: 'setup',
    title: 'Setup-Dauer',
    description: '3–6 Wochen bis produktive Übergabe.',
    icon: 'schedule',
  },
  {
    id: 'compliance',
    title: 'DSGVO-Compliance',
    description: '100% rechtssichere Daten-Speicherung in Deutschland.',
    icon: 'shield',
  },
  {
    id: 'zufriedenheit',
    title: 'Zufriedenheit',
    description: 'Kunden schätzen die Transparenz & langfristige Perspektive.',
    icon: 'grade',
  },
] as const
