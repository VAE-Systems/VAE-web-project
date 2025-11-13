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
  body: 'VAE Systems wurde von zwei Menschen gegründet, die mehr verbindet als eine gemeinsame Geschäftsidee. Julian Goertz Dini und Jakob Dünnebeil kennen sich aus der Community-Arbeit bei <a href="https://www.linkedin.com/company/aktiv-kollektiv/" target="_blank" rel="noopener noreferrer">Aktiv Kollektiv e.V. Heidelberg</a> — einem gemeinnützigen Verein, in dem sie Initiativen aufbauen, Veranstaltungen organisieren und Menschen zusammenbringen. Diese Erfahrung prägt ihre Arbeitsweise: VAE Systems ist nicht nur ein Beratungsunternehmen. Es ist ein Team, das versteht, wie man Communities aufbaut, komplexe Projekte koordiniert und langfristige Partnerschaften pflegt.',
  seoKeywords: ['Gründer VAE Systems', 'Tech-Beratung Heidelberg', 'Open-Source-Infrastruktur', 'Informatik-Expertise'],
}

export const LEADERS: LeaderProfile[] = [
  {
    id: 'julian-goertz-dini',
    name: 'Julian Goertz Dini',
    title: 'CEO & Co-Founder',
    roleTag: 'Strategische Vision | Design & UX | KI-Strategie | Business Development',
    portrait: {
      src: '/images/optimized/Julian-Portrait-Leitung-mit-Schatten.webp',
      fallback: '/images/optimized/Julian-Portrait-Leitung-mit-Schatten.png',
      alt: 'Julian Goertz Dini mit freundlichem Blick in einem modernen Porträt vor dunklem Hintergrund.',
    },
    background:
      'Julian denkt in großen Bildern. Als Student der VWL und Informatik an der Universität Heidelberg verbindet er ökonomisches Verständnis mit technischer Umsetzungskompetenz. Geboren in Karlsruhe, verankert in Heidelberg und vernetzt mit der Kreativ- und Tech-Szene in Berlin, bringt er unterschiedliche Perspektiven zusammen. Er ist Gründer des <a href="https://www.linkedin.com/company/aktiv-kollektiv/" target="_blank" rel="noopener noreferrer">Aktiv Kollektiv e.V.</a>, wirkt dort als Vorstand und Co-Lead der Business-Development-Gruppe und koordiniert Initiativen, die Menschen zusammenbringen. Diese Erfahrung prägt seine Arbeitsweise bei VAE Systems: Er versteht, wie man komplexe Stakeholder managt, Partnerschaften aufbaut und Visionen in realisierbare Projekte übersetzt. Seine künstlerische Familien-DNA zeigt sich in seiner Liebe zu Design und Details: Technologie muss nicht nur funktionieren, sondern sich exzellent anfühlen.',
    characterTraits: ['Direkt, visionär, Enabler', 'Offen und feedback-freudig', 'Effizient, vernetzt, engagiert'],
    expertise: [
      'Strategische Vision & Business Development',
      'Design & UX',
      'KI-Strategie & Implementierung',
      'Sales & Partnermanagement',
    ],
    engagement: [
      'Gründer & Vorstand Aktiv Kollektiv e.V.',
      'Co-Lead Business Development Gruppe',
      'Projektkoordinator für Großveranstaltungen & Initiativen',
      'Vernetzt in Heidelberg & Berlin (Kreativwirtschaft)',
    ],
    location: 'Heidelberg (mit Netzwerk nach Berlin)',
    whyItMatters:
      'Julian sieht das große Ganze. Nicht nur “Wie baue ich das?”, sondern “Warum baue ich das? Für wen? Was ändert sich dadurch?”. Diese strategische Weitsicht, kombiniert mit Design-Sensibilität und technischer Kompetenz, macht ihn zu einem Partner, der nicht einfach umsetzt, sondern mitdenkt. Er ist vernetzt, aktiv in Communities und versteht, wie echte Unternehmen arbeiten.',
    linkedin: {
      text: 'Julian Goertz Dini auf LinkedIn',
      href: 'https://www.linkedin.com/in/julian-goertz-dini-8a716a277',
    },
    seoKeywords: ['CEO Strategie', 'Business Development', 'KI-Beratung', 'Design & UX', 'Gründer Heidelberg'],
  },
  {
    id: 'jakob-duennebeil',
    name: 'Jakob Dünnebeil',
    title: 'CTO & Co-Founder',
    roleTag: 'Technische Vision | Open Source Advocate | Systems Architect',
    portrait: {
      src: '/images/optimized/Jakob-Leitung-Aufnahme.webp',
      fallback: '/images/optimized/Jakob-Leitung-Aufnahme.png',
      alt: 'Jakob Dünnebeil in einem professionellen Porträt.',
    },
    background:
      'Jakob bringt den technischen Tiefgang in VAE Systems. Mit einem Hintergrund in Physik und einem laufenden Informatikstudium an der Exzellenz-Universität Heidelberg kombiniert er wissenschaftliches Denken mit praktischer Softwareentwicklung. Bevor VAE Systems entstand, war Jakob tief in der Open-Source-Community verankert. Er initiierte ehrenamtliche Projekte zur Standardisierung von Software-Infrastrukturen und gründete die Software-Community innerhalb des <a href="https://www.linkedin.com/company/aktiv-kollektiv/" target="_blank" rel="noopener noreferrer">Aktiv Kollektiv e.V.</a>, der als Knotenpunkt für technischen Austausch in Heidelberg dient. Er versteht Systemarchitektur von Grund auf, denkt in Selfhosting-Lösungen, Open-Source-Tools und langfristig wartbarer Infrastruktur. Seine Arbeit ist geprägt von Präzision. Er fragt kritisch, hinterfragt Annahmen und kann komplexe technische Konzepte so vermitteln, dass Kund:innen Zusammenhänge erkennen.',
    characterTraits: ['Kritisch, ehrlich, klar, offen', 'Ausgeglichen und präzise', 'Fokus auf technische Exzellenz'],
    expertise: [
      'Softwarekonzeption & Systemarchitektur',
      'Open Source & Selfhosting-Infrastrukturen',
      'Multi-Language Development',
      'Teaching & Wissenstransfer',
    ],
    engagement: [
      'Initiator der Software-Community im Aktiv Kollektiv e.V. Heidelberg',
      'Leiter der Technik-Community Heidelberg',
      'Ehrenamtlich aktiv in Open-Source-Standardisierung',
    ],
    location: 'Frankfurt — Eppelheim (regional vernetzt, mobil)',
    whyItMatters:
      'Jakob ist das technische Rückgrat von VAE. Wenn etwas nicht funktioniert, fragt er warum. Wenn eine Lösung unsauber ist, spricht er es an. Diese Direktheit ist unbequem, aber notwendig. Kund:innen bekommen keine Halbwahrheiten, sondern technische Exzellenz. Seine Open-Source-Überzeugung bedeutet: keine Vendor Lock-ins, sondern langlebige Systeme, die mit dem Unternehmen wachsen.',
    linkedin: {
      text: 'Jakob Dünnebeil auf LinkedIn',
      href: 'https://www.linkedin.com/in/jakob-d%C3%BCnnebeil-54b25936b/',
    },
    seoKeywords: [
      'CTO Open Source',
      'Systemarchitektur',
      'Selfhosting-Infrastruktur',
      'Technische Beratung',
      'Software-Community Heidelberg',
    ],
  },
]

export const PARTNERSHIP_SECTION = {
  title: 'Warum Jakob + Julian funktioniert',
  intro:
    'VAE Systems vereint eine dualistische Sichtweise. Jakob fragt: “Ist das technisch korrekt?” Julian fragt: “Ist das strategisch richtig?” Diese Komplementarität ist kein Zufall. Beide kommen aus der Community-Arbeit bei Aktiv Kollektiv e.V. Sie kennen sich, verstehen, wie der andere denkt, und ergänzen sich.',
  methodology: [
    {
      label: 'Agile Entwicklung (Scrum)',
      description: 'Iterative Prozesse, schnelle Anpassungsfähigkeit, kontinuierliches Feedback.',
    },
    {
      label: 'Kontingenzplanung',
      description:
        'Flexibilität in der Strategieumsetzung – Anpassung an Marktbedingungen, Kundenanforderungen und technologische Veränderungen.',
    },
    {
      label: 'Emergente & intendierte Strategie',
      description:
        'Pläne entstehen nicht nur top-down, sondern durch kontinuierliches Lernen. KI-gestützte Analysen helfen, emergente Signale frühzeitig zu erkennen.',
    },
    {
      label: 'Market-Based View',
      description: 'Verständnis für Marktdynamiken, Wettbewerbsvorteile und langfristige Positionierung.',
    },
  ],
  seoKeywords: ['Agile Führung', 'Scrum Methodik', 'Kontingenzplanung', 'Emergente Strategie', 'Tech-Leadership'],
  links: [
    { label: 'VAE Systems auf LinkedIn', href: 'https://www.linkedin.com/company/vae-systems/' },
    { label: 'Aktiv Kollektiv e.V. auf LinkedIn', href: 'https://www.linkedin.com/company/aktiv-kollektiv/' },
  ],
}

export const LEADERSHIP_CTA = {
  heading: 'Lassen Sie uns zusammenarbeiten',
  copy: 'Wenn Sie nach einem Team suchen, das technische Expertise mit strategischem Denken verbindet – und Wert auf Transparenz, Unabhängigkeit und langfristige Partnerschaften legt – dann lassen Sie uns sprechen. Jakob und Julian sind Sparring-Partner, stellen kritische Fragen, denken mit und bauen Systeme, die wachsen.',
  button: {
    label: 'Kontakt aufnehmen',
    href: '/kontakt',
  },
}
