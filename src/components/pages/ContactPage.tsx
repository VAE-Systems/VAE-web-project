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
      <section
        className={`hero-section pb-16 pt-32 ${isLight ? 'bg-gradient-to-b from-white to-white/95' : 'bg-bg-darker'}`}
      >
        {/* Conditional overlay for light mode */}
        {!isLight && (
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/15" />
          </div>
        )}
        <div className="container-vae relative z-10 text-center">
          <h1 className="mb-6 text-4xl font-bold text-vae-turquoise md:text-6xl">{contactHero.title}</h1>
          <p className="mx-auto max-w-2xl text-xl text-text-secondary">{contactHero.subtitle}</p>
        </div>
      </section>

      {/* Pre-Contact Trust Section */}
      <section
        className={`py-24 ${isLight ? 'via-white/98 bg-gradient-to-br from-white to-white/95' : 'bg-gradient-to-br from-bg-dark via-bg-secondary to-bg-darker'}`}
      >
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-0 top-0 h-full w-full"
            style={{
              background: isLight
                ? `
                radial-gradient(circle at 20% 30%, hsla(var(--color-vae-turquoise), 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, hsla(var(--color-vae-turquoise), 0.05) 0%, transparent 50%)
              `
                : `
                radial-gradient(circle at 20% 30%, hsla(var(--color-vae-turquoise), 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, hsla(var(--color-vae-turquoise), 0.03) 0%, transparent 50%)
              `,
            }}
          />
        </div>

        <div className="container-vae relative">
          {/* Element 1: Intro-Textblock */}
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-3xl font-bold text-text-light dark:text-white md:text-4xl">
              {contactIntro.title}
            </h2>
            <p className="mx-auto max-w-4xl text-xl leading-relaxed text-text-secondary">{contactIntro.body}</p>
          </div>

          {/* Element 2: Drei USP-Kacheln */}
          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {contactUsps.map(usp => (
              <div key={usp.key} className="group text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-vae-turquoise/20 to-vae-turquoise/10 text-vae-turquoise transition-transform duration-300 motion-safe:group-hover:scale-110">
                  <Icon name={usp.icon} className="text-vae-turquoise" size={28} />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-text-light dark:text-white">{usp.title}</h3>
                <p className="leading-relaxed text-text-secondary">{usp.body}</p>
              </div>
            ))}
          </div>

          {/* Element 3: Micro-CTA */}
          <div className="text-center">
            <div className="inline-block rounded-2xl border border-vae-turquoise/20 bg-gradient-to-r from-vae-turquoise/10 to-vae-turquoise/5 p-8">
              <h3 className="mb-2 text-2xl font-semibold text-text-light dark:text-white">{contactCta.title}</h3>
              <p className="mb-4 text-text-secondary">{contactCta.body}</p>
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
      <React.Suspense fallback={<div className="py-24 text-center text-sm text-text-muted">Lade FAQ…</div>}>
        <FAQSection />
      </React.Suspense>
    </div>
  )
}

export default ContactPage
