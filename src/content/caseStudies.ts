export interface CaseStudy {
  slug: string
  title: string
  type: string
  status: string
  year: string
  tags: string[]
  challenge: string
  solution: string
  outcome?: string
  metrics: { label: string; value: string; hint?: string }[]
  narrative?: string
  comingSoon?: boolean // For placeholders
}

// Primary published pilots / case studies
export const caseStudies: CaseStudy[] = [
  {
    slug: 'art-affair-qr-signage',
    title: 'ART AFFAIR – QR Code Newsletter Automation @ art KARLSRUHE 2025',
    type: 'Pilot-Projekt',
    status: 'Live Pilot',
    year: '2025',
    tags: ['Event-Tech', 'Newsletter Funnel', 'On-Site Automation', 'ActivePieces'],
    challenge:
      'Qualifizierte Kontakte am Messestand erfassen ohne Personal-Overhead & sofortigen digitalen Mehrwert liefern.',
    solution:
      'Dynamische QR-Codes an jedem Kunstwerk, Scan führt zu Micro-Flow: DSGVO-konforme Opt-in Oberfläche → Sofort E-Mail mit Stand-Infos & PDF → Segmentierung für Follow-up. Entwickelt mit ActivePieces und eigenen Code-Automationen, nahtlos in die bestehende Infrastruktur integriert.',
    outcome:
      'Hohe Conversion bei minimalem Setup-Aufwand; Grundlage für wiederverwendbaren Event-Automations-Blueprint.',
    metrics: [
      { label: 'Avg. Scan→Opt-in', value: '38%', hint: 'First-day conversion (Pilot)' },
      { label: 'Setup Zeit', value: '~2h', hint: 'On-site Aktivierung' },
      { label: 'Manual Aufwand', value: '-70%', hint: 'vs. manuelle Erfassung' },
    ],
    narrative:
      'Pilot-Projekt für art KARLSRUHE Stand: Besucher scannen QR-Codes, erhalten kontextuelle Inhalte und sind sofort im Newsletter-Segment. Entwickelt mit ActivePieces und Custom-Code-Automationen, vollständig in die bestehende Infrastruktur integriert. Kein Vendor-Lock-in, vollständig adaptierbar für kommende Ausstellungen.',
  },
]

// Upcoming placeholders – do not fabricate metrics; mark as comingSoon
export const upcomingCasePlaceholders: CaseStudy[] = [
  {
    slug: 'retrieval-hub-initial',
    title: 'Souveräner Retrieval Hub (Modular Index Layer)',
    type: 'Knowledge / Retrieval',
    status: 'In Vorbereitung',
    year: '2025',
    tags: ['Retrieval', 'Index Strategy', 'Governance'],
    challenge: 'Zersplitterte Dokumentquellen & unklare Index-Strategie.',
    solution: 'Modularer Index Hub + Zugriffsklassen + Evaluationssets.',
    metrics: [],
    comingSoon: true,
  },
  {
    slug: 'ops-automation-runbooks',
    title: 'Ops Runbook Automation (Temporal Patterns)',
    type: 'Automation',
    status: 'In Vorbereitung',
    year: '2025',
    tags: ['Workflow', 'Observability'],
    challenge: 'Manuelle repetitive Betriebs-Schritte.',
    solution: 'Workflow-Orchestrierung + wiederverwendbare Action Layer.',
    metrics: [],
    comingSoon: true,
  },
]
