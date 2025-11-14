import {
  type LucideIcon,
  Activity,
  ArrowUpRight,
  Brain,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Layers,
  Lightbulb,
  Minus,
  RefreshCcw,
  Server,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import React, { useCallback, useRef, useState } from 'react'
import MagneticButton from '../ui/buttons/MagneticButton'
import Seo from '../ui/Seo'

const calendlyUrl = '/contact#booking'

const trustBadges = ['Monatlich kündbar', 'Flexible Bindung', '< 6h Reaktionszeit']

const hiddenCosts = [
  '5–10 Stunden/Monat für Wartung, Updates und Patches',
  'Stress bei Incidents – inklusive nächtlicher Anrufe',
  'Keine Zeit für strategische Optimierung, nur Firefighting',
  'Innovation bleibt liegen, weil Infrastruktur Aufmerksamkeit bindet',
  'IT-Know-how fehlt bei wichtigen Produkt-Entscheidungen',
]

const resourceSplit = [
  { label: 'Wartung & Firefighting', value: 68 },
  { label: 'Innovation & Wachstum', value: 32 },
]

const resourcePillars: Array<{ icon: LucideIcon; title: string; description: string }> = [
  {
    icon: ArrowUpRight,
    title: 'Ressourcen-Optimierung',
    description:
      '5–10 Stunden IT-Adminarbeit pro Monat werden frei. Diese Zeit wechselt zurück ins Kernbusiness: Product, Sales, Kundenerfolg. Das ist messbarer ROI.',
  },
  {
    icon: Building2,
    title: 'Professionelle IT-Infrastruktur',
    description:
      'Wir designen Infrastruktur mit Best Practices: skalierbar, sicher, wartbar. Kein Stückwerk, sondern ein Rückgrat, das in 5 Jahren noch trägt.',
  },
  {
    icon: Brain,
    title: 'KI-Integrierte Workflows',
    description:
      'Automation und KI sind Standard: n8n, LLM-Workflows, Monitoring mit Intelligenz. Infrastruktur wird nicht nur betrieben – sie denkt mit.',
  },
]

type ServiceLevel = {
  id: string
  icon: LucideIcon
  title: string
  subtitle: string
  description: string
  included: string[]
  excluded?: string[]
  suitable: string[]
  binding: string
  ctaLabel: string
  highlighted?: boolean
  badge?: string
  footnote: string
}

const serviceLevels: ServiceLevel[] = [
  {
    id: 'infrastructure',
    icon: Server,
    title: 'Infrastruktur-Managed',
    subtitle: 'Technik läuft, Sie sind unabhängig',
    description:
      'Ideal für Teams mit IT-Know-how. Wir übernehmen Betrieb, Security, Monitoring und Optimierung – Sie behalten volle Kontrolle und Technical Ownership.',
    included: [
      'Monatliche System-Updates & Patches',
      '24/7-Monitoring, Uptime & Alerting',
      'Automatisierte, verschlüsselte Backups',
      'Security-Management (Firewall, SSL, Hardening)',
      'Performance-Tuning & Ressourcen-Optimierung',
      'Support-Tickets mit < 24h Reaktionszeit',
      'Trends & Potenziale in monatlichen Reviews',
    ],
    excluded: ['User-Support (bleibt intern)', 'Feature-Entwicklung', 'Trainings & Schulungen'],
    suitable: ['Teams mit IT-Erfahrung', '5–30 Mitarbeitende', 'Maximale Unabhängigkeit gewünscht'],
    binding: 'Monatlich kündbar (Preis-Premium für maximale Flexibilität)',
    ctaLabel: 'Zum Gespräch',
    footnote:
      'Individuelles Angebot – abhängig von Teamgröße, Infrastruktur-Umfang und gewünschtem KI-Einsatz. Transparenz im Beratungsgespräch garantiert.',
  },
  {
    id: 'full',
    icon: Users,
    title: 'Full-Partnership',
    subtitle: 'Wir sind Ihr IT-Team',
    description:
      'Sie wollen sich voll auf das Business konzentrieren? Wir übernehmen Infrastruktur, Support, KI-Optimierung und Innovation – wie ein internes IT-Team, nur fokussierter.',
    included: [
      'Alles aus Infrastruktur-Managed',
      'Direkter User-Support (< 6h Reaktionszeit)',
      'Regelmäßige Schulungen & Workshops',
      'KI-Workflow-Optimierung & Feature-Entwicklung',
      'Monatliche Strategy-Reviews (Trends & Potenziale)',
      'Proaktive Optimierung & Innovationsvorschläge',
      'Flexible Bindung, monatlich kündbar',
    ],
    suitable: ['Teams ohne IT-Abteilung', '20–100+ Mitarbeitende', 'Business- statt IT-Fokus'],
    binding: 'Monatlich kündbar – keine Langzeitbindung nötig',
    ctaLabel: 'Beratung buchen',
    highlighted: true,
    badge: 'Populär',
    footnote:
      'Individuelles Angebot – abgestimmt auf Infrastruktur, Reaktionszeiten und Umfang der KI-Optimierungen. Klarheit in 45 Minuten Call.',
  },
]

const detailedServices: Array<{ icon: LucideIcon; title: string; description: string }> = [
  {
    icon: RefreshCcw,
    title: 'Kontinuierliche Updates',
    description:
      'Monatliche Updates, Security-Patches und Hotfixes mit geplantem Wartungsfenster. Keine bösen Überraschungen.',
  },
  {
    icon: Activity,
    title: '24/7-Monitoring',
    description:
      'Echtzeit-Überwachung für Uptime, Performance, Error-Logs und Ressourcen. Probleme werden proaktiv behoben.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Backup',
    description:
      'Tägliche, verschlüsselte Backups, Firewall-Management, SSL-Zertifikate und Penetration-Tests. Infrastruktur wird gehärtet.',
  },
  {
    icon: Zap,
    title: 'Performance-Optimierung',
    description: 'Datenbank-Tuning, Caching, Ressourcen-Management. Wenn Last steigt, wächst die Infrastruktur mit.',
  },
  {
    icon: Brain,
    title: 'KI-Workflow-Automation',
    description:
      'n8n, LLM-Integrationen, Automatisierung von Routineaufgaben. Prozesse werden intelligenter, nicht nur schneller.',
  },
  {
    icon: Lightbulb,
    title: 'Potenziale & Trends',
    description:
      'Monatliche Reviews zu Trends, Open-Source-Neuheiten und Optimierungen. Wir liefern Vorschläge, bevor etwas brennt.',
  },
  {
    icon: Users,
    title: 'Support & Beratung',
    description:
      'Ihr Team erhält Antworten, Sparring und Priorisierung. Infrastruktur-Managed: < 24h, Full-Partnership: < 6h.',
  },
  {
    icon: Target,
    title: 'Langfristige Perspektive',
    description:
      'Architektur für die nächsten 3–5 Jahre: modular, skalierbar, future-ready. Keine technische Schuld, sondern Wachstumspfad.',
  },
]

const reasonCards: Array<{ icon: LucideIcon; title: string; description: string }> = [
  {
    icon: TrendingUp,
    title: 'Ressourcen auf Kernbusiness konzentrieren',
    description:
      'Ressourcen-Based-View: Jede Stunde Infrastruktur-Overhead ist eine Stunde weniger Produkt, Kunden oder Wachstum. Outsourcing ist ein strategischer Hebel.',
  },
  {
    icon: Brain,
    title: 'KI-intelligente Infrastruktur',
    description:
      'Wir betreiben nicht einfach Server. Wir integrieren KI, Automation und Governance, damit Infrastruktur smarter wird.',
  },
  {
    icon: Layers,
    title: 'Future-Ready Plattform',
    description:
      'Wir bauen Schichten, die skalieren: Modularität, Security, Observability. Das schützt vor technischer Schuld und Vendor-Lock-in.',
  },
  {
    icon: Lightbulb,
    title: 'Trends & Innovation im Blick',
    description:
      'Wir beobachten Open Source, KI und Automatisierung täglich. Sie erhalten proaktive Roadmaps statt reaktiver Tickets.',
  },
]

const faqItems = [
  {
    question: 'Wie funktioniert die monatliche Kündigung?',
    answer:
      'Sie geben uns Bescheid, im Folgemonat läuft der Vertrag aus. Sie erhalten vollständige Dokumentation, Daten-Export in Standardformaten und auf Wunsch einen 2h-Handover-Call. Infrastruktur und Daten bleiben bei Ihnen.',
  },
  {
    question: 'Warum kostet monatlich kündbar mehr?',
    answer:
      'Flexibilität hat einen Preis. Der Aufschlag kompensiert unser Risiko, damit Sie jederzeit aussteigen können – ohne Kleingedrucktes und ohne Abhängigkeiten.',
  },
  {
    question: 'Können wir zwischen den Service-Leveln wechseln?',
    answer:
      'Ja, jederzeit. Starten Sie mit Infrastruktur-Managed und wechseln Sie bei Bedarf auf Full-Partnership oder zurück. Wir passen SLAs und Umfang dynamisch an.',
  },
  {
    question: 'Was kostet langfristige Betreuung?',
    answer:
      'Es hängt von Teamgröße, Infrastruktur-Landschaft, gewünschter KI-Automation und Reaktionszeit ab. Im kostenlosen Beratungsgespräch kalkulieren wir transparent: individuelles Angebot statt Pauschalpreis.',
  },
  {
    question: 'Wie schnell reagieren Sie bei Problemen?',
    answer:
      'Infrastruktur-Managed: < 24h. Full-Partnership: < 6h. Kritische Incidents werden sofort priorisiert – auch nachts oder am Wochenende.',
  },
  {
    question: 'Können wir auch einzelne Leistungen buchen?',
    answer:
      'Ja, auf Stundenbasis (ab 65 €/h) für Ad-hoc-Support, Consulting oder Mini-Projekte. Ideal, wenn Sie ohne monatliche Bindung testen möchten.',
  },
  {
    question: 'Wie oft informieren Sie über Trends & Potenziale?',
    answer:
      'Full-Partnership: monatliche Strategy-Reviews mit konkreten Empfehlungen zu KI, Open Source und Automatisierung. Infrastruktur-Managed: monatliche Trend-Updates als Teil der Reviews.',
  },
]

const BetreuungPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const answerRefs = useRef<Array<HTMLDivElement | null>>([])

  const openCalendly = useCallback(() => {
    if (typeof window === 'undefined') return
    window.open(calendlyUrl, '_self')
  }, [])

  const scrollToServiceLevels = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const target = document.getElementById('service-levels')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const toggleFaq = useCallback((index: number) => {
    setOpenFaqIndex(prev => (prev === index ? null : index))
  }, [])

  return (
    <div className="bg-white text-gray-900 dark:bg-bg-darker dark:text-text-light">
      <Seo
        title="Langfristige Betreuung & KI-optimierter IT-Betrieb | VAE Systems"
        description="Outsourcen Sie Ihr IT-Rückgrat an VAE: Infrastruktur-Managed oder Full-Partnership – mit Fokus auf Ressourcen, KI-Optimierung und langfristige Stabilität."
        canonicalPath="/services/betreuung"
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:border-white/5 dark:from-bg-dark dark:via-[#0e1117] dark:to-bg-dark">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--vae-turquoise-rgb),0.35),transparent_55%),radial-gradient(circle_at_70%_30%,rgba(var(--vae-turquoise-rgb),0.18),transparent_60%)]" />
        </div>
        <div className="container-vae relative flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise">
            SERVICE
          </span>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-gray-900 dark:text-white md:text-5xl">
            Weniger IT-Overhead. Mehr Zeit für Ihr Business.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-text-secondary md:text-lg">
            Ihr IT-Team, aber outsourced. Wir kümmern uns um Infrastruktur, Updates, Security und KI-Optimierung – Sie
            konzentrieren sich auf das, was Ressourcen wirklich nach vorne bringt.
          </p>
          <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <MagneticButton intensity={0.08} scaleEffect className="w-full sm:w-auto">
              <button
                onClick={openCalendly}
                className="btn-primary flex w-full items-center justify-center gap-2 px-8 py-4 text-base"
              >
                Service-Level besprechen
              </button>
            </MagneticButton>
            <MagneticButton intensity={0.05} className="w-full sm:w-auto">
              <button
                onClick={e => {
                  e.preventDefault()
                  scrollToServiceLevels(e)
                }}
                className="btn-ghost flex w-full items-center justify-center border border-gray-300 px-8 py-4 text-base text-gray-900 transition hover:border-vae-turquoise hover:text-vae-turquoise dark:border-white/20 dark:text-white"
              >
                Service-Optionen ansehen ↓
              </button>
            </MagneticButton>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm font-semibold text-gray-600 dark:text-text-secondary">
            {trustBadges.map(badge => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1 dark:border-white/10 dark:bg-white/5"
              >
                <Check className="h-4 w-4 text-vae-turquoise" /> {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Problem */}
      <section className="border-b border-gray-200 py-20 dark:border-white/5">
        <div className="container-vae grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">Das Problem</p>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
              Warum haben Sie eigentlich einen IT-Admin?
            </h2>
            <p className="text-lg text-gray-700 dark:text-text-secondary">
              Jemand aus Ihrem Team kümmert sich um Updates, Backups und Incidents. Das ist wichtig – aber es kostet
              Ressourcen. Ressourcen-Based-View bedeutet: Jede Stunde Infrastruktur-Overhead fehlt beim Produkt, beim
              Kunden oder bei Wachstum.
            </p>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-white/5 dark:bg-white/5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-vae-turquoise/70">
                Die versteckten Kosten
              </p>
              <ul className="mt-4 space-y-3 text-gray-700 dark:text-text-secondary">
                {hiddenCosts.map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm md:text-base">
                    <CheckCircle2 className="mt-1 h-4 w-4 text-vae-turquoise" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-lg text-gray-700 dark:text-text-secondary">
              Outsourcing dieser Verantwortung befreit Ressourcen. Ihr Team baut Produkte, betreut Kunden und treibt
              Business Growth – wir halten das IT-Rückgrat stabil.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-vae-turquoise/30 bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8 shadow-lg dark:from-bg-dark dark:via-[#0e1117] dark:to-bg-darker">
            {/* Subtle glow effect at top */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.08),transparent_60%)]" />

            <div className="relative z-10">
              <div className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-vae-turquoise/80">
                Ressourcen-Fokus
              </div>
              <p className="text-lg text-gray-700 dark:text-text-secondary">
                Infrastruktur-Aufgaben wirken klein, summieren sich aber zu verlorenen Monaten. Unsere Visualisierung
                zeigt typischen Ressourcenverbrauch in Tech-Teams.
              </p>
              <div className="mt-8 space-y-6">
                {resourceSplit.map(item => (
                  <div key={item.label}>
                    <div className="mb-3 flex items-baseline justify-between gap-4">
                      <span className="flex-1 text-sm font-medium text-gray-700 dark:text-text-secondary">
                        {item.label}
                      </span>
                      <span className="w-14 text-right text-2xl font-bold tabular-nums text-gray-900 dark:text-text-light">
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-gray-200 shadow-inner dark:bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-vae-turquoise to-[#5fffff] shadow-sm transition-all duration-700 ease-out"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-sm text-gray-700 dark:text-text-secondary">
                Unser Ziel: Wartung auf{' '}
                <span className="font-semibold text-gray-900 dark:text-text-light">unter 20%</span> drücken und
                Innovation verdoppeln – mit klarem Fokus auf Wertschöpfung statt Firefighting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Lösung */}
      <section className="border-b border-gray-200 py-20 dark:border-white/5">
        <div className="container-vae space-y-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">Die Lösung</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
              Outsourcing mit Sinn: Ressourcen-Fokus
            </h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-text-secondary">
              Statt fragmentierter IT-Verwaltung erhalten Sie ein komplettes Rückgrat. Wir übernehmen Betrieb, Security,
              KI-Optimierung und Innovation. Sie nutzen Ihre Ressourcen für Kernkompetenzen und wachsen schneller.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {resourcePillars.map(pillar => (
              <div
                key={pillar.title}
                className="rounded-3xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-6 transition hover:-translate-y-1 hover:border-vae-turquoise/60 dark:border-white/5 dark:from-white/5 dark:to-transparent"
              >
                <pillar.icon className="mb-4 h-10 w-10 text-vae-turquoise" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm text-gray-700 dark:text-text-secondary">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Section: Team in Action */}
      <section className="border-b border-gray-200 py-20 dark:border-white/5">
        <div className="container-vae">
          <header className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">Unser Ansatz</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
              Direkte Kommunikation, klare Prozesse
            </h2>
            <p className="mt-4 text-base text-gray-700 dark:text-text-secondary md:text-lg">
              Transparenz und enge Zusammenarbeit sind der Kern unserer Betreuung
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Jakob erklärt an Leinwand */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-vae-turquoise/60 hover:shadow-lg dark:border-white/10 dark:bg-white/5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-vae-turquoise/15">
                  <Users className="h-5 w-5 text-vae-turquoise" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Persönliche Beratung</h3>
                  <p className="text-xs text-gray-600 dark:text-text-secondary">Review & Strategie</p>
                </div>
              </div>
              <picture>
                <source
                  srcSet="/images/optimized/Jakob-steht-vor-Leinwand-erklärt-und-zeigt-auf-Texte.webp"
                  type="image/webp"
                />
                <img
                  src="/images/optimized/Jakob-steht-vor-Leinwand-erklärt-und-zeigt-auf-Texte.jpg"
                  alt="VAE Team erklärt Infrastruktur-Strategie"
                  loading="lazy"
                  className="h-auto w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </picture>
            </div>

            {/* Hand zeigt Details */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-vae-turquoise/60 hover:shadow-lg dark:border-white/10 dark:bg-white/5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-vae-turquoise/15">
                  <Target className="h-5 w-5 text-vae-turquoise" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Detailgenau & strukturiert</h3>
                  <p className="text-xs text-gray-600 dark:text-text-secondary">Keine Black Box</p>
                </div>
              </div>
              <picture>
                <source
                  srcSet="/images/optimized/Hand-mit-Brille-zeigt-auf-Text-an-Leinwand-2-beste-version.webp"
                  type="image/webp"
                />
                <img
                  src="/images/optimized/Hand-mit-Brille-zeigt-auf-Text-an-Leinwand-2-beste-version.jpg"
                  alt="Detaillierte technische Dokumentation"
                  loading="lazy"
                  className="h-auto w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </picture>
            </div>
          </div>

          {/* Benefits unter den Bildern */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-vae-turquoise/15">
                <Activity className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h4 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">Proaktives Monitoring</h4>
              <p className="text-sm text-gray-700 dark:text-text-secondary">
                Wir erkennen Probleme, bevor sie auftreten
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-vae-turquoise/15">
                <Lightbulb className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h4 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">Strategische Optimierung</h4>
              <p className="text-sm text-gray-700 dark:text-text-secondary">
                Monatliche Reviews mit Verbesserungsvorschlägen
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-vae-turquoise/15">
                <RefreshCcw className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h4 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">Kontinuierliche Updates</h4>
              <p className="text-sm text-gray-700 dark:text-text-secondary">
                Immer auf dem neuesten Stand, ohne Ausfälle
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Service Levels */}
      <section
        id="service-levels"
        className="border-b border-gray-200 bg-gray-50 py-24 dark:border-white/5 dark:bg-transparent"
      >
        <div className="container-vae">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">Service-Level</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
              Zwei Wege – eine Philosophie
            </h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-text-secondary">
              Je nachdem, was Sie outsourcen möchten.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {serviceLevels.map(level => {
              const ctaIntensity = level.highlighted ? 0.09 : 0.05
              return (
                <div
                  key={level.id}
                  className={`relative flex h-full flex-col rounded-3xl border bg-white p-8 shadow-md transition hover:-translate-y-1 dark:bg-white/5 ${
                    level.highlighted
                      ? 'border-vae-turquoise/60 shadow-lg shadow-vae-turquoise/10 dark:shadow-vae-turquoise/20'
                      : 'border-gray-200 dark:border-white/10'
                  }`}
                >
                  {level.badge && (
                    <span className="absolute right-6 top-6 rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-vae-turquoise">
                      {level.badge}
                    </span>
                  )}
                  <level.icon className="mb-5 h-12 w-12 text-vae-turquoise" />
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{level.title}</h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.3em] text-vae-turquoise/70">{level.subtitle}</p>
                  <p className="mt-4 text-base text-gray-700 dark:text-text-secondary">{level.description}</p>

                  <div className="mt-8 space-y-4 text-sm text-gray-700 dark:text-text-secondary">
                    <div>
                      <p className="font-semibold uppercase tracking-[0.2em] text-vae-turquoise/70">
                        Was enthalten ist
                      </p>
                      <ul className="mt-3 space-y-2">
                        {level.included.map(item => (
                          <li key={item} className="flex items-start gap-2 text-sm">
                            <Check className="mt-1 h-4 w-4 text-vae-turquoise" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {level.excluded && (
                      <div>
                        <p className="font-semibold uppercase tracking-[0.2em] text-vae-turquoise/70">
                          Was nicht enthalten ist
                        </p>
                        <ul className="mt-3 space-y-2">
                          {level.excluded.map(item => (
                            <li key={item} className="flex items-start gap-2 text-sm">
                              <Minus className="mt-1 h-4 w-4 text-gray-500 dark:text-text-secondary/70" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold uppercase tracking-[0.2em] text-vae-turquoise/70">
                        Für wen geeignet?
                      </p>
                      <ul className="mt-3 space-y-2">
                        {level.suitable.map(item => (
                          <li key={item} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="mt-1 h-4 w-4 text-vae-turquoise" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-text-secondary">
                    <p className="font-semibold text-gray-900 dark:text-text-light">{level.binding}</p>
                    <p className="mt-2">{level.footnote}</p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3">
                    <MagneticButton intensity={ctaIntensity} className="w-full">
                      <button
                        onClick={openCalendly}
                        className={`w-full rounded-full px-5 py-3 text-sm font-semibold transition ${
                          level.highlighted
                            ? 'bg-vae-turquoise text-bg-dark hover:bg-white'
                            : 'border border-gray-300 text-gray-900 hover:border-vae-turquoise hover:text-vae-turquoise dark:border-white/20 dark:text-white'
                        }`}
                      >
                        {level.ctaLabel}
                      </button>
                    </MagneticButton>
                    <p className="text-center text-xs text-gray-600 dark:text-text-secondary">
                      Individuelles Angebot · Abhängig von Teamgröße, Infrastruktur und KI-Umfang
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 5: Leistungen */}
      <section className="border-b border-gray-200 py-20 dark:border-white/5">
        <div className="container-vae">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">Was ist enthalten?</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
              Was wir konkret machen
            </h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-text-secondary">
              Hinter den Kulissen: Der tägliche Betrieb.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {detailedServices.map(service => (
              <div
                key={service.title}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-vae-turquoise/60 hover:shadow-md dark:border-white/10 dark:bg-white/5"
              >
                <service.icon className="mb-4 h-10 w-10 text-vae-turquoise" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{service.title}</h3>
                <p className="mt-3 text-sm text-gray-700 dark:text-text-secondary">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Gründe */}
      <section className="border-b border-gray-200 bg-gray-50 py-20 dark:border-white/5 dark:bg-transparent">
        <div className="container-vae">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">Warum VAE?</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
              Warum Kunden VAE wählen
            </h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-text-secondary">
              Ressourcen, Innovation und langfristiges Wachstum – nicht nur Infrastruktur.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {reasonCards.map(reason => (
              <div
                key={reason.title}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-vae-turquoise/60 hover:shadow-md dark:border-white/10 dark:bg-white/5"
              >
                <reason.icon className="mb-4 h-10 w-10 text-vae-turquoise" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{reason.title}</h3>
                <p className="mt-3 text-sm text-gray-700 dark:text-text-secondary">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section className="border-b border-gray-200 py-20 dark:border-white/5">
        <div className="container-vae">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">Häufige Fragen</h2>
          </div>
          <div className="mt-12 space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index
              const panelId = `faq-panel-${index}`
              const buttonId = `faq-button-${index}`
              return (
                <div
                  key={item.question}
                  className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? 'border-vae-turquoise/50 bg-vae-turquoise/5 shadow-lg shadow-vae-turquoise/10'
                      : 'border-gray-200 bg-white hover:border-vae-turquoise/35 dark:border-white/10 dark:bg-white/5'
                  }`}
                >
                  <button
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-lg font-medium text-gray-900 dark:text-white"
                  >
                    <span className="flex-1">{item.question}</span>
                    <span
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-vae-turquoise/10 text-vae-turquoise transition-all duration-300 ${
                        isOpen ? 'rotate-180 bg-vae-turquoise/20' : 'group-hover:bg-vae-turquoise/15'
                      }`}
                    >
                      <ChevronDown className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    ref={el => {
                      answerRefs.current[index] = el
                    }}
                    style={{ maxHeight: isOpen ? `${answerRefs.current[index]?.scrollHeight ?? 0}px` : 0 }}
                    className="overflow-hidden px-6 transition-[max-height] duration-500 ease-in-out"
                  >
                    <div className="border-t border-gray-200 pb-5 pt-4 text-base leading-relaxed text-gray-700 dark:border-white/10 dark:text-text-secondary">
                      {item.answer}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 8: CTA */}
      <section className="bg-gray-50 py-20 dark:bg-transparent">
        <div className="container-vae">
          <div className="rounded-3xl border border-vae-turquoise/40 bg-gradient-to-br from-vae-turquoise/15 to-transparent p-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/80">Finale Einladung</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
              Bereit, Ressourcen freizulegen?
            </h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-text-secondary">
              Kostenloses Beratungsgespräch – unverbindlich, monatlich kündbar. Wir zeigen, wie Outsourcing Ihr
              IT-Rückgrat stärkt und Ressourcen aufs Kernbusiness lenkt.
            </p>
            <MagneticButton intensity={0.1} scaleEffect glowEffect className="mx-auto mt-8 inline-flex">
              <button
                onClick={openCalendly}
                className="btn-primary flex items-center justify-center px-10 py-4 text-base font-semibold"
              >
                Beratung buchen
              </button>
            </MagneticButton>
            <p className="mt-4 text-sm text-gray-600 dark:text-text-secondary">
              45 Minuten. Klarheit zu Aufwand, Team-Setup und KI-Potenzialen.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BetreuungPage
