// Content model for the Process (How we work) section
export interface ProcessStep {
  key: string
  title: string
  summary: string
  deliverables: string[]
  durationHint?: string // approximate, non-binding
  icon?: string
  glossary?: { term: string; explanation: string }[]
}

export interface GlossaryTerm { term: string; explanation: string }

export const processDisclaimer = 'Richtwerte – genaue Dauer variiert nach Systemlandschaft & Datenlage.'

export const processSteps: ProcessStep[] = [
  {
    key: 'focus',
    title: 'Fokus & Use‑Case‑Schärfung',
    summary: 'Gemeinsames Verständnis: Ziele, bestehende Systeme, Datenquellen, Risiken. Verdichtung auf ein klares erstes Wirkungsziel.',
    deliverables: [
      'Use-Case Canvas',
      'Erfolgskriterien / Akzeptanzkriterien',
      'Daten- & Risiko-Snapshot'
    ],
    durationHint: '~3–5 Tage',
    icon: 'target'
  },
  {
    key: 'architecture',
    title: 'Architektur & Feasibility Sprint',
    summary: 'Technische Skizze, Schnittstellen, Datenflüsse, Stack-Auswahl & Machbarkeitsprüfung (Feasibility). Basis für zuverlässigen Pilot ohne späteren Rewrite.',
    deliverables: [
      'Zielarchitektur / Komponentenplan',
      'Stack- & Tool-Entscheidungen (begründet)',
      'Runbook-Skelett',
      'Aufwandseinschätzung'
    ],
    durationHint: '~1–2 Wochen',
    icon: 'architecture',
    glossary: [
      { term: 'Feasibility', explanation: 'Machbarkeitsprüfung: Sind Daten, Schnittstellen & Ressourcen ausreichend für einen sinnvollen Pilot?' },
      { term: 'Runbook', explanation: 'Praktische Betriebsanleitung für wiederkehrende Aufgaben (Deploy, Monitoring, Recovery).' }
    ]
  },
  {
    key: 'pilot',
    title: 'Pilot & Evaluierung',
    summary: 'Produktionsnahes Inkrement: Kernfunktion läuft, Feedback- & Messpunkte aktiv. Iterationen anhand Metriken statt Bauchgefühl.',
    deliverables: [
      'Laufender Pilot (z.B. internes Interface / API)',
      'Evaluierungsmetriken (Qualität, Latenz)',
      'Feedback-/Iteration-Loop',
      'Basis Observability'
    ],
    durationHint: '~2–4 Wochen',
    icon: 'rocket_launch',
    glossary: [
      { term: 'Evaluierung', explanation: 'Systematische Bewertung: erfüllt das Ergebnis definierte Akzeptanzkriterien & Qualitätsziele?' },
      { term: 'Observability', explanation: 'Transparenz über Verhalten & Performance: Logs, Metriken, Traces für schnelle Diagnose.' },
      { term: 'Guardrails', explanation: 'Eingebaute Sicherheits- / Qualitätsmechanismen (Filter, Validierung, Policies) um Fehlverhalten zu minimieren.' }
    ]
  },
  {
    key: 'handover',
    title: 'Übergabe & Ausbaupfad',
    summary: 'Dokumentation finalisieren, Ownership sichern, nächste Ausbaustufen planen. Optional Schulung & Enablement.',
    deliverables: [
      'Runbooks & Betriebsmodell',
      'Infra- & Architektur-Dokumentation',
      'Roadmap Phase 2',
      'Optional: Training / Enablement'
    ],
    durationHint: '~3–5 Tage',
    icon: 'assignment_turned_in'
  }
]

// Global zusätzliche Glossarbegriffe, die nicht nur einem Step zugeordnet sind
export const processGlossary: GlossaryTerm[] = [
  { term: 'Retrieval', explanation: 'Gezieltes Auffinden relevanter Inhalte aus internen Quellen (Index / Vektorsuche) zur Anreicherung von Antworten.' },
  { term: 'Adapter-Layer', explanation: 'Abstraktionsschicht zwischen Kernlogik und externen Systemen – ermöglicht Austausch / Erweiterung ohne Kern-Rewrite.' },
  { term: 'Ownership', explanation: 'Fähigkeit, System & Codebasis intern zu verstehen, betreiben und verändern zu können – ohne uns.' }
]
