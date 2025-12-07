/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  HOME PAGE                                                                ┃
 * ┃  Landing-Seite: Der erste Eindruck. Conversion-optimiert.                 ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🗺️ SECTION-FLOW (von oben nach unten)
 * ├── 1. Hero           → Erste Aufmerksamkeit, USP, Primary CTA
 * ├── 2. WhyOpenSource  → Differenzierung, Vertrauen aufbauen
 * ├── 3. TechStack      → Technische Glaubwürdigkeit
 * ├── 4. Services       → Was wir anbieten (3er Grid)
 * ├── 5. SocialProof    → Referenzen, Zahlen, Vertrauen
 * ├── 6. ProcessTeaser  → Wie wir arbeiten (Transparenz)
 * └── 7. FinalCta       → Letzter Conversion-Push
 *
 * 📍 SEO: Schema.org Organization + LocalBusiness für Heidelberg
 */

import React from 'react'
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🚪 ORCHESTRATOR: HomePage
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const HomePage: React.FC = () => {
  return (
    <div className="min-h-[100dvh]">
      {/* 🔍 SEO: Meta + Schema.org */}
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

      {/* ── SECTION FLOW ── */}
      <HeroSection />
      <WhyOpenSourceSection />
      <TechStackSection />
      <ServicesOverviewSection />
      <SocialProofSection />
      <HomeProcessTeaserSection className="pt-0" />
      <FinalCtaSection />
    </div>
  )
}

export default HomePage
