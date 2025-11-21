import {
  BookOpen,
  Briefcase,
  Building2,
  Check,
  GraduationCap,
  Headphones,
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

import { flattenedSaasTools, saasToolCategories } from '@/data/saasTools'
import { useSetupCalculatorTutorial } from '@/hooks/useSetupCalculatorTutorial'
import { cn } from '@/lib/classNames'
import MagneticButton from '../ui/buttons/MagneticButton'
import FaqAccordion from '../ui/FaqAccordion'
import LockedSection from '../ui/LockedSection'
import Seo from '../ui/Seo'
import { SpotlightTutorialOverlay } from '../ui/tutorial/MailBuilderTutorialOverlay'

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

interface CustomLicense {
  id: string
  name: string
  unitPrice: number
  quantity: number
}

interface CustomLicenseFormState {
  name: string
  unitPrice: string
  quantity: string
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

const calendlyUrl = '/contact#booking'
const DEFAULT_VAT_RATE = 19

const generateCustomLicenseId = () => `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`

const parseLocalizedNumber = (value: string) => {
  if (!value) return Number.NaN
  const normalized = value.replace(',', '.')
  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : Number.NaN
}

const useValueIncreaseHighlight = (value: number) => {
  const [isHighlighting, setIsHighlighting] = useState(false)
  const previousValueRef = useRef(value)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined
    if (value > previousValueRef.current) {
      setIsHighlighting(true)
      timeout = setTimeout(() => setIsHighlighting(false), 600)
    } else {
      setIsHighlighting(false)
    }
    previousValueRef.current = value

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [value])

  return isHighlighting
}

const SetupPage: React.FC = () => {
  const [teamSize, setTeamSize] = useState(20)
  const [isContentLocked] = useState(true)
  const [customLicenses, setCustomLicenses] = useState<CustomLicense[]>([])
  const [customLicenseForm, setCustomLicenseForm] = useState<CustomLicenseFormState>({
    name: '',
    unitPrice: '',
    quantity: '',
  })

  const calculatorSectionRef = useRef<HTMLElement | null>(null)
  const hasAutoStartedCalculatorTutorial = useRef(false)
  const tutorial = useSetupCalculatorTutorial()
  const { hasCompleted: tutorialCompleted, hasSkipped: tutorialSkipped, startTutorial } = tutorial

  const [toolSelection, setToolSelection] = useState<Record<string, boolean>>(() => {
    return flattenedSaasTools.reduce<Record<string, boolean>>((acc, tool) => {
      acc[tool.id] = Boolean(tool.defaultSelected)
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

  const handleCustomLicenseFormChange = useCallback((field: keyof CustomLicenseFormState, value: string) => {
    setCustomLicenseForm(prev => ({ ...prev, [field]: value }))
  }, [])

  const canAddCustomLicense = useMemo(() => {
    const price = parseLocalizedNumber(customLicenseForm.unitPrice)
    const quantityValue = parseLocalizedNumber(customLicenseForm.quantity)
    const quantity = Number.isNaN(quantityValue) ? Number.NaN : Math.round(quantityValue)
    return Boolean(customLicenseForm.name.trim()) && price > 0 && quantity > 0
  }, [customLicenseForm])

  const addCustomLicense = useCallback(() => {
    const price = parseLocalizedNumber(customLicenseForm.unitPrice)
    const quantityValue = parseLocalizedNumber(customLicenseForm.quantity)
    const quantity = Number.isNaN(quantityValue) ? Number.NaN : Math.round(quantityValue)

    if (!customLicenseForm.name.trim() || !(price > 0) || !(quantity > 0)) {
      return
    }

    setCustomLicenses(prev => [
      ...prev,
      {
        id: generateCustomLicenseId(),
        name: customLicenseForm.name.trim(),
        unitPrice: price,
        quantity,
      },
    ])
    setCustomLicenseForm({ name: '', unitPrice: '', quantity: '' })
  }, [customLicenseForm])

  const removeCustomLicense = useCallback((id: string) => {
    setCustomLicenses(prev => prev.filter(license => license.id !== id))
  }, [])

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
    return flattenedSaasTools.reduce((sum, tool) => {
      if (!toolSelection[tool.id]) return sum
      if (tool.pricingModel === 'flat') {
        return sum + (tool.flatMonthlyPrice ?? 0)
      }
      return sum + teamSize * (tool.pricePerUser ?? 0)
    }, 0)
  }, [teamSize, toolSelection])

  const customLicensesMonthlyCost = useMemo(() => {
    return customLicenses.reduce((sum, license) => sum + license.unitPrice * license.quantity, 0)
  }, [customLicenses])

  const monthlySaaSCost = useMemo(() => {
    return selectedToolCost + customLicensesMonthlyCost
  }, [selectedToolCost, customLicensesMonthlyCost])

  const yearlySaaSCost = useMemo(() => monthlySaaSCost * 12, [monthlySaaSCost])

  const openSourceMonthly = 50 // konservativer Hosting-Ansatz als Basisbetrag
  const openSourceAnnual = openSourceMonthly * 12

  const activeToolCount = useMemo(
    () => flattenedSaasTools.reduce((count, tool) => (toolSelection[tool.id] ? count + 1 : count), 0),
    [toolSelection]
  )

  const estimatedSetupCost = useMemo(() => {
    const base = 1500
    const perUser = Math.max(teamSize - 5, 0) * 40
    const perTool = activeToolCount * 300
    const raw = base + perUser + perTool
    const clamped = Math.min(5000, Math.max(1500, raw))
    return Math.round(clamped / 100) * 100
  }, [activeToolCount, teamSize])

  const vatMultiplier = DEFAULT_VAT_RATE / 100
  const saasVatYearly = yearlySaaSCost * vatMultiplier
  const saasGrossYearly = yearlySaaSCost + saasVatYearly
  const saasGrossMonthly = monthlySaaSCost + monthlySaaSCost * vatMultiplier

  // VAT calculation for Open Source (reserved for future display features)
  // const openSourceVatYearly = openSourceAnnual * vatMultiplier
  // const openSourceGrossYearly = openSourceAnnual + openSourceVatYearly

  const yearOneSavings = useMemo(
    () => Math.max(0, yearlySaaSCost - (estimatedSetupCost + openSourceAnnual)),
    [estimatedSetupCost, openSourceAnnual, yearlySaaSCost]
  )
  const yearTwoSavings = useMemo(
    () => Math.max(0, yearlySaaSCost - openSourceAnnual),
    [yearlySaaSCost, openSourceAnnual]
  )

  const maxComparisonValue = Math.max(yearlySaaSCost, openSourceAnnual, 1)

  const openCalendly = useCallback(() => {
    window.open(calendlyUrl, '_self')
  }, [])

  const highlightMonthlyNet = useValueIncreaseHighlight(monthlySaaSCost)
  const highlightYearlyNet = useValueIncreaseHighlight(yearlySaaSCost)
  const highlightMonthlyGross = useValueIncreaseHighlight(saasGrossMonthly)
  const highlightYearlyGross = useValueIncreaseHighlight(saasGrossYearly)
  const getValueClasses = useCallback(
    (isHighlighted: boolean) =>
      cn(
        'text-base font-semibold text-slate-900 transition-colors duration-300 dark:text-white',
        isHighlighted && 'text-red-600 dark:text-red-300 drop-shadow-[0_0_12px_rgba(248,113,113,0.45)]'
      ),
    []
  )

  const handleUnlockContent = useCallback(() => {
    window.open('https://nc.intern.vae.systems/apps/calendar/appointment/RgxJERqNkfZz', '_self')
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/60">SaaS-Kosten-Radar</p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
              Wie transparent ist Ihre SaaS-Landschaft?
            </h2>
            <p className="mt-3 text-lg text-text-secondary">
              Ihre aktuellen Abos, Steuern und Hosting-Kosten im direkten Vergleich. Open-Source-Einsparungen werden als
              gesperrte Ebene visualisiert und erst im Gespräch freigeschaltet.
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
          <div className="mt-12 grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 lg:grid-cols-2">
            <div className="space-y-8">
              <div data-calculator-tutorial="team-size">
                <label className="text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">
                  Anzahl Mitarbeitende (lizenzpflichtig)
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
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">
                  Ihre aktuellen SaaS-Tools
                </p>
                <div className="space-y-4">
                  {saasToolCategories.map(category => (
                    <div key={category.id} className="rounded-2xl border border-white/10 bg-bg-darker/40 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text-secondary/80">
                        {category.title}
                      </p>
                      <div className="mt-3 space-y-3">
                        {category.tools.map(tool => (
                          <label
                            key={tool.id}
                            className={cn(
                              'flex items-start justify-between gap-3 rounded-2xl border px-4 py-3 text-sm transition',
                              toolSelection[tool.id]
                                ? 'border-vae-turquoise/60 bg-vae-turquoise/10 text-white'
                                : 'border-white/10 bg-bg-darker text-text-secondary hover:border-white/30'
                            )}
                          >
                            <div className="flex-1">
                              <p className="font-semibold text-white">{tool.name}</p>
                              <p className="text-xs text-text-secondary/80">
                                {tool.pricingModel === 'perUser'
                                  ? `${formatCurrency(tool.pricePerUser ?? 0)} pro Nutzer:in/Monat (netto)`
                                  : `${formatCurrency(tool.flatMonthlyPrice ?? 0)} pro Monat (netto)`}
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              checked={toolSelection[tool.id]}
                              onChange={event =>
                                setToolSelection(prev => ({
                                  ...prev,
                                  [tool.id]: event.target.checked,
                                }))
                              }
                              className="h-5 w-5 rounded border-white/30 bg-black/30 text-vae-turquoise focus:ring-vae-turquoise/60"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-bg-darker/60 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">
                  Weitere Lizenzen hinzufügen
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  Für Spezial-Tools, Agenturleistungen oder Pakete ohne Seat-basierte Abrechnung.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <input
                    type="text"
                    value={customLicenseForm.name}
                    onChange={event => handleCustomLicenseFormChange('name', event.target.value)}
                    placeholder="Tool-Name"
                    className="rounded-2xl border border-white/10 bg-bg-darker px-4 py-3 text-sm text-white placeholder:text-text-secondary"
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    value={customLicenseForm.unitPrice}
                    onChange={event => handleCustomLicenseFormChange('unitPrice', event.target.value)}
                    placeholder="Preis pro Nutzer"
                    className="rounded-2xl border border-white/10 bg-bg-darker px-4 py-3 text-sm text-white placeholder:text-text-secondary"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    value={customLicenseForm.quantity}
                    onChange={event => handleCustomLicenseFormChange('quantity', event.target.value)}
                    placeholder="Anzahl Nutzer:innen"
                    className="rounded-2xl border border-white/10 bg-bg-darker px-4 py-3 text-sm text-white placeholder:text-text-secondary"
                  />
                </div>
                <button
                  type="button"
                  onClick={addCustomLicense}
                  disabled={!canAddCustomLicense}
                  className={cn(
                    'mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold transition',
                    canAddCustomLicense
                      ? 'bg-vae-turquoise/20 text-white hover:border-vae-turquoise/40 hover:bg-vae-turquoise/30'
                      : 'cursor-not-allowed bg-white/5 text-text-secondary'
                  )}
                >
                  Lizenz hinzufügen
                </button>
                {customLicenses.length > 0 && (
                  <div className="mt-4 space-y-3 border-t border-white/5 pt-4">
                    {customLicenses.map(license => (
                      <div
                        key={license.id}
                        className="flex flex-wrap items-center justify-between gap-3 text-sm text-white"
                      >
                        <div>
                          <p className="font-semibold">{license.name}</p>
                          <p className="text-xs text-text-secondary">
                            {license.quantity} × {formatCurrency(license.unitPrice)} pro Monat
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{formatCurrency(license.unitPrice * license.quantity)}</span>
                          <button
                            type="button"
                            onClick={() => removeCustomLicense(license.id)}
                            className="text-xs font-semibold text-text-secondary transition hover:text-white"
                          >
                            Entfernen
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-xs text-text-secondary/70">
                Hinweis: Die angezeigten Standardpreise beruhen auf öffentlich verfügbaren Quellen und dienen nur als
                Orientierung. Anbieter können Tarife und Steuersätze jederzeit ändern.
              </p>
            </div>

            <div
              className="space-y-6 rounded-3xl border border-white/10 bg-bg-darker/60 p-6 lg:sticky lg:top-24 lg:self-start"
              data-calculator-tutorial="results"
            >
              <div className="rounded-2xl border border-red-500/40 bg-red-500/5 p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
                  Ihre aktuellen SaaS-Kosten
                </p>
                <div className="mt-4 space-y-5 text-sm text-slate-600 dark:text-text-secondary">
                  <div className="flex flex-col gap-3 border-b border-white/10 pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-red-800 dark:text-red-200">
                          Monatliche Kosten
                        </p>
                        <p className="text-xs text-slate-500 dark:text-text-secondary/70">
                          Ihre aktuellen SaaS-Lizenzen
                        </p>
                      </div>
                      <div className="space-y-1 text-right">
                        <p className={getValueClasses(highlightMonthlyNet)}>
                          {formatCurrency(monthlySaaSCost)}{' '}
                          <span className="text-xs font-semibold text-slate-500 dark:text-text-secondary/70">
                            / Monat netto
                          </span>
                        </p>
                        <p className={getValueClasses(highlightMonthlyGross)}>
                          {formatCurrency(saasGrossMonthly)}{' '}
                          <span className="text-xs font-semibold text-slate-500 dark:text-text-secondary/70">
                            / Monat brutto
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-red-800 dark:text-red-200">
                        Jährliche Kosten
                      </p>
                      <p className="text-xs text-slate-500 dark:text-text-secondary/70">12 Monate Nutzung</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className={getValueClasses(highlightYearlyNet)}>
                        {formatCurrency(yearlySaaSCost)}{' '}
                        <span className="text-xs font-semibold text-slate-500 dark:text-text-secondary/70">
                          / Jahr netto
                        </span>
                      </p>
                      <p className={getValueClasses(highlightYearlyGross)}>
                        {formatCurrency(saasGrossYearly)}{' '}
                        <span className="text-xs font-semibold text-slate-500 dark:text-text-secondary/70">
                          / Jahr brutto
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 dark:text-text-secondary">
                    <span>{`davon USt (${DEFAULT_VAT_RATE}% p.a.)`}</span>
                    <span className="text-base font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(saasVatYearly)}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-red-800/70 dark:text-red-200/70">
                  Bruttowerte basieren auf dem gesetzlichen Regelsatz (19 %).
                </p>
              </div>

              <LockedSection
                isLocked={isContentLocked}
                onUnlock={handleUnlockContent}
                overlayTitle="Einsparpotenzial freischalten"
                overlayDescription="Buchen Sie ein kostenloses Beratungsgespräch, um Ihre individuellen Einsparungen zu berechnen"
                ctaText="Sparpotenzial anfordern"
                ctaDataAttribute="cta"
                className="rounded-3xl"
              >
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-bg-dark/80 via-bg-darker to-bg-dark p-6 transition-opacity duration-300 hover:opacity-70">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-vae-green text-xs font-semibold uppercase tracking-[0.3em]">
                        Einsparungen mit Open Source
                      </p>
                      <p className="text-sm text-text-secondary">Ihre individuelle Kostenanalyse</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5">
                      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 via-transparent to-bg-dark/70" />
                      <div className="relative space-y-5 text-sm text-white">
                        <div>
                          <div className="flex items-center justify-between">
                            <span>Ihre SaaS-Kosten ab Jahr 1</span>
                            <span className="font-semibold">{formatCurrency(yearlySaaSCost)}</span>
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
                          <div className="flex items-center justify-between">
                            <span>Open Source ab Jahr 2 (nur Hosting)</span>
                            <span className="font-semibold">{formatCurrency(openSourceAnnual)}</span>
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

                    <div className="border-vae-green/30 bg-vae-green/10 space-y-3 rounded-2xl border p-5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/90">Einsparung im ersten Jahr (inkl. Setup)</span>
                        <span className="text-vae-green text-lg font-semibold">{formatCurrency(yearOneSavings)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/90">Einsparung ab Jahr 2</span>
                        <span className="text-vae-green text-lg font-semibold">{formatCurrency(yearTwoSavings)}</span>
                      </div>
                      <div className="mt-3 border-t border-white/10 pt-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-white">Geschätzter Setup-Aufwand</span>
                          <span className="text-base font-bold text-white">{formatCurrency(estimatedSetupCost)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-text-secondary">
                    Konkrete Einsparungen berechnen wir individuell auf Basis Ihrer Systeme, Lizenzen und Anforderungen.
                  </p>
                </div>
              </LockedSection>

              <div className="space-y-2 text-xs text-text-secondary">
                <p>
                  Diese Darstellung ersetzt keine individuelle Angebotserstellung. Im Beratungsgespräch berücksichtigen
                  wir Verträge, Rabatte und Ihre Steuersituation.
                </p>
              </div>
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
