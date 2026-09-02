export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  expertise: string[]
  experience: string
  education: string
  image: string
  email?: string
  linkedin?: string
}

export const teamMembers: TeamMember[] = [
  {
    id: 'julian',
    name: 'Julian Goertz Dini',
    role: 'CEO & Co-Founder',
    bio: 'Strategische Geschäftsführung und Kundenberatung. Spezialisiert auf Self-Hosted Business-Transformation und AI-Integration für mittelständische Unternehmen.',
    expertise: ['Business Strategy', 'Self-Hosting Consulting', 'AI Integration', 'Project Management'],
    experience: '2+ Jahre Self-Hosted Business Infrastructure',
    education: 'Informatik & VWL, Universität Heidelberg',
    image: '/images/optimized/Julian-Portrait-2025.webp',
    email: 'juliangoertz@vae.systems',
    linkedin: 'https://www.linkedin.com/in/julian-darius-goertz-dini-8a716a277',
  },
  {
    id: 'jakob',
    name: 'Jakob Dünnebeil',
    role: 'Technical Lead & Co-Founder',
    bio: 'Technische Umsetzung und Systemarchitektur. Verantwortlich für Setup, Konfiguration und langfristige Betreuung aller Self-Hosted Infrastrukturen.',
    expertise: ['System Architecture', 'Nextcloud Enterprise', 'Twenty CRM', 'DevOps', 'Security'],
    experience: 'Enterprise Self-Hosted Implementation',
    education: 'Technischer Hintergrund',
    image: '/images/optimized/Jakob-Leitungs-Portrait.webp',
    email: 'jakobduennebeil@vae.systems',
    linkedin: 'https://www.linkedin.com/in/jakob-d%C3%BCnnebeil-54b25936b/',
  },
]
