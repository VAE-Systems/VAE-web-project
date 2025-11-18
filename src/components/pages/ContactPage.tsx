import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Compass,
  GraduationCap,
  HelpCircle,
  Mail,
  MessageSquare,
} from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import MagneticButton from '@/components/ui/buttons/MagneticButton'
import { getHelpModeClasses, HelpButton, HelpIntroPopup, HelpPopup, useHelpMode } from '@/components/ui/help'
import Icon from '@/components/ui/Icon'
import Seo from '@/components/ui/Seo'
import { MailBuilderTutorialOverlay } from '@/components/ui/tutorial/MailBuilderTutorialOverlay'
import { ValidationPopup } from '@/components/ui/validation'
import { contactHero, contactIntro, contactUsps } from '@/content/contact'
import { useMailBuilderTutorial } from '@/hooks/useMailBuilderTutorial'

const MAIL_TO = 'info@vae.systems'

const projectIntents = [
  {
    id: 'automation',
    label: 'KI-Automatisierung',
    description: 'Agenten, Pipelines, Automatisierung von Wissensarbeit',
  },
  {
    id: 'infrastructure',
    label: 'Souveräne Infrastruktur',
    description: 'Selfhosting, Open Source, Observability & Operations',
  },
  {
    id: 'product',
    label: 'Produkt & KI-Strategy',
    description: 'Discovery, Prototyping, Product Ops und Growth-Loops',
  },
  {
    id: 'advisory',
    label: 'Advisory / Sparring',
    description: 'Sounding Board, Audits, zweite Meinung für Management',
  },
]

const timelineOptions = [
  { id: 'now', label: 'Sofort / < 4 Wochen' },
  { id: 'soon', label: 'In 4–8 Wochen' },
  { id: 'later', label: 'In diesem Quartal' },
]

const companyStages = [
  { id: 'scaleup', label: 'Scale-up / Tech-Team vorhanden' },
  { id: 'sme', label: 'Mittelstand / IT vorhanden' },
  { id: 'greenfield', label: 'Greenfield / Aufbauphase' },
]

const collaborationModes = [
  { id: 'project', label: 'Projekt' },
  { id: 'retainer', label: 'Retainer' },
  { id: 'sparring', label: 'Sparring / Audit' },
]

// Help texts for all interactive elements
const helpTexts = {
  automation: {
    title: 'KI-Automatisierung',
    description:
      'Wir bauen intelligente Agenten und Workflows, die repetitive Wissensarbeit automatisieren – von Datenverarbeitung bis zu komplexen Entscheidungsprozessen.',
  },
  infrastructure: {
    title: 'Souveräne Infrastruktur',
    description:
      'Self-Hosting, Open-Source-Lösungen und vollständige Kontrolle über Ihre Daten. Ideal für Unternehmen, die Unabhängigkeit von Cloud-Anbietern suchen.',
  },
  product: {
    title: 'Produkt & KI-Strategy',
    description:
      'Von der Idee zum marktreifen Produkt: Discovery-Workshops, Prototyping, Product Operations und datengetriebene Growth-Strategien.',
  },
  advisory: {
    title: 'Advisory / Sparring',
    description:
      'Externe Perspektive für kritische Entscheidungen: Technologie-Audits, Architektur-Reviews und strategisches Sparring für CTOs und Geschäftsführung.',
  },
  timeline: {
    title: 'Startzeitpunkt',
    description:
      'Wann möchten Sie starten? "Sofort" bedeutet binnen 2-4 Wochen, "Quartal" plant längerfristig. Hilft uns bei der Kapazitätsplanung.',
  },
  companyStage: {
    title: 'Team & Setup',
    description:
      'Ihr aktueller Tech-Reifegrad: Scale-up mit bestehendem Team, Mittelstand mit IT-Abteilung oder Greenfield-Aufbau von Grund auf.',
  },
  collabMode: {
    title: 'Zusammenarbeitsmodell',
    description:
      'Projekt = festes Deliverable. Retainer = kontinuierliche Begleitung. Sparring = regelmäßige Strategy-Sessions ohne Umsetzung.',
  },
}

const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const mailBuilderRef = useRef<HTMLDivElement>(null)
  const hasAutoStarted = useRef(false)

  const [selectedIntents, setSelectedIntents] = React.useState<string[]>([])
  const [timeline, setTimeline] = React.useState<string>('')
  const [companyStage, setCompanyStage] = React.useState<string>('')
  const [collabMode, setCollabMode] = React.useState<string>('')
  const [contactName, setContactName] = React.useState('')
  const [companyName, setCompanyName] = React.useState('')
  const [position, setPosition] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [notes, setNotes] = React.useState('')
  const [validationError, setValidationError] = React.useState('')

  const { helpMode, showHelp } = useHelpMode(helpTexts)
  const tutorial = useMailBuilderTutorial()

  // Pre-Selection from URL parameters (e.g., from booking page)
  useEffect(() => {
    const intentParam = searchParams.get('intent')
    const sourceParam = searchParams.get('source')

    if (intentParam && projectIntents.find(i => i.id === intentParam)) {
      setSelectedIntents([intentParam])
    }

    // Optional: Log source for analytics
    if (sourceParam) {
      console.log('User came from:', sourceParam)
    }
  }, [searchParams])

  // Auto-start tutorial on first visit to mail-builder section
  useEffect(() => {
    if (tutorial.hasCompleted || tutorial.hasSkipped || hasAutoStarted.current) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAutoStarted.current) {
            hasAutoStarted.current = true
            // Delay tutorial start slightly for smooth UX
            setTimeout(() => {
              tutorial.startTutorial()
            }, 500)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (mailBuilderRef.current) {
      observer.observe(mailBuilderRef.current)
    }

    return () => observer.disconnect()
  }, [tutorial])

  const toggleIntent = (id: string) => {
    setSelectedIntents(prev => (prev.includes(id) ? prev.filter(intent => intent !== id) : [...prev, id]))
  }

  const intentLabels = React.useMemo(
    () => projectIntents.filter(intent => selectedIntents.includes(intent.id)).map(intent => intent.label),
    [selectedIntents]
  )

  const timelineLabel = React.useMemo(
    () => timelineOptions.find(option => option.id === timeline)?.label ?? timelineOptions[0].label,
    [timeline]
  )

  const companyStageLabel = React.useMemo(
    () => companyStages.find(stage => stage.id === companyStage)?.label ?? companyStages[0].label,
    [companyStage]
  )

  const collaborationLabel = React.useMemo(
    () => collaborationModes.find(mode => mode.id === collabMode)?.label ?? collaborationModes[0].label,
    [collabMode]
  )

  // Format notes for email: add automatic line breaks for better formatting
  const formatNotesForEmail = React.useMemo(() => {
    if (!notes.trim()) return '---'

    // Split into words and rebuild with automatic line breaks
    const words = notes.split(' ')
    const lines: string[] = []
    let currentLine = ''

    for (const word of words) {
      if ((currentLine + ' ' + word).length > 50) {
        if (currentLine) {
          lines.push(currentLine)
          currentLine = word
        } else {
          lines.push(word)
          currentLine = ''
        }
      } else {
        currentLine = currentLine ? currentLine + ' ' + word : word
      }
    }

    if (currentLine) {
      lines.push(currentLine)
    }

    // Preserve existing line breaks from user and combine with auto-formatting
    const userLines = notes.split('\n')
    if (userLines.length > 1) {
      // If user already has line breaks, use them but apply auto-formatting to long lines
      return userLines
        .map(line => {
          if (line.length > 50) {
            const lineWords = line.split(' ')
            const formattedLine: string[] = []
            let linePart = ''
            for (const word of lineWords) {
              if ((linePart + ' ' + word).length > 50) {
                if (linePart) {
                  formattedLine.push(linePart)
                  linePart = word
                } else {
                  formattedLine.push(word)
                  linePart = ''
                }
              } else {
                linePart = linePart ? linePart + ' ' + word : word
              }
            }
            if (linePart) {
              formattedLine.push(linePart)
            }
            return formattedLine.join('\n')
          }
          return line
        })
        .join('\n')
    }

    return lines.join('\n')
  }, [notes])

  const mailPreview = React.useMemo(() => {
    const nameParts = [contactName || '[Ihr Name]']
    if (companyName) nameParts.push(`von ${companyName}`)
    const nameLine = `mein Name ist ${nameParts.join(', ')}.`

    const intentLine =
      intentLabels.length > 0
        ? `Wir interessieren uns für ${intentLabels.join(', ')}.`
        : 'Wir möchten gemeinsam ausloten, wie wir mit Ihnen arbeiten können.'

    const emailLines = [
      'Hallo Julian und Jakob,',
      '',
      ` ${nameLine}`,
      ` ${intentLine}`,
      ` Geplanter Startzeitraum: ${timelineLabel}.`,
      ` Team & Setup: ${companyStageLabel}.`,
      ` Gewünschtes Zusammenarbeitsmodell: ${collaborationLabel}.`,
      ` Kontext/Notizen: ${formatNotesForEmail}`,
    ]

    if (phone) {
      emailLines.push(` Telefon: ${phone}`)
    }

    emailLines.push('', 'Lassen Sie uns gern sprechen.', '', 'Beste Grüße', contactName || '[Ihr Name]')

    // Boss-Style signature: Position, Company on separate line
    if (position && companyName) {
      emailLines.push(`${position}, ${companyName}`)
    } else if (position) {
      emailLines.push(position)
    } else if (companyName) {
      emailLines.push(companyName)
    }

    return emailLines.join('\n')
  }, [
    companyName,
    companyStageLabel,
    contactName,
    position,
    phone,
    collaborationLabel,
    intentLabels,
    timelineLabel,
    formatNotesForEmail,
  ])

  const handlePrepareEmail = () => {
    // Validate required fields
    const missingFields: string[] = []
    if (!contactName.trim()) missingFields.push('Name')
    if (!companyName.trim()) missingFields.push('Unternehmen')

    if (missingFields.length > 0) {
      setValidationError(`Bitte folgende Pflichtfelder ausfüllen: ${missingFields.join(', ')}`)
      // Auto-clear error after 5 seconds
      setTimeout(() => setValidationError(''), 5000)
      return
    }

    // Clear any previous errors
    setValidationError('')

    // All required fields are filled, proceed with email
    const subjectParts = ['Kontakt VAE Systems', intentLabels[0], companyName || undefined].filter(Boolean)
    const subject = subjectParts.join(' | ')
    const mailto = `mailto:${MAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailPreview)}`
    window.location.href = mailto
  }

  return (
    <div className="bg-white text-gray-900 dark:bg-bg-darker dark:text-text-light">
      <Seo
        title="Kontakt | VAE Systems"
        description="Sprechen Sie mit VAE Systems über KI-Automatisierungen, souveräne Infrastruktur oder strategisches Sparring."
        canonicalPath="/contact"
      />

      <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-b from-gray-50 via-white to-gray-100 py-28 dark:border-white/5 dark:bg-gradient-to-b dark:from-bg-darker dark:via-[#050a0c] dark:to-bg-dark">
        <div className="pointer-events-none absolute inset-0 opacity-80" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(5,248,200,0.15),transparent_55%),radial-gradient(circle_at_bottom,rgba(5,248,200,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_top,rgba(var(--vae-turquoise-rgb),0.3),transparent_55%),radial-gradient(circle_at_bottom,rgba(5,248,200,0.12),transparent_70%)]" />
        </div>
        <div className="container-vae relative flex flex-col gap-10 text-center lg:flex-row lg:items-center lg:text-left">
          <div className="flex-1 space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise dark:text-vae-turquoise/80">
              {contactHero.title}
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-gray-900 dark:text-white md:text-5xl">
              {contactHero.subtitle}
            </h1>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-white/70">{contactIntro.body}</p>
            <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-center lg:justify-start">
              <MagneticButton className="w-full sm:w-auto">
                <button
                  type="button"
                  className="btn-primary flex w-full items-center justify-center gap-3 px-8 py-3.5 text-base"
                  onClick={() => {
                    const booking = document.getElementById('booking')
                    booking?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                >
                  Termin anfragen
                  <ArrowUpRight className="h-5 w-5" />
                </button>
              </MagneticButton>
              <MagneticButton className="w-full sm:w-auto">
                <button
                  type="button"
                  className="btn-secondary flex w-full items-center justify-center gap-3 px-8 py-3.5 text-base"
                  onClick={() => {
                    const mailBuilder = document.getElementById('mail-builder')
                    mailBuilder?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                >
                  Mail Builder öffnen
                  <ArrowUpRight className="h-5 w-5" />
                </button>
              </MagneticButton>
              <Link
                to="/referenzen"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-vae-turquoise/60 hover:text-vae-turquoise dark:border-white/15 dark:text-white/70 dark:hover:text-white sm:w-auto"
              >
                Referenzen ansehen
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="flex-1 rounded-[32px] border border-gray-200 bg-white p-8 text-left shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_35px_80px_rgba(0,0,0,0.45)]">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-vae-turquoise dark:text-vae-turquoise/70">
              Antwortzeiten
            </p>
            <ul className="mt-6 space-y-5 text-gray-700 dark:text-white/80">
              <li className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 dark:border-white/10 dark:bg-white/[0.04]">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-vae-turquoise dark:text-vae-turquoise/70">
                  Schnelle Antwort
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-white/70">
                  Wir reagieren werktags innerhalb von 24 Stunden mit einem persönlichen Vorschlag.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-gray-50 py-20 dark:border-white/5 dark:bg-bg-dark">
        <div className="container-vae space-y-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise dark:text-vae-turquoise/70">
              Warum VAE Systems
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
              {contactIntro.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-white/70">{contactIntro.body}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {contactUsps.map(usp => (
              <div
                key={usp.key}
                className="group rounded-[28px] border border-gray-200 bg-white p-6 text-center shadow-md transition hover:-translate-y-1 hover:border-vae-turquoise/30 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.02] dark:shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-vae-turquoise/10 text-vae-turquoise">
                  <Icon name={usp.icon} size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{usp.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-white/70">{usp.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="border-b border-gray-200 bg-white py-20 dark:border-white/5 dark:bg-bg-darker">
        <div className="container-vae">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise dark:text-vae-turquoise/70">
                Direkt Termin buchen
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
                Wählen Sie den passenden Termin-Typ
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-white/70">
                Wir nutzen die Infos, um den Call optimal vorzubereiten und Ihnen direkt den richtigen Ansprechpartner
                zuzuordnen.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <a
                href="https://nc.intern.vae.systems/apps/calendar/appointment/RgxJERqNkfZz"
                target="_blank"
                rel="noreferrer noopener"
                className="group rounded-[24px] border border-gray-200 bg-gray-50 p-6 text-left transition-all hover:-translate-y-1 hover:border-vae-turquoise/40 hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.04] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Erstberatung KI-Automatisierung · 30 Min
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-white/70">
                      Für Scale-ups & Mittelstand: KI-Roadmap, Quick Wins & Priorisierung.
                    </p>
                  </div>
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-gray-300 bg-white text-vae-turquoise transition-colors group-hover:border-vae-turquoise/60 dark:border-white/15 dark:bg-white/5">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                </div>
              </a>

              <a
                href="https://nc.intern.vae.systems/apps/calendar/appointment/Infra45VAE"
                target="_blank"
                rel="noreferrer noopener"
                className="group rounded-[24px] border border-gray-200 bg-gray-50 p-6 text-left transition-all hover:-translate-y-1 hover:border-vae-turquoise/40 hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.04] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Infrastruktur-Audit · 45 Min
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-white/70">
                      Self-Hosting, Cloud-Migration, Security & Compliance-Check.
                    </p>
                  </div>
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-gray-300 bg-white text-vae-turquoise transition-colors group-hover:border-vae-turquoise/60 dark:border-white/15 dark:bg-white/5">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                </div>
              </a>

              <a
                href="https://nc.intern.vae.systems/apps/calendar/appointment/PLACEHOLDER_ADVISORY"
                target="_blank"
                rel="noreferrer noopener"
                className="group rounded-[24px] border border-gray-200 bg-gray-50 p-6 text-left transition-all hover:-translate-y-1 hover:border-vae-turquoise/40 hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.04] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Strategic Advisory · 45 Min</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-white/70">
                      Für CTOs & Führungskräfte: Langfristige Architektur & Team-Setup.
                    </p>
                  </div>
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-gray-300 bg-white text-vae-turquoise transition-colors group-hover:border-vae-turquoise/60 dark:border-white/15 dark:bg-white/5">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                </div>
              </a>

              <a
                href="https://nc.intern.vae.systems/apps/calendar/appointment/PartnerCallVAE"
                target="_blank"
                rel="noreferrer noopener"
                className="group rounded-[24px] border border-gray-200 bg-gray-50 p-6 text-left transition-all hover:-translate-y-1 hover:border-vae-turquoise/40 hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.04] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Partnership & Netzwerk · 30 Min
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-white/70">
                      Für Freelancer, Agenturen & Partner: Co-Delivery & Kooperationen.
                    </p>
                  </div>
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-gray-300 bg-white text-vae-turquoise transition-colors group-hover:border-vae-turquoise/60 dark:border-white/15 dark:bg-white/5">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                </div>
              </a>

              <a
                href="https://nc.intern.vae.systems/apps/calendar/appointment/PLACEHOLDER_RETAINER"
                target="_blank"
                rel="noreferrer noopener"
                className="group rounded-[24px] border border-gray-200 bg-gray-50 p-6 text-left transition-all hover:-translate-y-1 hover:border-vae-turquoise/40 hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.04] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Retainer-Planung · 30 Min</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-white/70">
                      Kontinuierliche Begleitung: Sparring, Support & operative Projekte.
                    </p>
                  </div>
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-gray-300 bg-white text-vae-turquoise transition-colors group-hover:border-vae-turquoise/60 dark:border-white/15 dark:bg-white/5">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                </div>
              </a>

              <a
                href="https://nc.intern.vae.systems/apps/calendar/appointment/PLACEHOLDER_WORKSHOP"
                target="_blank"
                rel="noreferrer noopener"
                className="group rounded-[24px] border border-gray-200 bg-gray-50 p-6 text-left transition-all hover:-translate-y-1 hover:border-vae-turquoise/40 hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.04] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Workshop-Anfrage · 20 Min</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-white/70">
                      Team-Workshops, Trainings & Knowledge-Transfer zu KI & Infrastruktur.
                    </p>
                  </div>
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-gray-300 bg-white text-vae-turquoise transition-colors group-hover:border-vae-turquoise/60 dark:border-white/15 dark:bg-white/5">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                </div>
              </a>
            </div>

            {/* Call-Vorbereitung Resources */}
            <div className="rounded-[28px] border border-gray-200 bg-gray-50 p-8 dark:border-white/10 dark:bg-white/[0.02]">
              <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Call-Vorbereitung & Ressourcen
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <a
                  href="https://docs.vae.systems/s/erstberatung-ablauf"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-vae-turquoise/40 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-vae-turquoise/10 text-vae-turquoise">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">Ablauf & Agenda</p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-white/70">
                      Was passiert im Call, welche Ergebnisse liefern wir?
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-vae-turquoise dark:text-white/40" />
                </a>

                <a
                  href="https://docs.vae.systems/s/vorbereitung-erstberatung"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-vae-turquoise/40 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-vae-turquoise/10 text-vae-turquoise">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">Vorbereitung</p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-white/70">
                      Optionales Material, damit wir gleich tief einsteigen.
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-vae-turquoise dark:text-white/40" />
                </a>

                <a
                  href="https://docs.vae.systems/s/erstberatung-faq"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-vae-turquoise/40 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-vae-turquoise/10 text-vae-turquoise">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">FAQ</p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-white/70">
                      Budget, Security, Timeline – die häufigsten Fragen.
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-vae-turquoise dark:text-white/40" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="mail-builder"
        ref={mailBuilderRef}
        className="bg-gradient-to-b from-gray-100 via-white to-gray-50 py-24 dark:bg-gradient-to-b dark:from-bg-dark dark:via-[#081014] dark:to-bg-darker"
      >
        <div className="container-vae grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise dark:text-vae-turquoise/70">
                  Mail Builder
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
                  In drei Schritten zur perfekten Mail
                </h2>
                <p className="mt-3 text-base leading-relaxed text-gray-600 dark:text-white/70">
                  Treffen Sie eine Auswahl zu Thema, Setup und Timing. Wir generieren daraus eine vorformulierte E-Mail,
                  die in Ihrem Mailclient geöffnet wird.
                </p>
              </div>
              <div className="flex gap-2" data-tutorial="buttons">
                <button
                  onClick={tutorial.startTutorial}
                  className="rounded-2xl border border-vae-turquoise/30 bg-vae-turquoise/10 p-3 text-vae-turquoise transition-all hover:bg-vae-turquoise/20 hover:shadow-lg hover:shadow-vae-turquoise/20"
                  aria-label="Tutorial starten"
                  title="Tutorial starten"
                >
                  <GraduationCap className="h-5 w-5" />
                </button>
                <HelpButton />
              </div>
            </div>

            <div className="space-y-6">
              <div data-tutorial="intents">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-white/60">
                  1. Themen
                </p>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {projectIntents.map(intent => {
                    const isActive = selectedIntents.includes(intent.id)
                    return (
                      <button
                        key={intent.id}
                        type="button"
                        onClick={() => {
                          if (helpMode) {
                            showHelp(intent.id)
                          } else {
                            toggleIntent(intent.id)
                          }
                        }}
                        className={getHelpModeClasses(
                          helpMode,
                          `rounded-2xl border px-4 py-3 text-left transition ${
                            isActive
                              ? 'border-vae-turquoise/60 bg-vae-turquoise/10 text-gray-900 dark:text-white'
                              : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 dark:border-white/10 dark:bg-white/[0.02] dark:text-white/70 dark:hover:border-white/25'
                          }`
                        )}
                      >
                        <p className="text-sm font-semibold">{intent.label}</p>
                        <p className="text-xs text-gray-500 dark:text-white/60">{intent.description}</p>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div data-tutorial="timeline">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-white/60">
                    2. Zeitpunkt
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {timelineOptions.map(option => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          if (helpMode) {
                            showHelp('timeline')
                          } else {
                            setTimeline(option.id)
                          }
                        }}
                        className={getHelpModeClasses(
                          helpMode,
                          `rounded-full border px-4 py-2 text-xs font-medium transition ${
                            timeline === option.id
                              ? 'border-vae-turquoise/50 bg-vae-turquoise/10 text-gray-900 dark:text-white'
                              : 'border-gray-300 text-gray-600 hover:border-gray-400 dark:border-white/10 dark:text-white/60 dark:hover:border-white/20'
                          }`
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div data-tutorial="setup">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-white/60">
                    3. Setup
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {companyStages.map(stage => (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => {
                          if (helpMode) {
                            showHelp('companyStage')
                          } else {
                            setCompanyStage(stage.id)
                          }
                        }}
                        className={getHelpModeClasses(
                          helpMode,
                          `rounded-full border px-4 py-2 text-xs font-medium transition ${
                            companyStage === stage.id
                              ? 'border-vae-turquoise/50 bg-vae-turquoise/10 text-gray-900 dark:text-white'
                              : 'border-gray-300 text-gray-600 hover:border-gray-400 dark:border-white/10 dark:text-white/60 dark:hover:border-white/20'
                          }`
                        )}
                      >
                        {stage.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div data-tutorial="collaboration">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-white/60">
                  Zusammenarbeitsmodell
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {collaborationModes.map(mode => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => {
                        if (helpMode) {
                          showHelp('collabMode')
                        } else {
                          setCollabMode(mode.id)
                        }
                      }}
                      className={getHelpModeClasses(
                        helpMode,
                        `rounded-full border px-4 py-2 text-xs font-medium transition ${
                          collabMode === mode.id
                            ? 'border-vae-turquoise/50 bg-vae-turquoise/10 text-gray-900 dark:text-white'
                            : 'border-gray-300 text-gray-600 hover:border-gray-400 dark:border-white/10 dark:text-white/60 dark:hover:border-white/20'
                        }`
                      )}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-white/70">
                  Name <span className="text-vae-turquoise">*</span>
                  <input
                    type="text"
                    value={contactName}
                    onChange={event => setContactName(event.target.value)}
                    placeholder="Ihr Name"
                    className="rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-vae-turquoise/60 focus:outline-none dark:border-white/10 dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/40"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-white/70">
                  Position <span className="text-xs text-gray-400 dark:text-white/40">(optional)</span>
                  <input
                    type="text"
                    value={position}
                    onChange={event => setPosition(event.target.value)}
                    placeholder="z.B. CTO, Geschäftsführung, Projektleitung"
                    className="rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-vae-turquoise/60 focus:outline-none dark:border-white/10 dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/40"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-white/70">
                  Unternehmen <span className="text-vae-turquoise">*</span>
                  <input
                    type="text"
                    value={companyName}
                    onChange={event => setCompanyName(event.target.value)}
                    placeholder="Firmenname"
                    className="rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-vae-turquoise/60 focus:outline-none dark:border-white/10 dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/40"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-white/70">
                  Telefon <span className="text-xs text-gray-400 dark:text-white/40">(optional)</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={event => setPhone(event.target.value)}
                    placeholder="+49 151 12345678"
                    className="rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-vae-turquoise/60 focus:outline-none dark:border-white/10 dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/40"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-white/70">
                Kontext oder Notizen
                <textarea
                  value={notes}
                  onChange={event => setNotes(event.target.value)}
                  placeholder="Bestehende Systeme, KPIs, gewünschte Deliverables …"
                  className="max-h-[400px] min-h-[120px] resize-none overflow-y-auto rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-vae-turquoise/60 focus:outline-none dark:border-white/10 dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/40"
                  rows={5}
                />
              </label>
            </div>

            <MagneticButton className="w-full lg:w-auto">
              <button
                type="button"
                onClick={handlePrepareEmail}
                className="btn-primary flex w-full items-center justify-center gap-3 text-base"
              >
                Mail vorbereiten
                <Mail className="h-5 w-5" />
              </button>
            </MagneticButton>
          </div>
          <div
            data-tutorial="preview"
            className="space-y-6 rounded-[32px] border border-gray-200 bg-white p-8 shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_35px_90px_rgba(0,0,0,0.55)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-vae-turquoise dark:text-vae-turquoise/70">
              Vorschau (wird in Ihrem Mailprogramm geöffnet)
            </p>
            <pre className="min-h-[360px] whitespace-pre-wrap rounded-2xl border border-gray-300 bg-gray-50 p-5 text-sm leading-relaxed text-gray-800 dark:border-white/10 dark:bg-black/40 dark:text-white/80">
              {mailPreview}
            </pre>
            <div className="rounded-2xl border border-dashed border-gray-300 px-4 py-3 text-xs text-gray-500 dark:border-white/20 dark:text-white/60">
              Tipp: Ergänzen Sie im Mailprogramm Ihre Signatur oder weitere Anhänge. Wir antworten mit einem konkreten
              Vorschlag für das Erstgespräch.
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-gray-50 py-20 dark:border-white/5 dark:bg-bg-darker">
        <div className="container-vae grid gap-6 md:grid-cols-2">
          <div className="rounded-[28px] border border-gray-200 bg-white p-6 text-center shadow-md dark:border-white/10 dark:bg-white/[0.02] dark:shadow-none">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-vae-turquoise/10 text-vae-turquoise">
              <Mail className="h-5 w-5" />
            </div>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.35em] text-gray-500 dark:text-white/60">
              E-Mail
            </p>
            <a
              href={`mailto:${MAIL_TO}`}
              className="mt-2 text-lg font-semibold text-gray-900 hover:text-vae-turquoise dark:text-white"
            >
              {MAIL_TO}
            </a>
            <p className="mt-2 text-sm text-gray-600 dark:text-white/60">Direkt schreiben – immer willkommen.</p>
          </div>
          <div className="rounded-[28px] border border-gray-200 bg-white p-6 text-center shadow-md dark:border-white/10 dark:bg-white/[0.02] dark:shadow-none">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-vae-turquoise/10 text-vae-turquoise">
              <MessageSquare className="h-5 w-5" />
            </div>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.35em] text-gray-500 dark:text-white/60">
              LinkedIn
            </p>
            <a
              href="https://www.linkedin.com/company/vae-systems/"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-2 text-lg font-semibold text-gray-900 hover:text-vae-turquoise dark:text-white"
            >
              VAE Systems
            </a>
            <p className="mt-2 text-sm text-gray-600 dark:text-white/60">Für schnelle Abstimmungen oder Follow-ups.</p>
          </div>
        </div>
      </section>

      <React.Suspense
        fallback={<div className="py-24 text-center text-sm text-gray-500 dark:text-white/60">Lade FAQ …</div>}
      >
        <FAQSection />
      </React.Suspense>

      {/* Help Popups (managed by help system) */}
      <HelpIntroPopup />
      <HelpPopup />

      {/* Tutorial Overlay */}
      <MailBuilderTutorialOverlay tutorial={tutorial} />

      {/* Validation Popup */}
      <ValidationPopup message={validationError} isOpen={!!validationError} onClose={() => setValidationError('')} />
    </div>
  )
}

const FAQSection = React.lazy(() => import('@/components/sections/FAQSection'))

export default ContactPage
