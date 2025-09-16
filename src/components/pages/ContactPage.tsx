import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import ContactSection from '../sections/ContactSection'
const FAQSection = React.lazy(() => import('../sections/FAQSection'))
import Seo from '../ui/Seo'
import { contactHero, contactIntro, contactUsps, contactCta } from '../../content/contact'
import Icon from '@/components/ui/Icon'

/**
 * ContactPage Component
 * 
 * Dedicated page for Contact with related sections
 */
const ContactPage: React.FC = () => {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  
  return (
    <div className="min-h-[100dvh]">
      <Seo
        title="Kontakt | VAE Systems"
        description="Starten Sie Ihr KI-Projekt mit VAE Systems. Kontaktieren Sie uns für individuelle Automatisierungs- und KI-Lösungen."
        canonicalPath="/contact"
      />
      {/* Page Hero */}
      <section className={`hero-section pt-32 pb-16 ${isLight ? 'bg-gradient-to-b from-white to-white/95' : 'bg-bg-darker'}`}>
        {/* Conditional overlay for light mode */}
        {!isLight && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/15" />
          </div>
        )}
        <div className="container-vae text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-vae-turquoise mb-6">
            {contactHero.title}
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            {contactHero.subtitle}
          </p>
        </div>
      </section>

      {/* Pre-Contact Trust Section */}
      <section className={`py-24 ${isLight ? 'bg-gradient-to-br from-white via-white/98 to-white/95' : 'bg-gradient-to-br from-bg-dark via-bg-secondary to-bg-darker'}`}>
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: isLight ? `
                radial-gradient(circle at 20% 30%, hsla(var(--color-vae-turquoise), 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, hsla(var(--color-vae-turquoise), 0.05) 0%, transparent 50%)
              ` : `
                radial-gradient(circle at 20% 30%, hsla(var(--color-vae-turquoise), 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, hsla(var(--color-vae-turquoise), 0.03) 0%, transparent 50%)
              `
            }}
          />
        </div>

        <div className="relative container-vae">
          {/* Element 1: Intro-Textblock */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-white mb-6">
              {contactIntro.title}
            </h2>
            <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
              {contactIntro.body}
            </p>
          </div>

          {/* Element 2: Drei USP-Kacheln */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactUsps.map(usp => (
              <div key={usp.key} className="group text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-vae-turquoise/20 to-vae-turquoise/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-vae-turquoise motion-safe:group-hover:scale-110 transition-transform duration-300">
                  <Icon name={usp.icon} className="text-vae-turquoise" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-text-light dark:text-white mb-4">
                  {usp.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {usp.body}
                </p>
              </div>
            ))}
          </div>

          {/* Element 3: Micro-CTA */}
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-vae-turquoise/10 to-vae-turquoise/5 rounded-2xl p-8 border border-vae-turquoise/20">
              <h3 className="text-2xl font-semibold text-text-light dark:text-white mb-2">
                {contactCta.title}
              </h3>
              <p className="text-text-secondary mb-4">
                {contactCta.body}
              </p>
              <div className="flex items-center justify-center text-vae-turquoise">
                <span className="mr-2">{contactCta.prompt}</span>
                <Icon name="keyboard_arrow_down" className="animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* FAQ Section */}
      <React.Suspense fallback={<div className="py-24 text-center text-text-muted text-sm">Lade FAQ…</div>}>
        <FAQSection />
      </React.Suspense>
    </div>
  )
}

export default ContactPage
