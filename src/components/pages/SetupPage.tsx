import {
  BookOpen,
  Briefcase,
  Building2,
  Check,
  GraduationCap,
  Headphones,
  Lock,
  LockOpen,
  Repeat,
  Rocket,
  Server,
  ServerCog,
  ShieldCheck,
  SlidersHorizontal,
  UploadCloud,
  Users,
} from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import FaqAccordion from '../ui/FaqAccordion'
import Seo from '../ui/Seo'
import MagneticButton from '../ui/buttons/MagneticButton'
import { SpotlightTutorialOverlay } from '../ui/tutorial/MailBuilderTutorialOverlay'
import { useSetupCalculatorTutorial } from '@/hooks/useSetupCalculatorTutorial'

interface ServiceCard {
  icon: React.ElementType
  title: string
  description: string
}

interface ProcessPhase {
  number: string
  title: string
  description: string
  details: string[]
}

interface ScenarioCard {
  icon: React.ElementType
  title: string
  description: string
  highlights: string[]
  duration: string
  effort: string
  featured?: boolean
}

interface FAQItem {
  question: string
  answer: string
}

interface ToolOption {
  id: string
  label: string
  price: number
}

const trustBadges = ['100% Open Source', 'Made in Germany', 'DSGVO-konform']

const serviceCards: ServiceCard[] = [
  {
    icon: Server,
    title: 'Infrastructure-Setup',
    description: 'Server-Stack mit Docker, Traefik, SSL, Monitoring und automatisierten Backups – produktionsfertig.',
  },
  {
    icon: UploadCloud,
    title: 'Tool-Installation',
    description: 'Nextcloud, Odoo, n8n & weitere Open-Source-Tools – abgestimmt, integriert und branded.',
  },
  {
    icon: Repeat,
    title: 'Daten-Migration',
    description: 'Sichere Datenübernahme aus Microsoft 365, Google Workspace, Salesforce, Dropbox & Co.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Anpassungen',
    description: 'Workflows, Automationen und Rollenmodelle, exakt passend zu euren Prozessen.',
  },
  {
    icon: Users,
    title: 'Team-Training',
    description: 'Workshops, Q&A-Sessions und Enablement-Material, damit das Team sofort arbeitsfähig ist.',
  },
  {
    icon: BookOpen,
    title: 'Dokumentation',
    description: 'Systemarchitektur, Admin-Runbooks, User-Guides und Troubleshooting – sauber dokumentiert.',
  },
  {
    icon: ShieldCheck,
    title: 'Backups & Security',
    description: 'Härtung, Verschlüsselung, Firewall-Policies und Backup-Automationen nach Best Practices.',
  },
  {
    icon: Headphones,
    title: 'Post-Launch-Support',
    description: '1 Monat Support für Bugfixes, Änderungen und Fragen – inklusive.',
  },
]

const processPhases: ProcessPhase[] = [
  {
    number: '01',
    title: 'Analyse & Planung (Woche 1)',
    description: 'Wir erfassen Status quo, Ihre Ziele und Risiken und entwerfen den technischen Fahrplan.',
    details: [
      '→ Ist-Analyse (Tools, Daten, Prozesse)',
      '→ Anforderungs-Workshop',
      '→ Technologie-Auswahl',
      '→ Migrations-Plan',
    ],
  },
  {
    number: '02',
    title: 'Setup & Konfiguration (Woche 2–3)',
    description: 'Server aufbauen, Tools installieren, Integrationen und Workflows abbilden.',
    details: [
      '→ Server-Aufbau (Docker, Traefik, SSL)',
      '→ Tool-Installation (Nextcloud, Odoo, n8n)',
      '→ Integration & Automationen',
      '→ Test-Umgebung',
    ],
  },
  {
    number: '03',
    title: 'Migration & Testing (Woche 4–5)',
    description: 'Wir migrieren produktive Daten, testen End-to-End und schulen Ihr Team.',
    details: [
      '→ Daten-Migration (Dateien, Kontakte, E-Mails)',
      '→ Systemtests & QA',
      '→ Team-Training',
      '→ Dokumentation',
    ],
  },
  {
    number: '04',
    title: 'Go-Live & Support (Woche 6+)',
    description: 'Produktiv-Schaltung, Monitoring und 1 Monat Post-Launch-Begleitung inklusive.',
    details: ['→ Go-Live & Monitoring', '→ Optimierungen nach Feedback', '→ Übergabe & Ownership', '→ 1 Monat Support'],
  },
]

const scenarioCards: ScenarioCard[] = [
  {
    icon: Rocket,
    title: 'Starter-Setup',
    description: 'Für Teams mit 5–15 Personen, die schnell raus aus Microsoft 365 oder Google wollen.',
    highlights: [
      'Nextcloud (Files, Calendar, Contacts)',
      'OnlyOffice',
      'Basis-n8n-Automationen',
      'Backups & Monitoring',
    ],
    duration: '2–3 Wochen',
    effort: 'Individuelles Angebot nach Beratung',
  },
  {
    icon: Briefcase,
    title: 'Professional-Setup',
    description: 'Skalierende Unternehmen mit CRM-/ERP-Bedarf und komplexeren Workflows.',
    highlights: [
      'Nextcloud Full Stack',
      'Odoo CRM/ERP (Sales, Invoicing)',
      'n8n (erweiterte Automationen)',
      'Mail-Server optional',
    ],
    duration: '4–5 Wochen',
    effort: 'Individuelles Angebot nach Beratung',
    featured: true,
  },
  {
    icon: Building2,
    title: 'Enterprise-Setup',
    description: '50+ Mitarbeitende, Multi-Location, Hochverfügbarkeit und dedizierter Support.',
    highlights: [
      'Nextcloud HA-Cluster',
      'Odoo Full ERP mit Custom-Modulen',
      'n8n (komplexe Workflows)',
      'Mail, Chat, Telefonie',
      'Redundante Backups & 24/7 Monitoring',
    ],
    duration: '6–8 Wochen',
    effort: 'Individuelles Angebot nach Beratung',
  },
]

const faqItems: FAQItem[] = [
  {
    question: 'Ist ein Infrastructure-Setup für uns das Richtige – oder brauchen wir erst Beratung?',
    answer:
      'Wenn Sie bereits wissen, welche Tools Sie benötigen und eine klare Migrationsstrategie haben, können wir direkt mit dem Setup beginnen. Falls Sie unsicher sind, welche Lösung wirtschaftlich und technisch sinnvoll ist, empfehlen wir zuerst unsere strategische Beratung. Dort analysieren wir Ihre Anforderungen und entwickeln 3 konkrete Handlungsoptionen – danach können Sie fundiert entscheiden.',
  },
  {
    question: 'Was unterscheidet VAE-Setup von Freelancern oder klassischen IT-Dienstleistern?',
    answer:
      'Wir liefern nicht nur technische Installation, sondern ein produktionsreifes End-to-End-System: Server-Hardening, automatisierte Backups, Dokumentation, Team-Training und 1 Monat Post-Launch-Support inklusive. Freelancer fokussieren oft nur auf Installation, klassische IT-Dienstleister verkaufen proprietäre Lösungen. Wir setzen auf Open Source, volle Datenkontrolle und langfristige Unabhängigkeit – ohne Vendor-Lock-in.',
  },
  {
    question: 'Wie lange dauert ein typisches Setup?',
    answer:
      'Je nach Umfang 3–6 Wochen. Starter-Setups (Nextcloud + Basis-Tools) dauern 2–3 Wochen, Professional-Setups mit CRM & erweiterten Automationen 4–5 Wochen, Enterprise-Setups mit Hochverfügbarkeit 6–8 Wochen. Im Erstgespräch geben wir Ihnen eine präzise Zeitschätzung für Ihre Anforderungen.',
  },
  {
    question: 'Was kostet ein Infrastructure-Setup?',
    answer:
      'Die Investition hängt von Nutzerzahl, gewählten Tools und Komplexität ab. Im kostenlosen Erstgespräch erhalten Sie eine erste Einschätzung, nach der detaillierten Analyse ein transparentes Festpreis-Angebot – ohne versteckte Kosten. Typische Bandbreite: Starter-Setups ab ca. 3.500 €, Professional-Setups 6.000–12.000 €, Enterprise-Setups individuell.',
  },
  {
    question: 'Was passiert bei technischen Problemen nach dem Go-Live?',
    answer:
      '1 Monat Post-Launch-Support ist im Setup-Preis enthalten – wir beheben Bugs, optimieren Performance und beantworten alle Fragen. Nach diesem Monat können Sie entweder eigenständig weiterarbeiten (mit unserer vollständigen Dokumentation) oder unsere langfristige Betreuung buchen (ab 149 €/Monat mit garantierter Response-Zeit).',
  },
  {
    question: 'Müssen wir eigene Server haben?',
    answer:
      'Nein. Wir setzen auf Hetzner, Ionos, AWS oder Ihre bestehende Infrastruktur auf. Alternativ übernehmen wir das Hosting komplett (Server in Deutschland, DSGVO-konform, ab ca. 50 €/Monat je nach Anforderungen). Sie entscheiden, ob Sie volle Kontrolle über die Hardware wünschen oder unser Managed Hosting nutzen.',
  },
  {
    question: 'Werden unsere Daten sicher migriert?',
    answer:
      'Ja. Wir arbeiten mit verschlüsselter Übertragung (TLS 1.3), isolierten Test-Umgebungen und vollständigen Backups vor jeder Migration. Sensible Daten (z.B. aus Microsoft 365, Salesforce) werden niemals über unsichere Kanäle übertragen. Sie erhalten vor der produktiven Migration einen detaillierten Migrations-Plan zur Freigabe.',
  },
  {
    question: 'Können wir später weitere Tools hinzufügen?',
    answer:
      'Ja, das Setup ist vollständig modular. Neue Tools (z.B. Nextcloud Talk, zusätzliche Odoo-Module, erweiterte n8n-Workflows) lassen sich jederzeit ergänzen. Wir dokumentieren die Architektur so, dass Sie oder ein anderer Dienstleister problemlos erweitern können – keine künstliche Abhängigkeit.',
  },
]

const toolOptions: ToolOption[] = [
  { id: 'm365', label: 'Microsoft 365 (€12/User/Monat)', price: 12 },
  { id: 'gws', label: 'Google Workspace (€10/User/Monat)', price: 10 },
  { id: 'sfdc', label: 'Salesforce (€75/User/Monat)', price: 75 },
  { id: 'dropbox', label: 'Dropbox Business (€15/User/Monat)', price: 15 },
  { id: 'slack', label: 'Slack (€7/User/Monat)', price: 7 },
]

const calendlyUrl = '/contact#booking'

const SetupPage: React.FC = () => {
  const [teamSize, setTeamSize] = useState(20)
  const [customToolCost, setCustomToolCost] = useState(0)
  const [vatRate, setVatRate] = useState(19)
  const [showGrossTotals, setShowGrossTotals] = useState(true)
  const [ctaHovered, setCtaHovered] = useState(false)

  const calculatorSectionRef = useRef<HTMLElement | null>(null)
  const hasAutoStartedCalculatorTutorial = useRef(false)
  const tutorial = useSetupCalculatorTutorial()
  const { hasCompleted: tutorialCompleted, hasSkipped: tutorialSkipped, startTutorial } = tutorial

  const [toolSelection, setToolSelection] = useState<Record<string, boolean>>(() => {
    return toolOptions.reduce<Record<string, boolean>>((acc, option) => {
      acc[option.id] = option.id === 'm365' || option.id === 'slack'
      return acc
    }, {})
  })

  // Auto-start the calculator tutorial when the ROI section becomes visible.
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (tutorialCompleted || tutorialSkipped || hasAutoStartedCalculatorTutorial.current) return
    if (!('IntersectionObserver' in window)) return
    const target = calculatorSectionRef.current
    if (!target) return

    let timer: number | null = null
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting || hasAutoStartedCalculatorTutorial.current) return
          hasAutoStartedCalculatorTutorial.current = true
          timer = window.setTimeout(() => {
            startTutorial()
          }, 400)
          observer.disconnect()
        })
      },
      { threshold: 0.45 }
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
      if (timer) {
        window.clearTimeout(timer)
      }
    }
  }, [startTutorial, tutorialCompleted, tutorialSkipped])

  const faqAccordionItems = useMemo(
    () =>
      faqItems.map((item, index) => ({
        id: `setup-faq-${index}`,
        question: item.question,
        defaultOpen: index === 0,
        answer: <p className="text-base leading-relaxed text-text-secondary">{item.answer}</p>,
      })),
    []
  )

  const formatCurrency = useCallback((value: number) => {
    if (Number.isNaN(value)) return '€0'
    return value.toLocaleString('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    })
  }, [])

  const selectedToolCost = useMemo(() => {
    return toolOptions.reduce((sum, option) => (toolSelection[option.id] ? sum + option.price : sum), 0)
  }, [toolSelection])

  const monthlySaaSCost = useMemo(() => {
    return teamSize * selectedToolCost + customToolCost
  }, [teamSize, selectedToolCost, customToolCost])

  const yearlySaaSCost = useMemo(() => monthlySaaSCost * 12, [monthlySaaSCost])

  const openSourceMonthly = 50 // konservativer Hosting-Ansatz als Basisbetrag
  const openSourceAnnual = openSourceMonthly * 12

  // Calculator: centralize VAT handling so UI + logic stay in sync.
  const sanitizedVatRate = useMemo(() => {
    if (Number.isNaN(vatRate)) return 0
    return Math.min(40, Math.max(0, vatRate))
  }, [vatRate])

  const vatMultiplier = showGrossTotals ? sanitizedVatRate / 100 : 0
  const saasVatYearly = yearlySaaSCost * vatMultiplier
  const saasGrossYearly = yearlySaaSCost + saasVatYearly

  const openSourceVatYearly = openSourceAnnual * vatMultiplier
  const openSourceGrossYearly = openSourceAnnual + openSourceVatYearly

  const yearTwoSavings = useMemo(() => yearlySaaSCost - openSourceAnnual, [yearlySaaSCost, openSourceAnnual])

  const maxComparisonValue = Math.max(yearlySaaSCost, openSourceAnnual)

  const openCalendly = useCallback(() => {
    window.open(calendlyUrl, '_self')
  }, [])

  const scrollToROI = useCallback(() => {
    const target = document.getElementById('roi-calculator')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <div className="bg-bg-darker text-text-light">
      <Seo
        title="Infrastructure Setup – Open-Source-Betriebsumgebung in 3–6 Wochen | VAE"
        description="Technische Umsetzung nach strategischer Beratung: Wir ersetzen Ihre SaaS-Landschaft durch produktionsreife Open-Source-Infrastruktur. Nextcloud, Odoo, n8n – inklusive Migration, Security und Dokumentation."
        canonicalPath="/services/setup"
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-br from-bg-dark via-bg-darker to-bg-dark py-24 md:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(var(--vae-turquoise-rgb),0.25),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(var(--vae-turquoise-rgb),0.18),transparent_65%)]" />
        </div>
        <div className="container-vae relative flex flex-col items-center text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise">
            <ServerCog className="h-4 w-4" /> Infrastructure Setup
          </span>
          <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight text-white md:text-5xl">
            Von SaaS zu Open Source — in 3–6 Wochen produktionsbereit
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
            Nach der strategischen Entscheidung folgt die technische Umsetzung: Wir bauen Ihre komplette
            Open-Source-Infrastruktur auf. Nextcloud statt Dropbox. Odoo statt Salesforce. Alles konfiguriert, migriert,
            gehärtet und produktionsreif – ohne Vendor-Lock-in, mit voller Datenkontrolle.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <MagneticButton intensity={0.08} scaleEffect>
              <button
                onClick={openCalendly}
                className="btn-primary flex items-center justify-center gap-2 px-8 py-4 text-base"
              >
                Kostenloses Erstgespräch buchen
              </button>
            </MagneticButton>
            <button
              onClick={scrollToROI}
              className="btn-ghost border border-white/20 px-8 py-4 text-base text-white transition hover:border-vae-turquoise hover:text-vae-turquoise"
            >
              ROI-Rechner ansehen ↓
            </button>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm font-semibold text-text-secondary">
            {trustBadges.map(badge => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1"
              >
                <Check className="h-4 w-4 text-vae-turquoise" /> {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="border-b border-white/5 py-20" id="definition">
        <div className="container-vae grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/60">
              Was ist Infrastructure Setup?
            </p>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Was bedeutet Infrastructure Setup bei VAE?
            </h2>
            <p className="text-lg text-text-secondary">
              Infrastructure Setup ist die technische Umsetzungsphase nach der strategischen Beratung. Wir ersetzen
              proprietäre SaaS-Tools durch produktionsreife Open-Source-Alternativen – ohne Vendor-Lock-in und mit
              voller Datenkontrolle.
            </p>
            <ul className="space-y-3 text-text-secondary">
              {[
                'Nextcloud aufsetzen (Files, Calendar, Contacts, Talk)',
                'CRM/ERP-System konfigurieren (Odoo oder SuiteCRM)',
                'Automationen aufbauen (n8n für Workflows)',
                'Daten migrieren (Microsoft 365, Google, Salesforce, …)',
                'Server-Infrastruktur aufbauen (Docker, Traefik, SSL)',
                'Team schulen (Workshops & Dokumentation)',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 text-vae-turquoise" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-text-secondary">
              Am Ende haben Sie ein vollständig funktionierendes System, das Ihr Team sofort nutzen kann. Plus:
              vollständige Dokumentation, automatisierte Backups und 1 Monat Post-Launch-Support inklusive.
            </p>
            <p className="italic text-gray-600 dark:text-text-secondary/80">
              Typische Projektdauer: 3–6 Wochen. Investition abhängig von Umfang und Komplexität. Im kostenlosen
              Erstgespräch erhalten Sie eine präzise Schätzung.
            </p>
          </div>
          <div className="relative min-h-[320px] rounded-3xl border border-vae-turquoise/20 bg-gradient-to-br from-vae-turquoise/5 via-white/5 to-transparent p-8 shadow-lg backdrop-blur-sm dark:from-vae-turquoise/10 dark:via-white/5">
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5 backdrop-blur-sm">
                <p className="mb-1 text-sm font-semibold uppercase tracking-[0.3em] text-red-400/80 dark:text-red-300/70">
                  Vorher
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Fragmentierte SaaS-Landschaft</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                  Viele Tools, hohe Kosten, Daten verstreut, Abhängigkeit von Anbietern.
                </p>
              </div>
              <div className="rounded-2xl border border-vae-turquoise/40 bg-vae-turquoise/10 p-5 backdrop-blur-sm">
                <p className="mb-1 text-sm font-semibold uppercase tracking-[0.3em] text-vae-turquoise/90">Nachher</p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Einheitliche Open-Source-Plattform
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                  Alle Prozesse auf Ihrer Infrastruktur, vollständig in Ihrer Kontrolle.
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-text-secondary">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-vae-turquoise/50 to-transparent" />
                End-to-end orchestriert von VAE
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-vae-turquoise/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Produktionsreife Systeme */}
      <section className="relative overflow-hidden py-20">
        <div className="container-vae relative">
          <header className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/60">Ihre Infrastruktur</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Produktionsreife Systeme</h2>
            <p className="mt-4 text-base text-text-secondary md:text-lg">
              Vollständig konfiguriert, dokumentiert und unter Ihrer Kontrolle
            </p>
          </header>

          {/* Feature Highlights */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-vae-turquoise/15">
                <Server className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h4 className="mb-2 text-base font-semibold text-white">Auf Ihren Servern</h4>
              <p className="text-sm text-text-secondary">Volle Datenkontrolle, keine Cloud-Abhängigkeit</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-vae-turquoise/15">
                <Users className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h4 className="mb-2 text-base font-semibold text-white">Intuitiv bedienbar</h4>
              <p className="text-sm text-text-secondary">Moderne UI/UX, schnelle Einarbeitung</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-vae-turquoise/15">
                <ShieldCheck className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h4 className="mb-2 text-base font-semibold text-white">Enterprise-Ready</h4>
              <p className="text-sm text-text-secondary">Security, Backups, Monitoring inklusive</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Original Content */}
      <section className="py-20">
        <div className="container-vae">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/60">Was ist enthalten?</p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">Was Sie erhalten</h2>
            <p className="mt-3 text-lg text-text-secondary">
              Vollständiges Setup, produktionsbereit, ohne versteckte Kosten.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map(card => (
              <div
                key={card.title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-200 hover:-translate-y-1 hover:border-vae-turquoise/60 hover:bg-white/10"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-vae-turquoise/10 text-vae-turquoise">
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 ROI */}
      <section id="roi-calculator" ref={calculatorSectionRef} className="border-y border-white/5 bg-bg-dark py-20">
        <div className="container-vae">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/60">ROI-Kalkulator</p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">Was sparen Sie mit Open Source?</h2>
            <p className="mt-3 text-lg text-text-secondary">
              Ihre aktuellen Lizenzen vs. Hosting-Kosten – transparent, monatlich und jährlich, optional inklusive USt.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={startTutorial}
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:-translate-y-0.5 hover:border-vae-turquoise/60 hover:bg-white/10"
              >
                <GraduationCap className="h-4 w-4 text-vae-turquoise transition group-hover:text-vae-turquoise/80" />
                Tutorial starten
              </button>
              <span className="text-xs font-medium text-text-secondary">Geführte Tour durch den Kostenrechner</span>
            </div>
          </div>
          <div className="mt-12 grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 lg:grid-cols-[0.45fr_0.55fr]">
            <div className="space-y-8">
              <div data-calculator-tutorial="team-size">
                <label className="text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">
                  Anzahl Mitarbeitende
                </label>
                <div className="mt-4 flex flex-col gap-4">
                  <input
                    type="range"
                    min={5}
                    max={100}
                    value={teamSize}
                    onChange={event => setTeamSize(Number(event.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-vae-turquoise"
                  />
                  <div className="flex items-center gap-3 text-lg font-semibold text-white">
                    {teamSize} Personen
                    <input
                      type="number"
                      min={5}
                      max={200}
                      value={teamSize}
                      onChange={event => setTeamSize(Math.max(5, Math.min(200, Number(event.target.value) || 0)))}
                      className="w-24 rounded-xl border border-white/10 bg-bg-darker px-3 py-2 text-right text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-5" data-calculator-tutorial="tools">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">
                    Ihre aktuellen SaaS-Tools
                  </p>
                  <div className="mt-4 space-y-3">
                    {toolOptions.map(option => (
                      <label
                        key={option.id}
                        className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                          toolSelection[option.id]
                            ? 'border-vae-turquoise/60 bg-vae-turquoise/10 text-white'
                            : 'border-white/10 bg-bg-darker text-text-secondary hover:border-white/30'
                        }`}
                      >
                        <div>
                          <p className="font-semibold">{option.label}</p>
                          <p className="text-xs text-text-secondary/80">pro Nutzer:in & Monat</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={toolSelection[option.id]}
                          onChange={event =>
                            setToolSelection(prev => ({
                              ...prev,
                              [option.id]: event.target.checked,
                            }))
                          }
                          className="h-5 w-5 rounded border-white/30 bg-black/30 text-vae-turquoise focus:ring-vae-turquoise/60"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-bg-darker/60 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">
                    Weitere Lizenzkosten (monatlich)
                  </p>
                  <p className="mt-2 text-xs text-text-secondary">
                    Addieren Sie Spezial-Tools oder Agenturleistungen, die noch nicht in der Liste enthalten sind.
                  </p>
                  <input
                    type="number"
                    min={0}
                    step={50}
                    value={customToolCost}
                    onChange={event => setCustomToolCost(Math.max(0, Number(event.target.value) || 0))}
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-bg-darker/60 px-4 py-3 text-lg text-white"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-bg-darker/60 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">USt.-Satz</p>
                    <p className="text-xs text-text-secondary">Konfigurierbar, Standard in Deutschland: 19%</p>
                  </div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                    <input
                      type="checkbox"
                      checked={showGrossTotals}
                      onChange={event => setShowGrossTotals(event.target.checked)}
                      className="h-4 w-4 rounded border-white/30 bg-black/30 text-vae-turquoise focus:ring-vae-turquoise/60"
                    />
                    Bruttowerte anzeigen
                  </label>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    max={40}
                    value={vatRate}
                    onChange={event => {
                      const value = Number(event.target.value)
                      if (Number.isNaN(value)) {
                        setVatRate(0)
                        return
                      }
                      setVatRate(Math.max(0, Math.min(40, value)))
                    }}
                    className="w-28 rounded-2xl border border-white/10 bg-bg-darker px-4 py-3 text-lg text-white"
                  />
                  <span className="text-sm text-text-secondary">%</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 rounded-3xl border border-white/10 bg-bg-darker/60 p-6">
              <div className="space-y-6" data-calculator-tutorial="results">
                <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-300">
                    Ihre aktuellen SaaS-Kosten
                  </p>
                  <div className="mt-4 space-y-3 text-sm md:text-base">
                    <div className="flex items-center justify-between text-text-secondary">
                      <span>Monatliche Kosten (netto)</span>
                      <span className="font-semibold text-white">{formatCurrency(monthlySaaSCost)}</span>
                    </div>
                    <div className="flex items-center justify-between text-text-secondary">
                      <span>Jährliche Kosten (netto)</span>
                      <span className="font-semibold text-white">{formatCurrency(yearlySaaSCost)}</span>
                    </div>
                    <div className="flex items-center justify-between text-text-secondary">
                      <span>{`davon USt (${sanitizedVatRate}% p.a.)`}</span>
                      <span className="font-semibold text-white">
                        {showGrossTotals ? formatCurrency(saasVatYearly) : '—'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-text-secondary">
                      <span>Bruttokosten p.a.</span>
                      <span className="font-semibold text-white">
                        {showGrossTotals ? formatCurrency(saasGrossYearly) : '—'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-vae-green/40 bg-vae-green/10 rounded-2xl border p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-vae-green text-xs font-semibold uppercase tracking-[0.3em]">Mit Open Source</p>
                    <Lock className="text-vae-green h-4 w-4" />
                  </div>
                  <div className="mt-4 space-y-3 text-sm md:text-base">
                    <div className="flex items-center justify-between text-text-secondary">
                      <span>Monatliche Hosting-Kosten (netto)</span>
                      <span className="font-semibold text-white">{formatCurrency(openSourceMonthly)}</span>
                    </div>
                    <div className="flex items-center justify-between text-text-secondary">
                      <span>Jährliche Hosting-Kosten (netto)</span>
                      <span className="font-semibold text-white">{formatCurrency(openSourceAnnual)}</span>
                    </div>
                    <div className="flex items-center justify-between text-text-secondary">
                      <span>{`davon USt (${sanitizedVatRate}% p.a.)`}</span>
                      <span className="font-semibold text-white">
                        {showGrossTotals ? formatCurrency(openSourceVatYearly) : '—'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-text-secondary">
                      <span>Bruttokosten p.a.</span>
                      <span className="font-semibold text-white">
                        {showGrossTotals ? formatCurrency(openSourceGrossYearly) : '—'}
                      </span>
                    </div>
                  </div>
                  {/* Locked Setup placeholder – reveals CTA without exposing pricing */}
                  <div className="mt-5 rounded-2xl border border-white/20 bg-white/5 p-4 text-sm text-text-secondary">
                    <div className="flex items-center justify-between text-white">
                      <span className="flex items-center gap-2 text-sm font-semibold">
                        <Lock className="text-vae-green h-4 w-4" />
                        Einmalige Setup-Kosten (individuell) 🔒
                      </span>
                      <span className="text-sm font-semibold">auf Anfrage</span>
                    </div>
                    <p className="mt-2 text-xs text-text-secondary">
                      Diese Zeile ist bewusst gesperrt. Wir kalkulieren Setup & Implementierung individuell.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text-secondary">Einsparungen</p>
                  <div className="mt-4 space-y-4 text-sm md:text-base">
                    <div>
                      <div className="flex items-center justify-between text-text-secondary">
                        <span>Einsparung Jahr 1 (Setup individuell 🔒)</span>
                        <span className="font-semibold text-white">–</span>
                      </div>
                      <p className="mt-1 text-xs text-text-secondary">
                        Formel: SaaS pro Jahr – (Hosting + individuelles Setup 🔒). Wir rechnen dies nach dem Scoping.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-text-secondary">
                        <span>Einsparung ab Jahr 2 (nur Hosting)</span>
                        <span className="font-semibold text-white">{formatCurrency(yearTwoSavings)}</span>
                      </div>
                      <p className="mt-1 text-xs text-text-secondary">
                        Ab Jahr 2 fällt nur noch Hosting an – keine Lizenzen, keine Vendor-Lock-ins.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text-secondary">
                    Kostenvergleich
                  </p>
                  <div className="mt-4 space-y-3 text-sm">
                    <div>
                      <div className="flex items-center justify-between text-text-secondary">
                        <span>Ihre SaaS-Kosten pro Jahr</span>
                        <span className="font-semibold text-white">{formatCurrency(yearlySaaSCost)}</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-white/10">
                        <div
                          className="h-2 rounded-full bg-red-400"
                          style={{
                            width: `${maxComparisonValue ? Math.max((yearlySaaSCost / maxComparisonValue) * 100, 5) : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-text-secondary">
                        <span>Open Source ab Jahr 2 (Hosting)</span>
                        <span className="font-semibold text-white">{formatCurrency(openSourceAnnual)}</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-white/10">
                        <div
                          className="bg-vae-green h-2 rounded-full"
                          style={{
                            width: `${maxComparisonValue ? Math.max((openSourceAnnual / maxComparisonValue) * 100, 5) : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <MagneticButton intensity={0.06} scaleEffect data-calculator-tutorial="cta">
                <button
                  onClick={openCalendly}
                  onMouseEnter={() => setCtaHovered(true)}
                  onMouseLeave={() => setCtaHovered(false)}
                  className="btn-primary mt-2 w-full justify-center gap-2"
                >
                  {ctaHovered ? <LockOpen className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                  Individuelle Berechnung anfragen
                </button>
              </MagneticButton>
              <p className="text-sm text-text-secondary">
                Hinweis: Dies ist eine vereinfachte Schätzung. Im kostenlosen Beratungsgespräch erhalten Sie eine exakte
                Berechnung, inklusive Ihrer individuellen Setup-Kosten.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Section 5 Process */}
      <section className="py-20">
        <div className="container-vae">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/60">Prozess-Ablauf</p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">Wie läuft der Setup ab?</h2>
          </div>
          <div className="mt-12 space-y-8 border-l border-white/10 pl-6 md:pl-10">
            {processPhases.map(phase => (
              <div key={phase.number} className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="absolute -left-12 top-6 hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-bg-darker text-lg font-semibold text-white md:flex">
                  {phase.number}
                </div>
                <div className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">
                  Phase {phase.number}
                </div>
                <h3 className="text-2xl font-semibold text-white">{phase.title}</h3>
                <p className="mt-2 text-base text-text-secondary">{phase.description}</p>
                <ul className="mt-4 space-y-1 text-sm text-text-secondary">
                  {phase.details.map(detail => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 Scenarios */}
      <section className="border-y border-white/5 bg-bg-dark py-20">
        <div className="container-vae">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/60">Beispiel-Setups</p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">Wie könnte Ihr Setup aussehen?</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {scenarioCards.map(card => (
              <div
                key={card.title}
                className={`rounded-3xl border p-6 transition duration-200 hover:-translate-y-1 ${
                  card.featured
                    ? 'border-vae-turquoise/60 bg-white/10 shadow-lg shadow-vae-turquoise/20'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                {card.featured && (
                  <span className="mb-4 inline-flex items-center rounded-full border border-vae-turquoise/50 bg-vae-turquoise/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise">
                    Most Popular
                  </span>
                )}
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-vae-turquoise/15 text-vae-turquoise">
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-base text-text-secondary">{card.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                  {card.highlights.map(highlight => (
                    <li key={highlight} className="flex items-start gap-2">
                      <Check className="text-vae-green mt-0.5 h-4 w-4" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-sm text-text-secondary">
                  <p>
                    <span className="font-semibold text-white">Typische Dauer:</span> {card.duration}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Geschätzter Aufwand:</span> {card.effort}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 FAQ */}
      <section className="bg-gradient-to-b from-bg-darker via-[#050505] to-bg-darker py-20">
        <div className="container-vae">
          <div className="mx-auto max-w-2xl text-center text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/80">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Häufige Fragen</h2>
            <p className="mt-4 text-base text-text-secondary">
              Alles rund um Infrastruktur-Setups – von Migration bis Kosten-Transparenz.
            </p>
          </div>
          <FaqAccordion items={faqAccordionItems} className="mt-12 space-y-4" />
        </div>
      </section>

      {/* Section 8 CTA */}
      <section className="border-t border-white/5 bg-gradient-to-br from-bg-dark to-bg-darker py-20">
        <div className="container-vae text-center">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Bereit für digitale Souveränität?</h2>
          <p className="mt-4 text-lg text-text-secondary">
            Der erste Schritt ist ein kostenloses Beratungsgespräch. Wir analysieren Ihre Situation und zeigen Ihnen,
            wie Open Source konkret für Ihre Organisation funktioniert.
          </p>
          <MagneticButton intensity={0.08} scaleEffect>
            <button
              onClick={openCalendly}
              className="btn-primary mt-8 inline-flex items-center justify-center px-8 py-4 text-base"
            >
              Kostenloses Erstgespräch buchen
            </button>
          </MagneticButton>
          <p className="mt-3 text-sm text-text-secondary">
            45 Minuten, unverbindlich, kein Verkaufs-Pitch. Binnen 48h Termin verfügbar.
          </p>
        </div>
      </section>
      <SpotlightTutorialOverlay tutorial={tutorial} />
    </div>
  )
}

export default SetupPage
