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
  GraduationCap,
  Headphones,
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

const trustBadges = ['100% Open Source', 'Made in Germany', 'DSGVO-konform']

const beforeAfterContent = {
  before: {
    label: 'Vorher',
    title: 'Fragmentierte SaaS-Landschaft',
    body: 'Viele Tools, hohe Kosten, Daten verstreut, Abhängigkeit von Anbietern.',
  },
  after: {
    label: 'Nachher',
    title: 'Einheitliche Open-Source-Plattform',
    body: 'Alle Prozesse auf Ihrer Infrastruktur, vollständig in Ihrer Kontrolle.',
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

  // Direct Nextcloud booking link for Infrastructure Audit

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
    <div className="relative z-0 bg-bg-darker text-text-light">
      <Seo
        title="Infrastruktur-Setup Heidelberg | VAE Systems"
        description="Open-Source-Infrastruktur statt SaaS: Kollaboration, Business-Apps und Automations-Workflows aufbauen. Migration, Security & Dokumentation inklusive. Heidelberg & deutschlandweit."
        canonicalPath="/leistungen/infrastruktur"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Infrastruktur-Setup',
          provider: {
            '@type': 'Organization',
            name: 'VAE Systems UG',
            url: 'https://vae.systems',
          },
          areaServed: {
            '@type': 'Place',
            name: 'Deutschland',
          },
          description:
            'Open-Source-Infrastruktur aufbauen: CRM, Projektmanagement, Kommunikation. Migration & Security inklusive.',
          offers: {
            '@type': 'Offer',
            url: 'https://vae.systems/leistungen/infrastruktur',
            priceCurrency: 'EUR',
            price: 'auf Anfrage',
          },
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-50 py-40 dark:border-white/5 dark:bg-gradient-to-br dark:from-bg-dark dark:via-bg-darker dark:to-bg-dark md:py-56">
        {/* Hero Background Image */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.40] dark:opacity-[0.20]">
          <picture>
            <source srcSet="/images/optimized/Jakob-steht-Vor-Tafel-für-Strategie.webp" type="image/webp" />
            <img
              src="/images/optimized/Jakob-steht-Vor-Tafel-für-Strategie.jpg"
              alt=""
              className="h-full w-full object-cover object-center"
              loading="eager"
            />
          </picture>
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(var(--vae-turquoise-rgb),0.12),transparent_55%),radial-gradient(circle_at_60%_70%,rgba(var(--vae-turquoise-rgb),0.08),transparent_60%)]" />
        </div>
        {/* Light Mode: subtiler Glasmorphism-Hintergrund */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[85%] max-w-4xl -translate-y-1/2 rounded-3xl bg-white/30 backdrop-blur-[2px] dark:bg-transparent dark:backdrop-blur-none" />
        <div className="container-vae relative flex flex-col items-center text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise">
            <ServerCog className="h-4 w-4" /> Infrastruktur Design/Setup
          </span>
          <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight text-gray-900 dark:text-white md:text-5xl">
            Eine KI-geprägte Arbeitswelt, in der Sie die Kontrolle behalten.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:text-xl">
            Wir entwerfen Ihre Informationsinfrastruktur – das Betriebssystem Ihres Unternehmens. Selbstgehostet, offen
            und so gebaut, dass Sie auch morgen noch flexibel entscheiden können.
          </p>
          <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:gap-6 lg:gap-8">
            <MagneticButton intensity={0.08} scaleEffect glowEffect className="isolate w-full sm:w-auto">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-convert flex w-full items-center justify-center gap-2 px-8 py-4 text-base font-semibold"
              >
                Kostenloses Erstgespräch buchen
              </a>
            </MagneticButton>
            <MagneticButton intensity={0.05} scaleEffect className="isolate w-full sm:w-auto">
              <button
                onClick={scrollToROI}
                className="btn-outline flex w-full items-center justify-center gap-2 px-8 py-4 text-base font-semibold"
              >
                ROI-Rechner ansehen ↓
              </button>
            </MagneticButton>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm font-semibold text-text-secondary">
            {trustBadges.map(badge => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-text-secondary"
              >
                <Check className="h-4 w-4 text-vae-turquoise" /> {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== STUDIEN-SEKTION ==================== */}
      <section className="section-card-container animate-section border-b border-gray-200 bg-[hsl(165,59%,97%)] py-24 dark:border-[hsl(0,0%,12%)] dark:bg-[hsl(165,20%,8%)]">
        <div className="section-card-backdrop" />

        <div className="container-vae relative">
          <div className="mb-12 text-center">
            <h2 className="h2 heading-gradient mb-4">Warum Unternehmen auf selbstgehostete Lösungen setzen</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-700 dark:text-text-secondary">
              SaaS-Kosten explodieren, Vendor Lock-in wird zum Risiko – Open Source ist die Antwort.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Statistik 1: SaaS-Explosion */}
            <div className="rounded-2xl border border-vae-turquoise/30 bg-white/80 p-8 dark:border-vae-turquoise/20 dark:bg-white/5">
              <div className="mb-4 text-5xl font-bold text-vae-turquoise">300 Mrd. $</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">SaaS-Ausgaben 2025</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                +20% Wachstum gegenüber 2024 – getrieben durch AI-Tools und Cloud-Migration.
              </p>
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                Quelle:{' '}
                <a
                  href="https://www.saastr.com/gartner-saas-spend-is-actually-accelerating-will-hit-300-billion-in-2025/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vae-turquoise hover:underline"
                >
                  Gartner 2024
                </a>
              </p>
            </div>

            {/* Statistik 2: Vendor Lock-in */}
            <div className="rounded-2xl border border-vae-turquoise/30 bg-white/80 p-8 dark:border-vae-turquoise/20 dark:bg-white/5">
              <div className="mb-4 text-5xl font-bold text-vae-turquoise">47%</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Vendor Lock-in-Sorgen</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fast die Hälfte aller Unternehmen sieht AWS/Azure/GCP-Abhängigkeit als strategisches Risiko.
              </p>
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                Quelle:{' '}
                <a
                  href="https://www.qovery.com/blog/the-high-cost-of-vendor-lock-in-in-cloud-computing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vae-turquoise hover:underline"
                >
                  Qovery 2024
                </a>
              </p>
            </div>

            {/* Statistik 3: Open Source-Adoption */}
            <div className="rounded-2xl border border-vae-turquoise/30 bg-white/80 p-8 dark:border-vae-turquoise/20 dark:bg-white/5">
              <div className="mb-4 text-5xl font-bold text-vae-turquoise">83%</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Open Source-Akzeptanz</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enterprises sehen Open Source als wertvoll für ihre Zukunft – 86% berichten höhere Produktivität.
              </p>
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                Quelle:{' '}
                <a
                  href="https://canonical.com/blog/state-of-global-open-source-2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vae-turquoise hover:underline"
                >
                  Canonical 2025
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section
        className="section-card-container border-b bg-gray-50 py-20 dark:border-white/5 dark:bg-bg-darker"
        id="definition"
      >
        <div className="section-card-backdrop" />

        <div className="container-vae relative grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/60">
              Infrastructure-Design
            </p>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Was bedeutet Infrastructure-Design bei VAE?
            </h2>
            <p className="text-lg text-gray-700 dark:text-text-secondary">
              Statt weitere KI-Tools auf eine wackelige Basis zu setzen, schaffen wir ein stabiles Fundament.
            </p>
            <p className="text-base text-gray-700 dark:text-text-secondary">
              Bei VAE bauen wir Ihre Informationsinfrastruktur so, dass Daten, Workflows und Systeme zusammenarbeiten —
              nicht gegeneinander.
            </p>
            <p className="text-base text-gray-700 dark:text-text-secondary">
              Viele Organisationen haben eine gewachsene SaaS-Landschaft: verstreute Daten, Abhängigkeiten von
              Anbietern, wenig Überblick.
            </p>
            <p className="text-base text-gray-700 dark:text-text-secondary">
              Weitere Tools oben draufzusetzen erhöht das Tempo — aber nicht die Kontrolle.
            </p>
            <p className="text-base text-gray-700 dark:text-text-secondary">
              Unser Ansatz: Wir analysieren Ihre Landschaft, entwerfen eine vendor-neutrale Architektur und setzen sie
              mit Open-Source-Systemen um. Migration, Konfiguration, Dokumentation, Team-Schulung inklusive. Am Ende
              steht ein funktionierendes System — kein Foliensatz.
            </p>

            {/* Abgrenzungs-Box zur Strategieberatung */}
            <div className="mt-6 rounded-xl border border-gray-300 bg-gray-50 p-5 dark:border-white/10 dark:bg-white/5">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Sie können Infrastructure-Design mit oder ohne vorherige Strategieberatung buchen. Wenn die Richtung
                bereits klar ist, sorgen wir dafür, dass Ihre Systeme sie tragen – wenn nicht, klären wir sie gemeinsam
                in der{' '}
                <a href="/leistungen/strategie" className="font-medium text-vae-turquoise hover:underline">
                  Strategieberatung
                </a>
                .
              </p>
            </div>
          </div>
          <AnimatedBeforeAfter />
        </div>
      </section>

      {/* Section 3 - Produktionsreife Systeme */}
      <section className="section-card-container bg-white py-20 dark:bg-bg-dark">
        <div className="section-card-backdrop" />

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

          {/* Infrastructure Images */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-white/5 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
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

              <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-white/5 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
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
      <section className="section-card-container border-b border-gray-200 bg-gradient-to-b from-white via-gray-50 to-white py-20 dark:border-white/5 dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker">
        <div className="section-card-backdrop" />
        <div className="container-vae relative">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">Nach dem Setup</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
              Welche Optionen haben Sie nach dem Setup?
            </h2>
            <p className="mt-4 text-base text-gray-700 dark:text-text-secondary md:text-lg">
              Nach der Implementierung können Sie Ihre Infrastruktur entweder eigenständig betreiben oder langfristig
              von VAE betreuen lassen.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Option 1: Setup + Übergabe */}
            <div className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/40 hover:shadow-lg dark:border-white/10 dark:bg-white/5">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-vae-turquoise/0 via-vae-turquoise/40 to-vae-turquoise/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-vae-turquoise/30 bg-vae-turquoise/10 transition-transform duration-300 group-hover:scale-110">
                <CheckCircle2 className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Setup + Übergabe</h3>
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
            <div className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border-2 border-vae-turquoise/40 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/60 hover:shadow-xl dark:border-vae-turquoise/30 dark:bg-white/5">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-vae-turquoise/0 via-vae-turquoise to-vae-turquoise/0" />

              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-vae-turquoise/40 bg-vae-turquoise/15 transition-transform duration-300 group-hover:scale-110">
                <Users className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Setup + Langfristige Betreuung</h3>
              <p className="text-base leading-relaxed text-gray-700 dark:text-text-secondary">
                Wir implementieren die Infrastruktur und übernehmen anschließend die langfristige Instandhaltung,
                Weiterentwicklung und das Monitoring. Übergaben und laufende Kommunikation laufen über unsere Kunden-App
                mit Chat (iOS/Android) und sicherem Cloud-Share – Sie konzentrieren sich voll auf Ihr Kerngeschäft.
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                  <span className="text-sm text-gray-700 dark:text-text-secondary">
                    Kontinuierliche Updates & Security-Patches
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                  <span className="text-sm text-gray-700 dark:text-text-secondary">
                    24/7-Monitoring & proaktive Wartung
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                  <span className="text-sm text-gray-700 dark:text-text-secondary">
                    Performance-Optimierung & Skalierung
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                  <span className="text-sm text-gray-700 dark:text-text-secondary">
                    Flexible Betreuungsmodelle (monatlich kündbar)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                  <span className="text-sm text-gray-700 dark:text-text-secondary">
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
                    className="btn-primary inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold"
                  >
                    <span>Betreuungsmodelle ansehen</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Hinweis zu Hosting-Optionen */}
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-vae-turquoise/30 bg-gradient-to-br from-vae-turquoise/10 via-vae-turquoise/5 to-transparent p-6 backdrop-blur-sm dark:border-vae-turquoise/20 dark:from-vae-turquoise/15 dark:via-vae-turquoise/10">
            <p className="text-center text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
              <strong className="text-gray-900 dark:text-white">Hosting-Optionen:</strong> Detaillierte Informationen zu
              den verschiedenen Deployment-Modellen finden Sie{' '}
              <Link
                to="/leistungen/betreuung#deployment-modelle"
                className="whitespace-nowrap font-semibold text-vae-turquoise underline decoration-vae-turquoise/30 underline-offset-2 transition-colors hover:decoration-vae-turquoise"
              >
                in der Hosting-Sektion →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 - Original Content */}
      <section className="section-card-container bg-gray-50 py-20 dark:bg-bg-darker">
        <div className="section-card-backdrop" />

        <div className="container-vae relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/60">Was ist enthalten?</p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">Was Sie erhalten</h2>
            <p className="mt-3 text-lg text-text-secondary">
              Vollständiges Setup, produktionsbereit, ohne versteckte Kosten.
            </p>
          </div>
          <div className="card-group mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map(card => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-vae-turquoise/25 bg-white/90 p-6 shadow-[0_14px_45px_-20px_rgba(15,23,42,0.35)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/50 hover:shadow-[0_18px_60px_-24px_rgba(8,255,193,0.35)] dark:border-vae-turquoise/20 dark:bg-white/5 dark:shadow-[0_18px_60px_-30px_rgba(0,0,0,0.75)] dark:hover:bg-white/10"
                >
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-vae-turquoise/0 via-vae-turquoise/40 to-vae-turquoise/0 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative mb-4 inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-vae-turquoise/15 text-vae-turquoise ring-1 ring-vae-turquoise/30 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="relative z-[1] h-6 w-6" />
                    <div className="absolute inset-0 bg-vae-turquoise/10 blur-[14px]" />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-text-secondary">{card.description}</p>

                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-vae-turquoise/10 via-transparent to-vae-turquoise/10" />
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
              <MagneticButton intensity={0.05}>
                <button
                  onClick={startTutorial}
                  className="btn-outline inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em]"
                >
                  <GraduationCap className="h-4 w-4" />
                  Tutorial starten
                </button>
              </MagneticButton>
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
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise">
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
                              className="h-2 rounded-full bg-vae-turquoise"
                              style={{
                                width: `${maxComparisonValue ? Math.max((openSourceAnnual / maxComparisonValue) * 100, 5) : 0}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 rounded-2xl border border-vae-turquoise/30 bg-vae-turquoise/10 p-5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/90">Einsparung im ersten Jahr (inkl. Setup)</span>
                        <span className="text-lg font-semibold text-vae-turquoise">
                          {formatCurrency(yearOneSavings)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/90">Einsparung ab Jahr 2</span>
                        <span className="text-lg font-semibold text-vae-turquoise">
                          {formatCurrency(yearTwoSavings)}
                        </span>
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
      <section
        id="prozess"
        className="section-card-container border-b border-gray-200 bg-white py-20 dark:border-white/5 dark:bg-bg-dark"
      >
        <div className="section-card-backdrop" />

        <div className="container-vae relative">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">Prozess-Ablauf</p>
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
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-vae-turquoise/70 md:text-center">
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
      <section className="border-y border-gray-200 bg-gray-50 py-16 dark:border-white/5 dark:bg-bg-darker md:py-20">
        <div className="container-vae flex flex-col items-center gap-4 text-center md:gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">Nächster Schritt</p>
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
      <section className="bg-gradient-to-b from-white via-gray-50 to-white py-20 text-gray-900 dark:from-bg-darker dark:via-[#050505] dark:to-bg-darker dark:text-white">
        <div className="container-vae">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/80">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">Häufige Fragen</h2>
            <p className="mt-4 text-base text-text-secondary dark:text-white/70">
              Alles rund um Infrastruktur-Setups – von Migration bis Kosten-Transparenz.
            </p>
          </div>
          <FaqAccordion items={faqAccordionItems} className="mt-12 space-y-4" />
        </div>
      </section>

      {/* Section 8 CTA */}
      <section className="border-t border-white/5 bg-gradient-to-br from-bg-dark to-bg-darker py-16 md:py-20">
        <div className="container-vae flex flex-col items-center gap-4 text-center md:gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">Bereit loszulegen?</p>
          <h2 className="px-4 text-2xl font-semibold text-white md:text-3xl lg:text-4xl">
            Bereit für digitale Souveränität?
          </h2>
          <p className="max-w-3xl px-4 text-base leading-relaxed text-text-secondary">
            Der erste Schritt ist ein kostenloses Beratungsgespräch. Wir analysieren Ihre Situation und zeigen Ihnen,
            wie Open Source konkret für Ihre Organisation funktioniert.
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
            <p className="px-4 text-xs text-text-secondary md:text-sm">
              45 Minuten, unverbindlich, kein Verkaufs-Pitch. Binnen 48h Termin verfügbar.
            </p>
          </div>
        </div>
      </section>
      <SpotlightTutorialOverlay tutorial={tutorial} />
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
    const timer = window.setTimeout(() => setState('after'), 1100)
    return () => window.clearTimeout(timer)
  }, [isInView, prefersReducedMotion])

  const bubbleItems = useMemo(
    () => [
      { label: 'Mail', x: 12, y: 18, size: 58, hue: 'bg-white/70 text-slate-900 dark:bg-white/15 dark:text-white' },
      {
        label: 'Chat',
        x: 52,
        y: 20,
        size: 52,
        hue: 'bg-vae-turquoise/25 text-slate-900 dark:bg-vae-turquoise/25 dark:text-white',
      },
      { label: 'CRM', x: 72, y: 34, size: 50, hue: 'bg-white/60 text-slate-900 dark:bg-white/10 dark:text-white' },
      {
        label: 'Files',
        x: 24,
        y: 44,
        size: 54,
        hue: 'bg-amber-200/60 text-slate-900 dark:bg-amber-200/15 dark:text-amber-50',
      },
      {
        label: 'Tickets',
        x: 40,
        y: 64,
        size: 56,
        hue: 'bg-sky-200/60 text-slate-900 dark:bg-sky-200/15 dark:text-sky-50',
      },
      { label: 'Docs', x: 70, y: 62, size: 50, hue: 'bg-white/55 text-slate-900 dark:bg-white/10 dark:text-white' },
      {
        label: 'Automation',
        x: 18,
        y: 70,
        size: 64,
        hue: 'bg-vae-turquoise/25 text-slate-900 dark:bg-vae-turquoise/25 dark:text-white',
      },
    ],
    []
  )

  const StackedBlocks = () => (
    <svg viewBox="0 0 320 220" role="presentation" className="h-full w-full">
      <defs>
        <linearGradient id="stackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(45,214,175,0.75)" />
          <stop offset="100%" stopColor="rgba(45,214,175,0.18)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" rx="18" fill="rgba(45,214,175,0.08)" />
      <g
        transform="translate(80 60)"
        fill="url(#stackGradient)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
        className="drop-shadow-[0_14px_38px_rgba(45,214,175,0.38)]"
      >
        <rect x="0" y="0" rx="16" ry="16" width="160" height="48" />
        <rect x="14" y="60" rx="14" ry="14" width="132" height="42" />
        <rect x="26" y="118" rx="12" ry="12" width="108" height="38" />
      </g>
      <circle cx="62" cy="188" r="9" fill="rgba(255,255,255,0.5)" />
      <circle cx="258" cy="188" r="9" fill="rgba(255,255,255,0.35)" />
      <line x1="72" y1="188" x2="248" y2="188" stroke="rgba(255,255,255,0.28)" strokeWidth="2" strokeDasharray="6 8" />
    </svg>
  )

  const card = beforeAfterContent[state]
  const isBefore = state === 'before'

  if (prefersReducedMotion) {
    return (
      <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-vae-turquoise/20 bg-gradient-to-br from-white via-vae-turquoise/5 to-white p-6 shadow-lg dark:from-bg-dark/70 dark:via-vae-turquoise/10 dark:to-bg-dark">
        <div className="flex items-center justify-between gap-4">
          <div className="rounded-full border border-white/10 bg-white/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-text-muted dark:bg-white/10">
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
      </div>
    )
  }

  return (
    <div
      id="before-after-visual"
      ref={containerRef}
      className="relative min-h-[360px] overflow-hidden rounded-3xl border border-vae-turquoise/25 bg-gradient-to-br from-vae-turquoise/10 via-white/10 to-white/5 p-6 shadow-xl backdrop-blur-sm dark:from-vae-turquoise/10 dark:via-white/10 dark:to-bg-dark"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(45,214,175,0.18),transparent_50%)]" />
      <div className="flex items-center justify-between gap-4">
        <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-text-muted">
          Infrastructure-Design
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-xs font-semibold text-text-muted">
          {(['before', 'after'] as const).map(key => (
            <button
              key={key}
              type="button"
              onClick={() => setState(key)}
              aria-pressed={state === key}
              className={cn(
                'rounded-full px-3 py-1 transition-colors duration-200',
                state === key
                  ? 'border border-vae-turquoise/40 bg-vae-turquoise/25 text-text-light'
                  : 'text-text-muted hover:text-text-light'
              )}
            >
              {key === 'before' ? 'Vorher' : 'Nachher'}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div className="space-y-3">
          <p
            className={cn(
              'text-xs font-semibold uppercase tracking-[0.32em]',
              isBefore ? 'text-red-300/80 dark:text-red-300/70' : 'text-vae-turquoise/90'
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
              className="space-y-2"
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{card.title}</h3>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-text-secondary">{card.body}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center gap-3 pt-3 text-sm text-gray-600 dark:text-text-secondary">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-vae-turquoise/50 to-transparent" />
            End-to-end orchestriert von VAE
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-vae-turquoise/50 to-transparent" />
          </div>
        </div>

        <div className="relative h-[260px] overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] dark:bg-white/5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_20%,rgba(45,214,175,0.22),transparent_55%)]" />

          {/* Scatter → Stack animation */}
          <div className="relative h-full w-full">
            {bubbleItems.map((bubble, idx) => {
              const baseScale = bubble.size / 60
              return (
                <motion.div
                  key={bubble.label}
                  className={cn(
                    'absolute flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-[12px] font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.15)] backdrop-blur-md',
                    bubble.hue
                  )}
                  aria-hidden
                  style={{
                    left: `${bubble.x}%`,
                    top: `${bubble.y}%`,
                  }}
                  animate={
                    isBefore
                      ? {
                          left: `${bubble.x}%`,
                          top: `${bubble.y}%`,
                          opacity: 0.92,
                          scale: baseScale,
                          x: [0, 2, -3, 0],
                          y: [0, -6, 4, 0],
                        }
                      : {
                          left: '52%',
                          top: '54%',
                          opacity: 0.18,
                          scale: baseScale * 0.45,
                          x: 0,
                          y: 0,
                        }
                  }
                  transition={
                    isBefore
                      ? {
                          duration: 6 + idx * 0.25,
                          repeat: Infinity,
                          repeatType: 'mirror',
                          ease: 'easeInOut',
                          delay: idx * 0.12,
                        }
                      : {
                          duration: 0.9,
                          ease: 'easeInOut',
                          delay: idx * 0.05,
                        }
                  }
                >
                  <span className="bg-current/60 h-2 w-2 rounded-full" aria-hidden />
                  <span className="truncate">{bubble.label}</span>
                </motion.div>
              )
            })}

            <AnimatePresence mode="wait" initial={false}>
              {isBefore ? (
                <motion.div
                  key="before-pulse"
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.12 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute inset-6 rounded-[24px] border border-white/10 bg-white/5" />
                </motion.div>
              ) : (
                <motion.div
                  key="after-stack"
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <StackedBlocks />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetupPage
