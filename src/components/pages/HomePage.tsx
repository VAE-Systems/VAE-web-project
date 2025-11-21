import React from 'react'
import FinalCtaSection from '../sections/FinalCtaSection'
import HeroSection from '../sections/HeroSection'
import HomeProcessTeaserSection from '../sections/HomeProcessTeaserSection'
import ServicesOverviewSection from '../sections/ServicesOverviewSection'
import SocialProofSection from '../sections/SocialProofSection'
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
        title="VAE Systems – Arbeitsinfrastruktur einrichten, AI-optimieren, betreuen"
        description="Wir bauen Ihre Open-Source-Arbeitsinfrastruktur auf, optimieren sie mit KI-Workflows und betreuen sie langfristig – inklusive 3-monatiger Testphase."
        canonicalPath="/"
      />
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Warum Open Source */}
      <WhyOpenSourceSection />

      {/* 3. Services Überblick */}
      <ServicesOverviewSection />

      {/* 4. Social Proof */}
      <SocialProofSection />

      {/* 5. Prozess */}
      <HomeProcessTeaserSection className="pt-0" />

      {/* 6. Abschluss */}
      <FinalCtaSection />
    </div>
  )
}

export default HomePage
