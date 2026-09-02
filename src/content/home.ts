export const heroTitle = ['Ihre Infrastruktur. Ihre Daten.', 'Ihre KI.'] as const

export const heroEyebrow = 'Digitale Souveränität für den Mittelstand' as const

export const heroTypewriterTexts = [
  'Ihre Software auf Ihren Servern',
  'Kontrolle statt Abo-Spirale',
  'KI, die im Haus bleibt',
  'Unabhängig von US-Clouds',
  'Sicher und DSGVO-konform',
] as const

export const heroDescription =
  'Preiserhöhungen, gestrichene Funktionen, gesperrte Zugänge: Wer auf fremde Cloud-Anbieter baut, trägt deren Risiko mit. Wir bauen Ihnen eine eigene digitale Umgebung – Daten, Systeme und KI auf Servern, die Sie kontrollieren. Planbar in den Kosten, von uns betreut.'

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

export const homeOutcomesHeading = 'Resultate aus Pilotprojekten'

export interface LinkText {
  before: string
  after: string
}

export const homeOutcomesDescription: LinkText = {
  before: 'Vier Orientierungswerte aus unseren bisherigen Pilotprojekten – Details und Kontext in den ',
  after: ' Referenzen.',
}

export const outcomeMetrics = [
  {
    value: '68 %',
    label: 'Zeiteinsparung bei Dokumenten-Workflows – gemessen in einem Pilotprojekt',
  },
  {
    value: '4 Wochen',
    label: 'Typische Dauer bis zur produktiven Übergabe des Infrastruktur-Setups',
  },
  {
    value: '€2.400',
    label: 'Eingesparte SaaS-Abos pro Monat – Beispielrechnung aus einem Pilotprojekt',
  },
  {
    value: '9,6 / 10',
    label: 'Team-Zufriedenheit nach Onboarding – interne Erhebung bei Pilotkunden',
  },
] as const

export const finalCtaHome = {
  eyebrow: 'Nächster Schritt',
  title: 'Bereit für Ihre eigene Infrastruktur?',
  description:
    'Der erste Schritt ist ein kostenloses Beratungsgespräch. Wir analysieren Ihre Situation und zeigen, wie Self-Hosted-First und KI Ihr Business effizienter machen.',
  primary: {
    label: 'Kostenlose Beratung buchen (45 Min)',
    ctaId: 'contact.schedule_call',
  },
  note: 'Binnen 48h Termin verfügbar. Keine Verpflichtung, kein Sales-Pitch. Viele Digitalisierungs- und KI-Vorhaben können grundsätzlich förderfähig sein – wir prüfen im Erstgespräch, ob Ihr Projekt zu aktuellen KfW- oder Landesprogrammen passt.',
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
    description: 'Daten und Systeme liegen bei Drittanbietern – Entscheidungen treffen andere.',
    bullets: ['Features verschwinden ohne Vorwarnung', 'API-Änderungen zwingen zu Refactoring'],
  },
  {
    title: 'DSGVO-Risiko trägt Ihr Unternehmen',
    description: 'Datenflüsse liegen außerhalb Ihrer Kontrolle – das rechtliche Risiko bleibt bei Ihnen.',
    bullets: ['Das rechtliche Risiko liegt bei Ihnen', 'Nicht beim SaaS-Anbieter'],
  },
  {
    title: 'Keine echte Anpassbarkeit',
    description: 'SaaS-Lösungen bieten nur vorgefertigte Features – echte Erweiterungen sind unmöglich.',
    bullets: ['Spezielle Workflows nicht umsetzbar', 'Individuelle Integrationen? Nur mit teurem Enterprise-Plan'],
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
    description: 'Einmalige Setup-Investition, danach planbare Kosten durch eigenes Hosting.',
    bullets: ['Keine Vendor-Preisspirale', 'Keine SaaS-Überraschungen'],
  },
  {
    title: 'DSGVO-konform durch kontrolliertes Hosting',
    description: 'Server in Deutschland. Volle Datenhoheit.',
    bullets: ['Keine US-Cloud-Transfers bei Systemen und KI', 'Rechtssicherheit ohne Kompromisse'],
  },
  {
    title: 'Erweiterbar durch self-hosted AI',
    description: 'Eigene KI-Modelle statt proprietärer APIs. Fundament für KI-Optimierung.',
    bullets: [
      'Llama, Mistral, oder andere Open-Source-Modelle integrierbar',
      'Mit Startinvestition meiste aus KI rausholen – ohne API-Kosten',
    ],
  },
] as const

// ── SOUVERÄNITÄTS-TREPPE ────────────────────────────────────────────────────
// Drei Stufen der digitalen Unabhängigkeit. Ruhig, beratend, kein Alarmismus.

export interface SovereigntyStep {
  step: string
  label: string
  title: string
  description: string
  highlight?: boolean
}

export const sovereigntyContent = {
  eyebrow: 'Digitale Souveränität',
  heading: 'Nextcloud ist ein guter Anfang. Wir bauen die ganze Treppe.',
  intro:
    'Europa diskutiert über digitale Unabhängigkeit – und meist fällt dabei der Name Nextcloud. Zu Recht. Aber Dateien sind nur die erste Stufe. Wir begleiten Unternehmen Schritt für Schritt zu einer digitalen Umgebung, die ihnen wirklich gehört.',
  ctaLabel: 'Welche Stufe passt zu Ihnen?',
  ctaNote: 'Kostenloses Erstgespräch – wir ordnen Ihre Situation gemeinsam ein.',
} as const

export const sovereigntySteps: SovereigntyStep[] = [
  {
    step: '01',
    label: 'Status quo',
    title: 'Verstreute Abo-Tools',
    description:
      'Office, CRM und Cloud-Speicher laufen bei verschiedenen Anbietern. Bequem im Alltag – aber Preise, Funktionen und Datenstandorte bestimmen andere.',
  },
  {
    step: '02',
    label: 'Datenhoheit',
    title: 'Kontrollierte Datenablage',
    description:
      'Dateien, Kalender und Zusammenarbeit ziehen auf eigene Server – zum Beispiel mit Nextcloud. Ihre Daten bleiben im Haus, die Grundlage ist gelegt.',
  },
  {
    step: '03',
    label: 'Volle Souveränität',
    title: 'Eigene Systeme & KI',
    description:
      'CRM, Automationen und KI laufen auf Ihrer Infrastruktur – als ein zusammenhängendes System, betreut von einem Ansprechpartner. Das ist unser Zielbild.',
    highlight: true,
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
      'Sie wollen Klarheit, bevor Sie Systeme umbauen? Wir analysieren Ihre Situation, bewerten Kosten und Nutzen von SaaS, Hybrid und Self-Hosted und entwickeln einen umsetzbaren Fahrplan – inklusive KI-Potenzialen.',
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
      'Auf Basis der vorhergehenden Strategie-Phase bauen wir Ihre eigene Infrastruktur produktionsbereit in 3–6 Wochen auf – mit offenen Standards, dokumentiert, inklusive Migration relevanter Daten und Training für Ihr Team.',
    inclusions: [
      'Kompletter Server-Aufbau (Container, Netzwerk, Security-Basics)',
      'Tool-Installation & Konfiguration der Kernsysteme',
      'Daten-Migration aus bestehenden Systemen (falls relevant)',
      'Team-Training & Dokumentation',
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
    description:
      'Wir sorgen dafür, dass Ihre Infrastruktur läuft – während Ihr Team sich auf Produkt und Kund:innen konzentriert. Auf Wunsch übernehmen wir auch den kompletten Betrieb Ihrer Website: Hosting, Wartung, Sicherheit und Performance in einer Hand.',
    inclusions: [
      'Basis-Monitoring & Security-Patches',
      'Regelmäßige System-Reviews',
      'Backup & Disaster Recovery',
      'Betreutes Hosting für Websites & Anwendungen',
      'Optional: monatlich kündbar',
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
      'Julian Goertz (Vorstand) und Jakob Dünnebeil (Mitglied) übernehmen die gesamte Planung der digitalen Infrastruktur — mit Fokus auf Self-Hosting, Open Source als Werkzeug und Skalierbarkeit.',
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
