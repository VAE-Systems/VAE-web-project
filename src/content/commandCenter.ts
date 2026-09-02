export type CommandCenterGroup =
  | 'Leistungen'
  | 'Hosting'
  | 'Wissen'
  | 'Referenzen'
  | 'Kontakt'
  | 'Rechtliches'

export interface CommandCenterItem {
  title: string
  description: string
  href: string
  group: CommandCenterGroup
  keywords: string[]
  badge?: string
}

export const commandCenterItems: CommandCenterItem[] = [
  {
    title: 'KI-Strategieberatung',
    description: 'Roadmaps, Prozessanalyse und konkrete KI-Einsatzfelder für Ihr Unternehmen.',
    href: '/leistungen/strategie',
    group: 'Leistungen',
    badge: 'Beratung',
    keywords: ['ki', 'strategie', 'beratung', 'roadmap', 'transformation', 'workshop'],
  },
  {
    title: 'Infrastruktur Design & Setup',
    description: 'Self-hosted Systeme, CRM, Nextcloud, Automationen und Dokumentation.',
    href: '/leistungen/infrastruktur',
    group: 'Leistungen',
    badge: 'Setup',
    keywords: ['infrastruktur', 'setup', 'nextcloud', 'crm', 'automation', 'self-hosting'],
  },
  {
    title: 'Langfristige Betreuung',
    description: 'Monitoring, Updates, Security, Support und kontinuierliche Optimierung.',
    href: '/leistungen/betreuung',
    group: 'Leistungen',
    badge: 'Betrieb',
    keywords: ['betreuung', 'wartung', 'support', 'monitoring', 'security', 'updates'],
  },
  {
    title: 'Betreutes Website-Hosting',
    description: 'Hosting, Wartung, Sicherheit und Performance für Websites und Websysteme.',
    href: '/#betrieb-hosting',
    group: 'Hosting',
    badge: 'Neu',
    keywords: ['hosting', 'website', 'betrieb', 'wartung', 'server', 'domain', 'performance'],
  },
  {
    title: 'Digitale Souveränität',
    description: 'Das VAE-Modell für mehr Kontrolle über Daten, Systeme und KI.',
    href: '/#souveraenitaet',
    group: 'Wissen',
    keywords: ['souveränität', 'souveraenitaet', 'datenhoheit', 'unabhängigkeit', 'cloud', 'nextcloud'],
  },
  {
    title: 'Referenzen & Case Studies',
    description: 'Ausgewählte Projekte, Ergebnisse und betreute Systeme.',
    href: '/ressourcen/case-studies',
    group: 'Referenzen',
    keywords: ['referenzen', 'cases', 'case studies', 'kunden', 'projekte'],
  },
  {
    title: 'FAQ',
    description: 'Antworten zu Kosten, Ablauf, Self-Hosting, Open Source und Zusammenarbeit.',
    href: '/ressourcen/faq',
    group: 'Wissen',
    keywords: ['faq', 'fragen', 'kosten', 'ablauf', 'self-hosting'],
  },
  {
    title: 'Blog',
    description: 'Einblicke zu KI, Infrastruktur, Self-Hosting und digitaler Souveränität.',
    href: '/ressourcen/blog',
    group: 'Wissen',
    keywords: ['blog', 'artikel', 'insights', 'wissen', 'trends'],
  },
  {
    title: 'Erstgespräch buchen',
    description: 'Kostenloser Termin zur Einordnung Ihrer Situation und nächsten Schritte.',
    href: '/contact#booking',
    group: 'Kontakt',
    badge: '45 Min',
    keywords: ['kontakt', 'termin', 'beratung', 'call', 'erstgespräch', 'buchen'],
  },
  {
    title: 'Kontakt aufnehmen',
    description: 'Formular, E-Mail und direkte Anfrage an VAE Systems.',
    href: '/contact',
    group: 'Kontakt',
    keywords: ['kontakt', 'email', 'formular', 'anfrage', 'projekt'],
  },
  {
    title: 'Über VAE',
    description: 'Werte, Leitung und Arbeitsweise von VAE Systems.',
    href: '/ueber-uns/werte',
    group: 'Wissen',
    keywords: ['über uns', 'werte', 'team', 'leitung', 'vae'],
  },
  {
    title: 'Impressum',
    description: 'Rechtliche Angaben zur VAE Systems UG.',
    href: '/impressum',
    group: 'Rechtliches',
    keywords: ['impressum', 'rechtlich', 'anbieterkennzeichnung'],
  },
  {
    title: 'Datenschutz',
    description: 'Informationen zu Datenschutz, Cookies und Privatsphäre.',
    href: '/privacy',
    group: 'Rechtliches',
    keywords: ['datenschutz', 'privacy', 'cookies', 'dsgvo'],
  },
]
