import { prefersReducedMotion } from '@/utils/motion'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Brain,
  Briefcase,
  Building2,
  CalendarDays,
  ChevronDown,
  Cloud,
  Layers,
  QrCode,
  Rocket,
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

const calendlyUrl = 'https://nc.intern.vae.systems/apps/calendar/appointment/RgxJERqNkfZz'

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
  icon: React.ElementType
}

interface ProjectTeaser {
  id: string
  icon: React.ElementType
  title: string
  description: string
  status: string
}

interface ExpertiseArea {
  id: string
  icon: React.ElementType
  title: string
  tools: string[]
}

const caseStudies: CaseStudy[] = [
  {
    id: 'aktiv-kollektiv',
    logo: { src: '/Kollektiv-Logo.svg', alt: 'Aktiv Kollektiv e.V. Logo', invertOnDark: true },
    icon: Users,
    title: 'Open-Source-Infrastruktur für NGO',
    organization: 'Aktiv Kollektiv e.V.',
    industry: 'Non-Profit · Vereinsarbeit',
    status: 'Live seit 2025',
    statusVariant: 'live',
    challenge:
      'Aktiv Kollektiv e.V. arbeitete mit einer fragmentierten Tool-Landschaft: Google Drive, Excel und E-Mail-Threads ohne zentrale Plattform, kein CRM, keine Automatisierung und unklare DSGVO-Compliance. Zusätzlich explodierten die SaaS-Kosten.',
    solutionIntro:
      'Wir haben eine komplette Open-Source-Infrastruktur aufgesetzt, die alle Workflows bündelt, Datenhoheit herstellt und Automatisierung ermöglicht.',
    implementation: [
      {
        title: 'Nextcloud Hub',
        items: [
          'Dateispeicherung & Sharing als Google-Drive-Ersatz',
          'Team-Kalender & Kontakte',
          'Nextcloud Talk für interne Kommunikation',
          'OnlyOffice für kollaborative Dokumente',
        ],
      },
      {
        title: 'Twenty CRM',
        items: [
          'Mitgliederverwaltung & Kontakt-Datenbank',
          'Event-Tracking und Follow-ups',
          'Custom Fields für NGO-spezifische Daten',
        ],
      },
      {
        title: 'n8n Automation',
        items: [
          'Lead- und Mitglieder-Onboarding automatisiert',
          'E-Mail-Benachrichtigungen und Reminder',
          'Daten-Synchronisation zwischen Nextcloud & CRM',
        ],
      },
      {
        title: 'Infrastructure',
        items: [
          'Self-hosted Hetzner-Stack',
          'Docker-basiertes Deployment',
          'Tägliche Backups',
          'Traefik + Let’s Encrypt',
        ],
      },
    ],
    results: [
      { label: 'Kosten-Reduktion', description: 'Keine monatlichen SaaS-Gebühren mehr – nur planbare Serverkosten.' },
      { label: 'DSGVO-Compliance', description: '100% Datenhoheit in Deutschland, keine US-Cloud-Transfers.' },
      {
        label: 'Effizienzsteigerung',
        description: 'Zentrale Plattform ersetzt fragmentierte Tools – das Team arbeitet spürbar schneller.',
      },
    ],
    techStack: [
      {
        name: 'Nextcloud',
        description: 'Self-hosted Collaboration Suite für Files, Kalender und Talk.',
        docsUrl: 'https://nextcloud.com/',
      },
      { name: 'Twenty CRM', description: 'CRM mit Custom Fields für NGOs & Vereine.', docsUrl: 'https://twenty.com/' },
      {
        name: 'n8n',
        description: 'Workflow-Automatisierung mit mehr als 400 Integrationen.',
        docsUrl: 'https://n8n.io/',
      },
      {
        name: 'Docker',
        description: 'Container-Orchestrierung für reproduzierbare Deployments.',
        docsUrl: 'https://www.docker.com/',
      },
      {
        name: 'PostgreSQL',
        description: 'Relationale Datenbank für CRM & Automationen.',
        docsUrl: 'https://www.postgresql.org/',
      },
      { name: 'Traefik', description: 'Reverse Proxy inklusive automatischem SSL.', docsUrl: 'https://traefik.io/' },
    ],
    role: 'Julian Goertz ist Vorstand bei Aktiv Kollektiv e.V. und hat die Infrastruktur intern konzipiert und umgesetzt.',
    cta: { label: 'Ähnliches Projekt starten', href: '/services/setup' },
  },
  {
    id: 'art-affair-qr',
    logo: { src: '/art-affair-logo.svg', alt: 'Art Affair Logo', invertOnLight: true, wide: true },
    icon: QrCode,
    title: 'KI-optimiertes QR-Code-Lead-System',
    organization: 'Art Affair',
    industry: 'Event-Management · Art Consulting',
    status: 'Produktiv im Einsatz',
    statusVariant: 'live',
    challenge:
      'Für Event-Leads benötigte Art Affair ein System, das QR-Codes generiert, Leads speichert und automatisch personalisierte Follow-up-E-Mails versendet – proprietäre Tools waren zu teuer und unflexibel, KI-Integration nicht möglich.',
    solutionIntro:
      'Wir haben ein maßgeschneidertes System mit Open-Source-Komponenten gebaut, das Leads erfasst, KI-basiert kommuniziert und ohne Vendor-Lock-in betrieben wird.',
    implementation: [
      {
        title: 'n8n Workflow-Engine',
        items: [
          'QR-Code-Generierung und Verwaltung',
          'Webhook-basierte Lead-Erfassung',
          'Automatisierte E-Mail-Ausspielung',
        ],
      },
      {
        title: 'LangChain + OpenAI / Ollama',
        items: [
          'LLM-gestützte E-Mail-Generierung',
          'Personalisierter Content auf Basis Event-Kontext',
          'Einfache Anpassung auf weitere Sprachen',
        ],
      },
      {
        title: 'PostgreSQL Data Layer',
        items: ['Persistente Lead-Speicherung', 'Event-Tracking & Analytics', 'Grundlage für zukünftige Dashboards'],
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
      { name: 'n8n', description: 'Automatisierungs-Engine für sämtliche Workflows.', docsUrl: 'https://n8n.io/' },
      {
        name: 'LangChain',
        description: 'Orchestrierung von LLM-Ketten zur E-Mail-Generierung.',
        docsUrl: 'https://www.langchain.com/',
      },
      { name: 'PostgreSQL', description: 'Lead-Datenbank mit Event-Tracking.', docsUrl: 'https://www.postgresql.org/' },
      {
        name: 'Docker',
        description: 'Deployment aller Services inklusive Scheduler.',
        docsUrl: 'https://www.docker.com/',
      },
      {
        name: 'OpenAI API',
        description: 'LLM-Backend – optional durch Ollama ersetzbar.',
        docsUrl: 'https://platform.openai.com/',
      },
    ],
    role: 'VAE Systems verantwortete Konzept, Entwicklung, Infrastructure-as-Code und Deployment.',
    cta: { label: 'KI-Workflow-Automation anfragen', href: '/services/beratung' },
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
          'n8n für Workflow-Automation, Client-Onboarding, Reporting',
          'Perplexity & Open-Source-LLMs für Research',
          'GitHub für Versionskontrolle',
          'Docker & Traefik für sämtliche Services',
          'Uptime Kuma und Restic für Monitoring & Backups',
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
      { name: 'n8n', description: 'Automatisierung für Onboarding & Ops.', docsUrl: 'https://n8n.io/' },
      { name: 'Docker', description: 'Containerisierung sämtlicher Services.', docsUrl: 'https://www.docker.com/' },
      { name: 'PostgreSQL', description: 'Persistente Datenhaltung.', docsUrl: 'https://www.postgresql.org/' },
      { name: 'Traefik', description: 'Routing, SSL, Zero-Downtime-Deployments.', docsUrl: 'https://traefik.io/' },
      { name: 'Uptime Kuma', description: 'Self-hosted Monitoring & Alerts.', docsUrl: 'https://uptimekuma.com/' },
      { name: 'Restic', description: 'Verschlüsselte Backups, versioniert.', docsUrl: 'https://restic.net/' },
    ],
    role: 'Unsere interne Infrastruktur beweist: Open Source ist produktionsreif und skalierbar.',
  },
]

const upcomingProjects: ProjectTeaser[] = [
  {
    id: 'manufacturing',
    icon: Building2,
    title: 'Mittelständisches Unternehmen (Manufacturing)',
    description:
      'Migration von Microsoft 365 zu Nextcloud + Odoo ERP für 50 Mitarbeitende inkl. CRM-Integration. Start: Q1 2026.',
    status: 'In Planung',
  },
  {
    id: 'saas-startup',
    icon: Rocket,
    title: 'Startup (SaaS-Produkt)',
    description:
      'KI-integrierte Infrastruktur: n8n für Automationen, LangChain für Produktfeatures, Self-hosted LLMs. Start: Q4 2025.',
    status: 'In Konzeption',
  },
  {
    id: 'ngo-secure',
    icon: ShieldCheck,
    title: 'NGO (Datenschutz-fokussiert)',
    description:
      'Nextcloud-basierte Infrastruktur für sensible Daten-Verwaltung. DSGVO-konform, verschlüsselt, rechtssicher. Start: Q1 2026.',
    status: 'In Gesprächen',
  },
]

const expertiseAreas: ExpertiseArea[] = [
  {
    id: 'collaboration',
    icon: Cloud,
    title: 'Collaboration & File Management',
    tools: ['Nextcloud', 'OnlyOffice', 'Collabora'],
  },
  {
    id: 'crm',
    icon: Briefcase,
    title: 'CRM & Business Management',
    tools: ['Odoo ERP', 'SuiteCRM', 'Twenty CRM'],
  },
  {
    id: 'automation',
    icon: Zap,
    title: 'Workflow-Automation',
    tools: ['n8n', 'Node-RED', 'Custom Workflows'],
  },
  {
    id: 'ai',
    icon: Brain,
    title: 'AI & Machine Learning',
    tools: ['LangChain', 'Ollama', 'Qdrant', 'OpenAI API'],
  },
  {
    id: 'infrastructure',
    icon: Server,
    title: 'Infrastructure & Hosting',
    tools: ['Docker', 'Traefik', 'PostgreSQL', 'Redis', 'Hetzner'],
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Monitoring & Security',
    tools: ['Uptime Kuma', 'Restic', 'Firewall', 'SSL/TLS'],
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
  study: CaseStudy
  isExpanded: boolean
  onToggle: () => void
  onBadgeClick: (badge: TechBadge) => void
  animationsEnabled: boolean
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  study,
  isExpanded,
  onToggle,
  onBadgeClick,
  animationsEnabled,
}) => {
  const Icon = study.icon
  return (
    <article
      className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white/90 p-8 text-text-light shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-vae-turquoise/40 hover:shadow-[0_30px_90px_rgba(13,148,136,0.2)] dark:border-white/10 dark:bg-white/[0.03] dark:text-text-light dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)] dark:hover:shadow-[0_30px_120px_rgba(13,148,136,0.25)]"
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
              <div
                className={`flex items-center justify-center rounded-xl border border-black/5 bg-white/50 p-4 dark:border-white/10 dark:bg-white/5 ${
                  study.logo.wide ? 'h-20 w-40' : 'h-28 w-28'
                }`}
              >
                <img
                  src={study.logo.src}
                  alt={study.logo.alt}
                  className={[
                    'h-full w-full object-contain transition-transform duration-300',
                    (study.logo.invertOnDark || study.logo.invertOnLight) && 'filter',
                    study.logo.invertOnDark && 'dark:invert',
                    study.logo.invertOnLight && 'invert',
                    study.logo.invertOnLight && 'dark:invert-0',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  loading="lazy"
                />
              </div>
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
      </div>

      <ExpandableContent isOpen={isExpanded} animationsEnabled={animationsEnabled}>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
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
      </ExpandableContent>
    </article>
  )
}

const upcomingStatusStyles: Record<string, string> = {
  'In Planung':
    'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-200',
  'In Konzeption':
    'border-sky-500/20 bg-sky-500/10 text-sky-700 dark:border-sky-400/40 dark:bg-sky-400/10 dark:text-sky-200',
  'In Gesprächen':
    'border-pink-500/20 bg-pink-500/10 text-pink-700 dark:border-pink-400/40 dark:bg-pink-400/10 dark:text-pink-200',
}

interface ExpandableContentProps {
  isOpen: boolean
  children: React.ReactNode
  animationsEnabled: boolean
}

const ExpandableContent: React.FC<ExpandableContentProps> = ({ isOpen, children, animationsEnabled }) => {
  const innerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  const recomputeHeight = useCallback(() => {
    if (!innerRef.current) return
    const nextHeight = innerRef.current.scrollHeight
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
      className={`overflow-hidden ${animationsEnabled ? 'transition-[max-height,opacity] duration-500 ease-in-out' : ''}`}
      style={{ maxHeight: isOpen ? `${height}px` : '0px', opacity: isOpen ? 1 : 0 }}
    >
      <div ref={innerRef}>{children}</div>
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-10"
      role="dialog"
      aria-modal="true"
      aria-label={`${badge.name} Details`}
    >
      <div className="relative w-full max-w-md rounded-3xl border border-black/5 bg-white p-6 text-text-light shadow-lg dark:border-white/10 dark:bg-white/10 dark:text-text-light">
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
  const [calendlyReady, setCalendlyReady] = useState(false)
  const motionDisabled = useRef(prefersReducedMotion())

  const openCalendly = useCallback(() => {
    if (typeof window === 'undefined') return
    const calendly = (window as any).Calendly
    if (calendly?.initPopupWidget) {
      calendly.initPopupWidget({ url: calendlyUrl })
      setCalendlyReady(true)
    } else {
      window.open(calendlyUrl, '_blank', 'noopener,noreferrer')
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    )
    if (existingScript) {
      setCalendlyReady(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = () => setCalendlyReady(true)
    document.head.appendChild(script)
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
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
      url: 'https://www.vae-systems.com/about/referenzen',
      hasPart: caseStudyLd,
    }
  }, [])

  return (
    <div className="bg-bg-darker text-text-light transition-colors duration-300">
      <Seo
        title="Referenzen & Case Studies | VAE Systems"
        description="Konkrete Projekte mit Open-Source-Infrastruktur und KI-Workflows: Aktiv Kollektiv, QR-Code-Automationen, interne Blueprints."
        canonicalPath="/about/referenzen"
        jsonLd={seoJsonLd}
      />

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
          <p className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-2 text-sm text-text-secondary dark:border-white/10 dark:bg-white/5">
            <ShieldCheck className="h-4 w-4 text-vae-turquoise" /> Alle Projekte: 100% Open Source, DSGVO-konform, Made
            in Germany
          </p>
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
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/70">In Entwicklung</p>
            <h2 className="text-3xl font-semibold text-text-light md:text-4xl">Momentum für die nächsten Projekte</h2>
            <p className="text-base text-text-secondary">
              Laufende Engagements – detaillierte Case Studies veröffentlichen wir nach Kund:innenfreigabe.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {upcomingProjects.map(project => {
              const Icon = project.icon
              return (
                <div
                  key={project.id}
                  className="rounded-3xl border border-black/5 bg-white p-6 text-text-light shadow-[0_15px_45px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/40 hover:shadow-[0_25px_70px_rgba(13,148,136,0.15)] dark:border-white/10 dark:bg-white/[0.04] dark:text-text-light dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/5 bg-white/70 dark:border-white/10 dark:bg-white/10">
                      <Icon className="h-6 w-6 text-vae-turquoise" />
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${upcomingStatusStyles[project.status]}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-text-light">{project.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{project.description}</p>
                </div>
              )
            })}
          </div>
          <p className="text-center text-sm text-text-muted">
            Details zu laufenden Projekten veröffentlichen wir nach Abschluss mit Kundenerlaubnis.
          </p>
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
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-black/5 bg-bg-darker py-20 transition-colors dark:border-white/5">
        <div className="container-vae flex flex-col items-center gap-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/70">Nächster Schritt</p>
          <h2 className="text-3xl font-semibold text-text-light md:text-4xl">Euer Projekt könnte hier stehen</h2>
          <p className="max-w-2xl text-base text-text-secondary">
            Egal ob NGO, Mittelstand oder Startup – wir bauen die Open-Source-Infrastruktur, die zu euren Prozessen
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
          {!calendlyReady && (
            <p className="text-xs text-text-muted">
              Calendly lädt … falls nichts passiert, öffnen wir den Terminplaner in einem neuen Tab.
            </p>
          )}
        </div>
      </section>

      <TechBadgeModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
    </div>
  )
}

export default ReferenzenPage
