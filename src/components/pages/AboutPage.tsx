import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CaseStudiesSection from '../sections/CaseStudiesSection'
import TechStackSection from '../sections/TechStackSection'
import Seo from '../ui/Seo'

/**
 * AboutPage Component
 * 
 * Dedicated page for About Us with related sections
 */
const AboutPage: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null)

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

      // Hero distinct entry
      const hero = document.querySelector('.about-hero') as HTMLElement | null
      if (hero) {
        const heroItems = hero.querySelectorAll('[data-hero-fade]')
        gsap.from(heroItems, { opacity: 0, y: 46, duration: 1, ease: 'power3.out', stagger: 0.12 })
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

  return (
    <div ref={rootRef} className="min-h-screen">
      <Seo
        title="Über uns | VAE Systems"
        description="Gegründet 2025 in Heidelberg – interdisziplinäres KI & Automation Team. Open Source, Datenkontrolle, dokumentierte Systeme."
        canonicalPath="/about"
        jsonLd={[{ '@context':'https://schema.org','@type':'Organization','name':'VAE Systems','foundingDate':'2025','address':{ '@type':'PostalAddress','addressLocality':'Heidelberg','addressCountry':'DE' }}]}
      />
      {/* Page Hero (aligned style with ContactPage) */}
  <section className="about-hero bg-bg-darker pt-32 pb-16 relative overflow-hidden section-surface" data-section>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(0,255,165,0.10),transparent_60%),radial-gradient(circle_at_75%_65%,rgba(0,255,165,0.06),transparent_60%)]" data-parallax-bg />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px] opacity-15" />
        </div>
        <div className="container-vae relative text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-vae-turquoise mb-6 heading-fix" data-fade>
            Über VAE Systems
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed mb-6" data-fade>
            Lokale & sichere KI-Infrastruktur und Automatisierung – modular, dokumentiert, erweiterbar.
          </p>
          <p className="text-lg md:text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed" data-fade>
            Fokus auf Ownership statt Abhängigkeit: transparente Architekturen, saubere Deployments (On‑Prem & souveräne Cloud) und klare Übergaben.
          </p>
        </div>
        <div className="mt-14 px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto" data-stagger-group id="founders" data-chip-group>
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
                  <h3 className="text-white font-semibold text-lg leading-snug tracking-tight">{f.name}</h3>
                  <p className="text-vae-turquoise/90 text-xs font-medium uppercase tracking-wide mt-1">{f.role}</p>
                </div>
                <p className="text-white/80 text-sm leading-relaxed flex-grow mb-4">{f.focus}</p>
                <div className="mt-auto space-y-2 text-sm text-left">
                  <a href={`mailto:${f.email}`} className="flex items-center text-vae-turquoise hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-base mr-2">forward_to_inbox</span>
                    <span>{f.email}</span>
                  </a>
                  <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-white/60 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-base mr-2">link</span>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extended About Content */}
  <section className="relative py-32 overflow-hidden section-surface-alt" data-section>
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: `
                radial-gradient(circle at 25% 25%, hsla(var(--color-vae-turquoise), 0.08) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, hsla(var(--color-vae-turquoise), 0.06) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, hsla(var(--color-vae-turquoise), 0.02) 0%, transparent 70%)
              `
            }}
          />
          {/* Floating particles effect */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-vae-turquoise/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-vae-turquoise/30 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-vae-turquoise/25 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="relative container-vae">
          {/* 1. Hero-Statement - Magazine Style */}
          <div className="mb-40 section-block" id="fruehphase" data-section>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Text Content */}
              <div className="lg:pr-8">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 heading-fix" data-animate>
                  Frühphase –<span className="text-gradient"> bewusst fokussiert</span>
                </h2>
                <p className="text-xl md:text-2xl text-white font-medium mb-6" data-animate>
                  Präzise auf Wirkung ausgerichtet.
                </p>
                <div className="flex items-center space-x-4 text-lg text-text-secondary mb-8" data-animate>
                  <span className="material-symbols-outlined text-vae-turquoise">
                    location_on
                  </span>
                  <span>KI, Automation und Infrastruktur aus Heidelberg</span>
                </div>
                <div className="flex flex-wrap gap-3 text-[13px] text-white/90" data-stagger-group data-chip-group>
                  <span className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10" data-i>Pragmatisch</span>
                  <span className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10" data-i>Offen</span>
                  <span className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10" data-i>Partnerschaftlich</span>
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
                      <div className="text-2xl font-bold text-white">KI-Systeme</div>
                      <div className="text-sm text-text-secondary">Intelligent</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-vae-turquoise/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-2xl text-vae-turquoise">
                          precision_manufacturing
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-white">Automation</div>
                      <div className="text-sm text-text-secondary">Effizient</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-vae-turquoise/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-2xl text-vae-turquoise">
                          cloud_sync
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-white">Infrastruktur</div>
                      <div className="text-sm text-text-secondary">Skalierbar</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-vae-turquoise/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-2xl text-vae-turquoise">
                          verified_user
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-white">Open Source</div>
                      <div className="text-sm text-text-secondary">Transparent</div>
                    </div>
                  </div>
                </div>
                {/* Floating decoration */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-vae-turquoise/20 rounded-full blur-3xl animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* 2. Unsere Story - Magazine Layout (Right-aligned) */}
          <div className="mb-40 section-block" id="story" data-section>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Visual Timeline */}
              <div className="lg:order-2 lg:pl-8">
                <div className="relative" data-animate>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 heading-fix" data-animate>
                    Unsere Geschichte
                  </h2>
                  
                  {/* Timeline */}
                  <div className="space-y-8">
                    <div className="flex items-start space-x-6">
                      <div className="w-12 h-12 bg-vae-turquoise/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-vae-turquoise">
                          school
                        </span>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-white mb-2">Universität Heidelberg</div>
                        <div className="text-text-secondary">Gründung durch Studierende aus Mathematik, Informatik und VWL</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-6">
                      <div className="w-12 h-12 bg-vae-turquoise/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-vae-turquoise">
                          rocket_launch
                        </span>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-white mb-2">Junges Tech-Unternehmen</div>
                        <div className="text-text-secondary">Individuelle KI- und Automatisierungssysteme</div>
                      </div>
                    </div>
                    
          <div className="flex items-start space-x-6">
                      <div className="w-12 h-12 bg-vae-turquoise/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-vae-turquoise">
                          integration_instructions
                        </span>
                      </div>
                      <div>
            <div className="text-lg font-semibold text-white mb-2">Praxisorientiert</div>
            <div className="text-text-secondary">Verbindung aus Forschung & Umsetzung</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right: Text Content */}
              <div className="lg:order-1">
                <div className="card-vae">
                  <div className="space-y-6" data-animate>
                    <p className="text-lg leading-relaxed text-text-secondary">
                      <strong className="text-vae-turquoise">VAE Systems</strong> wurde von Studierenden der Universität Heidelberg aus Mathematik, Informatik und Volkswirtschaftslehre gegründet.
                    </p>
                    <p className="text-lg leading-relaxed text-text-secondary">
                      Als <strong className="text-white">junges Technologieunternehmen</strong> entwickeln wir individuelle KI- und Automatisierungssysteme, die Unternehmen heute entlasten und morgen tragen.
                    </p>
                    <p className="text-lg leading-relaxed text-text-secondary">
                      Statt Buzzword-Stapeln setzen wir auf klare Architekturen, nachvollziehbare Entscheidungen und iterative Auslieferung – für echte Betriebsfähigkeit.
                    </p>
                  </div>
                  
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10 text-center">
                    <div>
                      <div className="text-sm font-semibold text-text-secondary mb-1">Gründung</div>
                      <div className="text-xl font-bold text-vae-turquoise">2025</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-text-secondary mb-1">Herkunft</div>
                      <div className="text-xl font-bold text-vae-turquoise">Uni HD</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-text-secondary mb-1">Lock-in</div>
                      <div className="text-xl font-bold text-vae-turquoise">0%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Unsere Mission - Magazine Layout (Left-aligned) */}
          <div className="mb-40" data-section>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Text Content */}
              <div className="lg:pr-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 heading-fix" id="mission" data-animate>
                  Unsere Mission
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4" data-animate>
                    <div className="w-8 h-8 bg-vae-turquoise/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="material-symbols-outlined text-vae-turquoise text-sm">
                        lock_open
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Datenkontrolle</h4>
                      <p className="text-text-secondary leading-relaxed">
                        Wir glauben daran, dass Unternehmen <strong className="text-white">Kontrolle über ihre Systeme und Daten</strong> behalten müssen. 
                        Deshalb setzen wir auf Open Source, saubere Projektdokumentation und keine Vendor-Lock-ins.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4" data-animate>
                    <div className="w-8 h-8 bg-vae-turquoise/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="material-symbols-outlined text-vae-turquoise text-sm">
                        groups
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Langfristige Nutzbarkeit</h4>
                      <p className="text-text-secondary leading-relaxed">
                        Unsere Systeme sind so gebaut, dass sie auch ohne uns <strong className="text-white">langfristig nutzbar bleiben</strong> – 
                        weil wir an Qualität und freiwillige Partnerschaft glauben, nicht an Zwang.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-vae-turquoise/20 to-vae-turquoise/10 rounded-2xl p-6 border border-vae-turquoise/30" data-animate>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-vae-turquoise/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="material-symbols-outlined text-vae-turquoise text-sm">
                          public
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">Europäische Zukunft</h4>
                        <p className="text-white leading-relaxed">
                          Unser Ziel ist es, die <strong className="text-vae-turquoise">Unternehmenslandschaft in Deutschland und Europa</strong> zukunftsfähig zu machen – 
                          mit Lösungen, die heute entlasten und morgen tragen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right: Visual Element */}
              <div className="relative">
                <div className="card-vae">
                  {/* Infographic Style */}
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-vae-turquoise/30 rounded-3xl flex items-center justify-center mx-auto mb-4">
                      <span className="material-symbols-outlined text-3xl text-vae-turquoise">
                        public
                      </span>
                    </div>
                    <div className="text-xl font-bold text-white">Deutschland & Europa</div>
                    <div className="text-text-secondary">Zukunftsfähige Systeme</div>
                  </div>
                  
                  {/* Connection Lines */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-vae-turquoise/20 rounded-lg flex items-center justify-center">
                          <span className="material-symbols-outlined text-vae-turquoise text-sm">
                            code
                          </span>
                        </div>
                        <span className="text-white text-sm">Open Source</span>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-vae-turquoise/50 to-transparent mx-4"></div>
                      <div className="text-vae-turquoise text-sm">100%</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-vae-turquoise/20 rounded-lg flex items-center justify-center">
                          <span className="material-symbols-outlined text-vae-turquoise text-sm">
                            description
                          </span>
                        </div>
                        <span className="text-white text-sm">Dokumentation</span>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-vae-turquoise/50 to-transparent mx-4"></div>
                      <div className="text-vae-turquoise text-sm">Vollständig</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-vae-turquoise/20 rounded-lg flex items-center justify-center">
                          <span className="material-symbols-outlined text-vae-turquoise text-sm">
                            shield
                          </span>
                        </div>
                        <span className="text-white text-sm">Vendor Lock-ins</span>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-red-500/50 to-transparent mx-4"></div>
                      <div className="text-red-400 text-sm">0%</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating decoration */}
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-vae-turquoise/20 rounded-full blur-2xl animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* 4. Unsere Werte - Magazine Layout (Right-aligned) */}
          <div className="mb-40 section-block" id="werte" data-section>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left: Interactive Values Grid */}
              <div className="lg:order-2 lg:pl-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 heading-fix" data-animate>
                  Leitprinzipien
                </h2>
                <p className="text-xl text-text-secondary mb-12" data-animate>
                  Was wir (noch) nicht mit Größe belegen, zeigen wir mit Haltung.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Wert 1 */}
                  <div className="group card-vae hover:border-vae-turquoise/30 transition-all duration-300 flex flex-col h-full">
                    <div className="w-12 h-12 bg-vae-turquoise/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-xl text-vae-turquoise">
                        code
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3 group-hover:text-vae-turquoise transition-colors duration-300">
                      Technische Kompetenz
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed group-hover:text-white transition-colors duration-300 flex-grow">
                      Von Chatbots bis Prozessautomation – moderne KI mit sauberem Engineering.
                    </p>
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <button className="w-full py-2 px-4 rounded-lg bg-vae-turquoise/15 text-vae-turquoise hover:bg-vae-turquoise/25 transition-all duration-300 text-sm font-medium">
                        Mehr erfahren →
                      </button>
                    </div>
                  </div>

                  {/* Wert 2 */}
                  <div className="group card-vae hover:border-vae-turquoise/30 transition-all duration-300 flex flex-col h-full">
                    <div className="w-12 h-12 bg-vae-turquoise/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-xl text-vae-turquoise">
                        verified_user
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3 group-hover:text-vae-turquoise transition-colors duration-300">
                      Open Source & Unabhängigkeit
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed group-hover:text-white transition-colors duration-300 flex-grow">
                      Keine Vendor-Lock-ins. Volle Kontrolle. Software Made in Germany.
                    </p>
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <button className="w-full py-2 px-4 rounded-lg bg-vae-turquoise/15 text-vae-turquoise hover:bg-vae-turquoise/25 transition-all duration-300 text-sm font-medium">
                        Mehr erfahren →
                      </button>
                    </div>
                  </div>

                  {/* Wert 3 */}
                  <div className="group card-vae hover:border-vae-turquoise/30 transition-all duration-300 flex flex-col h-full">
                    <div className="w-12 h-12 bg-vae-turquoise/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-xl text-vae-turquoise">
                        handshake
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3 group-hover:text-vae-turquoise transition-colors duration-300">
                      Langfristige Partnerschaft
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed group-hover:text-white transition-colors duration-300 flex-grow">
                      Dokumentierte, nachhaltige Systeme für freiwillige Zusammenarbeit.
                    </p>
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <button className="w-full py-2 px-4 rounded-lg bg-vae-turquoise/15 text-vae-turquoise hover:bg-vae-turquoise/25 transition-all duration-300 text-sm font-medium">
                        Mehr erfahren →
                      </button>
                    </div>
                  </div>

                  {/* Wert 4 */}
                  <div className="group card-vae hover:border-vae-turquoise/30 transition-all duration-300 flex flex-col h-full">
                    <div className="w-12 h-12 bg-vae-turquoise/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-xl text-vae-turquoise">
                        palette
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3 group-hover:text-vae-turquoise transition-colors duration-300">
                      Ästhetik & UX
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed group-hover:text-white transition-colors duration-300 flex-grow">
                      Design und Klarheit als Teil des ROI. Systeme, die begeistern.
                    </p>
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <button className="w-full py-2 px-4 rounded-lg bg-vae-turquoise/15 text-vae-turquoise hover:bg-vae-turquoise/25 transition-all duration-300 text-sm font-medium">
                        Mehr erfahren →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right: Feature Highlight */}
              <div className="lg:order-1">
                <div className="card-vae" data-animate>
                  <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-vae-turquoise/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <span className="material-symbols-outlined text-4xl text-vae-turquoise">
                        psychology
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 heading-fix">Wertebasierte Entwicklung</h3>
                    <p className="text-text-secondary leading-relaxed mb-8">
                      Unsere Prinzipien fließen in jeden Code, jede Architektur-Entscheidung 
                      und jeden Kundenkontakt ein.
                    </p>
                  </div>
                  
                  {/* Values Circle */}
                  <div className="relative">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-3xl font-bold text-vae-turquoise mb-1">100%</div>
                        <div className="text-xs text-text-secondary">Open Source</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-3xl font-bold text-vae-turquoise mb-1">0</div>
                        <div className="text-xs text-text-secondary">Lock-ins</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-3xl font-bold text-vae-turquoise mb-1">Docs</div>
                        <div className="text-xs text-text-secondary">Pflicht</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-3xl font-bold text-vae-turquoise mb-1">Audit</div>
                        <div className="text-xs text-text-secondary">fähig</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating decoration */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-vae-turquoise/10 rounded-full blur-3xl animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* 5. Warum VAE? - Magazine Layout (Left-aligned with masonry) */}
          <div className="mb-40 section-block relative" id="warum" data-section>
            <div className="absolute inset-0 -z-10 opacity-70" aria-hidden="true">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(0,255,165,0.18),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(0,255,165,0.12),transparent_60%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px] mix-blend-overlay" />
            </div>
            <div className="max-w-6xl mx-auto">
              <header className="max-w-3xl mb-16" data-heading-accent data-animate>
                <h2 className="text-4xl md:text-5xl font-bold text-white heading-fix mb-6">
                  Warum Unternehmen mit uns arbeiten
                </h2>
                <div className="heading-accent-bar h-[3px] w-32 bg-gradient-to-r from-vae-turquoise to-transparent rounded-full mb-6" />
                <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                  Keine leeren Versprechen – sondern klare Prinzipien, wie wir Projekte bauen: offen, dokumentiert, überprüfbar und geschäftsorientiert.
                </p>
              </header>
              <ul className="grid md:grid-cols-2 gap-8" role="list">
                {[
                  {
                    icon: 'description',
                    title: 'Offen & dokumentiert',
                    body: 'Architekturen, Deployments & Entscheidungen sind nachvollziehbar – Systeme bleiben auch ohne uns betreibbar.',
                    tags: ['Open Source','Dokumentiert','Übergabefähig']
                  },
                  {
                    icon: 'rocket_launch',
                    title: 'Iterativ & messbar',
                    body: 'Kurze Zyklen, frühe Nutzbarkeit, klare Akzeptanzkriterien statt langem Stealth-Build.',
                    tags: ['MVP','Feedback-Loops','ROI-Fokus']
                  },
                  {
                    icon: 'hub',
                    title: 'Architektur statt Basteln',
                    body: 'Saubere Modularisierung (Pipelines, Adapter, Interfaces) statt fragilem Ad-hoc-Code.',
                    tags: ['Modular','Erweiterbar','Testbar']
                  },
                  {
                    icon: 'support_agent',
                    title: 'Begleitende Beratung',
                    body: 'Wir challengen Use-Cases, schärfen Prioritäten und vermeiden Over-Engineering.',
                    tags: ['Sparring','Priorisierung','Transparenz']
                  },
                  {
                    icon: 'lightbulb',
                    title: 'Aktuell & selektiv',
                    body: 'Wir integrieren, was stabil & sinnvoll ist – kein Hype-Stack, kein Legacy-Dump.',
                    tags: ['Kuratiert','Stabil','Sinnvoll']
                  }
                ].map((r, idx) => (
                  <li key={r.title} className="relative group" data-animate>
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-vae-turquoise/25 to-transparent opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 pointer-events-none" />
                    <div className="h-full flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-7 transition-all duration-300 group-hover:border-vae-turquoise/40 group-hover:shadow-[0_0_0_1px_rgba(0,255,165,0.25),0_4px_30px_-6px_rgba(0,255,165,0.3)]">
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center space-x-3">
                          <div className="w-11 h-11 rounded-xl bg-vae-turquoise/25 flex items-center justify-center text-vae-turquoise group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-[22px]">{r.icon}</span>
                          </div>
                          <span className="text-xs uppercase tracking-wider text-vae-turquoise/70 font-medium">{String(idx+1).padStart(2,'0')}</span>
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 group-hover:text-white group-hover:bg-white/10 transition-colors">
                          <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-3 leading-tight">{r.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed flex-grow">{r.body}</p>
                      <div className="flex flex-wrap gap-2 mt-5">
                        {r.tags.map(t => (
                          <span key={t} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] tracking-wide text-white/70 group-hover:border-vae-turquoise/30 group-hover:text-white transition-colors">{t}</span>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 6. Enhanced Micro-CTA with premium styling */}
          <div className="text-center section-block" id="cta" data-section>
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
                
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4" data-animate>
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

  <CaseStudiesSection />

      {/* Tech Stack Section */}
      <TechStackSection />
    </div>
  )
}

export default AboutPage
