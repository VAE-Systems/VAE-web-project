import { useFadeIn } from '@/components/pages/values/useFadeIn'
import MagneticButton from '@/components/ui/buttons/MagneticButton'
import { LeaderProfile } from '@/content/shared/leadershipData'
import { ExternalLink, Linkedin, Mail } from 'lucide-react'
import React, { useMemo } from 'react'

interface LeaderProfileSectionProps {
  leader: LeaderProfile
  alignment?: 'left' | 'right'
}

export const LeaderProfileSection: React.FC<LeaderProfileSectionProps> = ({ leader, alignment = 'left' }) => {
  const { ref, isVisible } = useFadeIn({ threshold: 0.2 })
  const isRightAligned = alignment === 'right'
  const infoColumnOrder = isRightAligned ? 'lg:order-2 lg:pl-14' : 'lg:order-1 lg:pr-14'
  const cardColumnOrder = isRightAligned ? 'lg:order-1' : 'lg:order-2'
  const isJakob = leader.id === 'jakob-duennebeil'
  const scaleClasses = isJakob ? 'scale-[1.02] group-hover:scale-[1.05]' : 'scale-[0.82] group-hover:scale-[0.88]'
  const portraitFallback = leader.portrait.fallback ?? leader.portrait.src
  const backgroundParagraphs = useMemo(
    () => leader.background.split(' — ').map(chunk => chunk.trim()),
    [leader.background]
  )

  return (
    <section
      ref={ref}
      aria-labelledby={`${leader.id}-title`}
      className={`relative z-0 border-t border-white/5 bg-bg-darker py-20 transition duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="container-vae grid gap-12 lg:grid-cols-[1.15fr_0.95fr] lg:items-center">
        <div className={`space-y-6 ${infoColumnOrder}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise dark:text-vae-turquoise/70">
            Founder Story
          </p>
          <h2 id={`${leader.id}-title`} className="text-3xl font-semibold text-text-light md:text-4xl lg:text-5xl">
            {leader.name} — {leader.title}
          </h2>
          <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-text-muted">
            {leader.roleTag}
          </span>
          <div className="space-y-4 text-base leading-relaxed text-text-light/80">
            {backgroundParagraphs.map(paragraph => (
              <p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
          {/* Persönlichkeit ausgeblendet laut Vorgabe */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-vae-turquoise/80">Expertise</p>
              <ul className="mt-3 space-y-2 text-sm text-text-light/75">
                {leader.expertise.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-[0.4rem] h-1.5 w-1.5 rounded-full bg-vae-turquoise" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-vae-turquoise/80">Engagement</p>
              <ul className="mt-3 space-y-3 text-sm text-text-light/75">
                {leader.engagement.map(item => (
                  <li key={item.text} className="flex flex-col gap-1.5">
                    <div className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-vae-turquoise"
                      />
                      <span>{item.text}</span>
                    </div>
                    {item.links && item.links.length > 0 && (
                      <div className="ml-3.5 flex flex-wrap gap-1.5">
                        {item.links.map(link => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-medium text-text-light/70 transition-all duration-200 hover:border-vae-turquoise/50 hover:bg-vae-turquoise/10 hover:text-vae-turquoise"
                          >
                            <ExternalLink className="h-2.5 w-2.5" />
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-text-muted">Standort: {leader.location}</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <MagneticButton className="flex-1 sm:flex-initial">
                <a
                  href={leader.linkedin.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={leader.linkedin.text}
                  className="btn-secondary inline-flex w-full items-center justify-center gap-2 px-6 py-3 text-base font-semibold"
                >
                  <Linkedin className="h-5 w-5" />
                  LinkedIn
                </a>
              </MagneticButton>
              <MagneticButton className="flex-1 sm:flex-initial">
                <a
                  href={`mailto:${leader.email}`}
                  aria-label={`E-Mail an ${leader.name} senden`}
                  className="btn-outline inline-flex w-full items-center justify-center gap-2 px-6 py-3 text-base font-semibold"
                >
                  <Mail className="h-5 w-5" />
                  E-Mail
                </a>
              </MagneticButton>
            </div>
            <div className="flex flex-wrap gap-2">
              {leader.seoKeywords.map(keyword => (
                <span
                  key={keyword}
                  className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-text-muted transition duration-300 hover:-translate-y-0.5 hover:border-vae-turquoise/60 hover:text-text-light"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        <aside className={`flex flex-col gap-6 ${cardColumnOrder}`}>
          <figure className="border-black/12 group relative overflow-hidden rounded-[32px] border-2 bg-transparent shadow-[0_18px_50px_rgba(0,0,0,0.12)] transition-all duration-500 dark:border-white/15 dark:shadow-[0_18px_50px_rgba(7,15,25,0.55)]">
            <div className="pointer-events-none absolute inset-3 rounded-[28px] border-2 border-white/85 dark:border-white/20" />
            <picture>
              <source srcSet={leader.portrait.src} type="image/webp" />
              <img
                src={portraitFallback}
                alt={leader.portrait.alt}
                loading="lazy"
                className={`group-hover:contrast-105 group-hover:saturate-110 h-[560px] w-full ${scaleClasses} object-cover object-[40%_20%] transition-all duration-[900ms] ease-out group-hover:brightness-110 motion-reduce:transition-none dark:group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] sm:h-[620px]`}
              />
            </picture>
            {/* Subtiler Vignette-Effekt für natürlichen Bildrand-Fokus */}
            <div className="bg-gradient-radial pointer-events-none absolute inset-0 from-transparent via-transparent to-black/20 opacity-60 transition-opacity duration-500 group-hover:opacity-40 dark:to-black/30 dark:opacity-70" />
            {/* Bottom Fade-Out für abgeschnittenes Bild */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 via-black/10 to-transparent dark:from-black/60 dark:via-black/20" />
            <figcaption className="sr-only">{leader.portrait.alt}</figcaption>
          </figure>

          {/* Info-Kachel entfernt laut Vorgabe */}
        </aside>
      </div>
    </section>
  )
}
