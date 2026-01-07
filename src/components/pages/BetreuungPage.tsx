/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  BETREUUNG PAGE                                                           ┃
 * ┃  Langzeit-Partnerschaft → Managed Infrastruktur & Support.                ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎛️ CORE
 * ├── hiddenCosts[]        → Problem-Statement (versteckte IT-Kosten)
 * ├── resourceSplit        → Wartung vs. Innovation Ratio
 * ├── resourcePillars[]    → Vorteile-Cards
 * └── pricingTiers[]       → Basic, Pro, Enterprise
 *
 * 🎨 LAYERS
 * ├── Hero Section         → Problem + Lösung
 * ├── Resource Split       → Visualization
 * ├── Pillars Grid         → Feature-Cards
 * ├── Pricing Comparison   → Tier-Vergleich
 * └── FAQ + Final CTA
 */

import FeaturePill from '@/components/ui/FeaturePill'
import { BOOKING_LINKS } from '@/config/booking'
import { faqEntries } from '@/content/shared/faqData'
import { motion } from 'framer-motion'
import {
  type LucideIcon,
  Activity,
  AlertCircle,
  ArrowRight,
  Brain,
  Check,
  CheckCircle2,
  Clock,
  Cloud,
  Layers,
  Lightbulb,
  Minus,
  RefreshCcw,
  Server,
  Shield,
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

// ── 🎛️ CORE — Constants ──
const bookingUrl = BOOKING_LINKS.RETAINER_PLANUNG

const trustBadges = ['Flexible Bindung', 'Zuverlässig', 'Transparent']

/* UNUSED - Legacy data, keeping for potential future features
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
*/

/* UNUSED - resourcePillars (legacy)
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
      'Custom Code, maßgeschneiderte Integrationen und (LLM-)Workflows mit Monitoring: Ihre Infrastruktur wird nicht nur betrieben, sondern arbeitet aktiv mit – und bleibt langfristig wartbar',
  },
]
*/

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
  ctaSubline?: string
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
      'Kundenaccount (Chat & Files) für Übergaben, Reports und Abstimmungen',
    ],
    excluded: ['User-Support (bleibt intern)', 'Feature-Entwicklung', 'Trainings & Schulungen'],
    suitable: ['Teams mit IT-Erfahrung', '5–30 Mitarbeitende', 'Maximale Unabhängigkeit gewünscht'],
    binding: 'Monatlich kündbar (Preis-Premium für maximale Flexibilität)',
    ctaLabel: 'Zum Gespräch',
    ctaSubline: 'Bei konkreter Anfrage erhalten Sie ein individualisiertes Angebot.',
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
      'Kundenaccount (Chat & Files) mit laufenden Verbesserungs-Updates und Release-Notes',
    ],
    suitable: ['Teams ohne IT-Abteilung', '20–100+ Mitarbeitende', 'Business- statt IT-Fokus'],
    binding: 'Monatlich kündbar – keine Langzeitbindung',
    ctaLabel: 'Jetzt Beratung sichern',
    ctaSubline: 'Bei konkreter Anfrage erhalten Sie ein individualisiertes Angebot.',
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
    title: 'Proaktives Monitoring',
    description:
      'Echtzeit-Überwachung für Uptime, Performance, Error-Logs und Ressourcen. Automatisierte Alerts während Geschäftszeiten. Für kritische Systeme: Erweiterte SLAs außerhalb der Geschäftszeiten verfügbar.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Backup',
    description:
      'Tägliche, verschlüsselte Backups, Firewall-Management, SSL-Zertifikate und regelmäßige Penetration-Tests. Ihre Infrastruktur wird kontinuierlich gehärtet und abgesichert.',
  },
  {
    icon: Zap,
    title: 'Performance-Optimierung',
    description:
      'Datenbank-Tuning, Caching und Ressourcen-Management für optimale Performance. Wenn die Last steigt, wächst die Infrastruktur skalierbar mit.',
  },
  {
    icon: Brain,
    title: 'KI-Workflow-Automation',
    description:
      'Custom Code, LLM-Integrationen und Automatisierung von Routineaufgaben. Prozesse werden intelligenter, stabiler und langfristig wartbar – nicht nur schneller.',
  },
  {
    icon: Lightbulb,
    title: 'Potenziale & Trends',
    description:
      'Monatliche Reviews zu aktuellen Trends, Open-Source-Neuheiten und strategischen Optimierungen. Wir liefern proaktive Vorschläge, bevor etwas brennt.',
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

/* UNUSED - AnimatedCounter component (legacy)
// ── 🎨 ANIMATED COUNTER COMPONENT ──
const AnimatedCounter: React.FC<{ value: number; className?: string }> = ({ value, className }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate: latest => setCount(Math.round(latest)),
      })
      return () => controls.stop()
    }
  }, [isInView, value])

  return (
    <span ref={ref} className={className}>
      {count}%
    </span>
  )
}
*/

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
    <div className="relative bg-white text-gray-900 dark:bg-bg-darker dark:text-text-light">
      <Seo
        title="Langfristige IT-Betreuung Heidelberg | VAE Systems"
        description="Outsourcen Sie Ihr IT-Rückgrat an VAE: Infrastruktur-Managed oder Full-Partnership – mit Fokus auf Ressourcen, KI-Optimierung und langfristige Stabilität."
        canonicalPath="/leistungen/betreuung"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Langfristige IT-Betreuung',
          provider: {
            '@type': 'Organization',
            name: 'VAE Systems UG',
            url: 'https://vae.systems',
          },
          areaServed: {
            '@type': 'Place',
            name: 'Deutschland',
          },
          description: 'Managed Operations: Betrieb, Wartung und Weiterentwicklung Ihrer IT-Systeme',
          offers: {
            '@type': 'Offer',
            url: 'https://vae.systems/leistungen/betreuung',
            priceCurrency: 'EUR',
            price: 'auf Anfrage',
          },
        }}
      />
      {/* Hero */}
      <section className="border-vae-turquoise/12 relative overflow-hidden border-b bg-gradient-to-br from-[#e8fff7] via-[#f5fffc] to-[#f0fff9] py-40 dark:border-white/5 dark:bg-gradient-to-br dark:from-bg-dark dark:via-bg-darker dark:to-bg-dark md:py-56">
        {/* Hero Background Image - Desktop: Fixed Wallpaper, Mobile: Absolute */}
        {/* Desktop version with fixed attachment */}
        <div
          className="pointer-events-none absolute inset-0 hidden opacity-[0.40] dark:opacity-[0.20] md:block"
          style={{
            backgroundImage: 'url(/images/optimized/P1010798.JPG.webp)',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          role="presentation"
        />
        {/* Mobile version without fixed (iOS Safari compatibility) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.40] dark:opacity-[0.20] md:hidden"
          style={{
            backgroundImage: 'url(/images/optimized/P1010798.JPG.webp)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          role="presentation"
        />
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(var(--vae-turquoise-rgb),0.18),transparent_55%),radial-gradient(circle_at_50%_60%,rgba(var(--vae-turquoise-rgb),0.12),transparent_60%)]" />
        </div>
        {/* Light Mode: subtiler Glasmorphism-Hintergrund */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[85%] max-w-4xl -translate-y-1/2 rounded-3xl bg-white/30 backdrop-blur-[2px] dark:bg-transparent dark:backdrop-blur-none" />
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
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {trustBadges.map(badge => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/20 bg-vae-turquoise/5 px-4 py-2 text-sm font-medium text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-text-secondary"
              >
                <Check className="h-4 w-4 text-vae-turquoise" /> {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* IT-Kapazität Engpass Section */}
      <section className="section-card-container border-b border-gray-200 bg-white py-16 dark:border-white/5 dark:bg-bg-darker">
        <div className="section-card-backdrop" />
        <div className="container-vae relative space-y-12">
          {/* Block 1: Intro */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.3em] text-orange-700 dark:border-orange-500/20 dark:bg-orange-950/20 dark:text-orange-300">
              IT-Kapazität ist der Engpass
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
              Warum Managed Operations sinnvoll sind
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700 dark:text-text-secondary">
              Interne IT-Teams verlieren oft Kapazität an operative Aufgaben: ungeplante Störungen, Routine-Wartung,
              Troubleshooting. Was bleibt für strategische Projekte und Innovation? Häufig zu wenig.
            </p>
          </div>

          {/* Block 3: Problem vs Solution - Visual Split */}
          <div className="relative mx-auto max-w-6xl">
            {/* Arrow Connector - Desktop only */}
            <div className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block">
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl dark:bg-bg-darker"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: 0.3 }}
                animate={{ scale: [1, 1.08, 1] }}
              >
                <ArrowRight className="h-6 w-6 text-vae-turquoise" />
              </motion.div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: Problem (Orange) */}
              <motion.div
                className="relative overflow-hidden rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white p-8 shadow-[0_4px_24px_rgba(251,146,60,0.15),0_0_20px_rgba(251,146,60,0.25)] dark:border-orange-500/30 dark:from-orange-950/10 dark:to-bg-darker dark:shadow-[0_4px_24px_rgba(251,146,60,0.08),0_0_20px_rgba(251,146,60,0.15)]"
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <div className="relative mb-6">
                  <motion.div
                    className="mb-2 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 dark:bg-orange-900/30"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                      Ohne VAE
                    </span>
                  </motion.div>
                  <div className="mb-3 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-orange-700 dark:text-orange-300">
                      Das Problem
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    Operational Overhead blockiert Innovation
                  </h4>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: AlertCircle, label: 'Ungeplante Incidents', desc: 'statt planbarer Wartung' },
                    { icon: RefreshCcw, label: 'Manuelle Updates', desc: 'Patches & kleine Fixes' },
                    { icon: Activity, label: 'Reaktives Troubleshooting', desc: 'keine klare Ursachenarbeit' },
                    { icon: Clock, label: 'Keine Zeit für Strategie', desc: 'Innovation bleibt liegen' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group flex items-start gap-3 rounded-xl border border-orange-200 bg-white/50 p-3 transition-all duration-300 hover:scale-[1.02] hover:border-orange-400 hover:bg-orange-50/50 hover:shadow-lg dark:border-orange-500/20 dark:bg-white/5 dark:hover:border-orange-400/50 dark:hover:bg-orange-950/20"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 transition-transform duration-300 group-hover:scale-110 dark:bg-orange-900/30">
                        <item.icon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 transition-colors group-hover:text-orange-700 dark:text-white dark:group-hover:text-orange-300">
                          {item.label}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-text-secondary/80">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Solution (Türkis) */}
              <motion.div
                className="relative overflow-hidden rounded-2xl border-2 border-vae-turquoise/30 bg-gradient-to-br from-vae-turquoise/5 to-white p-8 shadow-[0_4px_24px_rgba(29,184,122,0.15),0_0_20px_rgba(29,184,122,0.25)] dark:border-vae-turquoise/30 dark:from-vae-turquoise/10 dark:to-bg-darker dark:shadow-[0_4px_24px_rgba(8,255,193,0.08),0_0_20px_rgba(8,255,193,0.15)]"
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <div className="relative mb-6">
                  <motion.div
                    className="mb-2 inline-flex items-center gap-2 rounded-full bg-vae-turquoise/10 px-3 py-1 dark:bg-vae-turquoise/20"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-vae-turquoise">
                      Mit VAE Managed Ops
                    </span>
                  </motion.div>
                  <div className="mb-3 flex items-center gap-2">
                    <Check className="h-5 w-5 text-vae-turquoise" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-vae-turquoise">
                      Die Lösung
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Managed Operations schaffen Luft</h4>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: Shield, label: 'Wir übernehmen Operations', desc: 'Monitoring, Updates, Wartung' },
                    { icon: Target, label: 'Ihr Team fokussiert', desc: 'Produkt, Strategie & Wachstum' },
                    { icon: Zap, label: 'Planbare Abläufe', desc: 'statt Ad-hoc-Eskalationen' },
                    { icon: Users, label: 'Expertise on-demand', desc: 'ohne Vollzeit-Hiring' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group flex items-start gap-3 rounded-xl border border-vae-turquoise/20 bg-white/50 p-3 transition-all duration-300 hover:scale-[1.02] hover:border-vae-turquoise/60 hover:bg-vae-turquoise/5 hover:shadow-lg dark:border-vae-turquoise/20 dark:bg-white/5 dark:hover:border-vae-turquoise/50 dark:hover:bg-vae-turquoise/10"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-vae-turquoise/10 transition-transform duration-300 group-hover:scale-110 dark:bg-vae-turquoise/20">
                        <item.icon className="h-5 w-5 text-vae-turquoise" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 transition-colors group-hover:text-vae-turquoise dark:text-white dark:group-hover:text-vae-turquoise">
                          {item.label}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-text-secondary/80">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Conclusion */}
          <motion.div
            className="mx-auto max-w-3xl overflow-hidden rounded-2xl border-2 border-vae-turquoise/40 bg-gradient-to-r from-vae-turquoise/10 via-vae-turquoise/5 to-transparent p-8 shadow-lg dark:border-vae-turquoise/30 dark:from-vae-turquoise/10 dark:via-vae-turquoise/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-vae-turquoise bg-white shadow-sm dark:bg-bg-darker">
                <Lightbulb className="h-8 w-8 text-vae-turquoise" />
              </div>
              <div className="text-center md:text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-vae-turquoise">Das Ergebnis</p>
                <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                  Mehr Kapazität für das, was euer Business wirklich voranbringt.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visual Section: Team in Action */}
      <section className="section-card-container border-b border-gray-200 bg-white py-20 dark:border-white/5 dark:bg-bg-darker">
        <div className="section-card-backdrop" />
        <div className="container-vae relative">
          <header className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise dark:text-vae-turquoise/70">
              Unser Ansatz
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
              Direkte Kommunikation, klare Prozesse
            </h2>
            <p className="mt-4 text-base text-gray-700 dark:text-text-secondary">
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
                <Lightbulb className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h4 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">Strategische Optimierung</h4>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                Monatliche Reviews mit Verbesserungsvorschlägen. Roadmap-Planung und Architektur-Checks für
                langfristiges Wachstum.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-vae-turquoise/15">
                <Activity className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h4 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">Proaktives Monitoring</h4>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                Echtzeit-Überwachung für Uptime, Performance, Error-Logs und Ressourcen.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-vae-turquoise/15">
                <RefreshCcw className="h-6 w-6 text-vae-turquoise" />
              </div>
              <h4 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">Kontinuierliche Updates</h4>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                Security-Patches, Software-Updates und Wartung in geplanten Fenstern. Immer auf dem neuesten Stand, ohne
                Ausfälle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Service Levels */}
      <section
        id="service-levels"
        className="section-card-container border-b border-gray-200 bg-[#f2fff8] py-24 dark:border-white/5 dark:bg-bg-darker"
      >
        <div className="section-card-backdrop" />
        <div className="container-vae relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise dark:text-vae-turquoise/70">
              Service-Level
            </p>
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
                  className={`relative flex h-full flex-col rounded-3xl bg-white p-8 shadow-md transition hover:-translate-y-1 dark:bg-white/5 ${
                    level.highlighted
                      ? 'border-2 border-vae-turquoise/70 shadow-lg shadow-vae-turquoise/10 dark:shadow-vae-turquoise/20'
                      : 'border border-gray-200 dark:border-white/10'
                  }`}
                >
                  {level.badge && (
                    <span className="absolute right-6 top-6 rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-vae-turquoise">
                      {level.badge}
                    </span>
                  )}
                  <level.icon className="mb-5 h-12 w-12 text-vae-turquoise" />
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{level.title}</h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.3em] text-vae-turquoise dark:text-vae-turquoise/70">
                    {level.subtitle}
                  </p>
                  <p className="mt-4 text-base text-gray-700 dark:text-text-secondary">{level.description}</p>

                  <div className="mt-8 space-y-4 text-sm text-gray-700 dark:text-text-secondary">
                    <div>
                      <p className="font-semibold uppercase tracking-[0.2em] text-vae-turquoise dark:text-vae-turquoise/70">
                        Was enthalten ist
                      </p>
                      <ul className="mt-3 space-y-2">
                        {level.included.map(item => {
                          const isAccountItem = item.toLowerCase().includes('kundenaccount')
                          if (isAccountItem) {
                            const variant = level.id === 'full' ? 'gold' : 'silver'
                            return (
                              <li key={item} className="flex items-center gap-2 text-sm">
                                {/* left check icon - same size as other list checks, colored by variant */}
                                <svg
                                  className={`${variant === 'gold' ? 'text-amber-400' : 'text-black dark:text-white'} ${variant === 'gold' ? 'h-5 w-5' : 'h-4 w-4'}`}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M20 6L9 17l-5-5"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <FeaturePill variant={variant}>{item}</FeaturePill>
                              </li>
                            )
                          }

                          return (
                            <li key={item} className="flex items-start gap-2 text-sm">
                              <Check className="mt-1 h-4 w-4 text-vae-turquoise" />
                              <span>{item}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    {level.excluded && (
                      <div>
                        <p className="font-semibold uppercase tracking-[0.2em] text-vae-turquoise dark:text-vae-turquoise/70">
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
                      <p className="font-semibold uppercase tracking-[0.2em] text-vae-turquoise dark:text-vae-turquoise/70">
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
                        <span className="relative flex items-center justify-center gap-2">
                          {level.ctaLabel}
                          {level.highlighted && <span className="opacity-70">→</span>}
                        </span>
                        {level.highlighted && (
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        )}
                      </a>
                    </MagneticButton>
                    <p className="text-center text-xs text-gray-600 dark:text-text-secondary">
                      {level.ctaSubline ||
                        (level.highlighted
                          ? '45 Min. · Keine Langzeitbindung'
                          : 'Individuelles Angebot nach Infrastruktur-Umfang')}
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise dark:text-vae-turquoise/70">
              Hosting & Betrieb
            </p>
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise dark:text-vae-turquoise/70">
              Was ist enthalten?
            </p>
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise dark:text-vae-turquoise/70">
              Unser Prozess
            </p>
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
      <section className="border-b border-gray-200 bg-[#f2fff8] py-20 dark:border-white/5 dark:bg-transparent">
        <div className="container-vae">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise dark:text-vae-turquoise/70">
              Warum VAE?
            </p>
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
      <section className="bg-gradient-to-b from-[#e8fff7] via-[#f5fffc] to-[#f0fff9] py-20 text-gray-900 dark:from-bg-darker dark:via-[#050505] dark:to-bg-darker dark:text-white">
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
      <section className="border-t border-gray-200 bg-[#f2fff8] py-16 dark:border-white/5 dark:bg-transparent md:py-20">
        <div className="container-vae flex flex-col items-center gap-4 text-center md:gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise dark:text-vae-turquoise/70">
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
