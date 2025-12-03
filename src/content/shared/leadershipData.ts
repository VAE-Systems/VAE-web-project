export interface LeaderProfile {
  id: string
  name: string
  title: string
  roleTag: string
  background: string
  characterTraits: string[]
  expertise: string[]
  engagement: string[]
  location: string
  whyItMatters: string
  linkedin: {
    text: string
    href: string
  }
  email: string
  seoKeywords: string[]
  portrait: {
    src: string
    fallback?: string
    alt: string
  }
}

export const HERO_CONTENT = {
  title: 'Die Köpfe hinter VAE Systems',
  subheading: 'Zwei Gründer, eine Vision: Deutschland technologisch unabhängig machen.',
  body: 'VAE Systems wurde von zwei Menschen gegründet, die mehr verbindet als eine gemeinsame Geschäftsidee. Julian Goertz Dini und Jakob Dünnebeil kennen sich aus der Community-Arbeit bei <a href="https://www.linkedin.com/company/aktiv-kollektiv/" target="_blank" rel="noopener noreferrer">Aktiv Kollektiv e.V. Heidelberg</a> — einem gemeinnützigen Verein, in dem sie Initiativen aufbauen, Veranstaltungen organisieren und Menschen zusammenbringen.',
  seoKeywords: ['Gründer VAE Systems', 'Tech-Beratung Heidelberg', 'Open-Source-Infrastruktur', 'Informatik-Expertise'],
}

export const LEADERS: LeaderProfile[] = [
  {
    id: 'julian-goertz-dini',
    name: 'Julian Goertz Dini',
    title: 'CEO & Co-Founder',
    roleTag: 'STRATEGISCHE VISION | DESIGN & UX | KI-STRATEGIE | BUSINESS DEVELOPMENT',
    portrait: {
      src: '/images/optimized/Julian-Portrait-Leitung-mit-Schatten.webp',
      fallback: '/images/optimized/Julian-Portrait-Leitung-mit-Schatten.png',
      alt: 'Julian Goertz Dini mit freundlichem Blick in einem modernen Porträt vor dunklem Hintergrund.',
    },
    background:
      'Julian ist Student der VWL und Informatik an der Universität Heidelberg. Er verbindet ökonomisches Verständnis mit technischer Umsetzungskompetenz. Geboren in Karlsruhe, verankert in Heidelberg und vernetzt zwischen Rhein-Neckar und Berlin. — Als Gründer und Vorstand des <a href="https://www.linkedin.com/company/aktiv-kollektiv/" target="_blank" rel="noopener noreferrer">Aktiv Kollektiv e.V.</a> versteht er, wie man komplexe Stakeholder managt und Visionen in realisierbare Projekte übersetzt. Diese Community-Erfahrung prägt die Arbeitsweise bei VAE Systems: dokumentiert, unabhängig, mit Sinn für Design und Details.',
    characterTraits: ['Direkt und visionär', 'Offen und feedback-freudig', 'Vernetzt, effizient, engagiert'],
    expertise: [
      'Strategische Vision & Business Development',
      'Design & UX-Denken',
      'KI-Strategie & Implementierung',
      'Sales & Partnermanagement',
    ],
    engagement: [
      'Gründer & Vorstand Aktiv Kollektiv e.V.',
      'Co-Lead Business Development Gruppe',
      'Vernetzt in Heidelberg & Berlin',
    ],
    location: 'Heidelberg (mit Netzwerk nach Berlin)',
    whyItMatters:
      '„Ich frage nicht nur: ‘Wie baue ich das?’ Sondern immer: ‘Warum? Für wen? Was ändert sich dadurch?’ — Technologie ohne Kontext ist nur Lärm.“ — Julian Goertz Dini, CEO von VAE Systems',
    linkedin: {
      text: 'LinkedIn-Profil von Julian Goertz Dini',
      href: 'https://www.linkedin.com/in/julian-goertz-dini-8a716a277',
    },
    email: 'juliangoertz@vae.systems',
    seoKeywords: ['Strategische Vision', 'Design & UX', 'KI-Strategie', 'Business Development'],
  },
  {
    id: 'jakob-duennebeil',
    name: 'Jakob Dünnebeil',
    title: 'CTO & Co-Founder',
    roleTag: 'TECHNISCHE VISION | OPEN SOURCE BEFÜRWORTER | SYSTEMARCHITEKTUR',
    portrait: {
      src: '/images/optimized/Jakob-Leitung-Aufnahme.webp',
      fallback: '/images/optimized/Jakob-Leitung-Aufnahme.png',
      alt: 'Jakob Dünnebeil in einem professionellen Porträt.',
    },
    background:
      'Jakob bringt technischen Tiefgang in jedes Projekt. Mit Physik-Background und laufendem Informatikstudium an der Universität Heidelberg kombiniert er wissenschaftliches Denken mit praktischer Softwareentwicklung. — Tief in der Open-Source-Community verankert, versteht er Systemarchitektur von Grund auf, denkt in Selfhosting-Lösungen und baut Infrastruktur, die betriebsbereit bleibt – auch ohne externes Team.',
    characterTraits: ['Kritisch, ehrlich und klar', 'Präzise und ausgeglichen', 'Fokus auf technische Exzellenz'],
    expertise: [
      'Softwarekonzeption & Systemarchitektur',
      'Open Source & Selfhosting-Infrastrukturen',
      'Multi-Language Development',
      'Wissenstransfer & Lehren',
    ],
    engagement: [
      'Initiator der Software-Community im Aktiv Kollektiv e.V.',
      'Leiter der Technik-Community Heidelberg',
      'Ehrenamtlich aktiv in Open-Source-Standardisierung',
    ],
    location: 'Frankfurt — Eppelheim (regional vernetzt, mobil)',
    whyItMatters:
      '„Wenn eine Lösung nicht sauber ist, spreche ich es an. Nicht aus Kritik — sondern aus Liebe zum Handwerk. Das ist die Basis für echtes Vertrauen und lange Partnerschaften.“ — Jakob Dünnebeil, CTO von VAE Systems',
    linkedin: {
      text: 'LinkedIn-Profil von Jakob Dünnebeil',
      href: 'https://www.linkedin.com/in/jakob-d%C3%BCnnebeil-54b25936b/',
    },
    email: 'jakobduennebeil@vae.systems',
    seoKeywords: ['Technische Vision', 'Open Source', 'Systemarchitektur', 'Community Leadership'],
  },
]

export const PARTNERSHIP_SECTION = {
  title: 'Unsere Führungsprinzipien',
  intro: 'Die Art, wie wir zusammenarbeiten und entscheiden',
  methodology: [
    {
      label: 'Agile Führung',
      description:
        'Iterative Prozesse, schnelle Anpassungsfähigkeit, kontinuierliches Feedback. Wir arbeiten nicht starr, sondern lernen und passen an.',
    },
    {
      label: 'Kontingenzplanung',
      description:
        'Wir denken Szenarien durch und haben Alternativen vorbereitet, falls Markt oder Technik sich ändern.',
    },
    {
      label: 'Lernen durch Signale',
      description:
        'Strategien entstehen nicht nur top-down. Wir beobachten, was funktioniert, und kalibrieren kontinuierlich – ohne den Kompass zu verlieren.',
    },
    {
      label: 'Markt- und Wettbewerbsblick',
      description:
        'Jede Entscheidung betrachtet Marktdynamiken und Positionierung: technisch möglich UND strategisch sinnvoll.',
    },
  ],
  seoKeywords: ['Agile Führung', 'Kontingenzplanung', 'Lernen durch Signale', 'Markt- und Wettbewerbsblick'],
  links: [
    { label: 'VAE Systems auf LinkedIn', href: 'https://www.linkedin.com/company/vae-systems/' },
    { label: 'Aktiv Kollektiv e.V. auf LinkedIn', href: 'https://www.linkedin.com/company/aktiv-kollektiv/' },
  ],
}

export const LEADERSHIP_CTA = {
  heading: 'Lassen Sie uns zusammenarbeiten',
  copy: 'Wenn Sie ein Team suchen, das technische Expertise mit strategischem Denken verbindet – und dabei Wert auf Transparenz, Unabhängigkeit und langfristige Partnerschaften legt – sollten wir sprechen. Jakob und Julian sind direkt, stellen kritische Fragen, denken mit und bauen Systeme, die wachsen.',
  button: {
    label: 'Kontakt aufnehmen',
    href: '/contact',
  },
}
