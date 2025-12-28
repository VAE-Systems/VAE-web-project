import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import { prefersReducedMotion } from '@/utils/motion'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Brain,
  Briefcase,
  CalendarDays,
  ChevronDown,
  Cloud,
  Layers,
  QrCode,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from 'lucide-react'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import Seo from '../ui/Seo'
import MagneticButton from '../ui/buttons/MagneticButton'

const bookingRoute = '/contact#booking'

const REFERENZEN_BREADCRUMBS = [
  { label: 'Home', path: '/' },
  { label: 'Über uns' },
  { label: 'Referenzen & Case Studies' },
]

interface Metric {
  label: string
  description: string
}

interface ImplementationBlock {
  title: string
  items: string[]
}

interface TechBadge {
  name: string
  description: string
  docsUrl?: string
}

interface CaseStudy {
  id: string
  logo?: { src: string; alt: string; invertOnDark?: boolean; invertOnLight?: boolean; wide?: boolean }
  testimonialImage?: { src: string; alt: string; invertOnDark?: boolean; invertOnLight?: boolean; wide?: boolean }
  title: string
  organization: string
  industry: string
  status: string
  statusVariant: 'live' | 'planning' | 'internal'
  challenge: string
  solutionIntro: string
  implementation: ImplementationBlock[]
  results: Metric[]
  techStack: TechBadge[]
  role: string
  cta?: { label: string; href: string }
  externalLinks?: { label: string; href: string }[]
  note?: string
  icon: React.ElementType
}

// ProjectTeaser interface - reserved for future project teasers section
// interface ProjectTeaser {
//   id: string
//   icon: React.ElementType
//   title: string
//   description: string
//   status: string
// }

interface ExpertiseArea {
  id: string
  icon: React.ElementType
  title: string
  tools: string[]
}

const caseStudies: CaseStudy[] = [
  {
    id: 'lukas-sosnowski-consulting',
    icon: Briefcase,
    title: 'Finance Automation & CRM Migration',
    organization: 'Lukas Sosnowski Consulting',
    industry: 'Versicherungsberatung · Financial Services',
    status: 'Live seit 2025',
    statusVariant: 'live',
    challenge:
      'Lukas Sosnowski Consulting arbeitete mit Google Sheets für Kundendaten und manuelle Prozesse ohne CRM-Integration. Die Datenflut war unübersichtlich, Automatisierung fehlte komplett, und strategische KI-Integration war nicht möglich.',
    solutionIntro:
      'Wir haben eine CRM-Migration durchgeführt, Prozesse von Google Sheets auf Twenty CRM transferiert und eine strategische Beratung für KI-Controlling & Finance-Automation geliefert.',
    implementation: [
      {
        title: 'CRM Migration & Setup',
        items: [
          'Migration von Google Sheets zu Twenty CRM',
          'Kundendatenbank-Strukturierung & Kontaktmanagement',
          'Workflow-Automation für Versicherungsberatung',
          'Integration in bestehende Prozesse',
        ],
      },
      {
        title: 'KI-Strategie & Finance Automation',
        items: [
          'Strategische Beratung für AI Controlling',
          'Finance-Automation-Roadmap',
          'Prozessoptimierung durch KI-gestützte Datenanalyse',
          'Skalierbare Infrastruktur für zukünftige Automatisierungen',
        ],
      },
      {
        title: 'Ansprechpartner & Beratung',
        items: [
          'VAE als technischer Ansprechpartner für Infrastruktur',
          'Langfristige Beratung in CRM & KI-Strategie',
          'Einführung & Schulung für selbstständige Nutzung',
        ],
      },
    ],
    results: [
      { label: 'Daten-Konsolidierung', description: 'Kundendaten zentral im CRM statt fragmentiert in Sheets.' },
      {
        label: 'Effizienzgewinn',
        description: 'Automatisierte Workflows reduzieren manuelle Arbeit signifikant.',
      },
      {
        label: 'KI-Readiness',
        description: 'Strategische Grundlage für Finance-Automation & AI Controlling geschaffen.',
      },
    ],
    techStack: [
      { name: 'Twenty CRM', description: 'Open-Source CRM für Kundenverwaltung.', docsUrl: 'https://twenty.com/' },
      {
        name: 'Google Sheets API',
        description: 'Datenmigration aus Google Sheets.',
        docsUrl: 'https://developers.google.com/sheets/api',
      },
      {
        name: 'Docker',
        description: 'Container-basiertes Deployment.',
        docsUrl: 'https://www.docker.com/',
      },
      {
        name: 'PostgreSQL',
        description: 'Datenbank für CRM-Backend.',
        docsUrl: 'https://www.postgresql.org/',
      },
    ],
    role: 'VAE Systems übernahm CRM-Migration, strategische KI-Beratung und fungiert als technischer Ansprechpartner für Infrastruktur.',
    cta: { label: 'CRM-Migration anfragen', href: '/services/beratung' },
  },
  {
    id: 'aktiv-kollektiv',
    logo: { src: '/Kollektiv-Logo.svg', alt: 'Aktiv Kollektiv e.V. Logo', invertOnDark: true },
    icon: Users,
    title: 'Infrastruktur-Planung & technische Unterstützung',
    organization: 'Aktiv Kollektiv e.V.',
    industry: 'Non-Profit · Vereinsarbeit',
    status: 'Live seit 2025',
    statusVariant: 'live',
    challenge:
      'Aktiv Kollektiv e.V. arbeitet aktuell mit einer fragmentierten digitalen Landschaft — ohne zentrale Plattform, ohne strukturiertes Wissensmanagement, ohne skalierbare Kollaborations-Tools.',
    solutionIntro:
      'Julian Goertz (Vorstand bei Aktiv Kollektiv e.V.) und Jakob Dünnebeil (Mitglied) übernehmen die gesamte Planung der digitalen Infrastruktur des Vereins — mit Fokus auf Open Source, Self-Hosting und Skalierbarkeit.',
    implementation: [
      {
        title: 'Infrastruktur-Aufbau',
        items: [
          'Mitgliedermanagement-System für strukturierte Vereinsverwaltung',
          'Kollaborationsplattform als Fundament für Zusammenarbeit zwischen Gruppen innerhalb des Aktiv Kollektivs',
          'Note-Sharing, Wissensmanagement und zentrale Datenverwaltung',
          'Skalierbare Kommunikationsstrukturen für wachsende Teams',
        ],
      },
      {
        title: 'Aktueller Stand',
        items: [
          'Implementationsphase läuft — Teilimplementationen bereits abgeschlossen',
          'Erste Systeme produktiv im Einsatz (Kollaboration, Wissensmanagement)',
          'Stetige Beratung und Adaption von KI in Vereinstätigkeiten geplant',
          'Infrastruktur-Roadmap für schrittweisen Ausbau definiert',
        ],
      },
      {
        title: 'Vision',
        items: [
          'Die geplante Infrastruktur soll als Blueprint für andere gemeinnützige Initiativen dienen',
          'Transparent, unabhängig, nachhaltig',
          'KI-gestützte Workflows zur Effizienzsteigerung in Non-Profit-Strukturen',
        ],
      },
    ],
    results: [
      {
        label: 'Infrastruktur im Aufbau',
        description: 'Mitgliedermanagement, Kollaborationsplattform und zentrale Datenverwaltung in Implementierung.',
      },
      {
        label: 'Teilsysteme produktiv',
        description: 'Erste Kollaborations- und Wissensmanagement-Tools bereits live und im aktiven Einsatz.',
      },
      {
        label: 'KI-Integration geplant',
        description: 'Stetige Beratung und Adaption von KI-Workflows für effizientere Vereinstätigkeiten.',
      },
      {
        label: 'Blueprint-Charakter',
        description:
          'Fundament für Zusammenarbeit von Gruppen — skalierbar, transparent und für Non-Profits reproduzierbar.',
      },
    ],
    techStack: [],
    role: 'Julian Goertz ist Vorstand bei Aktiv Kollektiv e.V.',
    cta: { label: 'Ähnliches Projekt starten', href: '/services/setup' },
    externalLinks: [
      { label: 'Aktiv Kollektiv auf LinkedIn', href: 'https://www.linkedin.com/company/aktiv-kollektiv/' },
    ],
    note: 'Konkrete Implementierungsdetails auf Anfrage.',
  },
  {
    id: 'art-affair-qr',
    logo: { src: '/art-affair-logo.svg', alt: 'Art Affair Logo', invertOnLight: true, wide: true },
    testimonialImage: {
      src: '/images/optimized/Bewertung_von_Joschka_Ludwig_Krause_zum_Art_Affair_Projekt.webp',
      alt: 'Testimonial from Joschka Ludwig Krause praising the Art Affair QR-Code project for its efficiency and professionalism',
    },
    icon: QrCode,
    title: 'KI-optimiertes QR-Code-Lead-System',
    organization: 'Art Affair GmbH & Co. KG',
    industry: 'Event-Management · Art Consulting',
    status: 'Produktiv im Einsatz',
    statusVariant: 'live',
    challenge:
      'Für Event-Leads benötigte Art Affair ein System, das QR-Codes generiert, Leads speichert und automatisch personalisierte Follow-up-E-Mails versendet – proprietäre Tools waren zu teuer und unflexibel.',
    solutionIntro:
      'Wir haben ein maßgeschneidertes System gebaut, das Leads erfasst, KI-basiert kommuniziert und durch Automation in bestehende Systeme integriert wurde. Daten werden sicher in Containern gespeichert.',
    implementation: [
      {
        title: 'API-basierte Automation',
        items: [
          'Custom API-Programmierung für QR-Code-Generierung',
          'Webhook-basierte Lead-Erfassung',
          'Automatisierte E-Mail-Ausspielung via API',
          'Integration in bestehende Event-Infrastruktur',
        ],
      },
      {
        title: 'KI-Integration via OpenAI API',
        items: [
          'LLM-gestützte E-Mail-Generierung',
          'Personalisierter Content auf Basis Event-Kontext',
          'Direkte OpenAI API-Integration',
        ],
      },
      {
        title: 'Container-basierte Datenspeicherung',
        items: ['Persistente Lead-Speicherung in Containern', 'Event-Tracking & Analytics', 'Sichere Datenhaltung'],
      },
      {
        title: 'Lightweight Frontend',
        items: ['Responsive QR-Landing-Page', 'Minimalistisches Formular', 'Direktes Feedback nach Absenden'],
      },
    ],
    results: [
      { label: 'Kosten-Effizienz', description: 'Self-hosted Set-up statt monatlicher Mailchimp-Gebühren.' },
      { label: 'KI-Optimierung', description: 'LLM-gestützte, personalisierte Follow-ups – ohne manuelle Texte.' },
      {
        label: 'Flexibilität',
        description: 'System lässt sich an Event-Formate und Branding anpassen – inklusive eigener Domain.',
      },
    ],
    techStack: [
      {
        name: 'OpenAI API',
        description: 'KI-gestützte E-Mail-Generierung via direkter API-Integration.',
        docsUrl: 'https://platform.openai.com/',
      },
      {
        name: 'Docker',
        description: 'Container-basierte Datenspeicherung und Service-Deployment.',
        docsUrl: 'https://www.docker.com/',
      },
      { name: 'PostgreSQL', description: 'Lead-Datenbank mit Event-Tracking.', docsUrl: 'https://www.postgresql.org/' },
      {
        name: 'Custom API',
        description: 'Maßgeschneiderte API-Programmierung für Workflow-Automation.',
      },
    ],
    role: 'VAE Systems verantwortete Konzept, Entwicklung, Infrastructure-as-Code und Deployment.',
    cta: { label: 'KI-Workflow-Automation anfragen', href: '/services/beratung' },
    externalLinks: [{ label: 'Art Affair Website', href: 'https://art-affair.net/' }],
  },
  {
    id: 'vae-internal',
    icon: Layers,
    title: 'Eigene Open-Source-Infrastruktur',
    organization: 'VAE Systems',
    industry: 'IT-Consulting',
    status: 'Live & kontinuierlich optimiert',
    statusVariant: 'internal',
    challenge:
      'Um glaubwürdig Open-Source-Infrastrukturen zu bauen, müssen wir intern vorleben, was wir Kund:innen empfehlen: Keine proprietären SaaS-Tools, volle Datenkontrolle, maximale Automatisierung.',
    solutionIntro:
      'Unsere gesamte interne Arbeit läuft auf Open-Source-Stacks – von Files über Automationen bis Monitoring. Das Setup dient als Blueprint für neue Projekte.',
    implementation: [
      {
        title: 'Stack im Einsatz',
        items: [
          'Nextcloud Hub für Files, Kalender, Kontakte, Talk',
          'Outline für Team-Dokumentation & Wissensdatenbank',
          'OpenProject für Projektmanagement & Roadmaps',
          'Twenty CRM für Kontakt- & Opportunity-Management',
          'Super Productivity für Time Tracking & Task Management',
          'n8n für internes Automations-Testing (produktive Automationen werden stabil programmiert)',
          'Self-hosted Website auf eigenem Stack',
          'GitHub für Versionskontrolle (self-hosted Git-Alternativen werden evaluiert)',
          'Docker für sämtliche Services',
        ],
      },
    ],
    results: [
      { label: 'Authentisch & glaubwürdig', description: 'Wir setzen dieselben Tools ein, die wir empfehlen.' },
      { label: 'Keine SaaS-Kosten', description: 'Volle Kontrolle über Infrastruktur und Kosten.' },
      {
        label: 'Blueprint ready',
        description: 'Das Setup dient als Referenzarchitektur für NGOs, Startups und Mittelstand.',
      },
    ],
    techStack: [
      {
        name: 'Nextcloud',
        description: 'Zentrale Collaboration für Files und Kommunikation.',
        docsUrl: 'https://nextcloud.com/',
      },
      {
        name: 'Outline',
        description: 'Wissensdatenbank & Team-Dokumentation.',
        docsUrl: 'https://www.getoutline.com/',
      },
      {
        name: 'OpenProject',
        description: 'Projektmanagement & Agile Workflows.',
        docsUrl: 'https://www.openproject.org/',
      },
      {
        name: 'Twenty CRM',
        description: 'Open-Source CRM für moderne Sales Workflows.',
        docsUrl: 'https://twenty.com/',
      },
      {
        name: 'Super Productivity',
        description: 'Time Tracking & Task Management.',
        docsUrl: 'https://super-productivity.com/',
      },
      {
        name: 'n8n',
        description: 'Internes Automations-Testing (Produktion: Stabil programmiert).',
        docsUrl: 'https://n8n.io/',
      },
      { name: 'Docker', description: 'Containerisierung sämtlicher Services.', docsUrl: 'https://www.docker.com/' },
      { name: 'PostgreSQL', description: 'Persistente Datenhaltung.', docsUrl: 'https://www.postgresql.org/' },
    ],
    role: 'Unsere interne Infrastruktur beweist: Open Source ist produktionsreif und skalierbar.',
  },
]

// Upcoming projects - reserved for future case studies
// const upcomingProjects: ProjectTeaser[] = [
//   // Platzhalter für zukünftige Freigaben; Details werden erst nach Kundenerlaubnis veröffentlicht.
// ]

const expertiseAreas: ExpertiseArea[] = [
  {
    id: 'collaboration',
    icon: Cloud,
    title: 'Collaboration & File Management',
    tools: ['Digitale Workspaces', 'Co-Authoring & Freigaben'],
  },
  {
    id: 'crm',
    icon: Briefcase,
    title: 'CRM & Business Management',
    tools: ['CRM/ERP-Blueprints', 'Operative Workflows'],
  },
  {
    id: 'automation',
    icon: Zap,
    title: 'Workflow-Automation',
    tools: ['Event-Driven Automationen', 'Data Sync & Orchestration'],
  },
  {
    id: 'ai',
    icon: Brain,
    title: 'AI & Machine Learning',
    tools: ['LLM-Integrationen', 'Vector-Search & Retrieval'],
  },
  {
    id: 'infrastructure',
    icon: Server,
    title: 'Infrastructure & Hosting',
    tools: ['Container & Netzwerke', 'Data Layer & Storage'],
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Monitoring & Security',
    tools: ['Observability & Incident Response', 'Backup & Compliance'],
  },
]

const statusStyles: Record<CaseStudy['statusVariant'], string> = {
  live: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-400/10 dark:text-emerald-200',
  planning:
    'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-200',
  internal:
    'border-slate-400/40 bg-slate-400/10 text-slate-700 dark:border-slate-400/30 dark:bg-slate-400/10 dark:text-slate-200',
}

interface CaseStudyCardProps {
  anchorId?: string
  study: CaseStudy
  isExpanded: boolean
  onToggle: () => void
  onBadgeClick: (badge: TechBadge) => void
  animationsEnabled: boolean
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  anchorId,
  study,
  isExpanded,
  onToggle,
  onBadgeClick,
  animationsEnabled,
}) => {
  const Icon = study.icon
  const [showLogoModal, setShowLogoModal] = useState(false)
  return (
    <>
      <article
        id={anchorId || study.id}
        className="group relative rounded-3xl border border-black/5 bg-white/90 p-8 text-text-light shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-vae-turquoise/40 hover:shadow-[0_30px_90px_rgba(13,148,136,0.2)] dark:border-white/10 dark:bg-white/[0.03] dark:text-text-light dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)] dark:hover:shadow-[0_30px_120px_rgba(13,148,136,0.25)]"
        aria-expanded={isExpanded}
      >
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex w-full flex-col gap-4 lg:max-w-xs">
            <div className="flex items-center gap-3 text-sm text-text-muted">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise dark:border-white/10 dark:bg-white/10">
                <Icon className="h-4 w-4" /> Case Study
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[study.statusVariant]}`}
              >
                <BadgeCheck className="h-3.5 w-3.5" /> {study.status}
              </span>
            </div>
            <div className="flex items-center gap-4">
              {study.logo ? (
                <button
                  type="button"
                  onClick={() => setShowLogoModal(true)}
                  className={`group/logo flex cursor-pointer items-center justify-center rounded-xl border border-black/5 bg-white/50 p-4 transition-all duration-300 hover:border-vae-turquoise/40 hover:shadow-lg dark:border-white/10 dark:bg-white/5 ${
                    study.logo.wide ? 'h-20 w-40' : 'h-28 w-28'
                  }`}
                  aria-label={`${study.logo.alt} vergrößern`}
                >
                  <img
                    src={study.logo.src}
                    alt={study.logo.alt}
                    className={[
                      'h-full w-full object-contain transition-all duration-300 group-hover/logo:scale-110',
                      (study.logo.invertOnDark || study.logo.invertOnLight) && 'filter',
                      study.logo.invertOnDark && 'dark:invert',
                      study.logo.invertOnLight && 'invert',
                      study.logo.invertOnLight && 'dark:invert-0',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    loading="lazy"
                  />
                </button>
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-xl border border-black/5 bg-white/50 text-vae-turquoise dark:border-white/10 dark:bg-white/5">
                  <Icon className="h-14 w-14" />
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-vae-turquoise">{study.organization}</p>
                <p className="text-sm text-text-muted">{study.industry}</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-text-light">{study.title}</h3>
              <p className="mt-3 text-base text-text-secondary">{study.challenge}</p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/80 p-4 text-sm text-text-secondary dark:border-white/5 dark:bg-white/5">
              <p className="font-semibold text-text-light">Unsere Antwort</p>
              <p className="mt-2 leading-relaxed">{study.solutionIntro}</p>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            {study.implementation.map(block => (
              <div
                key={block.title}
                className="rounded-2xl border border-black/5 bg-white/80 p-4 shadow-sm dark:border-white/5 dark:bg-white/[0.04]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-vae-turquoise">{block.title}</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  {block.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex items-center gap-2 text-sm font-semibold text-vae-turquoise transition-colors hover:text-vae-turquoise-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise/60"
          >
            {isExpanded ? 'Details ausblenden' : 'Details ansehen'}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
              aria-hidden="true"
            />
          </button>
          {study.cta && (
            <Link
              to={study.cta.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary underline-offset-4 transition-colors hover:text-vae-turquoise hover:underline"
            >
              {study.cta.label} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          {study.externalLinks?.map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary underline-offset-4 transition-colors hover:text-vae-turquoise hover:underline"
            >
              {link.label} <ArrowUpRight className="h-4 w-4" />
            </a>
          ))}
        </div>

        <ExpandableContent isOpen={isExpanded} animationsEnabled={animationsEnabled}>
          {study.testimonialImage && (
            <div className="mb-8 mt-8 flex justify-center">
              <figure className="max-w-full overflow-hidden rounded-2xl border border-black/5 bg-white/90 p-4 shadow-sm dark:border-white/5 dark:bg-white/[0.04]">
                <img
                  src={study.testimonialImage.src}
                  alt={study.testimonialImage.alt}
                  className={[
                    'max-h-96 w-full max-w-2xl object-contain transition-all duration-300',
                    (study.testimonialImage.invertOnDark || study.testimonialImage.invertOnLight) && 'filter',
                    study.testimonialImage.invertOnDark && 'dark:invert',
                    study.testimonialImage.invertOnLight && 'invert',
                    study.testimonialImage.invertOnLight && 'dark:invert-0',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  loading="lazy"
                />
              </figure>
            </div>
          )}
          <div className="mt-8 grid gap-6 pb-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-black/5 bg-white/90 p-5 shadow-sm dark:border-white/5 dark:bg-white/[0.04]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-vae-turquoise">Messbare Ergebnisse</p>
              <ul className="mt-4 space-y-4 text-sm text-text-secondary">
                {study.results.map(metric => (
                  <li key={metric.label}>
                    <p className="font-semibold text-text-light">{metric.label}</p>
                    <p className="mt-1 leading-relaxed">{metric.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/90 p-5 shadow-sm dark:border-white/5 dark:bg-white/[0.04]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-vae-turquoise">Tech Stack</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {study.techStack.map(badge => (
                  <button
                    key={badge.name}
                    type="button"
                    onClick={() => onBadgeClick(badge)}
                    title={badge.description}
                    className="rounded-full border border-black/10 bg-white/80 px-4 py-1.5 text-sm text-text-light transition-all duration-200 hover:-translate-y-0.5 hover:border-vae-turquoise/60 hover:text-vae-turquoise dark:border-white/10 dark:bg-white/10 dark:text-white"
                  >
                    {badge.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/90 p-5 shadow-sm dark:border-white/5 dark:bg-white/[0.04]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-vae-turquoise">Rolle & Ownership</p>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{study.role}</p>
              <div className="mt-6 flex items-center gap-3 text-xs text-text-muted">
                <Sparkles className="h-4 w-4 text-vae-turquoise" />
                Open Source · DSGVO-konform · Transparent dokumentiert
              </div>
            </div>
          </div>
          {study.note && (
            <div className="mt-4 rounded-2xl border border-vae-turquoise/20 bg-vae-turquoise/5 p-4 text-center">
              <p className="text-sm italic text-text-secondary">{study.note}</p>
            </div>
          )}
        </ExpandableContent>
      </article>
      {showLogoModal && study.logo && <LogoModal logo={study.logo} onClose={() => setShowLogoModal(false)} />}
    </>
  )
}

interface ExpandableContentProps {
  isOpen: boolean
  children: React.ReactNode
  animationsEnabled: boolean
}

const ExpandableContent: React.FC<ExpandableContentProps> = ({ isOpen, children, animationsEnabled }) => {
  const innerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const heightBuffer = 32

  const recomputeHeight = useCallback(() => {
    if (!innerRef.current) return
    const nextHeight = innerRef.current.scrollHeight + heightBuffer
    setHeight(nextHeight)
  }, [])

  useLayoutEffect(() => {
    if (!isOpen) return
    recomputeHeight()
  }, [isOpen, recomputeHeight, children])

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined' || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => {
      recomputeHeight()
    })
    if (innerRef.current) observer.observe(innerRef.current)
    return () => observer.disconnect()
  }, [isOpen, recomputeHeight])

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return
    const handleResize = () => recomputeHeight()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen, recomputeHeight])

  return (
    <div
      className={`${animationsEnabled ? 'transition-[max-height,opacity] duration-500 ease-in-out' : ''}`}
      style={{
        maxHeight: isOpen ? `${height}px` : '0px',
        opacity: isOpen ? 1 : 0,
        overflow: isOpen ? 'visible' : 'hidden',
      }}
    >
      <div ref={innerRef} className="pb-4">
        {children}
      </div>
    </div>
  )
}

interface LogoModalProps {
  logo: { src: string; alt: string; invertOnDark?: boolean; invertOnLight?: boolean; wide?: boolean }
  onClose: () => void
}

const LogoModal: React.FC<LogoModalProps> = ({ logo, onClose }) => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/80 px-4 py-10 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${logo.alt} - Vergrößert`}
      onClick={onClose}
    >
      <div className="relative max-h-[90vh] max-w-4xl" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-4 -top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-text-light shadow-lg transition-all hover:scale-110 hover:bg-white dark:bg-bg-darker/90 dark:text-white dark:hover:bg-bg-darker"
          aria-label="Schließen"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="rounded-2xl border border-white/20 bg-white/95 p-8 shadow-2xl dark:bg-bg-dark/95">
          <img
            src={logo.src}
            alt={logo.alt}
            className={[
              'max-h-[75vh] w-full object-contain',
              (logo.invertOnDark || logo.invertOnLight) && 'filter',
              logo.invertOnDark && 'dark:invert',
              logo.invertOnLight && 'invert',
              logo.invertOnLight && 'dark:invert-0',
            ]
              .filter(Boolean)
              .join(' ')}
          />
        </div>
      </div>
    </div>
  )
}

interface TechBadgeModalProps {
  badge: TechBadge | null
  onClose: () => void
}

const TechBadgeModal: React.FC<TechBadgeModalProps> = ({ badge, onClose }) => {
  useEffect(() => {
    if (!badge) return
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [badge, onClose])

  if (!badge) return null

  return (
    <div
      className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/70 px-4 py-10"
      role="dialog"
      aria-modal="true"
      aria-label={`${badge.name} Details`}
    >
      <div className="relative w-full max-w-md rounded-3xl border border-black/5 bg-white p-6 text-text-light shadow-lg dark:border-white/10 dark:bg-[hsl(0,0%,8%)] dark:text-text-light">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-black/10 p-1 text-text-secondary transition hover:text-text-light focus:outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise dark:border-white/10"
          aria-label="Modal schließen"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-vae-turquoise" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/80">Tech Stack Insight</p>
            <h3 className="text-2xl font-semibold text-text-light">{badge.name}</h3>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-text-secondary">{badge.description}</p>
        {badge.docsUrl && (
          <a
            href={badge.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-vae-turquoise transition-colors hover:text-vae-turquoise-300"
          >
            Mehr erfahren <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  )
}

const ReferenzenPage: React.FC = () => {
  const [expandedCase, setExpandedCase] = useState<string | null>(caseStudies[0].id)
  const [selectedBadge, setSelectedBadge] = useState<TechBadge | null>(null)
  const motionDisabled = useRef(prefersReducedMotion())

  const openCalendly = useCallback(() => {
    if (typeof window === 'undefined') return
    window.open(bookingRoute, '_self')
  }, [])

  const seoJsonLd = useMemo(() => {
    const caseStudyLd = caseStudies.map(study => ({
      '@type': 'CreativeWork',
      name: study.title,
      about: study.organization,
      genre: study.industry,
      abstract: `${study.challenge} ${study.solutionIntro}`,
      creator: 'VAE Systems',
      operatingSystem: 'Open Source Stack',
      keywords: study.techStack.map(stack => stack.name).join(', '),
    }))
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Referenzen & Case Studies | VAE Systems',
      description:
        'Konkrete Open-Source-Infrastrukturen und KI-Workflows, die wir umgesetzt haben: NGOs, Events, interne Best Practices.',
      url: 'https://vae.systems/ressourcen/case-studies',
      hasPart: caseStudyLd,
    }
  }, [])

  return (
    <div className="relative z-0 bg-bg-darker text-text-light transition-colors duration-300">
      <Seo
        title="Referenzen & Case Studies | VAE Systems"
        description="Konkrete Projekte mit Open-Source-Infrastruktur und KI-Workflows: Aktiv Kollektiv, QR-Code-Automationen, interne Blueprints."
        canonicalPath="/about/referenzen"
        jsonLd={seoJsonLd}
      />
      <Breadcrumbs items={REFERENZEN_BREADCRUMBS} className="mb-4" />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-bg-darker to-bg-dark dark:border-white/5">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.18),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.28),transparent_55%)]"
          aria-hidden="true"
        />
        <div className="container-vae relative flex min-h-[40vh] flex-col items-center justify-center gap-6 py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise">
            Referenzen
          </span>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-text-light md:text-5xl">
            Projekte, die zeigen, was wir können
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-text-secondary">
            Konkrete Open-Source-Infrastrukturen und KI-optimierte Workflows, die wir für Kund:innen und unsere eigenen
            Teams umgesetzt haben – ehrlich, transparent, mit messbaren Ergebnissen.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-2 text-sm text-text-secondary dark:border-white/10 dark:bg-white/5">
              <ShieldCheck className="h-4 w-4 text-vae-turquoise" /> Alle Projekte: Open-Source-first, DSGVO-konform,
              Made in Germany
            </p>
            <p className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-4 py-2 text-sm text-text-secondary dark:border-vae-turquoise/40 dark:bg-vae-turquoise/5">
              <Shield className="h-4 w-4 text-vae-turquoise" /> Weitere Projekte unter NDA – hier zeigen wir nur
              Referenzen mit Veröffentlichungsfreigabe
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="border-t border-black/5 bg-bg-dark py-20 transition-colors dark:border-white/5 dark:bg-bg-dark">
        <div className="container-vae space-y-10">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/70">Live-Projekte</p>
            <h2 className="mt-3 text-3xl font-semibold text-text-light md:text-4xl">
              Infrastrukturen, die bereits produktiv laufen
            </h2>
            <p className="mt-4 text-base text-text-secondary">
              Jedes Projekt zeigt, wie Open Source + KI reale Probleme löst und Ownership schafft.
            </p>
          </div>

          <div className="space-y-8">
            {caseStudies.map(study => (
              <CaseStudyCard
                key={study.id}
                anchorId={study.id}
                study={study}
                isExpanded={expandedCase === study.id}
                onToggle={() => setExpandedCase(prev => (prev === study.id ? null : study.id))}
                onBadgeClick={setSelectedBadge}
                animationsEnabled={!motionDisabled.current}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Projects */}
      <section className="border-t border-black/5 bg-bg-darker py-20 transition-colors dark:border-white/5">
        <div className="container-vae space-y-10">
          <div className="flex flex-col gap-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/70">
              Laufende & Vertrauliche Projekte
            </p>
            <h2 className="text-3xl font-semibold text-text-light md:text-4xl">Momentum für die nächsten Projekte</h2>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-text-secondary">
              Aktuelle Projekte werden hier gelistet, sobald Kund:innen der Veröffentlichung zustimmen. Mehrere
              Enterprise-Kunden und öffentliche Einrichtungen haben uns beauftragt, sind aber aus NDA-Gründen nicht
              aufgeführt. Diskretion ist Teil unserer DNA – wir nennen keine Namen ohne Zustimmung.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="border-t border-black/5 bg-bg-dark py-20 transition-colors dark:border-white/5">
        <div className="container-vae space-y-10">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/70">
              Technologie-Expertise
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-text-light md:text-4xl">Was wir beherrschen</h2>
            <p className="mt-4 text-base text-text-secondary">
              Technologien, mit denen wir täglich arbeiten – keine Buzzwords, sondern produktive Stacks.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {expertiseAreas.map(area => {
              const Icon = area.icon
              return (
                <div
                  key={area.id}
                  className="rounded-3xl border border-black/5 bg-white p-6 text-text-light shadow-[0_15px_45px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/40 hover:shadow-[0_25px_70px_rgba(13,148,136,0.15)] dark:border-white/10 dark:bg-white/[0.04] dark:text-text-light dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/5 bg-white/70 dark:border-white/10 dark:bg-white/10">
                      <Icon className="h-6 w-6 text-vae-turquoise" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-light">{area.title}</h3>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {area.tools.map(tool => (
                      <span
                        key={tool}
                        className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-sm text-text-secondary dark:border-white/10 dark:bg-white/10 dark:text-text-light"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          <p className="text-center text-sm text-text-secondary">
            Konkrete Software- und Vendor-Listen teilen wir nach Erstgespräch – vollständige Toolkataloge auf Anfrage.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-black/5 bg-bg-darker py-20 transition-colors dark:border-white/5">
        <div className="container-vae flex flex-col items-center gap-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/70">Nächster Schritt</p>
          <h2 className="text-3xl font-semibold text-text-light md:text-4xl">Ihr Projekt könnte hier stehen</h2>
          <p className="max-w-2xl text-base text-text-secondary">
            Egal ob NGO, Mittelstand oder Startup – wir bauen die Open-Source-Infrastruktur, die zu Ihren Prozessen
            passt. Von Beratung bis Langzeit-Betreuung.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <MagneticButton>
              <button type="button" onClick={openCalendly} className="btn-primary inline-flex items-center gap-2">
                Kostenloses Erstgespräch buchen
                <CalendarDays className="h-5 w-5" />
              </button>
            </MagneticButton>
            <MagneticButton>
              <Link to="/services/beratung" className="btn-ghost inline-flex items-center gap-3">
                Services ansehen <ArrowRight className="h-5 w-5 text-vae-turquoise" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      <TechBadgeModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
    </div>
  )
}

export default ReferenzenPage
