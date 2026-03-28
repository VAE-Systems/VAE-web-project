export const heroTitle = ['Wissen Sie, wo Ihre', 'Firmendaten landen?'] as const

export const heroEyebrow = 'VAE Systems · Self-Hosting für Unternehmen' as const

export const heroDescription =
  'Bei der Konkurrenz, beim Finanzamt, bei Hackern — oder auf Ihren eigenen Servern. Wir bauen Ihnen den Tresor im eigenen Haus: Ihre Daten, Ihre Regeln, volle Kontrolle. Verständlich erklärt, schnell umgesetzt.'

export interface HeroBenefit {
  title: string
  description: string
  icon: string
}

export const heroBenefits: HeroBenefit[] = [
  {
    title: 'Keine fremde Bank',
    description:
      'Ihre Daten liegen nicht bei Microsoft, Google oder Salesforce — sondern auf Ihrem eigenen Server in Deutschland.',
    icon: 'verified_user',
  },
  {
    title: 'Kein Stromausfall-Risiko',
    description:
      'Wenn SaaS-Dienste ausfallen, steht Ihr Betrieb. Mit Self-Hosting bestimmen Sie, wann Updates passieren.',
    icon: 'security',
  },
  {
    title: 'Kein Preisdiktat',
    description: 'Kein Anbieter kann Ihnen morgen die Preise verdoppeln. Einmal aufgebaut — für immer Ihres.',
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
  title: '45 Minuten, die Ihre Tool-Landschaft komplett neu sortieren können.',
  description:
    'Wir schauen auf Ihre Tools, Kosten, Datenlage und Zielbild. Danach wissen Sie, ob Migration, Hybrid-Modell oder bewusstes Nichtstun wirtschaftlich sinnvoller ist.',
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
    title: 'Wissen Sie, wer Ihre Daten sieht?',
    description:
      'Internet, Microsoft Word, Excel, externe Datenbanken — jedes dieser Tools öffnet Ihre Firmendaten nach außen. Tor und Tür für Konkurrenz, Finanzamt und Hacker.',
    bullets: ['Kundendaten liegen auf fremden Servern', 'Sie haften — nicht der Anbieter'],
  },
  {
    title: 'Was passiert beim nächsten Stromausfall?',
    description:
      'Ihre Firma ist gelähmt und handlungsunfähig, wenn diese Dienste wegen Krisen oder Stromausfällen nicht mehr funktionieren. Sie haben keine Kontrolle darüber.',
    bullets: ['Ausfall trifft Sie, nicht den Anbieter', 'Updates passieren ohne Ihre Zustimmung'],
  },
  {
    title: 'Die Bank bestimmt die Hausregeln',
    description:
      'Bei einer Cloud-Lösung mieten Sie einen Tresor in einem fremden Bankgebäude. Die Bank sieht, wer ein- und ausgeht — und kann die Konditionen jederzeit ändern.',
    bullets: ['Preiserhöhungen: zahlen oder alles verlieren', 'Funktionen verschwinden ohne Vorwarnung'],
  },
  {
    title: 'Sie zahlen für 80 Features, nutzen 12',
    description:
      'Konfektionsware statt Maßanzug. Der Rest ist Ballast — und bleibt trotzdem auf der Rechnung. Spezielle Abläufe Ihres Unternehmens? Nur im teuren Enterprise-Plan.',
    bullets: ['Ihre Prozesse passen sich der Software an', 'Nicht umgekehrt'],
  },
] as const

export const openSourceAdvantages: OpenSourcePointWithBullets[] = [
  {
    title: 'Das Hausherr-Prinzip',
    description:
      'Stellen Sie sich vor, Ihre Unternehmensdaten wären wertvolle Akten. Self-Hosting bedeutet: Sie stellen den Tresor in Ihr eigenes Gebäude. Sie haben die Schlüssel. Niemand sonst.',
    bullets: ['Volle Kontrolle über Zugriff und Datenflüsse', 'Keine Abhängigkeit von US-Konzernen'],
  },
  {
    title: 'Der Tresor-Faktor: DSGVO ohne Kompromisse',
    description:
      'In Deutschland ist DSGVO kein Buzzword — es ist Haftungsrisiko. Bei Self-Hosted-Lösungen verlassen sensible Kunden- und Personaldaten niemals Ihren kontrollierten Bereich.',
    bullets: ['Server in Deutschland, DSGVO-konform', 'Sie haften nicht für fremde Fehler'],
  },
  {
    title: 'Kein Preisdiktat — für immer',
    description:
      'Einmal aufgebaut gehört die Infrastruktur Ihnen. Kein Anbieter kann Ihnen morgen die Preise verdoppeln, eine Funktion streichen oder den Vertrag kündigen.',
    bullets: ['Einmalige Investition statt ewige Abos', 'Ihr Team wächst — Ihre IT-Kosten nicht'],
  },
  {
    title: 'KI intern — ohne Datenleck',
    description:
      'KI kann Ihre Firmendaten analysieren, ohne dass diese das Haus verlassen. Llama, Mistral, DeepSeek — aktuelle Modelle laufen auf Ihrem Server, nicht auf fremden.',
    bullets: ['Keine Firmendaten zu OpenAI oder Google', 'KI-Assistent der Ihre Prozesse kennt'],
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
    id: 'hosting',
    icon: 'dns',
    title: 'WEBHOSTING & NETZWERKE',
    subtitle: 'DER EINSTIEG. SAUBER. SICHER. DEUTSCH.',
    badge: 'AB SOFORT',
    secondaryBadge: 'MONATLICH KÜNDBAR',
    description:
      'Ihre Website, Ihre App, Ihre Domains — auf Servern in Deutschland, die wir aufsetzen, absichern und betreuen. Kein Shared-Hosting-Einheitsbrei. Dedizierter Stack, den Sie verstehen und kontrollieren.',
    inclusions: [
      'MANAGED HOSTING AUF HETZNER DEUTSCHLAND',
      'SSL, FIREWALL, BACKUPS — ALLES INKLUSIVE',
      'DOMAINS, DNS, E-MAIL-ROUTING SAUBER KONFIGURIERT',
      'MONATLICHES MONITORING & SECURITY-PATCHES',
      'DIREKTER ANSPRECHPARTNER — KEIN TICKET-SYSTEM',
    ],
    audience: [
      'SIE WOLLEN RAUS AUS BILLIG-HOSTING MIT NULL KONTROLLE',
      'SIE BRAUCHEN EINE VERLÄSSLICHE BASIS FÜR IHR BUSINESS',
      'SIE WOLLEN WISSEN WO IHRE DATEN PHYSISCH LIEGEN',
    ],
    cta: { label: 'Hosting anfragen', href: '/services/hosting' },
  },
  {
    id: 'betreuung',
    icon: 'support_agent',
    title: 'LANGFRISTIGE BETREUUNG',
    subtitle: 'IHR SYSTEM LÄUFT. IMMER. WIR SORGEN DAFÜR.',
    badge: 'MANAGED SERVICE',
    secondaryBadge: 'MONATLICH KÜNDBAR',
    description:
      'Wir verschwinden nicht nach dem Setup. Server, Updates, Security, Monitoring — wir übernehmen Verantwortung für das was wir gebaut haben. Ihr habt kein eigenes IT-Team? Dann sind wir es.',
    inclusions: [
      'PROAKTIVES MONITORING — WIR MERKEN ES VOR IHNEN',
      'SECURITY-PATCHES & UPDATES OHNE IHR ZUTUN',
      'MONATLICHER SYSTEM-REVIEW & ROADMAP-GESPRÄCH',
      'BACKUP & DISASTER RECOVERY — DOKUMENTIERT',
      'ERWEITERBAR: NEUE SYSTEME JEDERZEIT DAZUBUCHBAR',
    ],
    audience: [
      'SIE WOLLEN SICH AUF IHR PRODUKT KONZENTRIEREN',
      'SIE HABEN KEIN DEDIZIERTES IT-TEAM',
      'SIE WOLLEN EINEN PARTNER DER VERANTWORTUNG ÜBERNIMMT',
    ],
    cta: { label: 'Betreuung ansehen', href: '/services/betreuung' },
  },
  {
    id: 'infrastruktur',
    icon: 'storage',
    title: 'INFRASTRUKTUR & OPEN-SOURCE-STACK',
    subtitle: 'PRODUKTIV IN 3–6 WOCHEN. NICHT FAST FERTIG. FERTIG.',
    badge: '3–6 WOCHEN',
    description:
      'Nextcloud statt Google Drive. Odoo statt Salesforce. n8n statt Zapier. Wir bauen Ihren Stack — selbstgehostet, DSGVO-sauber, mit Migration aus Ihren alten Tools und Team-Training. Einmalig bezahlt. Für immer Ihres.',
    inclusions: [
      'SERVER-AUFBAU: CONTAINER, NETZWERK, SECURITY',
      'NEXTCLOUD, ODOO, N8N, ONLYOFFICE — KONFIGURIERT',
      'DATEN-MIGRATION AUS BESTEHENDEN TOOLS',
      'TEAM-TRAINING & VOLLSTÄNDIGE DOKUMENTATION',
      'ÜBERGABE: PRODUKTIV — NICHT "FAST FERTIG"',
    ],
    audience: [
      'SIE LÖSEN SAAS-TOOLS AB DIE ZU TEUER ODER ZU STARR SIND',
      'SIE BAUEN IHR DATENFUNDAMENT NEU AUF',
      'SIE WOLLEN INFRASTRUKTUR DIE IN 5 JAHREN NOCH TRÄGT',
    ],
    cta: { label: 'Setup ansehen', href: '/services/setup' },
  },
  {
    id: 'custom',
    icon: 'build',
    title: 'CUSTOM TOOLS & AUTOMATISIERUNG',
    subtitle: 'WENN STANDARD NICHT REICHT. MASSANZUG STATT KONFEKTIONSWARE.',
    badge: 'CUSTOM',
    secondaryBadge: 'INKL. KI-INTEGRATION',
    description:
      'Workflows die kein SaaS-Tool abbilden kann. KI-Agenten die auf Ihren Daten laufen. Schnittstellen zwischen Systemen die nie für einander gedacht waren. Wir bauen was Sie brauchen — nicht was es schon gibt.',
    inclusions: [
      'CUSTOM AUTOMATIONEN MIT N8N & EIGENEM CODE',
      'KI-AGENTEN AUF IHRER INFRASTRUKTUR (KEINE API-KOSTEN)',
      'SCHNITTSTELLEN & INTEGRATIONEN NACH MASS',
      'DASHBOARDS, REPORTING, INTERNE TOOLS',
      'VOLLSTÄNDIG IN IHRE BESTEHENDE INFRASTRUKTUR INTEGRIERT',
    ],
    audience: [
      'SIE HABEN PROZESSE DIE KEIN STANDARD-TOOL ABBILDET',
      'SIE WOLLEN KI OHNE MONATLICHE OPENAI-RECHNUNG',
      'SIE WOLLEN WETTBEWERBSVORTEIL DURCH TECHNOLOGIE',
    ],
    cta: { label: 'Custom anfragen', href: '/services/custom' },
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
  value?: string
}

export const referenceInsights: ReferenceInsight[] = [
  {
    id: 'effizienz',
    title: 'Effizienzsteigerung',
    description: 'Workflows werden durch KI-Optimierung messbar effizienter.',
    icon: 'trending_up',
    value: '40%+',
  },
  {
    id: 'setup',
    title: 'Setup-Dauer',
    description: '3–6 Wochen bis produktive Übergabe.',
    icon: 'schedule',
    value: '3–6 W',
  },
  {
    id: 'compliance',
    title: 'DSGVO-Compliance',
    description: '100% rechtssichere Daten-Speicherung in Deutschland.',
    icon: 'shield',
    value: '100%',
  },
  {
    id: 'zufriedenheit',
    title: 'Zufriedenheit',
    description: 'Kunden schätzen die Transparenz & langfristige Perspektive.',
    icon: 'grade',
    value: '★★★★★',
  },
] as const
