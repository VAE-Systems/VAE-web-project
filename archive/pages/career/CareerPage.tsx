import React from 'react'
import Seo from '@/components/ui/Seo'
import { CareerHero } from './CareerHero'
import { PrinciplesSection } from './PrinciplesSection'
import { OpenRolesSection } from './OpenRolesSection'
import { NetworkSection } from './NetworkSection'

const CareerPage: React.FC = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Karriere bei VAE Systems',
    description:
      'Talente, die VAE Systems prägen – selektive Zusammenarbeit mit Software Engineers, Infrastruktur-Expert:innen und Technical Leads.',
  }

  return (
    <div className="bg-bg-darker text-text-light">
      <Seo
        title="Karriere | VAE Systems"
        description="Wir arbeiten nur mit Profis zusammen, die Qualität über alles stellen. Erfahre, was wir suchen und wie du Teil des Netzwerks wirst."
        canonicalPath="/ueber-uns/karriere"
        jsonLd={jsonLd}
      />

      <CareerHero />
      <PrinciplesSection />
      <OpenRolesSection />
      <NetworkSection />
    </div>
  )
}

export default CareerPage
