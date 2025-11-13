export interface Principle {
  title: string
  bullets: string[]
}

export interface RoleOpening {
  title: string
  highlights: string[]
}

export const CAREER_HERO = {
  title: 'Freelance Netzwerk für VAE Systems',
  subheading: 'Aktuell keine Festanstellungen – wir erweitern unser Pool aus Senior-Freelancern.',
  body: 'Wir arbeiten bewusst schlank und projektbasiert — wer zu VAE Systems stößt, übernimmt Verantwortung auf Augenhöhe. — Derzeit suchen wir gezielt freischaffende Entwickler:innen, DevOps-Engineers und UX-Designer:innen, die Open Source ernst nehmen und Ownership leben. — Wenn du dich angesprochen fühlst: info@vae.systems genügt, wir antworten persönlich.',
  seoKeywords: ['Freelance Developer', 'DevOps Projektarbeit', 'UX Designer Remote', 'Open-Source Netzwerk'],
}

export const PRINCIPLES: Principle[] = [
  {
    title: 'Qualität vor Schnelligkeit',
    bullets: ['Code muss wartbar sein, nicht nur schnell geschrieben.', 'Architektur ist nicht optional.'],
  },
  {
    title: 'Open Source ist mehr als ein Skill',
    bullets: [
      'Du verstehst, warum freie Software wichtig ist.',
      'Du hast selbst Open-Source-Projekte gebaut (oder willst es).',
    ],
  },
  {
    title: 'Selbstständiges Denken',
    bullets: ['Wir sagen nicht “mach das so”.', 'Wir sagen: “Hier ist das Problem — wie würdest du es lösen?”'],
  },
  {
    title: 'Langfristiges Denken',
    bullets: [
      'Nicht: “Wie kriege ich möglichst viel Geld?”',
      'Sondern: “Mit welchen Systemen will ich in 5 Jahren arbeiten?”',
    ],
  },
]

export const OPEN_ROLES: RoleOpening[] = [
  {
    title: 'Freelance Backend / Platform Engineer',
    highlights: [
      'Rust, Python oder TypeScript im Griff',
      'Dokumentierte Open-Source-Beiträge',
      'Architektur + Hands-on Delivery',
    ],
  },
  {
    title: 'DevOps & Selfhosting Specialist',
    highlights: ['Kubernetes, Docker, IaC', 'Monitoring & Incident-Readiness', 'Security & Compliance im EU-Kontext'],
  },
  {
    title: 'UX / Service Design (Freischaffend)',
    highlights: [
      'Research → Flows → Handoff',
      'System- & Tool-Denken statt Screenshots',
      'Workshops & Stakeholder-Moderation',
    ],
  },
]

export const NETWORK_CTA = {
  question: 'Passt du in dieses Netzwerk?',
  copy: 'Keine offenen Stellen, aber laufend Projekte. Wir sprechen mit Freelancern, die Verantwortung übernehmen, sauber dokumentieren und Kund:innen ehrlich beraten. Schreib uns mit Profil oder Referenzen – wir melden uns, sobald ein Match entsteht.',
  buttons: [
    {
      label: 'Profil senden',
      href: 'mailto:info@vae.systems?subject=Freelance%20Netzwerk%20VAE',
    },
    {
      label: 'Partnernetzwerk',
      href: '/contact?intent=partner-network',
    },
  ],
  note: 'Direkter Kontakt: info@vae.systems – jede Nachricht landet bei den Gründern.',
}
