export const heroTitle = ['Business Efficiency', 'durch Open Source & AI.'] as const

export const heroTypewriterTexts = [
  'Produktionsreife Kollaborationsumgebungen',
  'AI-Workflows für messbare Effizienz',
  'Langfristige Weiterentwicklung & Support',
] as const

export interface HeroDescription {
  before: string
  highlight: string
  after: string
}

export const heroDescription: HeroDescription = {
  before:
    'Wir bauen Ihre digitale Arbeitsumgebung in Wochen statt Monaten auf, verbinden sie mit passenden KI-Workflows und betreuen alles langfristig – nachvollziehbar dokumentiert und auf mittelständische Teams abgestimmt.',
  highlight: '',
  after: '',
}

export interface HeroBenefit {
  title: string
  description: string
  icon: string
}

export const heroBenefits: HeroBenefit[] = [
  {
    title: 'Komplett-Setup',
    description: 'Nextcloud, CRM, Kommunikation & Workflows aus einer Hand – sofort produktionsbereit.',
    icon: 'dns',
  },
  {
    title: 'AI-Optimierung',
    description: 'Kontinuierliche Verbesserung durch intelligente Workflows, Automationen und KPI-Dashboards.',
    icon: 'auto_awesome',
  },
  {
    title: 'Langzeit-Betreuung',
    description: 'Updates, Sicherheit, neue Features und Support – wir entwickeln Ihre Systeme dauerhaft weiter.',
    icon: 'support_agent',
  },
]

export const testphaseBanner = {
  headline: '3 Monate testen – volle Infrastruktur, planbare Kosten',
  description:
    'Wir liefern eine komplette Arbeitsumgebung, begleiten Ihr Team durch die Pilotphase und geben klare Entscheidungsgrundlagen für den anschließenden Rollout.',
  inclusions: [
    'Nextcloud Business Setup (Dateien, Kommunikation, Freigaben)',
    'CRM-Konfiguration (Odoo oder alternative Open-Source-Stacks)',
    'AI-Workflows für Dokumente, Prozesse & Automationen',
    'Backup-, Security- & Monitoring-Framework',
    'Trainings & Onboarding für alle Rollen',
    'Begleitender Support und KPI-Reviews',
  ],
  pricingHeadline: 'Transparente Testphase',
  pricingDetails:
    '3 Monate: €189/Monat (Server & Betrieb) · Danach: €489/Monat Vollservice oder €149/Monat Infrastruktur only',
  primaryCta: 'Testphase jetzt starten',
  secondaryCta: 'Mehr Details anzeigen',
} as const

export const whyVaeHighlights = [
  {
    title: 'Architektur mit Ownership',
    description:
      'Wir liefern Dokumentation, Runbooks und Schulungen direkt mit – Ihr Team bleibt souverän und kann jederzeit selbst entscheiden.',
    proof: 'Lieferobjekte ab Tag eins dokumentiert',
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
  title: 'Jetzt Richtung produktive KI-Infrastruktur starten',
  description:
    'Wir vereinbaren ein 30-minütiges Strategiegespräch, bewerten Ihre Ausgangslage und skizzieren die Testphase. Auf Wunsch erhalten Sie im Anschluss ein schriftliches Pilotangebot.',
  primary: { label: '30-Min Strategiegespräch', to: '/kontakt' },
  secondary: { label: 'E-Mail schreiben', to: 'mailto:juliandini@vae-systems.com' },
} as const

export const homeProcessHeading = 'In drei Schritten zur produktiven Ownership'

export const homeProcessDescription =
  'Struktur statt Zufall: definierte Artefakte pro Phase, klar kommunizierte Verantwortlichkeiten. Den vollständigen Ablauf zeigen wir in der Detailübersicht auf der Über-uns-Seite.'

export const homeProcessNote =
  'Weitere Phasen vertiefen Monitoring, AI-Ausbau und Skalierung. Fokus bleibt: frühe Nutzbarkeit & interne Ownership.'
