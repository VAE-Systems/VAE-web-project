export const heroTitle = [
  'Lokale KI-Infrastruktur',
  'für deutsche Unternehmen.'
] as const

export const heroTypewriterTexts = [
  '100% Open Source',
  'DSGVO-konform',
  'Maximale Kontrolle',
  'Enterprise-Grade Security'
] as const

export interface HeroDescription {
  before: string
  highlight: string
  after: string
}

export const heroDescription: HeroDescription = {
  before:
    'Individuelle KI-Automatisierungssysteme für Unternehmen, die ihre digitale Infrastruktur selbst besitzen wollen. Lokales Hosting, Open-Source-KI und semantische Arbeitsräume mit ',
  highlight: 'VAE Core',
  after: '.'
}

export const homeOutcomesHeading =
  'Messbarer Nutzen. Erweiterbare Architektur. Kontrollierte KI.'

export interface LinkText {
  before: string
  after: string
}

export const homeOutcomesDescription: LinkText = {
  before:
    'Drei frühe Effekte, die Kunden sehen – ohne proprietären Lock‑In oder späteren Rebuild. Tiefer erklärbar auf der ',
  after: ' Seite.'
}

export const homeProcessHeading =
  'Von erster Einordnung zu belastbarem Betrieb'

export const homeProcessDescription =
  'Struktur statt Zufall: definierte Artefakte je Schritt – vollständig einsehbar und transferierbar. Voller Ablauf auf Über Uns.'

export const homeProcessNote =
  'Spätere Schritte vertiefen Betrieb (Monitoring / Evaluierung / Erweiterung). Fokus bleibt: frühe Nutzbarkeit & interne Ownership.'
