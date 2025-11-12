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
    label: 'UNSERE LEISTUNGEN',
    subtitle: 'Professional Services',
    menuItems: [
      { id: 'strategy', label: 'Strategieberatung', href: '/leistungen/strategie' },
      { id: 'infrastructure', label: 'Infrastruktur-Setup', href: '/leistungen/infrastruktur' },
      { id: 'betreuung', label: 'Langfristige Betreuung', href: '/leistungen/betreuung' },
    ],
    content: {
      strategy: {
        id: 'strategy',
        title: 'Strategieberatung',
        description: 'Portfolio an Outcomes:',
        items: ['Strategieberichte', 'KI-Strategie', 'Digitalisierungsroadmaps', 'Prozessoptimierung'],
        ctaText: 'Mehr erfahren →',
        ctaHref: '/leistungen/strategie',
      },
      infrastructure: {
        id: 'infrastructure',
        title: 'Infrastruktur-Setup',
        description: 'AI-Ready / KI-Optimiert. Langfristig funktionierend.',
        items: [
          'CRM-Systeme (ERPNext, Odoo, Salesforce OSS)',
          'HR-Systeme (OrangeHRM, Humhub)',
          'Projektmanagement (Taiga, OpenProject)',
          'Kommunikation (Mattermost, Rocket.Chat)',
          'Dokumentenmanagement (Nextcloud, OnlyOffice)',
          'Business Intelligence (Metabase, Apache Superset)',
        ],
        ctaText: 'Mehr erfahren →',
        ctaHref: '/leistungen/infrastruktur',
      },
      betreuung: {
        id: 'betreuung',
        title: 'Langfristige Betreuung',
        description: 'Kontinuierliche Unterstützung für Ihre Systeme.',
        items: ['Wartung & Updates', 'Support & Troubleshooting', 'Skalierung & Optimierung', 'Schulungen'],
        ctaText: 'Mehr erfahren →',
        ctaHref: '/leistungen/betreuung',
      },
    },
  },
  {
    id: 'ressourcen',
    label: 'RESSOURCEN',
    subtitle: 'Wissenswertes & Insights',
    menuItems: [
      { id: 'cases', label: 'Case Studies', href: '/ressourcen/case-studies' },
      { id: 'techstack', label: 'Tech-Stack', href: '/ressourcen/tech-stack' },
      { id: 'blog', label: 'Blog', href: '/ressourcen/blog' },
      { id: 'faq', label: 'FAQ', href: '/ressourcen/faq' },
    ],
    content: {
      cases: {
        id: 'cases',
        title: 'Case Studies',
        items: [
          'Aktiv Kollektiv e.V. — Non-Profit CRM & Mitgliederverwaltung',
          'Joschka Ludwig Krause — Art Affair Regensburg Website Rebuild',
          'Lukas Sosnowski — Versicherungsberatung Open Source Infrastruktur',
        ],
        ctaText: 'Alle ansehen →',
        ctaHref: '/ressourcen/case-studies',
      },
      techstack: {
        id: 'techstack',
        title: 'Tech-Stack',
        description: 'Bereiche, die wir mit Open Source Lösungen abdecken:',
        items: [
          'CRM-Systeme (Customer Relationship Management)',
          'HR-Systeme (Human Resources)',
          'Projektmanagement-Tools',
          'Kommunikationsplattformen',
          'Dokumentenmanagement',
          'Business Intelligence & Analytics',
          'E-Commerce-Plattformen',
          'Content Management Systeme (CMS)',
          'ERP-Systeme (Enterprise Resource Planning)',
          'Ticketing & Support-Systeme',
          'Open Source Fokus — keine Vendor Lock-ins',
        ],
        ctaText: 'Mehr erfahren →',
        ctaHref: '/ressourcen/tech-stack',
      },
      blog: {
        id: 'blog',
        title: 'Blog',
        description: 'Neueste Insights von VAE Systems: KI-Trends, Open Source Best Practices, Digitalisierung',
        ctaText: 'Alle Posts ansehen →',
        ctaHref: '/ressourcen/blog',
      },
      faq: {
        id: 'faq',
        title: 'FAQ',
        description: 'Häufig gestellte Fragen',
        items: [
          'Was kostet eine Beratung?',
          'Wie lange dauert ein Projekt?',
          'Arbeitet ihr remote?',
          'Welche Branchen bedient ihr?',
          'Was bedeutet "Open Source First"?',
        ],
        ctaText: 'Alle FAQs ansehen →',
        ctaHref: '/ressourcen/faq',
      },
    },
  },
  {
    id: 'ueber-uns',
    label: 'ÜBER UNS',
    subtitle: 'Team & Philosophie',
    menuItems: [
      { id: 'werte', label: 'Werte', href: '/ueber-uns/werte' },
      { id: 'leitung', label: 'Leitung', href: '/ueber-uns/leitung' },
      { id: 'karriere', label: 'Karriere', href: '/ueber-uns/karriere' },
      { id: 'kontakt', label: 'Kontakt', href: '/contact' },
    ],
    content: {
      werte: {
        id: 'werte',
        title: 'Unsere Werte',
        items: [
          'Transparenz — Open Source First',
          'Ownership — Eigenverantwortung',
          'Qualität vor Quantität',
          'Zukunftsfähigkeit — Nachhaltige Lösungen',
          'Kundenfokus — Individuelle Beratung',
        ],
        ctaText: 'Mehr erfahren →',
        ctaHref: '/ueber-uns/werte',
      },
      leitung: {
        id: 'leitung',
        title: 'Leitung',
        description: 'Julian Goertz Dini (CEO) & Jakob Dünnebeil (CTO)',
        ctaText: 'Empfehlungen ansehen →',
        ctaHref: '/ueber-uns/leitung',
      },
      karriere: {
        id: 'karriere',
        title: 'Karriere',
        description:
          'Wir suchen flexible Experten für unser Netzwerk. Hohe Ansprüche an Softwarekenntnisse und Eigenverantwortung. Bewirb dich, wenn du Teil unseres Teams werden möchtest.',
        ctaText: 'Jetzt bewerben →',
        ctaHref: '/ueber-uns/karriere',
      },
      kontakt: {
        id: 'kontakt',
        title: 'Kontakt',
        description: 'Direkte Kommunikationswege zu VAE Systems.',
        items: ['E-Mail & Kontaktformular', 'Erstgespräch (30 Minuten)', 'Technische Deep-Dives', 'Workshops & Audits'],
        ctaText: 'Kontakt aufnehmen →',
        ctaHref: '/contact',
      },
    },
  },
]
