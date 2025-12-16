/**
 * Partner Profile Section
 * Design identisch zu LeaderProfileSection
 */
import { useFadeIn } from '@/components/pages/values/useFadeIn'
import MagneticButton from '@/components/ui/buttons/MagneticButton'
import { PartnerProfile } from '@/content/shared/teamNetworkData'
import { Linkedin, Mail, UserPlus } from 'lucide-react'
import React, { useMemo } from 'react'

interface PartnerProfileSectionProps {
  partner: PartnerProfile
  alignment?: 'left' | 'right'
}

export const PartnerProfileSection: React.FC<PartnerProfileSectionProps> = ({ partner, alignment = 'left' }) => {
  const { ref, isVisible } = useFadeIn({ threshold: 0.2 })
  const isRightAligned = alignment === 'right'
  const infoColumnOrder = isRightAligned ? 'lg:order-2 lg:pl-14' : 'lg:order-1 lg:pr-14'
  const cardColumnOrder = isRightAligned ? 'lg:order-1' : 'lg:order-2'
  const portraitFallback = partner.portrait.fallback ?? partner.portrait.src
  const backgroundParagraphs = useMemo(
    () => partner.background.split(' — ').map(chunk => chunk.trim()),
    [partner.background]
  )

  return (
    <section
      ref={ref}
      aria-labelledby={`${partner.id}-title`}
      className={`relative z-0 border-t border-white/5 bg-bg-darker py-20 transition duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="container-vae grid gap-12 lg:grid-cols-[1.15fr_0.95fr] lg:items-center">
        <div className={`space-y-6 ${infoColumnOrder}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/70">
            {partner.badge || 'Partner Story'}
          </p>
          <h2
            id={`${partner.id}-title`}
            className={`text-3xl font-semibold md:text-4xl lg:text-5xl ${
              partner.isPlaceholder ? 'text-text-muted' : 'text-text-light'
            }`}
          >
            {partner.showTitle === false || !partner.title ? partner.name : `${partner.name} — ${partner.title}`}
          </h2>
          <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-text-muted">
            {partner.roleTag}
          </span>
          <div
            className={`space-y-4 text-base leading-relaxed ${partner.isPlaceholder ? 'text-text-muted/70' : 'text-text-light/80'}`}
          >
            {backgroundParagraphs.map(paragraph => (
              <p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>

          {/* Expertise */}
          {partner.expertise && partner.expertise.length > 0 && !partner.isPlaceholder && (
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-vae-turquoise/80">Expertise</p>
              <ul className="mt-3 space-y-2 text-sm text-text-light/75">
                {partner.expertise.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-[0.4rem] h-1.5 w-1.5 rounded-full bg-vae-turquoise" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4">
            {partner.location && <p className="text-sm text-text-muted">Standort: {partner.location}</p>}
            <div className="flex flex-col gap-2 sm:flex-row">
              {partner.linkedin && !partner.isPlaceholder && (
                <MagneticButton className="flex-1">
                  <a
                    href={partner.linkedin.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={partner.linkedin.text}
                    className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold"
                  >
                    <Linkedin className="h-5 w-5" />
                    LinkedIn
                  </a>
                </MagneticButton>
              )}
              {partner.email && !partner.isPlaceholder && (
                <MagneticButton className="flex-1">
                  <a
                    href={`mailto:${partner.email}`}
                    aria-label={`E-Mail an ${partner.name} senden`}
                    className="btn-outline inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold"
                  >
                    <Mail className="h-5 w-5" />
                    E-Mail
                  </a>
                </MagneticButton>
              )}
              {partner.isPlaceholder && (
                <MagneticButton className="flex-1">
                  <a
                    href="https://nc.intern.vae.systems/apps/calendar/appointment/fkYPGJC7342e"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-semibold"
                  >
                    <UserPlus className="h-5 w-5" />
                    Partner werden
                  </a>
                </MagneticButton>
              )}
            </div>
            {partner.seoKeywords && partner.seoKeywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {partner.seoKeywords.map(keyword => (
                  <span
                    key={keyword}
                    className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-text-muted transition duration-300 hover:-translate-y-0.5 hover:border-vae-turquoise/60 hover:text-text-light"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <aside className={`flex flex-col gap-6 ${cardColumnOrder}`}>
          <figure
            className={`group relative overflow-hidden rounded-[32px] border shadow-[0_18px_50px_rgba(0,0,0,0.12)] transition-all duration-500 dark:shadow-[0_18px_50px_rgba(7,15,25,0.55)] ${
              partner.isPlaceholder
                ? 'border-white/5 bg-white/[0.02]'
                : 'border-black/8 bg-transparent dark:border-white/10'
            }`}
          >
            <picture>
              <source srcSet={partner.portrait.src} type="image/webp" />
              <img
                src={portraitFallback}
                alt={partner.portrait.alt}
                loading="lazy"
                className={`h-[560px] w-full scale-[1.02] object-cover object-[40%_20%] transition-all duration-[900ms] ease-out sm:h-[620px] ${
                  partner.isPlaceholder
                    ? 'opacity-30 grayscale'
                    : 'group-hover:contrast-105 group-hover:saturate-110 group-hover:scale-[1.05] group-hover:brightness-110 motion-reduce:transition-none dark:group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                }`}
              />
            </picture>
            {/* Subtiler Vignette-Effekt für natürlichen Bildrand-Fokus */}
            <div className="bg-gradient-radial pointer-events-none absolute inset-0 from-transparent via-transparent to-black/20 opacity-60 transition-opacity duration-500 group-hover:opacity-40 dark:to-black/30 dark:opacity-70" />
            {/* Bottom Fade-Out für abgeschnittenes Bild */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 via-black/10 to-transparent dark:from-black/60 dark:via-black/20" />

            {/* Placeholder Overlay */}
            {partner.isPlaceholder && (
              <div className="absolute inset-0 flex items-center justify-center bg-bg-darker/60">
                <div className="text-center">
                  <UserPlus className="mx-auto h-12 w-12 text-vae-turquoise/40" />
                  <p className="mt-3 text-sm font-medium text-text-muted">Demnächst</p>
                </div>
              </div>
            )}
            <figcaption className="sr-only">{partner.portrait.alt}</figcaption>
          </figure>
        </aside>
      </div>
    </section>
  )
}
