import React, { Suspense } from 'react'
import {
  FinalCtaSection,
  HeroSection,
  HomeProcessTeaserSection,
  ServicesOverviewSection,
  SocialProofSection,
  TechStackSection,
  WhyOpenSourceSection,
} from '../sections'
import Seo from '../ui/Seo'

const StorySection = React.lazy(() => import('../sections/story/StorySection'))

const HomePage: React.FC = () => {
  return (
    <div className="relative z-0 min-h-[100dvh]">
      <Seo
        title="VAE Systems | Self-Hosted Infrastruktur & AI-Ready Architektur"
        description="Self-Hosted Infrastruktur für volle Datenkontrolle. Open Source, DSGVO-konform, AI-ready. Strategie, Setup & Betreuung aus einer Hand. Heidelberg & deutschlandweit."
        canonicalPath="/"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'VAE Systems UG',
            alternateName: 'Versatile AI Enhanced Systems',
            url: 'https://vae-systems.com',
            logo: 'https://vae-systems.com/App_Logo_light.svg',
            sameAs: ['https://linkedin.com/company/vae-systems', 'https://github.com/vae-systems'],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Sales',
              email: 'info@vae.systems',
              availableLanguage: 'de',
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Heidelberg',
              addressRegion: 'Baden-Württemberg',
              addressCountry: 'DE',
            },
          },
        ]}
      />

      {/* HeroSection hat bereits diagonalen unteren Abschluss via clipPath */}
      <HeroSection />

      {/* StorySection: diagonal oben überlappend */}
      <div className="diagonal-section-wrap" style={{ position: 'relative', zIndex: 2, marginTop: '-3vw' }}>
        <Suspense fallback={<div className="h-32" />}>
          <StorySection />
        </Suspense>
      </div>

      {/* WhyOpenSource: diagonal oben */}
      <div style={{ position: 'relative', zIndex: 3, marginTop: '-3vw' }}>
        <WhyOpenSourceSection />
      </div>

      {/* ServicesOverview: diagonal oben */}
      <div style={{ position: 'relative', zIndex: 4, marginTop: '-3vw' }}>
        <ServicesOverviewSection />
      </div>

      <div style={{ position: 'relative', zIndex: 5 }}>
        <SocialProofSection />
      </div>
      <TechStackSection />
      <HomeProcessTeaserSection className="pt-0" />
      <FinalCtaSection />
    </div>
  )
}

export default HomePage
