/**
 * Blog Categories Configuration
 *
 * Defines the structure for the Blog mega menu
 * Each category represents a section of the blog system
 */

export interface BlogCategory {
  key: string
  title: string
  tagline: string
  description: string
  points: string[]
  cta: string
  badge?: string
  comingSoon?: boolean
}

export const blogCategories: BlogCategory[] = [
  {
    key: 'blog',
    title: 'VAE Blog',
    tagline: 'Technische Einblicke',
    description: 'Tiefgehende Artikel zu KI, Automation und Systemarchitekturen. Erfahrungen aus der Praxis und technische Lösungsansätze.',
    points: [
      'KI-Implementierungen',
      'Systemarchitekturen',
      'Best Practices',
      'Fallstudien'
    ],
    cta: 'Artikel lesen',
    badge: 'Live'
  },
  {
    key: 'aktuelles',
    title: 'Aktuelles',
    tagline: 'News & Updates',
    description: 'Neueste Entwicklungen, Produkt-Updates und Unternehmensnachrichten. Bleiben Sie auf dem Laufenden.',
    points: [
      'Produkt-Updates',
      'Unternehmensnews',
      'Veranstaltungen',
      'Pressemitteilungen'
    ],
    cta: 'News lesen',
    badge: 'Live'
  },
  {
    key: 'media',
    title: 'Media Hub',
    tagline: 'Videos & Podcasts',
    description: 'Video-Tutorials, Podcast-Episoden und Multimedia-Inhalte zu unseren Technologien und Dienstleistungen.',
    points: [
      'Video-Tutorials',
      'Podcast-Serien',
      'Live-Demos',
      'Webinare'
    ],
    cta: 'Ansehen',
    comingSoon: true
  },
  {
    key: 'kurse',
    title: 'Kurse & Tipps',
    tagline: 'Lernen & Weiterbildung',
    description: 'Praktische Kurse, Tutorials und Tipps für KI-Entwicklung, Systemadministration und Automatisierung.',
    points: [
      'KI-Grundlagen',
      'System-Setup',
      'Best Practices',
      'Troubleshooting'
    ],
    cta: 'Kurse starten',
    comingSoon: true
  }
]
