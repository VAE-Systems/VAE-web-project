/**
 * Team & Netzwerk Daten
 * Kooperationspartner, Freelancer und Netzwerk-Mitglieder
 */

export interface PartnerProfile {
  id: string
  name: string
  title: string
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
  subheading: 'Kuratierte Expertise auf Augenhöhe',
  body: 'VAE Systems ist kein klassisches Beratungshaus. Wir koordinieren ein Netzwerk aus erfahrenen Freelancern und Partnern, die wir für ihre fachliche Exzellenz und kulturelle Passung ausgewählt haben. — So garantieren wir Ihnen: Die besten Köpfe für Ihr Projekt, ohne Overhead.',
  seoKeywords: ['Freelancer Netzwerk', 'Tech-Partner', 'VAE Team', 'Rhein-Neckar'],
}

export const PARTNERS: PartnerProfile[] = [
  {
    id: 'alma-mira-andrassy',
    name: 'Alma Míra Andrássy',
    title: 'Marketing & Sales Advisor',
    roleTag: 'MARKTPOSITIONIERUNG | LEAD GENERATION | CONTENT-STRATEGIE | BUSINESS DEVELOPMENT',
    background:
      'Alma verantwortet bei VAE Systems die strategische Marktpositionierung und Lead Generation. Sie entwickelt Content-Strategien für LinkedIn und Website, baut Kundenbeziehungen auf und identifiziert B2B-Opportunities im Mittelstand.',
    characterTraits: ['Direkter Kundenkontakt', 'Strukturierte Prozesse', 'Messbare Ergebnisse'],
    expertise: [
      'Strategische Marktpositionierung',
      'Lead Generation & CRM',
      'Content-Strategie (LinkedIn, Website)',
      'Business Development B2B',
    ],
    location: 'Rhein-Neckar',
    portrait: {
      src: '/images/optimized/Alma-Portrait-Team-Final.webp',
      fallback: '/images/optimized/Alma-Portrait-Team-Final.png',
      alt: 'Alma Míra Andrássy – Marketing & Sales Advisor bei VAE Systems',
    },
    linkedin: {
      text: 'LinkedIn-Profil von Alma Míra Andrássy',
      href: 'https://www.linkedin.com/in/alma-m%C3%ADra-andr%C3%A1ssy-b73940395/',
    },
    badge: 'Marketing & Sales',
    seoKeywords: ['Marketing', 'Sales', 'Lead Generation', 'B2B'],
  },
  {
    id: 'tolga-bippus',
    name: 'Tolga Bippus',
    title: 'Freelancer – Software Development',
    roleTag: 'BACKEND | CLOUD | UX/UI SUPPORT | SYSTEM-INTEGRATION',
    background:
      'Tolga unterstützt VAE Systems bei Backend-Entwicklung, Cloud-Infrastruktur und UX/UI-Design. Als Werkstudent bei CGI bringt er Erfahrung mit skalierbaren Architekturen und modernen Entwicklungsprozessen mit.',
    characterTraits: ['Skalierbare Architekturen', 'Konzept bis Deployment', 'Hands-on Mentalität'],
    expertise: ['Backend-Entwicklung', 'Cloud Infrastructure', 'UX/UI Design-Support', 'System-Integration'],
    location: 'Rhein-Neckar',
    portrait: {
      src: '/images/team/avatar-placeholder.png',
      alt: 'Tolga Bippus – Freelancer für Software Development bei VAE Systems',
    },
    linkedin: {
      text: 'LinkedIn-Profil von Tolga Bippus',
      href: 'https://www.linkedin.com/in/tolga-bippus-702823284/',
    },
    badge: 'Freelancer',
    seoKeywords: ['Software Development', 'Backend', 'Cloud', 'Freelancer'],
  },
  {
    id: 'partner-placeholder',
    name: 'Weitere Partner folgen',
    title: 'Spezialist:in',
    roleTag: 'NETZWERK | EXPERTISE | ZUSAMMENARBEIT',
    background: 'Unser Netzwerk wächst kontinuierlich. Interesse an einer Zusammenarbeit?',
    characterTraits: ['Teamplayer gesucht'],
    expertise: ['Bereich offen'],
    location: 'Deutschlandweit',
    isPlaceholder: true,
    portrait: {
      src: '/images/team/avatar-placeholder.png',
      alt: 'Platzhalter für zukünftige Partner im VAE Systems Netzwerk',
    },
    badge: 'Demnächst',
  },
]

export const NETWORK_CTA = {
  heading: 'Teil unseres Netzwerks werden?',
  copy: 'Wir suchen kontinuierlich nach Spezialisten, die unser Team ergänzen – für Projekte, als Freelancer oder langfristige Partner. — VAE Systems bietet ein Umfeld für eigenverantwortliches Arbeiten, transparente Kommunikation und spannende Projekte.',
  button: {
    label: 'Partner werden',
    href: '/karriere',
  },
}
