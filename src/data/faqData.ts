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
    question: 'Welche Kerntechnologien setzt ihr im Backend ein?',
    answer:
      'Python, Node.js, Rust und Go – je nach Task. Wir entscheiden nach Performance-Profil, Teamgröße und Wartbarkeit, nicht nach Hype.',
    keywords: ['backend', 'stack', 'python', 'node', 'rust', 'go'],
  },
  {
    id: 'tech-infra-ops',
    categoryId: 'technology',
    question: 'Baut ihr On-Prem-Infrastruktur oder nur Cloud?',
    answer:
      'Beides. Wir betreiben Cluster bei Hetzner, AWS oder komplett on-prem. Wichtig ist: volle Transparenz über Kosten und Monitoring.',
    keywords: ['infrastruktur', 'cloud', 'on-prem', 'hetzner', 'aws'],
  },
  {
    id: 'tech-legacy',
    categoryId: 'technology',
    question: 'Wie geht ihr mit Legacy-Code um?',
    answer:
      'Wir starten mit einem Readiness-Audit, bewerten Tests, Deployment und Sicherheit. Refactor passiert iterativ, damit nichts bricht.',
    keywords: ['legacy', 'audit', 'refactor', 'tests'],
  },
  {
    id: 'tech-multicloud',
    categoryId: 'technology',
    question: 'Unterstützt ihr Multi-Cloud-Setups?',
    answer:
      'Ja, wenn es einen Grund gibt. Multi-Cloud erhöht Kosten und Komplexität, also bauen wir nur dort redundant, wo es Risiko reduziert.',
    keywords: ['multi-cloud', 'redundanz', 'risiko'],
  },
  {
    id: 'tech-serverless',
    categoryId: 'technology',
    question: 'Setzt ihr auf Serverless?',
    answer:
      'Nur wenn das Team damit umgehen kann und Latenzanforderungen passen. Sonst lieber Container oder Bare Metal mit klarer Observability.',
    keywords: ['serverless', 'latency', 'container'],
  },
  {
    id: 'tech-temporal',
    categoryId: 'technology',
    question: 'Warum nutzt ihr Temporal?',
    answer:
      'Temporal übernimmt State-Handling bei langen Workflows. Wir nutzen es für Automationen, Billing-Flows und KI-Pipelines, damit nichts verloren geht.',
    keywords: ['temporal', 'workflows', 'automation'],
  },
  {
    id: 'tech-security',
    categoryId: 'technology',
    question: 'Wie stellt ihr Security sicher?',
    answer:
      'Bedrohungsmodell am Anfang, automatisierte Scans (Trivy, Snyk), Secrets über Vault oder Doppler, und regelmäßige Notfall-Drills.',
    keywords: ['security', 'vault', 'trivy', 'snyk'],
  },
  {
    id: 'tech-monitoring',
    categoryId: 'technology',
    question: 'Welche Observability-Tools nutzt ihr?',
    answer:
      'Grafana, Prometheus, Loki, OpenTelemetry. Wichtig ist uns: Logs gehören dem Kunden, nicht einem SaaS-Blackbox.',
    keywords: ['observability', 'grafana', 'otel', 'monitoring'],
  },
  {
    id: 'tech-data',
    categoryId: 'technology',
    question: 'Wie geht ihr mit Datenhoheit um?',
    answer:
      'Daten bleiben beim Kunden. Wir bevorzugen Open-Source-Datenbanken (Postgres, ClickHouse). Wenn Cloud nötig ist, verschlüsseln wir konsequent.',
    keywords: ['daten', 'hoheit', 'postgres', 'clickhouse'],
  },
  {
    id: 'tech-modernization',
    categoryId: 'technology',
    question: 'Könnt ihr bestehende SaaS-Kosten reduzieren?',
    answer:
      'Ja, indem wir Workflows auf Open Source migrieren. Spart Lizenzkosten, braucht aber klare Ownership im Team.',
    keywords: ['kosten', 'saas', 'open source', 'migration'],
  },
  {
    id: 'tech-ai',
    categoryId: 'technology',
    question: 'Wie integriert ihr KI-Modelle?',
    answer:
      'Wir nutzen OpenAI, Ollama oder eigene Modelle. Wichtig ist Guard Rails: Input-Sanitizing, Rate-Limits und messbare Qualität.',
    keywords: ['ki', 'openai', 'ollama', 'guard'],
  },
  {
    id: 'tech-ci',
    categoryId: 'technology',
    question: 'Welche CI/CD-Strategie fahrt ihr?',
    answer:
      'GitHub Actions oder GitLab CI mit Staging- und Review-Umgebungen. Deployments laufen automatisiert, Rollbacks sind Pflicht.',
    keywords: ['ci', 'cd', 'github actions', 'gitlab', 'deployments'],
  },
  {
    id: 'tech-a11y',
    categoryId: 'technology',
    question: 'Spielt Accessibility für euch eine Rolle?',
    answer:
      'Ja. Wir testen mit axe, screenreadern und prefers-reduced-motion. Accessibility ist kein Add-on, sondern Teil des DoD.',
    keywords: ['accessibility', 'axe', 'screenreader'],
  },
  {
    id: 'tech-performance',
    categoryId: 'technology',
    question: 'Optimiert ihr WebGL/Three.js-Projekte?',
    answer:
      'Ja, aber nur wenn es dem Produkt dient. Wir budgetieren Draw Calls, nutzen Instancing und testen auf Low-End-Geräten.',
    keywords: ['webgl', 'three.js', 'performance'],
  },
  {
    id: 'tech-migrations',
    categoryId: 'technology',
    question: 'Übernehmt ihr Datenmigrationen?',
    answer:
      'Ja. Wir planen Migrationspfade, schreiben reversible Scripts und testen auf Kopien der echten Daten. Keine Live-Experimente.',
    keywords: ['migration', 'daten', 'scripts'],
  },
  {
    id: 'tech-support',
    categoryId: 'technology',
    question: 'Gibt es nach dem Go-Live Support?',
    answer:
      'Ja, als Retainer oder On-Demand-SLA. Wir dokumentieren alles so, dass ihr auch ohne uns weiterarbeiten könnt.',
    keywords: ['support', 'retainer', 'sla', 'dokumentation'],
  },

  // Business & Prozess (17)
  {
    id: 'biz-pricing',
    categoryId: 'business',
    question: 'Was kostet eine Zusammenarbeit mit euch?',
    answer:
      'Es hängt von Scope, Risiken und Teamzuschnitt ab. Wir rechnen transparent und liefern nur, was ihr wirklich braucht.',
    keywords: ['kosten', 'budget', 'preise'],
    cta: CONTACT_CTA,
  },
  {
    id: 'biz-budget-flex',
    categoryId: 'business',
    question: 'Bietet ihr flexible Budget-Modelle an?',
    answer:
      'Ja. Festpreis für klaren Scope, Time & Material für Forschung, oder Shared-Risk-Modelle. Wir entscheiden gemeinsam.',
    keywords: ['budget', 'modelle', 'shared risk'],
    cta: BOOKING_CTA,
  },
  {
    id: 'biz-timeline',
    categoryId: 'business',
    question: 'Wie lange dauert ein typisches Projekt?',
    answer:
      'Audits: 2–4 Wochen. Komplexe Plattformen: Monate. Wir geben dir eine belastbare Timeline, sobald wir den Scope kennen.',
    keywords: ['timeline', 'dauer', 'audit'],
  },
  {
    id: 'biz-scope-change',
    categoryId: 'business',
    question: 'Was passiert bei Scope-Änderungen?',
    answer: 'Wir stoppen, bewerten Impact und Kosten, und entscheiden mit dir gemeinsam. Keine stillen Mehrkosten.',
    keywords: ['scope', 'change', 'kostenkontrolle'],
  },
  {
    id: 'biz-collab',
    categoryId: 'business',
    question: 'Wie arbeitet ihr mit internen Teams zusammen?',
    answer:
      'Wir integrieren uns in eure Tools (Slack, Linear, Jira) und dokumentieren sauber. Ziel: eure Crew bleibt Owner.',
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
    question: 'Welche Vertragsmodelle nutzt ihr?',
    answer: 'Rahmenvertrag plus Work Orders. So bleibt alles juristisch sauber und flexibel.',
    keywords: ['vertrag', 'rahmenvertrag', 'work order'],
  },
  {
    id: 'biz-payment',
    categoryId: 'business',
    question: 'Wie sehen Zahlungspläne aus?',
    answer: 'Meilensteine oder monatliche Retainer. Wichtig ist Cashflow-Planbarkeit für beide Seiten.',
    keywords: ['zahlung', 'retainer', 'meilenstein'],
  },
  {
    id: 'biz-risk',
    categoryId: 'business',
    question: 'Wer trägt das Risiko, wenn etwas schiefgeht?',
    answer:
      'Wir übernehmen Verantwortung für unsere Arbeit, aber Risiken müssen transparent verteilt werden. Deshalb dokumentieren wir Entscheidungen.',
    keywords: ['risiko', 'verantwortung', 'entscheidung'],
  },
  {
    id: 'biz-ip',
    categoryId: 'business',
    question: 'Wem gehört der Code?',
    answer: 'Euch. Wir übertragen IP mit jeder Zahlung. Keine versteckten Nutzungsrechte, kein Vendor-Lock-in.',
    keywords: ['ip', 'code', 'rechte', 'vendor lock-in'],
  },
  {
    id: 'biz-availability',
    categoryId: 'business',
    question: 'Wie kurzfristig könnt ihr starten?',
    answer: 'Depends. Für Audits haben wir Slots in wenigen Wochen, für große Builds planen wir 4–6 Wochen Vorlauf.',
    keywords: ['verfügbarkeit', 'start', 'audits'],
  },
  {
    id: 'biz-retainer',
    categoryId: 'business',
    question: 'Bietet ihr langfristige Betreuung?',
    answer: 'Ja, als Operations-Retainer oder Embedded-Team. Wir setzen klare SLAs.',
    keywords: ['betreuung', 'retainer', 'sla'],
  },
  {
    id: 'biz-communication',
    categoryId: 'business',
    question: 'Wie oft wird reportet?',
    answer:
      'Wöchentliches Status-Update als Minimum. Größere Programme laufen mit Steering-Meetings und schriftlicher Doku.',
    keywords: ['reporting', 'status', 'steering'],
  },
  {
    id: 'biz-audit',
    categoryId: 'business',
    question: 'Macht ihr auch reine Audits?',
    answer: 'Ja. Wir auditieren Infrastruktur, Code oder Prozesse und liefern konkrete Action Items.',
    keywords: ['audit', 'prozess', 'action items'],
  },
  {
    id: 'biz-tools',
    categoryId: 'business',
    question: 'Welche Tools nutzt ihr für Projektsteuerung?',
    answer:
      'Linear für Product, Notion/Confluence für Doku, Miro für Workshops. Wenn ihr andere Tools habt, passen wir uns an.',
    keywords: ['tools', 'linear', 'notion', 'miro'],
  },
  {
    id: 'biz-escalation',
    categoryId: 'business',
    question: 'Wie läuft Eskalation?',
    answer: 'Es gibt einen festen Owner bei euch und bei uns. Probleme werden sofort adressiert, nicht hübschgeredet.',
    keywords: ['eskalation', 'owner', 'probleme'],
  },
  {
    id: 'biz-budget-guard',
    categoryId: 'business',
    question: 'Wie stellt ihr sicher, dass Budgets nicht explodieren?',
    answer:
      'Transparente Burn-Rate, Forecast pro Sprint und klare Prioritätslisten. Wenn etwas knallt, stoppen wir sofort.',
    keywords: ['budget', 'kontrolle', 'forecast'],
    cta: CONTACT_CTA,
  },

  // Bewerbung & Karriere (12)
  {
    id: 'career-salary',
    categoryId: 'career',
    question: 'Wie viel verdient man bei VAE Systems?',
    answer: 'Kommt auf Rolle und Level an. Wir zahlen fair und marktgerecht. Konkrete Zahlen klären wir im Prozess.',
    keywords: ['gehalt', 'salary', 'vergütung'],
    cta: APPLY_CTA,
  },
  {
    id: 'career-remote',
    categoryId: 'career',
    question: 'Ist Remote-Arbeit möglich?',
    answer: 'Ja. Wir arbeiten verteilt. Onsite gibt es nur, wenn ein Projekt das zwingend braucht.',
    keywords: ['remote', 'home office', 'verteiltes team'],
  },
  {
    id: 'career-employment',
    categoryId: 'career',
    question: 'Sucht ihr Vollzeit oder Freelance?',
    answer: 'Beides. Wir haben feste Rollen und flexible Slots für Spezialist:innen.',
    keywords: ['vollzeit', 'freelance', 'hybrid'],
  },
  {
    id: 'career-application',
    categoryId: 'career',
    question: 'Wie läuft der Bewerbungsprozess ab?',
    answer:
      'Kurzes Intro, Tech-Talk mit Team, optional Case oder Pairing. Wir geben Feedback, auch wenn es nicht passt.',
    keywords: ['bewerbung', 'prozess', 'case'],
  },
  {
    id: 'career-stack',
    categoryId: 'career',
    question: 'Muss ich alle Technologien schon können?',
    answer: 'Nein. Wichtig sind Lernfähigkeit und Ownership. Wir onboarden in neue Stacks.',
    keywords: ['skills', 'lernen', 'stack'],
  },
  {
    id: 'career-hours',
    categoryId: 'career',
    question: 'Wie flexibel sind die Arbeitszeiten?',
    answer: 'Wir arbeiten asynchron. Wichtig ist, dass Deadlines und Kundentermine stehen. Keine Stechuhr.',
    keywords: ['arbeitszeit', 'flexibel', 'async'],
  },
  {
    id: 'career-growth',
    categoryId: 'career',
    question: 'Gibt es Weiterentwicklung?',
    answer: 'Ja. Pairing, Lernbudgets, Konferenzen. Wir erwarten, dass du Wissen teilst.',
    keywords: ['entwicklung', 'lernen', 'konferenz'],
  },
  {
    id: 'career-tooling',
    categoryId: 'career',
    question: 'Welche Tools nutzt ihr intern?',
    answer: 'Linear, Notion, GitHub, Figma. Wir halten Tool-Sprawl bewusst klein.',
    keywords: ['tools', 'linear', 'github', 'figma'],
  },
  {
    id: 'career-feedback',
    categoryId: 'career',
    question: 'Wie gebt ihr Feedback?',
    answer: 'Direkt, schriftlich und mit Handlungsempfehlung. Kein Buzzword-Bingo.',
    keywords: ['feedback', 'kultur', 'ehrlich'],
  },
  {
    id: 'career-onboarding',
    categoryId: 'career',
    question: 'Wie läuft Onboarding?',
    answer: 'Du bekommst ein Buddy, Zugang zu allen Repos und klare Ziele für die ersten Wochen.',
    keywords: ['onboarding', 'buddy', 'ziele'],
  },
  {
    id: 'career-contract',
    categoryId: 'career',
    question: 'Bietet ihr Teilzeit an?',
    answer: 'Ja, wenn das mit Kundenthemen kompatibel ist. Wir planen ehrlich – halbe Stelle heißt halber Scope.',
    keywords: ['teilzeit', 'scope', 'planung'],
  },
  {
    id: 'career-locations',
    categoryId: 'career',
    question: 'Wo sitzt ihr?',
    answer: 'Wir sind verteilt in Deutschland und Österreich. HQ ist dort, wo gerade Wert geschaffen wird.',
    keywords: ['standort', 'deutschland', 'österreich'],
  },

  // Projekte & Use Cases (12)
  {
    id: 'projects-startups',
    categoryId: 'projects',
    question: 'Habt ihr mit Startups gearbeitet?',
    answer: 'Ja. Von MVP bis Series A. Wir wissen, dass Budget knapp ist, aber Qualität trotzdem zählen muss.',
    keywords: ['startup', 'mvp', 'series a'],
  },
  {
    id: 'projects-corporate',
    categoryId: 'projects',
    question: 'Übernehmt ihr auch Corporate-Projekte?',
    answer: 'Ja, wenn wir Impact haben. Langer Entscheidungsweg ist ok, solange das Ziel klar ist.',
    keywords: ['corporate', 'impact', 'entscheidungsweg'],
  },
  {
    id: 'projects-audit-duration',
    categoryId: 'projects',
    question: 'Wie lange dauert ein DevOps-Audit?',
    answer: '2–4 Wochen intensive Analyse, danach klare Empfehlungen.',
    keywords: ['devops', 'audit', 'dauer'],
  },
  {
    id: 'projects-kickoff',
    categoryId: 'projects',
    question: 'Wie startet ihr ein Projekt?',
    answer: 'Mit einem Deep-Dive-Workshop, Infrastruktur-Zugang und klaren Verantwortlichkeiten.',
    keywords: ['kickoff', 'deep dive', 'zugang'],
  },
  {
    id: 'projects-failure',
    categoryId: 'projects',
    question: 'Was passiert, wenn ein Risiko eintritt?',
    answer: 'Wir eskalieren sofort, dokumentieren Impact und schlagen Optionen vor. Schweigen ist keine Option.',
    keywords: ['risiko', 'eskalation', 'impact'],
  },
  {
    id: 'projects-handover',
    categoryId: 'projects',
    question: 'Wie funktioniert die Übergabe nach dem Projekt?',
    answer: 'Wir übergeben Dokumentation, Playbooks und führen ein Handover mit eurem Team durch.',
    keywords: ['handover', 'doku', 'playbooks'],
  },
  {
    id: 'projects-responsibility',
    categoryId: 'projects',
    question: 'Übernehmt ihr die Gesamtverantwortung?',
    answer: 'Ja, wenn wir ausreichend Entscheidungsrechte haben. Sonst arbeiten wir als Embedded-Team.',
    keywords: ['verantwortung', 'entscheidungen', 'embedded'],
  },
  {
    id: 'projects-standups',
    categoryId: 'projects',
    question: 'Gibt es tägliche Stand-ups?',
    answer: 'Nur wenn es Mehrwert bringt. Wir bevorzugen asynchrone Updates und nutzen Live-Calls für Entscheidungen.',
    keywords: ['standup', 'async', 'updates'],
  },
  {
    id: 'projects-quality',
    categoryId: 'projects',
    question: 'Wie stellt ihr Qualität sicher?',
    answer: 'Review-Pflicht, automatisierte Tests, Monitoring vom ersten Tag. Wir shippen nichts Ungetestetes.',
    keywords: ['qualität', 'tests', 'review'],
  },
  {
    id: 'projects-scale',
    categoryId: 'projects',
    question: 'Übernehmt ihr auch kleine Projekte?',
    answer: 'Ja, wenn sie ein echtes Problem lösen. Wir lehnen Projekte ab, die nur “nice to have” sind.',
    keywords: ['kleine projekte', 'problem', 'ablehnung'],
  },
  {
    id: 'projects-llm',
    categoryId: 'projects',
    question: 'Setzt ihr produktive LLM-Use-Cases um?',
    answer: 'Ja, von Retrieval-Augmented-Generation bis Agenten. Wir bauen nur, wenn Datenqualität gesichert ist.',
    keywords: ['llm', 'rag', 'agenten'],
  },
  {
    id: 'projects-success',
    categoryId: 'projects',
    question: 'Wie messt ihr Erfolg?',
    answer: 'Mit klaren KPIs: Deploy-Zeit, Ausfallminuten, Churn, Conversion. Kein Vanity-Reporting.',
    keywords: ['erfolg', 'kpi', 'metrics'],
  },

  // Sonstiges (7)
  {
    id: 'general-contact',
    categoryId: 'general',
    question: 'Kann ich euch spontan anrufen?',
    answer: 'Ja, aber eine kurze Mail mit Kontext spart dir Zeit. Dann bereiten wir direkt Antworten vor.',
    keywords: ['kontakt', 'anruf', 'mail'],
  },
  {
    id: 'general-nda',
    categoryId: 'general',
    question: 'Unterschreibt ihr ein NDA?',
    answer: 'Ja. Wir haben eigene Templates, nutzen aber auch eure Dokumente.',
    keywords: ['nda', 'vertraulichkeit', 'vertrag'],
  },
  {
    id: 'general-language',
    categoryId: 'general',
    question: 'In welchen Sprachen arbeitet ihr?',
    answer: 'Deutsch und Englisch. Dokumentation liefern wir in der Sprache, die euer Team braucht.',
    keywords: ['sprache', 'deutsch', 'englisch'],
  },
  {
    id: 'general-meetings',
    categoryId: 'general',
    question: 'Welche Meeting-Kultur fahrt ihr?',
    answer: 'Meetings mit Agenda, klarer Dauer und Owner. Alles andere ist eine Mail.',
    keywords: ['meeting', 'agenda', 'owner'],
  },
  {
    id: 'general-failure',
    categoryId: 'general',
    question: 'Wie geht ihr mit Fehlern um?',
    answer: 'Post-Mortem, Root-Cause, Maßnahmenliste. Kein Fingerpointing, aber konsequente Konsequenzen.',
    keywords: ['fehler', 'post mortem', 'root cause'],
  },
  {
    id: 'general-transparency',
    categoryId: 'general',
    question: 'Wie transparent seid ihr?',
    answer: 'Wir teilen Roadmaps, Risiken und Blocker offen. Wenn etwas unsicher ist, sagen wir das.',
    keywords: ['transparenz', 'roadmap', 'risiko'],
  },
  {
    id: 'general-ethics',
    categoryId: 'general',
    question: 'Gibt es Projekte, die ihr ablehnt?',
    answer: 'Ja. Kein Surveillance, keine Dark Patterns, keine Projekte gegen unsere Werte.',
    keywords: ['ethik', 'ablehnung', 'werte'],
  },
]
