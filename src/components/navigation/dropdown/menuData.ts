export interface MenuItem {
  id: string
  label: string
  icon?: string
  href: string
}

export interface MenuContent {
  id: string
  title: string
  description?: string
  items?: string[]
  ctaText: string
  ctaHref: string
}

export interface DropdownMenu {
  id: string
  label: string
  subtitle?: string
  menuItems: MenuItem[]
  content: Record<string, MenuContent>
}

export const MENU_DATA: DropdownMenu[] = [
  {
    id: 'leistungen',
    label: 'Unsere Leistungen',
    subtitle: 'Professional Services',
    menuItems: [
      { id: 'strategy', label: 'Strategieberatung', href: '/leistungen/strategie' },
      { id: 'infrastructure', label: 'Infrastruktur Design/Setup', href: '/leistungen/infrastruktur' },
      { id: 'betreuung', label: 'Langfristige Betreuung', href: '/leistungen/betreuung' },
    ],
    content: {
      strategy: {
        id: 'STRATEGY & TRANSFORMATION',
        title: 'Strategieberatung',
        description:
          'Strategische Beratung für KI-Adoption und digitale Transformation – fundierte Analyse, klare Roadmaps, messbare Ergebnisse.',
        items: ['Strategieberichte', 'KI-Strategie', 'Digitalisierungsroadmaps', 'Prozessoptimierung'],
        ctaText: 'Mehr erfahren',
        ctaHref: '/leistungen/strategie',
      },
      infrastructure: {
        id: 'INFRASTRUCTURE',
        title: 'Infrastruktur Design/Setup',
        description:
          'KI-optimierte, produktionsreife Open-Source-Systeme – vollständig konfiguriert, dokumentiert und unter Ihrer Kontrolle.',
        items: [
          'CRM-Systeme',
          'HR-Systeme',
          'Projektmanagement',
          'Kommunikation',
          'Dokumentenmanagement',
          'Business Intelligence',
          '…und mehr',
        ],
        ctaText: 'Mehr erfahren',
        ctaHref: '/leistungen/infrastruktur',
      },
      betreuung: {
        id: 'MANAGED OPERATIONS',
        title: 'Langfristige Betreuung',
        description:
          'Wir übernehmen Betrieb, Monitoring und Weiterentwicklung Ihrer Systeme – Sie konzentrieren sich auf Ihr Kerngeschäft.',
        items: ['Wartung & Updates', 'Support & Troubleshooting', 'Skalierung & Optimierung', 'Schulungen'],
        ctaText: 'Mehr erfahren',
        ctaHref: '/leistungen/betreuung',
      },
    },
  },
  {
    id: 'ressourcen',
    label: 'Ressourcen',
    subtitle: 'Wissenswertes & Insights',
    menuItems: [
      { id: 'blog', label: 'Blog', href: '/ressourcen/blog' },
      { id: 'cases', label: 'Case Studies', href: '/ressourcen/case-studies' },
      { id: 'faq', label: 'FAQ', href: '/ressourcen/faq' },
    ],
    content: {
      blog: {
        id: 'BLOG',
        title: 'Einblicke & Trends',
        description:
          'KI-Trends, Open-Source-Best-Practices und Digitalisierung – praxisnah erklärt auf unserer Dokumentationsplattform.',
        ctaText: 'Alle Beiträge ansehen',
        ctaHref: '/ressourcen/blog',
      },
      cases: {
        id: 'CASE STUDIES',
        title: 'Praxisbeispiele & Projekte',
        description:
          'Konkrete Umsetzungen aus Non-Profit, Beratung und Kreativwirtschaft – von CRM bis Website-Rebuild.',
        items: [
          'Lukas Sosnowski Consulting — Finance Automation & CRM Migration',
          'Non-Profit CRM — Mitgliederverwaltung & Automatisierung für Aktiv Kollektiv e.V.',
          'Art Affair Regensburg — KI-optimiertes QR-Code-Lead-System',
        ],
        ctaText: 'Alle Cases ansehen',
        ctaHref: '/ressourcen/case-studies',
      },
      faq: {
        id: 'FAQ',
        title: 'Häufig gestellte Fragen',
        description: 'Antworten zu Kosten, Projektabläufen, Open Source und unserer Arbeitsweise.',
        items: [
          'Was kostet eine Beratung?',
          'Wie lange dauert ein Projekt?',
          'Arbeiten Sie remote?',
          'Welche Branchen bedienen Sie?',
          'Was bedeutet "Open Source First"?',
        ],
        ctaText: 'Alle FAQs ansehen',
        ctaHref: '/ressourcen/faq',
      },
    },
  },
  {
    id: 'ueber-uns',
    label: 'Über uns',
    subtitle: 'Team & Philosophie',
    menuItems: [
      { id: 'werte', label: 'Werte', href: '/ueber-uns/werte' },
      { id: 'team', label: 'Team & Netzwerk', href: '/ueber-uns/team' },
      { id: 'leitung', label: 'Leitung', href: '/ueber-uns/leitung' },
      { id: 'kontakt', label: 'Kontakt', href: '/contact' },
    ],
    content: {
      werte: {
        id: 'WERTE',
        title: 'Philosophie & Prinzipien',
        description: 'Transparenz, Ownership und nachhaltige Lösungen – die Werte, die unsere Arbeit prägen.',
        items: [
          'Transparenz — Open Source First',
          'Ownership — Eigenverantwortung',
          'Qualität vor Quantität',
          'Zukunftsfähigkeit — Nachhaltige Lösungen',
          'Kundenfokus — Individuelle Beratung',
        ],
        ctaText: 'Mehr erfahren',
        ctaHref: '/ueber-uns/werte',
      },
      team: {
        id: 'TEAM',
        title: 'Unser Netzwerk',
        description: 'Freelancer und Partner – kuratierte Expertise für Ihr Projekt.',
        items: ['Marketing & Sales', 'Software Development', 'Spezialisierte Expertise', 'Flexibles Netzwerk'],
        ctaText: 'Netzwerk kennenlernen',
        ctaHref: '/ueber-uns/team',
      },
      leitung: {
        id: 'LEITUNG',
        title: 'Die Köpfe hinter VAE',
        description: 'Julian Goertz Dini (CEO) & Jakob Dünnebeil (CTO) – Strategie trifft technische Präzision.',
        ctaText: 'Mehr erfahren',
        ctaHref: '/ueber-uns/leitung',
      },
      kontakt: {
        id: 'KONTAKT',
        title: 'Direkter Draht zu VAE',
        description: 'Vom ersten Kennenlernen bis zu technischen Deep-Dives – wir sind für Sie da.',
        items: ['E-Mail & Kontaktformular', 'Erstgespräch (30 Minuten)', 'Technische Deep-Dives', 'Workshops & Audits'],
        ctaText: 'Kontakt aufnehmen',
        ctaHref: '/contact',
      },
    },
  },
]
