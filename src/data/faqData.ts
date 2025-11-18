export type FaqCategoryId = 'technology' | 'business' | 'career' | 'projects' | 'general'

export interface FaqCategory {
  id: FaqCategoryId
  label: string
  description: string
  range: string
}

export interface FaqCta {
  label: string
  href: string
}

export interface FaqEntry {
  id: string
  categoryId: FaqCategoryId
  question: string
  answer: string
  keywords: string[]
  tags?: string[]
  cta?: FaqCta
}

export const faqCategories: FaqCategory[] = [
  {
    id: 'technology',
    label: 'Technologie',
    description: 'Architektur, Sicherheit, Stack-Entscheidungen.',
    range: '15–20 FAQs',
  },
  {
    id: 'business',
    label: 'Business & Prozess',
    description: 'Zusammenarbeit, Budgets, Abläufe.',
    range: '15–20 FAQs',
  },
  {
    id: 'career',
    label: 'Bewerbung & Karriere',
    description: 'Jobs, Arbeitsmodelle, Prozesse.',
    range: '10–15 FAQs',
  },
  {
    id: 'projects',
    label: 'Projekte & Use Cases',
    description: 'Timelines, Beispiele, Verantwortung.',
    range: '10–15 FAQs',
  },
  {
    id: 'general',
    label: 'Sonstiges',
    description: 'Alles, was sonst noch wichtig ist.',
    range: '5–10 FAQs',
  },
]

const CONTACT_CTA: FaqCta = {
  label: 'Kontakt aufnehmen für individuelles Angebot',
  href: '/contact',
}

const BOOKING_CTA: FaqCta = {
  label: 'Gespräch buchen',
  href: '/contact#booking',
}

const APPLY_CTA: FaqCta = {
  label: 'Jetzt bewerben',
  href: '/ueber-uns/karriere',
}

export const faqEntries: FaqEntry[] = [
  // Technologie (16)
  {
    id: 'tech-stack-choice',
    categoryId: 'technology',
    question: 'Welche Kerntechnologien setzen Sie im Backend ein?',
    answer:
      'Python, Node.js, Rust und Go – je nach Aufgabe. Wir entscheiden anhand von Performance-Profil, Teamgröße und Wartbarkeit, nicht nach Hype.',
    keywords: ['backend', 'stack', 'python', 'node', 'rust', 'go'],
  },
  {
    id: 'tech-infra-ops',
    categoryId: 'technology',
    question: 'Bauen Sie On-Prem-Infrastruktur oder ausschließlich Cloud?',
    answer:
      'Beides. Wir betreiben Cluster bei Hetzner, AWS oder vollständig on-prem. Entscheidend sind vollständige Kostentransparenz und belastbares Monitoring.',
    keywords: ['infrastruktur', 'cloud', 'on-prem', 'hetzner', 'aws'],
  },
  {
    id: 'tech-legacy',
    categoryId: 'technology',
    question: 'Wie gehen Sie mit Legacy-Code um?',
    answer:
      'Wir starten mit einem Readiness-Audit, bewerten Tests, Deployment und Sicherheit. Refactoring passiert iterativ, damit Ihre Systeme stabil bleiben.',
    keywords: ['legacy', 'audit', 'refactor', 'tests'],
  },
  {
    id: 'tech-multicloud',
    categoryId: 'technology',
    question: 'Unterstützen Sie Multi-Cloud-Setups?',
    answer:
      'Ja, wenn es einen klaren Grund gibt. Multi-Cloud erhöht Kosten und Komplexität, daher bauen wir nur dort redundant, wo das Risiko sinkt.',
    keywords: ['multi-cloud', 'redundanz', 'risiko'],
  },
  {
    id: 'tech-serverless',
    categoryId: 'technology',
    question: 'Setzen Sie auf Serverless?',
    answer:
      'Nur wenn Ihr Team damit umgehen kann und die Latenzanforderungen passen. Andernfalls nutzen wir Container oder Bare Metal mit klarer Observability.',
    keywords: ['serverless', 'latency', 'container'],
  },
  {
    id: 'tech-temporal',
    categoryId: 'technology',
    question: 'Warum nutzen Sie Temporal?',
    answer:
      'Temporal übernimmt das State-Handling bei langen Workflows. Wir verwenden es für Automationen, Billing-Flows und KI-Pipelines, damit nichts verloren geht.',
    keywords: ['temporal', 'workflows', 'automation'],
  },
  {
    id: 'tech-security',
    categoryId: 'technology',
    question: 'Wie stellen Sie Security sicher?',
    answer:
      'Bedrohungsmodell am Anfang, automatisierte Scans (Trivy, Snyk), Secrets über Vault oder Doppler sowie regelmäßige Notfall-Drills.',
    keywords: ['security', 'vault', 'trivy', 'snyk'],
  },
  {
    id: 'tech-monitoring',
    categoryId: 'technology',
    question: 'Welche Observability-Tools nutzen Sie?',
    answer: 'Grafana, Prometheus, Loki und OpenTelemetry. Logs gehören Ihnen, nicht einer SaaS-Blackbox.',
    keywords: ['observability', 'grafana', 'otel', 'monitoring'],
  },
  {
    id: 'tech-data',
    categoryId: 'technology',
    question: 'Wie sichern Sie Datenhoheit ab?',
    answer:
      'Daten bleiben bei Ihnen. Wir bevorzugen Open-Source-Datenbanken wie Postgres oder ClickHouse und verschlüsseln Cloud-Ressourcen konsequent.',
    keywords: ['daten', 'hoheit', 'postgres', 'clickhouse'],
  },
  {
    id: 'tech-modernization',
    categoryId: 'technology',
    question: 'Reduzieren Sie bestehende SaaS-Kosten?',
    answer:
      'Ja, indem wir Workflows auf Open Source migrieren. Das spart Lizenzen, erfordert aber klare Ownership in Ihrem Team.',
    keywords: ['kosten', 'saas', 'open source', 'migration'],
  },
  {
    id: 'tech-ai',
    categoryId: 'technology',
    question: 'Wie integrieren Sie KI-Modelle?',
    answer:
      'Wir nutzen OpenAI, Ollama oder eigene Modelle. Guardrails mit Input-Sanitizing, Rate-Limits und messbarer Qualität sind Pflicht.',
    keywords: ['ki', 'openai', 'ollama', 'guard'],
  },
  {
    id: 'tech-ci',
    categoryId: 'technology',
    question: 'Welche CI/CD-Strategie fahren Sie?',
    answer:
      'GitHub Actions oder GitLab CI mit Staging- und Review-Umgebungen. Deployments laufen automatisiert, Rollbacks stehen immer bereit.',
    keywords: ['ci', 'cd', 'github actions', 'gitlab', 'deployments'],
  },
  {
    id: 'tech-a11y',
    categoryId: 'technology',
    question: 'Spielt Accessibility für Sie eine Rolle?',
    answer:
      'Ja. Wir testen mit axe, Screenreadern und prefers-reduced-motion. Accessibility ist Teil unserer Definition of Done.',
    keywords: ['accessibility', 'axe', 'screenreader'],
  },
  {
    id: 'tech-performance',
    categoryId: 'technology',
    question: 'Optimieren Sie WebGL/Three.js-Projekte?',
    answer:
      'Ja, sofern es dem Produkt dient. Wir budgetieren Draw Calls, nutzen Instancing und testen auf Low-End-Geräten.',
    keywords: ['webgl', 'three.js', 'performance'],
  },
  {
    id: 'tech-migrations',
    categoryId: 'technology',
    question: 'Übernehmen Sie Datenmigrationen?',
    answer:
      'Ja. Wir planen Migrationspfade, schreiben reversible Scripts und testen auf Kopien Ihrer echten Daten. Keine Live-Experimente.',
    keywords: ['migration', 'daten', 'scripts'],
  },
  {
    id: 'tech-support',
    categoryId: 'technology',
    question: 'Gibt es nach dem Go-Live Support?',
    answer:
      'Ja, als Retainer oder On-Demand-SLA. Wir dokumentieren alles so, dass Sie auch ohne uns weiterarbeiten können.',
    keywords: ['support', 'retainer', 'sla', 'dokumentation'],
  },

  // Business & Prozess (17)
  {
    id: 'biz-pricing',
    categoryId: 'business',
    question: 'Was kostet eine Zusammenarbeit mit VAE Systems?',
    answer:
      'Es hängt von Scope, Risiken und Teamzuschnitt ab. Wir rechnen transparent und liefern nur, was Sie wirklich brauchen.',
    keywords: ['kosten', 'budget', 'preise'],
    cta: CONTACT_CTA,
  },
  {
    id: 'biz-budget-flex',
    categoryId: 'business',
    question: 'Bieten Sie flexible Budget-Modelle an?',
    answer:
      'Ja. Festpreis für klaren Scope, Time & Material für Forschung oder Shared-Risk-Modelle. Wir treffen die Entscheidung gemeinsam.',
    keywords: ['budget', 'modelle', 'shared risk'],
    cta: BOOKING_CTA,
  },
  {
    id: 'biz-timeline',
    categoryId: 'business',
    question: 'Wie lange dauert ein typisches Projekt?',
    answer:
      'Audits benötigen 2–4 Wochen. Komplexe Plattformen laufen über mehrere Monate. Sobald der Scope steht, erhalten Sie eine belastbare Timeline.',
    keywords: ['timeline', 'dauer', 'audit'],
  },
  {
    id: 'biz-scope-change',
    categoryId: 'business',
    question: 'Was passiert bei Scope-Änderungen?',
    answer: 'Wir stoppen, bewerten Impact und Kosten und entscheiden gemeinsam mit Ihnen. Keine stillen Mehrkosten.',
    keywords: ['scope', 'change', 'kostenkontrolle'],
  },
  {
    id: 'biz-collab',
    categoryId: 'business',
    question: 'Wie arbeiten Sie mit internen Teams zusammen?',
    answer:
      'Wir integrieren uns in Ihre Tools (Slack, Linear, Jira) und dokumentieren sauber. Ziel: Ihr Team bleibt Owner.',
    keywords: ['zusammenarbeit', 'teams', 'slack', 'linear'],
  },
  {
    id: 'biz-workshops',
    categoryId: 'business',
    question: 'Gibt es Workshops vor Projektstart?',
    answer:
      'Ja, ein Alignment-Workshop ist Standard. Wir klären Ziele, Risiken und definieren Messwerte, bevor wir Code schreiben.',
    keywords: ['workshop', 'alignment', 'kickoff'],
  },
  {
    id: 'biz-contract',
    categoryId: 'business',
    question: 'Welche Vertragsmodelle nutzen Sie?',
    answer: 'Rahmenvertrag plus Work Orders. So bleibt alles juristisch sauber und dennoch flexibel.',
    keywords: ['vertrag', 'rahmenvertrag', 'work order'],
  },
  {
    id: 'biz-payment',
    categoryId: 'business',
    question: 'Wie sehen Zahlungspläne aus?',
    answer: 'Meilensteine oder monatliche Retainer. Wichtig ist planbarer Cashflow für beide Seiten.',
    keywords: ['zahlung', 'retainer', 'meilenstein'],
  },
  {
    id: 'biz-risk',
    categoryId: 'business',
    question: 'Wer trägt das Risiko, wenn etwas schiefgeht?',
    answer:
      'Wir übernehmen Verantwortung für unsere Arbeit, verteilen Risiken aber transparent. Deshalb dokumentieren wir Entscheidungen nachvollziehbar.',
    keywords: ['risiko', 'verantwortung', 'entscheidung'],
  },
  {
    id: 'biz-ip',
    categoryId: 'business',
    question: 'Wem gehört der Code?',
    answer: 'Ihnen. Wir übertragen IP mit jeder Zahlung. Keine versteckten Nutzungsrechte und kein Vendor-Lock-in.',
    keywords: ['ip', 'code', 'rechte', 'vendor lock-in'],
  },
  {
    id: 'biz-availability',
    categoryId: 'business',
    question: 'Wie kurzfristig können Sie starten?',
    answer:
      'Es kommt auf den Scope an. Für Audits haben wir Slots in wenigen Wochen, für große Builds planen wir 4–6 Wochen Vorlauf.',
    keywords: ['verfügbarkeit', 'start', 'audits'],
  },
  {
    id: 'biz-retainer',
    categoryId: 'business',
    question: 'Bieten Sie langfristige Betreuung?',
    answer: 'Ja, als Operations-Retainer oder Embedded-Team mit klaren SLAs.',
    keywords: ['betreuung', 'retainer', 'sla'],
  },
  {
    id: 'biz-communication',
    categoryId: 'business',
    question: 'Wie oft reporten Sie?',
    answer:
      'Wöchentliches Status-Update als Minimum. Größere Programme laufen mit Steering-Meetings und schriftlicher Dokumentation.',
    keywords: ['reporting', 'status', 'steering'],
  },
  {
    id: 'biz-audit',
    categoryId: 'business',
    question: 'Führen Sie auch reine Audits durch?',
    answer: 'Ja. Wir auditieren Infrastruktur, Code oder Prozesse und liefern konkrete Action Items.',
    keywords: ['audit', 'prozess', 'action items'],
  },
  {
    id: 'biz-tools',
    categoryId: 'business',
    question: 'Welche Tools nutzen Sie für Projektsteuerung?',
    answer:
      'Linear für Product, Notion/Confluence für Dokumentation, Miro für Workshops. Wenn Sie andere Tools bevorzugen, passen wir uns an.',
    keywords: ['tools', 'linear', 'notion', 'miro'],
  },
  {
    id: 'biz-escalation',
    categoryId: 'business',
    question: 'Wie läuft Eskalation?',
    answer: 'Es gibt einen festen Owner bei Ihnen und bei uns. Probleme werden sofort adressiert, nicht geschönt.',
    keywords: ['eskalation', 'owner', 'probleme'],
  },
  {
    id: 'biz-budget-guard',
    categoryId: 'business',
    question: 'Wie stellen Sie sicher, dass Budgets nicht explodieren?',
    answer:
      'Transparente Burn-Rate, Forecast pro Sprint und klare Prioritäten. Sobald etwas aus dem Rahmen läuft, stoppen wir.',
    keywords: ['budget', 'kontrolle', 'forecast'],
    cta: CONTACT_CTA,
  },

  // Bewerbung & Karriere (12)
  {
    id: 'career-salary',
    categoryId: 'career',
    question: 'Wie hoch ist die Vergütung bei VAE Systems?',
    answer:
      'Sie richtet sich nach Rolle und Level. Wir zahlen fair und marktgerecht; konkrete Zahlen klären wir im Prozess.',
    keywords: ['gehalt', 'salary', 'vergütung'],
    cta: APPLY_CTA,
  },
  {
    id: 'career-remote',
    categoryId: 'career',
    question: 'Ist Remote-Arbeit möglich?',
    answer: 'Ja. Wir arbeiten verteilt. Onsite nur, wenn ein Projekt es zwingend erfordert.',
    keywords: ['remote', 'home office', 'verteiltes team'],
  },
  {
    id: 'career-employment',
    categoryId: 'career',
    question: 'Suchen Sie Vollzeit- oder Freelance-Rollen?',
    answer: 'Beides. Wir haben feste Rollen und flexible Slots für Spezialist:innen.',
    keywords: ['vollzeit', 'freelance', 'hybrid'],
  },
  {
    id: 'career-application',
    categoryId: 'career',
    question: 'Wie läuft Ihr Bewerbungsprozess ab?',
    answer:
      'Kurzes Intro, Tech-Talk mit dem Team, optional Case oder Pairing. Sie erhalten Feedback, auch wenn es nicht passt.',
    keywords: ['bewerbung', 'prozess', 'case'],
  },
  {
    id: 'career-stack',
    categoryId: 'career',
    question: 'Muss ich alle Technologien bereits beherrschen?',
    answer: 'Nein. Entscheidend sind Lernfähigkeit und Ownership. Wir onboarden in neue Stacks.',
    keywords: ['skills', 'lernen', 'stack'],
  },
  {
    id: 'career-hours',
    categoryId: 'career',
    question: 'Wie flexibel sind die Arbeitszeiten?',
    answer: 'Wir arbeiten asynchron. Wichtig ist, dass Deadlines und Kundentermine eingehalten werden – ohne Stechuhr.',
    keywords: ['arbeitszeit', 'flexibel', 'async'],
  },
  {
    id: 'career-growth',
    categoryId: 'career',
    question: 'Gibt es Weiterentwicklung?',
    answer: 'Ja. Pairing, Lernbudgets und Konferenzen. Wir erwarten, dass Sie Wissen teilen.',
    keywords: ['entwicklung', 'lernen', 'konferenz'],
  },
  {
    id: 'career-tooling',
    categoryId: 'career',
    question: 'Welche Tools nutzen Sie intern?',
    answer: 'Linear, Notion, GitHub und Figma. Wir halten Tool-Sprawl bewusst klein.',
    keywords: ['tools', 'linear', 'github', 'figma'],
  },
  {
    id: 'career-feedback',
    categoryId: 'career',
    question: 'Wie geben Sie Feedback?',
    answer: 'Direkt, schriftlich und mit konkreten Handlungsempfehlungen. Kein Buzzword-Bingo.',
    keywords: ['feedback', 'kultur', 'ehrlich'],
  },
  {
    id: 'career-onboarding',
    categoryId: 'career',
    question: 'Wie läuft Onboarding?',
    answer: 'Sie erhalten eine:n Buddy, Zugang zu allen Repos und klare Ziele für die ersten Wochen.',
    keywords: ['onboarding', 'buddy', 'ziele'],
  },
  {
    id: 'career-contract',
    categoryId: 'career',
    question: 'Bieten Sie Teilzeit an?',
    answer: 'Ja, sofern das mit Kundenthemen kompatibel ist. Halbe Stelle bedeutet klar begrenzten Scope.',
    keywords: ['teilzeit', 'scope', 'planung'],
  },
  {
    id: 'career-locations',
    categoryId: 'career',
    question: 'Wo sitzt Ihr Team?',
    answer: 'Wir sind verteilt in Deutschland und Österreich. Das HQ ist dort, wo gerade Wert geschaffen wird.',
    keywords: ['standort', 'deutschland', 'österreich'],
  },

  // Projekte & Use Cases (12)
  {
    id: 'projects-startups',
    categoryId: 'projects',
    question: 'Arbeiten Sie mit Startups?',
    answer: 'Ja. Von MVP bis Series A. Wir wissen, dass Budget knapp ist, aber Qualität trotzdem zählen muss.',
    keywords: ['startup', 'mvp', 'series a'],
  },
  {
    id: 'projects-corporate',
    categoryId: 'projects',
    question: 'Übernehmen Sie auch Corporate-Projekte?',
    answer:
      'Ja, wenn wir Impact haben. Längere Entscheidungswege sind akzeptabel, solange das Ziel klar definiert ist.',
    keywords: ['corporate', 'impact', 'entscheidungsweg'],
  },
  {
    id: 'projects-audit-duration',
    categoryId: 'projects',
    question: 'Wie lange dauert ein DevOps-Audit?',
    answer: 'Zwei bis vier Wochen intensive Analyse, danach klare Empfehlungen.',
    keywords: ['devops', 'audit', 'dauer'],
  },
  {
    id: 'projects-kickoff',
    categoryId: 'projects',
    question: 'Wie starten Sie ein Projekt?',
    answer: 'Mit einem Deep-Dive-Workshop, Infrastrukturzugang und eindeutig geregelten Verantwortlichkeiten.',
    keywords: ['kickoff', 'deep dive', 'zugang'],
  },
  {
    id: 'projects-failure',
    categoryId: 'projects',
    question: 'Was passiert, wenn ein Risiko eintritt?',
    answer:
      'Wir eskalieren sofort, dokumentieren den Impact und schlagen belastbare Optionen vor. Schweigen ist keine Option.',
    keywords: ['risiko', 'eskalation', 'impact'],
  },
  {
    id: 'projects-handover',
    categoryId: 'projects',
    question: 'Wie funktioniert die Übergabe nach dem Projekt?',
    answer: 'Wir übergeben Dokumentation, Playbooks und führen ein Handover mit Ihrem Team durch.',
    keywords: ['handover', 'doku', 'playbooks'],
  },
  {
    id: 'projects-responsibility',
    categoryId: 'projects',
    question: 'Übernehmen Sie die Gesamtverantwortung?',
    answer: 'Ja, sofern wir ausreichend Entscheidungsrechte haben. Andernfalls arbeiten wir als Embedded-Team.',
    keywords: ['verantwortung', 'entscheidungen', 'embedded'],
  },
  {
    id: 'projects-standups',
    categoryId: 'projects',
    question: 'Gibt es tägliche Stand-ups?',
    answer: 'Nur wenn sie Mehrwert bieten. Wir bevorzugen asynchrone Updates und nutzen Live-Calls für Entscheidungen.',
    keywords: ['standup', 'async', 'updates'],
  },
  {
    id: 'projects-quality',
    categoryId: 'projects',
    question: 'Wie stellen Sie Qualität sicher?',
    answer: 'Review-Pflicht, automatisierte Tests und Monitoring ab Tag eins. Wir geben nichts Ungetestetes frei.',
    keywords: ['qualität', 'tests', 'review'],
  },
  {
    id: 'projects-scale',
    categoryId: 'projects',
    question: 'Übernehmen Sie auch kleine Projekte?',
    answer: 'Ja, wenn sie ein echtes Problem lösen. Nice-to-have-Ideen lehnen wir ab.',
    keywords: ['kleine projekte', 'problem', 'ablehnung'],
  },
  {
    id: 'projects-llm',
    categoryId: 'projects',
    question: 'Setzen Sie produktive LLM-Use-Cases um?',
    answer: 'Ja, von Retrieval-Augmented-Generation bis Agenten. Wir bauen nur, wenn Datenqualität gesichert ist.',
    keywords: ['llm', 'rag', 'agenten'],
  },
  {
    id: 'projects-success',
    categoryId: 'projects',
    question: 'Wie messen Sie Erfolg?',
    answer: 'Über klar definierte KPIs: Deploy-Zeit, Ausfallminuten, Churn, Conversion. Kein Vanity-Reporting.',
    keywords: ['erfolg', 'kpi', 'metrics'],
  },

  // Sonstiges (7)
  {
    id: 'general-contact',
    categoryId: 'general',
    question: 'Kann ich Sie spontan anrufen?',
    answer: 'Ja, aber eine kurze Mail mit Kontext spart Ihnen Zeit. So bereiten wir direkt Antworten vor.',
    keywords: ['kontakt', 'anruf', 'mail'],
  },
  {
    id: 'general-nda',
    categoryId: 'general',
    question: 'Unterschreiben Sie ein NDA?',
    answer: 'Ja. Wir haben eigene Templates und nutzen bei Bedarf Ihre Unterlagen.',
    keywords: ['nda', 'vertraulichkeit', 'vertrag'],
  },
  {
    id: 'general-language',
    categoryId: 'general',
    question: 'In welchen Sprachen arbeiten Sie?',
    answer: 'Deutsch und Englisch. Dokumentation liefern wir in der Sprache, die Ihr Team benötigt.',
    keywords: ['sprache', 'deutsch', 'englisch'],
  },
  {
    id: 'general-meetings',
    categoryId: 'general',
    question: 'Welche Meeting-Kultur verfolgen Sie?',
    answer: 'Meetings mit Agenda, klarer Dauer und Owner. Alles andere gehört in eine Mail.',
    keywords: ['meeting', 'agenda', 'owner'],
  },
  {
    id: 'general-failure',
    categoryId: 'general',
    question: 'Wie gehen Sie mit Fehlern um?',
    answer: 'Post-Mortem, Root-Cause-Analyse und Maßnahmenliste. Kein Fingerpointing, aber konsequente Konsequenzen.',
    keywords: ['fehler', 'post mortem', 'root cause'],
  },
  {
    id: 'general-transparency',
    categoryId: 'general',
    question: 'Wie transparent sind Sie?',
    answer: 'Wir teilen Roadmaps, Risiken und Blocker offen. Wenn etwas unsicher ist, sagen wir das.',
    keywords: ['transparenz', 'roadmap', 'risiko'],
  },
  {
    id: 'general-ethics',
    categoryId: 'general',
    question: 'Gibt es Projekte, die Sie ablehnen?',
    answer: 'Ja. Kein Surveillance, keine Dark Patterns, keine Projekte gegen unsere Werte.',
    keywords: ['ethik', 'ablehnung', 'werte'],
  },
]
