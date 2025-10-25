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
    bio: 'Strategische Geschäftsführung und Kundenberatung. Spezialisiert auf Open-Source Business-Transformation und AI-Integration für mittelständische Unternehmen.',
    expertise: ['Business Strategy', 'Open Source Consulting', 'AI Integration', 'Project Management'],
    experience: '2+ Jahre Open-Source Business Infrastructure',
    education: 'Informatik & VWL, Universität Heidelberg',
    image: '/images/team/julian.jpg',
    email: 'juliandini@vae-systems.com',
    linkedin: 'https://www.linkedin.com/in/julian-darius-goertz-dini-8a716a277',
  },
  {
    id: 'jakob',
    name: 'Jakob Dünnebeil',
    role: 'Technical Lead & Co-Founder',
    bio: 'Technische Umsetzung und Systemarchitektur. Verantwortlich für Setup, Konfiguration und langfristige Betreuung aller Open-Source Infrastrukturen.',
    expertise: ['System Architecture', 'Nextcloud Enterprise', 'Twenty CRM', 'DevOps', 'Security'],
    experience: 'Enterprise Open-Source Implementation',
    education: 'Technischer Hintergrund',
    image: '/images/team/jakob.jpg',
    email: 'jakobduennebeil@vae-systems.com',
    linkedin: 'https://www.linkedin.com/in/jakob-d%C3%BCnnebeil-54b25936b/',
  },
]
