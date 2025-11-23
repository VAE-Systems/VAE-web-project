// Services Content - Zentralisiert lange Texte aus ServicesPage.tsx
export const servicesHero = {
  title: 'Services',
  subtitle: 'Arbeitsinfrastruktur einrichten, mit KI optimieren und langfristig betreuen.',
  description:
    'Wir kombinieren Open-Source-Business-Tools, intelligente Workflows und kontinuierliche Weiterentwicklung – so entsteht eine digitale Arbeitsumgebung, die mit Ihrem Unternehmen wächst.',
}

export const servicesLifecycle = {
  title: 'Von Setup bis dauerhafte Weiterentwicklung.',
  description1:
    'Wir starten mit einem vollständigen Infrastruktur-Setup, bauen anschließend KI-gestützte Workflows aus und begleiten den Betrieb langfristig – alles in klaren, nachvollziehbaren Etappen.',
  description2:
    'Das Ergebnis: eine selbstgehostete Business-Suite mit kontinuierlichen Verbesserungszyklen, transparenter Kostenstruktur und dokumentiertem Wissenstransfer zu Ihrem Team.',
  platformLink: 'Produktseite für VAE CORE bleibt unter /vae-core abrufbar.',
}

export const lifecycleBenefits = [
  {
    title: 'Schneller Start',
    benefits: ['Produktive Systeme binnen 2–4 Wochen', 'Saubere Übergabe & Runbooks', 'Team-Onboarding inklusive'],
  },
  {
    title: 'Messbare Effizienz',
    benefits: ['AI-gestützte Workflows', 'Regelmäßige Reviews', 'Transparente KPI-Reports'],
  },
  {
    title: 'Langfristige Sicherheit',
    benefits: ['Kontinuierliche Updates', 'Security- & Backup-Checks', 'Support & Betreuung'],
  },
]

export const servicesCategories = [
  {
    key: 'infrastructure',
    title: 'Arbeitsinfrastruktur Setup',
    icon: 'storage',
    focus: 'Nextcloud, CRM, Kommunikation & Wissen – produktionsbereit eingerichtet.',
    examples: ['System-Setup', 'Benutzer & Rechte', 'Security & Backups'],
    to: '/infrastruktur',
  },
  {
    key: 'automation',
    title: 'AI-Workflow Optimierung',
    icon: 'auto_awesome',
    focus: 'Automationen & AI-Use-Cases für Ihre Prozesse.',
    examples: ['Dokumenten-Pipelines', 'Service-Workflows', 'KPI-Dashboards'],
    to: '/ki-optimierung',
  },
  {
    key: 'support',
    title: 'Langfristige Betreuung',
    icon: 'support_agent',
    focus: 'Updates, Security, Features & Support im laufenden Betrieb.',
    examples: ['Release-Planung', 'Security Checks', 'Support & Enablement'],
    to: '/betreuung',
  },
]

export const comparisonMatrix = {
  title: 'Welche Leistung deckt welchen Bedarf?',
  subtitle:
    'Drei aufeinander aufbauende Servicebereiche greifen ineinander: Infrastruktur aufsetzen, Prozesse mit KI optimieren und Systeme langfristig betreuen.',
  columns: [
    { key: 'infrastructure', label: 'Infrastruktur-Setup' },
    { key: 'automation', label: 'AI-Optimierung' },
    { key: 'support', label: 'Langzeit-Betreuung' },
  ],
  criteria: [
    {
      key: 'ziel',
      label: 'Primäres Ziel',
      infrastructure: 'Produktive Open-Source-Stacks',
      automation: 'Prozessautomatisierung & KPIs',
      support: 'Stabiler Betrieb & kontinuierlicher Ausbau',
    },
    {
      key: 'output',
      label: 'Output',
      infrastructure: 'Implementiertes System + Runbook',
      automation: 'Automations-Workflows & Dashboards',
      support: 'Roadmap, Release-Plan & Support-Report',
    },
    {
      key: 'dauer',
      label: 'Typische Dauer',
      infrastructure: '2–4 Wochen Rollout',
      automation: '3–6 Wochen Inkremente',
      support: 'Monatliche Zyklen / laufend',
    },
    {
      key: 'team',
      label: 'Interne Beteiligung',
      infrastructure: 'IT & Key User Enablement',
      automation: 'Prozessowner & Fachbereiche',
      support: 'Stakeholder & Supportkontakt',
    },
    {
      key: 'metriken',
      label: 'Messpunkte',
      infrastructure: 'Nutzerakzeptanz, Betriebs-SLAs',
      automation: 'Durchlaufzeit, Fehlerquote, KPIs',
      support: 'Verfügbarkeit, Tickets, Roadmap-Status',
    },
    {
      key: 'lockin',
      label: 'Lock-in Risiko',
      infrastructure: 'Gering (Open Source + Dokumentation)',
      automation: 'Gering (modulare Workflows)',
      support: 'Keine Zusatzbindung',
    },
  ],
  footnote:
    'Leistungen lassen sich einzeln oder als Gesamtpaket buchen – gemeinsam priorisieren wir nach Impact und Reifegrad.',
  sequenceNote: 'Empfohlene Reihenfolge: Infrastruktur-Setup → AI-Optimierung → Langfristige Betreuung.',
}

export const finalCta = {
  title: 'Bereit für Ihre Testphase?',
  subtitle:
    'Starten Sie mit einer vollständig eingerichteten Infrastruktur, testen Sie drei Monate lang für nur die Serverkosten und entscheiden Sie danach in Ruhe.',
  buttons: [
    { to: '/testphase', text: '3-Monate Testphase starten', primary: true },
    { to: '/contact', text: 'Strategiegespräch vereinbaren', secondary: true },
  ],
  disclaimer:
    'Testphase: €189/Monat (Server & Betrieb). Danach: €489/Monat Vollservice oder €149/Monat Infrastruktur only.',
}

export const servicesData = [
  {
    key: 'infrastructure',
    badge: 'Setup',
    title: 'Arbeitsinfrastruktur einrichten',
    description:
      'Nextcloud, CRM, Kommunikationstools und Wissensspeicher – alles selbstgehostet, DSGVO-konform und für Ihr Team vorbereitet.',
    stats: [
      { value: '2–4', desc: 'Wochen bis Go-Live', note: '3' },
      { value: '80%', desc: 'SaaS-Kostenersparnis' },
    ],
    features: ['Nextcloud Business Suite', 'CRM- & Automationsmodule', 'Backup & Security Framework'],
    cta: 'Setup besprechen',
    iconName: 'storage',
  },
  {
    key: 'automation',
    badge: 'AI',
    title: 'Mit KI kontinuierlich verbessern',
    description:
      'Wir entwickeln AI-gestützte Workflows, automatisieren wiederkehrende Aufgaben und liefern Dashboards für sichtbare Ergebnisse.',
    stats: [
      { value: '3–6', desc: 'Wochen je Iteration', note: '4' },
      { value: '2-3h', desc: 'Zeitgewinn pro Mitarbeiter/Woche' },
    ],
    features: ['Dokumenten- & Service-Automation', 'Datenanalyse & Reporting', 'Iterative Optimierung'],
    cta: 'AI-Potenzial analysieren',
    iconName: 'auto_awesome',
  },
  {
    key: 'support',
    badge: 'Care',
    title: 'Langfristige Betreuung & Ausbau',
    description:
      'Regelmäßige Updates, Security-Checks, neue Features und Support – wir entwickeln Ihre Infrastruktur dauerhaft weiter.',
    stats: [
      { value: '24/7', desc: 'Monitoring optional' },
      { value: '€489', desc: 'Monatliche Vollbetreuung' },
    ],
    features: ['Feature-Roadmap & Rollout', 'Security & Compliance Checks', 'Support & Enablement'],
    cta: 'Betreuung anfragen',
    iconName: 'support_agent',
  },
]

export interface ConsultingService {
  id: string
  title: string
  description: string
  type: 'consulting' | 'coordination'
  features: string[]
  timeline: string
  investment: string
  cta: string
}

export const consultingServices: ConsultingService[] = [
  {
    id: 'infrastructure-setup',
    title: 'Arbeitsinfrastruktur einrichten',
    description:
      'Kompletter Aufbau Ihrer digitalen Arbeitsumgebung mit Nextcloud, CRM, Kommunikationstools und Kollaborations-Workflows – fertig dokumentiert und für Ihr Team einsatzbereit.',
    type: 'consulting',
    features: [
      'System- & Benutzerkonfiguration',
      'Security, Backup & Monitoring',
      'Team-Onboarding & Dokumentation',
      'Integration bestehender Datenquellen',
    ],
    timeline: 'Phase 1 · 2–4 Wochen',
    investment: 'Testphase: €189/Monat (Server & Betrieb) · Danach: ab €149/Monat',
    cta: 'Setup besprechen',
  },
  {
    id: 'ai-optimization',
    title: 'AI-Workflow Optimierung',
    description:
      'Wir automatisieren wiederkehrende Aufgaben, verbinden Systeme und liefern kontinuierlich neue AI-gestützte Effizienzhebel sowie nachvollziehbare KPIs.',
    type: 'consulting',
    features: [
      'Dokumenten- & Anfrageautomatisierung',
      'Workflow-Design & Iteration',
      'KPI-Dashboards & Reporting',
      'Regelmäßige Optimierungssprints',
    ],
    timeline: 'Phase 2 · fortlaufende Sprints (3–6 Wochen)',
    investment: 'Inklusive in der monatlichen Betreuung',
    cta: 'AI-Potenzial analysieren',
  },
  {
    id: 'longterm-support',
    title: 'Langfristige Betreuung',
    description:
      'Updates, Security-Patches, neue Features und Support – wir entwickeln die Infrastruktur im laufenden Betrieb weiter und bleiben technischer Ansprechpartner.',
    type: 'coordination',
    features: [
      'Feature-Roadmap & Release-Management',
      'Security & Compliance Checks',
      'Support & Incident Handling',
      'Wissenstransfer & Enablement',
    ],
    timeline: 'Phase 3 · monatliche Weiterentwicklung',
    investment: 'Vollservice: €489/Monat · Infrastruktur only: €149/Monat',
    cta: 'Betreuung anfragen',
  },
]

export const lifecycleBlocks = [
  {
    title: 'Aufsetzen',
    description:
      'Komplette Infrastruktur in wenigen Wochen produktiv: Systeme, Benutzer, Sicherheit und Dokumentation stehen vom ersten Tag an.',
  },
  {
    title: 'Optimieren',
    description:
      'AI-gestützte Workflows und Automationen ergänzen das Fundament. Wir messen Wirkung, justieren Prozesse und liefern Insights.',
  },
  {
    title: 'Betreuen',
    description:
      'Kontinuierliche Weiterentwicklung mit Feature-Releases, Security-Checks und Support – für eine Infrastruktur, die mit Ihnen skaliert.',
  },
]
