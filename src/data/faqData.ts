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

  // Service-spezifisch (wird seitenübergreifend wiederverwendet)
  // Strategieberatung
  {
    id: 'consulting-fit',
    categoryId: 'business',
    question: 'Für wen ist diese Beratung geeignet?',
    answer:
      'Für Unternehmen, die mit KI-Strategien, Digitalisierung oder Automatisierung strategisch weiterkommen möchten – aber unsicher sind, welche Lösung sinnvoll, realistisch und wirtschaftlich ist. Besonders wertvoll ist unsere Beratung, wenn Sie bereits Berührungspunkte mit dem Thema hatten, aber noch keine klare Entscheidung treffen können.',
    keywords: ['beratung', 'strategie', 'zielgruppe'],
    tags: ['consulting', 'strategieberatung'],
  },
  {
    id: 'consulting-difference',
    categoryId: 'business',
    question: 'Worin liegt der Unterschied zu klassischen IT-Beratungen?',
    answer:
      'Wir konzentrieren uns nicht auf Infrastruktur-Setup oder technische Detailimplementierung, sondern auf strategische Entscheidungsgrundlagen: Was ist möglich? Was ist sinnvoll? Was ist wirtschaftlich? Statt fertiger Lösungen entwickeln wir mit Ihnen gemeinsam eine fundierte Strategie – transparent, nachvollziehbar und ohne Abhängigkeit.',
    keywords: ['beratung', 'strategie', 'unterschied'],
    tags: ['consulting', 'strategieberatung'],
  },
  {
    id: 'consulting-pricing',
    categoryId: 'business',
    question: 'Was kostet die Beratung?',
    answer:
      'Das kostenlose Strategiegespräch (45 Minuten) ist unverbindlich. Die Strategieentwicklung mit detaillierter Analyse, Business-Case-Kalkulation und schriftlichem Strategiepapier wird individuell nach Projektumfang kalkuliert. Sie erhalten nach dem Erstgespräch ein transparentes, schriftliches Angebot – ohne versteckte Kosten.',
    keywords: ['beratung', 'kosten', 'angebot'],
    tags: ['consulting', 'strategieberatung'],
  },
  {
    id: 'consulting-duration',
    categoryId: 'business',
    question: 'Wie lange dauert eine typische Beratung?',
    answer:
      'Das Erstgespräch findet innerhalb weniger Tage statt. Die Strategieentwicklung dauert je nach Komplexität 1–2 Wochen. Die optionale strategische Begleitung ist flexibel nach Ihrem Bedarf buchbar – von einmaligen Review-Terminen bis zu regelmäßiger Ad-hoc-Unterstützung.',
    keywords: ['beratung', 'dauer', 'timeline'],
    tags: ['consulting', 'strategieberatung'],
  },
  {
    id: 'consulting-recommendations',
    categoryId: 'business',
    question: 'Erhalte ich konkrete Handlungsempfehlungen?',
    answer:
      'Ja. Sie erhalten ein schriftliches Strategiepapier mit einer klaren IST-Analyse, Business-Case-Kalkulation und mindestens 3 konkreten Handlungsoptionen – von „minimal investment" bis zu umfassenden Szenarien. Jede Option wird hinsichtlich Aufwand, Kosten, Nutzen und Risiken transparent dargestellt.',
    keywords: ['beratung', 'empfehlungen', 'strategiepapier'],
    tags: ['consulting', 'strategieberatung'],
  },
  {
    id: 'consulting-vendor-choice',
    categoryId: 'business',
    question: 'Muss ich mich danach für VAE entscheiden?',
    answer:
      'Nein. Unser Ziel ist strategische Klarheit, nicht Verkauf. Sie erhalten fundierte Entscheidungsgrundlagen und können dann selbst entscheiden – ob mit uns, mit einem anderen Partner oder durch interne Umsetzung. Unsere Empfehlungen sind technologieneutral und auf Ihre strategischen Ziele ausgerichtet.',
    keywords: ['beratung', 'unabhängigkeit', 'entscheidung'],
    tags: ['consulting', 'strategieberatung'],
  },

  // Infrastructure-Setup
  {
    id: 'setup-fit',
    categoryId: 'projects',
    question: 'Ist ein Infrastructure-Setup für uns das Richtige – oder brauchen wir erst Beratung?',
    answer:
      'Wenn Sie bereits wissen, welche Tools Sie benötigen und eine klare Migrationsstrategie haben, können wir direkt mit dem Setup beginnen. Falls Sie unsicher sind, welche Lösung wirtschaftlich und technisch sinnvoll ist, empfehlen wir zuerst unsere strategische Beratung. Dort analysieren wir Ihre Anforderungen und entwickeln 3 konkrete Handlungsoptionen – danach können Sie fundiert entscheiden.',
    keywords: ['setup', 'infrastruktur', 'beratung'],
    tags: ['setup', 'infrastruktur'],
  },
  {
    id: 'setup-differentiator',
    categoryId: 'projects',
    question: 'Was unterscheidet VAE-Setup von Freelancern oder klassischen IT-Dienstleistern?',
    answer:
      'Wir liefern nicht nur technische Installation, sondern ein produktionsreifes End-to-End-System: Server-Hardening, automatisierte Backups, Dokumentation, Team-Training und 1 Monat Post-Launch-Support inklusive. Freelancer fokussieren oft nur auf Installation, klassische IT-Dienstleister verkaufen proprietäre Lösungen. Wir setzen auf Open Source, volle Datenkontrolle und langfristige Unabhängigkeit – ohne Vendor-Lock-in.',
    keywords: ['setup', 'vergleich', 'dienstleister'],
    tags: ['setup', 'infrastruktur'],
  },
  {
    id: 'setup-duration',
    categoryId: 'projects',
    question: 'Wie lange dauert ein typisches Setup?',
    answer:
      'Je nach Umfang 3–6 Wochen. Starter-Setups (Nextcloud + Basis-Tools) dauern 2–3 Wochen, Professional-Setups mit CRM & erweiterten Automationen 4–5 Wochen, Enterprise-Setups mit Hochverfügbarkeit 6–8 Wochen. Im Erstgespräch geben wir Ihnen eine präzise Zeitschätzung für Ihre Anforderungen.',
    keywords: ['setup', 'dauer', 'zeitplan'],
    tags: ['setup', 'infrastruktur'],
  },
  {
    id: 'setup-pricing',
    categoryId: 'projects',
    question: 'Was kostet ein Infrastructure-Setup?',
    answer:
      'Die Investition hängt von Nutzerzahl, gewählten Tools und Komplexität ab. Im kostenlosen Erstgespräch erhalten Sie eine erste Einschätzung, nach der detaillierten Analyse ein transparentes Festpreis-Angebot – ohne versteckte Kosten. Typische Bandbreite: Starter-Setups ab ca. 3.500 €, Professional-Setups 6.000–12.000 €, Enterprise-Setups individuell.',
    keywords: ['setup', 'kosten', 'angebot'],
    tags: ['setup', 'infrastruktur'],
  },
  {
    id: 'setup-support',
    categoryId: 'projects',
    question: 'Was passiert bei technischen Problemen nach dem Go-Live?',
    answer:
      '1 Monat Post-Launch-Support ist im Setup-Preis enthalten – wir beheben Bugs, optimieren Performance und beantworten alle Fragen. Nach diesem Monat können Sie entweder eigenständig weiterarbeiten (mit unserer vollständigen Dokumentation) oder unsere langfristige Betreuung buchen (ab 149 €/Monat mit garantierter Response-Zeit).',
    keywords: ['setup', 'support', 'go live'],
    tags: ['setup', 'infrastruktur'],
  },
  {
    id: 'setup-hosting',
    categoryId: 'projects',
    question: 'Müssen wir eigene Server haben?',
    answer:
      'Nein. Wir setzen auf Hetzner, Ionos, AWS oder Ihre bestehende Infrastruktur auf. Alternativ übernehmen wir das Hosting komplett (Server in Deutschland, DSGVO-konform, ab ca. 50 €/Monat je nach Anforderungen). Sie entscheiden, ob Sie volle Kontrolle über die Hardware wünschen oder unser Managed Hosting nutzen.',
    keywords: ['setup', 'hosting', 'server'],
    tags: ['setup', 'infrastruktur'],
  },
  {
    id: 'setup-migration',
    categoryId: 'projects',
    question: 'Werden unsere Daten sicher migriert?',
    answer:
      'Ja. Wir arbeiten mit verschlüsselter Übertragung (TLS 1.3), isolierten Test-Umgebungen und vollständigen Backups vor jeder Migration. Sensible Daten (z.B. aus Microsoft 365, Salesforce) werden niemals über unsichere Kanäle übertragen. Sie erhalten vor der produktiven Migration einen detaillierten Migrations-Plan zur Freigabe.',
    keywords: ['setup', 'migration', 'sicherheit'],
    tags: ['setup', 'infrastruktur'],
  },
  {
    id: 'setup-modularity',
    categoryId: 'projects',
    question: 'Können wir später weitere Tools hinzufügen?',
    answer:
      'Ja, das Setup ist vollständig modular. Neue Tools (z.B. Nextcloud Talk, zusätzliche Odoo-Module, erweiterte n8n-Workflows) lassen sich jederzeit ergänzen. Wir dokumentieren die Architektur so, dass Sie oder ein anderer Dienstleister problemlos erweitern können – keine künstliche Abhängigkeit.',
    keywords: ['setup', 'modular', 'erweiterung'],
    tags: ['setup', 'infrastruktur'],
  },

  // Betreuung / Managed Services
  {
    id: 'care-cancel',
    categoryId: 'business',
    question: 'Wie funktioniert die monatliche Kündigung?',
    answer:
      'Sie geben uns Bescheid, im Folgemonat läuft der Vertrag aus. Sie erhalten vollständige Dokumentation, Daten-Export in Standardformaten und auf Wunsch einen 2h-Handover-Call. Infrastruktur und Daten bleiben bei Ihnen.',
    keywords: ['betreuung', 'kündigung', 'vertragsende'],
    tags: ['betreuung', 'managed-service'],
  },
  {
    id: 'care-flex-pricing',
    categoryId: 'business',
    question: 'Warum kostet monatlich kündbar mehr?',
    answer:
      'Flexibilität hat einen Preis. Der Aufschlag kompensiert unser Risiko, damit Sie jederzeit aussteigen können – ohne Kleingedrucktes und ohne Abhängigkeiten.',
    keywords: ['betreuung', 'kosten', 'flexibilität'],
    tags: ['betreuung', 'managed-service'],
  },
  {
    id: 'care-switch-levels',
    categoryId: 'business',
    question: 'Können wir zwischen den Service-Leveln wechseln?',
    answer:
      'Ja, jederzeit. Starten Sie mit Infrastruktur-Managed und wechseln Sie bei Bedarf auf Full-Partnership oder zurück. Wir passen SLAs und Umfang dynamisch an.',
    keywords: ['betreuung', 'service level', 'sla'],
    tags: ['betreuung', 'managed-service'],
  },
  {
    id: 'care-pricing',
    categoryId: 'business',
    question: 'Was kostet langfristige Betreuung?',
    answer:
      'Es hängt von Teamgröße, Infrastruktur-Landschaft, gewünschter KI-Automation und Reaktionszeit ab. Im kostenlosen Beratungsgespräch kalkulieren wir transparent: individuelles Angebot statt Pauschalpreis.',
    keywords: ['betreuung', 'kosten', 'angebot'],
    tags: ['betreuung', 'managed-service'],
  },
  {
    id: 'care-response-time',
    categoryId: 'business',
    question: 'Wie schnell reagieren Sie bei Problemen?',
    answer:
      'Infrastruktur-Managed: < 24h. Full-Partnership: < 6h. Kritische Incidents werden sofort priorisiert – auch nachts oder am Wochenende.',
    keywords: ['betreuung', 'sla', 'reaktionszeit'],
    tags: ['betreuung', 'managed-service'],
  },
  {
    id: 'care-a-la-carte',
    categoryId: 'business',
    question: 'Können wir auch einzelne Leistungen buchen?',
    answer:
      'Ja, auf Stundenbasis (ab 65 €/h) für Ad-hoc-Support, Consulting oder Mini-Projekte. Ideal, wenn Sie ohne monatliche Bindung testen möchten.',
    keywords: ['betreuung', 'leistungen', 'stundenbasis'],
    tags: ['betreuung', 'managed-service'],
  },
  {
    id: 'care-trends',
    categoryId: 'business',
    question: 'Wie oft informieren Sie über Trends & Potenziale?',
    answer:
      'Full-Partnership: monatliche Strategy-Reviews mit konkreten Empfehlungen zu KI, Open Source und Automatisierung. Infrastruktur-Managed: monatliche Trend-Updates als Teil der Reviews.',
    keywords: ['betreuung', 'reviews', 'trends'],
    tags: ['betreuung', 'managed-service'],
  },
]
