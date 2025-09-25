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
    type: 'Pilot Automation',
    status: 'Live Pilot',
    year: '2025',
    tags: ['Event-Tech', 'Newsletter Funnel', 'On-Site Automation'],
    challenge:
      'Vor Ort qualifizierte Kontakte erfassen ohne Personal-Overhead & sofortigen digitalen Mehrwert liefern.',
    solution:
      'Dynamische QR-Codes an jedem Kunstwerk, Scan führt zu Micro-Flow: DSGVO-konforme Opt-in Oberfläche → Sofort E-Mail mit Stand-Infos & PDF → Segmentierung für Follow-up.',
    outcome:
      'Hohe Conversion bei minimalem Setup-Aufwand; Grundlage für wiederverwendbaren Event-Automations-Blueprint.',
    metrics: [
      { label: 'Avg. Scan→Opt-in', value: '38%', hint: 'First-day conversion (Pilot)' },
      { label: 'Setup Zeit', value: '~2h', hint: 'On-site Aktivierung' },
      { label: 'Manual Aufwand', value: '-70%', hint: 'vs. manuelle Erfassung' },
    ],
    narrative:
      'Schneller, skalierbarer Messe-Funnel: Besucher scannen, erhalten kontextuelle Inhalte und sind sofort im Segment. Kein Vendor-Lock-in, vollständig adaptierbar für kommende Ausstellungen. Grundlage für spätere Integration mit VAE CORE Embedding-Katalogen.',
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
