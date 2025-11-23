/**
 * Zentrale Konfiguration für Nextcloud-Buchungslinks
 *
 * Diese URLs verweisen auf die Nextcloud Calendar Appointment-Seiten.
 * Bei Änderungen der Buchungs-URLs müssen nur diese Konstanten angepasst werden.
 *
 * @see https://nc.intern.vae.systems/apps/calendar
 */

export const BOOKING_LINKS = {
  /**
   * Kostenlose Erstberatung (30-45 Min)
   * Universeller Einstieg für neue Interessenten
   */
  ERSTBERATUNG: 'https://nc.intern.vae.systems/apps/calendar/appointment/RgxJERqNkfZz',

  /**
   * Infrastruktur-Audit (45-60 Min)
   * Self-Hosting, Cloud-Migration & Security-Check
   */
  INFRASTRUKTUR_AUDIT: 'https://nc.intern.vae.systems/apps/calendar/appointment/cpiHpQ5RJd6N',

  /**
   * Strategic Advisory (60-90 Min)
   * Architektur- & KI-Roadmap für Führungskräfte
   */
  STRATEGIC_ADVISORY: 'https://nc.intern.vae.systems/apps/calendar/appointment/6QmyBXLpqPLk',

  /**
   * Retainer-Planung (45-60 Min)
   * Langfristige Begleitung & Sparring
   */
  RETAINER_PLANUNG: 'https://nc.intern.vae.systems/apps/calendar/appointment/KePbGbpqEF7n',

  /**
   * Partnership & Netzwerk (30-45 Min)
   * Co-Delivery & Agentur-Kooperationen
   */
  PARTNERSHIP: 'https://nc.intern.vae.systems/apps/calendar/appointment/fkYPGJC7342e',

  /**
   * Workshop-Anfrage (30-60 Min)
   * Team-Training & Knowledge-Transfer
   */
  WORKSHOP: 'https://nc.intern.vae.systems/apps/calendar/appointment/2QmT7T3y5MpT',
} as const

/**
 * Termin-Typen mit Metadaten für die Booking-Section auf /contact#booking
 */
export interface BookingOption {
  id: string
  title: string
  duration: string
  description: string
  badge?: string
  icon: string
  bookingUrl: string
}

export const BOOKING_OPTIONS: BookingOption[] = [
  {
    id: 'erstberatung',
    title: 'Kostenlose Erstberatung',
    duration: '30-45 Min',
    description: 'Kennenlernen ohne Verpflichtung. Wir besprechen Ihre Situation und klären erste Fragen.',
    badge: 'UNIVERSELL',
    icon: 'MessageCircle',
    bookingUrl: BOOKING_LINKS.ERSTBERATUNG,
  },
  {
    id: 'strategic-advisory',
    title: 'Strategic Advisory',
    duration: '60-90 Min',
    description: 'Deep-Dive in Ihre KI- & Digitalisierungsstrategie. Architektur-Roadmap für Führungskräfte.',
    badge: 'STRATEGIE',
    icon: 'Compass',
    bookingUrl: BOOKING_LINKS.STRATEGIC_ADVISORY,
  },
  {
    id: 'infrastruktur-audit',
    title: 'Infrastruktur-Audit',
    duration: '45-60 Min',
    description: 'Self-Hosting, Cloud-Migration & Security-Check. Anforderungen für Ihr Setup klären.',
    badge: 'SETUP',
    icon: 'Server',
    bookingUrl: BOOKING_LINKS.INFRASTRUKTUR_AUDIT,
  },
  {
    id: 'retainer-planung',
    title: 'Retainer-Planung',
    duration: '45-60 Min',
    description: 'Langfristige Begleitung & Sparring. Service-Level-Optionen und SLAs besprechen.',
    badge: 'BETREUUNG',
    icon: 'Shield',
    bookingUrl: BOOKING_LINKS.RETAINER_PLANUNG,
  },
  {
    id: 'partnership',
    title: 'Partnership & Netzwerk',
    duration: '30-45 Min',
    description: 'Co-Delivery & Agentur-Kooperationen. Zusammenarbeit und Netzwerk-Möglichkeiten.',
    badge: 'KOOPERATION',
    icon: 'Handshake',
    bookingUrl: BOOKING_LINKS.PARTNERSHIP,
  },
  {
    id: 'workshop',
    title: 'Workshop-Anfrage',
    duration: '30-60 Min',
    description: 'Team-Training & Knowledge-Transfer. Workshops und Schulungen planen.',
    badge: 'TRAINING',
    icon: 'GraduationCap',
    bookingUrl: BOOKING_LINKS.WORKSHOP,
  },
]

/**
 * Fallback auf /contact#booking für generische Termin-Links
 * (z.B. wenn noch nicht klar ist, welcher spezifische Typ benötigt wird)
 */
export const BOOKING_PAGE_FALLBACK = '/contact#booking'
