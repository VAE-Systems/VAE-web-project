import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CtaLink from '@/components/ui/CtaLink'
import ReferenceList from '../ui/ReferenceList'
import Seo from '../ui/Seo'
import Breadcrumbs from '../navigation/Breadcrumbs'
import MagneticButton from '../ui/buttons/MagneticButton'
import { vaeCoreContent } from '../../content/vaeCore'
import {
  Settings,
  TrendingUp,
  Shield,
  Link as LinkIcon,
  Layers,
  Lock,
  RefreshCw,
  ShieldCheck,
  X,
  Check,
  Zap,
} from 'lucide-react'

/**
 * ProductVaeCorePage Component
 *
 * Sales-focused VAE Core product page with segment targeting and pricing
 */
const ProductVaeCorePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('interested')

  // Memoize expensive computations
  const tabs = useMemo(() => (vaeCoreContent as any)?.target_segments?.tabs ?? [], [])

  // Fallbacks für robuste Darstellung
  const viewFallback = useMemo(
    () => ({
      meta: { title: 'VAE Core', description: 'VAE Core Produktseite' },
      hero: {
        badge: 'VAE Core',
        titlePre: 'VAE',
        titleMain: 'Core',
        hook: 'KI-Infrastruktur',
        subline: 'Transparent, skalierbar und sicher.',
        lead: 'VAE Core bietet eine umfassende Lösung für KI-Integration.',
        stats: [],
      },
      problem: {
        headline: 'Herausforderungen lösen',
        solution_preview: 'Mit bewährten Technologien.',
        pain_points: [],
      },
      value_props: { headline: 'Unsere Vorteile', pillars: [] },
      pricing: { headline: 'Preise', subtitle: 'Fair und transparent.', tiers: [], guarantee: '' },
      tech_deep_dive: { headline: 'Technologie-Stack', intro: '', architecture_benefits: [], tech_stack: [] },
      comparison_brief: { headline: 'Vergleich', subtitle: '', comparisons: [] },
      roadmap: { headline: 'Roadmap', subtitle: '', phases: [], early_access: '' },
      final_cta: { headline: 'Jetzt starten', subtitle: '', primary_ctas: [], secondary_info: '' },
    }),
    []
  )

  const view = useMemo(() => (vaeCoreContent as any)?.views?.[activeTab] as any, [activeTab])
  const safeView = useMemo(() => view || viewFallback, [view])
  const heroRef = useRef<HTMLDivElement>(null)
  const [showSticky, setShowSticky] = useState(false)
  const primaryCtaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky when hero is not visible enough
        setShowSticky(!entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: '-96px 0px 0px 0px', // account for header height
        threshold: 0,
      }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Scroll to pricing section
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-[100dvh]">
      <Seo
        title={safeView.meta.title}
        description={safeView.meta.description}
        canonicalPath="/products/vae-core"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'VAE CORE',
            applicationCategory: 'AI Platform',
            operatingSystem: 'Cloud / On-Prem',
            publisher: { '@type': 'Organization', name: 'VAE Systems' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Produkte', item: 'https://www.vae-systems.com/products' },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'VAE CORE',
                item: 'https://www.vae-systems.com/products/vae-core',
              },
            ],
          },
        ]}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Produkte & Plattform', path: '/products' },
          { label: 'VAE CORE', path: '/products/vae-core' },
        ]}
        className="pt-6"
      />

      {/* HERO - Sales Focused */}
      <header
        id="hero"
        className="from-bg-primary to-bg-primary relative overflow-hidden bg-gradient-to-br via-bg-secondary pb-20 pt-32 dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker"
        role="banner"
        aria-labelledby="hero-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-vae-turquoise/5 to-transparent"
          aria-hidden="true"
        ></div>
        {/* Decorative floaters removed for no-motion requirement */}
        <div ref={heroRef} className="container-vae relative z-10 max-w-7xl">
          {/* Segment Selector — desktop centered above hero */}
          <div className="mb-8 hidden justify-center md:flex">
            <div
              role="tablist"
              aria-label="Zielgruppe wählen"
              className="border-border-primary/30 flex gap-2 rounded-2xl border bg-bg-secondary/60 p-2 shadow-lg backdrop-blur-sm"
            >
              {tabs.map((tab: any) => (
                <MagneticButton key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={`rounded-xl px-4 py-2 text-sm font-medium shadow-md ${
                      activeTab === tab.id
                        ? 'bg-vae-turquoise text-bg-dark shadow-xl'
                        : 'text-text-secondary hover:bg-bg-secondary/30 hover:text-text-light hover:shadow-lg'
                    }`}
                  >
                    {tab.label}
                  </button>
                </MagneticButton>
              ))}
            </div>
          </div>
          {/* Main Headline */}
          <div className="mb-12 text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="inline-flex items-center rounded-full border border-vae-turquoise/20 bg-vae-turquoise/10 px-6 py-3 text-sm font-medium text-vae-turquoise shadow-lg">
                {safeView.hero.badge}
              </span>
            </div>

            <h1 id="hero-heading" className="mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
              <span className="block text-text-light">{safeView.hero.titlePre}</span>
              <span className="block text-vae-turquoise drop-shadow-lg">{safeView.hero.titleMain}</span>
            </h1>

            <p className="mb-4 text-xl font-medium text-vae-turquoise drop-shadow-sm md:text-2xl">
              {safeView.hero.hook}
            </p>
            <p className="mx-auto mb-8 max-w-4xl text-lg leading-relaxed text-text-secondary">
              {safeView.hero.subline}
            </p>
            <p className="mx-auto mb-12 max-w-3xl text-base leading-relaxed text-text-muted">{safeView.hero.lead}</p>

            {/* Segment Selector — mobile centered (same small size) */}
            <div className="mb-10 flex justify-center md:hidden">
              <div
                role="tablist"
                aria-label="Zielgruppe wählen"
                className="border-border-primary/30 flex gap-2 rounded-2xl border bg-bg-secondary/50 p-2 shadow-lg"
              >
                {tabs.map((tab: any) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={`rounded-xl px-4 py-2 text-sm font-medium shadow-md ${
                      activeTab === tab.id
                        ? 'bg-vae-turquoise text-bg-dark shadow-xl'
                        : 'text-text-secondary hover:bg-bg-secondary/30 hover:text-text-light hover:shadow-lg'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mx-auto mb-12 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3">
              {safeView.hero.stats.map((stat: any, i: number) => (
                <div key={i} className="card-vae p-6 text-center" role="region" aria-labelledby={`stat-${i}`}>
                  <div
                    id={`stat-${i}`}
                    className="mb-2 text-3xl font-bold text-vae-turquoise md:text-4xl"
                    aria-label={`${stat.value} ${stat.label}`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton>
                <CtaLink
                  ctaId="product.vae-core.demo"
                  ctx={{ product: 'VAE CORE', fromPage: 'product-core', intent: 'demo' }}
                  variant="primary"
                  ref={primaryCtaRef as unknown as React.Ref<HTMLAnchorElement>}
                  className="btn-lg shadow-xl focus:outline-none focus:ring-4 focus:ring-vae-turquoise/50"
                  id="cta-hero-primary"
                  aria-label="Kostenloses Beratungsgespräch – 15–20 Minuten"
                  data-green-signal="true"
                />
              </MagneticButton>
              <MagneticButton>
                <button
                  onClick={scrollToPricing}
                  className="btn-secondary btn-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-vae-turquoise/30"
                  aria-label="Zu den Preisen springen"
                >
                  Preise ansehen
                </button>
              </MagneticButton>
              <MagneticButton>
                <Link
                  to="https://github.com/vae-systems/vae-core"
                  className="btn-ghost btn-lg shadow-md focus:outline-none focus:ring-4 focus:ring-vae-turquoise/20"
                  aria-label="VAE Core Repository auf GitHub öffnen (externer Link)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repository
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Mini Selector (fixed) */}
      <div
        className={`fixed left-0 right-0 top-24 z-[45] hidden md:block ${showSticky ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <div className="container-vae max-w-7xl">
          <div className="flex justify-center">
            <div
              role="tablist"
              aria-label="Zielgruppe wählen (sticky)"
              className="border-border-primary/30 flex gap-1 rounded-2xl border bg-bg-secondary/70 p-1 shadow-lg backdrop-blur-sm"
            >
              {tabs.map((tab: any) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium ${
                    activeTab === tab.id
                      ? 'bg-vae-turquoise text-bg-dark shadow'
                      : 'text-text-secondary hover:bg-bg-secondary/30 hover:text-text-light'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PROBLEM SECTION */}
      <section
        id="problem"
        className="border-border-primary/5 from-bg-primary/20 to-bg-primary/5 border-b bg-gradient-to-b py-24 dark:from-bg-dark/20 dark:to-bg-darker/5"
      >
        <div className="container-vae max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold text-text-light drop-shadow-sm md:text-4xl">
              {safeView.problem.headline}
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-text-secondary">
              {safeView.problem.solution_preview}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {safeView.problem.pain_points.map((pain: any, i: number) => {
              const IconComponent =
                pain.icon === 'Settings'
                  ? Settings
                  : pain.icon === 'TrendingUp'
                    ? TrendingUp
                    : pain.icon === 'Shield'
                      ? Shield
                      : pain.icon === 'Link'
                        ? LinkIcon
                        : Settings
              return (
                <div key={i} className="card-vae text-center">
                  <IconComponent className="mx-auto mb-6 h-12 w-12 text-red-400" />
                  <h3 className="mb-3 text-lg font-semibold text-text-light">{pain.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{pain.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITIONS */}
      <section
        id="value-props"
        className="from-bg-primary/40 to-bg-primary/10 bg-gradient-to-b py-24 dark:from-bg-dark/40 dark:to-bg-darker/10"
      >
        <div className="container-vae max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold text-text-light drop-shadow-sm md:text-4xl">
              {safeView.value_props.headline}
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {safeView.value_props.pillars.map((pillar: any, i: number) => {
              const IconComponent =
                pillar.icon === 'Layers'
                  ? Layers
                  : pillar.icon === 'Lock'
                    ? Lock
                    : pillar.icon === 'RefreshCw'
                      ? RefreshCw
                      : pillar.icon === 'ShieldCheck'
                        ? ShieldCheck
                        : Layers
              return (
                <div key={i} className="card-vae">
                  <IconComponent className="mx-auto mb-6 h-12 w-12 text-vae-turquoise" />
                  <h3 className="mb-4 text-xl font-bold text-text-light">{pillar.title}</h3>
                  <p className="mb-4 text-base leading-relaxed text-text-secondary">{pillar.body}</p>
                  <p className="text-sm italic text-text-muted">{pillar.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* TARGET SEGMENTS - TAB NAVIGATION */}
      <section
        id="segments"
        className="from-bg-primary/20 to-bg-primary/5 bg-gradient-to-b py-24 dark:from-bg-dark/20 dark:to-bg-darker/5"
      >
        <div className="container-vae max-w-7xl">
          {/* Intentionally no second nav here (avoids duplication). */}

          {/* Tab Content */}
          {tabs.map(
            (tab: any) =>
              activeTab === tab.id && (
                <div key={tab.id} className="mx-auto max-w-5xl">
                  <div className="mb-12 text-center">
                    <h3 className="mb-4 text-2xl font-bold text-text-light drop-shadow-sm md:text-3xl">{tab.title}</h3>
                    <p className="mb-6 text-lg font-medium text-vae-turquoise">{tab.subtitle}</p>
                  </div>

                  <div className="grid items-center gap-12 md:grid-cols-2">
                    <div className="space-y-6">
                      <div className="card-vae p-6">
                        <h4 className="mb-3 flex items-center gap-2 font-semibold text-text-light">
                          <X className="h-5 w-5 text-red-400" />
                          Das Problem
                        </h4>
                        <p className="text-sm leading-relaxed text-text-secondary">{tab.pain}</p>
                      </div>

                      <div className="card-vae p-6">
                        <h4 className="mb-3 flex items-center gap-2 font-semibold text-text-light">
                          <Check className="h-5 w-5 text-green-400" />
                          Die Lösung
                        </h4>
                        <p className="text-sm leading-relaxed text-text-secondary">{tab.solution}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="mb-4 font-semibold text-text-light">Konkrete Vorteile:</h4>
                        <ul className="space-y-3">
                          {tab.benefits.map((benefit: any, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <CtaLink
                        ctaId="product.vae-core.contact_email"
                        ctx={{ product: 'VAE CORE', fromPage: `product-core:${tab.id}`, intent: 'contact' }}
                        variant="primary"
                        className="btn-lg w-full shadow-lg"
                      >
                        {tab.cta}
                      </CtaLink>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="from-bg-primary/40 to-bg-primary/10 bg-gradient-to-b py-32 dark:from-bg-dark/40 dark:to-bg-darker/10"
      >
        <div className="container-vae max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-text-light drop-shadow-sm md:text-4xl">
              {safeView.pricing.headline}
            </h2>
            <p className="text-lg leading-relaxed text-text-secondary">{safeView.pricing.subtitle}</p>
          </div>

          <div className="mb-12 grid gap-8 md:grid-cols-3">
            {safeView.pricing.tiers.map((tier: any, i: number) => (
              <div key={i} className="card-vae relative">
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                    <span className="rounded-full bg-gradient-to-r from-vae-turquoise to-vae-turquoise/80 px-6 py-2 text-sm font-bold text-bg-dark shadow-lg">
                      EMPFOHLEN
                    </span>
                  </div>
                )}

                <div className="mb-8 text-center">
                  <h3 className="mb-3 text-xl font-bold text-text-light">{tier.name}</h3>
                  <div className="mb-2 text-4xl font-bold text-vae-turquoise">
                    {tier.price}
                    <span className="text-lg text-text-muted">{tier.period}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-text-secondary">{tier.description}</p>
                </div>

                <ul className="mb-8 space-y-4">
                  {tier.features.map((feature: any, j: number) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-text-secondary">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton>
                  <Link
                    to={tier.name === 'Open Source' ? 'https://github.com/vae-systems/vae-core' : '/contact'}
                    className={`btn w-full shadow-md ${tier.popular ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {tier.cta}
                  </Link>
                </MagneticButton>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="rounded-2xl border border-vae-turquoise/30 bg-bg-secondary/20 p-6 text-sm text-text-muted shadow-md dark:border-vae-turquoise/50">
              {safeView.pricing.guarantee}
            </p>
          </div>
        </div>
      </section>

      {/* TECH DEEP DIVE */}
      <section
        id="tech"
        className="from-bg-primary/20 to-bg-primary/5 bg-gradient-to-b py-24 dark:from-bg-dark/20 dark:to-bg-darker/5"
      >
        <div className="container-vae max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold text-text-light drop-shadow-sm md:text-4xl">
              {safeView.tech_deep_dive.headline}
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-text-secondary">
              {safeView.tech_deep_dive.intro}
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="card-vae">
              <h3 className="mb-6 text-xl font-bold text-text-light">Architektur-Vorteile</h3>
              <ul className="space-y-4">
                {safeView.tech_deep_dive.architecture_benefits.map((benefit: any, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-vae-turquoise" />
                    <span className="text-sm leading-relaxed text-text-secondary">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-vae">
              <h3 className="mb-6 text-xl font-bold text-text-light">Tech Stack</h3>
              <div className="space-y-4">
                {safeView.tech_deep_dive.tech_stack.map((category: any, i: number) => (
                  <div key={i} className="card-vae p-6">
                    <h4 className="mb-3 font-semibold text-text-light">{category.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.techs.map((tech: any, j: number) => (
                        <span
                          key={j}
                          className="rounded-full bg-vae-turquoise/20 px-4 py-2 text-xs font-medium text-vae-turquoise shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section
        id="comparison"
        className="border-border-primary/5 from-bg-primary/10 to-bg-primary/5 border-t bg-gradient-to-b py-24 dark:from-bg-dark/10 dark:to-bg-darker/5"
      >
        <div className="container-vae max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-text-light drop-shadow-sm md:text-4xl">
              {safeView.comparison_brief.headline}
            </h2>
            <p className="text-lg leading-relaxed text-text-secondary">{safeView.comparison_brief.subtitle}</p>
          </div>

          <div className="space-y-6">
            {safeView.comparison_brief.comparisons.map((comp: any, i: number) => (
              <div key={i} className="card-vae grid gap-6 md:grid-cols-3">
                <div>
                  <h4 className="text-lg font-semibold text-text-light">{comp.alternative}</h4>
                </div>
                <div>
                  <span className="text-sm leading-relaxed text-text-secondary">{comp.vae_advantage}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-vae-turquoise" />
                  <span className="text-sm font-medium text-vae-turquoise">{comp.time_saved}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section
        id="roadmap"
        className="bg-gradient-to-b from-bg-darker/40 to-bg-dark/20 py-24 dark:from-bg-darker/60 dark:to-bg-dark/30"
      >
        <div className="container-vae max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-text-light drop-shadow-sm md:text-4xl">
              {safeView.roadmap.headline}
            </h2>
            <p className="text-lg leading-relaxed text-text-secondary">{safeView.roadmap.subtitle}</p>
          </div>

          <div className="mb-12 grid gap-8 md:grid-cols-3">
            {safeView.roadmap.phases.map((phase: any, i: number) => (
              <div key={i} className="card-vae">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-text-light">{phase.quarter}</h3>
                  <span
                    className={`rounded-full px-4 py-2 text-xs font-medium ${
                      phase.status === 'Ziel'
                        ? 'border border-vae-turquoise/25 bg-vae-turquoise/15 text-vae-turquoise'
                        : 'border-border-primary/30 border bg-bg-secondary/20 text-text-secondary'
                    }`}
                  >
                    {phase.status}
                  </span>
                </div>
                <h4 className="mb-4 text-lg font-semibold text-vae-turquoise">{phase.title}</h4>
                <ul className="space-y-3">
                  {phase.items.map((item: any, j: number) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="mt-0.5 text-vae-turquoise">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-vae-turquoise/30 bg-vae-turquoise/10 p-8 text-center shadow-lg dark:border-vae-turquoise/50">
            <p className="text-sm leading-relaxed text-text-secondary">{safeView.roadmap.early_access}</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        id="final-cta"
        className="bg-gradient-to-tr from-bg-darker via-bg-dark to-bg-darker/90 py-32 dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker/95"
      >
        <div className="container-vae max-w-5xl">
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-bold text-text-light drop-shadow-sm md:text-4xl">
              {safeView.final_cta.headline}
            </h2>
            <p className="mb-12 text-lg leading-relaxed text-text-secondary">{safeView.final_cta.subtitle}</p>

            <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
              {safeView.final_cta.primary_ctas.map((cta: any, i: number) => (
                <MagneticButton key={i}>
                  <Link
                    to={cta.href}
                    className={`btn btn-lg shadow-xl ${
                      cta.style === 'primary'
                        ? 'btn-primary'
                        : cta.style === 'secondary'
                          ? 'btn-secondary'
                          : 'btn-ghost'
                    }`}
                  >
                    {cta.text}
                  </Link>
                </MagneticButton>
              ))}
            </div>

            <p className="rounded-2xl border border-vae-turquoise/30 bg-bg-secondary/20 p-4 text-sm text-text-muted shadow-md dark:border-vae-turquoise/50">
              {safeView.final_cta.secondary_info}
            </p>
          </div>
        </div>
      </section>

      {/* Reference Sources */}
      <aside className="border-border-primary/5 border-t py-16">
        <div className="container-vae max-w-5xl">
          <div className="rounded-2xl border border-vae-turquoise/30 bg-bg-secondary/5 p-8 dark:border-vae-turquoise/50 dark:bg-bg-darker/20">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-vae-turquoise">Quellen & Kontext</h3>
            <p className="mb-3 text-sm leading-relaxed text-text-secondary">
              Marktanalysen bestätigen: Ohne integrierte Governance & Observability scheitern KI-Projekte bei der
              Skalierung. Produktionsreife Plattformen reduzieren diese Reibung erheblich. (Stanford AI Index 2024,
              Gartner Trends)
            </p>
            <ReferenceList
              items={[
                { id: 'c1', label: 'CNCF – Platform Engineering Reports 2024', url: 'https://www.cncf.io' },
                { id: 'c2', label: 'Gartner – AI Infrastructure Trends 2025', url: 'https://www.gartner.com' },
                { id: 'c3', label: 'EU Data Act – Sovereignty Requirements', url: 'https://eur-lex.europa.eu' },
                { id: 'c4', label: 'EU AI Act – Governance Standards', url: 'https://eur-lex.europa.eu' },
                {
                  id: 'c5',
                  label: 'Stanford AI Index 2024 – Platform Efficiency',
                  url: 'https://aiindex.stanford.edu',
                },
                {
                  id: 'c6',
                  label: 'MIT Technology Review – AI Scaling Challenges',
                  url: 'https://www.technologyreview.com',
                },
              ]}
              dense
            />
          </div>
        </div>
      </aside>
    </div>
  )
}

export default ProductVaeCorePage
