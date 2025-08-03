import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const contactInfoRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      if (reduced) {
        gsap.set([headerRef.current, formRef.current, contactInfoRef.current], { opacity: 1, y: 0 })
        return
      }

      if (!sectionRef.current) return

      // Header Animation mit scrub
      gsap.fromTo(headerRef.current, 
        {
          opacity: 0,
          y: 80
        },
        {
          opacity: 1,
          y: 0,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            end: "top 70%",
            scrub: true,
            toggleActions: "play none none reverse"
          }
        }
      )

      // Form Animation mit scrub
      gsap.fromTo(formRef.current, 
        {
          opacity: 0,
          x: -80
        },
        {
          opacity: 1,
          x: 0,
          ease: "expo.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 90%",
            end: "top 70%",
            scrub: true,
            toggleActions: "play none none reverse"
          }
        }
      )

      // Contact Info Animation mit scrub
      gsap.fromTo(contactInfoRef.current, 
        {
          opacity: 0,
          x: 80
        },
        {
          opacity: 1,
          x: 0,
          ease: "expo.out",
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 90%",
            end: "top 70%",
            scrub: true,
            toggleActions: "play none none reverse"
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const services = [
    'Open Source Consulting',
    'Setup & Training',
    'Startup Tech Stack',
    'KI-Beratung & Integration',
    'Local Hosting Solutions',
    'VAEKTRA CORE Enterprise',
    'Andere Anfrage'
  ]

  const contactInfo = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
          <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: 'Email',
      value: 'info@vae.systems',
      link: 'mailto:info@vae.systems'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: 'Telefon',
      value: '+49 (0) 123 456 789',
      link: 'tel:+491234567890'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: 'Standort',
      value: 'Berlin, Deutschland',
      link: null
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: 'Geschäftszeiten',
      value: 'Mo-Fr: 9:00-18:00',
      link: null
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Hier würde normalerweise der API-Call stehen
      // Für Demo-Zwecke simulieren wir eine erfolgreiche Übertragung
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Form submitted:', formData)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section 
      id="contact" 
      className="relative py-20 bg-bg-dark"
      ref={sectionRef}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 40% 30%, hsla(var(--color-vae-turquoise), 0.08) 0%, transparent 50%),
              radial-gradient(circle at 60% 70%, hsla(var(--color-vae-turquoise), 0.05) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16" ref={headerRef}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-vae-turquoise to-vae-turquoise bg-clip-text text-transparent">
            Kontakt
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Bereit für Ihr nächstes Projekt? Lassen Sie uns über Ihre Anforderungen sprechen.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/15" ref={formRef}>
            <h3 className="text-2xl font-semibold text-white mb-6">
              Nachricht senden
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-vae-turquoise focus:ring-1 focus:ring-vae-turquoise focus:outline-none transition-colors"
                    placeholder="Ihr Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-vae-turquoise focus:ring-1 focus:ring-vae-turquoise focus:outline-none transition-colors"
                    placeholder="ihre.email@unternehmen.de"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Unternehmen
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-vae-turquoise focus:ring-1 focus:ring-vae-turquoise focus:outline-none transition-colors"
                    placeholder="Ihr Unternehmen"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                    Service
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-vae-turquoise focus:ring-1 focus:ring-vae-turquoise focus:outline-none transition-colors"
                  >
                    <option value="">Service auswählen</option>
                    {services.map((service, index) => (
                      <option key={index} value={service} className="bg-gray-800">
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-vae-turquoise focus:ring-1 focus:ring-vae-turquoise focus:outline-none transition-colors resize-none"
                  placeholder="Beschreiben Sie Ihr Projekt oder Ihre Anfrage..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-vae-turquoise hover:bg-vae-turquoise-dark text-white font-semibold rounded-lg hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-vae-turquoise/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
              </button>

              {submitStatus === 'success' && (
                <div className="text-center text-green-400 text-sm">
                  ✅ Nachricht erfolgreich gesendet! Wir melden uns schnellstmöglich zurück.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="text-center text-red-400 text-sm">
                  ❌ Fehler beim Senden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8" ref={contactInfoRef}>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">
                Kontaktinformationen
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-vae-turquoise/20 to-vae-turquoise/10 rounded-xl flex items-center justify-center text-vae-turquoise flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">
                        {info.label}
                      </div>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className="text-white hover:text-vae-turquoise transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-white">
                          {info.value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Response Promise */}
            <div className="bg-gradient-to-r from-vae-turquoise/10 to-vae-turquoise/5 rounded-2xl p-6 border border-vae-turquoise/20">
              <h4 className="text-lg font-semibold text-white mb-2">
                Schnelle Antwort garantiert
              </h4>
              <p className="text-gray-300 text-sm">
                Wir antworten innerhalb von 24 Stunden auf alle Anfragen. 
                Bei dringenden Anliegen rufen Sie uns gerne direkt an.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
