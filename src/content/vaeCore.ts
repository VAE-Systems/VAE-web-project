import { PERCENTAGES } from '../config'

export const vaeCoreContent = {
  target_segments: {
    headline: 'Für jedes Team die richtige Lösung',
    tabs: [
      {
        id: 'interested',
        label: 'Für Interessierte',
        title: 'Warum VAE Core Ihr Vorteil ist',
        subtitle: 'Transparente, robuste Grundlage für bessere KI‑Lösungen',
        pain: 'Viele Anbieter versprechen KI – doch am Ende entstehen Insellösungen ohne klare Architektur. Die Folge: Hohe Kosten, geringe Verlässlichkeit, später kaum wartbar.',
        solution:
          'VAE Core ist unsere eigene, professionelle Plattform‑Architektur. Sie ermöglicht uns, Projekte schneller, robuster und langfristig günstiger zu liefern – und bleibt erweiterbar.',
        benefits: [
          'Nachhaltigkeit: saubere Architektur statt kurzfristiger Hacks',
          'Kostenvorteil: weniger Custom‑Code, mehr Wiederverwendung',
          'Transparenz: Open‑Source‑Kern, klare Schnittstellen, Dokumentation',
          'Skalierung: Projekte wachsen reibungsarm mit Ihrem Bedarf',
        ],
        cta: 'Kontakt aufnehmen',
      },
      {
        id: 'builders',
        label: 'Für Builder & Teams',
        title: 'Schneller auf Produktionsniveau entwickeln',
        subtitle: 'Multi‑Tenancy, Security, Gateway – alles fertig integriert',
        pain: 'LLM‑Features bauen ist einfach – produktionsreif skalieren mit Mandantentrennung, Kostenkontrolle und Observability ist schwer.',
        solution:
          'VAE Core liefert Tenant‑Isolation, Token‑Accounting, Provider‑Agnostik und Audit‑Trails – ohne Ihr Backend neu zu schreiben.',
        benefits: [
          `${PERCENTAGES.MULTI_TENANT_CODE_REDUCTION} weniger Multi‑Tenant‑Code durch RLS und Policies`,
          'Provider wechseln ohne Rewrites (OpenAI‑kompatibles Gateway)',
          'Built‑in Token‑/Kosten‑Tracking pro Nutzer/Tenant',
          'Sichere Tool‑Execution (MCP) für echte Automationen',
        ],
        cta: 'Demo / Tech‑Call buchen',
      },
      {
        id: 'agencies',
        label: 'Für Agenturen',
        title: 'Bessere Margen, konsistente Delivery',
        subtitle: 'Standardisierte Architektur statt jedes Mal neu',
        pain: 'Jedes Projekt beginnt bei Null – Setup‑Zeit, Wartung und Nacharbeiten drücken die Marge und Skalierbarkeit.',
        solution:
          'VAE Core ist Ihr wiederverwendbares Fundament. Module, Templates und Best Practices machen Delivery vorhersehbar und profitabel.',
        benefits: [
          `${PERCENTAGES.SETUP_TIME_REDUCTION} weniger Setup‑Zeit, mehr Projekte parallel`,
          'Standardisierte Qualität, weniger Overhead im Betrieb',
          'Partner‑Programm mit Enablement und Go‑To‑Market‑Playbooks',
          'Provider‑Agnostik ohne Lock‑in',
        ],
        cta: 'Partner‑Programm anfragen',
      },
      {
        id: 'oss',
        label: 'Open Source',
        title: 'Lernen, beitragen, bauen – ohne Kosten',
        subtitle: 'Für Schulen, Hochschulen und private, nicht‑kommerzielle Nutzung',
        pain: 'Der Einstieg in produktionsreife KI‑Entwicklung ist komplex. Viele Frameworks sind entweder Black‑Box oder nur für Demos gedacht.',
        solution:
          'VAE Core ist quelloffen, dokumentiert und lokal startbar (Docker). Ideal zum Lernen und Forschen – mit echter Architektur‑Qualität.',
        benefits: [
          'Kostenlos & transparent – ideal für Bildung & Community',
          'Lokal betreibbar – volle Datenkontrolle',
          'Beitragen willkommen – Issues, PRs, Docs',
          'Klarer Upgrade‑Pfad auf Managed & Enterprise',
        ],
        cta: 'Zu GitHub & Docs',
      },
    ],
  },
  views: {
    interested: {
      meta: {
        title: 'VAE Core – Warum unsere Projekte günstiger, schneller und nachhaltiger sind',
        description:
          'Unsere professionelle Plattform‑Architektur ermöglicht effizientere, robustere KI‑Projekte. Transparenz, Qualität und Skalierbarkeit inklusive.',
      },
      hero: {
        titlePre: 'VAE Core',
        titleMain: 'Für Interessierte',
        badge: 'Architektur‑Qualität statt Insellösungen',
        hook: 'Warum unsere KI‑Leistungen messbar besser performen',
        subline:
          'Wir bauen auf einer eigenen, modularen Plattform – das spart Kosten, reduziert Risiken und bleibt erweiterbar.',
        lead: 'Statt Einzellösungen setzen wir auf klare Architektur‑Prinzipien. Das Ergebnis: weniger Reibungsverluste, kürzere Projekte, stabile Ergebnisse.',
        stats: [
          { value: '30–60%', label: 'weniger Gesamtkosten' },
          { value: '2–4x', label: 'schneller von POC zu Produktion' },
          { value: '100%', label: 'Daten‑Transparenz' },
        ],
      },
      problem: {
        headline: 'Viele „KI‑Lösungen“ scheitern an Struktur',
        pain_points: [
          {
            icon: 'Settings',
            title: 'Kein Fundament',
            desc: 'Individuelle Hacks statt wiederverwendbarer Architektur.',
          },
          {
            icon: 'TrendingUp',
            title: 'Kosten laufen aus dem Ruder',
            desc: 'Fehlende Standards führen zu Nacharbeiten und Wartungsstau.',
          },
          {
            icon: 'Shield',
            title: 'Sicherheitsfragen ungeklärt',
            desc: 'Daten, Compliance, Nachvollziehbarkeit – oft erst im Nachhinein bedacht.',
          },
          { icon: 'Link', title: 'Lock‑in', desc: 'Starke Abhängigkeit von einzelnen Anbietern.' },
        ],
        solution_preview: 'VAE Core bringt Struktur, Sicherheit und Wiederverwendbarkeit – von Anfang an.',
      },
      value_props: {
        headline: 'Was Sie konkret gewinnen',
        pillars: [
          {
            icon: 'Layers',
            title: 'Architektur statt Ad‑hoc',
            body: 'Module, Schnittstellen und Standards – weniger Risiko, mehr Planbarkeit.',
            detail: 'Projektfortschritt bleibt nachvollziehbar und erweiterbar.',
          },
          {
            icon: 'RefreshCw',
            title: 'Flexibilität & Unabhängigkeit',
            body: 'Provider‑agnostischer Ansatz. Keine Sackgassen.',
            detail: 'Wechsel ohne Neuentwicklung.',
          },
          {
            icon: 'ShieldCheck',
            title: 'Transparenz & Governance',
            body: 'Open Source‑Kern, Audits & Observability.',
            detail: 'Compliance ist integrierbar statt drangeklatscht.',
          },
          {
            icon: 'Lock',
            title: 'Daten‑Souveränität',
            body: 'Self‑Hosting möglich, EU‑konform umsetzbar.',
            detail: 'Volle Kontrolle über sensible Daten.',
          },
        ],
      },
      pricing: {
        headline: 'Pakete für den Einstieg',
        subtitle: 'Schnell starten – mit klaren Ergebnissen',
        tiers: [
          {
            name: 'Open Source',
            price: '€0',
            period: '',
            description: 'Ideal zum Kennenlernen & Testen',
            features: ['Kompletter VAE Core', 'Docker‑Setup lokal', 'Community Support', 'Dokumentation'],
            cta: 'GitHub Repository',
            popular: false,
          },
          {
            name: 'Beratung Starter',
            price: 'ab €990',
            period: '',
            description: 'Analyse, Empfehlung, Roadmap',
            features: [
              '2 Workshops',
              'Ist‑Analyse & Zielbild',
              'Security & Compliance Check',
              'Konkreter Umsetzungsplan',
            ],
            cta: 'Kostenloses Vorgespräch',
            popular: true,
          },
          {
            name: 'Implementierungspaket',
            price: 'ab €4.900',
            period: '',
            description: 'Pilot bis produktionsreif',
            features: [
              'Produktionsreifer POC',
              'Monitoring & Kostenkontrolle',
              'Dokumentation & Übergabe',
              'Option: Managed Betrieb',
            ],
            cta: 'Projekt starten',
            popular: false,
          },
        ],
        guarantee: 'Transparente Angebote. Kein Lock‑in. Messbare Ergebnisse.',
      },
      tech_deep_dive: {
        headline: 'Das Fundament hinter unseren Projekten',
        intro:
          'Wir kombinieren Open‑Source‑Bausteine mit unserer Plattformlogik – bewährt, dokumentiert und erweiterbar.',
        architecture_benefits: [
          'Saubere Trennung von State, Security, Gateway und Tools',
          'Observability & Kosten‑Kontrolle von Anfang an',
          'Provider‑agnostischer LLM‑Zugriff via kompatiblem Gateway',
          'Self‑Hosting‑Optionen für sensible Daten',
        ],
        tech_stack: [
          { name: 'Frontend', techs: ['React', 'TypeScript', 'Tailwind'] },
          { name: 'Backend', techs: ['FastAPI / Node.js', 'Supabase/PostgreSQL'] },
          { name: 'AI/ML', techs: ['OpenAI API', 'Anthropic', 'Ollama', 'pgvector'] },
          { name: 'Infra', techs: ['Docker', 'Kubernetes', 'CI/CD'] },
        ],
      },
      comparison_brief: {
        headline: 'VAE Core vs. typische Agentur‑Vorgehen',
        subtitle: 'Weniger Risiko, mehr Wiederverwendung',
        comparisons: [
          {
            alternative: 'Ad‑hoc Entwicklung',
            vae_advantage: 'Architektur‑Standards & Templates',
            time_saved: 'Wochen/Monate sparen',
          },
          {
            alternative: 'Proprietäre Black‑Box',
            vae_advantage: 'Open‑Source‑Kern & Transparenz',
            time_saved: 'Lock‑in vermeiden',
          },
          {
            alternative: 'Ein‑Provider‑Abhängigkeit',
            vae_advantage: 'Provider‑Agnostik',
            time_saved: 'Strategiefreiheit',
          },
        ],
      },
      roadmap: {
        headline: 'Roadmap bis Launch (Q2 2026)',
        subtitle: 'Transparente Weiterentwicklung mit Design‑Partnern',
        phases: [
          {
            quarter: 'Q4 2025',
            title: 'Foundation',
            status: 'In Entwicklung',
            items: ['Core Infrastructure', 'Security & RLS', 'Gateway‑Basis'],
          },
          {
            quarter: 'Q1 2026',
            title: 'Integration',
            status: 'Geplant',
            items: ['MCP Workflow', 'Provider Abstraction', 'Observability Basics'],
          },
          {
            quarter: 'Q2 2026',
            title: 'Public Preview',
            status: 'Ziel',
            items: ['Beta Launch', 'Docs', 'Design‑Partner Feedback'],
          },
        ],
        early_access: 'Design‑Partner erhalten 60 Tage früheren Zugang und direkten Einfluss auf Features.',
      },
      final_cta: {
        headline: 'Klingt sinnvoll? Lassen Sie uns sprechen.',
        subtitle: 'Wir zeigen live, wie VAE Core Projekte beschleunigt und Risiken senkt.',
        primary_ctas: [
          { text: 'Kostenloses Vorgespräch', href: '/contact?intent=advisory', style: 'primary' },
          { text: 'GitHub Repository', href: 'https://github.com/vae-systems/vae-core', style: 'secondary' },
        ],
        secondary_info: 'Direkter Kontakt: core@vae-systems.com',
      },
    },
    builders: {
      meta: {
        title: 'VAE Core für Builder – Multi‑Tenancy & Provider‑Agnostik out‑of‑the‑box',
        description:
          'Produktionsreif entwickeln ohne Backend‑Neubau: RLS, Token‑Accounting, Audit‑Trails, LLM‑Gateway. Ab €149/Monat (Managed).',
      },
      hero: {
        titlePre: 'VAE Core für',
        titleMain: 'Builder & Teams',
        badge: 'Mandantenfähige KI‑Integration',
        hook: 'LLM‑Features integrieren, ohne Ihr Backend umzubauen',
        subline: 'Row‑Level Security, per‑Tenant API‑Keys, Token‑Tracking und Observability sind integriert.',
        lead: 'Über 80% der LLM‑Projekte scheitern am Schritt in die Produktion. VAE Core räumt die Hürden aus dem Weg.',
        stats: [
          { value: '90%', label: 'weniger Multi‑Tenant Code' },
          { value: '60%', label: 'schneller zum Launch' },
          { value: '> 20%', label: 'gesparte Entwicklungskosten' },
        ],
      },
      problem: {
        headline: 'Skalieren statt basteln',
        pain_points: [
          {
            icon: 'Settings',
            title: 'Mandanten‑Komplexität',
            desc: 'Schlüssel, Limits, Isolation – alles pro Tenant.',
          },
          { icon: 'TrendingUp', title: 'Kostenkontrolle', desc: 'Ohne Limits & Tracking wird es schnell teuer.' },
          { icon: 'Shield', title: 'Sicherheit', desc: 'Granulare Rechte & echte Isolation sind Pflicht.' },
          { icon: 'Link', title: 'Lock‑in', desc: 'Ein Provider bindet – wir halten Sie flexibel.' },
        ],
        solution_preview: 'Multi‑Tenancy, Provider‑Agnostik und Observability – in einer Plattform.',
      },
      value_props: {
        headline: 'Produktionsreife Features, die zählen',
        pillars: [
          {
            icon: 'Layers',
            title: 'Integrierte Architektur',
            body: 'Gateway, State, Security & Tools greifen ineinander.',
            detail: 'Komplett statt Stückwerk.',
          },
          {
            icon: 'Lock',
            title: 'Echte Isolation',
            body: 'RLS & Policies auf DB‑Ebene.',
            detail: 'Sicher auditierbar.',
          },
          {
            icon: 'RefreshCw',
            title: 'LLM‑Flexibilität',
            body: 'OpenAI heute, Claude morgen – 1 API Call.',
            detail: 'Preise verhandeln ohne Rewrites.',
          },
          {
            icon: 'ShieldCheck',
            title: 'Souveränität',
            body: 'Open Source + Self‑Hosting möglich.',
            detail: 'Volle Transparenz.',
          },
        ],
      },
      pricing: {
        headline: 'Transparent. Fair. Skalierbar.',
        subtitle: 'Starten Sie kostenlos, wachsen Sie nach Bedarf',
        tiers: [
          {
            name: 'Open Source',
            price: '€0',
            period: 'für immer',
            description: 'Perfekt für Entwicklung & Testing',
            features: [
              'Kompletter VAE Core Stack',
              'Self‑Hosting (Docker)',
              'Community Support',
              'Alle Core‑Features',
              'Unbegrenzte Projekte',
            ],
            cta: 'GitHub Repository',
            popular: false,
          },
          {
            name: 'Managed Pro',
            price: '€149',
            period: '/Monat',
            description: 'Konzentrieren Sie sich aufs Produkt',
            features: [
              'EU‑Hosting',
              '5M Tokens inkl.',
              '3 Team‑Seats',
              'Email Support',
              'SLA 99.5%',
              '+ €0.50 / 100k extra Tokens',
            ],
            cta: 'Pro Plan starten',
            popular: true,
          },
          {
            name: 'Enterprise',
            price: 'ab €1.500',
            period: '/Monat',
            description: 'Hohe Sicherheits‑/Compliance‑Anforderungen',
            features: [
              'Dedicated Cloud/On‑Prem',
              'Unbegrenzte Tokens & User',
              'SSO & Advanced RBAC',
              'Priority Support & SLA',
              'Custom Compliance',
            ],
            cta: 'Gespräch vereinbaren',
            popular: false,
          },
        ],
        guarantee: '30 Tage Geld‑zurück‑Garantie • Jederzeit kündbar • Keine Setup‑Gebühren',
      },
      tech_deep_dive: {
        headline: 'Transparente Architektur für maximale Performance',
        intro: 'Bewährte Technologien für produktionsreife KI‑Apps.',
        architecture_benefits: [
          'PostgreSQL + Row‑Level Security (RLS) für Multi‑Tenancy',
          'OpenAI‑kompatibles Gateway – alle Provider, ein API',
          'MCP‑basierte Tool‑Orchestration mit Sicherheitsgrenzen',
          'pgvector für Embeddings',
          'Tracing & Token‑Accounting out‑of‑the‑box',
        ],
        tech_stack: [
          { name: 'Frontend', techs: ['React', 'TypeScript', 'Tailwind'] },
          { name: 'Backend', techs: ['Supabase', 'PostgreSQL', 'Edge Functions'] },
          { name: 'AI/ML', techs: ['OpenAI', 'Anthropic', 'Ollama', 'pgvector'] },
          { name: 'Infrastructure', techs: ['Docker', 'Kubernetes', 'Cloud‑Agnostic'] },
        ],
      },
      comparison_brief: {
        headline: 'VAE Core vs. Alternativen',
        subtitle: 'Warum Einzellösungen nicht reichen',
        comparisons: [
          {
            alternative: 'LangChain + Custom Backend',
            vae_advantage: 'Komplette Infrastruktur statt nur Bibliothek',
            time_saved: '6–12 Monate',
          },
          {
            alternative: 'Assistants API',
            vae_advantage: 'Provider‑Unabhängigkeit + EU‑Hosting',
            time_saved: 'Lock‑in vermieden',
          },
          {
            alternative: 'Portkey/LiteLLM',
            vae_advantage: 'Gateway + State + Multi‑Tenancy integriert',
            time_saved: '3–6 Monate',
          },
        ],
      },
      roadmap: {
        headline: 'Roadmap bis Launch (Q2 2026)',
        subtitle: 'Transparente Entwicklung mit klaren Meilensteinen',
        phases: [
          {
            quarter: 'Q4 2025',
            title: 'Foundation',
            status: 'In Entwicklung',
            items: ['Core Infrastructure', 'Multi‑Tenant Security', 'Gateway'],
          },
          {
            quarter: 'Q1 2026',
            title: 'Integration',
            status: 'Geplant',
            items: ['MCP Workflow', 'Provider Abstraction', 'Observability'],
          },
          {
            quarter: 'Q2 2026',
            title: 'Public Preview',
            status: 'Ziel',
            items: ['Beta Launch', 'Documentation', 'Design Partner Feedback'],
          },
        ],
        early_access: 'Design‑Partner erhalten 60 Tage früheren Zugang.',
      },
      final_cta: {
        headline: 'Bereit, produktionsreif zu bauen?',
        subtitle: 'Buchen Sie eine Demo oder starten Sie mit Open Source.',
        primary_ctas: [
          { text: 'Demo buchen', href: '/contact?intent=demo', style: 'primary' },
          { text: 'GitHub Repository', href: 'https://github.com/vae-systems/vae-core', style: 'secondary' },
        ],
        secondary_info: 'Fragen? core@vae-systems.com',
      },
    },
    agencies: {
      meta: {
        title: 'VAE Core für Agenturen – Wiederverwendbarer Stack für profitable Delivery',
        description: 'Standardisierte Architektur, Templates und Enablement erhöhen Ihre Marge und Skalierbarkeit.',
      },
      hero: {
        titlePre: 'VAE Core für',
        titleMain: 'Agenturen',
        badge: 'Wiederverwendbarer KI‑Stack',
        hook: 'Delivery standardisieren, Marge erhöhen',
        subline: 'Ein Stack, viele Projekte – konsistente Qualität, weniger Overhead.',
        lead: 'Wiederverwendbare Module, klare Patterns und Provider‑Agnostik ermöglichen planbare Delivery und bessere Preise.',
        stats: [
          { value: '70%', label: 'weniger Setup‑Zeit' },
          { value: '40–60%', label: 'höhere Marge' },
          { value: '5+', label: 'Projekte parallel' },
        ],
      },
      problem: {
        headline: 'Skalierung ohne Qualitätseinbußen',
        pain_points: [
          { icon: 'Settings', title: 'Projekt‑Neustart', desc: 'Immer wieder von vorne – ineffizient und teuer.' },
          { icon: 'TrendingUp', title: 'Wartungsdruck', desc: 'Nacharbeiten und Betrieb drücken die Marge.' },
          {
            icon: 'Shield',
            title: 'Qualitätssicherung',
            desc: 'Fehlende Standards erschweren verlässliche Ergebnisse.',
          },
          { icon: 'Link', title: 'Provider‑Mix', desc: 'Kunden fordern unterschiedliche LLM‑Anbieter.' },
        ],
        solution_preview: 'Standardisierte Plattform‑Bausteine und Playbooks machen Delivery planbar.',
      },
      value_props: {
        headline: 'Ihr Wettbewerbsvorteil',
        pillars: [
          {
            icon: 'Layers',
            title: 'Standardisierte Architektur',
            body: 'Wiederverwendbare Module und Templates.',
            detail: 'Konsistente Qualität, weniger Risiko.',
          },
          {
            icon: 'RefreshCw',
            title: 'Provider‑Agnostik',
            body: 'Alle gängigen LLMs ohne Custom‑Ballast.',
            detail: 'Strategische Freiheit.',
          },
          {
            icon: 'Lock',
            title: 'Wartbarkeit',
            body: 'Dokumentierte Patterns & Governance.',
            detail: 'Weniger Nacharbeiten.',
          },
          {
            icon: 'ShieldCheck',
            title: 'Sichere Tool‑Execution',
            body: 'MCP mit klaren Grenzen.',
            detail: 'Für sensible Prozesse.',
          },
        ],
      },
      pricing: {
        headline: 'Partner‑Programme',
        subtitle: 'Enablement, Konditionen, Co‑Delivery',
        tiers: [
          {
            name: 'Open Source',
            price: '€0',
            period: '',
            description: 'Für Evaluation & erste Projekte',
            features: ['VAE Core', 'Docker‑Setup', 'Community Support', 'Dokumentation'],
            cta: 'GitHub Repository',
            popular: false,
          },
          {
            name: 'Managed Pro',
            price: '€149',
            period: '/Monat',
            description: 'Konzentriert auf Delivery',
            features: ['EU‑Hosting', '5M Tokens inkl.', '3 Team‑Seats', 'SLA 99.5%'],
            cta: 'Pro Plan starten',
            popular: false,
          },
          {
            name: 'Agentur‑Partner',
            price: 'auf Anfrage',
            period: '',
            description: 'Co‑Delivery & Go‑To‑Market',
            features: [
              'Lead‑Sharing & Co‑Marketing',
              'Enablement & Templates',
              'Priorisierter Support',
              'Playbooks & Best Practices',
            ],
            cta: 'Partner‑Programm anfragen',
            popular: true,
          },
        ],
        guarantee: 'Fair, transparent, ohne Lock‑in.',
      },
      tech_deep_dive: {
        headline: 'Transparenz & Wiederverwendung',
        intro: 'Ein Stack für viele Projekte – mit klaren Grenzen und Observability.',
        architecture_benefits: [
          'Module für typische Anwendungsfälle',
          'Observability & Token‑Accounting integriert',
          'MCP‑basierte Tools mit Client/Server‑Trennung',
          'Dokumentierte Delivery‑Patterns',
        ],
        tech_stack: [
          { name: 'Frontend', techs: ['React', 'TypeScript'] },
          { name: 'Backend', techs: ['Supabase', 'PostgreSQL'] },
          { name: 'AI/ML', techs: ['OpenAI', 'Anthropic', 'Ollama'] },
          { name: 'Infra', techs: ['Docker', 'Kubernetes'] },
        ],
      },
      comparison_brief: {
        headline: 'VAE Core vs. „Jedes Mal neu“',
        subtitle: 'Weniger Risiko, mehr Profitabilität',
        comparisons: [
          {
            alternative: 'Individuelle Infrastruktur',
            vae_advantage: 'Standardisierte Plattform',
            time_saved: 'Monate sparen',
          },
          {
            alternative: 'Ein‑Provider‑Stack',
            vae_advantage: 'Agnostisch & erweiterbar',
            time_saved: 'Lock‑in vermeiden',
          },
          {
            alternative: 'Ad‑hoc Monitoring',
            vae_advantage: 'Observability integriert',
            time_saved: 'Troubleshooting schneller',
          },
        ],
      },
      roadmap: {
        headline: 'Roadmap bis Launch (Q2 2026)',
        subtitle: 'Mit Partnern priorisiert',
        phases: [
          {
            quarter: 'Q4 2025',
            title: 'Foundation',
            status: 'In Entwicklung',
            items: ['Core & Policies', 'Gateway', 'Templates'],
          },
          {
            quarter: 'Q1 2026',
            title: 'Partner Enablement',
            status: 'Geplant',
            items: ['Playbooks', 'Module', 'Best Practices'],
          },
          { quarter: 'Q2 2026', title: 'Public Preview', status: 'Ziel', items: ['Docs', 'Beta', 'Feedback'] },
        ],
        early_access: 'Agentur‑Partner erhalten früheren Zugriff und Support.',
      },
      final_cta: {
        headline: 'Partner werden?',
        subtitle: 'Wir sprechen über Konditionen, Enablement und gemeinsame Cases.',
        primary_ctas: [
          { text: 'Partner‑Programm anfragen', href: '/contact?intent=partner', style: 'primary' },
          { text: 'GitHub Repository', href: 'https://github.com/vae-systems/vae-core', style: 'secondary' },
        ],
        secondary_info: 'Kontakt: partners@vae-systems.com',
      },
    },
    oss: {
      meta: {
        title: 'VAE Core Open Source – Lernen, Forschen, Bauen',
        description:
          'Kostenfrei für nicht‑kommerzielle Nutzung: Schulen, Hochschulen, private Projekte. Transparent, dokumentiert, lokal startbar.',
      },
      hero: {
        titlePre: 'VAE Core',
        titleMain: 'Open Source',
        badge: 'Community & Bildung',
        hook: 'Produktionsreife Architektur zum Lernen und Mitmachen',
        subline: 'Lokal mit Docker, klare Schnittstellen, echte Mehrwert‑Bausteine.',
        lead: 'Ideal für Lehre, Forschung und private Projekte – mit Upgrade‑Pfad zu Managed/Enterprise.',
        stats: [
          { value: '€0', label: 'nicht‑kommerzielle Nutzung' },
          { value: '10min', label: 'Setup mit Docker' },
          { value: '100%', label: 'Transparenz' },
        ],
      },
      problem: {
        headline: 'Lernen mit Produktions‑Qualität',
        pain_points: [
          { icon: 'Settings', title: 'Demo‑Frameworks', desc: 'Viele Tools taugen nur für Demos.' },
          { icon: 'TrendingUp', title: 'Fehlende Struktur', desc: 'Schwer, den Weg zur Produktion zu verstehen.' },
          { icon: 'Shield', title: 'Black‑Box', desc: 'Wenig Einsicht, keine Kontrolle.' },
          { icon: 'Link', title: 'Lock‑in', desc: 'Kein offener Pfad in professionelle Nutzung.' },
        ],
        solution_preview: 'Offen, dokumentiert, lokal – und upgrade‑fähig.',
      },
      value_props: {
        headline: 'Warum VAE Core für OS?',
        pillars: [
          {
            icon: 'Layers',
            title: 'Echte Architektur',
            body: 'Lernen an produktionsreifen Bausteinen.',
            detail: 'Nicht nur Spielzeug.',
          },
          {
            icon: 'ShieldCheck',
            title: 'Transparenz',
            body: 'Open‑Source‑Kern, verständliche Docs.',
            detail: 'Volle Nachvollziehbarkeit.',
          },
          {
            icon: 'RefreshCw',
            title: 'Upgrade‑Pfad',
            body: 'Von lokal zu Managed/Enterprise.',
            detail: 'Wenn es ernst wird.',
          },
          {
            icon: 'Lock',
            title: 'Souveränität',
            body: 'Lokal betreibbar – volle Datenkontrolle.',
            detail: 'Perfekt für Bildung.',
          },
        ],
      },
      pricing: {
        headline: 'Open Source & Community',
        subtitle: 'Kostenfrei für nicht‑kommerzielle Nutzung',
        tiers: [
          {
            name: 'Open Source',
            price: '€0',
            period: '',
            description: 'Schulen, Hochschulen, private Projekte',
            features: ['Quelloffen', 'Docker‑Compose Setup', 'Community Support', 'Beitragen willkommen'],
            cta: 'Zu GitHub',
            popular: true,
          },
          {
            name: 'Community Sponsor',
            price: '€9',
            period: '/Monat',
            description: 'Unterstützen Sie das Projekt',
            features: ['Badge im Repo', 'Priorisierte Issue‑Antworten', 'Einladung zur Community‑Call'],
            cta: 'Sponsor werden',
            popular: false,
          },
        ],
        guarantee: 'Lizenz: nicht‑kommerziell. Kommerzielle Nutzung via Managed/Enterprise.',
      },
      tech_deep_dive: {
        headline: 'Build locally, think production‑grade',
        intro: 'Schnell starten, sauber lernen, später upgraden.',
        architecture_benefits: [
          'Klares Modul‑Denken statt Monolith',
          'Observability‑Basis für Debugging & Lernen',
          'Provider‑Agnostik erklärt an Beispielen',
          'Sichere Tool‑Ausführung (MCP) nachvollziehbar',
        ],
        tech_stack: [
          { name: 'Frontend', techs: ['React', 'TypeScript'] },
          { name: 'Backend', techs: ['Supabase', 'PostgreSQL'] },
          { name: 'AI/ML', techs: ['OpenAI', 'Anthropic', 'Ollama'] },
          { name: 'Infra', techs: ['Docker', 'CI'] },
        ],
      },
      comparison_brief: {
        headline: 'Warum VAE Core für OS?',
        subtitle: 'Lernen, das in der Praxis trägt',
        comparisons: [
          {
            alternative: 'Nur‑Demo‑Frameworks',
            vae_advantage: 'Produktionsreife Architektur',
            time_saved: 'Realitätsnah',
          },
          {
            alternative: 'Geschlossene Systeme',
            vae_advantage: 'Open‑Source‑Transparenz',
            time_saved: 'Wissen wächst',
          },
          { alternative: 'Ohne Upgrade‑Pfad', vae_advantage: 'Klarer Weg zu Managed', time_saved: 'Skalierbar' },
        ],
      },
      roadmap: {
        headline: 'Roadmap mit Community',
        subtitle: 'Offene Entwicklung, sichtbares Feedback',
        phases: [
          {
            quarter: 'Q4 2025',
            title: 'OS‑Foundation',
            status: 'In Entwicklung',
            items: ['Docker Setup', 'Docs Basics', 'Issue‑Templates'],
          },
          {
            quarter: 'Q1 2026',
            title: 'Module & Examples',
            status: 'Geplant',
            items: ['Beispiel‑Projekte', 'Didaktische Guides', 'Community‑Calls'],
          },
          {
            quarter: 'Q2 2026',
            title: 'Public Preview',
            status: 'Ziel',
            items: ['Stabile Releases', 'Contrib‑Guides', 'Showcase‑Wettbewerb'],
          },
        ],
        early_access: 'Join the community – Feedback steuert die Prioritäten.',
      },
      final_cta: {
        headline: 'Mitmachen?',
        subtitle: 'Starte lokal, öffne ein Issue oder sende einen PR.',
        primary_ctas: [
          { text: 'Zu GitHub', href: 'https://github.com/vae-systems/vae-core', style: 'primary' },
          { text: 'Community beitreten', href: '/contact?intent=community', style: 'secondary' },
        ],
        secondary_info: 'Lizenz: nicht‑kommerziell. Für kommerzielle Nutzung kontaktiere uns.',
      },
    },
  },
}
