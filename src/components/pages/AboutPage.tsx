import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '@/contexts/ThemeContext'
import CaseStudiesSection from '../sections/CaseStudiesSection'
import TechStackSection from '../sections/TechStackSection'
// ProviderComparison vorerst entfernt bis Redesign
// import ProviderComparisonSection from '../sections/ProviderComparison'
import ProcessSection from '../sections/ProcessSection'
import StoryTeamSection from '../sections/StoryTeamSection'
import WhyOutcomesSection from '../sections/WhyOutcomesSection'
import Seo from '../ui/Seo'
import ProductsCardsGrid from '../sections/ProductsCardsGrid'
import Reveal from '@/components/ui/Reveal'
import Card from '../ui/Card'
import { servicesCategories } from '../../content/services'
import Breadcrumbs from '../navigation/Breadcrumbs'
import Icon from '@/components/ui/Icon'

/**
 * AboutPage Component
 *
 * Dedicated page for About Us with related sections
 */
const AboutPage: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isLight = theme === 'light'

  // Base animation & lazy registration
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (prefersReduced) return

      // Helper: fade + lift for elements inside a section
      const animateSection = (el: HTMLElement) => {
        const targets = Array.from(el.querySelectorAll('[data-animate]')) as HTMLElement[]
        if (!targets.length) return
        gsap.set(targets, { opacity: 0, y: 32, willChange: 'transform' })
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            once: true,
          },
        })
        tl.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: { each: 0.08, from: 'start' },
          force3D: true,
        })
      }

      // Hero distinct entry (use data-fade as in markup)
      const hero = document.querySelector('.about-hero') as HTMLElement | null
      if (hero) {
        const heroItems = hero.querySelectorAll('[data-fade]')
        if (heroItems.length) {
          gsap.from(heroItems, { opacity: 0, y: 46, duration: 1, ease: 'power3.out', stagger: 0.12, force3D: true })
        }
      }

      // Sections flagged with data-section
      gsap.utils.toArray<HTMLElement>('[data-section]').forEach(section => animateSection(section))

      // Tag groups / chips subtle pop
      gsap.utils.toArray<HTMLElement>('[data-chip-group]').forEach(group => {
        const chips = group.querySelectorAll<HTMLElement>('span, a, button')
        gsap.set(chips, { opacity: 0, y: 14 })
        ScrollTrigger.create({
          trigger: group,
          start: 'top 78%',
          once: true,
          onEnter: () =>
            gsap.to(chips, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out', force3D: true }),
        })
      })

      // Heading accent underline grow
      gsap.utils.toArray<HTMLElement>('[data-heading-accent]').forEach(h => {
        const bar = h.querySelector('.heading-accent-bar')
        if (!bar) return
        gsap.set(bar, { scaleX: 0, transformOrigin: '0 50%' })
        ScrollTrigger.create({
          trigger: h,
          start: 'top 80%',
          once: true,
          onEnter: () => gsap.to(bar, { scaleX: 1, duration: 0.65, ease: 'power3.out' }),
        })
      })

      // Parallax (gentle)
      gsap.utils.toArray<HTMLElement>('[data-parallax-bg]').forEach(bg => {
        const parent = bg.parentElement
        if (!parent) return
        gsap.to(bg, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: parent, start: 'top bottom', end: 'bottom top', scrub: 0.4 },
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  // Accent color interpolation between sections (smooth theming)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const accentMap: Record<string, string> = {
      angebote: '157 100% 47%',
      fruehphase: '157 100% 47%',
      prozess: '157 100% 48%',
      warum: '157 100% 48%',
      team: '157 100% 50%',
      cta: '157 100% 60%',
    }
    const sections = Array.from(root.querySelectorAll<HTMLElement>('section[id]')).filter(s => accentMap[s.id])
    if (!sections.length) return

    // Fallback initial accent
    root.style.setProperty('--about-accent', accentMap[sections[0].id])

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id
            if (accentMap[id]) {
              gsap.to(root, {
                duration: 1.2,
                ease: 'power2.out',
                onUpdate: () => {},
                onStart: () => {},
                // Use gsap quickSetter alternative: just set property inside onComplete chain
              })
              root.style.setProperty('--about-accent', accentMap[id])
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach(sec => observer.observe(sec))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={rootRef} className="relative min-h-[100dvh]" style={{ ['--about-accent' as any]: '157 100% 47%' }}>
      {/* Accent interpolation overlay */}
      <div aria-hidden="true" className="about-accent-overlay pointer-events-none fixed inset-0 z-0" />
      <Seo
        title="Über uns | VAE Systems"
        description="Gegründet 2025 in Heidelberg – interdisziplinäres KI & Automation Team. Open Source, Datenkontrolle, dokumentierte Systeme."
        canonicalPath="/about"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'VAE Systems',
            foundingDate: '2025',
            address: { '@type': 'PostalAddress', addressLocality: 'Heidelberg', addressCountry: 'DE' },
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'About', path: '/about' },
        ]}
      />
      {/* Page Hero (aligned style with ContactPage) */}
      <section
        className={`about-hero section-surface relative overflow-hidden pb-16 pt-32 ${isLight ? 'bg-gradient-to-b from-white to-white/95' : 'bg-bg-darker'}`}
        data-section
      >
        <div className="pointer-events-none absolute inset-0">
          {isLight ? (
            <>
              {/* Light mode: subtle white overlays + light grid */}
              <div className="via-white/12 absolute inset-0 bg-gradient-to-b from-white/20 to-white/10" />
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(var(--vae-turquoise-rgb),0.08),transparent_60%),radial-gradient(circle_at_75%_65%,rgba(var(--vae-turquoise-rgb),0.05),transparent_60%)]"
                data-parallax-bg
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px] opacity-15" />
            </>
          ) : (
            <>
              {/* Dark mode: keep existing styling */}
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(var(--vae-turquoise-rgb),0.10),transparent_60%),radial-gradient(circle_at_75%_65%,rgba(var(--vae-turquoise-rgb),0.06),transparent_60%)]"
                data-parallax-bg
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--color-white-rgb),0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--color-white-rgb),0.05)_1px,transparent_1px)] bg-[size:70px_70px] opacity-15" />
            </>
          )}
        </div>
        <div className="container-vae relative text-center">
          <h1 className="h1 fluid-h1 h-space-lg text-vae-turquoise" data-fade>
            Über VAE Systems
          </h1>
          <p
            className="mx-auto mb-6 max-w-4xl text-xl leading-relaxed text-gray-600 dark:text-white/90 md:text-2xl"
            data-fade
          >
            Lokale & sichere KI-Infrastruktur und Automatisierung – modular, dokumentiert, erweiterbar.
          </p>
          <p
            className="mx-auto max-w-4xl text-lg leading-relaxed text-gray-500 dark:text-white/70 md:text-xl"
            data-fade
          >
            Fokus auf Ownership statt Abhängigkeit: transparente Architekturen, saubere Deployments (On‑Prem & souveräne
            Cloud) und klare Übergaben.
          </p>
        </div>
        <div className="mt-14 px-4">
          <div
            className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
            data-stagger-group
            id="founders"
            data-chip-group
          >
            {[
              {
                name: 'Julian Darius Goertz-Dini',
                role: 'CEO & Gründer',
                focus: 'Unternehmensführung, Sales, strategische Vision',
                email: 'juliandini@vae-systems.com',
                linkedin: 'https://www.linkedin.com/in/julian-darius-goertz-dini-8a716a277',
              },
              {
                name: 'Jakob Dünnebeil',
                role: 'CTO & Gründer',
                focus: 'Technische Leitung, Architektur, Systemdesign',
                email: 'jakobduennebeil@vae-systems.com',
                linkedin: 'https://www.linkedin.com/in/jakob-d%C3%BCnnebeil-54b25936b/',
              },
              {
                name: 'Ninaad Anirrudah Deswandikar',
                role: 'CPO & Gründer',
                focus: 'Produktstrategie, UX, Feature-Entwicklung',
                email: 'ninaaddeswandikar@vae-systems.com',
                linkedin: 'https://www.linkedin.com/in/ninaad-aniruddha-deswandikar-a2248427a/',
              },
            ].map(f => (
              <div
                key={f.name}
                className="border-border-primary bg-bg-primary/5 group relative flex flex-col rounded-2xl border p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]"
                data-i
              >
                <div
                  className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-vae-turquoise/25 opacity-0 blur-3xl transition-opacity group-hover:opacity-70"
                  aria-hidden="true"
                />
                <div className="mb-3 text-left">
                  <h3 className="text-lg font-semibold leading-snug tracking-tight text-text-light">{f.name}</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-vae-turquoise">{f.role}</p>
                </div>
                <p className="theme-light:text-text-light mb-4 flex-grow text-sm leading-relaxed text-text-secondary">
                  {f.focus}
                </p>
                <div className="mt-auto space-y-2 text-left text-sm">
                  <a
                    href={`mailto:${f.email}`}
                    className="flex items-center text-vae-turquoise transition-colors hover:text-text-light dark:hover:text-white"
                  >
                    <Icon name="forward_to_inbox" className="mr-2" />
                    <span>{f.email}</span>
                  </a>
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-text-muted transition-colors hover:text-text-light dark:text-white/60 dark:hover:text-white"
                  >
                    <Icon name="link" className="mr-2" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Services Summary */}
      <section id="angebote" className="about-section theme-b relative z-10 py-24" data-section>
        <div className="about-surface-bg" aria-hidden="true" />
        <div className="container-vae relative">
          <header className="mb-14 max-w-4xl" data-heading-accent data-animate>
            <h2 className="h2 h-space text-gray-900 dark:text-white">Was wir für Unternehmen bieten</h2>
            <div className="heading-accent-bar mb-6 h-[3px] w-28 rounded-full bg-gradient-to-r from-vae-turquoise to-transparent" />
            <p className="text-lg leading-relaxed text-gray-700 dark:text-white/80 md:text-xl">
              Drei komplementäre Service‑Säulen – identisch kommuniziert über Website, Angebote & Gespräche.{' '}
              <span className="font-medium text-gray-900 dark:text-white">Klarheit statt Angebots-Wildwuchs.</span>
            </p>
          </header>
          <Reveal.Group stagger={0.08} className="grid items-stretch gap-8 md:grid-cols-3">
            {servicesCategories.map(
              (s: { key: string; title: string; focus: string; examples: string[]; to: string }) => (
                <Reveal key={s.key} preset="fadeUp">
                  <Card
                    title={s.title}
                    lead={s.focus}
                    body={s.focus}
                    bullets={s.examples}
                    link={s.to}
                    cta="Mehr dazu"
                    badge="Service"
                  />
                </Reveal>
              )
            )}
          </Reveal.Group>
          <ProductsCardsGrid />
        </div>
      </section>

      {/* Warum / Outcomes Section */}
      <WhyOutcomesSection />

      {/* Prozess vor Frühphase (konkret vor Kontext) */}
      <ProcessSection />

      {/* Frühphase Kontext danach */}
      <section id="fruehphase" className="about-section theme-a relative z-10 py-32" data-section>
        <div className="about-surface-bg" aria-hidden="true" />
        <div className="container-vae relative">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left: Text Content */}
            <div className="lg:pr-8">
              <h2
                className="heading-fix mb-8 text-5xl font-bold text-gray-900 dark:text-white md:text-6xl lg:text-7xl"
                data-animate
              >
                Frühphase –<span className="text-vae-turquoise"> bewusst fokussiert</span>
              </h2>
              <p className="mb-6 text-xl font-medium text-gray-900 dark:text-white md:text-2xl" data-animate>
                Präzise auf Wirkung ausgerichtet.
              </p>
              <div className="mb-8 flex items-center space-x-4 text-lg text-gray-700 dark:text-white/80" data-animate>
                <Icon name="location_on" className="text-vae-turquoise" />
                <span>KI, Automation und Infrastruktur aus Heidelberg</span>
              </div>
              <div
                className="flex flex-wrap gap-3 text-[13px] text-text-secondary dark:text-white/90"
                data-stagger-group
                data-chip-group
              >
                <span
                  className="bg-bg-primary/10 border-border-primary rounded-full border px-3 py-1.5 dark:border-white/10 dark:bg-white/10"
                  data-i
                >
                  Pragmatisch
                </span>
                <span
                  className="bg-bg-primary/10 border-border-primary rounded-full border px-3 py-1.5 dark:border-white/10 dark:bg-white/10"
                  data-i
                >
                  Offen
                </span>
                <span
                  className="bg-bg-primary/10 border-border-primary rounded-full border px-3 py-1.5 dark:border-white/10 dark:bg-white/10"
                  data-i
                >
                  Partnerschaftlich
                </span>
              </div>
            </div>

            {/* Right: Visual Element */}
            <div className="relative">
              <div className="card-vae">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-vae-turquoise/20">
                      <Icon name="psychology" className="text-vae-turquoise" size={22} />
                    </div>
                    <div className="text-2xl font-bold text-text-light dark:text-white">KI-Systeme</div>
                    <div className="text-sm text-text-secondary">Intelligent</div>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-vae-turquoise/20">
                      <Icon name="precision_manufacturing" className="text-vae-turquoise" size={22} />
                    </div>
                    <div className="text-2xl font-bold text-text-light dark:text-white">Automation</div>
                    <div className="text-sm text-text-secondary">Effizient</div>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-vae-turquoise/20">
                      <Icon name="cloud_sync" className="text-vae-turquoise" size={22} />
                    </div>
                    <div className="text-2xl font-bold text-text-light dark:text-white">Infrastruktur</div>
                    <div className="text-sm text-text-secondary">Skalierbar</div>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-vae-turquoise/20">
                      <Icon name="verified_user" className="text-vae-turquoise" size={22} />
                    </div>
                    <div className="text-2xl font-bold text-text-light dark:text-white">Open Source</div>
                    <div className="text-sm text-text-secondary">Transparent</div>
                  </div>
                </div>
              </div>
              {/* Floating decoration */}
              <div className="absolute -right-4 -top-4 h-24 w-24 animate-pulse rounded-full bg-vae-turquoise/20 blur-3xl"></div>
            </div>
          </div>
        </div>
        <div className="section-divider-horizontal" aria-hidden="true" />
      </section>

      {/* Story / Mission / Werte vorerst entfernt für Reduktion & Repositioning */}

      {/* Story & Team Block (compact) */}
      <StoryTeamSection />

      {/* Pilot Scenario entfernt (zu hypothetisch) */}

      {/* CTA */}
      <section className="about-section theme-b relative z-10 py-32" id="cta" data-section>
        <div className="about-surface-bg" aria-hidden="true" />
        <div className="container-vae relative">
          <div className="text-center">
            <div className="relative inline-block">
              {/* Background decoration */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-vae-turquoise/20 to-vae-turquoise/20 opacity-75 blur-2xl"></div>

              <div className="card-vae relative transform transition-all duration-500 hover:scale-105 hover:shadow-vae-turquoise/40">
                {/* Floating elements */}
                <div className="absolute right-4 top-4 h-4 w-4 animate-pulse rounded-full bg-vae-turquoise/30"></div>
                <div className="absolute bottom-4 left-4 h-3 w-3 animate-ping rounded-full bg-vae-turquoise/30"></div>

                <div className="mb-6 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-vae-turquoise/30">
                    <Icon name="rocket_launch" className="animate-pulse text-vae-turquoise" size={22} />
                  </div>
                </div>

                <h3 className="mb-4 text-3xl font-bold text-text-light dark:text-white md:text-4xl" data-animate>
                  Erstes Gespräch – unverbindlich & konkret
                </h3>
                <p className="mx-auto mb-8 max-w-2xl text-xl text-text-secondary" data-animate>
                  Skizzieren Sie kurz Ziel, Systeme, Zeitfenster. Wir antworten innerhalb 24h mit Vorschlag für ein
                  strukturiertes Erstgespräch.
                </p>

                <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                  <a href="/contact" className="btn-primary hover-lift press-bounce">
                    Jetzt Kontakt aufnehmen
                    <Icon
                      name="arrow_forward"
                      className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>

                  <div className="flex items-center text-text-secondary">
                    <Icon name="schedule" className="mr-2 text-vae-turquoise" />
                    <span className="text-sm">24h Antwortzeit garantiert</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <TechStackSection />

      <CaseStudiesSection />
    </div>
  )
}

export default AboutPage
