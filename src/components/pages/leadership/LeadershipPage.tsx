import React from 'react'
import Seo from '@/components/ui/Seo'
import { LeadershipHero } from './LeadershipHero'
import { LeaderProfileSection } from './LeaderProfileSection'
import { PartnershipSection } from './PartnershipSection'
import { LeadershipCTA } from './LeadershipCTA'
import { LEADERS } from '@/data/leadershipData'

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
    <div className="bg-bg-darker text-text-light">
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
