import {
  BookOpen,
  Briefcase,
  Building2,
  Check,
  Headphones,
  Minus,
  Plus,
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

import Seo from '../ui/Seo'
import MagneticButton from '../ui/buttons/MagneticButton'

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

const calendlyUrl = 'https://nc.intern.vae.systems/apps/calendar/appointment/RgxJERqNkfZz'

const SetupPage: React.FC = () => {
  const [teamSize, setTeamSize] = useState(20)
  const [customToolCost, setCustomToolCost] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const answerRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const [toolSelection, setToolSelection] = useState<Record<string, boolean>>(() => {
    return toolOptions.reduce<Record<string, boolean>>((acc, option) => {
      acc[option.id] = option.id === 'm365' || option.id === 'slack'
      return acc
    }, {})
  })

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

  const openSourceMonthly = 50
  const openSourceAnnual = openSourceMonthly * 12

  const estimatedSetupCost = useMemo(() => {
    const activeTools = Object.values(toolSelection).filter(Boolean).length
    const base = 1500
    const perUser = Math.max(teamSize - 5, 0) * 40
    const perTool = activeTools * 300
    const raw = base + perUser + perTool
    const clamped = Math.min(5000, Math.max(1500, raw))
    return Math.round(clamped / 100) * 100
  }, [toolSelection, teamSize])

  const yearOneSavings = useMemo(
    () => yearlySaaSCost - (estimatedSetupCost + openSourceAnnual),
    [yearlySaaSCost, estimatedSetupCost, openSourceAnnual]
  )
  const yearTwoSavings = useMemo(() => yearlySaaSCost - openSourceAnnual, [yearlySaaSCost, openSourceAnnual])

  const maxComparisonValue = Math.max(yearlySaaSCost, estimatedSetupCost + openSourceAnnual, openSourceAnnual)

  const openCalendly = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      ;(window as any).Calendly.initPopupWidget({ url: calendlyUrl })
    } else {
      window.open(calendlyUrl, '_blank', 'noopener,noreferrer')
    }
  }, [])

  const scrollToROI = useCallback(() => {
    const target = document.getElementById('roi-calculator')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const toggleFaq = useCallback((index: number) => {
    setOpenFaqIndex(prev => (prev === index ? null : index))
  }, [])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
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
          <div className="relative min-h-[320px] rounded-3xl border border-gray-200 bg-white p-8 shadow-md dark:border-white/10 dark:bg-white/5">
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-white/60">
                  Vorher
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Fragmentierte SaaS-Landschaft</h3>
                <p className="mt-2 text-gray-700 dark:text-text-secondary">
                  Viele Tools, hohe Kosten, Daten verstreut, Abhängigkeit von Anbietern.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">Nachher</p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Einheitliche Open-Source-Plattform
                </h3>
                <p className="mt-2 text-gray-700 dark:text-text-secondary">
                  Alle Prozesse auf Ihrer Infrastruktur, vollständig in Ihrer Kontrolle.
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-text-secondary">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:from-white/0 dark:via-white/50 dark:to-white/0" />
                End-to-end orchestriert von VAE
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:from-white/0 dark:via-white/50 dark:to-white/0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
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
      <section id="roi-calculator" className="border-y border-white/5 bg-bg-dark py-20">
        <div className="container-vae">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/60">ROI-Kalkulator</p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">Was sparen Sie mit Open Source?</h2>
            <p className="mt-3 text-lg text-text-secondary">Berechnen Sie Ihre jährliche Einsparung in Echtzeit.</p>
          </div>
          <div className="mt-12 grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 lg:grid-cols-[0.45fr_0.55fr]">
            <div className="space-y-8">
              <div>
                <label className="text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">
                  Anzahl Mitarbeiter
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

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">Aktuelle Tools</p>
                <div className="mt-4 space-y-3">
                  {toolOptions.map(option => (
                    <label
                      key={option.id}
                      className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-bg-darker/60 px-4 py-3 text-sm leading-relaxed text-text-secondary transition hover:border-vae-turquoise/50"
                    >
                      <input
                        type="checkbox"
                        checked={toolSelection[option.id]}
                        onChange={() =>
                          setToolSelection(prev => ({
                            ...prev,
                            [option.id]: !prev[option.id],
                          }))
                        }
                        className="h-4 w-4 accent-vae-turquoise"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">
                  Weitere SaaS-Tools (€ / Monat)
                </label>
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

            <div className="space-y-6 rounded-3xl border border-white/10 bg-bg-darker/60 p-6">
              <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-300">Aktueller Status</p>
                <div className="mt-3 grid gap-3 text-lg">
                  <div className="flex items-center justify-between text-text-secondary">
                    <span>Monatliche Kosten</span>
                    <span className="font-semibold text-white">{formatCurrency(monthlySaaSCost)}</span>
                  </div>
                  <div className="flex items-center justify-between text-text-secondary">
                    <span>Jährliche Kosten</span>
                    <span className="font-semibold text-white">{formatCurrency(yearlySaaSCost)}</span>
                  </div>
                </div>
              </div>

              <div className="border-vae-green/40 bg-vae-green/10 rounded-2xl border p-5">
                <p className="text-vae-green text-xs font-semibold uppercase tracking-[0.3em]">Mit Open Source</p>
                <div className="mt-3 space-y-3 text-lg">
                  <div className="flex items-center justify-between text-text-secondary">
                    <span>Einmalige Setup-Kosten</span>
                    <span className="font-semibold text-white">{formatCurrency(estimatedSetupCost)}</span>
                  </div>
                  <div className="flex items-center justify-between text-text-secondary">
                    <span>Jährliche Kosten (Hosting ca. {formatCurrency(openSourceMonthly)}/Monat)</span>
                    <span className="font-semibold text-white">{formatCurrency(openSourceAnnual)}</span>
                  </div>
                  <div className="flex items-center justify-between text-text-secondary">
                    <span>Einsparung Jahr 1</span>
                    <span className="font-semibold text-white">{formatCurrency(yearOneSavings)}</span>
                  </div>
                  <div className="flex items-center justify-between text-text-secondary">
                    <span>Einsparung ab Jahr 2</span>
                    <span className="font-semibold text-white">{formatCurrency(yearTwoSavings)}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text-secondary">Kostenvergleich</p>
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <div className="flex items-center justify-between text-text-secondary">
                      <span>SaaS pro Jahr</span>
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
                      <span>Setup + Jahr 1</span>
                      <span className="font-semibold text-white">
                        {formatCurrency(estimatedSetupCost + openSourceAnnual)}
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-vae-turquoise"
                        style={{
                          width: `${maxComparisonValue ? Math.max(((estimatedSetupCost + openSourceAnnual) / maxComparisonValue) * 100, 5) : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-text-secondary">
                      <span>Nur Hosting ab Jahr 2</span>
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

              <MagneticButton intensity={0.06} scaleEffect>
                <button onClick={openCalendly} className="btn-primary mt-2 w-full justify-center">
                  Individuelle Berechnung anfragen
                </button>
              </MagneticButton>
              <p className="text-sm text-text-secondary">
                Hinweis: Dies ist eine vereinfachte Schätzung. Im kostenlosen Beratungsgespräch erhalten Sie eine exakte
                Berechnung für Ihre Situation.
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
      <section className="py-20">
        <div className="container-vae">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/60">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">Häufige Fragen</h2>
          </div>
          <div className="mt-12 space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div key={item.question} className="rounded-2xl border border-white/10 bg-white/5">
                  <button
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-semibold text-white">{item.question}</span>
                    {isOpen ? (
                      <Minus className="h-5 w-5 text-vae-turquoise" />
                    ) : (
                      <Plus className="h-5 w-5 text-text-secondary" />
                    )}
                  </button>
                  <div
                    ref={el => {
                      answerRefs.current[index] = el
                    }}
                    style={{ maxHeight: isOpen ? `${answerRefs.current[index]?.scrollHeight ?? 0}px` : 0 }}
                    className="overflow-hidden px-6 transition-[max-height] duration-500 ease-in-out"
                  >
                    <p className="pb-6 text-base text-text-secondary">{item.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
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
    </div>
  )
}

export default SetupPage
