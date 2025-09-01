import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CaseStudiesSection from '../sections/CaseStudiesSection'
import TechStackSection from '../sections/TechStackSection'
// ProviderComparison vorerst entfernt bis Redesign
// import ProviderComparisonSection from '../sections/ProviderComparison'
import ProcessSection from '../sections/ProcessSection'
import StoryTeamSection from '../sections/StoryTeamSection'
import WhyOutcomesSection from '../sections/WhyOutcomesSection'
import Seo from '../ui/Seo'
import ProductsCardsGrid from '../sections/ProductsCardsGrid'
import Card from '../ui/Card'
import { aboutServices } from '../../content/services'
import Breadcrumbs from '../navigation/Breadcrumbs'

/**
 * AboutPage Component
 * 
 * Dedicated page for About Us with related sections
 */
const AboutPage: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null)

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
            once: true
          }
        })
        tl.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: { each: 0.08, from: 'start' }
        })
      }

      // Hero distinct entry (use data-fade as in markup)
      const hero = document.querySelector('.about-hero') as HTMLElement | null
      if (hero) {
        const heroItems = hero.querySelectorAll('[data-fade]')
        if (heroItems.length) {
          gsap.from(heroItems, { opacity: 0, y: 46, duration: 1, ease: 'power3.out', stagger: 0.12 })
        }
      }

      // Sections flagged with data-section
      gsap.utils.toArray<HTMLElement>('[data-section]')
        .forEach(section => animateSection(section))

      // Tag groups / chips subtle pop
      gsap.utils.toArray<HTMLElement>('[data-chip-group]').forEach(group => {
        const chips = group.querySelectorAll<HTMLElement>('span, a, button')
        gsap.set(chips, { opacity: 0, y: 14 })
        ScrollTrigger.create({
          trigger: group,
            start: 'top 78%',
            once: true,
            onEnter: () => gsap.to(chips, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' })
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
          onEnter: () => gsap.to(bar, { scaleX: 1, duration: 0.65, ease: 'power3.out' })
        })
      })

      // Parallax (gentle)
      gsap.utils.toArray<HTMLElement>('[data-parallax-bg]').forEach(bg => {
        const parent = bg.parentElement
        if (!parent) return
        gsap.to(bg, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: parent, start: 'top bottom', end: 'bottom top', scrub: 0.4 } })
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
      cta: '157 100% 60%'
    }
    const sections = Array.from(root.querySelectorAll<HTMLElement>('section[id]'))
      .filter(s => accentMap[s.id])
    if (!sections.length) return

    // Fallback initial accent
    root.style.setProperty('--about-accent', accentMap[sections[0].id])

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = (entry.target as HTMLElement).id
            if (accentMap[id]) {
              gsap.to(root, { duration: 1.2, ease: 'power2.out', onUpdate: () => {}, onStart: () => {},
                // Use gsap quickSetter alternative: just set property inside onComplete chain
              })
              root.style.setProperty('--about-accent', accentMap[id])
            }
        }
      })
    }, { threshold: 0.5 })

    sections.forEach(sec => observer.observe(sec))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={rootRef} className="min-h-[100dvh] relative" style={{ ['--about-accent' as any]:'157 100% 47%' }}>
      {/* Accent interpolation overlay */}
      <div aria-hidden="true" className="about-accent-overlay fixed inset-0 z-0 pointer-events-none" />
      <Seo
        title="Über uns | VAE Systems"
        description="Gegründet 2025 in Heidelberg – interdisziplinäres KI & Automation Team. Open Source, Datenkontrolle, dokumentierte Systeme."
        canonicalPath="/about"
        jsonLd={[{ '@context':'https://schema.org','@type':'Organization','name':'VAE Systems','foundingDate':'2025','address':{ '@type':'PostalAddress','addressLocality':'Heidelberg','addressCountry':'DE' }}]}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'About', path: '/about' }
        ]}
      />
      {/* Page Hero (aligned style with ContactPage) */}
  <section className="about-hero bg-bg-darker pt-32 pb-16 relative overflow-hidden section-surface" data-section>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(var(--vae-turquoise-rgb),0.10),transparent_60%),radial-gradient(circle_at_75%_65%,rgba(var(--vae-turquoise-rgb),0.06),transparent_60%)]" data-parallax-bg />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px] opacity-15" />
        </div>
        <div className="container-vae relative text-center">
          <h1 className="h1 text-vae-turquoise h-space-lg" data-fade>
            Über VAE Systems
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-white/90 max-w-4xl mx-auto leading-relaxed mb-6" data-fade>
            Lokale & sichere KI-Infrastruktur und Automatisierung – modular, dokumentiert, erweiterbar.
          </p>
          <p className="text-lg md:text-xl text-gray-500 dark:text-white/70 max-w-4xl mx-auto leading-relaxed" data-fade>
            Fokus auf Ownership statt Abhängigkeit: transparente Architekturen, saubere Deployments (On‑Prem & souveräne Cloud) und klare Übergaben.
          </p>
        </div>
        <div className="mt-14 px-4">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            data-stagger-group
            id="founders"
            data-chip-group
          >
            {[
              {
        name: 'Julian Darius Goertz-Dini', role: 'CEO & Gründer', focus: 'Unternehmensführung, Sales, strategische Vision', email: 'juliandini@vae-systems.com', linkedin: 'https://www.linkedin.com/in/julian-darius-goertz-dini-8a716a277'
              },
              {
                name: 'Jakob Dünnebeil', role: 'CTO & Gründer', focus: 'Technische Leitung, Architektur, Systemdesign', email: 'jakobduennebeil@vae-systems.com', linkedin: 'https://www.linkedin.com/in/jakob-d%C3%BCnnebeil-54b25936b/'
              },
              {
                name: 'Ninaad Anirrudah Deswandikar', role: 'CPO & Gründer', focus: 'Produktstrategie, UX, Feature-Entwicklung', email: 'ninaaddeswandikar@vae-systems.com', linkedin: 'https://www.linkedin.com/in/ninaad-aniruddha-deswandikar-a2248427a/'
              }
            ].map((f) => (
              <div key={f.name} className="card-vae flex flex-col relative group" data-i>
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-vae-turquoise/25 blur-3xl rounded-full opacity-0 group-hover:opacity-70 transition-opacity" aria-hidden="true" />
                <div className="mb-3 text-left">
                  <h3 className="text-text-light dark:text-white font-semibold text-lg leading-snug tracking-tight">{f.name}</h3>
                  <p className="text-vae-turquoise/90 text-xs font-medium uppercase tracking-wide mt-1">{f.role}</p>
                </div>
                <p className="text-text-secondary dark:text-white/80 text-sm leading-relaxed flex-grow mb-4">{f.focus}</p>
                <div className="mt-auto space-y-2 text-sm text-left">
                  <a href={`mailto:${f.email}`} className="flex items-center text-vae-turquoise hover:text-text-light dark:hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-base mr-2">forward_to_inbox</span>
                    <span>{f.email}</span>
                  </a>
                  <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-text-muted dark:text-white/60 hover:text-text-light dark:hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-base mr-2">link</span>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  {/* Unified Services Summary */}
  <section id="angebote" className="relative py-24 about-section theme-b z-10" data-section>
        <div className="about-surface-bg" aria-hidden="true" />
        <div className="container-vae relative">
          <header className="max-w-4xl mb-14" data-heading-accent data-animate>
            <h2 className="h2 text-gray-900 dark:text-white h-space">Was wir für Unternehmen bieten</h2>
            <div className="heading-accent-bar h-[3px] w-28 bg-gradient-to-r from-vae-turquoise to-transparent rounded-full mb-6" />
            <p className="text-lg md:text-xl text-gray-700 dark:text-white/80 leading-relaxed">Drei komplementäre Service‑Säulen – identisch kommuniziert über Website, Angebote & Gespräche. <span className="text-gray-900 dark:text-white font-medium">Klarheit statt Angebots-Wildwuchs.</span></p>
          </header>
          <div className="grid md:grid-cols-3 gap-8 items-stretch" data-stagger-group>
            {aboutServices.map(s => (
              <Card
                key={s.key}
                title={s.title}
                lead={s.lead}
                body={s.body}
                bullets={s.bullets}
                link={s.link}
                cta="Mehr dazu"
                badge="Service"
              />
            ))}
          </div>
          <ProductsCardsGrid />
        </div>
      </section>

  {/* Warum / Outcomes Section */}
  <WhyOutcomesSection />

    {/* Prozess vor Frühphase (konkret vor Kontext) */}
    <ProcessSection />

    {/* Frühphase Kontext danach */}
    <section id="fruehphase" className="relative py-32 about-section theme-a z-10" data-section>
        <div className="about-surface-bg" aria-hidden="true" />
        <div className="container-vae relative">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Text Content */}
              <div className="lg:pr-8">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 heading-fix" data-animate>
                  Frühphase –<span className="text-vae-turquoise"> bewusst fokussiert</span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-900 dark:text-white font-medium mb-6" data-animate>
                  Präzise auf Wirkung ausgerichtet.
                </p>
                <div className="flex items-center space-x-4 text-lg text-gray-700 dark:text-white/80 mb-8" data-animate>
                  <span className="material-symbols-outlined text-vae-turquoise">
                    location_on
                  </span>
                  <span>KI, Automation und Infrastruktur aus Heidelberg</span>
                </div>
                <div className="flex flex-wrap gap-3 text-[13px] text-text-secondary dark:text-white/90" data-stagger-group data-chip-group>
                  <span className="bg-bg-primary/10 dark:bg-white/10 px-3 py-1.5 rounded-full border border-border-primary dark:border-white/10" data-i>Pragmatisch</span>
                  <span className="bg-bg-primary/10 dark:bg-white/10 px-3 py-1.5 rounded-full border border-border-primary dark:border-white/10" data-i>Offen</span>
                  <span className="bg-bg-primary/10 dark:bg-white/10 px-3 py-1.5 rounded-full border border-border-primary dark:border-white/10" data-i>Partnerschaftlich</span>
                </div>
              </div>
              
              {/* Right: Visual Element */}
              <div className="relative">
                <div className="card-vae">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-vae-turquoise/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-2xl text-vae-turquoise">
                          psychology
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-text-light dark:text-white">KI-Systeme</div>
                      <div className="text-sm text-text-secondary">Intelligent</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-vae-turquoise/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-2xl text-vae-turquoise">
                          precision_manufacturing
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-text-light dark:text-white">Automation</div>
                      <div className="text-sm text-text-secondary">Effizient</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-vae-turquoise/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-2xl text-vae-turquoise">
                          cloud_sync
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-text-light dark:text-white">Infrastruktur</div>
                      <div className="text-sm text-text-secondary">Skalierbar</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-vae-turquoise/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-2xl text-vae-turquoise">
                          verified_user
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-text-light dark:text-white">Open Source</div>
                      <div className="text-sm text-text-secondary">Transparent</div>
                    </div>
                  </div>
                </div>
                {/* Floating decoration */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-vae-turquoise/20 rounded-full blur-3xl animate-pulse"></div>
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
  <section className="relative py-32 about-section theme-b z-10" id="cta" data-section>
        <div className="about-surface-bg" aria-hidden="true" />
        <div className="container-vae relative">
          <div className="text-center">
            <div className="relative inline-block">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-vae-turquoise/20 to-vae-turquoise/20 rounded-3xl blur-2xl opacity-75"></div>
              
              <div className="relative card-vae transform hover:scale-105 transition-all duration-500 hover:shadow-vae-turquoise/40">
                {/* Floating elements */}
                <div className="absolute top-4 right-4 w-4 h-4 bg-vae-turquoise/30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-vae-turquoise/30 rounded-full animate-ping"></div>
                
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-vae-turquoise/30 rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl text-vae-turquoise animate-pulse">
                      rocket_launch
                    </span>
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-text-light dark:text-white mb-4" data-animate>
                  Erstes Gespräch – unverbindlich & konkret
                </h3>
                <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto" data-animate>
                  Skizzieren Sie kurz Ziel, Systeme, Zeitfenster. Wir antworten innerhalb 24h mit Vorschlag für ein strukturiertes Erstgespräch.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a 
                    href="/contact"
                    className="btn-primary"
                  >
                    Jetzt Kontakt aufnehmen
                    <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform duration-300">
                      arrow_forward
                    </span>
                  </a>
                  
                  <div className="flex items-center text-text-secondary">
                    <span className="material-symbols-outlined mr-2 text-vae-turquoise">
                      schedule
                    </span>
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
