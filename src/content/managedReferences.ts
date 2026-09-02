/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  MANAGED REFERENCES                                                       ┃
 * ┃  Betreute Websites & Hosting-Projekte für die Referenz-Leiste.            ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * SPIELREGELN
 * ├── Logos NUR mit dokumentierter Freigabe (consent.logoUsage + source).
 * ├── Einträge ohne namingAllowed werden nicht gerendert (Guard in Section).
 * ├── Eigenbezug (eigene Projekte / Vereinsämter) IMMER via disclosure offenlegen.
 * └── Kein „Partner"-Wording ohne vertragliche Grundlage.
 */

export type ReferenceRelation =
  | 'kunde' // zahlender Kunde
  | 'betreutes-projekt' // Hosting/Betrieb durch VAE
  | 'sponsoring' // pro bono / gesponsert
  | 'eigenes-projekt' // Eigenbezug → Offenlegung Pflicht

export type ReferenceService = 'hosting' | 'betrieb' | 'entwicklung' | 'beratung' | 'ki'

export interface ManagedReference {
  id: string
  name: string
  url?: string
  /** Lokaler Pfad unter /public/logos/managed/ — nie von fremden Websites kopieren. */
  logo?: string
  relation: ReferenceRelation
  services: ReferenceService[]
  since?: string
  consent: {
    logoUsage: boolean
    namingAllowed: boolean
    /** Wo ist die Freigabe dokumentiert? (Mail vom …, Vertrag § …) */
    source?: string
  }
  /** Offenlegung bei Eigenbezug, z. B. Vereinsamt oder eigenes Unternehmen. */
  disclosure?: string
}

export const relationLabels: Record<ReferenceRelation, string> = {
  kunde: 'Kunde',
  'betreutes-projekt': 'Betreutes Projekt',
  sponsoring: 'Sponsoring',
  'eigenes-projekt': 'Eigenes Projekt',
}

export const managedReferencesContent = {
  eyebrow: 'Betrieb & Hosting in der Praxis',
  heading: 'Ausgewählte betreute Websites',
  description:
    'Websites und Systeme, die wir hosten, warten und technisch verantworten – mit Monitoring, Updates und Sicherheit im laufenden Betrieb.',
} as const

export const managedReferences: ManagedReference[] = [
  {
    id: 'lukas-sosnowski',
    name: 'Lukas Sosnowski Consulting',
    url: 'https://lukas-sosnowski.de',
    relation: 'kunde',
    services: ['hosting', 'betrieb', 'entwicklung'],
    since: '2025',
    consent: { logoUsage: false, namingAllowed: true },
  },
  {
    id: 'malermeister-gronewold',
    name: 'Malermeister Bernd Gronewold',
    url: 'https://malermeisterberndgronewold.de',
    relation: 'betreutes-projekt',
    services: ['hosting', 'betrieb'],
    consent: { logoUsage: false, namingAllowed: true },
  },
  {
    id: 'kultur-fuer-europa',
    name: 'Kultur für Europa e.V.',
    url: 'https://kulturfuereuropa.eu',
    relation: 'betreutes-projekt',
    services: ['hosting', 'betrieb'],
    consent: { logoUsage: false, namingAllowed: true },
    disclosure: 'VAE-Mitgründer Julian Goertz ist ehrenamtlich im erweiterten Vorstand aktiv.',
  },
  {
    id: 'aktiv-kollektiv',
    name: 'Aktiv Kollektiv e.V.',
    url: 'https://aktiv-kollektiv.de',
    relation: 'betreutes-projekt',
    services: ['hosting', 'betrieb', 'entwicklung'],
    since: '2025',
    consent: { logoUsage: false, namingAllowed: true },
    disclosure: 'VAE-Mitgründer Julian Goertz ist Vorstand des Vereins.',
  },
  {
    id: 'aion-projects',
    name: 'AION Projects',
    url: 'https://aion-projects.de',
    relation: 'eigenes-projekt',
    services: ['hosting', 'betrieb'],
    consent: { logoUsage: false, namingAllowed: true },
    disclosure: 'AION Projects ist das Unternehmen von VAE-Mitgründer Julian Goertz.',
  },
] as const
