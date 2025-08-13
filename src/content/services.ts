export interface AboutService {
  key: string
  title: string
  lead: string
  body: string
  bullets: string[]
  link: string
}

export const aboutServices: AboutService[] = [
  {
    key: 'trainings',
    title: 'Schulungen & Workshops',
    lead: 'Enablement & Rollenkompetenz',
    body: 'Role-based Labs & Playbooks für Dev, Ops & Knowledge Steward – interne Souveränität statt externer Dauer-Abhängigkeit.',
    bullets: ['Hands-on Workshops', 'Playbooks / Artefakte', 'Mentoring & Shadowing'],
    link: '/services#trainings'
  },
  {
    key: 'consulting',
    title: 'Beratung',
    lead: 'Architektur & Governance',
    body: 'Strategische Einordnung, Architektur-Reviews, Roadmaps & AI Act Vororientierung – fundierte Entscheidungen statt Tool-Hopping.',
    bullets: ['Architektur-Assessment', 'Roadmap & Reifegrad', 'Governance / Compliance'],
    link: '/services#consulting'
  },
  {
    key: 'solutions',
    title: 'Custom Solutions',
    lead: 'Integration & Automation',
    body: 'Modulare Retrieval- & Workflow-Bausteine: Connectoren, Index / Eval, Observability. Schnell produktionsnah statt POC-Stau.',
    bullets: ['Workflow Orchestrierung', 'Retrieval / Index Layer', 'Evaluierung & Monitoring'],
    link: '/services/custom-solutions'
  }
]
