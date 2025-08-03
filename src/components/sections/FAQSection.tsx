import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const FAQSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const faqsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      if (reduced) {
        gsap.set([headerRef.current, faqsRef.current, ctaRef.current], { opacity: 1, y: 0 })
        return
      }

      if (!sectionRef.current) return

      const trig = { trigger: sectionRef.current, start: 'top 80%' }

      // Header Animation
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: trig
      })

      // FAQ Items Animation
      const faqItems = faqsRef.current?.children
      if (faqItems) {
        gsap.from(faqItems, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: faqsRef.current,
            start: 'top 85%'
          }
        })
      }

      // CTA Animation
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.out',
        delay: 0.5,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 90%'
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const faqs = [
    {
      category: 'Allgemein',
      questions: [
        {
          question: 'Was unterscheidet VAE Systems von anderen KI-Beratungen?',
          answer: 'Wir setzen konsequent auf Open Source Technologien und lokale Infrastrukturen. Das bedeutet: keine Vendor-Lock-ins, volle Transparenz, komplette Datensouveränität und langfristige Kostenvorteile. Zudem bieten wir nicht nur Beratung, sondern auch komplette Implementierung und langfristigen Support.'
        },
        {
          question: 'Für welche Unternehmensgrößen sind Ihre Lösungen geeignet?',
          answer: 'Unsere Lösungen skalieren von Startups bis zu Großunternehmen. Für Startups bieten wir kosteneffiziente MVP-Lösungen, die mitwachsen. Für etablierte Unternehmen entwickeln wir enterprise-grade Infrastrukturen. Unser modularer Ansatz ermöglicht es, genau die Komplexität zu wählen, die Sie benötigen.'
        },
        {
          question: 'Wie lange dauert eine typische Projektimplementierung?',
          answer: 'Das hängt vom Projektumfang ab. Ein MVP-Setup kann in 2-4 Wochen realisiert werden. Komplexe KI-Infrastrukturen benötigen 3-6 Monate. Wir arbeiten agil in Sprints, sodass Sie bereits nach wenigen Wochen erste Ergebnisse sehen und nutzen können.'
        }
      ]
    },
    {
      category: 'Technisch',
      questions: [
        {
          question: 'Welche KI-Technologien setzen Sie ein?',
          answer: 'Wir fokussieren uns auf Open Source KI-Frameworks wie Ollama, LangChain, Hugging Face Transformers und lokale LLMs. Für Workflow-Automatisierung nutzen wir Temporal. Alle Technologien können vollständig lokal betrieben werden, ohne externe API-Abhängigkeiten.'
        },
        {
          question: 'Wie gewährleisten Sie Datensicherheit und DSGVO-Compliance?',
          answer: 'Durch lokale Implementierung verlassen Ihre Daten niemals Ihre Infrastruktur. Wir implementieren umfassende Sicherheitsmaßnahmen, Verschlüsselung und Zugriffskontrolle. Unsere Lösungen sind standardmäßig DSGVO-konform, da keine Daten an Drittanbieter übertragen werden.'
        },
        {
          question: 'Unterstützen Sie auch Cloud-Deployments?',
          answer: 'Ja, wir können unsere Lösungen auch in Cloud-Umgebungen deployen. Allerdings empfehlen wir für maximale Datensouveränität lokale oder Private-Cloud-Lösungen. Bei Cloud-Deployments achten wir auf europäische Anbieter und entsprechende Compliance-Maßnahmen.'
        }
      ]
    },
    {
      category: 'Service & Support',
      questions: [
        {
          question: 'Welchen Support bieten Sie nach der Implementierung?',
          answer: '24/7 Support für kritische Systeme, regelmäßige Updates und Wartung, Schulungen für Ihr Team und kontinuierliche Optimierung. Wir sehen uns als langfristige Partner, nicht nur als Implementierer. Unser Support-Team ist deutschsprachig und in europäischen Zeitzonen verfügbar.'
        },
        {
          question: 'Bieten Sie auch Schulungen für interne Teams an?',
          answer: 'Absolut! Knowledge Transfer ist ein wichtiger Teil unserer Projekte. Wir bieten Hands-on Workshops, technische Dokumentation, Video-Tutorials und fortlaufende Mentoring-Programme. Ziel ist es, Ihr Team zu befähigen, die Systeme eigenständig zu betreiben und weiterzuentwickeln.'
        },
        {
          question: 'Wie funktioniert die Zusammenarbeit mit VAEKTRA CORE?',
          answer: 'VAEKTRA CORE ist unsere All-in-One Enterprise-Suite (Launch Q1 2026). Sie vereint alle unsere Services in einer integrierten Plattform. Aktuelle Kunden erhalten bevorzugten Zugang und können schrittweise migrieren. Die Lösung wird vollständig rückwärtskompatibel zu bestehenden Implementierungen sein.'
        }
      ]
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <section 
      id="faq" 
      className="relative py-24 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-secondary"
      ref={sectionRef}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 20% 40%, hsla(var(--color-vae-turquoise), 0.06) 0%, transparent 50%),
              radial-gradient(circle at 80% 60%, hsla(var(--color-vae-turquoise), 0.04) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16" ref={headerRef}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-vae-turquoise to-vae-turquoise bg-clip-text text-transparent">
            Häufige Fragen
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Antworten auf die wichtigsten Fragen zu unseren Services und Technologien.
          </p>
        </div>

        {/* FAQ Categories */}
        <div ref={faqsRef}>
          {faqs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              {category.category}
            </h3>
            <div className="space-y-4">
              {category.questions.map((faq, questionIndex) => {
                const faqIndex = categoryIndex * 100 + questionIndex
                const isOpen = openFAQ === faqIndex
                
                return (
                  <div 
                    key={questionIndex}
                    className="bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-xl rounded-2xl border border-white/15 overflow-hidden"
                  >
                    <button
                      className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                      onClick={() => toggleFAQ(faqIndex)}
                    >
                      <span className="text-lg font-medium text-white pr-4">
                        {faq.question}
                      </span>
                      <div className={`flex-shrink-0 w-6 h-6 text-vae-turquoise transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-8 pb-6">
                        <div className="text-gray-300 leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-16 text-center" ref={ctaRef}>
          <div className="bg-gradient-to-r from-vae-turquoise/10 to-vae-turquoise/5 rounded-2xl p-8 border border-vae-turquoise/20">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Noch Fragen?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Wir beantworten gerne alle Ihre Fragen in einem persönlichen Gespräch. 
              Kontaktieren Sie uns für eine unverbindliche Beratung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-vae-turquoise hover:bg-vae-turquoise-dark text-white px-8 py-3 rounded-lg font-semibold hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-vae-turquoise/30">
                Beratungstermin buchen
              </button>
              <a 
                href="mailto:info@vae.systems"
                className="border border-vae-turquoise text-vae-turquoise px-8 py-3 rounded-lg font-semibold hover:bg-vae-turquoise/10 transition-all duration-300 inline-block"
              >
                Direkt per Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
