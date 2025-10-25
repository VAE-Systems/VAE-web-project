import React from 'react'
import FinalCtaSection from '../sections/FinalCtaSection'
import HeroSection from '../sections/HeroSection'
import HomeOutcomesSection from '../sections/HomeOutcomesSection'
import HomeProcessTeaserSection from '../sections/HomeProcessTeaserSection'
import ServicesSection from '../sections/ServicesSection'
import TestphaseBanner from '../sections/TestphaseBanner'
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

      {/* 1b. Testphase Offer */}
      <TestphaseBanner />

      {/* 2. Warum & Resultate */}
      <HomeOutcomesSection className="pb-24 pt-24" />

      {/* 3. Services (Einordnung nach Problem & Proof) */}
      <ServicesSection />

      {/* 4. Prozess (Sicherheit & Transparenz des Vorgehens) */}
      <HomeProcessTeaserSection className="pt-24" />

      {/* 5. Abschluss */}
      <FinalCtaSection />
    </div>
  )
}

export default HomePage
