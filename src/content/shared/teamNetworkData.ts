/**
 * Team & Netzwerk Daten
 * Kooperationspartner und projektbasierte Unterstützung
 */

export interface PartnerProfile {
  id: string
  name: string
  title: string
  showTitle?: boolean
  roleTag: string
  background: string
  characterTraits: string[]
  expertise: string[]
  location: string
  isPlaceholder?: boolean
  portrait: {
    src: string
    fallback?: string
    alt: string
  }
  linkedin?: {
    text: string
    href: string
  }
  email?: string
  badge?: string // z.B. "Freelancerin", "Partner"
  seoKeywords?: string[]
}

export const TEAM_NETWORK_HERO = {
  title: 'Team & Netzwerk',
  subheading: 'Sie zahlen nur für die Expertise, die Sie brauchen',
  body: 'VAE Systems arbeitet mit einem Netzwerk aus Spezialist:innen statt mit festem Team. — Für jedes Projekt holen wir die richtigen Leute dazu – gezielt, bedarfsbasiert. — Das spart Kosten, weil wir keine festen Teams mitfinanzieren müssen. — Sie bekommen exakt die Expertise, die Sie brauchen. Nicht mehr, nicht weniger.',
  seoKeywords: ['Team', 'Netzwerk', 'Bedarfsbasiert', 'Spezialist:innen'],
}

export const PARTNERS: PartnerProfile[] = [
  {
    id: 'alma-mira-andrassy',
    name: 'Alma Míra Andrássy',
    title: 'Sales & Kundenkontakt',
    showTitle: false,
    roleTag: 'SALES | KUNDENKONTAKT | CONTENT',
    background:
      'Alma ist Ihre erste Ansprechpartnerin für Anfragen und Beratung. Sie klärt Fragen zu unseren Leistungen und begleitet Sie bei der Zusammenarbeit.',
    characterTraits: [],
    expertise: ['Kundenkommunikation', 'Vertrieb', 'Content & LinkedIn'],
    location: 'Rhein-Neckar',
    portrait: {
      src: '/images/optimized/Alma-Portrait-Team - weiß.webp',
      fallback: '/images/optimized/Alma-Portrait-Team - weiß.png',
      alt: 'Alma Míra Andrássy – Vertrieb & Kundenkontakt für VAE Systems',
    },
    linkedin: {
      text: 'LinkedIn-Profil von Alma Míra Andrássy',
      href: 'https://www.linkedin.com/in/alma-m%C3%ADra-andr%C3%A1ssy-b73940395/',
    },
    badge: 'Sales & Kundenkontakt',
    seoKeywords: [],
  },
  {
    id: 'tolga-bippus',
    name: 'Tolga Bippus',
    title: 'UX/UI Design',
    showTitle: false,
    roleTag: 'UX/UI DESIGN | REAKTIVE OBERFLÄCHEN | PROTOTYPING',
    background:
      'Tolga unterstützt bei UX/UI-Gestaltung und reaktivem Visual Design für VAE-Projekte – mit Erfahrung aus der Veranstaltungsbranche für Live-Visuals.',
    characterTraits: ['Reaktive Oberflächen', 'Visuelle Konzepte', 'Hands-on Mentalität'],
    expertise: ['UX/UI Design', 'Reaktive Oberflächen', 'Prototyping'],
    location: 'Rhein-Neckar',
    portrait: {
      src: '/images/optimized/Tolga-Bippus-mitSchatten.webp',
      fallback: '/images/optimized/Tolga-Bippus-mitSchatten.png',
      alt: 'Tolga Bippus – UX/UI Design bei VAE Systems',
    },
    linkedin: {
      text: 'LinkedIn-Profil von Tolga Bippus',
      href: 'https://www.linkedin.com/in/tolga-bippus-702823284/',
    },
    badge: 'Design',
    seoKeywords: ['UX/UI', 'Design', 'Prototyping', 'Oberflächen'],
  },
]

export const NETWORK_CTA = {
  heading: 'Gemeinsam verstärken?',
  copy: 'Wir suchen Spezialist:innen, die unser Team projektweise ergänzen oder langfristig mitgestalten. — VAE Systems bietet eigenverantwortliches Arbeiten, transparente Kommunikation und Projekte mit Wirkung.',
  button: {
    label: 'Partner werden',
    href: '/karriere',
  },
}
