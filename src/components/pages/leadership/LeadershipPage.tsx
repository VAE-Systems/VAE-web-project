import Seo from '@/components/ui/Seo'
import { LEADERS } from '@/content/shared/leadershipData'
import React from 'react'
import { LeaderProfileSection } from './LeaderProfileSection'
import { LeadershipCTA } from './LeadershipCTA'
import { LeadershipHero } from './LeadershipHero'
import { PartnershipSection } from './PartnershipSection'

const LeadershipPage: React.FC = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Unsere Leitung | VAE Systems',
    description:
      'Die Gründer von VAE Systems: Julian Goertz Dini und Jakob Dünnebeil. Ein Duo aus strategischer Vision und technischer Präzision.',
    mainEntity: LEADERS.map(leader => ({
      '@type': 'Person',
      name: leader.name,
      jobTitle: leader.title,
      description: leader.background,
      sameAs: [leader.linkedin.href],
    })),
  }

  return (
    <div className="relative z-0 bg-bg-darker text-text-light">
      <Seo
        title="Unsere Leitung | VAE Systems"
        description="Erfahren Sie mehr über die Köpfe hinter VAE Systems: Julian Goertz Dini und Jakob Dünnebeil."
        canonicalPath="/ueber-uns/leitung"
        jsonLd={jsonLd}
      />

      <LeadershipHero />
      <LeaderProfileSection leader={LEADERS[0]} />
      <LeaderProfileSection leader={LEADERS[1]} alignment="right" />
      <PartnershipSection />
      <LeadershipCTA />
    </div>
  )
}

export default LeadershipPage
