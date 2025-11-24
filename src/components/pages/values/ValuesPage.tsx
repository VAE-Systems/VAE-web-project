import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import { CTASection } from '@/components/pages/values/CTASection'
import { ValueSection } from '@/components/pages/values/ValueSection'
import { VisionSection } from '@/components/pages/values/VisionSection'
import Icon from '@/components/ui/Icon'
import Seo from '@/components/ui/Seo'
import { HERO_COPY, VALUES_DATA } from '@/content/shared/valuesData'
import React from 'react'

const VALUES_BREADCRUMBS = [
  { label: 'Home', path: '/' },
  { label: 'Über uns' },
  { label: 'Werte', path: '/ueber-uns/werte' },
]

const ValuesPage: React.FC = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Unsere Werte / Vision | VAE Systems',
    description:
      'Was VAE Systems antreibt: Transparenz, Unabhängigkeit, Liebe zum Detail und eine klare Vision für resiliente Infrastruktur.',
    mainEntity: VALUES_DATA.map(value => ({
      '@type': 'DefinedTerm',
      name: value.title,
      description: value.deepDive,
      keywords: value.seoKeywords.join(', '),
      url: value.link?.href,
    })),
  }

  return (
    <div className="bg-bg-darker text-text-light">
      <Seo
        title="Unsere Werte / Vision | VAE Systems"
        description="Transparenz, Kommunikation, Unabhängigkeit und Skalierbarkeit – die Werte von VAE Systems, die jede Zusammenarbeit prägen."
        canonicalPath="/ueber-uns/werte"
        jsonLd={jsonLd}
      />
      <Breadcrumbs items={VALUES_BREADCRUMBS} className="mb-4" />

      {/* Hero - Konsistentes Design wie Referenzen-Seite */}
      <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-bg-darker to-bg-dark dark:border-white/5">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.18),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.28),transparent_55%)]"
          aria-hidden="true"
        />
        <div className="container-vae relative flex min-h-[40vh] flex-col items-center justify-center gap-6 py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise">
            Unsere Werte
          </span>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-text-light md:text-5xl">
            {HERO_COPY.title}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-text-secondary">{HERO_COPY.subheading}</p>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-text-secondary/80">{HERO_COPY.body}</p>
          <p className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-4 py-2 text-sm text-text-secondary dark:border-white/10 dark:bg-white/5">
            <Icon name="task_alt" className="h-4 w-4 text-vae-turquoise" />
            Verbindliche Verantwortung, nachvollziehbare Entscheidungen
          </p>
        </div>
      </section>

      {VALUES_DATA.map((value, index) => (
        <ValueSection key={value.id} value={value} index={index} />
      ))}

      <CTASection />
      <VisionSection />
    </div>
  )
}

export default ValuesPage
