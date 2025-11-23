import { BOOKING_LINKS } from '@/config/booking'
import { faqEntries } from '@/data/faqData'
import {
  type LucideIcon,
  Activity,
  ArrowUpRight,
  Brain,
  Building2,
  Check,
  CheckCircle2,
  Cloud,
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
import React, { useCallback, useMemo } from 'react'
import MagneticButton from '../ui/buttons/MagneticButton'
import FaqAccordion from '../ui/FaqAccordion'
import Seo from '../ui/Seo'

const bookingUrl = BOOKING_LINKS.RETAINER_PLANUNG

const trustBadges = ['Flexible Bindung', 'Zuverlässig', 'Transparent']

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
    subtitle: 'Betrieb der bestehenden Informationsinfrastruktur',
    description:
      'Fokus auf Betrieb der Kernsysteme: Wir übernehmen Patching, Monitoring und sorgen für planbare Reaktionszeiten im Störungsfall. Sie behalten die Kontrolle, wir halten den Betrieb stabil.',
    included: [
      'Betrieb, Patching und Monitoring der Kernsysteme',
      'Umsetzung kleiner Changes und Bugfixes im vereinbarten Rahmen',
      'Planbare Reaktionszeiten im Störungsfall während Geschäftszeiten',
      'Automatisierte Backups und Security-Updates',
      'Performance-Monitoring und grundlegende Optimierungen',
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
    title: 'Full Partnership',
    subtitle: 'Wir sind faktisch Ihr IT-/Ops-Team',
    description:
      'Sie wollen sich voll auf das Business konzentrieren? Wir übernehmen nicht nur Betrieb, sondern auch aktive Weiterentwicklung, Strategie-Reviews und enge Einbindung in Ihre Produkt- und Prozessplanung.',
    included: [
      'Alles aus Infrastruktur-Managed',
      'Aktive Weiterentwicklung der Systemlandschaft',
      'Regelmäßige Architektur- und Strategie-Reviews',
      'Engere Einbindung in Produkt- und Prozessplanung',
      'KI-Workflow-Optimierung & Feature-Entwicklung',
      'Proaktive Innovationsvorschläge und Roadmaps',
    ],
    suitable: ['Teams ohne IT-Abteilung', '20–100+ Mitarbeitende', 'Business- statt IT-Fokus'],
    binding: 'Monatlich kündbar – keine Langzeitbindung',
    ctaLabel: 'Jetzt Beratung sichern',
    highlighted: true,
    badge: 'Populär',
    footnote:
      'Individuelles Premium-Angebot. 45 Min. Call für Klarheit zu Infrastruktur, Reaktionszeiten & KI-Potenzialen.',
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
      'Ihr Team erhält Antworten, Sparring und Priorisierung – von Alltagsthemen bis zu strategischen Entscheidungen rund um Ihre Infrastruktur.',
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

const BetreuungPage: React.FC = () => {
  const faqAccordionItems = useMemo(() => {
    const careFaqs = faqEntries.filter(entry => entry.tags?.includes('betreuung'))
    return careFaqs.map((item, index) => ({
      id: `betreuung-faq-${item.id ?? index}`,
      question: item.question,
      defaultOpen: index === 0,
      answer: <p className="text-base leading-relaxed text-text-secondary">{item.answer}</p>,
    }))
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

  return (
    <div className="bg-white text-gray-900 dark:bg-bg-darker dark:text-text-light">
      <Seo
        title="Langfristige Betreuung & KI-optimierter IT-Betrieb | VAE Systems"
        description="Outsourcen Sie Ihr IT-Rückgrat an VAE: Infrastruktur-Managed oder Full-Partnership – mit Fokus auf Ressourcen, KI-Optimierung und langfristige Stabilität."
        canonicalPath="/services/betreuung"
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-50 py-32 dark:border-white/5 dark:bg-gradient-to-br dark:from-bg-dark dark:via-bg-darker dark:to-bg-dark md:py-40">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(var(--vae-turquoise-rgb),0.10),transparent_55%),radial-gradient(circle_at_50%_60%,rgba(var(--vae-turquoise-rgb),0.06),transparent_60%)]" />
        </div>
        <div className="container-vae relative flex flex-col items-center justify-center text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise">
            MANAGED OPERATIONS
          </span>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-gray-900 dark:text-white md:text-5xl">
            Weniger IT-Overhead. Mehr Zeit für Ihr Business.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-text-secondary md:text-lg">
            Wir übernehmen Betrieb, Wartung und Weiterentwicklung Ihrer Informationsinfrastruktur – damit Ihr Team sich
            auf Produkt, Kund:innen und Wachstum konzentrieren kann.
          </p>
          <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:gap-6 lg:gap-8">
            <MagneticButton intensity={0.08} scaleEffect glowEffect className="isolate w-full sm:w-auto">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-convert flex w-full items-center justify-center gap-2 px-8 py-4 text-base font-semibold"
              >
                Service-Level besprechen
              </a>
            </MagneticButton>
            <MagneticButton intensity={0.05} scaleEffect className="isolate w-full sm:w-auto">
              <button
                onClick={e => {
                  e.preventDefault()
                  scrollToServiceLevels(e)
                }}
                className="btn-outline flex w-full items-center justify-center gap-2 px-8 py-4 text-base font-semibold"
              >
                Service-Optionen ansehen ↓
              </button>
            </MagneticButton>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm font-semibold">
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

      {/* Ressourcen-Shift: Von Firefighting zu Innovation */}
      <section className="section-card-container border-b border-gray-200 bg-white py-20 dark:border-white/5 dark:bg-bg-darker">
        <div className="section-card-backdrop" />
        <div className="container-vae relative">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
              Von Firefighting zu Innovation.
            </h2>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Visual: Balkenvergleich */}
            <div className="space-y-10">
              {/* Zustand A: Ohne VAE */}
              <div>
                <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Ohne VAE</h3>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-text-secondary">
                        Wartung & Firefighting
                      </span>
                      <span className="text-xl font-bold tabular-nums text-gray-900 dark:text-text-light">60–70%</span>
                    </div>
                    <div className="h-4 overflow-hidden rounded-full bg-gray-200 shadow-inner dark:bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-red-400 to-orange-400 shadow-sm transition-all duration-700"
                        style={{ width: '65%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-text-secondary">
                        Innovation & Produkt
                      </span>
                      <span className="text-xl font-bold tabular-nums text-gray-900 dark:text-text-light">30–40%</span>
                    </div>
                    <div className="h-4 overflow-hidden rounded-full bg-gray-200 shadow-inner dark:bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-vae-turquoise to-[#5fffff] shadow-sm transition-all duration-700"
                        style={{ width: '35%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Zustand B: Mit VAE */}
              <div>
                <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Mit VAE</h3>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-text-secondary">
                        Koordination & Management
                      </span>
                      <span className="text-xl font-bold tabular-nums text-gray-900 dark:text-text-light">20–30%</span>
                    </div>
                    <div className="h-4 overflow-hidden rounded-full bg-gray-200 shadow-inner dark:bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-gray-400 to-gray-500 shadow-sm transition-all duration-700"
                        style={{ width: '25%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-text-secondary">
                        Innovation & Produkt
                      </span>
                      <span className="text-xl font-bold tabular-nums text-gray-900 dark:text-text-light">70–80%</span>
                    </div>
                    <div className="h-4 overflow-hidden rounded-full bg-gray-200 shadow-inner dark:bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-vae-turquoise to-[#5fffff] shadow-sm transition-all duration-700"
                        style={{ width: '75%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Erklärender Text */}
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-text-secondary">
                Wir drehen das Verhältnis um. Routineaufgaben wandern zu uns, Ihr Team gewinnt Kapazität für Produkt,
                Kund:innen und strategische Projekte.
              </p>
              <p className="text-base leading-relaxed text-gray-700 dark:text-text-secondary">
                Die typische IT-Abteilung verbringt den Großteil ihrer Zeit mit Wartung, Patches und Incident-Response.
                Wertvolle Ressourcen, die dem Kerngeschäft fehlen. Mit VAE als Managed-Operations-Partner verschieben
                Sie diese Last und schaffen Raum für das, was wirklich zählt – Innovation, Kundenerfolg und Wachstum.
              </p>
              <div className="rounded-2xl border border-vae-turquoise/30 bg-vae-turquoise/10 p-6">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Das Ergebnis – Ihr Team fokussiert sich auf Wertschöpfung, nicht auf Firefighting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Problem */}
      <section className="section-card-container border-b border-gray-200 bg-white py-20 dark:border-white/5 dark:bg-bg-darker">
        <div className="section-card-backdrop" />
        <div className="container-vae relative grid gap-12 lg:grid-cols-2 lg:items-center">
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
          <div className="dark:via-white/3 relative overflow-hidden rounded-3xl border border-vae-turquoise/30 bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8 shadow-lg backdrop-blur-sm dark:border-vae-turquoise/20 dark:from-white/5 dark:to-transparent">
            {/* Subtle glow effect at top */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(8,255,193,0.15),transparent_60%)]" />

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
      <section className="section-card-container border-b border-gray-200 bg-white py-20 dark:border-white/5 dark:bg-bg-darker">
        <div className="section-card-backdrop" />
        <div className="container-vae relative space-y-10">
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
      <section className="section-card-container border-b border-gray-200 bg-white py-20 dark:border-white/5 dark:bg-bg-darker">
        <div className="section-card-backdrop" />
        <div className="container-vae relative">
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
        className="section-card-container border-b border-gray-200 bg-white py-24 dark:border-white/5 dark:bg-bg-darker"
      >
        <div className="section-card-backdrop" />
        <div className="container-vae relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">Service-Level</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
              Wie wir zusammenarbeiten können.
            </h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-text-secondary">
              Wählen Sie das Modell, das zu Ihrem Team und Ihrer Situation passt.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {serviceLevels.map(level => {
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
                    <MagneticButton intensity={0.04} scaleEffect={false} glowEffect={false} className="w-full">
                      <a
                        href={bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative w-full overflow-hidden rounded-xl px-6 py-3.5 text-sm font-bold transition-all duration-300 ${
                          level.highlighted ? 'btn-convert' : 'btn-outline'
                        }`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {level.ctaLabel}
                          {level.highlighted && <span className="opacity-70">→</span>}
                        </span>
                        {level.highlighted && (
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        )}
                      </a>
                    </MagneticButton>
                    <p className="text-center text-xs text-gray-600 dark:text-text-secondary">
                      {level.highlighted
                        ? '45 Min. · Keine Langzeitbindung'
                        : 'Individuelles Angebot nach Infrastruktur-Umfang'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* SLA-Hinweis */}
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-gray-200 bg-gray-50 p-8 dark:border-white/10 dark:bg-white/5">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Service-Level-Agreements & Premium-Support
            </h3>
            <p className="mb-4 text-base leading-relaxed text-gray-700 dark:text-text-secondary">
              Alle Betreuungsmodelle beinhalten feste Ansprechpartner:innen, Monitoring und planbare Reaktionszeiten im
              Störungsfall.
            </p>
            <p className="text-base leading-relaxed text-gray-700 dark:text-text-secondary">
              Für besonders kritische Systeme oder größere Teams können wir gemeinsam erweiterte SLAs mit priorisierten
              Reaktionszeiten und zusätzlichen Supportkanälen vereinbaren – die konkreten Werte legen wir individuell im
              Angebot fest.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Deployment-Modelle / Hosting-Optionen */}
      <section className="section-card-container border-b border-gray-200 bg-white py-20 dark:border-white/5 dark:bg-bg-darker">
        <div className="section-card-backdrop" />
        <div id="deployment-modelle" className="container-vae relative">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">Hosting & Betrieb</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
              Wie kann Ihr Setup betrieben werden?
            </h2>
            <p className="mt-4 text-base text-gray-700 dark:text-text-secondary md:text-lg">
              Wir planen Ihre Informationsinfrastruktur so, dass Hosting und Betrieb zu Ihrer Realität passen – vom
              eigenen Serverraum bis zur vollständig von VAE betriebenen Umgebung.
            </p>
          </div>

          {/* Haupt-Modelle Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Modell 1: On-Premise auf Ihrer Hardware */}
            <div className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/40 hover:shadow-lg dark:border-white/10 dark:bg-white/5">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-vae-turquoise/0 via-vae-turquoise/30 to-vae-turquoise/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-vae-turquoise/30 bg-vae-turquoise/10 transition-transform duration-300 group-hover:scale-110">
                <Server className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">On-Premise auf Ihrer Hardware</h3>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                Setup auf Ihrer bestehenden Hardware. Dokumentiert, betreibbar – Betrieb bleibt bei Ihrem Team oder geht
                später an VAE über.
              </p>
            </div>

            {/* Modell 2: Managed auf Ihrer Infrastruktur */}
            <div className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/40 hover:shadow-lg dark:border-white/10 dark:bg-white/5">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-vae-turquoise/0 via-vae-turquoise/30 to-vae-turquoise/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-vae-turquoise/30 bg-vae-turquoise/10 transition-transform duration-300 group-hover:scale-110">
                <ShieldCheck className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Managed auf Ihrer Infrastruktur</h3>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                Setup bei deutschen Anbietern (dedizierte Server auf Ihren Accounts). VAE übernimmt Betrieb, Monitoring,
                Updates und Security.
              </p>
            </div>

            {/* Modell 3: VAE-Managed Plattform */}
            <div className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/40 hover:shadow-lg dark:border-white/10 dark:bg-white/5">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-vae-turquoise/0 via-vae-turquoise/30 to-vae-turquoise/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-vae-turquoise/30 bg-vae-turquoise/10 transition-transform duration-300 group-hover:scale-110">
                <Cloud className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">VAE-Managed Plattform</h3>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                Komplett von VAE betriebene Umgebung in deutschen Rechenzentren. Betrieb, Security, Monitoring –
                minimaler Footprint, maximale Entlastung.
              </p>
            </div>
          </div>

          {/* Coming Soon Banner */}
          <div className="mx-auto mt-8 max-w-3xl">
            <div className="relative overflow-hidden rounded-2xl border border-vae-turquoise/20 bg-gradient-to-br from-vae-turquoise/5 via-white to-vae-turquoise/5 p-6 dark:from-vae-turquoise/10 dark:via-bg-dark dark:to-vae-turquoise/10">
              <div className="flex flex-col gap-3 text-center md:flex-row md:items-center md:gap-4 md:text-left">
                <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-vae-turquoise/30 bg-vae-turquoise/10 md:mx-0 md:self-start">
                  <Server className="h-5 w-5 text-vae-turquoise" />
                </div>
                <div className="flex-1">
                  <h4 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
                    Coming Soon: Hardware-Management
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                    Für Organisationen mit eigenem Rechenzentrum planen wir ein Angebot, bei dem VAE auch das
                    Lifecycle-Management der physischen Hardware übernimmt – von Kapazitätsplanung und
                    Beschaffungsempfehlungen bis zu Wartungskonzepten.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-block rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-vae-turquoise">
                    In Vorbereitung
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Leistungen */}
      <section className="section-card-container border-b border-gray-200 bg-white py-20 dark:border-white/5 dark:bg-bg-darker">
        <div className="section-card-backdrop" />
        <div className="container-vae relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">Was ist enthalten?</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
              Was wir konkret machen
            </h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-text-secondary">
              Hinter den Kulissen: Der tägliche Betrieb.
            </p>
          </div>
          <div className="card-group mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {detailedServices.map(service => (
              <div
                key={service.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-vae-turquoise/25 bg-white/90 p-6 shadow-[0_14px_45px_-20px_rgba(15,23,42,0.35)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/50 hover:shadow-[0_18px_60px_-24px_rgba(8,255,193,0.35)] dark:border-vae-turquoise/20 dark:bg-white/5 dark:shadow-[0_18px_60px_-30px_rgba(0,0,0,0.75)] dark:hover:bg-white/10"
              >
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-vae-turquoise/0 via-vae-turquoise/40 to-vae-turquoise/0 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-vae-turquoise/10 shadow-[0_0_20px_-5px_rgba(8,255,193,0.3)] transition-all duration-300 group-hover:bg-vae-turquoise/15 group-hover:shadow-[0_0_30px_-5px_rgba(8,255,193,0.5)] dark:bg-vae-turquoise/15 dark:shadow-[0_0_30px_-8px_rgba(8,255,193,0.4)] dark:group-hover:shadow-[0_0_40px_-8px_rgba(8,255,193,0.6)]">
                  <service.icon className="h-6 w-6 text-vae-turquoise" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prozess-Sektion */}
      <section className="section-card-container border-b border-gray-200 bg-white py-20 dark:border-white/5 dark:bg-bg-darker">
        <div className="section-card-backdrop" />
        <div className="container-vae relative">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">Unser Prozess</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
              So arbeiten wir zusammen
            </h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-text-secondary">
              Von der Übergabe bis zur kontinuierlichen Optimierung – strukturiert, transparent und messbar.
            </p>
          </div>

          {/* Timeline Desktop: Horizontal */}
          <div className="hidden gap-4 md:grid md:grid-cols-3">
            {/* Phase 1: Onboarding */}
            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-vae-turquoise/15">
                <span className="text-2xl font-bold text-vae-turquoise">1</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">Onboarding</h3>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                Übergabe, Review der bestehenden Systeme, Definition von Scope & Prioritäten. Wir verschaffen uns einen
                klaren Überblick über Ihre Infrastruktur und legen gemeinsam die Ziele fest.
              </p>
            </div>

            {/* Phase 2: Stabilisierung */}
            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-vae-turquoise/15">
                <span className="text-2xl font-bold text-vae-turquoise">2</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">Stabilisierung</h3>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                Aufräumen, Monitoring einrichten, erste Verbesserungen umsetzen. In dieser Phase schaffen wir eine
                stabile Basis für den laufenden Betrieb.
              </p>
            </div>

            {/* Phase 3: Laufende Betreuung */}
            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-vae-turquoise/15">
                <span className="text-2xl font-bold text-vae-turquoise">3</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                Laufende Betreuung & Optimierung
              </h3>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                Regelmäßige Checks, Roadmaps und kleine Projekte. Wir halten die Systeme aktuell, optimieren
                kontinuierlich und unterstützen Sie bei neuen Anforderungen.
              </p>
            </div>
          </div>

          {/* Timeline Mobile: Vertical */}
          <div className="space-y-8 md:hidden">
            {/* Phase 1: Onboarding */}
            <div className="relative flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-vae-turquoise/15">
                  <span className="text-xl font-bold text-vae-turquoise">1</span>
                </div>
                <div className="mt-2 w-0.5 flex-1 bg-vae-turquoise/30" />
              </div>
              <div className="pb-8">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Onboarding</h3>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                  Übergabe, Review der bestehenden Systeme, Definition von Scope & Prioritäten.
                </p>
              </div>
            </div>

            {/* Phase 2: Stabilisierung */}
            <div className="relative flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-vae-turquoise/15">
                  <span className="text-xl font-bold text-vae-turquoise">2</span>
                </div>
                <div className="mt-2 w-0.5 flex-1 bg-vae-turquoise/30" />
              </div>
              <div className="pb-8">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Stabilisierung</h3>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                  Aufräumen, Monitoring einrichten, erste Verbesserungen umsetzen.
                </p>
              </div>
            </div>

            {/* Phase 3: Laufende Betreuung */}
            <div className="relative flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-vae-turquoise/15">
                  <span className="text-xl font-bold text-vae-turquoise">3</span>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  Laufende Betreuung & Optimierung
                </h3>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                  Regelmäßige Checks, Roadmaps und kleine Projekte. Kontinuierliche Optimierung und Support.
                </p>
              </div>
            </div>
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
      <section className="bg-gradient-to-b from-white via-gray-50 to-white py-20 text-gray-900 dark:from-bg-darker dark:via-[#050505] dark:to-bg-darker dark:text-white">
        <div className="container-vae">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/80">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">Häufige Fragen</h2>
            <p className="mt-4 text-base text-text-secondary dark:text-white/70">
              Antworten zur monatlich kündbaren Betreuung – transparent, ohne Buzzword-Schleier.
            </p>
          </div>
          <FaqAccordion items={faqAccordionItems} className="mt-12 space-y-4" />
        </div>
      </section>

      {/* Section 8: CTA */}
      <section className="border-t border-gray-200 bg-gray-50 py-16 dark:border-white/5 dark:bg-transparent md:py-20">
        <div className="container-vae flex flex-col items-center gap-4 text-center md:gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">
            Bereit für den nächsten Schritt?
          </p>
          <h2 className="px-4 text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
            Langfristige Betreuung für Ihre Systeme.
          </h2>
          <p className="mx-auto max-w-3xl px-4 text-base leading-relaxed text-gray-700 dark:text-text-secondary md:text-lg">
            Wir halten Ihr IT-Rückgrat stabil, während Ihr Team sich auf Produkt, Kund:innen und Wachstum konzentriert.
            Monatlich kündbar, ohne Langzeitbindung.
          </p>
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <MagneticButton intensity={0.1} scaleEffect glowEffect>
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-convert inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold md:px-10 md:py-4 md:text-base"
              >
                <span className="hidden sm:inline">Beratungsgespräch buchen</span>
                <span className="sm:hidden">Gespräch buchen</span>
              </a>
            </MagneticButton>
            <p className="px-4 text-xs text-gray-600 dark:text-text-secondary md:text-sm">
              45 Minuten. Klarheit zu Aufwand, Team-Setup und KI-Potenzialen.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BetreuungPage
