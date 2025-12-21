export const heroTitle = ['Ihre Infrastruktur. Ihre Daten.', 'Ihre KI.'] as const

export const heroEyebrow = 'Structure is strategy' as const

export const heroTypewriterTexts = [
  '100% Open Source',
  'Keine Vendor-Lock-ins',
  'DSGVO ohne Kompromisse',
  'Self-Hosted in 4 Wochen',
  'Private AI auf eigener Hardware',
] as const

export const heroDescription =
  'Self-Hosted Infrastruktur – mit voller Datenkontrolle, ohne Vendor-Lock-in. Wir bauen und betreuen moderne Open-Source-Systeme für dein Unternehmen.'

export interface HeroBenefit {
  title: string
  description: string
  icon: string
}

export const heroBenefits: HeroBenefit[] = [
  {
    title: 'Komplett-Setup',
    description: 'Nextcloud, CRM, Automationen – produktionsbereit in 3–6 Wochen.',
    icon: 'settings_suggest',
  },
  {
    title: 'KI-Optimierung',
    description: 'Workflows werden intelligenter, schneller, effizienter – kontinuierlich.',
    icon: 'bolt',
  },
  {
    title: 'Langzeit-Partnerschaft',
    description: 'Updates, Security, neue Features – wir bleiben an Ihrer Seite.',
    icon: 'support_agent',
  },
]

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
  eyebrow: 'Nächster Schritt',
  title: 'Bereit für Ihre eigene Infrastruktur?',
  description:
    'Der erste Schritt ist ein kostenloses Beratungsgespräch. Wir analysieren Ihre Situation und zeigen, wie Open Source und KI Ihr Business effizienter machen.',
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
    description: 'Wir verstehen Ihre Situation, analysieren Systeme und entwickeln drei realistische Optionen.',
  },
  {
    number: '02',
    title: 'Setup & Migration',
    duration: '3–5 Wochen',
    description: 'Wir bauen Ihre Infrastruktur auf, migrieren Daten und schulen Ihr Team.',
  },
  {
    number: '03',
    title: 'Betreuung & Optimierung',
    duration: 'laufend',
    description: 'Optional betreuen wir Ihre Systeme langfristig und optimieren kontinuierlich.',
  },
] as const

export interface OpenSourcePoint {
  title: string
  description: string
  bullets?: string[]
}

export interface OpenSourcePointWithBullets {
  title: string
  description: string
  bullets?: string[]
}

export const openSourcePainPoints: OpenSourcePointWithBullets[] = [
  {
    title: 'Steigende Kosten bei Wachstum',
    description: 'Mehr Nutzer = höhere Rechnung. Jeden Monat.',
    bullets: ['API-Calls skalieren linear mit Kosten', 'Preiserhöhung? Sie zahlen oder kündigen'],
  },
  {
    title: 'Keine Kontrolle über Ihre Daten',
    description: 'Ihre Infrastruktur bei US-Anbietern. Sie reagieren nur.',
    bullets: ['Features verschwinden ohne Vorwarnung', 'API-Änderungen zwingen zu Refactoring'],
  },
  {
    title: 'DSGVO-Risiko trägt Ihr Unternehmen',
    description: 'US-Anbieter geben Daten weiter (Cloud Act).',
    bullets: ['Das rechtliche Risiko liegt bei Ihnen', 'Nicht beim SaaS-Anbieter'],
  },
] as const

export const openSourceAdvantages: OpenSourcePointWithBullets[] = [
  {
    title: 'Einheitliche Plattform – AI-ready konzipiert',
    description:
      'Alle Systeme integriert und einheitlich dokumentiert. Mit der richtigen Anfangsinvestition senken Sie Folgekosten für KI-Optimierung – und bleiben langfristig wettbewerbsfähig.',
    bullets: [
      'CRM, Dokumentenverwaltung, KI-Workflows aus einer Hand',
      'Einheitliches System reduziert Folgekosten für KI-Optimierung dramatisch',
    ],
  },
  {
    title: 'Planbare Kosten statt monatlicher Abos',
    description: 'Einmalige Setup-Investition, danach planbare Betriebskosten.',
    bullets: ['Keine Vendor-Preisspirale', 'Keine SaaS-Überraschungen'],
  },
  {
    title: 'DSGVO-konform by Design',
    description: 'Server in Deutschland. Volle Datenhoheit.',
    bullets: ['Keine US-Cloud-Transfers bei Systemen und KI', 'Rechtssicherheit ohne Kompromisse'],
  },
  {
    title: 'Erweiterbar durch selfhosted AI',
    description: 'Eigene KI-Modelle statt proprietärer APIs. Fundament für KI-Optimierung.',
    bullets: [
      'Llama, Mistral, oder andere Open-Source-Modelle integrierbar',
      'Mit Startinvestition meiste aus KI rausholen – ohne API-Kosten',
    ],
  },
] as const

export interface ServiceOverviewCard {
  id: string
  icon: string
  title: string
  subtitle?: string
  badge: string
  secondaryBadge?: string
  description: string
  inclusions: string[]
  audience: string[]
  cta: { label: string; href: string }
}

export const servicesOverviewCards: ServiceOverviewCard[] = [
  {
    id: 'beratung',
    icon: 'compass_calibration',
    title: 'Strategieberatung',
    subtitle: 'Analyse & Fahrplan',
    badge: 'ANALYSE',
    description:
      'Sie wollen Klarheit, bevor Sie Systeme umbauen? Wir analysieren Ihre Situation, bewerten Kosten und Nutzen von SaaS vs. Open Source und entwickeln einen umsetzbaren Fahrplan – inklusive KI-Potenzialen.',
    inclusions: [
      'Kostenlose Erstberatung (45 Min)',
      'System-Analyse & Kosten-Nutzen-Rechnung',
      '3 realistische Migrations-Optionen (inkl. „Status quo beibehalten")',
      'Schriftlicher Fahrplan mit konkreten nächsten Schritten',
    ],
    audience: [
      'Schnellem Wachstum ohne IT-Strategie',
      'Geplanter Digital-Transformation',
      'Evaluierung von Automatisierung',
    ],
    cta: { label: 'Mehr erfahren', href: '/services/beratung' },
  },
  {
    id: 'setup',
    icon: 'storage',
    title: 'Infrastruktur Design/Setup',
    subtitle: 'Umsetzung in 3–6 Wochen',
    badge: '3–6 WOCHEN',
    description:
      'Auf Basis der vorhergehenden Strategie-Phase bauen wir Ihre Open-Source-Infrastruktur produktionsbereit in 3–6 Wochen auf – inklusive Migration relevanter Daten und Training für Ihr Team.',
    inclusions: [
      'Kompletter Server-Aufbau (Container, Netzwerk, Security-Basics)',
      'Tool-Installation & Konfiguration der Kernsysteme',
      'Daten-Migration aus bestehenden Systemen (falls relevant)',
      'Team-Training & Dokumentation für Admins und Key-User',
    ],
    audience: [
      'Neuaufbau des Datenfundaments',
      'Restrukturierung bestehender Infrastruktur',
      'Ablösung von SaaS-Tools',
    ],
    cta: { label: 'Setup Details', href: '/services/setup' },
  },
  {
    id: 'betreuung',
    icon: 'support_agent',
    title: 'Langfristige Betreuung',
    subtitle: 'Betrieb & Optimierung',
    badge: 'KONTINUIERLICH',
    secondaryBadge: 'Monatlich kündbar',
    description:
      'Wir sorgen dafür, dass Ihre Infrastruktur läuft – während Ihr Team sich auf Produkt und Kund:innen konzentriert.',
    inclusions: [
      'Basis-Monitoring & Security-Patches',
      'Regelmäßige System-Reviews',
      'Backup & Disaster Recovery',
      'Monatlich kündbar inkl. 2h Handover-Call',
    ],
    audience: [
      'Teams ohne dedizierte IT-Abteilung',
      'Auslagerung der Infrastruktur-Verwaltung',
      'Fokus auf Wachstum statt Betrieb',
    ],
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
    id: 'lukas-sosnowski',
    client: 'Lukas Sosnowski Consulting',
    title: 'CRM-Migration & KI-Strategie',
    description:
      'Von Google Sheets zu Twenty CRM – inklusive strategischer Beratung für Finance Automation und AI Controlling.',
    highlights: [
      'Daten-Konsolidierung im CRM',
      'KI-Readiness für Finance-Automation',
      'VAE als technischer Ansprechpartner',
    ],
    status: 'Live',
    badge: 'Live seit 2025',
  },
  {
    id: 'aktiv-kollektiv',
    client: 'Aktiv Kollektiv e.V.',
    title: 'Infrastruktur-Planung & technische Unterstützung',
    description:
      'Julian Goertz (Vorstand) und Jakob Dünnebeil (Mitglied) übernehmen die gesamte Planung der digitalen Infrastruktur — mit Fokus auf Open Source, Self-Hosting und Skalierbarkeit.',
    highlights: [
      'Erste Systeme bereits live — Note-Sharing, Kollaboration, Wissensmanagement',
      'Infrastruktur-Roadmap für Mitglieder-Accounts und zentrale Datenverwaltung',
      'Blueprint für gemeinnützige Initiativen',
    ],
    status: 'Live',
    badge: 'Live seit 2025',
    logo: '/Kollektiv-Logo.svg',
    role: 'Julian Goertz ist Vorstand bei Aktiv Kollektiv e.V.',
    invertOnDark: true,
  },
  {
    id: 'qr-mail',
    client: 'Art Affair GmbH & Co. KG',
    title: 'Pilot-Projekt: QR-Code-Automation für art KARLSRUHE',
    description:
      'Automatisierte Lead-Erfassung per QR-Code für den Stand auf der art KARLSRUHE. Galerie für moderne Kunst aus Regensburg (Neue-Waag-Gasse 2) – Lösung mit ActivePieces und Custom-Automationen, nahtlos in die bestehende Infrastruktur integriert.',
    highlights: [
      'ActivePieces + Custom-Code-Automationen',
      'Integration in bestehende Infrastruktur',
      'Galerie-Setup in Regensburg (Neue-Waag-Gasse 2)',
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
