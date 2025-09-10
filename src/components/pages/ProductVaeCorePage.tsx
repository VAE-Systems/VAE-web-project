import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CtaLink from '@/components/ui/CtaLink'
import ReferenceList from '../ui/ReferenceList'
import Seo from '../ui/Seo'
import Breadcrumbs from '../navigation/Breadcrumbs'
import MagneticButton from '../ui/MagneticButton'
import { vaeCoreContent } from '../../content/vaeCore'
import { Settings, TrendingUp, Shield, Link as LinkIcon, Layers, Lock, RefreshCw, ShieldCheck, X, Check, Zap } from 'lucide-react'

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
        stats: []
      },
      problem: { headline: 'Herausforderungen lösen', solution_preview: 'Mit bewährten Technologien.', pain_points: [] },
      value_props: { headline: 'Unsere Vorteile', pillars: [] },
      pricing: { headline: 'Preise', subtitle: 'Fair und transparent.', tiers: [], guarantee: '' },
      tech_deep_dive: { headline: 'Technologie-Stack', intro: '', architecture_benefits: [], tech_stack: [] },
      comparison_brief: { headline: 'Vergleich', subtitle: '', comparisons: [] },
      roadmap: { headline: 'Roadmap', subtitle: '', phases: [], early_access: '' },
      final_cta: { headline: 'Jetzt starten', subtitle: '', primary_ctas: [], secondary_info: '' }
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
          { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'VAE CORE', applicationCategory: 'AI Platform', operatingSystem:'Cloud / On-Prem', publisher:{ '@type':'Organization', name:'VAE Systems' } },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type':'ListItem', position:1, name:'Produkte', item:'https://www.vae-systems.com/products' }, { '@type':'ListItem', position:2, name:'VAE CORE', item:'https://www.vae-systems.com/products/vae-core' } ] }
        ]}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Produkte & Plattform', path: '/products' },
          { label: 'VAE CORE', path: '/products/vae-core' }
        ]}
        className="pt-6"
      />

      {/* HERO - Sales Focused */}
      <header id="hero" className="relative pt-32 pb-20 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker overflow-hidden" role="banner" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-gradient-to-r from-vae-turquoise/5 to-transparent pointer-events-none" aria-hidden="true"></div>
        {/* Decorative floaters removed for no-motion requirement */}
        <div ref={heroRef} className="container-vae max-w-7xl relative z-10">
          {/* Segment Selector — desktop centered above hero */}
          <div className="hidden md:flex justify-center mb-8">
            <div role="tablist" aria-label="Zielgruppe wählen" className="flex gap-2 p-2 bg-bg-secondary/60 rounded-2xl border border-border-primary/30 shadow-lg backdrop-blur-sm">
              {tabs.map((tab: any) => (
                <MagneticButton key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={`px-4 py-2 rounded-xl text-sm font-medium shadow-md ${
                      activeTab === tab.id
                        ? 'bg-vae-turquoise text-bg-dark shadow-xl'
                        : 'text-text-secondary hover:text-text-light hover:bg-bg-secondary/30 hover:shadow-lg'
                    }`}
                  >
                    {tab.label}
                  </button>
                </MagneticButton>
              ))}
            </div>
          </div>
          {/* Main Headline */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-6">
              <span className="inline-flex items-center px-6 py-3 rounded-full bg-vae-turquoise/10 text-vae-turquoise text-sm font-medium border border-vae-turquoise/20 shadow-lg">
                {safeView.hero.badge}
              </span>
            </div>
            
            <h1 id="hero-heading" className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-text-light">{safeView.hero.titlePre}</span>
              <span className="block text-vae-turquoise drop-shadow-lg">{safeView.hero.titleMain}</span>
            </h1>

            <p className="text-xl md:text-2xl text-vae-turquoise font-medium mb-4 drop-shadow-sm">{safeView.hero.hook}</p>
            <p className="text-lg text-text-secondary leading-relaxed max-w-4xl mx-auto mb-8">{safeView.hero.subline}</p>
            <p className="text-base text-text-muted max-w-3xl mx-auto mb-12 leading-relaxed">{safeView.hero.lead}</p>

            {/* Segment Selector — mobile centered (same small size) */}
            <div className="md:hidden flex justify-center mb-10">
              <div role="tablist" aria-label="Zielgruppe wählen" className="flex gap-2 p-2 bg-bg-secondary/50 rounded-2xl border border-border-primary/30 shadow-lg">
                {tabs.map((tab: any) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={`px-4 py-2 rounded-xl text-sm font-medium shadow-md ${
                      activeTab === tab.id
                        ? 'bg-vae-turquoise text-bg-dark shadow-xl'
                        : 'text-text-secondary hover:text-text-light hover:bg-bg-secondary/30 hover:shadow-lg'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
              {safeView.hero.stats.map((stat: any, i: number) => (
                <div key={i} className="card-vae text-center p-6" role="region" aria-labelledby={`stat-${i}`}>
                  <div id={`stat-${i}`} className="text-3xl md:text-4xl font-bold text-vae-turquoise mb-2" aria-label={`${stat.value} ${stat.label}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
      <div className={`hidden md:block fixed left-0 right-0 top-24 z-[45] ${showSticky ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="container-vae max-w-7xl">
          <div className="flex justify-center">
            <div role="tablist" aria-label="Zielgruppe wählen (sticky)" className="flex gap-1 p-1 bg-bg-secondary/70 rounded-2xl border border-border-primary/30 shadow-lg backdrop-blur-sm">
              {tabs.map((tab: any) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium ${
                    activeTab === tab.id
                      ? 'bg-vae-turquoise text-bg-dark shadow'
                      : 'text-text-secondary hover:text-text-light hover:bg-bg-secondary/30'
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
      <section id="problem" className="py-24 border-b border-border-primary/5 bg-gradient-to-b from-bg-primary/20 to-bg-primary/5 dark:from-bg-dark/20 dark:to-bg-darker/5">
        <div className="container-vae max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-light mb-6 drop-shadow-sm">{safeView.problem.headline}</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">{safeView.problem.solution_preview}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safeView.problem.pain_points.map((pain: any, i: number) => {
              const IconComponent = pain.icon === 'Settings' ? Settings :
                                   pain.icon === 'TrendingUp' ? TrendingUp :
                                   pain.icon === 'Shield' ? Shield :
                                   pain.icon === 'Link' ? LinkIcon : Settings;
              return (
                <div key={i} className="card-vae text-center">
                  <IconComponent className="w-12 h-12 text-red-400 mx-auto mb-6" />
                  <h3 className="text-lg font-semibold text-text-light mb-3">{pain.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{pain.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITIONS */}
      <section id="value-props" className="py-24 bg-gradient-to-b from-bg-primary/40 to-bg-primary/10 dark:from-bg-dark/40 dark:to-bg-darker/10">
        <div className="container-vae max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-light mb-6 drop-shadow-sm">{safeView.value_props.headline}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {safeView.value_props.pillars.map((pillar: any, i: number) => {
              const IconComponent = pillar.icon === 'Layers' ? Layers :
                                   pillar.icon === 'Lock' ? Lock :
                                   pillar.icon === 'RefreshCw' ? RefreshCw :
                                   pillar.icon === 'ShieldCheck' ? ShieldCheck : Layers;
              return (
                <div key={i} className="card-vae">
                  <IconComponent className="w-12 h-12 text-vae-turquoise mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-text-light mb-4">{pillar.title}</h3>
                  <p className="text-base text-text-secondary mb-4 leading-relaxed">{pillar.body}</p>
                  <p className="text-sm text-text-muted italic">{pillar.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TARGET SEGMENTS - TAB NAVIGATION */}
      <section id="segments" className="py-24 bg-gradient-to-b from-bg-primary/20 to-bg-primary/5 dark:from-bg-dark/20 dark:to-bg-darker/5">
        <div className="container-vae max-w-7xl">
          {/* Intentionally no second nav here (avoids duplication). */}
          
          {/* Tab Content */}
          {tabs.map((tab: any) => (
            activeTab === tab.id && (
              <div key={tab.id} className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-text-light mb-4 drop-shadow-sm">{tab.title}</h3>
                  <p className="text-lg text-vae-turquoise font-medium mb-6">{tab.subtitle}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="card-vae p-6">
                      <h4 className="font-semibold text-text-light mb-3 flex items-center gap-2">
                        <X className="w-5 h-5 text-red-400" />
                        Das Problem
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed">{tab.pain}</p>
                    </div>
                    
                    <div className="card-vae p-6">
                      <h4 className="font-semibold text-text-light mb-3 flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-400" />
                        Die Lösung
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed">{tab.solution}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-text-light mb-4">Konkrete Vorteile:</h4>
                      <ul className="space-y-3">
                        {tab.benefits.map((benefit: any, i: number) => (
                          <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
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
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-32 bg-gradient-to-b from-bg-primary/40 to-bg-primary/10 dark:from-bg-dark/40 dark:to-bg-darker/10">
        <div className="container-vae max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-light mb-4 drop-shadow-sm">{safeView.pricing.headline}</h2>
            <p className="text-lg text-text-secondary leading-relaxed">{safeView.pricing.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {safeView.pricing.tiers.map((tier: any, i: number) => (
              <div key={i} className="card-vae relative">
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-vae-turquoise to-vae-turquoise/80 text-bg-dark px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      EMPFOHLEN
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-text-light mb-3">{tier.name}</h3>
                  <div className="text-4xl font-bold text-vae-turquoise mb-2">
                    {tier.price}
                    <span className="text-lg text-text-muted">{tier.period}</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{tier.description}</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature: any, j: number) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-text-secondary">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
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

            <p className="text-sm text-text-muted bg-bg-secondary/20 rounded-2xl p-6 border border-vae-turquoise/30 dark:border-vae-turquoise/50 shadow-md">{safeView.pricing.guarantee}</p>
          </div>
        </div>
      </section>

      {/* TECH DEEP DIVE */}
      <section id="tech" className="py-24 bg-gradient-to-b from-bg-primary/20 to-bg-primary/5 dark:from-bg-dark/20 dark:to-bg-darker/5">
        <div className="container-vae max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-light mb-6 drop-shadow-sm">{safeView.tech_deep_dive.headline}</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">{safeView.tech_deep_dive.intro}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="card-vae">
              <h3 className="text-xl font-bold text-text-light mb-6">Architektur-Vorteile</h3>
              <ul className="space-y-4">
                {safeView.tech_deep_dive.architecture_benefits.map((benefit: any, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-vae-turquoise mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-text-secondary leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="card-vae">
              <h3 className="text-xl font-bold text-text-light mb-6">Tech Stack</h3>
              <div className="space-y-4">
                {safeView.tech_deep_dive.tech_stack.map((category: any, i: number) => (
                  <div key={i} className="card-vae p-6">
                    <h4 className="font-semibold text-text-light mb-3">{category.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.techs.map((tech: any, j: number) => (
                        <span key={j} className="px-4 py-2 text-xs bg-vae-turquoise/20 text-vae-turquoise rounded-full font-medium shadow-sm">
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
      <section id="comparison" className="py-24 border-t border-border-primary/5 bg-gradient-to-b from-bg-primary/10 to-bg-primary/5 dark:from-bg-dark/10 dark:to-bg-darker/5">
        <div className="container-vae max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-light mb-4 drop-shadow-sm">{safeView.comparison_brief.headline}</h2>
            <p className="text-lg text-text-secondary leading-relaxed">{safeView.comparison_brief.subtitle}</p>
          </div>
          
          <div className="space-y-6">
            {safeView.comparison_brief.comparisons.map((comp: any, i: number) => (
              <div key={i} className="card-vae grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-text-light text-lg">{comp.alternative}</h4>
                </div>
                <div>
                  <span className="text-sm text-text-secondary leading-relaxed">{comp.vae_advantage}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-vae-turquoise" />
                  <span className="text-sm text-vae-turquoise font-medium">{comp.time_saved}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="py-24 bg-gradient-to-b from-bg-darker/40 to-bg-dark/20 dark:from-bg-darker/60 dark:to-bg-dark/30">
        <div className="container-vae max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-light mb-4 drop-shadow-sm">{safeView.roadmap.headline}</h2>
            <p className="text-lg text-text-secondary leading-relaxed">{safeView.roadmap.subtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {safeView.roadmap.phases.map((phase: any, i: number) => (
              <div key={i} className="card-vae">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-text-light text-lg">{phase.quarter}</h3>
                  <span className={`px-4 py-2 text-xs rounded-full font-medium ${
                    phase.status === 'Ziel'
                      ? 'bg-vae-turquoise/15 text-vae-turquoise border border-vae-turquoise/25'
                      : 'bg-bg-secondary/20 text-text-secondary border border-border-primary/30'
                  }`}>
                    {phase.status}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-vae-turquoise mb-4">{phase.title}</h4>
                <ul className="space-y-3">
                  {phase.items.map((item: any, j: number) => (
                    <li key={j} className="text-sm text-text-secondary flex items-start gap-2">
                      <span className="text-vae-turquoise mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-vae-turquoise/10 border border-vae-turquoise/30 dark:border-vae-turquoise/50 shadow-lg">
            <p className="text-sm text-text-secondary leading-relaxed">{safeView.roadmap.early_access}</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="final-cta" className="py-32 bg-gradient-to-tr from-bg-darker via-bg-dark to-bg-darker/90 dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker/95">
        <div className="container-vae max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text-light mb-6 drop-shadow-sm">{safeView.final_cta.headline}</h2>
            <p className="text-lg text-text-secondary mb-12 leading-relaxed">{safeView.final_cta.subtitle}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              {safeView.final_cta.primary_ctas.map((cta: any, i: number) => (
                <MagneticButton key={i}>
                  <Link 
                    to={cta.href} 
                    className={`btn btn-lg shadow-xl ${
                      cta.style === 'primary' ? 'btn-primary' : 
                      cta.style === 'secondary' ? 'btn-secondary' : 'btn-ghost'
                    }`}
                  >
                    {cta.text}
                  </Link>
                </MagneticButton>
              ))}
            </div>
            
            <p className="text-sm text-text-muted bg-bg-secondary/20 rounded-2xl p-4 border border-vae-turquoise/30 dark:border-vae-turquoise/50 shadow-md">{safeView.final_cta.secondary_info}</p>
          </div>
        </div>
      </section>

      {/* Reference Sources */}
      <aside className="py-16 border-t border-border-primary/5">
        <div className="container-vae max-w-5xl">
          <div className="bg-bg-secondary/5 dark:bg-bg-darker/20 border border-vae-turquoise/30 dark:border-vae-turquoise/50 rounded-2xl p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-vae-turquoise mb-4">Quellen & Kontext</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">Marktanalysen bestätigen: Ohne integrierte Governance & Observability scheitern KI-Projekte bei der Skalierung. Produktionsreife Plattformen reduzieren diese Reibung erheblich. (Stanford AI Index 2024, Gartner Trends)</p>
            <ReferenceList
              items={[
                { id: 'c1', label: 'CNCF – Platform Engineering Reports 2024', url: 'https://www.cncf.io' },
                { id: 'c2', label: 'Gartner – AI Infrastructure Trends 2025', url: 'https://www.gartner.com' },
                { id: 'c3', label: 'EU Data Act – Sovereignty Requirements', url: 'https://eur-lex.europa.eu' },
                { id: 'c4', label: 'EU AI Act – Governance Standards', url: 'https://eur-lex.europa.eu' },
                { id: 'c5', label: 'Stanford AI Index 2024 – Platform Efficiency', url: 'https://aiindex.stanford.edu' },
                { id: 'c6', label: 'MIT Technology Review – AI Scaling Challenges', url: 'https://www.technologyreview.com' }
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
