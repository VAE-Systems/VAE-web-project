export interface EngagementItem {
  text: string
  links?: { label: string; href: string }[]
}

export interface LeaderProfile {
  id: string
  name: string
  title: string
  roleTag: string
  background: string
  characterTraits: string[]
  expertise: string[]
  engagement: EngagementItem[]
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
  seoKeywords: ['Gründer VAE Systems', 'Tech-Beratung Heidelberg', 'Self-Hosted-Infrastruktur', 'Informatik-Expertise'],
}

export const LEADERS: LeaderProfile[] = [
  {
    id: 'julian-goertz-dini',
    name: 'Julian Goertz Dini',
    title: 'CEO & Co-Founder',
    roleTag: 'STRATEGISCHE VISION | DESIGN & UX | KI-STRATEGIE | BUSINESS DEVELOPMENT',
    portrait: {
      src: '/images/optimized/Julian-Portrait-2025.webp',
      fallback: '/images/optimized/Julian-Portrait-2025.png',
      alt: 'Julian Goertz Dini in aktuellem Porträt vor dunklem Hintergrund.',
    },
    background:
      'Julian studiert Volkswirtschaftslehre und Informatik an der Universität Heidelberg. Er verbindet ökonomisches Verständnis mit technischer Umsetzungskompetenz. Geboren in Karlsruhe, verankert in Heidelberg und vernetzt zwischen Rhein-Neckar und Berlin. — Als Gründer und Co-Vorsitzender des Aktiv Kollektiv e.V. – einem gemeinnützigen Verein zur Förderung von Ehrenamt und Interessengruppen in Heidelberg – versteht er, wie man komplexe Stakeholder managt und Visionen in realisierbare Projekte übersetzt. — Als Beisitzer im erweiterten Vorstand von Kultur für Europa e.V. unterstützt er mit technischer Expertise die Bewerbung Heidelbergs zur Europäischen Kulturhauptstadt. — Diese Community-Erfahrung zeigt sich bei VAE Systems in klarer Dokumentation, Unabhängigkeit und Liebe zum Detail.',
    characterTraits: ['Direkt und visionär', 'Offen und feedback-freudig', 'Vernetzt, effizient, engagiert'],
    expertise: [
      'Strategische Vision & Business Development',
      'Design & UX-Denken',
      'KI-Strategie & Implementierung',
      'Sales & Partnermanagement',
    ],
    engagement: [
      {
        text: 'Gründer & Co-Vorsitzender Aktiv Kollektiv e.V.',
        links: [
          { label: 'LinkedIn', href: 'https://www.linkedin.com/company/aktiv-kollektiv/' },
          {
            label: 'Presse',
            href: 'https://www.rnz.de/region/heidelberg_artikel,-Heidelberg-Aktiv-Kollektiv-make-Ehrenamt-cool-again-_arid,1601776.html',
          },
        ],
      },
      {
        text: 'Im Vorstand von Kultur für Europa e.V. unterstützt er mit technischer Expertise die Bewerbung Heidelbergs zur Europäischen Kulturhauptstadt.',
        links: [{ label: 'Vorstand', href: 'https://kulturfuereuropa.eu/vorstand-beisitzer/' }],
      },
      {
        text: 'Vernetzt in Heidelberg, Rhein-Neckar & Berlin',
      },
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
      src: '/images/optimized/Jakob-Leitungs-Portrait.webp',
      fallback: '/images/optimized/Jakob-Leitungs-Portrait.png',
      alt: 'Jakob Dünnebeil in einem professionellen Porträt.',
    },
    background:
      'Jakob bringt technischen Tiefgang. Mit Physik-Background und Informatikstudium kombiniert er wissenschaftliches Denken mit praktischer Softwareentwicklung. — Tief in der Open-Source-Community verankert, baut er Self-Hosted-Systemarchitekturen, die skalieren und langfristig wartbar bleiben.',
    characterTraits: ['Kritisch, ehrlich und klar', 'Präzise und ausgeglichen', 'Fokus auf technische Exzellenz'],
    expertise: [
      'Softwarekonzeption & Systemarchitektur',
      'Self-Hosting mit Open Source als Werkzeug',
      'Multi-Language Development',
      'Wissenstransfer & Lehren',
    ],
    engagement: [
      {
        text: 'Initiator und Leiter der IT-Community in Partnerschaft mit dem Aktiv Kollektiv e.V.',
        links: [
          {
            label: 'LinkedIn Post',
            href: 'https://www.linkedin.com/posts/julian-goertz-dini-8a716a277_aktivkollektiv-heidelberg-kulturkiosk-activity-7399679541633241088-3ibj',
          },
        ],
      },
      { text: 'Verfolgt aktiv Entwicklungen im Bereich Open-Source-Standards und Best Practices' },
    ],
    location: 'Frankfurt — Eppelheim (regional vernetzt, mobil)',
    whyItMatters:
      '„Wenn eine Lösung nicht sauber ist, spreche ich es an. Nicht aus Kritik — sondern aus Liebe zum Handwerk. Das ist die Basis für echtes Vertrauen und lange Partnerschaften.“ — Jakob Dünnebeil, CTO von VAE Systems',
    linkedin: {
      text: 'LinkedIn-Profil von Jakob Dünnebeil',
      href: 'https://www.linkedin.com/in/jakob-d%C3%BCnnebeil-54b25936b/',
    },
    email: 'jakobduennebeil@vae.systems',
    seoKeywords: ['Technische Vision', 'Self-Hosting', 'Open Source', 'Systemarchitektur'],
  },
]

export const PARTNERSHIP_SECTION = {
  title: 'Unsere Führungsprinzipien',
  intro: 'Die Art, wie wir zusammenarbeiten und entscheiden',
  methodology: [
    {
      label: 'Agile Führung',
      description:
        'Iterative Prozesse, schnelle Anpassungsfähigkeit, kontinuierliches Feedback. Wir arbeiten in kurzen Zyklen und passen basierend auf echten Ergebnissen an.',
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
