import { Value } from '@/data/valuesData'
import React from 'react'
import { Link } from 'react-router-dom'
import { useFadeIn } from './useFadeIn'

interface ValueSectionProps {
  value: Value
  index: number
}

export const ValueSection: React.FC<ValueSectionProps> = ({ value, index }) => {
  const { ref, isVisible } = useFadeIn({ threshold: 0.2 })
  const isEven = index % 2 === 0
  const [rawPrimary, descriptor] = value.title.split(' — ')
  const primaryPart = rawPrimary?.trim() || value.title
  const descriptorText = descriptor?.trim()
  const primarySegments = primaryPart
    .split('&')
    .map(segment => segment.trim())
    .filter(Boolean)

  const descriptorLineClass = `h-[3px] w-full rounded-full transition-transform duration-700 ease-out will-change-transform ${
    isEven ? 'origin-left bg-gradient-to-r' : 'origin-right bg-gradient-to-l'
  } from-vae-turquoise via-vae-turquoise/70 to-transparent ${
    isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
  } motion-reduce:scale-x-100 motion-reduce:opacity-100`
  const introTextClasses = `max-w-2xl text-base leading-relaxed text-text-secondary/80 md:text-lg ${
    isEven ? '' : 'lg:self-end lg:text-right'
  }`
  const linkAlignment = isEven ? 'self-start' : 'self-end lg:self-end'

  const renderReadMoreLink = () => {
    if (!value.link) {
      return null
    }

    const isExternalLink = value.link.external ?? /^https?:/i.test(value.link.href)
    const className = `btn-ghost inline-flex items-center gap-2 ${linkAlignment}`
    const content = (
      <>
        {value.link.text}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`transition-transform duration-300 ${isEven ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'} motion-reduce:transition-none`}
        >
          <path d="M7 17L17 7" />
          <path d="M8 7h9v9" />
        </svg>
      </>
    )

    if (isExternalLink) {
      return (
        <a href={value.link.href} target="_blank" rel="noreferrer noopener" className={className}>
          {content}
        </a>
      )
    }

    return (
      <Link to={value.link.href} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <section
      ref={ref}
      aria-labelledby={`${value.id}-title`}
      className={`group relative isolate overflow-hidden border-t border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker py-24 transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:transition-none ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(var(--color-vae-turquoise-rgb),0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_top,_rgba(var(--color-vae-turquoise-rgb),0.14),transparent_55%)]" />
        <div className="absolute inset-x-0 -top-20 h-32 bg-gradient-to-b from-black/5 via-transparent to-transparent dark:from-black/40" />
        <div className="absolute inset-x-0 -bottom-16 h-40 bg-gradient-to-t from-black/5 via-transparent to-transparent dark:from-black/40" />
        <div className="dark:via-white/7 absolute inset-x-16 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
        <div className="absolute inset-[-2px] rounded-[48px] border border-black/5 opacity-30 dark:border-white/5 dark:opacity-20" />
        <div
          className={`absolute ${isEven ? '-right-24' : '-left-24'} top-8 h-72 w-72 rounded-full bg-vae-turquoise/30 opacity-40 blur-[120px] motion-safe:animate-[pulse_12s_ease-in-out_infinite] dark:bg-vae-turquoise/20 dark:opacity-60`}
        />
        <div
          className={`absolute ${isEven ? '-left-16' : '-right-16'} bottom-10 h-48 w-48 rounded-full bg-[hsla(var(--color-vae-turquoise),0.15)] opacity-40 blur-[100px] motion-safe:animate-[pulse_15s_ease-in-out_infinite] dark:bg-[hsla(var(--color-vae-turquoise),0.25)]`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0)_60%)] opacity-10 mix-blend-soft-light dark:bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_60%)] dark:opacity-25" />
      </div>

      <div className="container-vae relative grid gap-12 lg:grid-cols-[1.05fr_1.15fr] lg:items-start">
        <div className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <div
            className={`relative flex flex-col gap-6 rounded-[28px] border border-vae-turquoise/20 bg-white px-8 py-10 text-vae-black shadow-lg dark:border-white/5 dark:bg-white/[0.02] dark:text-text-light dark:shadow-[0_30px_70px_rgba(0,0,0,0.45)] ${
              isEven ? 'items-start text-left lg:mr-6' : 'items-end text-right lg:ml-6'
            }`}
          >
            <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-vae-turquoise/10 dark:border-white/5 dark:opacity-40" />
            <div
              className={`pointer-events-none absolute ${isEven ? 'left-6' : 'right-6'} top-6 h-16 w-16 rounded-full bg-vae-turquoise/20 blur-3xl dark:bg-vae-turquoise/10`}
            />
            <div className="relative flex w-full items-center gap-4 text-vae-turquoise/80">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/90">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.35em]">Wert {index + 1}</p>
              <span
                className={`hidden h-px flex-1 ${
                  isEven
                    ? 'bg-gradient-to-r from-vae-turquoise/40 to-transparent'
                    : 'bg-gradient-to-l from-vae-turquoise/40 to-transparent'
                } md:block`}
              />
            </div>
            <h2
              id={`${value.id}-title`}
              className="relative text-balance text-3xl font-semibold leading-tight text-text-light md:text-4xl lg:text-5xl"
            >
              <span
                className={`inline-flex flex-wrap gap-2 ${
                  isEven ? 'justify-start text-left' : 'justify-end text-right'
                } w-full`}
              >
                {primarySegments.length > 0 ? (
                  primarySegments.map((segment, segmentIndex) => (
                    <React.Fragment key={`${value.id}-primary-${segment}-${segmentIndex}`}>
                      <span className="inline-flex flex-wrap gap-1 text-balance">{segment}</span>
                      {segmentIndex < primarySegments.length - 1 && (
                        <span className="px-1 text-text-secondary/70">&</span>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <span className="inline-flex flex-wrap gap-1 text-balance">{primaryPart}</span>
                )}
              </span>
            </h2>
            {descriptorText && (
              <div className={`flex w-full flex-col gap-2 ${isEven ? 'text-left' : 'text-right'}`}>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-text-secondary/70 md:text-base">
                  — {descriptorText}
                </p>
                <span className={descriptorLineClass} />
              </div>
            )}
            <p className={introTextClasses}>{value.intro}</p>
            {renderReadMoreLink()}
          </div>
        </div>
        <div
          className={`relative overflow-hidden rounded-[32px] border border-vae-turquoise/20 bg-white p-10 text-vae-black shadow-lg transition duration-500 group-hover:-translate-y-1 group-hover:border-vae-turquoise/40 motion-reduce:transform-none motion-reduce:transition-none dark:border-white/10 dark:bg-white/[0.04] dark:text-text-light dark:shadow-[0_30px_80px_rgba(0,0,0,0.45)] dark:group-hover:shadow-[0_35px_90px_rgba(0,0,0,0.55)] ${
            isEven ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div
              className={`absolute inset-0 ${
                isEven
                  ? 'bg-[linear-gradient(135deg,rgba(15,23,42,0.04)_0%,rgba(15,23,42,0)_70%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_70%)]'
                  : 'bg-[linear-gradient(225deg,rgba(15,23,42,0.04)_0%,rgba(15,23,42,0)_70%)] dark:bg-[linear-gradient(225deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_70%)]'
              }`}
            />
            <div className="absolute inset-6 rounded-[28px] border border-vae-turquoise/10 dark:border-white/5" />
            <div
              className={`absolute ${isEven ? 'right-6' : 'left-6'} top-6 h-24 w-24 rounded-full bg-vae-turquoise/15 blur-[90px] dark:bg-vae-turquoise/10`}
            />
          </div>
          <div className="relative space-y-8">
            {value.benefits.length > 0 && (
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/70">
                  Konkreter Nutzen
                </p>
                <ul className="space-y-4">
                  {value.benefits.map(benefit => (
                    <li key={benefit} className="flex items-start gap-3 text-base leading-relaxed text-text-secondary">
                      <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 text-vae-turquoise">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12l4 4L19 6" />
                        </svg>
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className={`flex flex-wrap gap-2 pt-2 ${isEven ? '' : 'justify-end'}`} aria-label="SEO-Schlagworte">
              {value.seoKeywords.map((keyword, keywordIndex) => (
                <span
                  key={keyword}
                  className={`rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-text-secondary/80 transition duration-300 dark:border-white/15 dark:bg-white/[0.04] ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
                  } hover:border-vae-turquoise/50 hover:text-text-light motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none`}
                  style={{ transitionDelay: `${150 + keywordIndex * 60}ms` }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
