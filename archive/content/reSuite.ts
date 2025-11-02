export interface ReModule {
  slug: string
  name: string
  tagline: string
  pain: string
  approach: string
  features: string[]
  coreLayers: string[]
  integrations: string[]
  demoFlow: string[] // four-step demo flow
  status?: string
}

export interface RePackage {
  name: string
  contains: string[]
  benefit: string
}

export const reSuiteIntro = {
  title: 'VAE Re: Suite – Website & Data Spec – Kompaktversion',
  intro:
    'Re: – Unsere Antwort auf echte Probleme. In der E‑Mail heißt „Re:“ Antwort. Bei VAE steht es für Reaktion, Reflexion, Resultat. Re:-Bausteine sind betreibbare Komplettsysteme auf dem VAE CORE – einzeln wirksam, im Verbund stärker.',
  bullets: ['Schnell produktiv', 'Messbar & auditierbar', 'Modular erweiterbar'],
}

export const reModules: ReModule[] = [
  {
    slug: 'respond',
    name: 'Re:spond',
    tagline: 'Immer da, wenn Ihre Kunden fragen.',
    pain: 'Kunden warten zu lange, Infos fehlen, Leads springen ab.',
    approach: 'Retrieval‑basierter Chat mit Markenstimme, Quellen & Feedback.',
    features: [
      'Website‑Widget & E‑Mail‑Antwortsystem',
      'Erweiterbar um WhatsApp/Telegram/Slack',
      'Quellen‑Zitation & Feedback‑Loop',
      'Marken‑ & Policy‑gesteuert',
    ],
    coreLayers: ['Ingestion', 'Retrieval', 'Orchestration', 'Observability'],
    integrations: ['Zendesk', 'HubSpot', 'Notion', 'Confluence'],
    demoFlow: ['Frage', 'Suchen & Finden', 'Antwort mit Quelle', 'Feedback'],
    status: 'Concept',
  },
  {
    slug: 'research',
    name: 'Re:search',
    tagline: 'Recherche, die mitdenkt.',
    pain: 'Zeitfressende manuelle Recherchen, veraltete Infos, fehlende Übersicht.',
    approach: 'KI-Agent liest Websites, analysiert Konkurrenz, erstellt Branchen‑Newsfeeds.',
    features: [
      'Automatisierte Web‑ & Dokumentenrecherche',
      'Wiederkehrende Markt‑Updates',
      'Konkurrenzanalyse & Benchmark‑Reports',
      'Zielgerichtete Optimierungsrecherche',
    ],
    coreLayers: ['Ingestion', 'Retrieval', 'Observability'],
    integrations: ['Google Search API', 'Interne Wissensdatenbanken'],
    demoFlow: ['Anfrage', 'Quellen scannen', 'Analyse erstellen', 'Report speichern'],
    status: 'Concept',
  },
  {
    slug: 'report',
    name: 'Re:port',
    tagline: 'Unternehmenszahlen, automatisch erklärt.',
    pain: 'Monatliche Reports dauern Tage, Daten aus vielen Systemen zusammensuchen.',
    approach: 'Pipeline von Datenquellen zu klaren, verständlichen Berichten.',
    features: [
      'Monats-/Quartals-/Ad‑hoc‑Reports',
      'Automatisierte Datenaggregation',
      'KPI‑Erklärungen & Visualisierungen',
      'Export in PDF, Slides, Notion',
    ],
    coreLayers: ['Orchestration', 'Observability'],
    integrations: ['BI‑Tools', 'ERP', 'CRM'],
    demoFlow: ['Daten abrufen', 'KPIs berechnen', 'Report generieren', 'Export senden'],
    status: 'Concept',
  },
  {
    slug: 'release',
    name: 'Re:lease',
    tagline: 'Bestandskunden immer im Bilde.',
    pain: 'Kunden erfahren zu spät von Updates oder Produkten.',
    approach: 'Automatisierte Updates & Antwortsystem für Bestandskundenkommunikation.',
    features: [
      'Newsletter‑Generierung mit KI',
      'Rückfragen automatisch beantworten',
      'Zielgruppen‑Segmentierung',
      'Integration mit CRM und Support',
    ],
    coreLayers: ['Orchestration', 'Retrieval'],
    integrations: ['Mailchimp', 'HubSpot', 'Sendinblue'],
    demoFlow: ['Neues Update', 'Nachricht generieren', 'Versand', 'Antworten verarbeiten'],
    status: 'Concept',
  },
  {
    slug: 'recruit',
    name: 'Re:cruit',
    tagline: 'Talente schneller finden.',
    pain: 'Manuelles Screening & langsames Matching.',
    approach: 'Kandidaten‑Profiling & Anforderungs‑Matching, Outreach‑Automatisierung.',
    features: [
      'Skill‑Extraction aus CV/Profilen',
      'Constraint‑Matching',
      'ATS/LinkedIn‑Anbindung',
      'Vorlagen für Outreach',
    ],
    coreLayers: ['Orchestration'],
    integrations: ['Greenhouse', 'Lever', 'LinkedIn'],
    demoFlow: ['Profile importieren', 'Matchen', 'Vorschläge', 'Outreach'],
    status: 'Concept',
  },
  {
    slug: 'reboard',
    name: 'Re:board',
    tagline: 'Onboarding, das Antworten mitliefert.',
    pain: 'Neue & bestehende Mitarbeiter verlieren Zeit, Wissen ist verstreut.',
    approach: 'Interner Assistent für Prozesse, Tools, Ansprechpartner.',
    features: [
      'Q&A zu Firmen‑ & Tool‑Wissen',
      'Ansprechpartner‑Finder',
      'Guides & Schulungsressourcen',
      'Feedback & Lücken‑Meldung',
    ],
    coreLayers: ['Retrieval', 'Orchestration', 'Observability'],
    integrations: ['Confluence', 'SharePoint', 'HRIS'],
    demoFlow: ['Frage', 'Interne Quelle', 'Antwort/Eskalation', 'Feedback'],
    status: 'Concept',
  },
]

export const rePackages: RePackage[] = [
  {
    name: 'VAE Assist Suite – Dialog & Qualität',
    contains: ['Re:spond', 'Re:view', 'Re:search'],
    benefit: 'Auditierbarer Chat/Wissenshub, Qualität messbar, Zitation & Traceability',
  },
  {
    name: 'VAE Ops Suite – Betrieb & Incident',
    contains: ['Re:solve', 'Re:mind', 'Re:port'],
    benefit: 'Schnellere Incidents, Proaktive Warnungen, Automatisierte Reports',
  },
  {
    name: 'VAE Growth Suite – Kunden & Engagement',
    contains: ['Re:tain', 'Re:cruit'],
    benefit: 'Höhere Bindung, Schnelleres Staffing',
  },
  {
    name: 'VAE Dev Suite – Releases & Qualität',
    contains: ['Re:lease', 'Re:port', 'Re:view'],
    benefit: 'Transparente Änderungen, Messbare Qualität, Wiederverwendbare Reports',
  },
]
