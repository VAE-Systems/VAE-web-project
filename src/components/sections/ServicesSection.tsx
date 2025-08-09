import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      if (reduced) {
        // Für reduced-motion: Elemente sofort sichtbar machen
        gsap.set([headerRef.current, cardsRef.current], { opacity: 1, y: 0 })
        return
      }

      // Null-Checks für alle Refs
      if (!sectionRef.current || !headerRef.current || !cardsRef.current) return

      // 1. Header Animation - scrub-basiert (bewegt sich mit Scroll)
      gsap.fromTo(headerRef.current, 
        {
          opacity: 0,
          y: 100
        },
        {
          opacity: 1,
          y: 0,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            end: "top 30%",
            scrub: 0.25, // KEIN Delay - sofort gekoppelt
            toggleActions: "play none none reverse"
          }
        }
      )

      // 2. Cards Animation - jede Karte einzeln mit scrub
      const cards = Array.from(cardsRef.current.children) as HTMLElement[]
      
      if (cards.length > 0) {
        cards.forEach((card) => {
          gsap.fromTo(card,
            {
              opacity: 0,
              y: 120,
              scale: 0.8
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "expo.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 30%",
                scrub: 0.25, // KEIN Delay - sofort gekoppelt
                toggleActions: "play none none reverse"
              }
            }
          )
        })
      }

      // 3. Section Background - parallax effect
      if (sectionRef.current) {
        gsap.to(sectionRef.current.querySelector('.background-gradient'), {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const services = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="8" height="4" x="8" y="2" rx="1" stroke="currentColor" strokeWidth="2"/>
          <path d="M4 7v8a2 2 0 0 0 2 2h8m4-16h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 13H8" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 17H8" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      badge: 'Consulting',
      title: 'Open Source Consulting',
      description: 'Maßgeschneiderte Open-Source-Lösungen mit voller Transparenz und ohne Vendor-Lock-ins. Bewährte Technologien für langfristige Planungssicherheit.',
      stats: [
        { value: '65%', desc: 'Kostenreduktion¹' },
        { value: '90%', desc: 'Entwickler bevorzugen OS²' }
      ],
      features: [
        'Volle Transparenz',
        'Keine Lizenzkosten',
        'Community-Support'
      ],
      cta: 'OS-Beratung'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      badge: 'Setup & Training',
      title: 'Setup & Training',
      description: 'Von der ersten Idee bis zur vollständigen Implementierung. Umfassende Schulungen und kontinuierlicher Support für Ihr Team.',
      stats: [
        { value: '2-4', desc: 'Wochen Setup³' },
        { value: '100%', desc: 'Team-Adoption' },
      ],
      features: [
        'Hands-on Workshops',
        'Dokumentation',
        'Langzeit-Support'
      ],
      cta: 'Training buchen'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8z" stroke="currentColor" strokeWidth="2"/>
          <path d="m3.3 7 8.7 5 8.7-5" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 22V12" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      badge: 'Startup Support',
      title: 'Startup Tech Stack',
      description: 'Kosteneffiziente, skalierbare Technologie-Infrastruktur für Startups. Von MVP bis Enterprise mit bewährten Open-Source-Tools.',
      stats: [
        { value: '80%', desc: 'Geringere Kosten⁴' },
        { value: '3x', desc: 'Schnellere Entwicklung' }
      ],
      features: [
        'MVP-optimiert',
        'Skalierbare Architektur',
        'Kostenoptimiert'
      ],
      cta: 'Startup-Paket'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      badge: 'AI & ML',
      title: 'KI-Beratung & Integration',
      description: 'Lokale KI-Modelle und robuste Workflow-Engines für maximale Kontrolle über Ihre Daten und Prozesse. Temporal-basierte Automatisierung.',
      stats: [
        { value: '340%', desc: 'ROI-Steigerung⁵' },
        { value: '60%', desc: 'Effizienzgewinn' }
      ],
      features: [
        'Temporal Workflow Engine',
        'Lokale Open-Source AI',
        'Keine Vendor-Lock-ins'
      ],
      cta: 'KI-Integration'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2"/>
          <polyline points="3.27,6.96 12,12.01 20.73,6.96" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      badge: 'Local Hosting',
      title: 'Local Hosting Solutions',
      description: 'Professionelle Container-Orchestrierung und skalierbares lokales Hosting mit Docker, Kubernetes und umfassendem Monitoring.',
      stats: [
        { value: '99.9%', desc: 'Verfügbarkeit⁶' },
        { value: '75%', desc: 'Schnellere Deployments' }
      ],
      features: [
        'Docker & Kubernetes',
        'CI/CD & GitOps',
        'Monitoring & Alerting'
      ],
      cta: 'Hosting-Lösung'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" stroke="currentColor" strokeWidth="2" fill="none"/>
          <polygon points="12,8 18,11.5 12,15 6,11.5" stroke="currentColor" strokeWidth="2" fill="none"/>
          <line x1="12" y1="15" x2="12" y2="22" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      badge: 'Coming Soon',
      title: 'VAEKTRA CORE Enterprise',
      description: 'Die ultimative All-in-One Enterprise-Lösung für lokale KI-Infrastruktur. Vereint alle unsere Services in einem nahtlos integrierten System.',
      stats: [
        { value: 'Q1', desc: '2026 Launch' },
        { value: 'All-in-One', desc: 'Enterprise Suite' }
      ],
      features: [
        'Integrierte KI-Engine',
        'Workflow-Automatisierung',
        'Enterprise-Dashboard'
      ],
      cta: 'Vorregistrierung',
      isVaektra: true
    }
  ]

  const handleServiceClick = (serviceName: string) => {
    // For now, just log - can be enhanced with routing later
    console.log(`Navigate to service: ${serviceName}`)
  }

  return (
    <section 
      id="services" 
      className="relative py-32 bg-[linear-gradient(135deg,#0b0b0b,#141414)] border-t border-white/5"
      ref={sectionRef}
    >

      <div className="container-vae">
        {/* Section Header */}
        <div className="text-center mb-16" ref={headerRef}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Unsere Services
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Enterprise-grade KI-Lösungen für maximale Effizienz und Datensouveränität
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" ref={cardsRef}>
          {services.map((service, index) => (
            <div 
              key={index}
              className={`
                group relative overflow-hidden rounded-2xl p-8 
                bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] checker-faint 
                backdrop-blur-xl border border-white/15 
                transition-all duration-300 hover:-translate-y-2 
                hover:shadow-xl hover:shadow-vae-turquoise/20
                flex flex-col h-full
                ${service.isVaektra ? 'bg-gradient-to-br from-bg-darker/90 to-vae-turquoise/20 border-vae-turquoise/30' : ''}
              `}
            >
              {/* Top Border Effect */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vae-turquoise to-vae-turquoise-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

              {/* Service Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-vae-turquoise to-vae-turquoise-dark flex items-center justify-center text-white">
                  {service.icon}
                </div>
                <div className={`
                  px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider
                  ${service.badge === 'Coming Soon' 
                    ? 'bg-vae-turquoise/15 text-vae-turquoise border border-vae-turquoise/30' 
                    : 'bg-vae-turquoise/10 text-vae-turquoise'
                  }
                  ${service.isVaektra ? 'bg-vae-turquoise/20 text-vae-turquoise' : ''}
                `}>
                  {service.badge}
                </div>
              </div>

              {/* Service Content - Flex grow for equal heights */}
              <div className="flex-grow flex flex-col">
                <h3 className={`text-xl font-semibold mb-4 leading-tight ${service.isVaektra ? 'text-white' : 'text-white'}`}>
                  {service.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-6 flex-grow ${service.isVaektra ? 'text-white/80' : 'text-text-secondary'}`}>
                  {service.description}
                </p>

                {/* Service Stats */}
                <div className={`
                  grid grid-cols-2 gap-4 p-4 rounded-lg mb-6
                  ${service.isVaektra ? 'bg-vae-turquoise/10' : 'bg-vae-turquoise/5'}
                `}>
                  {service.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="text-center">
                      <div className={`text-lg font-bold leading-tight mb-1 ${service.isVaektra ? 'text-vae-turquoise' : 'text-vae-turquoise'}`}>
                        {stat.value}
                      </div>
                      <div className={`text-xs leading-tight break-words ${service.isVaektra ? 'text-white/70' : 'text-text-muted'}`}>
                        {stat.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Feature List */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`flex items-center gap-3 text-sm ${service.isVaektra ? 'text-white/80' : 'text-text-secondary'}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`flex-shrink-0 ${service.isVaektra ? 'text-vae-turquoise' : 'text-vae-turquoise'}`}>
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service CTA - Fixed at bottom */}
              <button 
                className={`
                  w-full py-4 px-6 rounded-xl font-semibold text-sm uppercase tracking-wider
                  transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                  min-h-[48px] flex items-center justify-center
                  ${service.isVaektra 
                    ? 'bg-vae-turquoise text-bg-darker hover:bg-vae-turquoise-400 hover:shadow-vae-turquoise/30' 
                    : service.badge === 'Coming Soon'
                    ? 'border-2 border-vae-turquoise text-vae-turquoise bg-transparent hover:bg-vae-turquoise/10 hover:shadow-vae-turquoise/20'
                    : 'bg-vae-turquoise/15 text-vae-turquoise hover:bg-vae-turquoise/25 border border-vae-turquoise/40 hover:border-vae-turquoise/60'
                  }
                `}
                onClick={() => handleServiceClick(service.title)}
              >
                <span className="flex items-center gap-2">
                  {service.cta}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Source References */}
        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
          <p className="font-semibold mb-4 text-white">Quellen & Studien:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-text-muted">
            <span>¹ McKinsey Global Institute: The Age of AI (2023)</span>
            <span>² Gartner: Open Source Software Study (2024)</span>
            <span>³ Red Hat Enterprise Open Source Report (2024)</span>
            <span>⁴ TechCrunch: Startup Infrastructure Cost Analysis (2024)</span>
            <span>⁵ MIT Sloan Management Review: AI Implementation Study (2024)</span>
            <span>⁶ CNCF Annual Survey: Cloud Native Adoption (2024)</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
