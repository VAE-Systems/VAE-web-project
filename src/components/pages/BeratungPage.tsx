import { BOOKING_LINKS } from '@/config/booking'
/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  BERATUNG PAGE                                                            ┃
 * ┃  Strategieberatungs-Landingpage → Discovery bis Roadmap.                  ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎛️ CORE
 * ├── FeatureCard[]        → "Was ist enthalten" Cards
 * ├── ProcessStep[]        → Prozess-Timeline
 * ├── TargetProfile[]      → Zielgruppen-Karten
 * ├── PhaseCard[]          → Beratungsphasen-Optionen
 * └── TransformationStat[] → Kennzahlen/Stats
 *
 * ⛓️ GATES
 * └── prefers-reduced-motion → Skip GSAP animations
 *
 * 🔁 SIDE-EFFECTS
 * └── GSAP ScrollTrigger    → Section/Card entrance animations
 *
 * 📐 LAYOUT
 * ├── Hero Section
 * ├── Features Grid
 * ├── Process Timeline
 * ├── Target Profiles
 * ├── Phase Options
 * ├── Transformation Stats
 * └── FAQ + Final CTA
 */

import { faqEntries } from '@/content/shared/faqData'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  FileText,
  GitBranch,
  Map,
  Search,
  Shield,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import FaqAccordion from '../ui/FaqAccordion'
import Seo from '../ui/Seo'
import MagneticButton from '../ui/buttons/MagneticButton'

// ═══════════════════════════════════════════════════════════════════════════
// 🎛️ CORE — Types & Data
// ═══════════════════════════════════════════════════════════════════════════

interface FeatureCard {
  icon: React.ElementType
  title: string
  description: string
  badge: string
  outputs: string[]
}

interface ProcessStep {
  number: string
  title: string
  duration: string
  outcome: string
  description: string
  details: string[]
}

interface TargetProfile {
  icon: React.ElementType
  title: string
  subtitle: string
  features: string[]
  badge: string
  badgeVariant: 'optimal' | 'sehr' | 'perfekt'
}

interface PhaseCard {
  option: string
  title: string
  description: string
  features: string[]
  duration?: string
  investment: string
  cta?: {
    label: string
    href: string
  }
  secondary?: {
    label: string
    href: string
  }
}

interface TransformationStat {
  id: string
  highlight: string
  ariaLabel: string
  description: string
  source: string
  sourceUrl?: string
}

const features: FeatureCard[] = [
  {
    icon: Target,
    title: 'Kostenlose Erstanalyse',
    description:
      '45-minütiges Strategiegespräch, um Ihre Ausgangslage zu verstehen. Keine Verkaufspräsentation, keine Verpflichtung.',
    badge: 'Kickoff',
    outputs: ['45 Min Strategiegespräch', 'Executive Summary in 24h'],
  },
  {
    icon: Search,
    title: 'Bestandsaufnahme & Gap-Analyse',
    description:
      'Detaillierte Evaluation Ihrer aktuellen Systemlandschaft, Prozesse und Kosten. Inklusive schriftlichem Analyse-Report.',
    badge: 'Report',
    outputs: ['System- & Kosten-Review', 'Schriftlicher Analyse-Report'],
  },
  {
    icon: BarChart3,
    title: 'Business-Case-Entwicklung',
    description:
      'Was kostet der Status Quo? Welche ROI-Potenziale bieten Alternativen? Fundierte Zahlen statt Vermutungen.',
    badge: 'ROI-Modell',
    outputs: ['Kosten/Nutzen je Option', 'Sensitivitätsanalyse'],
  },
  {
    icon: Map,
    title: 'Strategische Roadmap',
    description:
      'Schrittweiser Transformationsplan: Von der IST-Situation zur SOLL-Architektur. Mit Meilensteinen, Timeline und Ressourcenplanung.',
    badge: 'Roadmap',
    outputs: ['Meilensteine & Timeline', 'Ressourcen- und Risiko-Plan'],
  },
  {
    icon: GitBranch,
    title: 'Szenario-Planung',
    description:
      'Nicht die "eine perfekte Lösung", sondern 3 realistische Strategieoptionen – zugeschnitten auf Budget, Zeitrahmen und Risikobereitschaft.',
    badge: 'Strategieoptionen',
    outputs: ['Risiko-/Budget-Abgleich', 'Realistische Alternativen'],
  },
  {
    icon: FileText,
    title: 'Transparentes Angebot',
    description:
      'Nach der Beratung erhalten Sie ein detailliertes, schriftliches Angebot mit Preisen, Lieferobjekten und Timeline. Keine versteckten Kosten.',
    badge: 'Angebot',
    outputs: ['Lieferobjekte & Preise', 'Timeline ohne Hidden Fees'],
  },
]

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Strategiegespräch',
    duration: '45 Minuten · kostenlos',
    outcome: 'Gemeinsame Zieldefinition & Priorisierung',
    description:
      'In einem strukturierten Erstgespräch erfassen wir Ihre aktuelle Situation, Herausforderungen und strategische Ziele. Wir hören zu, stellen gezielte Fragen und geben eine erste Einschätzung.',
    details: [
      'Per Video-Call oder vor Ort (nach Vereinbarung)',
      'Keine Vorbereitung Ihrerseits erforderlich',
      'Terminvergabe innerhalb von 48 Stunden möglich',
    ],
  },
  {
    number: '02',
    title: 'Analyse & Strategieentwicklung',
    duration: '1–2 Wochen Analyse',
    outcome: 'Analyse-Report, ROI-Prognose, Roadmap',
    description:
      'Wir führen eine detaillierte Ist-Analyse durch, bewerten Ihre Systemlandschaft und entwickeln auf dieser Basis 3 strategische Handlungsoptionen mit konkreten Umsetzungswegen.',
    details: [
      'Schriftlicher Analyse-Report (PDF) mit Executive Summary',
      'Business-Case-Berechnung mit ROI-Prognose',
      'Strategische Roadmap mit Meilensteinen und Timeline',
    ],
  },
  {
    number: '03',
    title: 'Präsentation & Entscheidungsgrundlage',
    duration: '90 Minuten Review',
    outcome: 'Entscheidungsgrundlage & Angebot',
    description:
      'Wir präsentieren Ihnen die Ergebnisse in einem strukturierten Termin und beantworten alle offenen Fragen. Sie erhalten alle Unterlagen und entscheiden in Ruhe über das weitere Vorgehen.',
    details: [
      'Detailliertes, transparentes Angebot (bei Interesse an Umsetzung)',
      'Keine Verpflichtung zur Zusammenarbeit',
      'Optional: Weitere Beratungsleistungen buchbar',
    ],
  },
]

const targetProfiles: TargetProfile[] = [
  {
    icon: TrendingUp,
    title: 'SaaS-Kosten außer Kontrolle',
    subtitle: 'Sie zahlen €20.000+/Jahr für Cloud-Tools',
    features: [
      'Vendor-Lock-in bei Microsoft, Salesforce & Co.',
      'Lizenzkosten steigen mit jedem Team-Zuwachs',
      'DSGVO-Compliance wird zur Herausforderung',
    ],
    badge: 'ROI in 12–18 Monaten',
    badgeVariant: 'optimal',
  },
  {
    icon: Zap,
    title: 'Wachstum überfordert die Struktur',
    subtitle: 'Ihr Team wächst schneller als Ihre Systeme',
    features: [
      'Manuelle Prozesse bremsen das Geschäft',
      'Jede Abteilung nutzt eigene Tools (Silos)',
      'Onboarding neuer Mitarbeitender dauert Wochen',
    ],
    badge: 'Skalierung ohne Chaos',
    badgeVariant: 'sehr',
  },
  {
    icon: Shield,
    title: 'KI ohne Governance',
    subtitle: 'Sie nutzen KI-Tools, aber ohne Strategie',
    features: [
      'Keine Richtlinien für ChatGPT, Copilot & Co.',
      'Unsicherheit bei EU AI Act & Datenschutz',
      'IT-Budget wächst, aber ROI unklar',
    ],
    badge: 'Compliance-Ready',
    badgeVariant: 'perfekt',
  },
]

const phases: PhaseCard[] = [
  {
    option: 'Option A',
    title: 'Full-Service',
    description: 'Wir übernehmen die komplette Umsetzung – Ende-zu-Ende, inklusive Go-Live.',
    features: [
      'Komplette Umsetzung der Infrastruktur',
      'Setup & Konfiguration (Security, Monitoring, Backups)',
      'Migration/Integration mit klaren Cutover-Plänen',
      'Dokumentation & Training',
      'Go-Live-Begleitung + Hypercare',
    ],
    duration: 'Dauer: 2–6 Monate (je nach Umfang)',
    investment: 'Investition: Individuell nach Projektumfang',
    cta: { label: 'Full-Service anfragen', href: BOOKING_LINKS.ERSTBERATUNG },
  },
  {
    option: 'Option B',
    title: 'Strategische Anleitung (Nur Beratung)',
    description: 'Sie setzen intern um, wir steuern und sichern Qualität.',
    features: [
      '45-minütiges Strategiegespräch (kostenlos)',
      'Detaillierte Analyse Ihrer Systemlandschaft',
      'Business-Case-Kalkulation',
      'Strategische Roadmap mit klaren Handlungsempfehlungen',
      'Schriftlicher Analyse-Report',
    ],
    duration: 'Dauer: 1–2 Wochen',
    investment: 'Investition: Individuell nach Projektumfang',
    cta: { label: 'Strategiegespräch buchen', href: BOOKING_LINKS.STRATEGIC_ADVISORY },
  },
  {
    option: 'Option C',
    title: 'Hybrides Modell',
    description: 'Gemeinsame Umsetzung in definierten Teilbereichen – Verantwortung klar verteilt.',
    features: [
      'Alles aus „Strategische Anleitung“',
      'Wir übernehmen Kernmodule & kritische Integrationen',
      'Ihr Team setzt definierte Teilbereiche um',
      'Gemeinsame Milestones, Code/Infra-Reviews',
      'Coaching & Pairing-Sessions',
    ],
    duration: 'Dauer: Nach Umfang abgestimmt',
    investment: 'Investition: Individuell nach Projektumfang',
    cta: { label: 'Hybrides Modell besprechen', href: BOOKING_LINKS.ERSTBERATUNG },
  },
  {
    option: 'Option D',
    title: 'Langfristige Beratung (Retainer)',
    description: 'Steuerung, KPI-Monitoring und Entscheidungs-Sparring nach dem Go-Live.',
    features: [
      'Regelmäßige Steering- & ROI-Reviews',
      'KPI-Monitoring und Kostenkontrolle',
      'Vendor-Management & Verhandlungssupport',
      'Ad-hoc Risiko- und Architektur-Entscheidungen',
    ],
    duration: 'Dauer: 3–12 Monate (Retainer)',
    investment: 'Investition: Monatlicher Retainer (individuell)',
    cta: { label: 'Retainer-Details anfragen', href: BOOKING_LINKS.RETAINER_PLANUNG },
    secondary: { label: 'Zur langfristigen Betreuung', href: '/leistungen/betreuung' },
  },
]

const transformationStats: TransformationStat[] = [
  {
    id: 'meltingspot',
    highlight: '70%',
    ariaLabel: 'Siebzig Prozent',
    description: 'der Digital-Transformationen scheitern 2025.',
    source: 'Meltingspot, 2025',
    sourceUrl: 'https://blog.meltingspot.io/why-digital-transformation-projects-fail/',
  },
  {
    id: 'bain',
    highlight: '88%',
    ariaLabel: 'Achtundachtzig Prozent',
    description: 'der Business-Transformationen verfehlen ihre ursprünglichen Ziele.',
    source: 'Bain & Company, 2024',
    sourceUrl:
      'https://www.bain.com/about/media-center/press-releases/2024/88-of-business-transformations-fail-to-achieve-their-original-ambitions-those-that-succeed-avoid-overloading-top-talent/',
  },
  {
    id: 'jumpcloud',
    highlight: '$135K',
    ariaLabel: 'Einhundertfünfunddreißigtausend US-Dollar',
    description: 'Waste pro Organisation durch ungenutzte SaaS-Lizenzen.',
    source: 'JumpCloud, 2025',
    sourceUrl: 'https://jumpcloud.com/blog/saas-usage-statistics-how-much-is-too-much',
  },
]

// =========================================
// MAIN COMPONENT
// =========================================

const BeratungPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const consultingFaqs = useMemo(() => faqEntries.filter(entry => entry.tags?.includes('consulting')), [])
  const faqAccordionItems = useMemo(
    () =>
      consultingFaqs.map((faq, idx) => ({
        id: `beratung-faq-${faq.id ?? idx}`,
        question: faq.question,
        defaultOpen: idx === 0,
        answer: <p className="text-base leading-relaxed text-text-secondary">{faq.answer}</p>,
      })),
    [consultingFaqs]
  )

  // Direct Nextcloud booking link for Strategic Advisory
  const bookingUrl = BOOKING_LINKS.STRATEGIC_ADVISORY

  // Smooth scroll to section
  const scrollToProcess = useCallback(() => {
    const processSection = document.getElementById('process-section')
    if (processSection) {
      processSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  // GSAP Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Hero animation
      if (heroRef.current && !reduced) {
        gsap.from(heroRef.current.children, {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          force3D: true,
        })
      }

      if (!reduced) {
        // Section animations
        const sections = gsap.utils.toArray<HTMLElement>('.animate-section')
        sections.forEach(section => {
          gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              once: true,
            },
            force3D: true,
          })
        })

        // Card stagger animations
        const cardGroups = gsap.utils.toArray<HTMLElement>('.card-group')
        cardGroups.forEach(group => {
          const cards = Array.from(group.children) as HTMLElement[]
          // Ensure cards are visible initially
          cards.forEach(card => {
            gsap.set(card, { opacity: 1, y: 0 })
          })

          gsap.from(cards, {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 75%',
              once: true,
            },
            force3D: true,
          })
        })
      } else {
        // If reduced motion, ensure everything is visible
        const allAnimatedElements = document.querySelectorAll('.animate-section, .card-group > *')
        allAnimatedElements.forEach(el => {
          gsap.set(el, { opacity: 1, y: 0, clearProps: 'transform' })
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative z-0 min-h-screen bg-[#faf8f4] text-gray-900 dark:bg-[hsl(0,0%,4%)] dark:text-[hsl(0,0%,95%)]">
      <Seo
        title="Strategieberatung für Self-Hosted Infrastruktur | VAE Systems"
        description="Strategieberatung für digitale Transformation: KI-Strategie, Digitalisierung, Prozessautomatisierung. Kostenlose Erstanalyse zur digitalen Souveränität."
        canonicalPath="/leistungen/strategie"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'KI-Strategieberatung',
          provider: {
            '@type': 'Organization',
            name: 'VAE Systems UG',
            url: 'https://vae-systems.com',
          },
          areaServed: {
            '@type': 'Place',
            name: 'Deutschland',
          },
          description: 'Individuelle KI-Roadmaps und Digitalisierungsstrategien für Unternehmen',
          offers: {
            '@type': 'Offer',
            url: 'https://vae-systems.com/leistungen/strategie',
            priceCurrency: 'EUR',
            price: 'auf Anfrage',
          },
        }}
      />

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#030806] text-white">
        {/* Hero Background Image */}
        <div
          className="pointer-events-none absolute inset-0 hidden opacity-[0.18] md:block"
          style={{
            backgroundImage: 'url(/images/optimized/Hero_Strategy.JPG.webp)',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          role="presentation"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18] md:hidden"
          style={{
            backgroundImage: 'url(/images/optimized/Hero_Strategy.JPG.webp)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          role="presentation"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(var(--vae-turquoise-rgb),0.14),transparent_35%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-vae-turquoise" />
        <div className="pointer-events-none absolute right-[-4vw] top-8 hidden select-none text-[18vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.03] xl:block">
          VAE
        </div>

        <div className="container-vae relative z-10 py-20 sm:py-24 lg:py-28">
          <div ref={heroRef} className="flex flex-col gap-8">
            {/* Eyebrow */}
            <div className="inline-flex w-fit items-center border border-vae-turquoise/35 bg-black px-4 py-2 text-[11px] font-bold uppercase tracking-[0.34em] text-vae-turquoise shadow-[0_0_0_1px_rgba(0,0,0,0.35)]">
              Strategie &amp; Transformation
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="max-w-4xl">
                <span className="block text-[13vw] font-black uppercase leading-[0.88] tracking-[-0.08em] text-white sm:text-6xl lg:text-[5.2rem] xl:text-[5.8rem]">
                  Wo verbrennen Sie
                </span>
                <span className="mt-2 inline-block bg-vae-turquoise px-3 py-2 text-[11vw] font-black uppercase leading-[0.88] tracking-[-0.08em] text-black sm:px-5 sm:py-3 sm:text-5xl lg:text-[4.4rem] xl:text-[5rem]">
                  Ihr IT-Budget?
                </span>
              </h1>
              <div className="max-w-2xl border-l-4 border-white pl-4 text-base leading-relaxed text-white/75 sm:text-lg">
                Wir analysieren Ihre Systemlandschaft, rechnen den Business Case durch und liefern Ihnen eine klare
                Roadmap — nicht irgendwann, sondern in 1–2 Wochen.
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticButton intensity={0.08} scaleEffect glowEffect className="isolate w-full sm:w-auto">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex w-full items-center justify-center gap-2 px-8 py-5 text-base font-black uppercase tracking-[0.12em] sm:w-auto"
                >
                  <Calendar className="h-5 w-5 flex-shrink-0" />
                  Kostenloses Erstgespräch buchen
                </a>
              </MagneticButton>
              <MagneticButton intensity={0.05} scaleEffect className="isolate w-full sm:w-auto">
                <button
                  onClick={scrollToProcess}
                  className="btn-secondary flex w-full items-center justify-center gap-2 px-6 py-5 text-sm font-bold uppercase tracking-[0.14em] sm:w-auto"
                >
                  Prozess ansehen
                  <ChevronDown className="h-5 w-5" />
                </button>
              </MagneticButton>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              {['Kostenlos & unverbindlich', 'Termin binnen 48h', 'Kein Sales-Pitch'].map(badge => (
                <div
                  key={badge}
                  className="flex items-center gap-2 border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70"
                >
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-vae-turquoise" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STUDIEN-SEKTION ==================== */}
      <section
        className="animate-section border-vae-turquoise/12 border-b bg-[#f4f1ec] dark:border-[hsl(0,0%,12%)] dark:bg-[hsl(165,20%,8%)]"
        style={{
          clipPath: 'polygon(0 3vw, 100% 0, 100% 100%, 0 100%)',
          marginTop: '-3vw',
          paddingTop: 'calc(6rem + 3vw)',
          paddingBottom: '6rem',
        }}
      >
        <div className="container-vae">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-gray-900 dark:text-white md:text-5xl">
              Warum Transformationen so häufig scheitern
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-white/80">
              Ohne fundierte Strategie sind die Erfolgsaussichten gering — die Zahlen zeigen es deutlich.
            </p>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {transformationStats.map(stat => (
              <article
                key={stat.id}
                className="border border-vae-turquoise/30 bg-white/90 p-8 text-center transition-all hover:scale-[1.02] hover:border-vae-turquoise/50 dark:border-vae-turquoise/20 dark:bg-white/5"
              >
                <div className="text-5xl font-black tracking-[-0.06em] text-vae-turquoise">
                  <span aria-label={stat.ariaLabel}>{stat.highlight}</span>
                </div>
                <p className="mt-4 text-base leading-relaxed text-gray-900 dark:text-white">{stat.description}</p>
                <p className="mt-3 text-sm italic text-gray-500 dark:text-white/60">
                  Quelle:{' '}
                  {stat.sourceUrl ? (
                    <a
                      href={stat.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-vae-turquoise hover:underline"
                    >
                      {stat.source}
                    </a>
                  ) : (
                    stat.source
                  )}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="animate-section border-b border-vae-turquoise/10 bg-[#f4f1ec] py-16 dark:border-[hsl(0,0%,12%)] dark:bg-transparent">
        <div className="container-vae">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-8 text-gray-800 dark:text-[hsl(0,0%,80%)]">
              Gerade deshalb braucht es fundierte Strategieberatung. Transformationen scheitern selten an fehlender
              Technologie — sondern an unklaren Zielen, fehlender Planung und Ad-hoc-Entscheidungen. In einem Markt mit
              hunderten KI-Tools und Dienstleistern ist nicht pauschal alles schlecht. Aber wann was richtig ist und
              wann was falsch ist — dafür braucht es echte Expertise. Wir analysieren Ihre Systeme, identifizieren
              Ineffizienzen und entwickeln einen klaren, umsetzbaren Fahrplan — individuell auf Ihre Organisation
              zugeschnitten.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== WAS IST STRATEGISCHE BERATUNG ==================== */}
      <section className="section-card-container animate-section border-b bg-[#faf8f4] pb-24 pt-24 dark:border-[hsl(0,0%,12%)] dark:bg-bg-darker">
        <div className="section-card-backdrop" />

        <div className="container-vae relative">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] lg:gap-14">
            <div className="space-y-8">
              <div className="space-y-5 border-l-4 border-vae-turquoise pl-5">
                <p className="text-xs font-bold uppercase tracking-[0.34em] text-vae-turquoise">Editorial Split</p>
                <h2 className="max-w-4xl text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-gray-900 dark:text-white md:text-5xl">
                  Was bedeutet Strategische Beratung bei VAE?
                </h2>
                <p className="max-w-3xl text-lg leading-relaxed text-gray-900 dark:text-white">
                  Mehr als Bestandsaufnahme: Wir ordnen Tools, Kosten, Risiken und Zielbild so, dass daraus eine
                  belastbare Entscheidung entsteht.
                </p>
                <p className="max-w-3xl text-base leading-relaxed text-gray-700 dark:text-[hsl(0,0%,80%)]">
                  Statt einer netten Analyse bekommen Sie eine handhabbare Entscheidungsgrundlage für KI-Integration,
                  Prozessautomatisierung und digitale Transformation.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <article className="border-2 border-black/10 bg-white p-6 text-text-light shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:shadow-none">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-vae-turquoise">Die Analyse</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary dark:text-text-secondary">
                    Wir schauen nicht nur auf Technik. Wir zerlegen Ihre Situation in klar benennbare
                    Entscheidungsfelder.
                  </p>
                </article>

                <div className="grid gap-3">
                  {[
                    'Welche Systeme und Tools nutzen Sie aktuell? (Microsoft 365, Salesforce, Legacy-Systeme, etc.)',
                    'Welche direkten und indirekten Kosten entstehen dadurch pro Jahr?',
                    'Wo liegen die größten Pain Points? (Vendor Lock-in, Skalierbarkeit, Datenschutz, Integration)',
                    'Welche Prozesse sind ineffizient oder fehleranfällig?',
                    'Wo besteht strategisches Optimierungspotenzial?',
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="grid gap-3 border-b border-black/10 pb-3 last:border-b-0 last:pb-0 dark:border-white/10 sm:grid-cols-[auto_1fr]"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-vae-turquoise" />
                      <p className="text-sm leading-relaxed text-gray-700 dark:text-[hsl(0,0%,80%)]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-bg-primary border-2 border-black/10 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
                <div className="grid gap-5 lg:grid-cols-[180px_1fr]">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-vae-turquoise">Vier Pfade</p>
                    <p className="mt-3 text-3xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-gray-900 dark:text-white">
                      Aufwand, Risiko, ROI.
                    </p>
                  </div>
                  <ol className="grid gap-4">
                    {[
                      { label: 'Option A', text: 'Full-Service-Begleitung – wir übernehmen die komplette Umsetzung' },
                      {
                        label: 'Option B',
                        text: 'Strategische Anleitung – Sie setzen intern um, wir begleiten beratend',
                      },
                      {
                        label: 'Option C',
                        text: 'Hybrides Modell – gemeinsame Umsetzung in definierten Teilbereichen',
                      },
                      {
                        label: 'Option D',
                        text: 'Langfristige Beratung (Retainer) – Steering, KPI-Monitoring und Entscheidungs-Support',
                      },
                    ].map((option, idx) => (
                      <li
                        key={idx}
                        className="grid gap-2 border-b border-black/10 pb-4 last:border-b-0 last:pb-0 dark:border-white/10 md:grid-cols-[auto_1fr]"
                      >
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-sm font-black text-vae-turquoise">
                          {idx + 1}
                        </span>
                        <p className="text-base leading-relaxed text-gray-700 dark:text-[hsl(0,0%,80%)]">
                          <span className="font-semibold text-gray-900 dark:text-white">{option.label}:</span>{' '}
                          {option.text}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <blockquote className="max-w-3xl border-l-4 border-black/20 pl-5 text-base leading-relaxed text-gray-600 dark:border-white/20 dark:text-[hsl(0,0%,75%)]">
                Sie entscheiden auf Basis belastbarer Informationen. Unsere Rolle ist transparente Beratung auf
                Augenhöhe — ohne Verpflichtung, ohne Verkaufsdruck.
              </blockquote>
            </div>

            <aside className="space-y-5 lg:pt-12">
              <div className="relative overflow-hidden border-2 border-vae-turquoise/30 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
                <picture>
                  <source
                    srcSet="/images/optimized/Julian-Hand-Mit-Smartwatch-zeigt-auf-texte-und-so.webp"
                    type="image/webp"
                  />
                  <img
                    src="/images/optimized/Julian-Hand-Mit-Smartwatch-zeigt-auf-texte-und-so.jpg"
                    alt="Präzise Analyse und strategische Planung"
                    loading="lazy"
                    className="h-auto w-full object-cover"
                  />
                </picture>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/70 to-transparent p-5 dark:from-bg-darker dark:via-bg-darker/70">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-vae-turquoise">Bildnotiz</p>
                  <p className="mt-2 max-w-[18rem] text-sm leading-relaxed text-text-light dark:text-white">
                    Strategische Beratung beginnt mit präziser Beobachtung: Was läuft wirklich, was kostet unnötig, wo
                    fehlt Kontrolle?
                  </p>
                </div>
              </div>

              <div className="ml-auto max-w-sm border border-black/10 bg-white p-5 text-sm leading-relaxed text-text-secondary shadow-[0_18px_40px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.03] dark:text-text-secondary dark:shadow-none">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-vae-turquoise">Klartext</p>
                <p className="mt-3">
                  Keine Folien mit Wohlfühl-Strategie. Wir übersetzen die Analyse in einen Pfad, der für Ihr Team
                  wirtschaftlich und operativ Sinn ergibt.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ==================== WAS IST ENTHALTEN (FEATURES) ==================== */}
      <section className="section-card-container animate-section border-b bg-[#faf8f4] pb-24 pt-32 dark:border-[hsl(0,0%,12%)] dark:bg-[hsl(0,0%,8%)]">
        <div className="section-card-backdrop" />

        <div className="container-vae relative">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-gray-900 dark:text-white md:text-5xl">
              Was Sie erhalten
            </h2>
            <p className="mt-2 text-lg font-bold uppercase tracking-[0.1em] text-vae-turquoise">
              Konkret. Messbar. Transparent.
            </p>
            <p className="mx-auto mb-0 mt-4 max-w-2xl text-center text-base text-gray-600 dark:text-[hsl(0,0%,75%)]">
              Im Folgenden finden Sie die konkreten Deliverables unserer Strategieberatung — von der Erstanalyse bis zur
              finalen Entscheidungsgrundlage.
            </p>
          </div>

          <div className="card-group grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="group relative flex h-full flex-col overflow-hidden border-2 border-vae-turquoise/30 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/60 dark:border-vae-turquoise/20 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-vae-turquoise/50 opacity-80 transition-opacity duration-300 group-hover:opacity-100 dark:bg-gradient-to-r dark:from-vae-turquoise/0 dark:via-vae-turquoise/40 dark:to-vae-turquoise/0" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="relative inline-flex h-14 w-14 items-center justify-center overflow-hidden bg-vae-turquoise/15 text-vae-turquoise ring-1 ring-vae-turquoise/40 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="relative z-[1] h-7 w-7" />
                      <div className="absolute inset-0 opacity-0 dark:bg-vae-turquoise/10 dark:opacity-100 dark:blur-[14px]" />
                    </div>
                    <span className="inline-flex items-center border border-vae-turquoise/30 bg-vae-turquoise/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-vae-turquoise dark:border-vae-turquoise/40 dark:bg-vae-turquoise/15">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="mb-3 mt-6 text-lg font-black uppercase leading-[0.92] tracking-[-0.04em] text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-[hsl(0,0%,80%)]">
                    {feature.description}
                  </p>

                  <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-[hsl(0,0%,80%)]">
                    {feature.outputs.map(output => (
                      <li key={output} className="flex items-start gap-2">
                        <span className="mt-0.5 text-base font-semibold text-vae-turquoise">→</span>
                        <span>{output}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:opacity-0">
                    <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-vae-turquoise/10 dark:via-transparent dark:to-vae-turquoise/10" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================== PROZESS-ABLAUF ==================== */}
      <section
        id="process-section"
        className="section-card-container animate-section border-b bg-[#f4f1ec] pb-24 pt-24 dark:border-[hsl(0,0%,12%)] dark:bg-bg-darker"
      >
        <div className="section-card-backdrop" />

        <div className="container-vae relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-vae-turquoise">Prozess-Ablauf</p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-gray-900 dark:text-white md:text-5xl">
              Wie läuft die Beratung ab?
            </h2>
            <p className="mt-4 text-base text-gray-700 dark:text-white/70 md:text-lg">
              Transparente Timeline mit klaren Deliverables – jede Phase liefert verwertbare Ergebnisse.
            </p>
          </div>

          {/* MOBILE: Vertikale Timeline (< lg) */}
          <div className="mt-12 space-y-8 border-l border-gray-300 pl-6 dark:border-white/10 lg:hidden">
            {processSteps.map(step => (
              <article
                key={step.number}
                className="relative border border-gray-200 bg-white/90 p-6 shadow-sm transition duration-300 hover:border-vae-turquoise/40 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              >
                {/* Nummer-Badge inline (Mobile) */}
                <div className="mb-4 flex h-10 w-10 items-center justify-center bg-vae-turquoise">
                  <span className="text-sm font-black uppercase text-black">{step.number}</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{step.duration}</p>
                <p className="mt-2 font-medium text-vae-turquoise">{step.outcome}</p>
                <p className="mt-4 text-gray-700 dark:text-text-secondary">{step.description}</p>

                <ul className="mt-6 space-y-3">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                      <span className="text-sm text-gray-700 dark:text-text-secondary">{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* DESKTOP: Horizontale Timeline (>= lg) */}
          <div className="mt-12 hidden lg:block">
            <div className="relative grid grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div key={step.number} className="group relative">
                  {/* Card */}
                  <article className="border border-gray-200 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md dark:border-white/10 dark:bg-white/5">
                    {/* Nummer-Badge (oben zentriert) */}
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-vae-turquoise">
                      <span className="text-lg font-black text-black">{step.number}</span>
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 text-center text-2xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="mb-2 text-center text-sm text-text-muted">{step.duration}</p>
                    <p className="mb-6 text-center font-medium text-vae-turquoise">{step.outcome}</p>

                    <p className="mb-6 text-gray-700 dark:text-text-secondary">{step.description}</p>

                    <ul className="space-y-3">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                          <span className="text-sm text-gray-700 dark:text-text-secondary">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </article>

                  {/* Verbindungspfeil (nur zwischen Cards) - animiert beim Hover mit */}
                  {index < processSteps.length - 1 && (
                    <div className="absolute -right-4 top-8 z-10 flex h-10 w-10 items-center justify-center bg-vae-turquoise transition-all duration-300 group-hover:scale-110">
                      <ArrowRight className="h-6 w-6 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FÜR WEN GEEIGNET ==================== */}
      <section className="section-card-container animate-section border-b bg-[#faf8f4] pb-24 pt-24 dark:border-[hsl(0,0%,12%)] dark:bg-bg-darker">
        <div className="section-card-backdrop" />

        <div className="container-vae relative">
          <h2 className="h2 heading-gradient mb-4 text-center">In welcher Situation befinden Sie sich gerade?</h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-base text-gray-600 dark:text-[hsl(0,0%,75%)]">
            Strategische Beratung ist dann wertvoll, wenn Sie eine dieser Business-Herausforderungen erkennen.
          </p>

          <div className="card-group mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {targetProfiles.map((profile, idx) => {
              const Icon = profile.icon
              const badgeColors = {
                optimal: 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30 dark:text-emerald-400',
                sehr: 'bg-blue-500/20 text-blue-600 border-blue-500/30 dark:text-blue-400',
                perfekt: 'bg-purple-500/20 text-purple-600 border-purple-500/30 dark:text-purple-400',
              }

              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden border border-vae-turquoise/25 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/50 dark:bg-[hsl(0,0%,8%)]/50"
                >
                  {/* Badge */}
                  <div className="absolute right-4 top-4">
                    <span
                      className={`inline-block border px-3 py-1 text-xs font-semibold ${badgeColors[profile.badgeVariant]}`}
                    >
                      {profile.badge}
                    </span>
                  </div>

                  <div className="mb-5 inline-flex h-16 w-16 items-center justify-center bg-vae-turquoise/20 text-vae-turquoise transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="mb-2 text-lg font-black uppercase leading-[0.92] tracking-[-0.04em] text-gray-900 dark:text-white">
                    {profile.title}
                  </h3>
                  <p className="mb-6 text-sm font-medium text-vae-turquoise">{profile.subtitle}</p>

                  <ul className="space-y-3">
                    {profile.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                        <span className="text-sm text-gray-700 dark:text-[hsl(0,0%,80%)]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* Info Boxes */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {/* Noch nicht bereit */}
            <div className="border border-vae-turquoise/30 bg-vae-turquoise/5 p-6 dark:border-vae-turquoise/20 dark:bg-vae-turquoise/10">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-vae-turquoise" />
                <h4 className="font-semibold text-gray-900 dark:text-white">Noch nicht bereit?</h4>
              </div>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-white/80">
                Perfekt geeignet für Unternehmen <strong>VOR</strong> dem Systemchaos. Wenn Sie jetzt investieren,
                sparen Sie später 10× mehr.
              </p>
            </div>

            {/* Nicht optimal */}
            <div className="border border-orange-300 bg-orange-50 p-6 dark:border-orange-500/30 dark:bg-orange-500/10">
              <div className="mb-3 flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600 dark:text-orange-400" />
                <h4 className="font-semibold text-orange-800 dark:text-orange-300">Nicht optimal für:</h4>
              </div>
              <p className="text-sm leading-relaxed text-orange-700 dark:text-orange-200/80">
                Enterprise (&gt;500 MA) mit etablierter IT-Abteilung • Reine Cloud-only-Strategien • Fehlende
                Budgetflexibilität
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 3 WEGE ZUR ZUSAMMENARBEIT ==================== */}
      <section className="section-card-container animate-section border-b bg-[#f4f1ec] pb-24 pt-24 dark:border-[hsl(0,0%,12%)] dark:bg-[hsl(0,0%,8%)]">
        <div className="section-card-backdrop" />

        <div className="container-vae relative">
          <h2 className="text-center text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-gray-900 dark:text-white md:text-5xl">
            4 Optionen, wie wir zusammenarbeiten
          </h2>
          <p className="mx-auto mb-16 mt-4 max-w-3xl text-center text-base text-gray-600 dark:text-[hsl(0,0%,80%)]">
            Drei klare Projektpfade plus ein langfristiger Retainer – Sie wählen die Tiefe, wir liefern Transparenz bei
            Aufwand, Risiko und ROI.
          </p>

          <div className="card-group grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
            {phases.map((phase, idx) => (
              <div
                key={idx}
                className="group relative flex h-full flex-col overflow-hidden border border-vae-turquoise/25 bg-white/90 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/50 dark:border-vae-turquoise/20 dark:bg-[hsl(0,0%,8%)]/60"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center border border-vae-turquoise/30 bg-vae-turquoise/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-vae-turquoise dark:border-vae-turquoise/40 dark:bg-vae-turquoise/15">
                    {phase.option}
                  </span>
                  <div className="h-10 w-10 border border-vae-turquoise/20 bg-vae-turquoise/5 text-center text-sm font-semibold leading-10 text-vae-turquoise">
                    {idx + 1}
                  </div>
                </div>

                <h3 className="mb-2 mt-6 text-xl font-black uppercase leading-[0.92] tracking-[-0.04em] text-gray-900 dark:text-white">
                  {phase.title}
                </h3>
                <p className="mb-6 text-sm text-gray-700 dark:text-[hsl(0,0%,80%)]">{phase.description}</p>

                <ul className="mb-6 space-y-3">
                  {phase.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                      <span className="text-sm text-gray-700 dark:text-[hsl(0,0%,80%)]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-6 mt-auto space-y-2 pt-6 text-sm font-medium text-vae-turquoise/90">
                  {phase.duration && <p>{phase.duration}</p>}
                  <p>{phase.investment}</p>
                </div>

                {phase.cta && (
                  <MagneticButton intensity={0.08} scaleEffect glowEffect className="isolate w-full">
                    {/^(https?:\/\/)/.test(phase.cta.href) ? (
                      <a
                        href={phase.cta.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="btn-convert group/cta flex w-full items-center justify-center gap-2 text-sm"
                      >
                        {phase.cta.label}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                      </a>
                    ) : (
                      <Link
                        to={phase.cta.href}
                        className="btn-convert group/cta flex w-full items-center justify-center gap-2 text-sm"
                      >
                        {phase.cta.label}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                      </Link>
                    )}
                  </MagneticButton>
                )}

                {phase.secondary && (
                  <Link
                    to={phase.secondary.href}
                    className="group/secondary mt-3 flex items-center justify-center gap-1.5 text-center text-sm font-semibold text-vae-turquoise transition-colors hover:text-vae-turquoise/80"
                  >
                    {phase.secondary.label}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/secondary:translate-x-0.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="mx-auto mt-12 max-w-3xl border-2 border-vae-turquoise/30 bg-white p-6 text-center dark:border-vae-turquoise/40 dark:bg-white/[0.05]">
            <p className="text-sm leading-relaxed text-gray-700 dark:text-[hsl(0,0%,80%)]">
              Im kostenlosen Strategiegespräch erhalten Sie eine erste fundierte Einschätzung. Nach der detaillierten
              Analyse bekommen Sie ein transparentes Angebot — präzise auf Ihre strategischen Ziele zugeschnitten. Keine
              versteckten Kosten.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== FAQ + FINAL CTA ==================== */}
      <section className="animate-section bg-[#030806] py-24 text-white">
        <div className="container-vae grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-vae-turquoise">FAQ</p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-white md:text-5xl">
              Häufige Fragen
            </h2>
            <p className="mt-4 text-base text-white/70">
              Strategische Klarheit vor jedem Projekt: Antworten auf die wichtigsten Fragen rund um Umfang, Dauer und
              ROI unserer Beratung.
            </p>

            <FaqAccordion items={faqAccordionItems} className="mt-12 space-y-4" />
          </div>

          <div className="relative">
            <div className="border-2 border-black bg-white p-10 text-center text-slate-900 shadow-sm dark:border-white/15 dark:bg-white/5 dark:text-white">
              <div className="mb-6 inline-flex items-center gap-0 border border-vae-turquoise/50 bg-vae-turquoise px-4 py-1 text-xs font-black uppercase tracking-[0.3em] text-black">
                Schritt 1
              </div>
              <h3 className="text-3xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-slate-900 dark:text-white">
                Bereit für den ersten Schritt?
              </h3>
              <p className="mt-4 text-base text-slate-700 dark:text-white/70">
                Buchen Sie Ihr kostenloses Strategiegespräch. Wir analysieren Ihre Situation, priorisieren Ziele und
                zeigen konkrete Optionen – ohne Sales-Pitch.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-slate-700 dark:text-white/70">
                <li className="flex items-center justify-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-vae-turquoise" /> 45 Minuten, kostenlos & unverbindlich
                </li>
                <li className="flex items-center justify-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-vae-turquoise" /> Termin innerhalb von 48 Stunden
                </li>
                <li className="flex items-center justify-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-vae-turquoise" /> Executive Summary inklusive
                </li>
              </ul>

              <MagneticButton intensity={0.1} scaleEffect glowEffect className="isolate w-full">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-convert accent-keep mt-10 inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-base font-semibold"
                >
                  <Calendar className="h-5 w-5" />
                  Termin buchen
                </a>
              </MagneticButton>

              <p className="mt-4 text-xs text-text-secondary dark:text-white/60">
                Bereit, aber noch unsicher? Wir klären jede Frage live.
              </p>

              <div className="pointer-events-none absolute inset-x-6 bottom-6 flex justify-center opacity-60">
                <div className="h-32 w-32 rounded-full bg-vae-turquoise/20 blur-[80px] dark:bg-vae-turquoise/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-[#faf8f4] py-16 dark:border-white/5 dark:bg-gradient-to-br dark:from-bg-dark dark:to-bg-darker md:py-20">
        <div className="container-vae flex flex-col items-center gap-4 text-center md:gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise dark:text-vae-turquoise/70">
            Strategiegespräch
          </p>
          <h2 className="px-4 text-3xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-gray-900 dark:text-white md:text-4xl">
            Bereit für strategische Klarheit?
          </h2>
          <p className="max-w-3xl px-4 text-base leading-relaxed text-gray-700 dark:text-text-secondary md:text-lg">
            Im kostenlosen Strategiegespräch priorisieren wir Ziele, klären Optionen und geben eine ehrliche
            Ersteinschätzung zu Aufwand, Timing und Wirkung.
          </p>
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <MagneticButton intensity={0.08} scaleEffect glowEffect className="isolate w-full sm:w-auto">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-convert inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold md:px-8 md:py-4 md:text-base"
              >
                Kostenloses Strategiegespräch buchen
              </a>
            </MagneticButton>
            <p className="px-4 text-xs text-gray-600 dark:text-text-secondary md:text-sm">
              Binnen 48h Termin verfügbar. Keine Verpflichtung.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BeratungPage
