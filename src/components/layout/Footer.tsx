import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface FooterLink {
  label: string
  to: string
}

const footerNavigation: Record<'services' | 'resources' | 'company', FooterLink[]> = {
  services: [
    { label: 'Strategieberatung', to: '/leistungen/strategie' },
    { label: 'Infrastruktur Design/Setup', to: '/leistungen/infrastruktur' },
    { label: 'Langfristige Betreuung', to: '/leistungen/betreuung' },
  ],
  resources: [
    { label: 'Blog', to: '/ressourcen/blog' },
    { label: 'Case Studies', to: '/ressourcen/case-studies' },
    { label: 'FAQ', to: '/ressourcen/faq' },
  ],
  company: [
    { label: 'Werte', to: '/ueber-uns/werte' },
    { label: 'Leitung', to: '/ueber-uns/leitung' },
    { label: 'Kontakt', to: '/contact' },
    { label: 'Impressum', to: '/impressum' },
    { label: 'Datenschutz', to: '/privacy' },
  ],
}

const contactEmail = 'info@vae.systems'

const Footer: React.FC = () => {
  const [isNewsletterNoticeOpen, setIsNewsletterNoticeOpen] = useState(false)

  const openNewsletterNotice = () => setIsNewsletterNoticeOpen(true)
  const closeNewsletterNotice = () => setIsNewsletterNoticeOpen(false)

  useEffect(() => {
    if (!isNewsletterNoticeOpen || typeof window === 'undefined') return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeNewsletterNotice()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isNewsletterNoticeOpen])

  return (
    <footer
      className="relative overflow-hidden border-t-2 border-black bg-white text-black dark:border-white dark:bg-[#020704] dark:text-white"
      role="contentinfo"
    >
      <div className="editorial-rule" />
      <div className="pointer-events-none absolute left-[-2vw] top-4 hidden select-none text-[18vw] font-black uppercase leading-none tracking-[-0.08em] text-black/[0.04] dark:text-white/[0.04] lg:block">
        END
      </div>

      <div className="container-vae relative z-10 py-14 md:py-20">
        <div className="grid gap-0 border-2 border-black dark:border-white lg:grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr]">
          <div className="border-b-2 border-black bg-black p-8 text-white dark:border-white lg:border-b-0 lg:border-r-2">
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-vae-turquoise">VAE Systems</p>
            <h2 className="mt-3 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em]">
              Infrastruktur, die bleibt.
            </h2>
            <p className="text-white/74 mt-5 max-w-md text-sm leading-relaxed">
              Strategische Beratung, Self-Hosted-Infrastruktur und KI-Workflow-Optimierung für Unternehmen, die
              Effizienz steigern und Datenkontrolle behalten wollen.
            </p>

            <div className="mt-6 grid gap-3">
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex w-fit items-center bg-vae-turquoise px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-black"
              >
                {contactEmail}
              </a>
              <div className="border-white/18 text-white/72 inline-flex w-fit items-center border px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em]">
                Made in Germany / DSGVO-konform
              </div>
            </div>
          </div>

          <div className="border-b-2 border-black bg-[#f3f5f2] p-8 dark:border-white dark:bg-[#0a120e] lg:border-b-0 lg:border-r-2">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-vae-turquoise">Services</p>
            <ul className="mt-5 space-y-3">
              {footerNavigation.services.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm font-black uppercase tracking-[0.12em] transition-colors hover:text-vae-turquoise"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b-2 border-black bg-white p-8 dark:border-white dark:bg-[#020704] lg:border-b-0 lg:border-r-2">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-vae-turquoise">Ressourcen</p>
            <ul className="mt-5 space-y-3">
              {footerNavigation.resources.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm font-black uppercase tracking-[0.12em] transition-colors hover:text-vae-turquoise"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-vae-turquoise p-8 text-black">
            <p className="text-black/58 text-[10px] font-black uppercase tracking-[0.3em]">Unternehmen</p>
            <ul className="mt-5 space-y-3">
              {footerNavigation.company.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm font-black uppercase tracking-[0.12em] transition-opacity hover:opacity-70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={openNewsletterNotice}
              className="mt-8 w-full border-2 border-black bg-black px-4 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-black"
            >
              VAE News / Beta
            </button>
          </div>
        </div>

        <div className="mt-8 border-t-2 border-black pt-6 text-center dark:border-white">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/55 dark:text-white/55">
            © {new Date().getFullYear()} VAE Systems UG (haftungsbeschränkt) / Built by VAE Systems / Last updated{' '}
            {new Date().toLocaleDateString('de-DE')}
          </p>
        </div>
      </div>

      {isNewsletterNoticeOpen && (
        <div
          className="bg-black/68 fixed inset-0 z-[1050] flex items-center justify-center px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="newsletter-locked-title"
          aria-describedby="newsletter-locked-description"
          onClick={closeNewsletterNotice}
        >
          <div
            className="w-full max-w-md border-2 border-white bg-black p-6 text-left text-white"
            role="document"
            onClick={event => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 id="newsletter-locked-title" className="text-2xl font-black uppercase tracking-[-0.04em]">
                Newsletter aktuell gesperrt
              </h3>
              <button
                type="button"
                onClick={closeNewsletterNotice}
                className="text-white/72 border border-white/20 px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em] transition-colors hover:border-vae-turquoise hover:text-vae-turquoise"
                aria-label="Hinweis schließen"
              >
                Schließen
              </button>
            </div>
            <p id="newsletter-locked-description" className="text-white/74 text-sm leading-relaxed">
              Unser Newsletter befindet sich gerade in einer geschlossenen Beta. Folge uns auf LinkedIn oder stöbere im
              Blog, bis neue Plätze frei werden.
            </p>
            <div className="mt-6 grid gap-3">
              <a
                href="https://www.linkedin.com/company/vae-systems"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-vae-turquoise px-4 py-3 text-sm font-black uppercase tracking-[0.14em] text-black"
              >
                Auf LinkedIn folgen
              </a>
              <Link
                to="/ressourcen/blog"
                onClick={closeNewsletterNotice}
                className="border-white/18 flex items-center justify-center border px-4 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition-colors hover:border-vae-turquoise hover:text-vae-turquoise"
              >
                Blog besuchen
              </Link>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer
