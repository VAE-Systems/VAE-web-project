/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  SETUP PAGE (INFRASTRUKTUR)                                               ┃
 * ┃  Self-Hosted Setup → Migration von SaaS zu eigener Infrastruktur.         ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎛️ CORE
 * ├── saasToolCategories[] → SaaS-Alternativen-Daten
 * ├── flattenedSaasTools   → Flache Tool-Liste für Calculator
 * ├── CustomLicense[]      → User-definierte Lizenzen
 * └── ProcessPhase[]       → Setup-Prozess-Schritte
 *
 * 🔁 SIDE-EFFECTS
 * └── useSetupCalculatorTutorial → Tutorial-State
 *
 * 🎨 LAYERS
 * ├── Hero Section
 * ├── SaaS Calculator       → Interaktiver Kostenrechner
 * ├── Process Timeline
 * ├── Service Cards Grid
 * └── FAQ + Final CTA
 *
 * 📐 FEATURES
 * ├── Tutorial Overlay      → Geführte Tour durch Calculator
 * └── LockedSection         → Premium-Gated Content
 */

import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  Cpu,
  Database,
  GraduationCap,
  Headphones,
  Layers,
  MessagesSquare,
  Repeat,
  Server,
  ServerCog,
  ShieldCheck,
  SlidersHorizontal,
  UploadCloud,
  Users,
} from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import FeaturePill from '@/components/ui/FeaturePill'
import { BOOKING_LINKS } from '@/config/booking'
import { faqEntries } from '@/content/shared/faqData'
import { flattenedSaasTools, saasToolCategories } from '@/content/shared/saasTools'
import { useSetupCalculatorTutorial } from '@/hooks'
import { cn } from '@/lib/classNames'
import MagneticButton from '../ui/buttons/MagneticButton'
import FaqAccordion from '../ui/FaqAccordion'
import LockedSection from '../ui/LockedSection'
import Seo from '../ui/Seo'
import { SpotlightTutorialOverlay } from '../ui/tutorial/MailBuilderTutorialOverlay'

// ── 🎛️ CORE — Types ──
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

// interface ScenarioCard {
//   icon: React.ElementType
//   title: string
//   description: string
//   highlights: string[]
//   duration: string
//   effort: string
//   featured?: boolean
// }

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

const trustBadges = [
  'Self-Hosted-First',
  'Keine Vendor-Lock-ins',
  'Private AI auf eigener Hardware',
  'Monatliche Fixkosten statt Per-User-Preise',
  'DSGVO ohne Kompromisse',
]

const beforeAfterContent = {
  before: {
    label: 'Vorher',
    title: 'SaaS-Chaos, das abhängig macht',
    body: 'Fragmentierte Tools, unkontrollierbare Kosten, Vendor-Lock-in, keine Datensouveränität, ständige Preiserhöhungen.',
  },
  after: {
    label: 'Nachher',
    title: 'Einheitliche Plattform, die Ihnen gehört',
    body: 'Eigene Plattform, offene Standards, klare Kosten, AI-ready konzipiert.',
  },
} as const

const serviceCards: ServiceCard[] = [
  {
    icon: Server,
    title: 'Infrastructure-Setup',
    description: 'Server-Stack mit Docker, Traefik, SSL, Monitoring und automatisierten Backups – produktionsfertig.',
  },
  {
    icon: UploadCloud,
    title: 'Tool-Installation',
    description: 'Kollaboration, Business-Apps und Automations-Workflows – abgestimmt, integriert und branded.',
  },
  {
    icon: Repeat,
    title: 'Daten-Migration',
    description: 'Sichere Datenübernahme aus Microsoft 365, Google Workspace, Salesforce, Dropbox & Co.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Anpassungen',
    description: 'Workflows, Automationen und Rollenmodelle, exakt passend zu Ihren Prozessen.',
  },
  {
    icon: Users,
    title: 'Team-Training',
    description: 'Workshops, Q&A-Sessions und Enablement-Material, damit das Team sofort arbeitsfähig ist.',
  },
  {
    icon: BookOpen,
    title: 'Dokumentation',
    description:
      'Systemarchitektur, Admin-Runbooks (Betriebshandbuch), User-Guides und Troubleshooting – sauber dokumentiert.',
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
    description: 'Server aufbauen, Systeme einrichten, Integrationen und Workflows abbilden.',
    details: [
      '→ Server-Aufbau (Container-Umgebung, Reverse Proxy, TLS-Konfiguration)',
      '→ Einrichtung der Kernsysteme (Dateien, Kollaboration, Business-Systeme, Automationen)',
      '→ Integration in bestehende Tools und Datenflüsse',
      '→ Einrichtung einer Staging- / Test-Umgebung (abgesicherter Testbetrieb)',
    ],
  },
  {
    number: '03',
    title: 'Migration & Testing (Woche 4–5)',
    description: 'Je nach Ausgangslage migrieren wir produktive Daten, testen End-to-End und schulen Ihr Team.',
    details: [
      '→ Daten-Migration (falls relevant: Dateien, Kontakte, E-Mails und weitere Systeme)',
      '→ Systemtests & QA (End-to-End)',
      '→ Team-Training in den neuen Workflows',
      '→ Abschlussdokumentation für Betrieb und Admins',
    ],
  },
  {
    number: '04',
    title: 'Go-Live & Support (Woche 6+)',
    description: 'Produktiv-Schaltung, Monitoring und 1 Monat Post-Launch-Begleitung inklusive.',
    details: ['→ Go-Live & Monitoring', '→ Optimierungen nach Feedback', '→ Übergabe & Ownership', '→ 1 Monat Support'],
  },
]

const bookingUrl = BOOKING_LINKS.INFRASTRUKTUR_AUDIT
const DEFAULT_VAT_RATE = 19
const TEAM_SIZE_MIN = 5
const TEAM_SIZE_MAX = 200
const MIN_TOOL_SEATS = 1

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

const clampTeamSize = (value: number) => Math.min(TEAM_SIZE_MAX, Math.max(TEAM_SIZE_MIN, value))
const clampToolSeats = (value: number, max: number = TEAM_SIZE_MAX) => Math.min(max, Math.max(MIN_TOOL_SEATS, value))

const SetupPage: React.FC = () => {
  const [teamSize, setTeamSize] = useState(20)
  const isContentLocked = true
  const [customLicenses, setCustomLicenses] = useState<CustomLicense[]>([])
  const [customLicenseForm, setCustomLicenseForm] = useState<CustomLicenseFormState>({
    name: '',
    unitPrice: '',
    quantity: '',
  })
  const [mailHintVisible, setMailHintVisible] = useState(false)
  const mailHintTimeoutRef = useRef<number | null>(null)

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
  const [toolSeatOverrides, setToolSeatOverrides] = useState<Record<string, number>>({})
  const [priceMode, setPriceMode] = useState<'net' | 'gross'>('net')

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

  useEffect(() => {
    return () => {
      if (mailHintTimeoutRef.current) {
        window.clearTimeout(mailHintTimeoutRef.current)
      }
    }
  }, [])

  const handleCustomLicenseFormChange = useCallback((field: keyof CustomLicenseFormState, value: string) => {
    setCustomLicenseForm(prev => ({ ...prev, [field]: value }))
  }, [])

  const canAddCustomLicense = useMemo(() => {
    const price = parseLocalizedNumber(customLicenseForm.unitPrice)
    const quantityValue = parseLocalizedNumber(customLicenseForm.quantity)
    const quantity = Number.isNaN(quantityValue) ? Number.NaN : Math.round(quantityValue)
    return Boolean(customLicenseForm.name.trim()) && price > 0 && quantity > 0
  }, [customLicenseForm])

  const getToolSeatCount = useCallback(
    (toolId: string) => clampToolSeats(toolSeatOverrides[toolId] ?? teamSize, teamSize),
    [teamSize, toolSeatOverrides]
  )

  const clearToolSeatOverride = useCallback((toolId: string) => {
    setToolSeatOverrides(prev => {
      if (!(toolId in prev)) return prev
      const next = { ...prev }
      delete next[toolId]
      return next
    })
  }, [])

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

  const faqAccordionItems = useMemo(() => {
    const setupFaqs = faqEntries.filter(entry => entry.tags?.includes('setup'))
    return setupFaqs.map((item, index) => ({
      id: `setup-faq-${item.id ?? index}`,
      question: item.question,
      defaultOpen: index === 0,
      answer: <p className="text-base leading-relaxed text-text-secondary">{item.answer}</p>,
    }))
  }, [])

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
      return sum + getToolSeatCount(tool.id) * (tool.pricePerUser ?? 0)
    }, 0)
  }, [formatCurrency, getToolSeatCount, toolSelection])

  const customLicensesMonthlyCost = useMemo(() => {
    return customLicenses.reduce((sum, license) => sum + license.unitPrice * license.quantity, 0)
  }, [customLicenses])

  const monthlySaaSCost = useMemo(() => {
    return selectedToolCost + customLicensesMonthlyCost
  }, [selectedToolCost, customLicensesMonthlyCost])

  const yearlySaaSCost = useMemo(() => monthlySaaSCost * 12, [monthlySaaSCost])

  const openSourceMonthly = 50 // konservativer Hosting-Ansatz als Basisbetrag
  const openSourceAnnual = openSourceMonthly * 12

  const scrollToROI = useCallback(() => {
    const target = document.getElementById('roi-calculator')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => {
        startTutorial()
      }, 600)
    }
  }, [startTutorial])

  const activeToolCount = useMemo(
    () => flattenedSaasTools.reduce((count, tool) => (toolSelection[tool.id] ? count + 1 : count), 0),
    [toolSelection]
  )

  const topCategoryInsight = useMemo(() => {
    const totals = saasToolCategories.map(category => {
      const total = category.tools.reduce((sum, tool) => {
        if (!toolSelection[tool.id]) return sum
        if (tool.pricingModel === 'flat') {
          return sum + (tool.flatMonthlyPrice ?? 0)
        }
        return sum + getToolSeatCount(tool.id) * (tool.pricePerUser ?? 0)
      }, 0)
      return { title: category.title, total }
    })

    const top = totals.reduce((acc, item) => (item.total > acc.total ? item : acc), {
      title: 'Keine Auswahl',
      total: 0,
    })

    return top.total > 0 ? `${top.title} (${formatCurrency(top.total)} / Monat)` : 'Keine Auswahl'
  }, [getToolSeatCount, toolSelection])

  const estimatedSetupCost = useMemo(() => {
    const base = 1500
    const perUser = Math.max(teamSize - 5, 0) * 40
    const perTool = activeToolCount * 300
    const raw = base + perUser + perTool
    const clamped = Math.min(5000, Math.max(1500, raw))
    return Math.round(clamped / 100) * 100
  }, [activeToolCount, teamSize])

  const vatMultiplier = DEFAULT_VAT_RATE / 100
  const isGrossMode = priceMode === 'gross'
  const displayMonthlySaaSCost = isGrossMode ? monthlySaaSCost * (1 + vatMultiplier) : monthlySaaSCost
  const displayYearlySaaSCost = isGrossMode ? yearlySaaSCost * (1 + vatMultiplier) : yearlySaaSCost
  const displayOpenSourceAnnual = isGrossMode ? openSourceAnnual * (1 + vatMultiplier) : openSourceAnnual
  const displaySetupCost = isGrossMode ? estimatedSetupCost * (1 + vatMultiplier) : estimatedSetupCost
  const costModeLabel = isGrossMode ? 'brutto' : 'netto'
  const costModeNote = isGrossMode
    ? `Alle Beträge inkl. ${DEFAULT_VAT_RATE}% USt.`
    : `Alle Beträge netto; ${DEFAULT_VAT_RATE}% USt. kämen hinzu.`

  const maxComparisonValue = Math.max(displayYearlySaaSCost, displayOpenSourceAnnual, 1)
  const yearOneSavings = Math.max(0, displayYearlySaaSCost - (displaySetupCost + displayOpenSourceAnnual))
  const yearTwoSavings = Math.max(0, displayYearlySaaSCost - displayOpenSourceAnnual)

  const buildSavingsMailto = useCallback(() => {
    const selectedTools = flattenedSaasTools.filter(tool => toolSelection[tool.id])

    const selectedToolLines = selectedTools.map(tool => {
      const seats = tool.pricingModel === 'perUser' ? getToolSeatCount(tool.id) : undefined
      const monthly =
        tool.pricingModel === 'flat' ? (tool.flatMonthlyPrice ?? 0) : (tool.pricePerUser ?? 0) * (seats ?? teamSize)
      const detail =
        tool.pricingModel === 'flat'
          ? `${formatCurrency(tool.flatMonthlyPrice ?? 0)} / Monat`
          : `${formatCurrency(tool.pricePerUser ?? 0)} pro Nutzer:in × ${seats ?? teamSize} → ${formatCurrency(monthly)} / Monat`
      return `- ${tool.name}: ${detail}`
    })

    const customLicenseLines = customLicenses.map(license => {
      const monthly = license.unitPrice * license.quantity
      return `- ${license.name}: ${license.quantity} x ${formatCurrency(license.unitPrice)} = ${formatCurrency(monthly)} / Monat`
    })

    const bodyLines = [
      'Hallo VAE-Team,',
      '',
      'ich möchte mein Sparpotenzial berechnen und habe den SaaS-Kosten-Radar ausgefüllt.',
      '',
      `Teamgröße: ${teamSize} Personen`,
      '',
      `Ausgewählte SaaS-Tools (${selectedTools.length}):`,
      selectedToolLines.length ? selectedToolLines.join('\n') : '- (keine ausgewählt)',
      '',
      'Weitere Lizenzen / Spezial-Posten:',
      customLicenseLines.length ? customLicenseLines.join('\n') : '- (keine ergänzt)',
      '',
      `Preis-Modus: ${isGrossMode ? `Brutto (inkl. ${DEFAULT_VAT_RATE}% USt.)` : 'Netto'}`,
      '',
      'Aktuelle Kosten:',
      `- Monatlich: ${formatCurrency(displayMonthlySaaSCost)}`,
      `- Jährlich: ${formatCurrency(displayYearlySaaSCost)}`,
      '',
      'Bitte meldet euch für eine kurze Abstimmung.',
      'Vielen Dank!',
    ]

    const subject = 'Sparpotenzial berechnen – Infrastruktur'
    return `mailto:juliangoertz@vae.systems?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`
  }, [
    customLicenses,
    displayMonthlySaaSCost,
    displayYearlySaaSCost,
    formatCurrency,
    getToolSeatCount,
    isGrossMode,
    teamSize,
    toolSelection,
  ])

  const highlightMonthlyNet = useValueIncreaseHighlight(displayMonthlySaaSCost)
  const highlightYearlyNet = useValueIncreaseHighlight(displayYearlySaaSCost)

  const handleUnlockContent = useCallback(() => {
    const mailto = buildSavingsMailto()
    window.location.href = mailto
    setMailHintVisible(true)
    if (mailHintTimeoutRef.current) {
      window.clearTimeout(mailHintTimeoutRef.current)
    }
    mailHintTimeoutRef.current = window.setTimeout(() => {
      setMailHintVisible(false)
    }, 4500)
  }, [buildSavingsMailto])

  const getValueClasses = useCallback(
    (isHighlighted: boolean) =>
      cn(
        'text-lg font-semibold text-gray-900 dark:text-white',
        isHighlighted
          ? 'text-red-600 drop-shadow-[0_0_8px_rgba(248,113,113,0.35)] dark:text-red-300'
          : 'text-gray-600 dark:text-text-secondary'
      ),
    []
  )

  const getBarWidth = useCallback(
    (value: number) => {
      if (value <= 0 || maxComparisonValue <= 0) return '0%'
      const percent = (value / maxComparisonValue) * 100
      return `${Math.max(percent, 5)}%`
    },
    [maxComparisonValue]
  )

  return (
    <div className="relative z-0 bg-bg-darker text-text-light">
      <Seo
        title="Self-Hosted Infrastruktur Setup | VAE Systems"
        description="Self-Hosted-Infrastruktur statt SaaS: Open-Source-Stacks für Kollaboration, Business-Apps und Automations-Workflows. Migration, Security & Dokumentation inklusive. Heidelberg & deutschlandweit."
        canonicalPath="/leistungen/infrastruktur"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Infrastruktur-Setup',
          provider: {
            '@type': 'Organization',
            name: 'VAE Systems UG',
            url: 'https://vae-systems.com',
          },
          areaServed: {
            '@type': 'Place',
            name: 'Deutschland',
          },
          description:
            'Self-Hosted-Infrastruktur aufbauen: Open-Source-Stacks für CRM, Projektmanagement und Kommunikation. Migration & Security inklusive.',
          offers: {
            '@type': 'Offer',
            url: 'https://vae-systems.com/leistungen/infrastruktur',
            priceCurrency: 'EUR',
            price: 'auf Anfrage',
          },
        }}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#030806] text-white">
        {/* Hero Background Image */}
        <div
          className="pointer-events-none absolute inset-0 hidden overflow-hidden opacity-[0.22] md:block"
          style={{
            backgroundImage: 'url(/images/optimized/Jakob-steht-Vor-Tafel-für-Strategie.webp)',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            filter: 'grayscale(1)',
          }}
          role="presentation"
        />
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.22] md:hidden"
          style={{
            backgroundImage: 'url(/images/optimized/Jakob-steht-Vor-Tafel-für-Strategie.webp)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            filter: 'grayscale(1)',
          }}
          role="presentation"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(var(--vae-turquoise-rgb),0.14),transparent_35%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-vae-turquoise" />
        <div className="pointer-events-none absolute right-[-4vw] top-8 hidden select-none text-[18vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.03] xl:block">
          VAE
        </div>

        <div className="container-vae relative z-10 py-20 sm:py-24 lg:py-28">
          <div className="flex flex-col gap-8">
            {/* Eyebrow */}
            <div className="inline-flex w-fit items-center gap-2 border border-vae-turquoise/35 bg-black px-4 py-2 text-[11px] font-bold uppercase tracking-[0.34em] text-vae-turquoise shadow-[0_0_0_1px_rgba(0,0,0,0.35)]">
              <ServerCog className="h-3.5 w-3.5" /> Infrastruktur Design / Setup
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="max-w-4xl">
                <span className="block text-[13vw] font-black uppercase leading-[0.88] tracking-[-0.08em] text-white sm:text-6xl lg:text-[5.2rem] xl:text-[5.8rem]">
                  Raus aus
                </span>
                <span className="mt-2 inline-block bg-vae-turquoise px-3 py-2 text-[11vw] font-black uppercase leading-[0.88] tracking-[-0.08em] text-black sm:px-5 sm:py-3 sm:text-5xl lg:text-[4.4rem] xl:text-[5rem]">
                  dem SaaS-Stapel.
                </span>
              </h1>
              <div className="max-w-2xl border-l-4 border-white pl-4 text-base leading-relaxed text-white/75 sm:text-lg">
                Wir ersetzen fragmentierte Cloud-Tools durch eine einheitliche Plattform auf Ihrem Server — in 3–6
                Wochen, produktiv, dokumentiert.
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticButton intensity={0.08} scaleEffect glowEffect className="isolate w-full sm:w-auto">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 bg-white px-8 py-5 text-base font-black uppercase tracking-[0.12em] text-black shadow-[0_18px_50px_-24px_rgba(255,255,255,0.45)] transition-transform hover:-translate-y-0.5 sm:w-auto"
                >
                  Kostenloses Erstgespräch buchen
                </a>
              </MagneticButton>
              <MagneticButton intensity={0.05} scaleEffect className="isolate w-full sm:w-auto">
                <button
                  onClick={() => {
                    scrollToROI()
                    setTimeout(() => startTutorial(), 600)
                  }}
                  className="flex w-full items-center justify-center gap-2 border border-white/20 bg-transparent px-6 py-5 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-vae-turquoise hover:bg-white/5 sm:w-auto"
                >
                  ROI-Rechner ansehen ↓
                </button>
              </MagneticButton>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              {trustBadges.map(badge => (
                <div
                  key={badge}
                  className="flex items-center gap-2 border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70"
                >
                  <Check className="h-4 w-4 flex-shrink-0 text-vae-turquoise" /> {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-card-container border-b bg-[#f4f1ec] dark:border-white/5 dark:bg-bg-darker"
        id="study"
        style={{
          clipPath: 'polygon(0 3vw, 100% 0, 100% 100%, 0 100%)',
          marginTop: '-3vw',
          paddingTop: 'calc(5rem + 3vw)',
          paddingBottom: '5rem',
        }}
      >
        <div className="section-card-backdrop" />

        <div className="container-vae relative">
          <div className="mb-12 text-center">
            <h2 className="h2 heading-gradient mb-4">Warum Unternehmen auf selbstgehostete Lösungen setzen</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-700 dark:text-text-secondary">
              SaaS-Kosten explodieren, Vendor Lock-in wird zum Risiko – Self-Hosted-First ist die Antwort.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Statistik 1: SaaS-Explosion */}
            <div className="rounded-2xl border border-vae-turquoise/30 bg-white/80 p-8 dark:border-vae-turquoise/20 dark:bg-white/5">
              <div className="mb-4 text-5xl font-bold text-vae-turquoise">85%</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">SaaS-Dominanz 2025</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                85% der Softwarenutzung 2025 ist SaaS – mit massivem Waste.
              </p>
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                Quelle:{' '}
                <a
                  href="https://jumpcloud.com/blog/saas-usage-statistics-how-much-is-too-much"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vae-turquoise hover:underline"
                >
                  JumpCloud 2025
                </a>
              </p>
            </div>

            {/* Statistik 2: Vendor Lock-in */}
            <div className="rounded-2xl border border-vae-turquoise/30 bg-white/80 p-8 dark:border-vae-turquoise/20 dark:bg-white/5">
              <div className="mb-4 text-5xl font-bold text-vae-turquoise">80%</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Preisanstieg IBM Software</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                80% Preisanstieg (2015–2025) – Vendor Lock-in wird zum Kostenfaktor.
              </p>
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                Quelle:{' '}
                <a
                  href="https://www.metrics.biz/en/blog-post/reducing-risks-from-vendor-lock-in.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vae-turquoise hover:underline"
                >
                  Metrics.biz 2025
                </a>
              </p>
            </div>

            {/* Statistik 3: Open Source-Adoption */}
            <div className="rounded-2xl border border-vae-turquoise/30 bg-white/80 p-8 dark:border-vae-turquoise/20 dark:bg-white/5">
              <div className="mb-4 text-5xl font-bold text-vae-turquoise">96%</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Open Source-Adoption</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                96% der Enterprises erhöhen Open-Source-Nutzung – trotz Skills-Gaps.
              </p>
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                Quelle:{' '}
                <a
                  href="https://www.developer-tech.com/news/enterprise-open-source-adoption-soars-despite-challenges/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vae-turquoise hover:underline"
                >
                  Perforce 2025
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Section 2 */}
      <section
        className="section-card-container border-b bg-[#faf8f4] py-20 dark:border-white/5 dark:bg-bg-darker"
        id="definition"
      >
        <div className="section-card-backdrop" />

        <div className="container-vae relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center xl:max-w-6xl 2xl:max-w-7xl">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/60">
              Infrastructure-Design
            </p>
            <h2 className="text-3xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-gray-900 dark:text-white md:text-4xl">
              Systeme, die zusammenarbeiten. Nicht gegeneinander.
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-text-secondary">
              Wir bauen Informationsinfrastruktur, die Daten, Workflows und Systeme integriert. Vendor-neutral,
              bevorzugt selbst gehostet, mit offenen Standards, wartbar.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 sm:items-stretch">
              <div className="flex h-full flex-col gap-3 border border-red-200/60 bg-white/75 p-5 dark:border-red-500/20 dark:bg-white/5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red-500 dark:text-red-300/90">
                  Problem
                </p>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                  Verstreute Daten, Vendor Lock-ins und fehlender Überblick schwächen Organisationen. Neue Tools
                  verschärfen das Problem, wenn die Grundlage nicht stimmt.
                </p>
              </div>

              <div className="flex h-full flex-col gap-3 border border-vae-turquoise/30 bg-vae-turquoise/5 p-5 dark:border-vae-turquoise/25 dark:bg-vae-turquoise/15">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-vae-turquoise">
                  Unsere Lösung
                </p>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                  Wir analysieren Ihre Landschaft, entwerfen eine vendor-neutrale Architektur und setzen sie bevorzugt
                  selbst gehostet um (Open Source, wo es den größten Hebel liefert).
                </p>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-vae-turquoise/70" aria-hidden />
                    Migration, Konfiguration, Dokumentation, Team-Schulung.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-vae-turquoise/70" aria-hidden />
                    Ergebnis: Betriebsbereites System.
                  </li>
                </ul>
              </div>
            </div>

            <div className="border border-gray-300/70 bg-gray-50/70 p-5 dark:border-white/10 dark:bg-white/5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-secondary/80">
                    Buchung
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Direkt oder nach Strategieberatung.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <MagneticButton intensity={0.06} scaleEffect>
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-convert inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold"
                    >
                      <span>Direkt buchen</span>
                    </a>
                  </MagneticButton>
                  <MagneticButton intensity={0.06}>
                    <a
                      href="/leistungen/strategie"
                      className="btn-outline inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold"
                    >
                      <span>Strategieberatung</span>
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
          <AnimatedBeforeAfter />
        </div>
      </section>

      {/* Section 3 - Produktionsreife Systeme */}
      <section className="section-card-container bg-[#f4f1ec] py-20 dark:bg-bg-dark">
        <div className="section-card-backdrop" />

        <div className="container-vae relative">
          <header className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-vae-turquoise">Ihre Infrastruktur</p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-gray-900 dark:text-white md:text-5xl">
              Produktionsreife Systeme
            </h2>
            <p className="mt-4 text-base text-gray-700 dark:text-text-secondary md:text-lg">
              Vollständig konfiguriert, dokumentiert und unter Ihrer Kontrolle
            </p>
          </header>

          {/* Feature Highlights */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center bg-vae-turquoise/15">
                <Server className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h4 className="mb-2 text-sm font-black uppercase tracking-[0.1em] text-gray-900 dark:text-white">
                Auf Ihren Servern
              </h4>
              <p className="text-sm text-gray-600 dark:text-text-secondary">
                Volle Datenkontrolle, keine Cloud-Abhängigkeit
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center bg-vae-turquoise/15">
                <Users className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h4 className="mb-2 text-sm font-black uppercase tracking-[0.1em] text-gray-900 dark:text-white">
                Intuitiv bedienbar
              </h4>
              <p className="text-sm text-gray-600 dark:text-text-secondary">Moderne UI/UX, schnelle Einarbeitung</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center bg-vae-turquoise/15">
                <ShieldCheck className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h4 className="mb-2 text-sm font-black uppercase tracking-[0.1em] text-gray-900 dark:text-white">
                Enterprise-Ready
              </h4>
              <p className="text-sm text-text-secondary">Security, Backups, Monitoring inklusive</p>
            </div>
          </div>

          {/* Infrastructure Images */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative overflow-hidden border border-gray-200/60 bg-white/80 dark:border-white/10 dark:bg-white/5">
                <picture>
                  <source
                    srcSet="/images/optimized/Bild-von-Login-Screen-in-die-VAE-Cloud-als-Beispiel-für-Infrastruktur.webp"
                    type="image/webp"
                  />
                  <img
                    src="/images/optimized/Bild-von-Login-Screen-in-die-VAE-Cloud-als-Beispiel-für-Infrastruktur.webp"
                    alt="Login-Screen der VAE-Cloud: Moderne Infrastruktur mit Single-Sign-On"
                    loading="lazy"
                    className="h-full w-full object-cover"
                    width={1600}
                    height={1067}
                    sizes="(min-width: 768px) 40vw, 90vw"
                  />
                </picture>
              </div>

              <div className="relative overflow-hidden border border-gray-200/60 bg-white/80 dark:border-white/10 dark:bg-white/5">
                <picture>
                  <source
                    srcSet="/images/optimized/Bild-von-OpenProject-Ticketing-Software-2-bester-blick.jpg"
                    type="image/jpeg"
                  />
                  <img
                    src="/images/optimized/Bild-von-OpenProject-Ticketing-Software-2-bester-blick.jpg"
                    alt="OpenProject Ticketing-System: Projektmanagement und Aufgabenverwaltung"
                    loading="lazy"
                    className="h-full w-full object-cover"
                    width={1600}
                    height={1067}
                    sizes="(min-width: 768px) 40vw, 90vw"
                  />
                </picture>
              </div>
            </div>
            <p className="mt-6 text-center text-sm leading-relaxed text-text-secondary">
              Ihre Infrastruktur – produktionsreif, sicher und vollständig unter Ihrer Kontrolle.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Nach dem Setup */}
      <section className="section-card-container border-b border-white/10 bg-[#030806] py-20 text-white">
        <div className="section-card-backdrop" />
        <div className="container-vae relative">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-vae-turquoise">Nach dem Setup</p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-white md:text-5xl">
              Ihre Infrastruktur. Ihre Entscheidung.
            </h2>
            <p className="mt-4 text-base text-white/65 md:text-lg">
              Eigenständiger Betrieb oder langfristige VAE-Betreuung — Sie wählen das Modell, das zu Ihrem Team passt.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Option 1: Setup + Übergabe */}
            <div className="group relative flex h-full flex-col gap-4 overflow-hidden border-2 border-white/15 bg-white/[0.04] p-8 text-white transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/40">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-vae-turquoise/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-gradient-to-r dark:from-vae-turquoise/0 dark:via-vae-turquoise/40 dark:to-vae-turquoise/0" />

              <div className="inline-flex h-12 w-12 items-center justify-center border border-vae-turquoise/30 bg-vae-turquoise/10 transition-transform duration-300 group-hover:scale-110">
                <CheckCircle2 className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h3 className="text-2xl font-black uppercase leading-[0.92] tracking-[-0.04em] text-white">
                Setup + Übergabe
              </h3>
              <p className="text-base leading-relaxed text-gray-700 dark:text-text-secondary">
                Wir implementieren die Infrastruktur, dokumentieren alles detailliert und schulen Ihr Team. Übergabe der
                Artefakte und Aufzeichnungen erfolgt über unsere sichere Kunden-App (Chat & Files), damit Ihr Team
                direkt loslegen kann.
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                  <span className="text-sm text-gray-700 dark:text-text-secondary">
                    Vollständige Dokumentation & Runbooks (Betriebshandbuch)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                  <span className="text-sm text-gray-700 dark:text-text-secondary">
                    Team-Schulungen für eigenständigen Betrieb
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                  <span className="text-sm text-gray-700 dark:text-text-secondary">
                    Knowledge-Transfer & Best Practices
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                  <span className="text-sm text-gray-700 dark:text-text-secondary">
                    1 Monat Post-Launch-Support inklusive
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                  <span className="text-sm text-gray-700 dark:text-text-secondary">
                    Übergabe & Dateien über Kunden-App (Chat & Files) für Ihr Team bereitgestellt
                  </span>
                </li>
              </ul>
            </div>

            {/* Option 2: Setup + Langfristige Betreuung */}
            <div className="group relative flex h-full flex-col gap-4 overflow-hidden border-2 border-vae-turquoise/40 bg-vae-turquoise/[0.06] p-8 text-white transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/70">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-vae-turquoise/50 dark:bg-gradient-to-r dark:from-vae-turquoise/0 dark:via-vae-turquoise dark:to-vae-turquoise/0" />

              <div className="inline-flex h-12 w-12 items-center justify-center border border-vae-turquoise/40 bg-vae-turquoise/15 transition-transform duration-300 group-hover:scale-110">
                <Users className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h3 className="text-2xl font-black uppercase leading-[0.92] tracking-[-0.04em] text-white">
                Setup + Langfristige Betreuung
              </h3>
              <p className="text-base leading-relaxed text-slate-700 dark:text-text-secondary">
                Wir implementieren die Infrastruktur und übernehmen anschließend die langfristige Instandhaltung,
                Weiterentwicklung und das Monitoring. Übergaben und laufende Kommunikation laufen über unsere
                Kundenplattform mit integriertem Chat und sicherem Cloud-Share – Sie konzentrieren sich voll auf Ihr
                Kerngeschäft.
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                  <span className="text-sm text-slate-700 dark:text-text-secondary">
                    Kontinuierliche Updates & Security-Patches
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                  <span className="text-sm text-slate-700 dark:text-text-secondary">
                    24/7-Monitoring & proaktive Wartung
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                  <span className="text-sm text-slate-700 dark:text-text-secondary">
                    Performance-Optimierung & Skalierung
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                  <span className="text-sm text-slate-700 dark:text-text-secondary">
                    Flexible Betreuungsmodelle (monatlich kündbar)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                  <span className="text-sm text-slate-700 dark:text-text-secondary">
                    Verbindliche SLAs mit klaren Reaktionszeiten; Accounts werden bei Bedarf erweitert
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  {/* gold check for highlighted customer portal feature */}
                  <svg className="h-5 w-5 flex-shrink-0 text-amber-400" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <FeaturePill variant="gold">
                    Kundenaccount (Chat & Files) für Übergaben, Reports und Abstimmungen
                  </FeaturePill>
                </li>
              </ul>
              <div className="mt-6 flex justify-center">
                <MagneticButton intensity={0.05} scaleEffect>
                  <Link
                    to="/leistungen/betreuung#service-levels"
                    className="inline-flex items-center gap-2 bg-vae-turquoise px-7 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition-transform hover:-translate-y-0.5"
                  >
                    <span>Betreuungsmodelle ansehen</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Hinweis zu Hosting-Optionen */}
          <div className="mx-auto mt-10 max-w-3xl border-2 border-vae-turquoise/30 bg-vae-turquoise/5 p-6">
            <p className="text-center text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
              <strong className="text-gray-900 dark:text-white">Hosting-Optionen:</strong> Detaillierte Informationen zu
              den verschiedenen Deployment-Modellen finden Sie{' '}
              <Link
                to="/leistungen/betreuung#deployment-modelle"
                className="accent-link whitespace-nowrap font-semibold text-vae-turquoise underline decoration-vae-turquoise/30 underline-offset-2 transition-colors hover:decoration-vae-turquoise"
              >
                in der Hosting-Sektion →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 - Original Content */}
      <section className="section-card-container bg-[#faf8f4] py-20 dark:bg-bg-darker">
        <div className="section-card-backdrop" />

        <div className="container-vae relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-vae-turquoise">Was ist enthalten?</p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-gray-900 dark:text-white md:text-5xl">
              Was Sie erhalten
            </h2>
            <p className="mt-3 text-lg text-gray-700 dark:text-text-secondary">
              Vollständiges Setup, produktionsbereit, ohne versteckte Kosten.
            </p>
          </div>
          <div className="card-group mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map(card => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className="group relative flex h-full flex-col overflow-hidden border border-vae-turquoise/30 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/60 hover:shadow-md dark:border-vae-turquoise/20 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-vae-turquoise/50 opacity-80 transition-opacity duration-300 group-hover:opacity-100 dark:bg-gradient-to-r dark:from-vae-turquoise/0 dark:via-vae-turquoise/40 dark:to-vae-turquoise/0" />

                  <div className="relative mb-4 inline-flex h-12 w-12 items-center justify-center overflow-hidden bg-vae-turquoise/15 text-vae-turquoise ring-1 ring-vae-turquoise/40 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="relative z-[1] h-6 w-6" />
                    <div className="absolute inset-0 opacity-0 dark:bg-vae-turquoise/10 dark:opacity-100 dark:blur-[14px]" />
                  </div>

                  <h3 className="mb-3 text-lg font-black uppercase leading-[0.92] tracking-[-0.04em] text-gray-900 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-text-secondary">{card.description}</p>

                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:opacity-0">
                    <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-vae-turquoise/10 dark:via-transparent dark:to-vae-turquoise/10" />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Hinweis zu individueller Planung */}
          <p className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
            Jedes Setup wird individuell geplant – abhängig von Teamgröße, Prozessen und bestehender Landschaft.
            Konkrete Stack-Vorschläge erhalten Sie im{' '}
            <span className="font-medium text-vae-turquoise">kostenlosen Erstgespräch</span>.
          </p>
        </div>
      </section>

      {/* Section 4 ROI */}
      <section
        id="roi-calculator"
        ref={calculatorSectionRef}
        className="border-y border-vae-turquoise/10 bg-[#f4f1ec] py-20 dark:border-white/5 dark:bg-bg-dark"
      >
        <div className="container-vae">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-vae-turquoise">SaaS-Kosten-Radar</p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-gray-900 dark:text-white md:text-5xl">
              Was kostet Ihre SaaS-Landschaft wirklich?
            </h2>
            <p className="mt-3 text-lg text-gray-600 dark:text-text-secondary">
              Ermitteln Sie Ihr Einsparpotenzial – wir erstellen Ihnen ein Angebot für eine Cloud-Alternative ohne
              Vendor-Lock-in.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <MagneticButton intensity={0.05}>
                <button
                  onClick={startTutorial}
                  className="btn-outline inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em]"
                >
                  <GraduationCap className="h-4 w-4" />
                  Guided Tour starten
                </button>
              </MagneticButton>
              <span className="text-xs font-medium text-gray-600 dark:text-text-secondary">
                Interaktive Anleitung (2 Min)
              </span>
            </div>
          </div>
          <div className="mt-12 grid gap-8 border border-gray-200/80 bg-white p-8 dark:border-white/10 dark:bg-white/5 lg:grid-cols-2">
            <div className="space-y-8">
              <div data-calculator-tutorial="team-size">
                <label
                  htmlFor="team-size-slider"
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-700 dark:text-text-secondary"
                >
                  Anzahl Mitarbeitende (lizenzpflichtig)
                </label>
                <div className="mt-4 flex flex-col gap-4">
                  <input
                    id="team-size-slider"
                    type="range"
                    min={TEAM_SIZE_MIN}
                    max={TEAM_SIZE_MAX}
                    value={teamSize}
                    onChange={event => setTeamSize(clampTeamSize(Number(event.target.value)))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-vae-turquoise dark:bg-white/10"
                  />
                  <div className="flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-white">
                    {teamSize} Personen
                    <input
                      type="number"
                      min={TEAM_SIZE_MIN}
                      max={TEAM_SIZE_MAX}
                      value={teamSize}
                      onChange={event => setTeamSize(clampTeamSize(Number(event.target.value) || TEAM_SIZE_MIN))}
                      className="w-24 rounded-xl border border-gray-200 bg-white px-3 py-2 text-right text-base text-gray-900 focus:border-vae-turquoise/60 focus:outline-none focus:ring-2 focus:ring-vae-turquoise/40 focus:ring-offset-2 focus:ring-offset-white dark:border-white/10 dark:bg-bg-darker dark:text-white dark:focus:border-vae-turquoise/60 dark:focus:ring-vae-turquoise/60 dark:focus:ring-offset-bg-darker"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-5" data-calculator-tutorial="tools">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-700 dark:text-text-secondary">
                  Ihre aktuellen SaaS-Tools
                </p>
                <div className="space-y-4">
                  {saasToolCategories.map(category => (
                    <div
                      key={category.id}
                      className="border border-vae-turquoise/25 bg-[#f4f1ec] p-4 dark:border-white/10 dark:bg-bg-darker/40"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="inline-flex items-center rounded-full border border-vae-turquoise/30 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-gray-700 shadow-[0_8px_20px_-16px_rgba(12,74,52,0.35)] dark:border-white/10 dark:bg-bg-darker/60 dark:text-text-secondary/80 dark:shadow-none">
                          {category.title}
                        </span>
                      </div>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500 dark:text-text-secondary/60">
                        {category.selectionMode === 'multi' ? 'Mehrfachauswahl möglich' : 'Einzelauswahl pro Kategorie'}
                      </p>
                      <div className="mt-3 space-y-3">
                        {category.tools.map(tool => (
                          <label
                            key={tool.id}
                            className={cn(
                              'flex items-start justify-between gap-3 rounded-2xl border px-4 py-3 text-sm transition',
                              toolSelection[tool.id]
                                ? 'border-2 border-vae-turquoise/80 bg-[#ecfbf6] text-gray-900 shadow-[0_14px_30px_-22px_rgba(12,74,52,0.32)] dark:border-vae-turquoise/50 dark:bg-vae-turquoise/15 dark:text-white dark:shadow-none'
                                : 'border-gray-200 bg-white text-gray-700 shadow-[0_10px_26px_-24px_rgba(15,23,42,0.2)] hover:border-vae-turquoise/40 dark:border-white/10 dark:bg-bg-darker dark:text-text-secondary dark:hover:border-white/30'
                            )}
                          >
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 dark:text-white">{tool.name}</p>
                              <p className="text-xs text-gray-600 dark:text-text-secondary/80">
                                {tool.pricingModel === 'perUser'
                                  ? `${formatCurrency(tool.pricePerUser ?? 0)} pro Nutzer:in/Monat (netto)`
                                  : `${formatCurrency(tool.flatMonthlyPrice ?? 0)} pro Monat (netto)`}
                              </p>
                              {tool.pricingModel === 'perUser' && toolSelection[tool.id] && (
                                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-gray-600 dark:text-text-secondary/80">
                                  <span>Nutzer:innen</span>
                                  <input
                                    type="number"
                                    min={MIN_TOOL_SEATS}
                                    max={TEAM_SIZE_MAX}
                                    value={getToolSeatCount(tool.id)}
                                    onChange={event => {
                                      const parsed = Number(event.target.value)
                                      const safeValue = Number.isNaN(parsed) ? MIN_TOOL_SEATS : parsed
                                      setToolSeatOverrides(prev => ({
                                        ...prev,
                                        [tool.id]: clampToolSeats(safeValue, teamSize),
                                      }))
                                    }}
                                    className="w-20 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs text-gray-900 focus:border-vae-turquoise/60 focus:outline-none focus:ring-2 focus:ring-vae-turquoise/40 focus:ring-offset-2 focus:ring-offset-white dark:border-white/10 dark:bg-bg-darker/70 dark:text-white dark:focus:border-vae-turquoise/60 dark:focus:ring-vae-turquoise/60 dark:focus:ring-offset-bg-darker"
                                  />
                                  <span className="text-gray-500 dark:text-text-secondary/60">von {teamSize}</span>
                                  <button
                                    type="button"
                                    onClick={() => clearToolSeatOverride(tool.id)}
                                    className="text-[11px] font-semibold text-vae-turquoise/80 transition hover:text-vae-turquoise"
                                  >
                                    Reset
                                  </button>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {toolSelection[tool.id] && (
                                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-vae-turquoise/70">
                                  Aktiv
                                </span>
                              )}
                              <input
                                type="checkbox"
                                checked={toolSelection[tool.id]}
                                onChange={event => {
                                  const isChecked = event.target.checked
                                  const isSingleSelection = category.selectionMode !== 'multi'
                                  setToolSelection(prev => {
                                    const next = { ...prev }
                                    if (isSingleSelection && isChecked) {
                                      category.tools.forEach(categoryTool => {
                                        next[categoryTool.id] = false
                                      })
                                    }
                                    next[tool.id] = isChecked
                                    return next
                                  })
                                }}
                                className="h-5 w-5 rounded border-gray-300 bg-white text-vae-turquoise outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/30 dark:bg-black/30 dark:focus-visible:ring-vae-turquoise/60 dark:focus-visible:ring-offset-bg-darker"
                              />
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-bg-darker/60">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-700 dark:text-text-secondary">
                  Weitere Lizenzen hinzufügen
                </p>
                <p className="mt-1 text-xs text-gray-600 dark:text-text-secondary">
                  Für Spezial-Tools, parallele Lösungen innerhalb einer Kategorie oder Pakete ohne Seat-basierte
                  Abrechnung.
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-text-secondary/80">Alle Eingaben netto.</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <input
                    type="text"
                    value={customLicenseForm.name}
                    onChange={event => handleCustomLicenseFormChange('name', event.target.value)}
                    placeholder="Tool-Name"
                    className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-vae-turquoise/60 focus:outline-none focus:ring-2 focus:ring-vae-turquoise/40 focus:ring-offset-2 focus:ring-offset-white dark:border-white/10 dark:bg-bg-darker dark:text-white dark:placeholder:text-text-secondary dark:focus:border-vae-turquoise/60 dark:focus:ring-vae-turquoise/60 dark:focus:ring-offset-bg-darker"
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    value={customLicenseForm.unitPrice}
                    onChange={event => handleCustomLicenseFormChange('unitPrice', event.target.value)}
                    placeholder="Preis pro Nutzer"
                    className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-vae-turquoise/60 focus:outline-none focus:ring-2 focus:ring-vae-turquoise/40 focus:ring-offset-2 focus:ring-offset-white dark:border-white/10 dark:bg-bg-darker dark:text-white dark:placeholder:text-text-secondary dark:focus:border-vae-turquoise/60 dark:focus:ring-vae-turquoise/60 dark:focus:ring-offset-bg-darker"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    value={customLicenseForm.quantity}
                    onChange={event => handleCustomLicenseFormChange('quantity', event.target.value)}
                    placeholder="Anzahl Nutzer:innen"
                    className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-vae-turquoise/60 focus:outline-none focus:ring-2 focus:ring-vae-turquoise/40 focus:ring-offset-2 focus:ring-offset-white dark:border-white/10 dark:bg-bg-darker dark:text-white dark:placeholder:text-text-secondary dark:focus:border-vae-turquoise/60 dark:focus:ring-vae-turquoise/60 dark:focus:ring-offset-bg-darker"
                  />
                </div>
                <button
                  type="button"
                  onClick={addCustomLicense}
                  disabled={!canAddCustomLicense}
                  className={cn(
                    'mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold transition',
                    canAddCustomLicense
                      ? 'bg-vae-turquoise text-white hover:border-vae-turquoise/70 hover:bg-vae-turquoise/90 dark:bg-vae-turquoise/20 dark:text-white dark:hover:border-vae-turquoise/40 dark:hover:bg-vae-turquoise/30'
                      : 'cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-white/5 dark:text-text-secondary'
                  )}
                >
                  Lizenz hinzufügen
                </button>
                {customLicenses.length > 0 && (
                  <div className="mt-4 space-y-3 border-t border-white/5 pt-4">
                    {customLicenses.map(license => (
                      <div
                        key={license.id}
                        className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-900 dark:text-white"
                      >
                        <div>
                          <p className="font-semibold">{license.name}</p>
                          <p className="text-xs text-gray-600 dark:text-text-secondary">
                            {license.quantity} × {formatCurrency(license.unitPrice)} pro Monat
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{formatCurrency(license.unitPrice * license.quantity)}</span>
                          <button
                            type="button"
                            onClick={() => removeCustomLicense(license.id)}
                            className="text-xs font-semibold text-gray-500 transition hover:text-gray-900 dark:text-text-secondary dark:hover:text-white"
                          >
                            Entfernen
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-500 dark:text-text-secondary/70">
                Hinweis: Die angezeigten Standardpreise beruhen auf öffentlich verfügbaren Quellen und dienen nur als
                Orientierung. Anbieter können Tarife und Steuersätze jederzeit ändern.
              </p>
            </div>

            <div
              className="space-y-6 border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-bg-darker/60 lg:sticky lg:top-24 lg:self-start"
              data-calculator-tutorial="results"
            >
              <div className="h-1 w-full rounded-full bg-gradient-to-r from-vae-turquoise/0 via-vae-turquoise/40 to-vae-turquoise/0 dark:from-vae-turquoise/0 dark:via-vae-turquoise/25 dark:to-vae-turquoise/0" />
              <div className="border border-red-200 bg-red-50 p-5 dark:border-red-500/40 dark:bg-red-500/5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-600 dark:text-red-400">
                    Ihre aktuellen SaaS-Kosten
                  </p>
                  <div className="inline-flex rounded-full border border-gray-200 bg-gray-100 p-1 text-[11px] font-semibold uppercase tracking-[0.2em] dark:border-white/10 dark:bg-white/5">
                    <button
                      type="button"
                      onClick={() => setPriceMode('net')}
                      className={cn(
                        'rounded-full px-3 py-1 transition',
                        priceMode === 'net'
                          ? 'bg-vae-turquoise text-white shadow-[0_8px_18px_-12px_rgba(8,255,193,0.6)]'
                          : 'text-gray-600 hover:text-gray-900 dark:text-text-secondary dark:hover:text-white'
                      )}
                    >
                      Netto
                    </button>
                    <button
                      type="button"
                      onClick={() => setPriceMode('gross')}
                      className={cn(
                        'rounded-full px-3 py-1 transition',
                        priceMode === 'gross'
                          ? 'bg-vae-turquoise text-white shadow-[0_8px_18px_-12px_rgba(8,255,193,0.6)]'
                          : 'text-gray-600 hover:text-gray-900 dark:text-text-secondary dark:hover:text-white'
                      )}
                    >
                      Brutto
                    </button>
                  </div>
                </div>
                <div className="mt-4 space-y-5 text-sm text-gray-700 dark:text-text-secondary">
                  <div className="flex flex-col gap-3 border-b border-white/10 pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-red-700 dark:text-red-200">
                          Monatliche Kosten
                        </p>
                        <p className="text-xs text-gray-500 dark:text-text-secondary/70">
                          Ihre aktuellen SaaS-Lizenzen
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={getValueClasses(highlightMonthlyNet)}>
                          {formatCurrency(displayMonthlySaaSCost)}{' '}
                          <span className="text-xs font-semibold text-gray-500 dark:text-text-secondary/70">
                            / Monat {costModeLabel}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-red-700 dark:text-red-200">
                        Jährliche Kosten
                      </p>
                      <p className="text-xs text-gray-500 dark:text-text-secondary/70">12 Monate Nutzung</p>
                    </div>
                    <div className="text-right">
                      <p className={getValueClasses(highlightYearlyNet)}>
                        {formatCurrency(displayYearlySaaSCost)}{' '}
                        <span className="text-xs font-semibold text-gray-500 dark:text-text-secondary/70">
                          / Jahr {costModeLabel}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-xs text-red-700/80 dark:text-red-200/70">{costModeNote}</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-700 shadow-sm dark:border-white/10 dark:bg-bg-darker/60 dark:text-text-secondary dark:shadow-none">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-text-secondary/70">
                  Insights
                </p>
                <div className="mt-3 divide-y divide-gray-200/70 dark:divide-white/10">
                  <div className="flex items-center justify-between py-2">
                    <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-text-secondary/70">
                      <Layers className="h-3.5 w-3.5 text-vae-turquoise/70" />
                      Top-Block
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{topCategoryInsight}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-text-secondary/70">
                      <CheckCircle2 className="h-3.5 w-3.5 text-vae-turquoise/70" />
                      Tools aktiv
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{activeToolCount}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-text-secondary/70">
                      <Repeat className="h-3.5 w-3.5 text-vae-turquoise/70" />
                      Zusatzlizenzen
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{customLicenses.length}</span>
                  </div>
                </div>
              </div>

              <LockedSection
                isLocked={isContentLocked}
                onUnlock={handleUnlockContent}
                overlayTitle="Einsparpotenzial freischalten"
                overlayDescription="Senden Sie Ihre Kalkulation – wir berechnen Ihr Sparpotenzial und schicken einen Stack-Vorschlag."
                ctaText="Sparpotenzial per E-Mail anfordern"
                ctaDataAttribute="cta"
                className="rounded-3xl"
              >
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-[#f6f8f7] to-white p-6 shadow-sm transition-opacity duration-300 hover:opacity-80 dark:border-white/10 dark:from-bg-dark/80 dark:via-bg-darker dark:to-bg-dark dark:shadow-none dark:hover:opacity-70">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise">
                        Einsparungen mit Self-Hosting
                      </p>
                      <p className="text-sm text-gray-600 dark:text-text-secondary">Ihre individuelle Kostenanalyse</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-black/40 dark:shadow-none">
                      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 via-transparent to-bg-dark/70 dark:block" />
                      <div className="relative space-y-5 text-sm text-gray-800 dark:text-white">
                        <div>
                          <div className="flex items-center justify-between">
                            <span>Ihre SaaS-Kosten ab Jahr 1</span>
                            <span className="font-semibold">{formatCurrency(displayYearlySaaSCost)}</span>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-white/10">
                            <div
                              className="h-2 rounded-full bg-red-400"
                              style={{
                                width: getBarWidth(displayYearlySaaSCost),
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <span>Self-Hosting ab Jahr 2 (nur Hosting)</span>
                            <span className="font-semibold">{formatCurrency(displayOpenSourceAnnual)}</span>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-white/10">
                            <div
                              className="h-2 rounded-full bg-vae-turquoise"
                              style={{
                                width: getBarWidth(displayOpenSourceAnnual),
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 rounded-2xl border border-vae-turquoise/30 bg-vae-turquoise/10 p-5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-800 dark:text-white/90">
                          Einsparung im ersten Jahr (inkl. Setup)
                        </span>
                        <span className="text-lg font-semibold text-vae-turquoise">
                          {formatCurrency(yearOneSavings)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-800 dark:text-white/90">Einsparung ab Jahr 2</span>
                        <span className="text-lg font-semibold text-vae-turquoise">
                          {formatCurrency(yearTwoSavings)}
                        </span>
                      </div>
                      <div className="mt-3 border-t border-vae-turquoise/20 pt-3 dark:border-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            Geschätzter Setup-Aufwand
                          </span>
                          <span className="text-base font-bold text-gray-900 dark:text-white">
                            {formatCurrency(displaySetupCost)}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-gray-700 dark:text-white/70">
                          Setup-Kosten sind bewusst gedeckelt, damit die Kalkulation konservativ bleibt.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-gray-600 dark:text-text-secondary">
                    Konkrete Einsparungen berechnen wir individuell auf Basis Ihrer Systeme, Lizenzen und Anforderungen.
                  </p>
                </div>
              </LockedSection>

              <div className="space-y-2 text-xs text-gray-600 dark:text-text-secondary">
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
      <section
        id="prozess"
        className="section-card-container border-b border-gray-200 bg-white py-20 dark:border-white/5 dark:bg-bg-dark"
      >
        <div className="section-card-backdrop" />

        <div className="container-vae relative">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise dark:text-vae-turquoise">
              Prozess-Ablauf
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
              Wie läuft der Setup ab?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-700 dark:text-text-secondary md:text-lg">
              Von der Analyse bis zum Go-Live in klar strukturierten Phasen – transparent, planbar und messbar.
            </p>
          </div>

          {/* Timeline-Grid */}
          <div className="relative">
            {/* Horizontale Linie nur auf Desktop - läuft durch die Mitte der Nummer-Badges */}
            <div className="pointer-events-none absolute inset-x-0 top-5 hidden h-px bg-gradient-to-r from-transparent via-vae-turquoise/20 to-transparent md:block" />

            <div className="grid gap-8 md:grid-cols-4">
              {processPhases.map(phase => (
                <div key={phase.number} className="relative flex h-full flex-col">
                  {/* Nummer-Badge - außerhalb der Card, ganz oben */}
                  <div className="relative z-10 mx-auto mb-6 flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200 bg-vae-turquoise/15 text-sm font-semibold text-vae-turquoise dark:border-white/10 dark:bg-vae-turquoise/20">
                    {phase.number}
                  </div>

                  {/* Card-Content */}
                  <div className="flex h-full flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-vae-turquoise/40 hover:shadow-md dark:border-white/10 dark:bg-white/5">
                    {/* Phase-Label */}
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-vae-turquoise dark:text-vae-turquoise/70 md:text-center">
                      Phase {phase.number}
                    </p>

                    {/* Titel */}
                    <h3 className="text-lg font-semibold leading-snug text-gray-900 dark:text-white md:text-center">
                      {phase.title.includes('(') ? (
                        <>
                          {phase.title.split('(')[0].trim()}
                          <br />
                          <span className="text-base">({phase.title.split('(')[1]}</span>
                        </>
                      ) : (
                        phase.title
                      )}
                    </h3>

                    {/* Beschreibung */}
                    <p className="mt-1 text-sm text-gray-700 dark:text-text-secondary md:text-center">
                      {phase.description}
                    </p>

                    {/* Bullets */}
                    <ul className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      {phase.details.map(detail => (
                        <li key={detail} className="flex items-start gap-2">
                          <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-vae-turquoise/70" />
                          <span>{detail.replace('→ ', '')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== NACH DEM SETUP: LANGFRISTIGE BETREUUNG ==================== */}
      <section className="border-y border-gray-200 bg-[#f2fff8] py-16 dark:border-white/5 dark:bg-bg-darker md:py-20">
        <div className="container-vae flex flex-col items-center gap-4 text-center md:gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise dark:text-vae-turquoise">
            Nächster Schritt
          </p>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl">
            Nach dem Setup: Langfristige Betreuung
          </h3>
          <p className="max-w-3xl px-4 text-base leading-relaxed text-gray-700 dark:text-white/70">
            Infrastruktur ist kein einmaliges Projekt – sie muss mit Ihrem Unternehmen wachsen. Wir bieten laufende
            Betreuung, Erweiterungen und strategische IT-Beratung, damit Ihre Systeme auch morgen noch performant und
            sicher laufen.
          </p>
          <MagneticButton intensity={0.08} scaleEffect glowEffect>
            <a
              href="/leistungen/betreuung"
              className="btn-convert inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold md:px-8 md:py-4 md:text-base"
            >
              <span className="hidden sm:inline">Mehr zur langfristigen Betreuung</span>
              <span className="sm:hidden">Zur Betreuung</span>
              <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
            </a>
          </MagneticButton>
        </div>
      </section>

      {/* Section 7 FAQ */}
      <section className="accent-section bg-vae-turquoise py-20 text-gray-900 dark:bg-gradient-to-b dark:from-bg-darker dark:via-[#050505] dark:to-bg-darker dark:text-white">
        <div className="container-vae">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/85 dark:text-vae-turquoise">
              FAQ
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white dark:text-white md:text-4xl">Häufige Fragen</h2>
            <p className="mt-4 text-base text-white/80 dark:text-white/70">
              Alles rund um Infrastruktur-Setups – von Migration bis Kosten-Transparenz.
            </p>
          </div>
          <FaqAccordion items={faqAccordionItems} className="mt-12 space-y-4" />
        </div>
      </section>

      {/* Section 8 CTA */}
      <section className="border-t border-gray-200 bg-white py-16 dark:border-white/5 dark:bg-gradient-to-br dark:from-bg-dark dark:to-bg-darker md:py-20">
        <div className="container-vae flex flex-col items-center gap-4 text-center md:gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise dark:text-vae-turquoise">
            Bereit loszulegen?
          </p>
          <h2 className="px-4 text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
            Bereit für digitale Souveränität?
          </h2>
          <p className="max-w-3xl px-4 text-base leading-relaxed text-gray-700 dark:text-text-secondary">
            Der erste Schritt ist ein kostenloses Beratungsgespräch. Wir analysieren Ihre Situation und zeigen Ihnen,
            wie Self-Hosting konkret für Ihre Organisation funktioniert.
          </p>
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <MagneticButton intensity={0.08} scaleEffect glowEffect>
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-convert inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold md:px-8 md:py-4 md:text-base"
              >
                <span className="hidden sm:inline">Kostenloses Erstgespräch buchen</span>
                <span className="sm:hidden">Erstgespräch buchen</span>
              </a>
            </MagneticButton>
            <p className="px-4 text-xs text-gray-600 dark:text-text-secondary md:text-sm">
              45 Minuten, unverbindlich, kein Verkaufs-Pitch. Binnen 48h Termin verfügbar.
            </p>
          </div>
        </div>
      </section>
      <SpotlightTutorialOverlay tutorial={tutorial} />

      {/* Mail-Feedback Modal */}
      <AnimatePresence>
        {mailHintVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mail-hint-title"
            aria-describedby="mail-hint-description"
            onClick={() => setMailHintVisible(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-bg-darker/95 p-6 text-left shadow-2xl backdrop-blur-md"
              onClick={event => event.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <h3 id="mail-hint-title" className="text-lg font-semibold text-text-light">
                  Mail wird vorbereitet
                </h3>
                <button
                  type="button"
                  onClick={() => setMailHintVisible(false)}
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-text-light"
                  aria-label="Hinweis schließen"
                >
                  &times;
                </button>
              </div>
              <p id="mail-hint-description" className="mb-6 text-sm leading-relaxed text-text-muted">
                Ihr Mail-Client öffnet sich jetzt. Falls dort noch keine absendefähige Mail steht, drücken Sie bitte
                nochmal den Button.
              </p>
              <div className="flex justify-end">
                <MagneticButton intensity={0.075}>
                  <button
                    type="button"
                    onClick={() => setMailHintVisible(false)}
                    className="btn-ghost inline-flex items-center justify-center px-6 py-2"
                  >
                    Verstanden
                  </button>
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Animated Before/After Visual ────────────────────────────────────────────
const AnimatedBeforeAfter: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()
  const [state, setState] = useState<'before' | 'after'>('before')
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.45 })

  useEffect(() => {
    if (prefersReducedMotion) return
    if (!isInView) return
    // Längeres Delay: Bubbles animieren (2s) + Fusion (1s) + Pause (0.5s) = 3.5s
    const timer = window.setTimeout(() => setState('after'), 3500)
    return () => window.clearTimeout(timer)
  }, [isInView, prefersReducedMotion])

  const bubbleItems = useMemo(
    () => [
      {
        label: 'Mail',
        x: 10,
        y: 15,
        size: 58,
        hue: 'bg-amber-200 text-amber-900 border-amber-300 dark:bg-amber-500/30 dark:text-amber-200 dark:border-amber-500/50',
        icon: MessagesSquare,
        hasWarning: false,
        speed: 1.0,
      },
      {
        label: 'Chat',
        x: 50,
        y: 18,
        size: 52,
        hue: 'bg-amber-200 text-amber-900 border-amber-300 dark:bg-amber-500/30 dark:text-amber-200 dark:border-amber-500/50',
        icon: MessagesSquare,
        hasWarning: true,
        speed: 1.3,
      },
      {
        label: 'CRM',
        x: 70,
        y: 32,
        size: 50,
        hue: 'bg-purple-200 text-purple-900 border-purple-300 dark:bg-purple-500/30 dark:text-purple-200 dark:border-purple-500/50',
        icon: Users,
        hasWarning: true,
        speed: 0.9,
      },
      {
        label: 'Files',
        x: 22,
        y: 42,
        size: 54,
        hue: 'bg-amber-200 text-amber-900 border-amber-300 dark:bg-amber-500/30 dark:text-amber-200 dark:border-amber-500/50',
        icon: Database,
        hasWarning: false,
        speed: 1.1,
      },
      {
        label: 'Calendar',
        x: 55,
        y: 50,
        size: 46,
        hue: 'bg-indigo-200 text-indigo-900 border-indigo-300 dark:bg-indigo-500/30 dark:text-indigo-200 dark:border-indigo-500/50',
        icon: GraduationCap,
        hasWarning: true,
        speed: 1.5,
      },
      {
        label: 'Tickets',
        x: 35,
        y: 65,
        size: 56,
        hue: 'bg-purple-200 text-purple-900 border-purple-300 dark:bg-purple-500/30 dark:text-purple-200 dark:border-purple-500/50',
        icon: Headphones,
        hasWarning: false,
        speed: 0.85,
      },
      {
        label: 'Docs',
        x: 68,
        y: 65,
        size: 50,
        hue: 'bg-blue-200 text-blue-900 border-blue-300 dark:bg-blue-500/30 dark:text-blue-200 dark:border-blue-500/50',
        icon: BookOpen,
        hasWarning: false,
        speed: 1.2,
      },
      {
        label: 'Analytics',
        x: 5,
        y: 55,
        size: 48,
        hue: 'bg-teal-200 text-teal-900 border-teal-300 dark:bg-teal-500/30 dark:text-teal-200 dark:border-teal-500/50',
        icon: Layers,
        hasWarning: true,
        speed: 1.4,
      },
      {
        label: 'Storage',
        x: 75,
        y: 48,
        size: 52,
        hue: 'bg-orange-200 text-orange-900 border-orange-300 dark:bg-orange-500/30 dark:text-orange-200 dark:border-orange-500/50',
        icon: ServerCog,
        hasWarning: true,
        speed: 0.95,
      },
      {
        label: 'Automation',
        x: 15,
        y: 75,
        size: 64,
        hue: 'bg-pink-200 text-pink-900 border-pink-300 dark:bg-pink-500/30 dark:text-pink-200 dark:border-pink-500/50',
        icon: SlidersHorizontal,
        hasWarning: false,
        speed: 1.0,
      },
    ],
    []
  )

  const stackLayers = useMemo(
    () => [
      {
        title: 'Kommunikation',
        subtitle: 'Chat | Files | Mail',
        icon: MessagesSquare,
        color:
          'bg-amber-500/50 border-amber-700/80 text-amber-950 dark:bg-amber-500/35 dark:border-amber-600/70 dark:text-amber-200',
      },
      {
        title: 'CRM & Kundenmanagement',
        subtitle: 'Kontakte | Deals | Support',
        icon: Users,
        color:
          'bg-purple-500/50 border-purple-700/80 text-purple-950 dark:bg-purple-500/35 dark:border-purple-600/70 dark:text-purple-200',
      },
      {
        title: 'Wissensbasis & Dokumentation',
        subtitle: 'Docs | Wiki | Playbooks',
        icon: BookOpen,
        color:
          'bg-blue-500/50 border-blue-700/80 text-blue-950 dark:bg-blue-500/35 dark:border-blue-600/70 dark:text-blue-200',
      },
      {
        title: 'Governance & Sicherheit',
        subtitle: 'SSO | Policies | Backups',
        icon: ShieldCheck,
        color:
          'bg-emerald-500/50 border-emerald-700/80 text-emerald-950 dark:bg-emerald-500/35 dark:border-emerald-600/70 dark:text-emerald-200',
      },
      {
        title: 'Intelligente Automation',
        subtitle: 'AI | Workflows | Automations',
        icon: Cpu,
        color:
          'bg-pink-500/50 border-pink-700/80 text-pink-950 dark:bg-pink-500/35 dark:border-pink-600/70 dark:text-pink-200',
      },
    ],
    []
  )

  const card = beforeAfterContent[state]
  const isBefore = state === 'before'

  if (prefersReducedMotion) {
    return (
      <div className="relative min-h-[340px] overflow-hidden rounded-3xl border border-vae-turquoise/20 bg-gradient-to-br from-white via-vae-turquoise/5 to-white p-6 shadow-lg dark:from-bg-dark/70 dark:via-vae-turquoise/10 dark:to-bg-dark">
        <div className="flex items-center justify-between gap-4">
          <div className="rounded-full border-2 border-vae-turquoise/60 bg-vae-turquoise/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-vae-turquoise shadow-[0_0_12px_rgba(29,184,122,0.25)] dark:border-vae-turquoise/50 dark:bg-vae-turquoise/15 dark:shadow-[0_0_12px_rgba(8,255,193,0.2)]">
            Infrastructure-Design
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-text-secondary">
            Vorher / Nachher
          </span>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {(['before', 'after'] as const).map(key => {
            const item = beforeAfterContent[key]
            return (
              <div
                key={key}
                className="rounded-2xl border border-white/10 bg-white/80 p-4 shadow-md dark:border-white/10 dark:bg-white/5"
              >
                <p
                  className={cn(
                    'mb-2 text-[11px] font-semibold uppercase tracking-[0.32em]',
                    key === 'before' ? 'text-red-400/80 dark:text-red-300/80' : 'text-vae-turquoise/90'
                  )}
                >
                  {item.label}
                </p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-text-secondary">{item.body}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/70 p-5 shadow-md dark:border-white/10 dark:bg-white/5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-vae-turquoise">
              <Layers className="h-4 w-4" /> Unified Stack
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-secondary">
              Orchestriert
            </span>
          </div>
          <div className="space-y-3">
            {stackLayers.map(layer => {
              const Icon = layer.icon
              return (
                <div
                  key={layer.title}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-bg-darker/50 px-4 py-3 text-white shadow-sm"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-vae-turquoise/15 text-vae-turquoise">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold">{layer.title}</p>
                    <p className="text-xs text-text-secondary">{layer.subtitle}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      id="before-after-visual"
      ref={containerRef}
      className={cn(
        'relative min-h-[380px] overflow-hidden rounded-2xl border p-4 shadow-xl backdrop-blur-sm sm:rounded-3xl sm:border-2 sm:p-7 md:p-8',
        isBefore
          ? 'border-red-500/40 bg-gradient-to-br from-red-50 via-white to-gray-50 dark:bg-gradient-to-br dark:from-red-500/10 dark:via-white/10 dark:to-bg-dark'
          : 'border-vae-turquoise/40 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:bg-gradient-to-br dark:from-vae-turquoise/10 dark:via-white/10 dark:to-bg-dark'
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(45,214,175,0.06),transparent_60%)] dark:bg-[radial-gradient(circle_at_25%_15%,rgba(45,214,175,0.18),transparent_50%)]" />
      <div className="flex flex-col items-start gap-3">
        <motion.div
          className="whitespace-nowrap rounded-full border-2 border-vae-turquoise/60 bg-vae-turquoise/20 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-vae-turquoise shadow-[0_0_12px_rgba(29,184,122,0.25)] dark:border-vae-turquoise/50 dark:bg-vae-turquoise/15 dark:shadow-[0_0_12px_rgba(8,255,193,0.2)] sm:px-3 sm:text-[11px] sm:tracking-[0.3em]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Infrastructure-Design
        </motion.div>
        <div className="flex w-full flex-shrink-0 flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap sm:gap-3">
          {(['before', 'after'] as const).map(key => {
            const isActive = state === key
            const isBeforeBtn = key === 'before'

            return (
              <MagneticButton key={key} intensity={0.08}>
                <button
                  type="button"
                  onClick={() => setState(key)}
                  aria-pressed={isActive}
                  className={cn(
                    'btn-outline w-full min-w-0 whitespace-nowrap px-3 py-2 text-[11px] font-bold uppercase tracking-wider sm:w-auto sm:min-w-[100px] sm:px-4 sm:py-2.5 sm:text-xs sm:tracking-wider',
                    'transition-all duration-300 ease-out',
                    // VORHER-Button (rot) - ACTIVE
                    isBeforeBtn &&
                      isActive &&
                      '!border-2 !border-red-500 !bg-gradient-to-br !from-red-500 !to-red-600 !text-white !shadow-[0_0_24px_rgba(239,68,68,0.6),0_0_0_1px_rgba(239,68,68,0.5)] dark:!border-red-500/70 dark:!from-red-500/25 dark:!to-red-500/15 dark:!text-red-300 dark:!shadow-[0_0_18px_rgba(239,68,68,0.45),0_0_0_1px_rgba(239,68,68,0.35)]',
                    // VORHER-Button (rot) - INACTIVE
                    isBeforeBtn &&
                      !isActive &&
                      '!border-2 !border-red-500/70 !bg-red-500/15 !text-red-600 hover:!-translate-y-1 hover:!border-red-500 hover:!bg-gradient-to-br hover:!from-red-500 hover:!to-red-600 hover:!text-white hover:!shadow-[0_0_24px_rgba(239,68,68,0.5)] dark:!border-red-500/40 dark:!bg-red-500/10 dark:!text-red-400 dark:hover:!border-red-500/70 dark:hover:!bg-gradient-to-br dark:hover:!from-red-500/30 dark:hover:!to-red-500/20 dark:hover:!text-red-300 dark:hover:!shadow-[0_0_18px_rgba(239,68,68,0.35)]',
                    // NACHHER-Button (grün) - ACTIVE
                    !isBeforeBtn &&
                      isActive &&
                      '!border-2 !border-vae-turquoise !bg-gradient-to-br !from-vae-turquoise !to-emerald-500 !text-[#1a2320] !shadow-[0_0_24px_rgba(29,184,122,0.6),0_0_0_1px_rgba(29,184,122,0.5)] dark:!border-vae-turquoise/70 dark:!from-vae-turquoise/25 dark:!to-vae-turquoise/15 dark:!text-vae-turquoise dark:!shadow-[0_0_18px_rgba(8,255,193,0.45),0_0_0_1px_rgba(8,255,193,0.35)]',
                    // NACHHER-Button (grün) - INACTIVE
                    !isBeforeBtn &&
                      !isActive &&
                      '!border-2 !border-vae-turquoise/70 !bg-vae-turquoise/15 !text-vae-turquoise hover:!-translate-y-1 hover:!border-vae-turquoise hover:!bg-gradient-to-br hover:!from-vae-turquoise hover:!to-emerald-500 hover:!text-[#1a2320] hover:!shadow-[0_0_24px_rgba(29,184,122,0.5)] dark:!border-vae-turquoise/40 dark:!bg-vae-turquoise/10 dark:!text-vae-turquoise/80 dark:hover:!border-vae-turquoise/70 dark:hover:!bg-gradient-to-br dark:hover:!from-vae-turquoise/30 dark:hover:!to-vae-turquoise/20 dark:hover:!text-vae-turquoise dark:hover:!shadow-[0_0_18px_rgba(8,255,193,0.35)]',
                    // Focus: rot bei Vorher-Button, grün bei Nachher-Button (ohne ring-offset)
                    isBeforeBtn && '!outline-none focus:!ring-2 focus:!ring-red-500/60',
                    !isBeforeBtn && '!outline-none focus:!ring-2 focus:!ring-vae-turquoise/60'
                  )}
                >
                  {key === 'before' ? 'Vorher' : 'Nachher'}
                </button>
              </MagneticButton>
            )
          })}
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div className="space-y-3">
          <p
            className={cn(
              'text-xs font-semibold uppercase tracking-[0.32em]',
              isBefore ? 'text-red-500 dark:text-red-400' : 'text-vae-turquoise dark:text-vae-turquoise'
            )}
          >
            {card.label}
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={state}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              className="min-h-[120px] space-y-2"
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{card.title}</h3>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-text-secondary">{card.body}</p>
            </motion.div>
          </AnimatePresence>
          <motion.div
            className="flex items-center gap-2 pt-3 text-xs text-gray-600 dark:text-text-secondary sm:gap-3 sm:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-vae-turquoise/50 to-transparent sm:block"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <span className="text-center">Orchestriert von VAE – Unabhängig betrieben von Ihnen</span>
            <motion.div
              className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-vae-turquoise/50 to-transparent sm:block"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.div>
        </div>

        <motion.div
          className="relative h-[600px] overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.35)] dark:bg-white/5 sm:h-[620px] sm:p-4 md:h-[660px] lg:h-[700px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_20%,rgba(45,214,175,0.22),transparent_55%)]"
            animate={{
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Scatter → Stack animation */}
          <div className="relative h-full w-full">
            <AnimatePresence mode="wait" initial={false}>
              {isBefore && (
                <motion.div
                  key="before-bubbles"
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.6, ease: 'easeInOut' },
                  }}
                >
                  {/* Fliegende Euro-Zeichen (zeigen: ständig steigende Kosten) */}
                  {[
                    { x: 45, y: 15, delay: 0.5 },
                    { x: 78, y: 72, delay: 1.2 },
                    { x: 32, y: 82, delay: 1.8 },
                  ].map((pos, idx) => (
                    <motion.div
                      key={`euro-${idx}`}
                      className="absolute text-2xl font-bold text-red-400/70 dark:text-red-300/60"
                      style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: [0, 0.7, 0.8, 0.7, 0],
                        scale: [0.8, 1, 1.1, 1, 0.9],
                        y: [0, -15, -30, -45, -60],
                        x: [0, 3, -2, 4, -3],
                        rotate: [0, 5, -5, 3, -3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: pos.delay,
                      }}
                      aria-hidden
                    >
                      €
                    </motion.div>
                  ))}

                  {bubbleItems.map((bubble, idx) => {
                    const baseScale = bubble.size / 60
                    const BubbleIcon = bubble.icon
                    const duration = 8 + idx * 0.4
                    const adjustedDuration = duration * (bubble.speed ?? 1.0)
                    return (
                      <motion.div
                        key={bubble.label}
                        className={cn(
                          'absolute flex items-center gap-2 rounded-full border px-3 py-2 text-[12px] font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.15)] backdrop-blur-md',
                          bubble.hasWarning ? 'border-red-400/40' : 'border-white/15',
                          bubble.hue
                        )}
                        aria-hidden
                        style={{
                          left: `${bubble.x}%`,
                          top: `${bubble.y}%`,
                          zIndex: bubble.hasWarning ? 10 : 5,
                        }}
                        animate={{
                          opacity: [0.9, 1.0, 0.9],
                          scale: [baseScale * 0.95, baseScale * 1.05, baseScale * 0.95],
                          x: [
                            0,
                            3 * (bubble.speed ?? 1.0),
                            -3 * (bubble.speed ?? 1.0),
                            2 * (bubble.speed ?? 1.0),
                            -2 * (bubble.speed ?? 1.0),
                            0,
                          ],
                          y: [
                            0,
                            -6 * (bubble.speed ?? 1.0),
                            4 * (bubble.speed ?? 1.0),
                            -3 * (bubble.speed ?? 1.0),
                            5 * (bubble.speed ?? 1.0),
                            0,
                          ],
                          rotate: [0, 2, -2, 1, -1, 0],
                        }}
                        exit={{
                          x: `calc(50% - ${bubble.x}%)`,
                          y: `calc(50% - ${bubble.y}%)`,
                          scale: 0,
                          opacity: 0,
                          rotate: 360,
                          transition: {
                            duration: 1,
                            ease: [0.43, 0.13, 0.23, 0.96],
                            delay: idx * 0.05,
                          },
                        }}
                        transition={{
                          duration: adjustedDuration,
                          repeat: Infinity,
                          repeatType: 'mirror',
                          ease: 'easeInOut',
                          delay: idx * 0.15,
                        }}
                      >
                        <BubbleIcon className="h-3.5 w-3.5" aria-hidden />
                        <span className="truncate">{bubble.label}</span>
                        {bubble.hasWarning && (
                          <motion.span
                            className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500/80 text-[10px] text-white shadow-[0_2px_8px_rgba(239,68,68,0.5)]"
                            initial={{ scale: 0 }}
                            animate={{
                              scale: [1, 1.1, 1],
                              opacity: [0.8, 1, 0.8],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                            title="Keine Integration"
                          >
                            ⚠
                          </motion.span>
                        )}
                      </motion.div>
                    )
                  })}

                  <motion.div
                    className="absolute inset-6 rounded-[24px] border border-white/10 bg-white/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.12 }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.8, ease: 'easeInOut' },
                    }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </motion.div>
              )}

              {!isBefore && (
                <motion.div
                  key="after-stack"
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 8 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative w-full max-w-[92%] rounded-2xl border border-vae-turquoise/30 bg-gradient-to-b from-white/95 via-white/90 to-white/85 p-4 shadow-[0_12px_32px_rgba(26,35,32,0.10)] backdrop-blur dark:from-bg-darker/60 dark:via-bg-darker/70 dark:to-bg-dark/80 dark:shadow-[0_24px_70px_rgba(0,0,0,0.45)] sm:max-w-[400px] sm:rounded-3xl sm:p-6"
                  >
                    <motion.div
                      className="absolute inset-0 rounded-3xl border border-[#c5ccc8]/30 dark:border-white/10"
                      aria-hidden
                      animate={{
                        opacity: [0.15, 0.25, 0.15],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <div className="relative space-y-4">
                      <motion.div
                        className="flex items-center justify-between gap-3 rounded-2xl border-2 border-vae-turquoise/40 bg-gradient-to-r from-vae-turquoise/15 to-vae-turquoise/5 px-4 py-3 text-vae-turquoise shadow-[0_0_20px_rgba(8,255,193,0.3)]"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        <div className="flex items-center gap-2 text-sm font-bold">
                          <Layers className="h-5 w-5" />
                          <span>Unified Platform Stack</span>
                        </div>
                        <span className="rounded-full border-2 border-vae-turquoise/40 bg-vae-turquoise/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-vae-turquoise shadow-[0_0_10px_rgba(8,255,193,0.2)] sm:px-3 sm:py-1 sm:text-[11px] sm:tracking-[0.24em]">
                          Orchestriert
                        </span>
                      </motion.div>{' '}
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: {},
                          visible: {
                            transition: { staggerChildren: 0.08 },
                          },
                        }}
                        className="space-y-1 sm:space-y-2"
                      >
                        {stackLayers.map((layer, idx) => {
                          const Icon = layer.icon
                          return (
                            <React.Fragment key={layer.title}>
                              <motion.div
                                variants={{
                                  hidden: { opacity: 0, x: -20, scale: 0.95 },
                                  visible: { opacity: 1, x: 0, scale: 1 },
                                }}
                                transition={{
                                  duration: 0.5,
                                  ease: [0.22, 1, 0.36, 1],
                                  delay: idx * 0.1,
                                }}
                                whileHover={{
                                  scale: 1.02,
                                  transition: { duration: 0.2 },
                                }}
                                className={cn(
                                  'relative cursor-pointer overflow-hidden rounded-2xl border px-4 py-3 text-white shadow-[0_4px_12px_rgba(26,35,32,0.08)] dark:shadow-[0_14px_40px_rgba(0,0,0,0.35)]',
                                  layer.color
                                )}
                              >
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5"
                                  aria-hidden
                                  animate={{
                                    opacity: [0.5, 0.7, 0.5],
                                    x: ['-100%', '100%'],
                                  }}
                                  transition={{
                                    opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                                    x: { duration: 3, repeat: Infinity, ease: 'linear', delay: idx * 0.3 },
                                  }}
                                />
                                <div className="relative flex items-start gap-3">
                                  <motion.span
                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"
                                    whileHover={{
                                      scale: 1.1,
                                      rotate: 5,
                                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                    }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                  >
                                    <Icon className="h-5 w-5" />
                                  </motion.span>
                                  <div className="space-y-0.5">
                                    <p className="text-sm font-semibold leading-tight">{layer.title}</p>
                                    <p className="text-xs text-text-secondary">{layer.subtitle}</p>
                                  </div>
                                  {idx === 0 && (
                                    <motion.span
                                      className="ml-auto hidden items-center gap-1.5 rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-vae-turquoise sm:flex sm:gap-2 sm:px-2.5 sm:py-1 sm:text-[11px] sm:tracking-[0.2em]"
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ duration: 0.4, delay: 0.5 }}
                                      whileHover={{ scale: 1.05 }}
                                    >
                                      <Database className="h-3 w-3 sm:h-3.5 sm:w-3.5" />{' '}
                                      <span className="hidden sm:inline">Unified Storage</span>
                                    </motion.span>
                                  )}
                                </div>
                              </motion.div>
                              {idx < stackLayers.length - 1 && (
                                <motion.div
                                  className="relative mx-auto h-3 w-0.5 sm:h-4"
                                  initial={{ opacity: 0, scaleY: 0 }}
                                  animate={{ opacity: 1, scaleY: 1 }}
                                  transition={{ duration: 0.4, delay: idx * 0.1 + 0.3 }}
                                >
                                  <div className="h-full w-full rounded-full bg-gradient-to-b from-vae-turquoise via-vae-turquoise to-vae-turquoise shadow-[0_0_8px_rgba(29,184,122,0.4)] dark:from-vae-turquoise/70 dark:via-vae-turquoise/70 dark:to-vae-turquoise/70 dark:shadow-[0_0_8px_rgba(8,255,193,0.3)]" />
                                </motion.div>
                              )}
                            </React.Fragment>
                          )
                        })}
                      </motion.div>
                      <motion.div
                        className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                      >
                        <span>Ihre Infrastruktur</span>
                        <span className="text-vae-turquoise">Ihre Kontrolle</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SetupPage
