export const heroTitle = ['Self-Hosted Infrastruktur,', 'die Ihnen wirklich gehört'] as const

export const heroEyebrow = 'Open Source, Self-Hosted, pragmatisch umgesetzt' as const

export const heroDescription =
  'Wir planen, bauen und betreuen digitale Arbeitsinfrastruktur ohne Vendor-Lock-in: Dateien, CRM, Automationen und KI auf einer Architektur, die zu Ihrem Team passt und in drei bis sechs Wochen produktiv werden kann.'

export interface HeroBenefit {
  title: string
  description: string
  icon: string
}

export const heroBenefits: HeroBenefit[] = [
  {
    title: 'Produktiv statt Pilot',
    description: 'Setup, Migration und Übergabe in 3 bis 6 Wochen statt endloser Tool-Evaluation.',
    icon: 'rocket_launch',
  },
  {
    title: 'Volle Datenhoheit',
    description: 'Hosting in Deutschland, klare Datenflüsse und keine Preismacht eines SaaS-Anbieters.',
    icon: 'verified_user',
  },
  {
    title: 'Ein Partner statt Tool-Zoo',
    description: 'Strategie, Infrastruktur und laufende Betreuung aus einer Hand.',
    icon: 'handshake',
  },
]

export const whyVaeHighlights = [
  {
    title: 'Systeme und KI aus einer Hand',
    description:
      'Wir bauen nicht nur Infrastruktur – wir integrieren KI dort, wo sie echten Hebel hat. Nextcloud, CRM, Automationen und selbstgehostete KI-Modelle aus einem Guss.',
    proof: 'Kein Tool-Zoo. Eine Architektur.',
    icon: 'task_alt',
  },
  {
    title: 'Ergebnisse, keine Demos',
    description:
      'Keine Proof-of-Concepts die in der Schublade landen. Wir liefern produktive Systeme – in 3 bis 6 Wochen, messbar, übergeben.',
    proof: 'Deliverable alle 3–6 Wochen',
    icon: 'insights',
  },
  {
    title: 'Wir bleiben dabei',
    description:
      'Nach dem Setup verschwindet niemand. Monitoring, Security, Optimierung – wir betreuen was wir bauen. Monatlich kündbar, keine Abhängigkeit.',
    proof: 'Monatliche Reviews, klare SLAs',
    icon: 'security',
  },
] as const

export const homeOutcomesHeading = 'Was wirklich zählt'

export interface LinkText {
  before: string
  after: string
}

export const homeOutcomesDescription: LinkText = {
  before: 'Zahlen aus echten Projekten – kein Marketing, keine Hochrechnungen. Details in den ',
  after: ' Referenzen.',
}

export const outcomeMetrics = [
  {
    value: '68 %',
    label: 'Weniger Zeit für Dokumenten-Workflows nach Automatisierung',
  },
  {
    value: '4 Wochen',
    label: 'Bis zur produktiven Übergabe — nicht Monaten',
  },
  {
    value: '€2.400',
    label: 'Monatliche SaaS-Kosten die wegfallen — bei typischer Pilotgröße',
  },
  {
    value: '9,6 / 10',
    label: 'Zufriedenheit nach Onboarding — Teams arbeiten lieber damit',
  },
] as const

export const finalCtaHome = {
  eyebrow: 'Nächster Schritt',
  title: 'In 45 Minuten sehen Sie, ob Self-Hosted für Sie Sinn ergibt.',
  description:
    'Wir schauen auf Ihre Tools, Kosten, Datenlage und Zielbild. Danach wissen Sie, ob Migration, Hybrid-Modell oder bewusstes Nichtstun die beste Entscheidung ist.',
  primary: {
    label: 'Jetzt Erstgespräch buchen',
    ctaId: 'contact.schedule_call',
  },
  note: 'Binnen 48h Termin. Kein Pitch. Keine Verpflichtung.',
} as const

export const homeProcessHeading = 'Kein Blackbox-Projekt'

export const homeProcessDescription =
  'Sie wissen immer, wo wir stehen und was als nächstes kommt. Drei Phasen, klare Deliverables, keine Überraschungen.'

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
    title: 'Verstehen, bevor wir bauen',
    duration: '1–2 Wochen',
    description:
      'Wir analysieren Ihre aktuelle Situation – Tools, Kosten, Datenlage. Dann bekommen Sie drei realistische Optionen: inklusive "Status quo beibehalten".',
  },
  {
    number: '02',
    title: 'Aufbauen, nicht versprechen',
    duration: '3–5 Wochen',
    description:
      'Server, Systeme, Migration, Team-Training. Am Ende übergeben wir produktiv – nicht irgendwann, sondern in einem vereinbarten Zeitfenster.',
  },
  {
    number: '03',
    title: 'Dabei bleiben, solange es passt',
    duration: 'Optional, monatlich kündbar',
    description:
      'Monitoring, Security, Weiterentwicklung. Wir betreuen was wir gebaut haben – und sind weg, wenn Sie uns nicht mehr brauchen.',
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
    title: 'Mehr Leute = höhere Rechnung',
    description:
      'Ihr Team wächst. Ihre SaaS-Rechnung auch. Nicht weil die Software besser wurde — sondern weil der Anbieter es so will.',
    bullets: ['Per-User-Pricing skaliert gegen Sie', 'Preiserhöhung: zahlen oder alles verlieren'],
  },
  {
    title: 'Ihre Daten. Fremde Server.',
    description:
      'Sie wissen nicht, wer Ihre Kundendaten sieht. Features verschwinden. APIs ändern sich. Sie haben keine Wahl.',
    bullets: ['Vendor-Entscheidungen zwingen Sie zur Anpassung', 'Lock-in wird sichtbar, wenn es zu spät ist'],
  },
  {
    title: 'DSGVO-Risiko bleibt bei Ihnen',
    description:
      'Der SaaS-Anbieter haftet nicht für Ihre Kundendaten. Das tun Sie — egal wo die Daten physisch liegen.',
    bullets: ['Datenflüsse außerhalb Ihrer Kontrolle', 'Bußgeld-Risiko liegt bei Ihnen, nicht beim Anbieter'],
  },
  {
    title: 'Konfektionsware statt Maßanzug',
    description:
      'Sie zahlen für 80 Features. Sie nutzen 12. Der Rest ist Ballast — und bleibt trotzdem auf der Rechnung.',
    bullets: ['Spezial-Workflows nicht abbildbar', 'Individuelle Anpassung: nur im teuren Enterprise-Plan'],
  },
] as const

export const openSourceAdvantages: OpenSourcePointWithBullets[] = [
  {
    title: 'Eine Plattform, keine Tool-Hölle',
    description:
      'CRM, Dokumentenverwaltung, Kommunikation, KI — alles integriert, alles dokumentiert. Nicht zehn verschiedene Logins, sondern ein System das funktioniert.',
    bullets: [
      'Weniger Reibung zwischen Tools = weniger Fehler',
      'KI-Integration kostet Bruchteile, wenn alles verbunden ist',
    ],
  },
  {
    title: 'Sie wissen, was Sie nächsten Monat zahlen',
    description:
      'Setup-Investition einmalig. Hosting-Kosten planbar. Keine Preiserhöhungen, kein Vendor-Druck, kein Erwachen am Monatsende.',
    bullets: ['Fixe Kosten statt wachsender Abos', 'Kein Lock-in, kein Abhängigkeitsproblem'],
  },
  {
    title: 'Ihre Daten bleiben in Deutschland',
    description:
      'Server bei Hetzner in Deutschland. Keine US-Cloud-Transfers. Kein Datenfluss den Sie nicht kennen. DSGVO-Risiko fällt weg.',
    bullets: ['Volle Datenhoheit — keine Interpretationsspielräume', 'Rechtssicher ohne Kompromisse'],
  },
  {
    title: 'KI ohne monatliche API-Rechnung',
    description:
      'Selbstgehostete Modelle laufen auf Ihrer Infrastruktur. Keine OpenAI-Rechnung die mit jedem Prompt wächst.',
    bullets: [
      'Llama, Mistral und andere Modelle integrierbar',
      'Einmalige Setup-Investition statt laufende API-Kosten',
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
    subtitle: 'Klarheit, bevor Sie bauen',
    badge: 'ANALYSE',
    description:
      'Bevor wir eine Zeile Code schreiben: wir verstehen Ihre Situation. Tools, Kosten, Datenflüsse, Wachstum. Sie bekommen drei realistische Optionen — eine davon ist immer: alles so lassen wie es ist.',
    inclusions: [
      'Kostenlose Erstberatung (45 Min) ohne Agenda',
      'Analyse Ihrer aktuellen Tools & echten Kosten',
      '3 Optionen: Migration, Hybrid, Status quo',
      'Schriftlicher Fahrplan — kein Präsentation-PDF, sondern etwas Umsetzbares',
    ],
    audience: [
      'Sie wachsen schnell und die IT hält nicht mit',
      'Sie planen eine Digital-Transformation und wollen keine Fehlentscheidung',
      'Sie wollen wissen, was Automatisierung für Sie konkret bedeutet',
    ],
    cta: { label: 'Beratung ansehen', href: '/services/beratung' },
  },
  {
    id: 'setup',
    icon: 'storage',
    title: 'Infrastruktur aufbauen',
    subtitle: 'Produktiv in 3–6 Wochen',
    badge: '3–6 WOCHEN',
    description:
      'Wir bauen Ihre Infrastruktur — Server, Systeme, Migration, Team-Training. Am Ende übergeben wir produktiv. Nicht "fast fertig", nicht "noch ein Sprint". Fertig.',
    inclusions: [
      'Server-Aufbau mit Container, Netzwerk, Security',
      'Installation & Konfiguration aller Kernsysteme',
      'Daten-Migration aus Ihren bestehenden Tools',
      'Team-Training & vollständige Dokumentation',
    ],
    audience: [
      'Sie bauen Ihr Datenfundament neu auf',
      'Sie lösen SaaS-Tools ab die zu teuer oder zu starr sind',
      'Sie wollen Infrastruktur, die in 5 Jahren noch trägt',
    ],
    cta: { label: 'Setup ansehen', href: '/services/setup' },
  },
  {
    id: 'betreuung',
    icon: 'support_agent',
    title: 'Laufende Betreuung',
    subtitle: 'Ihr System läuft. Immer.',
    badge: 'MONATLICH KÜNDBAR',
    description:
      'Nach dem Setup verschwinden wir nicht. Monitoring, Security-Patches, Updates, Weiterentwicklung — wir betreuen was wir gebaut haben. Solange Sie uns brauchen.',
    inclusions: [
      'Proaktives Monitoring & Security-Patches',
      'Monatliche System-Reviews und Roadmap-Gespräch',
      'Backup & Disaster Recovery',
      'Monatlich kündbar — keine Abhängigkeit, kein Lock-in',
    ],
    audience: [
      'Ihr Team hat keine dedizierte IT — und will auch keine einstellen',
      'Sie wollen sich auf Ihr Produkt konzentrieren, nicht auf Server',
      'Sie wollen einen Partner, der Verantwortung übernimmt',
    ],
    cta: { label: 'Betreuung ansehen', href: '/services/betreuung' },
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
