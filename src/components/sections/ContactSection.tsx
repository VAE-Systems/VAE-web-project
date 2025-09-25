import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContactForm } from '../../hooks/useContactForm'

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const contactInfoRef = useRef<HTMLDivElement>(null)

  // Contact form logic mit unserem neuen Hook
  const { formData, updateField, submitForm, canSubmit, hasErrors, isSubmitting, loadingState } = useContactForm({
    onSuccess: submissionId => {
      console.log('Contact form submitted successfully:', submissionId)
    },
    onError: error => {
      console.error('Contact form submission error:', error)
    },
    useMockApi: true,
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
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: true,
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Form Animation mit scrub
      gsap.fromTo(
        formRef.current,
        {
          opacity: 0,
          x: -80,
        },
        {
          opacity: 1,
          x: 0,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: true,
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Contact Info Animation mit scrub
      gsap.fromTo(
        contactInfoRef.current,
        {
          opacity: 0,
          x: 80,
        },
        {
          opacity: 1,
          x: 0,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: true,
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const contactInfo = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      label: 'Email',
      value: 'info@vae.systems',
      link: 'mailto:info@vae.systems',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
      label: 'Telefon',
      value: '+49 (0) 151 730 24549',
      link: 'tel:+4915173024549',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      label: 'Standort',
      value: 'Heidelberg/Eppelheim, Deutschland',
      link: null,
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      label: 'Geschäftszeiten',
      value: 'Mo-Fr: 9:00-18:00',
      link: null,
    },
  ]

  return (
    <section id="contact" className="relative bg-bg-dark py-20" ref={sectionRef}>
      {/* Background Effects */}
      <div className="bg-contact-radial pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-16 text-center" ref={headerRef}>
          <h2 className="h2 heading-gradient mb-4">Kontakt</h2>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-text-secondary">
            Bereit für Ihr nächstes Projekt? Lassen Sie uns über Ihre Anforderungen sprechen.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Contact Form */}
          <div
            className="rounded-2xl border border-vae-turquoise/20 bg-gradient-to-br from-vae-turquoise/10 to-vae-turquoise/5 p-8 backdrop-blur-xl"
            ref={formRef}
          >
            <h3 className="mb-6 text-2xl font-semibold text-text-light">Nachricht senden</h3>

            {/* Original Design mit neuer Backend-Logik */}
            <form
              onSubmit={e => {
                e.preventDefault()
                submitForm()
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="w-full">
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-secondary">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={e => updateField('name', e.target.value)}
                    required
                    className="w-full rounded-lg border border-vae-turquoise/20 bg-vae-turquoise/5 px-4 py-3 text-text-light placeholder-text-muted transition-colors focus:border-vae-turquoise focus:outline-none focus:ring-1 focus:ring-vae-turquoise"
                    placeholder="Ihr Name"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-secondary">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={e => updateField('email', e.target.value)}
                    required
                    className="w-full rounded-lg border border-vae-turquoise/20 bg-vae-turquoise/5 px-4 py-3 text-text-light placeholder-text-muted transition-colors focus:border-vae-turquoise focus:outline-none focus:ring-1 focus:ring-vae-turquoise"
                    placeholder="ihre.email@unternehmen.de"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="w-full">
                  <label htmlFor="company" className="mb-2 block text-sm font-medium text-text-secondary">
                    Unternehmen
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company || ''}
                    onChange={e => updateField('company', e.target.value)}
                    className="w-full rounded-lg border border-vae-turquoise/20 bg-vae-turquoise/5 px-4 py-3 text-text-light placeholder-text-muted transition-colors focus:border-vae-turquoise focus:outline-none focus:ring-1 focus:ring-vae-turquoise"
                    placeholder="Ihr Unternehmen"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-text-secondary">
                    Betreff
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject || ''}
                    onChange={e => updateField('subject', e.target.value)}
                    className="w-full rounded-lg border border-vae-turquoise/20 bg-vae-turquoise/5 px-4 py-3 text-text-light placeholder-text-muted transition-colors focus:border-vae-turquoise focus:outline-none focus:ring-1 focus:ring-vae-turquoise"
                    placeholder="Worum geht es?"
                  />
                </div>
              </div>

              <div className="w-full">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-text-secondary">
                  Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={e => updateField('message', e.target.value)}
                  required
                  rows={6}
                  className="w-full resize-none rounded-lg border border-vae-turquoise/20 bg-vae-turquoise/5 px-4 py-3 text-text-light placeholder-text-muted transition-colors focus:border-vae-turquoise focus:outline-none focus:ring-1 focus:ring-vae-turquoise"
                  placeholder="Beschreiben Sie Ihr Projekt oder Ihre Anfrage..."
                />
              </div>

              {/* Error Display */}
              {hasErrors && (
                <div className="text-center text-sm text-red-400">❌ Bitte füllen Sie alle Pflichtfelder aus.</div>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full rounded-lg bg-vae-turquoise px-6 py-3 font-semibold text-bg-darker transition-all duration-300 hover:-translate-y-1 hover:bg-vae-turquoise-dark hover:shadow-lg hover:shadow-vae-turquoise/30 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
              </button>

              {loadingState === 'success' && (
                <div className="text-center text-sm text-green-400">
                  ✅ Nachricht erfolgreich gesendet! Wir melden uns schnellstmöglich zurück.
                </div>
              )}

              {loadingState === 'error' && (
                <div className="text-center text-sm text-red-400">
                  ❌ Fehler beim Senden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8" ref={contactInfoRef}>
            <div>
              <h3 className="mb-6 text-2xl font-semibold text-text-light">Kontaktinformationen</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-vae-turquoise/20 to-vae-turquoise/10 text-vae-turquoise">
                      {info.icon}
                    </div>
                    <div>
                      <div className="mb-1 text-sm text-text-muted">{info.label}</div>
                      {info.link ? (
                        <a href={info.link} className="text-text-light transition-colors hover:text-vae-turquoise">
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-text-light">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Response Promise */}
            <div className="rounded-2xl border border-vae-turquoise/20 bg-gradient-to-r from-vae-turquoise/10 to-vae-turquoise/5 p-6">
              <h4 className="mb-2 text-lg font-semibold text-text-light">Schnelle Antwort garantiert</h4>
              <p className="text-sm text-text-secondary">
                Wir antworten innerhalb von 24 Stunden auf alle Anfragen. Bei dringenden Anliegen rufen Sie uns gerne
                direkt an.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
