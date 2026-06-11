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
  const [newsletterEmail, setNewsletterEmail] = useState('')

  const openNewsletterNotice = () => setIsNewsletterNoticeOpen(true)
  const closeNewsletterNotice = () => setIsNewsletterNoticeOpen(false)
  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    openNewsletterNotice()
  }

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
      className="relative overflow-hidden border-t-2 border-text-light bg-bg-darker text-text-light dark:border-white dark:bg-bg-dark dark:text-white"
      role="contentinfo"
    >
      <div className="editorial-rule" />
      <div className="pointer-events-none absolute left-[-2vw] top-4 hidden select-none text-[18vw] font-black uppercase leading-none tracking-[-0.08em] text-black/[0.04] dark:text-white/[0.04] lg:block">
        END
      </div>

      <div className="container-vae relative z-10 py-14 md:py-20">
        <div className="grid gap-0 border-2 border-text-light dark:border-white lg:grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr]">
          <div className="bg-bg-primary border-b-2 border-text-light p-8 text-text-light dark:border-white dark:bg-bg-dark dark:text-white lg:border-b-0 lg:border-r-2">
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-vae-turquoise">VAE Systems</p>
            <h2 className="mt-3 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em]">
              Infrastruktur, die bleibt.
            </h2>
            <p className="dark:text-white/74 mt-5 max-w-md text-sm leading-relaxed text-text-secondary">
              Strategische Beratung, Self-Hosted-Infrastruktur und KI-Workflow-Optimierung für Unternehmen, die
              Effizienz steigern und Datenkontrolle behalten wollen.
            </p>

            <div className="mt-6 grid gap-3">
              <a
                href={`mailto:${contactEmail}`}
                className="btn-primary inline-flex w-fit px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em]"
              >
                {contactEmail}
              </a>
              <div className="dark:border-white/18 dark:text-white/72 inline-flex w-fit items-center rounded-xl border border-text-light/15 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-text-secondary">
                Made in Germany / DSGVO-konform
              </div>
            </div>
          </div>

          <div className="bg-bg-primary border-b-2 border-text-light p-8 text-text-light dark:border-white dark:bg-bg-dark lg:border-b-0 lg:border-r-2">
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

          <div className="bg-bg-primary border-b-2 border-text-light p-8 text-text-light dark:border-white dark:bg-bg-dark dark:text-white lg:border-b-0 lg:border-r-2">
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

          <div className="bg-bg-primary p-8 text-text-light dark:bg-bg-dark dark:text-white">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-vae-turquoise">Unternehmen</p>
            <ul className="mt-5 space-y-3">
              {footerNavigation.company.map(link => (
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

            <form className="mt-8 grid gap-3" onSubmit={handleNewsletterSubmit}>
              <label className="text-[10px] font-black uppercase tracking-[0.24em] text-text-secondary dark:text-white/60">
                VAE News / Beta
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={event => setNewsletterEmail(event.target.value)}
                  placeholder="Ihre E-Mail-Adresse"
                  className="w-full rounded-xl border border-text-light/15 bg-white px-4 py-3 text-sm text-text-light placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-vae-turquoise/60 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/35"
                  aria-label="E-Mail-Adresse für VAE News"
                />
                <button
                  type="submit"
                  className="btn-primary inline-flex items-center justify-center px-5 py-3 text-sm font-black uppercase tracking-[0.14em]"
                >
                  Eintragen
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t-2 border-text-light pt-6 text-center dark:border-white">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted dark:text-white/55">
            © {new Date().getFullYear()} VAE Systems UG (haftungsbeschränkt) / Designed by AION Projects | Julian Goertz
            Dini / Last updated {new Date().toLocaleDateString('de-DE')}
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
            className="bg-bg-primary w-full max-w-md border-2 border-text-light p-6 text-left text-text-light dark:border-white dark:bg-bg-dark dark:text-white"
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
                className="btn-ghost px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em]"
                aria-label="Hinweis schließen"
              >
                Schließen
              </button>
            </div>
            <p
              id="newsletter-locked-description"
              className="dark:text-white/74 text-sm leading-relaxed text-text-secondary"
            >
              Unser Newsletter befindet sich gerade in einer geschlossenen Beta. Folge uns auf LinkedIn oder stöbere im
              Blog, bis neue Plätze frei werden.
            </p>
            <div className="mt-6 grid gap-3">
              <a
                href="https://www.linkedin.com/company/vae-systems"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center px-4 py-3 text-sm font-black uppercase tracking-[0.14em]"
              >
                Auf LinkedIn folgen
              </a>
              <Link
                to="/ressourcen/blog"
                onClick={closeNewsletterNotice}
                className="btn-secondary flex items-center justify-center px-4 py-3 text-sm font-black uppercase tracking-[0.14em]"
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
