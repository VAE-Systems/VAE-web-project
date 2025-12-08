/**
 * Team & Netzwerk Seite
 * Zeigt Kooperationspartner/Freelancer (ohne Gründer – die sind auf /ueber-uns/leitung)
 */
import Seo from '@/components/ui/Seo'
import { PARTNERS, TEAM_NETWORK_HERO } from '@/content/shared/teamNetworkData'
import React from 'react'
import { PartnerProfileSection, TeamNetworkCTA, TeamNetworkHero } from './team'

const TeamNetworkPage: React.FC = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Team & Netzwerk | VAE Systems',
    description: TEAM_NETWORK_HERO.body,
    mainEntity: [
      // Partners (nur echte, keine Platzhalter)
      ...PARTNERS.filter(p => !p.isPlaceholder).map(partner => ({
        '@type': 'Person',
        name: partner.name,
        jobTitle: partner.title,
        description: partner.background,
        sameAs: partner.linkedin ? [partner.linkedin.href] : [],
      })),
    ],
  }

  return (
    <div className="relative z-0 bg-bg-darker text-text-light">
      <Seo
        title="Team & Netzwerk | VAE Systems"
        description="Lernen Sie unser Netzwerk kennen: Freelancer und Partner, die VAE Systems mit spezifischer Expertise ergänzen."
        canonicalPath="/ueber-uns/team"
        jsonLd={jsonLd}
      />

      {/* Hero Section */}
      <TeamNetworkHero />

      {/* Partner Profiles */}
      {PARTNERS.map((partner, index) => (
        <PartnerProfileSection key={partner.id} partner={partner} alignment={index % 2 === 0 ? 'left' : 'right'} />
      ))}

      {/* CTA Section */}
      <TeamNetworkCTA />
    </div>
  )
}

export default TeamNetworkPage
