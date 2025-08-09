import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MaterialIcon from '../ui/MaterialIcon'
import ServicesSection from '../sections/ServicesSection'
import RippleGrid from '../sections/effects/RippleGrid'
/**
 * ServicesPage Component
 * 
 * Complete Services page with all sections according to the new concept
 */
const ServicesPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const pricingRef = useRef<HTMLDivElement>(null)
  const partnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      if (reduced) {
        // For reduced-motion: Make elements immediately visible
        gsap.set([heroRef.current, timelineRef.current, pricingRef.current, partnerRef.current], { opacity: 1, y: 0 })
        return
      }

      // Hero Animation
      if (heroRef.current) {
        gsap.fromTo(heroRef.current.children, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            stagger: 0.2, 
            ease: "expo.out" 
          }
        )
      }

      // Timeline Animation - Clean and Simple
        if (timelineRef.current) {
            const phaseItems = timelineRef.current.querySelectorAll('.timeline-item')

            // Staggered animation for phase items
            phaseItems.forEach((item, index) => {
                gsap.fromTo(item,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        delay: index * 0.2,
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                            toggleActions: "play none none none"
                        }
                    }
                )
            })
        }
      // Pricing Section Animation
      if (pricingRef.current) {
        gsap.fromTo(pricingRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
              trigger: pricingRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Partner Section Animation
      if (partnerRef.current) {
        gsap.fromTo(partnerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
              trigger: partnerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

    }, [])

    return () => ctx.revert()
  }, [])

    const processPhases = [
        {
            phase: 'Verstehen',
            icon: 'lightbulb',
            title: 'Analyse & Konzeption',
            subtitle: 'Von der Idee zum Plan',
            description: 'Unverbindliches Erstgespräch, Pain-Point-Analyse und Technik-Check. Wir verstehen Ihre Herausforderungen und entwickeln gemeinsam die optimale Lösung.',
            details: ['Kostenloses Erstgespräch', 'System-Analyse', 'Klare Projektdefinition']
        },
        {
            phase: 'Umsetzen',
            icon: 'construction',
            title: 'Entwicklung & Implementierung',
            subtitle: 'Schritt für Schritt zum Ziel',
            description: 'Meilensteinbasierte Umsetzung mit regelmäßigen Reviews. Sie behalten jederzeit die Kontrolle und zahlen nur für funktionierende Module.',
            details: ['Agile Entwicklung', 'Regelmäßige Updates', 'Transparente Abrechnung']
        },
        {
            phase: 'Optimieren',
            icon: 'trending_up',
            title: 'Launch & Weiterentwicklung',
            subtitle: 'Langfristig erfolgreich',
            description: 'Training, Dokumentation und optionale Langzeitbetreuung. Ihr System wächst mit Ihren Anforderungen und bleibt technologisch aktuell.',
            details: ['Team-Schulungen', 'Vollständige Dokumentation', 'Optionaler Support']
        }
  ]

  const handleCTAClick = () => {
    // Scroll to contact form or open contact page
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen">
      {/* New RippleGrid Hero */}
      <section className="relative pt-32 pb-28 overflow-hidden border-b border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker">
        <div className="absolute inset-0 opacity-80 mix-blend-screen">
          <RippleGrid
            enableRainbow={false}
            gridColor="#00ffa5"
            rippleIntensity={0.045}
            gridSize={9}
            gridThickness={14}
            mouseInteraction={true}
            mouseInteractionRadius={1.15}
            opacity={0.9}
          />
        </div>
        <div className="relative container-vae" ref={heroRef}>
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="block text-text-light">Services & Expertise</span>
              <span className="block text-gradient">für nachhaltige KI-Infrastruktur.</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
              Von Analyse über Implementierung bis Lifecycle-Optimierung – modulare Service-Pakete für souveräne, lokale und skalierbare Automatisierung.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-vae-turquoise">
              <div className="flex items-center gap-2"><MaterialIcon icon="shield" className="text-2xl" /><span className="text-sm font-medium">Datensouverän</span></div>
              <div className="flex items-center gap-2"><MaterialIcon icon="flash_on" className="text-2xl" /><span className="text-sm font-medium">Schnell</span></div>
              <div className="flex items-center gap-2"><MaterialIcon icon="auto_awesome" className="text-2xl" /><span className="text-sm font-medium">KI-powered</span></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#services" className="btn-primary px-10 py-4">Services entdecken</a>
              <button onClick={handleCTAClick} className="btn-secondary px-10 py-4">Projekt starten</button>
            </div>
          </div>
        </div>
      </section>

  {/* 2. Service Cards */}
  <ServicesSection />

            
          {/* 3. Process Phases */}
          <section className="py-20 bg-bg-darker">
              <div className="container-vae">
                  <div className="text-center mb-16">
                      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                          Von der Idee zur Lösung
                      </h2>
                      <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                          Unser 3-Phasen-Prozess für maximalen Projekterfolg
                      </p>
                  </div>

                  <div className="max-w-7xl mx-auto" ref={timelineRef}>
                      {/* Process Timeline */}
                      <div className="relative">
                          {/* Connection Line - Hidden on Mobile */}
                          <div className="hidden lg:block absolute top-32 left-0 right-0 h-0.5 bg-gradient-to-r from-vae-turquoise/20 via-vae-turquoise to-vae-turquoise/20"></div>

                          {/* Phase Cards */}
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                              {processPhases.map((phase, index) => (
                                  <div
                                      key={index}
                                      className="timeline-item relative"
                                  >
                                      {/* Phase Indicator */}
                                      <div className="flex flex-col items-center mb-8">
                                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-vae-turquoise to-vae-turquoise/80 flex items-center justify-center mb-4 relative z-10 shadow-lg shadow-vae-turquoise/20">
                                              <MaterialIcon icon={phase.icon} className="text-3xl text-bg-darker" />
                                          </div>
                                          <div className="text-sm font-bold text-vae-turquoise uppercase tracking-wide">
                                              {phase.phase}
                                          </div>
                                      </div>

                                      {/* Card Content */}
                                      <div className="bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-vae-turquoise/30 transition-all duration-300 group h-full">
                                          <div className="text-center mb-6">
                                              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-vae-turquoise transition-colors duration-300">
                                                  {phase.title}
                                              </h3>
                                              <p className="text-vae-turquoise font-medium">
                                                  {phase.subtitle}
                                              </p>
                                          </div>

                                          <p className="text-text-secondary leading-relaxed mb-6 text-center">
                                              {phase.description}
                                          </p>

                                          {/* Key Points */}
                                          <div className="space-y-3">
                                              {phase.details.map((detail, detailIndex) => (
                                                  <div key={detailIndex} className="flex items-center gap-3">
                                                      <div className="w-2 h-2 rounded-full bg-vae-turquoise flex-shrink-0"></div>
                                                      <span className="text-sm text-text-muted">{detail}</span>
                                                  </div>
                                              ))}
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>

                      {/* Bottom CTA */}
                      <div className="text-center mt-16">
                          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/15">
                              <MaterialIcon icon="schedule" className="text-xl text-vae-turquoise" />
                              <span className="text-white font-medium">Durchschnittliche Projektdauer: 2-8 Wochen</span>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

      {/* 4. Pricing & Flexibility */}
      <section className="py-20 bg-bg-dark">
        <div className="container-vae">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" ref={pricingRef}>
            {/* Text Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                Fair. Flexibel. Ergebnisorientiert.
              </h2>
              <div className="space-y-6 text-lg text-text-secondary">
                <div className="flex items-start gap-4">
                  <MaterialIcon icon="check_circle" className="text-2xl text-vae-turquoise mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Meilensteinbasierte Abrechnung:</span> Sie zahlen nur, was funktioniert.
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MaterialIcon icon="tune" className="text-2xl text-vae-turquoise mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Modular & skalierbar:</span> Nicht genutzte Features lassen sich einfach ausklammern.
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MaterialIcon icon="support_agent" className="text-2xl text-vae-turquoise mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Beratung inklusive:</span> Support und konzeptionelle Begleitung sind Teil unserer Philosophie.
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MaterialIcon icon="lock_open" className="text-2xl text-vae-turquoise mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Langfristig sicher:</span> Unsere Systeme bleiben auch ohne uns nutzbar – Qualität statt Zwang.
                  </div>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/15">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <MaterialIcon icon="payments" className="text-4xl text-vae-turquoise mb-3" />
                  <h4 className="font-semibold text-white mb-2">Fair</h4>
                  <p className="text-sm text-text-muted">Nur zahlen was funktioniert</p>
                </div>
                <div className="text-center">
                  <MaterialIcon icon="settings" className="text-4xl text-vae-turquoise mb-3" />
                  <h4 className="font-semibold text-white mb-2">Flexibel</h4>
                  <p className="text-sm text-text-muted">Modular anpassbar</p>
                </div>
                <div className="text-center">
                  <MaterialIcon icon="trending_up" className="text-4xl text-vae-turquoise mb-3" />
                  <h4 className="font-semibold text-white mb-2">Ergebnisorientiert</h4>
                  <p className="text-sm text-text-muted">Messbare Erfolge</p>
                </div>
                <div className="text-center">
                  <MaterialIcon icon="security" className="text-4xl text-vae-turquoise mb-3" />
                  <h4 className="font-semibold text-white mb-2">Sicher</h4>
                  <p className="text-sm text-text-muted">Ohne Vendor-Lock-in</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Partner Section */}
      <section className="py-20 bg-bg-darker">
        <div className="container-vae">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" ref={partnerRef}>
            {/* Text Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                Mehr als ein Dienstleister – ein Partner.
              </h2>
              <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
                <p>
                  Wir sind ein junges Heidelberger Tech-Startup, aktiv in der KI- und Automatisierungsszene,
                  und vernetzt mit den Unternehmer:innen von morgen.
                </p>
                <p>
                  Wir teilen unser Wissen, geben Empfehlungen über unsere Kernprojekte hinaus
                  und bringen frische Perspektiven in Ihr Unternehmen.
                </p>
                <p>
                  Ob auf Events wie DCYPHR oder in langfristigen Kooperationen:
                  Wir bleiben nah an Innovation und helfen, dass Sie davon profitieren.
                </p>
              </div>
            </div>

            {/* Visual/Events */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/15">
                <div className="flex items-center gap-4 mb-4">
                  <MaterialIcon icon="event" className="text-2xl text-vae-turquoise" />
                  <h3 className="text-xl font-bold text-white">Events & Networking</h3>
                </div>
                <p className="text-text-secondary mb-4">
                  Aktiv bei DCYPHR und anderen Tech-Events in der Region
                </p>
                <div className="flex gap-2">
                  <span className="bg-vae-turquoise/15 text-vae-turquoise px-3 py-1 rounded-full text-sm font-medium">
                    DCYPHR
                  </span>
                  <span className="bg-vae-turquoise/15 text-vae-turquoise px-3 py-1 rounded-full text-sm font-medium">
                    Tech Meetups
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/15">
                <div className="flex items-center gap-4 mb-4">
                  <MaterialIcon icon="location_on" className="text-2xl text-vae-turquoise" />
                  <h3 className="text-xl font-bold text-white">Heidelberg Tech-Scene</h3>
                </div>
                <p className="text-text-secondary">
                  Verwurzelt in der Region, vernetzt mit der Startup-Szene
                </p>
              </div>

              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/15">
                <div className="flex items-center gap-4 mb-4">
                  <MaterialIcon icon="share" className="text-2xl text-vae-turquoise" />
                  <h3 className="text-xl font-bold text-white">Wissenstransfer</h3>
                </div>
                <p className="text-text-secondary">
                  Open Source, offene Kommunikation und kontinuierlicher Austausch
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="py-20 bg-bg-dark">
        <div className="container-vae text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Bereit, Ihr Projekt zu starten?
          </h2>
          <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
            Lassen Sie uns sprechen – wir melden uns innerhalb von 24 Stunden.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleCTAClick}
              className="btn-primary text-lg px-12 py-4"
            >
              Projekt starten
            </button>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn-ghost"
            >
              <MaterialIcon icon="keyboard_arrow_up" className="mr-2" />
              Nach oben
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
