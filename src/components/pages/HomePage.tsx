import React from 'react'
import FinalCtaSection from '../sections/FinalCtaSection'
import HeroSection from '../sections/HeroSection'
import HomeProcessTeaserSection from '../sections/HomeProcessTeaserSection'
import ServicesOverviewSection from '../sections/ServicesOverviewSection'
import SocialProofSection from '../sections/SocialProofSection'
import TechStackSection from '../sections/TechStackSection'
import WhyOpenSourceSection from '../sections/WhyOpenSourceSection'
import Seo from '../ui/Seo'

/**
 * HomePage Component
 *
 * Main landing page with all sections
 */
const HomePage: React.FC = () => {
  return (
    <div className="min-h-[100dvh]">
      <Seo
        title="VAE Systems Heidelberg | Open-Source-Infrastruktur & KI"
        description="Open-Source-Arbeitsinfrastruktur aufbauen, KI-optimieren & betreuen. 3 Monate Testphase. Heidelberg & deutschlandweit."
        canonicalPath="/"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'VAE Systems UG',
            alternateName: 'Versatile AI Enhanced Systems',
            url: 'https://vae.systems',
            logo: 'https://vae.systems/App_Logo_light.svg',
            sameAs: ['https://linkedin.com/company/vae-systems', 'https://github.com/vae-systems'],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Sales',
              email: 'kontakt@vae.systems',
              availableLanguage: 'de',
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Heidelberg',
              addressRegion: 'Baden-Württemberg',
              addressCountry: 'DE',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'VAE Systems UG',
            image: 'https://vae.systems/App_Logo_light.svg',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Heidelberg',
              addressRegion: 'Baden-Württemberg',
              postalCode: '69115',
              addressCountry: 'DE',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '49.3988',
              longitude: '8.6724',
            },
            url: 'https://vae.systems',
            priceRange: '€€€',
          },
        ]}
      />
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Warum Open Source */}
      <WhyOpenSourceSection />

      {/* 3. Tech Stack */}
      <TechStackSection />

      {/* 4. Services Überblick */}
      <ServicesOverviewSection />

      {/* 5. Social Proof */}
      <SocialProofSection />

      {/* 6. Prozess */}
      <HomeProcessTeaserSection className="pt-0" />

      {/* 7. Abschluss */}
      <FinalCtaSection />
    </div>
  )
}

export default HomePage
