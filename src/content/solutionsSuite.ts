export interface SuiteSolution {
  slug: string
  name: string
  category: string
  tagline: string
  pain: string
  approach: string
  outcomes: string[]
  coreLayers: string[]
  maturity: 'Pilot'|'Beta'|'GA'|'Concept'
  handover: string[]
  statusNote?: string
}

export const solutionsSuite: SuiteSolution[] = [
  {
    slug: 'respond',
    name: 'Re:spond',
    category: 'Conversational',
    tagline: 'Produktiver Retrieval‑gestützter Dialog',
    pain: 'Unstrukturierte Dialoge, fehlende Auditierbarkeit, keine Metriken.',
    approach: 'Retrieval, Moderation, Evaluierung, rollenbasiert, auditierbar.',
    outcomes: ['Schneller produktiv', 'Auditierbarer Lifecycle', 'Modular erweiterbar'],
    coreLayers: ['Ingestion','Retrieval','Orchestration','Observability'],
    maturity: 'GA',
    handover: ['Runbooks','Evaluations','Roles'],
    statusNote: 'Live Pilot'
  },
  {
    slug: 'review',
    name: 'Re:view',
    category: 'Knowledge',
    tagline: 'Bewertungen, Drift, Gaps',
    pain: 'Fehlende Qualitätsbewertung, Wissenslücken.',
    approach: 'Automatisierte QA, Drift-Erkennung, Gap-Analyse.',
    outcomes: ['Qualitätsmetriken','Wissensabdeckung','Früherkennung'],
    coreLayers: ['Retrieval','Observability'],
    maturity: 'Beta',
    handover: ['Evaluations'],
    statusNote: 'Beta verfügbar'
  },
  {
    slug: 'research',
    name: 'Re:search',
    category: 'Research',
    tagline: 'Kontextuierte Quellen & Traceability',
    pain: 'Unklare Quellen, fehlende Nachvollziehbarkeit.',
    approach: 'Workspace, Quellen-Trace, Kontext-Annotation.',
    outcomes: ['Quellenklarheit','Kontext-Annotation','Traceability'],
    coreLayers: ['Ingestion','Retrieval'],
    maturity: 'Pilot',
    handover: ['Runbooks'],
    statusNote: 'Pilot verfügbar'
  },
  {
    slug: 'resolve',
    name: 'Re:solve',
    category: 'Ops',
    tagline: 'Incident / Runbooks',
    pain: 'Manuelle Betriebsabläufe, keine Automatisierung.',
    approach: 'Guided Triage, Action Patterns, Workflow.',
    outcomes: ['Automatisierung','Fehlerreduktion','Schnelle Reaktion'],
    coreLayers: ['Orchestration','Observability'],
    maturity: 'Concept',
    handover: ['Runbooks'],
    statusNote: 'In Vorbereitung'
  },
  {
    slug: 'remind',
    name: 'Re:mind',
    category: 'Growth',
    tagline: 'Proaktive Signals',
    pain: 'Verpasste Chancen, keine proaktiven Hinweise.',
    approach: 'Drift, Anomalie, Expiry Prompts.',
    outcomes: ['Proaktive Alerts','Churn-Reduktion','Früherkennung'],
    coreLayers: ['Observability'],
    maturity: 'Concept',
    handover: ['Evaluations'],
    statusNote: 'In Vorbereitung'
  },
  {
    slug: 'report',
    name: 'Re:port',
    category: 'Reporting',
    tagline: 'Automated Reporting',
    pain: 'Manuelle Reports, keine Automatisierung.',
    approach: 'Daten→Narrativ Pipelines.',
    outcomes: ['Automatisierte Reports','Konsistenz','Zeitersparnis'],
    coreLayers: ['Orchestration'],
    maturity: 'Concept',
    handover: ['Runbooks'],
    statusNote: 'In Vorbereitung'
  },
  {
    slug: 'retain',
    name: 'Re:tain',
    category: 'Growth',
    tagline: 'Churn & Engagement Insights',
    pain: 'Unklare Kundenbindung, keine Insights.',
    approach: 'Engagement-Analyse, Churn Detection.',
    outcomes: ['Kundenbindung','Churn-Reduktion','Engagementmetriken'],
    coreLayers: ['Observability'],
    maturity: 'Concept',
    handover: ['Evaluations'],
    statusNote: 'In Vorbereitung'
  },
  {
    slug: 'recruit',
    name: 'Re:cruit',
    category: 'Ops',
    tagline: 'Skill / Matching Inferenz',
    pain: 'Manuelle Skill-Zuordnung, keine Automatisierung.',
    approach: 'Matching, Inferenz, Automatisierung.',
    outcomes: ['Skill-Matching','Automatisierung','Effizienz'],
    coreLayers: ['Orchestration'],
    maturity: 'Concept',
    handover: ['Runbooks'],
    statusNote: 'In Vorbereitung'
  },
  {
    slug: 'release',
    name: 'Re:lease',
    category: 'Ops',
    tagline: 'Release Diff → Change Intelligence',
    pain: 'Unklare Release-Änderungen, keine Transparenz.',
    approach: 'Diff-Analyse, Change Intelligence.',
    outcomes: ['Transparenz','Change-Tracking','Effizienz'],
    coreLayers: ['Orchestration','Observability'],
    maturity: 'Concept',
    handover: ['Runbooks'],
    statusNote: 'In Vorbereitung'
  }
]
