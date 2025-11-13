import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  AlertCircle,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  FileText,
  GitBranch,
  Heart,
  Map,
  Minus,
  Plus,
  Rocket,
  Search,
  Target,
} from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Seo from '../ui/Seo'
import MagneticButton from '../ui/buttons/MagneticButton'

// =========================================
// TYPES & DATA
// =========================================

interface FeatureCard {
  icon: React.ElementType
  title: string
  description: string
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
  title: string
  description: string
  features: string[]
  timeline?: string
  pricing: string
  highlighted?: boolean
}

interface FAQItem {
  question: string
  answer: string
}

const features: FeatureCard[] = [
  {
    icon: Target,
    title: 'Kostenlose Erstanalyse',
    description:
      '45-minütiges Strategiegespräch, um Ihre Ausgangslage zu verstehen. Keine Verkaufspräsentation, keine Verpflichtung.',
  },
  {
    icon: Search,
    title: 'Bestandsaufnahme & Gap-Analyse',
    description:
      'Detaillierte Evaluation Ihrer aktuellen Systemlandschaft, Prozesse und Kosten. Inklusive schriftlichem Analyse-Report.',
  },
  {
    icon: BarChart3,
    title: 'Business-Case-Entwicklung',
    description:
      'Was kostet der Status Quo? Welche ROI-Potenziale bieten Alternativen? Fundierte Zahlen statt Vermutungen.',
  },
  {
    icon: Map,
    title: 'Strategische Roadmap',
    description:
      'Schrittweiser Transformationsplan: Von der IST-Situation zur SOLL-Architektur. Mit Meilensteinen, Timeline und Ressourcenplanung.',
  },
  {
    icon: GitBranch,
    title: 'Szenario-Planung',
    description:
      'Nicht die "eine perfekte Lösung", sondern 3 realistische Strategieoptionen – zugeschnitten auf Budget, Zeitrahmen und Risikobereitschaft.',
  },
  {
    icon: FileText,
    title: 'Transparentes Angebot',
    description:
      'Nach der Beratung erhalten Sie ein detailliertes, schriftliches Angebot mit Preisen, Lieferobjekten und Timeline. Keine versteckten Kosten.',
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
    icon: Building2,
    title: 'Mittelständische Unternehmen',
    subtitle: '10–200 Mitarbeitende',
    features: [
      'Hohe SaaS-Kosten (€20.000+/Jahr)',
      'Bedarf an digitaler Souveränität',
      'DSGVO-konforme Lösungen erforderlich',
    ],
    badge: 'Optimal geeignet',
    badgeVariant: 'optimal',
  },
  {
    icon: Rocket,
    title: 'Wachstumsunternehmen',
    subtitle: '5–100 Mitarbeitende',
    features: [
      'Budgetbewusste Skalierung notwendig',
      'Schnelles Wachstum erfordert flexible Systeme',
      'Zukunftssichere Infrastruktur gefragt',
    ],
    badge: 'Sehr geeignet',
    badgeVariant: 'sehr',
  },
  {
    icon: Heart,
    title: 'Non-Profit-Organisationen',
    subtitle: '5–50 Mitarbeitende',
    features: [
      'Limitierte IT-Budgets optimal nutzen',
      'Hohe Datenschutz-Anforderungen',
      'Interesse an Open-Source-Lösungen',
    ],
    badge: 'Perfekt geeignet',
    badgeVariant: 'perfekt',
  },
]

const phases: PhaseCard[] = [
  {
    title: 'Strategiegespräch',
    description: '45 Minuten kostenlos & unverbindlich',
    features: [
      'Ihre Ausgangslage verstehen',
      'Erste strategische Einschätzung',
      'Mögliche Handlungsoptionen aufzeigen',
      'Keine Verkaufspräsentation',
    ],
    pricing: 'Kostenlos',
    highlighted: true,
  },
  {
    title: 'Strategieentwicklung',
    description: 'Detaillierte Analyse und Konzeption',
    features: [
      'IST-Analyse Ihrer Systemlandschaft',
      'Business-Case-Kalkulation',
      '3 strategische Handlungsoptionen',
      'Schriftliches Strategiepapier',
    ],
    timeline: 'Dauer: 1–2 Wochen',
    pricing: 'Individuell nach Projektumfang',
  },
  {
    title: 'Strategische Begleitung',
    description: 'Laufende Unterstützung nach Bedarf',
    features: [
      'Ad-hoc-Beratung bei strategischen Fragen',
      'Regelmäßige Review-Termine',
      'Begleitung bei Implementierungsentscheidungen',
      'Flexible Zusammenarbeit',
    ],
    timeline: 'Nach Vereinbarung',
    pricing: 'Individuelles Beratungsangebot',
  },
]

const faqData: FAQItem[] = [
  {
    question: 'Für wen ist diese Beratung geeignet?',
    answer:
      'Für Unternehmen, die mit KI-Strategien, Digitalisierung oder Automatisierung strategisch weiterkommen möchten – aber unsicher sind, welche Lösung sinnvoll, realistisch und wirtschaftlich ist. Besonders wertvoll ist unsere Beratung, wenn Sie bereits Berührungspunkte mit dem Thema hatten, aber noch keine klare Entscheidung treffen können.',
  },
  {
    question: 'Worin liegt der Unterschied zu klassischen IT-Beratungen?',
    answer:
      'Wir konzentrieren uns nicht auf Infrastruktur-Setup oder technische Detailimplementierung, sondern auf strategische Entscheidungsgrundlagen: Was ist möglich? Was ist sinnvoll? Was ist wirtschaftlich? Statt fertiger Lösungen entwickeln wir mit Ihnen gemeinsam eine fundierte Strategie – transparent, nachvollziehbar und ohne Abhängigkeit.',
  },
  {
    question: 'Was kostet die Beratung?',
    answer:
      'Das kostenlose Strategiegespräch (45 Minuten) ist unverbindlich. Die Strategieentwicklung mit detaillierter Analyse, Business-Case-Kalkulation und schriftlichem Strategiepapier wird individuell nach Projektumfang kalkuliert. Sie erhalten nach dem Erstgespräch ein transparentes, schriftliches Angebot – ohne versteckte Kosten.',
  },
  {
    question: 'Wie lange dauert eine typische Beratung?',
    answer:
      'Das Erstgespräch findet innerhalb weniger Tage statt. Die Strategieentwicklung dauert je nach Komplexität 1–2 Wochen. Die optionale strategische Begleitung ist flexibel nach Ihrem Bedarf buchbar – von einmaligen Review-Terminen bis zu regelmäßiger Ad-hoc-Unterstützung.',
  },
  {
    question: 'Erhalte ich konkrete Handlungsempfehlungen?',
    answer:
      'Ja. Sie erhalten ein schriftliches Strategiepapier mit einer klaren IST-Analyse, Business-Case-Kalkulation und mindestens 3 konkreten Handlungsoptionen – von „minimal investment" bis zu umfassenden Szenarien. Jede Option wird hinsichtlich Aufwand, Kosten, Nutzen und Risiken transparent dargestellt.',
  },
  {
    question: 'Muss ich mich danach für VAE entscheiden?',
    answer:
      'Nein. Unser Ziel ist strategische Klarheit, nicht Verkauf. Sie erhalten fundierte Entscheidungsgrundlagen und können dann selbst entscheiden – ob mit uns, mit einem anderen Partner oder durch interne Umsetzung. Unsere Empfehlungen sind technologieneutral und auf Ihre strategischen Ziele ausgerichtet.',
  },
]

// =========================================
// MAIN COMPONENT
// =========================================

const BeratungPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const answerRefs = useRef<Record<number, HTMLDivElement | null>>({})

  // Booking CTA now routes über Landing-Page
  const openCalendly = useCallback(() => {
    window.open('/termin-buchen', '_self')
  }, [])

  // Smooth scroll to section
  const scrollToProcess = useCallback(() => {
    const processSection = document.getElementById('process-section')
    if (processSection) {
      processSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  // FAQ Toggle
  const toggleFAQ = useCallback((index: number) => {
    setOpenFAQ(prev => (prev === index ? null : index))
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

  // FAQ Accordion Animation
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    Object.entries(answerRefs.current).forEach(([key, el]) => {
      if (!el) return
      const idx = Number(key)
      const isOpen = idx === openFAQ

      gsap.killTweensOf(el)
      if (isOpen) {
        gsap.fromTo(
          el,
          { height: 0, opacity: 0 },
          {
            height: el.scrollHeight,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              el.style.height = 'auto'
            },
            force3D: true,
          }
        )
      } else {
        if (el.style.height === 'auto') el.style.height = `${el.scrollHeight}px`
        gsap.to(el, { height: 0, opacity: 0, duration: 0.25, ease: 'power1.out', force3D: true })
      }
    })
  }, [openFAQ])

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[hsl(0,0%,4%)] dark:text-[hsl(0,0%,95%)]">
      <Seo
        title="Strategische Beratung | VAE Systems"
        description="Strategieberatung für digitale Transformation: KI-Strategie, Digitalisierung, Prozessautomatisierung. Kostenlose Erstanalyse zur digitalen Souveränität."
        canonicalPath="/services/beratung"
      />

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden border-b border-vae-turquoise/25 bg-gradient-to-br from-gray-50 via-white to-gray-50 py-32 dark:border-vae-turquoise/25 dark:from-[hsl(0,0%,8%)] dark:via-[#12151a] dark:to-[hsl(0,0%,4%)] md:py-40">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,165,0.12),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(0,255,165,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,165,0.22),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(0,255,165,0.16),transparent_60%)]" />
        </div>

        <div className="container-vae relative">
          <div ref={heroRef} className="mx-auto max-w-4xl space-y-8 text-center">
            {/* Tag */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-vae-turquoise">
                SERVICE
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              Strategieberatung für digitale Transformation
            </h1>

            {/* Subtitle */}
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-[hsl(0,0%,75%)] md:text-xl">
              Von der KI-Strategie bis zur vollständigen Digitalisierung: Wir analysieren Ihre Systeme, identifizieren
              Ineffizienzen und entwickeln einen klaren, umsetzbaren Fahrplan – individuell auf Ihre Organisation
              zugeschnitten.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton intensity={0.08} scaleEffect glowEffect>
                <button
                  onClick={openCalendly}
                  className="btn-primary flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold"
                >
                  <Calendar className="h-5 w-5" />
                  Kostenlose Beratung buchen (45 Min)
                </button>
              </MagneticButton>

              <MagneticButton intensity={0.06}>
                <button
                  onClick={scrollToProcess}
                  className="btn-outline flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold"
                >
                  Prozess ansehen
                  <ChevronDown className="h-5 w-5" />
                </button>
              </MagneticButton>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-gray-600 dark:text-[hsl(0,0%,75%)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-vae-turquoise" />
                <span>Kostenlos & unverbindlich</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-vae-turquoise" />
                <span>Binnen 48h Termin</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-vae-turquoise" />
                <span>Kein Sales-Pitch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WAS IST STRATEGISCHE BERATUNG ==================== */}
      <section className="animate-section border-b border-gray-200 py-24 dark:border-[hsl(0,0%,12%)]">
        <div className="container-vae">
          <h2 className="h2 heading-gradient mb-16 text-center">Was bedeutet Strategische Beratung bei VAE?</h2>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <div>
                <p className="mb-4 text-lg leading-relaxed text-gray-900 dark:text-white">
                  Strategische Beratung bedeutet bei VAE Systems mehr als nur eine technische Bestandsaufnahme. Wir
                  entwickeln mit Ihnen gemeinsam eine fundierte Digitalisierungsstrategie – unabhängig davon, ob es um
                  KI-Integration, Prozessautomatisierung oder die komplette digitale Transformation geht.
                </p>

                <p className="mb-4 text-base leading-relaxed text-gray-700 dark:text-[hsl(0,0%,80%)]">
                  Unsere Analyse umfasst:
                </p>

                <ul className="space-y-3">
                  {[
                    'Welche Systeme und Tools nutzen Sie aktuell? (Microsoft 365, Salesforce, Legacy-Systeme, etc.)',
                    'Welche direkten und indirekten Kosten entstehen dadurch pro Jahr?',
                    'Wo liegen die größten Pain Points? (Vendor Lock-in, Skalierbarkeit, Datenschutz, Integration)',
                    'Welche Prozesse sind ineffizient oder fehleranfällig?',
                    'Wo besteht strategisches Optimierungspotenzial?',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                      <span className="text-base text-gray-700 dark:text-[hsl(0,0%,80%)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-4 text-lg leading-relaxed text-gray-900 dark:text-white">
                  Auf Basis dieser Analyse entwickeln wir keine theoretischen Idealszenarien, sondern 3 konkrete,
                  umsetzbare Strategieoptionen:
                </p>

                <ol className="space-y-3">
                  {[
                    { label: 'Option A', text: 'Full-Service-Begleitung – wir übernehmen die komplette Umsetzung' },
                    {
                      label: 'Option B',
                      text: 'Strategische Anleitung – Sie setzen intern um, wir begleiten beratend',
                    },
                    { label: 'Option C', text: 'Hybrides Modell – gemeinsame Umsetzung in definierten Teilbereichen' },
                  ].map((option, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-vae-turquoise/20 text-sm font-bold text-vae-turquoise">
                        {idx + 1}
                      </span>
                      <span className="mt-0.5 text-base text-gray-700 dark:text-[hsl(0,0%,80%)]">
                        <span className="font-semibold text-gray-900 dark:text-white">{option.label}:</span>{' '}
                        {option.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="text-base leading-relaxed text-gray-600 dark:text-[hsl(0,0%,75%)]">
                Sie entscheiden auf Basis fundierter Informationen, welcher strategische Weg für Ihre Organisation
                optimal ist. Keine Verpflichtung, kein Verkaufsdruck – nur transparente Beratung auf Augenhöhe.
              </p>
            </div>

            {/* Right Column - Julian Hand + Jakob Tafel mit Hover-Animation */}
            <div className="grid gap-6">
              {/* Julian Hand mit Smartwatch */}
              <div className="group relative overflow-hidden rounded-2xl border border-vae-turquoise/20 bg-gradient-to-br from-vae-turquoise/5 to-transparent shadow-lg transition-all duration-500 hover:border-vae-turquoise/40 hover:shadow-xl hover:shadow-vae-turquoise/20">
                <picture>
                  <source
                    srcSet="/images/optimized/Julian-Hand-Mit-Smartwatch-zeigt-auf-texte-und-so.webp"
                    type="image/webp"
                  />
                  <img
                    src="/images/optimized/Julian-Hand-Mit-Smartwatch-zeigt-auf-texte-und-so.jpg"
                    alt="Präzise Analyse und strategische Planung"
                    loading="lazy"
                    className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </picture>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-darker/20 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
                {/* Türkiser Glanz-Effekt beim Hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-vae-turquoise/0 via-vae-turquoise/0 to-vae-turquoise/0 opacity-0 transition-all duration-500 group-hover:from-vae-turquoise/10 group-hover:via-vae-turquoise/5 group-hover:to-transparent group-hover:opacity-100" />
              </div>

              {/* Jakob vor Tafel - mit Hover-Übergang zwischen Bild 1 und 2 */}
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-vae-turquoise/20 bg-gradient-to-br from-vae-turquoise/5 to-transparent shadow-lg transition-all duration-500 hover:border-vae-turquoise/40 hover:shadow-xl hover:shadow-vae-turquoise/20">
                {/* Bild 1 - Standard */}
                <picture className="absolute inset-0 transition-opacity duration-700 ease-in-out group-hover:opacity-0">
                  <source srcSet="/images/optimized/Jakob-steht-Vor-Tafel-für-Strategie.webp" type="image/webp" />
                  <img
                    src="/images/optimized/Jakob-steht-Vor-Tafel-für-Strategie.jpg"
                    alt="Strategieentwicklung an der Tafel"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </picture>

                {/* Bild 2 - Bei Hover */}
                <picture className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100">
                  <source srcSet="/images/optimized/Jakob-steht-Vor-Tafel-für-Strategie-2.webp" type="image/webp" />
                  <img
                    src="/images/optimized/Jakob-steht-Vor-Tafel-für-Strategie-2.jpg"
                    alt="Strategieentwicklung an der Tafel - Details"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </picture>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-darker/20 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
                {/* Türkiser Glanz-Effekt beim Hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-vae-turquoise/0 via-vae-turquoise/0 to-vae-turquoise/0 opacity-0 transition-all duration-500 group-hover:from-vae-turquoise/10 group-hover:via-vae-turquoise/5 group-hover:to-transparent group-hover:opacity-100" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WAS IST ENTHALTEN (FEATURES) ==================== */}
      <section className="animate-section border-b border-gray-200 bg-gray-50 py-24 dark:border-[hsl(0,0%,12%)] dark:bg-transparent">
        <div className="container-vae">
          <div className="mb-16 text-center">
            <h2 className="h2 heading-gradient mb-4">Was Sie erhalten</h2>
            <p className="text-lg text-gray-600 dark:text-[hsl(0,0%,75%)]">Konkret, messbar, transparent</p>
          </div>

          <div className="card-group grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-vae-turquoise/20 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/40 hover:shadow-lg hover:shadow-vae-turquoise/10 dark:border-vae-turquoise/20 dark:bg-[hsl(0,0%,8%)]/50 dark:hover:bg-[hsl(0,0%,10%)]/60"
                >
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-vae-turquoise/20 text-vae-turquoise transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-[hsl(0,0%,80%)]">
                    {feature.description}
                  </p>

                  {/* Subtle hover glow */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-vae-turquoise/5 to-transparent" />
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
        className="relative overflow-hidden border-b border-gray-200 bg-white py-24 dark:border-white/5 dark:bg-gradient-to-br dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker"
      >
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(var(--vae-turquoise-rgb),0.18),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(var(--vae-turquoise-rgb),0.12),transparent_65%)]" />
        </div>

        <div className="container-vae relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/60">Prozess-Ablauf</p>
            <h2 className="mt-4 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
              Wie läuft die Beratung ab?
            </h2>
            <p className="mt-4 text-base text-gray-700 dark:text-white/70 md:text-lg">
              Transparente Timeline mit klaren Deliverables – jede Phase liefert verwertbare Ergebnisse.
            </p>
          </div>

          <div className="mt-12 space-y-8 border-l border-gray-300 pl-6 dark:border-white/10 md:pl-10">
            {processSteps.map(step => (
              <article
                key={step.number}
                className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition duration-300 hover:border-vae-turquoise/40 hover:shadow-xl dark:border-white/10 dark:bg-white/5 dark:shadow-black/30 dark:backdrop-blur-md dark:hover:bg-white/10"
              >
                <div className="absolute -left-12 top-6 hidden h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-lg font-semibold text-gray-900 dark:border-white/20 dark:bg-bg-darker dark:text-white md:flex">
                  {step.number}
                </div>

                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">
                  Phase {step.number}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                <p className="mt-1 text-sm font-semibold text-vae-turquoise/80">{step.duration}</p>
                <p className="mt-2 text-base leading-relaxed text-gray-700 dark:text-white/80">{step.description}</p>
                <p className="mt-1 text-sm font-medium text-gray-700 dark:text-white/80">{step.outcome}</p>

                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/70">
                  {step.details.map(detail => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="mt-0.5 text-base font-semibold text-vae-turquoise">→</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FÜR WEN GEEIGNET ==================== */}
      <section className="animate-section border-b border-gray-200 bg-gray-50 py-24 dark:border-[hsl(0,0%,12%)] dark:bg-transparent">
        <div className="container-vae">
          <h2 className="h2 heading-gradient mb-16 text-center">Für wen ist strategische Beratung geeignet?</h2>

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
                  className="group relative overflow-hidden rounded-2xl border border-vae-turquoise/25 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/50 hover:shadow-xl hover:shadow-vae-turquoise/10 dark:bg-[hsl(0,0%,8%)]/50"
                >
                  {/* Badge */}
                  <div className="absolute right-4 top-4">
                    <span
                      className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${badgeColors[profile.badgeVariant]}`}
                    >
                      {profile.badge}
                    </span>
                  </div>

                  <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-vae-turquoise/20 text-vae-turquoise transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{profile.title}</h3>
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

          {/* Warning Box */}
          <div className="mx-auto max-w-3xl rounded-2xl border border-orange-300 bg-orange-50 p-6 dark:border-orange-500/30 dark:bg-orange-500/10">
            <div className="flex items-start gap-4">
              <AlertCircle className="mt-1 h-6 w-6 flex-shrink-0 text-orange-600 dark:text-orange-400" />
              <div>
                <h4 className="mb-2 font-semibold text-orange-800 dark:text-orange-300">Nicht optimal für:</h4>
                <p className="text-sm leading-relaxed text-orange-700 dark:text-orange-200/80">
                  Enterprise-Unternehmen (&gt;500 MA) mit komplexen Legacy-Systemen. Firmen, die ausschließlich
                  Microsoft 365 nutzen wollen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WIE WIR ZUSAMMENARBEITEN ==================== */}
      <section className="animate-section border-b border-gray-200 py-24 dark:border-[hsl(0,0%,12%)]">
        <div className="container-vae">
          <h2 className="h2 heading-gradient mb-16 text-center">Wie wir zusammenarbeiten</h2>

          <div className="card-group mb-12 grid gap-8 md:grid-cols-3">
            {phases.map((phase, idx) => (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  phase.highlighted
                    ? 'border-vae-turquoise/50 bg-vae-turquoise/5 shadow-lg shadow-vae-turquoise/10 dark:bg-vae-turquoise/10 dark:shadow-vae-turquoise/20'
                    : 'border-vae-turquoise/20 bg-white shadow-sm hover:border-vae-turquoise/40 dark:bg-[hsl(0,0%,8%)]/50'
                }`}
              >
                <h3 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">{phase.title}</h3>
                <p className="mb-6 text-sm text-gray-700 dark:text-[hsl(0,0%,80%)]">{phase.description}</p>

                <ul className="mb-6 space-y-2">
                  {phase.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                      <span className="text-sm text-gray-700 dark:text-[hsl(0,0%,80%)]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {phase.timeline && <p className="mb-3 text-sm font-medium text-vae-turquoise/80">{phase.timeline}</p>}

                <div className="rounded-lg bg-gray-100 px-4 py-3 dark:bg-[hsla(0,0%,6%,1)]">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{phase.pricing}</p>
                </div>

                {phase.highlighted && (
                  <div className="mt-6">
                    <MagneticButton intensity={0.08} scaleEffect>
                      <button
                        onClick={openCalendly}
                        className="btn-primary flex w-full items-center justify-center gap-2 text-sm"
                      >
                        <Calendar className="h-4 w-4" />
                        Termin buchen
                      </button>
                    </MagneticButton>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="mx-auto max-w-3xl rounded-2xl border border-vae-turquoise/20 bg-vae-turquoise/5 p-6 text-center">
            <p className="text-sm leading-relaxed text-gray-700 dark:text-[hsl(0,0%,80%)]">
              Im kostenlosen Strategiegespräch erhalten Sie eine erste fundierte Einschätzung. Nach der detaillierten
              Analyse bekommen Sie ein transparentes Angebot — präzise auf Ihre strategischen Ziele zugeschnitten.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== FAQ + FINAL CTA ==================== */}
      <section className="animate-section bg-gray-50 py-24 dark:bg-transparent">
        <div className="container-vae">
          {/* FAQ */}
          <div className="mx-auto mb-20 max-w-3xl">
            <h2 className="h2 heading-gradient mb-12 text-center">Häufige Fragen</h2>

            <div className="space-y-4">
              {faqData.map((faq, idx) => {
                const isOpen = openFAQ === idx
                return (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:border-vae-turquoise/40 dark:border-white/10 dark:bg-white/5"
                  >
                    <button
                      onClick={() => toggleFAQ(idx)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-lg font-semibold leading-relaxed text-gray-900 dark:text-white">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <Minus className="h-5 w-5 text-vae-turquoise" />
                      ) : (
                        <Plus className="h-5 w-5 text-gray-500 dark:text-[hsl(0,0%,70%)]" />
                      )}
                    </button>

                    <div ref={el => (answerRefs.current[idx] = el)} className="h-0 overflow-hidden px-6">
                      <p className="pb-6 text-base leading-relaxed text-gray-700 dark:text-[hsl(0,0%,80%)]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mx-auto max-w-2xl text-center">
            <div className="rounded-2xl border border-vae-turquoise/30 bg-gradient-to-br from-vae-turquoise/10 to-transparent p-10 shadow-lg">
              <h3 className="mb-4 text-3xl font-semibold text-gray-900 dark:text-white">
                Bereit für den ersten Schritt?
              </h3>
              <p className="mb-8 text-lg text-gray-600 dark:text-[hsl(0,0%,75%)]">
                Buchen Sie jetzt Ihr kostenloses Strategiegespräch.
              </p>

              <MagneticButton intensity={0.1} scaleEffect glowEffect>
                <button
                  onClick={openCalendly}
                  className="btn-primary flex items-center justify-center gap-2 px-10 py-5 text-lg font-semibold"
                >
                  <Calendar className="h-6 w-6" />
                  Termin buchen (45 Min, kostenlos)
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BeratungPage
