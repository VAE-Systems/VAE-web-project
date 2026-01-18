export type FaqCategoryId = 'technology' | 'business' | 'career' | 'projects' | 'general'

export interface FaqCategory {
  id: FaqCategoryId
  label: string
  description: string
  range: string
  actualCount?: number
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

const APPLY_CTA: FaqCta = {
  label: 'Jetzt bewerben',
  href: '/ueber-uns/karriere',
}

export const faqEntries: FaqEntry[] = [
  // Technologie
  {
    id: 'tech-api-integration',
    categoryId: 'technology',
    question: 'Bauen Sie alles selbst oder nutzen Sie bestehende APIs?',
    answer:
      'Unser Default ist Self-Hosting. Externe APIs nutzen wir, wenn sie objektiv besser sind. Wir nutzen auf Anfrage bestehende APIs (z.B. OpenAI), wenn es Sinn macht. Unser Ziel ist immer die beste Lösung: Manchmal ist das eine externe API, oft aber auch ein selbstgehostetes Modell, das weniger Leistung braucht und günstiger ist. Wir prüfen für jeden Fall, was wirklich nötig ist – viele Anwendungsfälle brauchen keine riesigen Modelle, sondern effiziente Lösungen.',
    keywords: ['api', 'openai', 'self-hosted', 'modelle', 'effizienz'],
  },
  {
    id: 'tech-languages',
    categoryId: 'technology',
    question: 'Mit welchen Programmiersprachen und Frameworks arbeiten Sie?',
    answer:
      'Wir arbeiten framework-agnostisch, haben aber klare Spezialitäten: Python und TypeScript sind unser Standard. Für performance-kritische Teile nutzen wir C++ oder Rust. Wichtig ist uns nicht das Tool an sich, sondern dass es zum Projekt passt. Wir koordinieren auch Projekte mit anderen Sprachen, wenn es erforderlich ist.',
    keywords: ['python', 'typescript', 'c++', 'rust', 'frameworks'],
  },
  {
    id: 'tech-hosting',
    categoryId: 'technology',
    question: 'Wo werden die Anwendungen gehostet?',
    answer:
      'Wir prüfen unsere Server-Anbieter immer wieder neu auf Zuverlässigkeit. In der Regel setzen wir auf bewährte Partner (z.B. Hetzner für Self-Hosting), sind aber flexibel. Self-Hosted-First, Hybrid wenn nötig.',
    keywords: ['hosting', 'server', 'hetzner', 'cloud', 'zuverlässigkeit'],
    tags: ['setup', 'betreuung', 'consulting'],
  },
  {
    id: 'tech-legacy',
    categoryId: 'technology',
    question: 'Übernehmen Sie auch bestehende (Legacy-)Systeme?',
    answer:
      'Der Begriff "Legacy" ist oft schwammig. Wir schauen uns Ihr bestehendes System an: Wenn es stabil ist, binden wir es an. Wenn es Probleme macht, empfehlen wir oft, neue Module daneben zu bauen (Strangler Pattern), statt alles sofort neu zu schreiben. Wir managen das Projekt so, dass es für Sie funktioniert.',
    keywords: ['legacy', 'bestandssysteme', 'migration', 'integration'],
    tags: ['setup', 'consulting', 'betreuung'],
  },
  {
    id: 'tech-partner',
    categoryId: 'technology',
    question: 'Machen Sie alles in-house?',
    answer:
      'Wir koordinieren jedes Projekt zentral, holen uns aber für Spezialthemen die richtigen Partner dazu. Unser Job ist es, für Sie die besten Leute zu finden und das Projektmanagement zu übernehmen, damit Sie nur einen Ansprechpartner haben: uns.',
    keywords: ['partner', 'netzwerk', 'projektmanagement', 'koordination'],
  },
  {
    id: 'tech-data-privacy',
    categoryId: 'technology',
    question: 'Wie behandeln Sie Datenschutz und personenbezogene Daten?',
    answer:
      'Wir legen großen Wert auf Datenschutz und orientieren uns an den Grundprinzipien der DSGVO. Wo möglich arbeiten wir mit Datensparsamkeit, rollenbasierten Zugriffen und technischen Maßnahmen wie Verschlüsselung. Gleichzeitig versuchen wir, Systeme so zu konzipieren, dass besonders sensible Daten gar nicht erst unnötig verarbeitet werden müssen – eher „Privacy by Design“ als nachträglicher Zusatz.',
    keywords: ['datenschutz', 'personenbezogene daten', 'dsgvo', 'privacy by design'],
    tags: ['security', 'privacy', 'consulting', 'betreuung'],
  },

  // Projekte & Use Cases
  {
    id: 'proj-size',
    categoryId: 'projects',
    question: 'Übernehmen Sie auch kleine Projekte?',
    answer:
      'Ja, aber es muss wirtschaftlich sinnvoll sein. Wir arbeiten gerne auf Stundenbasis an kleineren Themen, wenn der Scope klar ist. Bei größeren Projekten bieten wir Pauschalen an. In der Regel empfehlen wir ein Mindestvolumen von ca. 1.500 €, damit der initiale Aufwand (Onboarding, Setup) im Verhältnis zum Nutzen steht.',
    keywords: ['projektgröße', 'kleinprojekte', 'mindestvolumen', 'pauschale'],
    tags: ['consulting'],
  },
  {
    id: 'proj-industries',
    categoryId: 'projects',
    question: 'Gibt es Branchen, die Sie nicht bedienen?',
    answer:
      'Nein, wir sind branchenoffen. Wichtig ist uns nicht die Branche, sondern dass wir einen echten Mehrwert schaffen können. Ob Handwerk, Kanzlei oder Startup – wenn Sie Prozesse digitalisieren wollen, sind wir der richtige Partner.',
    keywords: ['branchen', 'offen', 'zielgruppe'],
  },
  {
    id: 'proj-deliverables',
    categoryId: 'projects',
    question: 'Was erhalte ich am Ende des Projekts?',
    answer:
      'Wir passen unser Angebot stark an Ihren Bedarf an. Für Kunden, die wenig brauchen, reduzieren wir den Umfang und Kosten. Wenn gewünscht, dokumentieren wir alles ausführlich, damit Sie unabhängig bleiben. Sie erhalten immer das funktionierende System und – auf Wunsch – die passende Dokumentation dazu.',
    keywords: ['ergebnis', 'dokumentation', 'system', 'unabhängigkeit'],
    tags: ['setup', 'consulting'],
  },
  {
    id: 'projects-timeline',
    categoryId: 'projects',
    question: 'Wie lange dauert ein typisches Projekt?',
    answer:
      'Das hängt stark vom Umfang ab. Kleine, klar abgegrenzte Vorhaben können in wenigen Wochen umgesetzt werden, während umfangreiche Plattformen oder tief integrierte Lösungen mehrere Monate dauern können. Nach der Erstberatung erhalten Sie von uns eine realistische Einschätzung für Ihren konkreten Fall.',
    keywords: ['dauer', 'projektlaufzeit', 'timeline'],
    tags: ['projekte', 'setup', 'consulting'],
  },
  {
    id: 'projects-data-minimum',
    categoryId: 'projects',
    question: 'Welche Informationen brauchen Sie mindestens für den Start?',
    answer:
      'Wichtig sind vor allem drei Dinge: Welche Systeme Sie heute im Einsatz haben, welche Ziele Sie mit dem Projekt erreichen wollen und worauf Sie besonderen Wert legen (z.B. Unabhängigkeit, Skalierbarkeit, Datenschutz). Auf dieser Basis können wir sinnvoll beraten und ein passendes Setup vorschlagen.',
    keywords: ['anforderungen', 'daten', 'start', 'beratung'],
    tags: ['projekte', 'setup', 'consulting'],
  },
  {
    id: 'projects-case-studies',
    categoryId: 'projects',
    question: 'Gibt es Case Studies oder Referenzprojekte?',
    answer:
      'Ja, wir haben verschiedene Projekte erfolgreich umgesetzt. Nicht alle Case Studies sind öffentlich, aber auf Anfrage können wir anonymisierte Beispiele und Lessons Learned teilen, sofern dies mit unseren Kund:innen vereinbar ist.',
    keywords: ['referenzen', 'case studies', 'projekte'],
    tags: ['referenzen', 'consulting'],
  },

  // Karriere & Sonstiges
  {
    id: 'career-jobs',
    categoryId: 'career',
    question: 'Suchen Sie aktuell Mitarbeiter?',
    answer:
      'Wir sind immer offen, unser Team zu erweitern. Melden Sie sich gerne – wir schauen uns Kompetenzen, Teamfähigkeit und Potenziale an. Uns ist egal, wo Sie herkommen, solange Sie Bock haben, gute Arbeit zu leisten.',
    keywords: ['jobs', 'bewerbung', 'kompetenzen', 'team'],
    cta: APPLY_CTA,
  },
  {
    id: 'career-remote',
    categoryId: 'career',
    question: 'Arbeiten Sie remote oder im Büro?',
    answer:
      'Wir arbeiten remote und überregional. Wir haben kein festes Büro, kommen aber in Heidelberg und Umgebung gerne auch persönlich vorbei. Für uns zählt das Ergebnis, nicht der Arbeitsweg. Zudem sparen Sie sich Kosten, da wir keine teuren Büroflächen umlegen müssen. Termine und Schulungen finden bei Bedarf in effizient angemieteten Meetingräumen statt.',
    keywords: ['remote', 'heidelberg', 'vor-ort', 'überregional', 'kostenersparnis'],
  },
  {
    id: 'career-benefits',
    categoryId: 'career',
    question: 'Welche Benefits gibt es bei VAE Systems?',
    answer:
      'Wir bieten Weiterbildung, Zugang zu einem starken Netzwerk, flexible Arbeitszeiten und die Möglichkeit, sich etwas dazuzuverdienen. Wichtig ist uns, dass Arbeit und Leben zusammenpassen – nicht, dass alle denselben 9‑to‑5-Rhythmus haben.',
    keywords: ['benefits', 'weiterbildung', 'netzwerk', 'flexible arbeitszeit'],
    tags: ['karriere'],
  },
  {
    id: 'career-skills',
    categoryId: 'career',
    question: 'Muss ich alle Tech-Skills sofort mitbringen?',
    answer:
      'Für die aktive Mitarbeit in Kundenprojekten setzen wir passende technische Grundkenntnisse voraus. Gleichzeitig bieten wir die Möglichkeit, schon vorher Kontakt aufzubauen, gemeinsam einen Lernpfad zu definieren und dich bei der Weiterbildung zu begleiten. Sobald du soweit bist, können wir Praktika oder projektbezogene Mitarbeit vereinbaren.',
    keywords: ['skills', 'lernen', 'praktikum', 'einstieg'],
    tags: ['karriere'],
  },
  {
    id: 'career-process',
    categoryId: 'career',
    question: 'Wie läuft der Bewerbungsprozess ab?',
    answer:
      'Sie können entweder direkt einen Termin über unsere Kontaktseite buchen oder uns eine E-Mail mit Lebenslauf und einer kurzen Motivation schicken. Bei uns kommt es nicht darauf an, dass jede Formulierung perfekt ist – uns interessiert die Substanz dahinter und ob wir fachlich und menschlich zusammenpassen.',
    keywords: ['bewerbung', 'prozess', 'kontakt'],
    tags: ['karriere'],
    cta: APPLY_CTA,
  },
  {
    id: 'biz-onboarding',
    categoryId: 'business',
    question: 'Wie läuft ein typisches Onboarding ab?',
    answer:
      'Am Anfang steht eine kostenlose Erstberatung, in der wir Ziele, Rahmenbedingungen und groben Scope besprechen. Darauf basierend ordnen wir ein, in welchem Umfang und Setup eine Zusammenarbeit sinnvoll ist und welche nächsten Schritte Sie erwarten können.',
    keywords: ['onboarding', 'erstberatung', 'scope'],
    tags: ['prozess', 'setup', 'consulting', 'betreuung'],
    cta: {
      label: 'Gespräch buchen',
      href: '/contact#booking',
    },
  },
  {
    id: 'biz-code-ownership',
    categoryId: 'business',
    question: 'Wer besitzt den Code nach Projektende?',
    answer:
      'Die Rechte am Code können je nach Projekt unterschiedlich geregelt werden und fließen in die Preisgestaltung ein. Wenn der Code bei uns bleibt und wir Nutzungsrechte einräumen, können Projekte oft günstiger angeboten werden. Wenn Sie vollständige Rechte und Übertragungen wünschen, berücksichtigen wir das transparent im Angebot.',
    keywords: ['code', 'ip', 'rechte', 'preisgestaltung'],
    tags: ['rechtliches', 'consulting'],
  },
  {
    id: 'biz-communication',
    categoryId: 'business',
    question: 'Wie kommunizieren wir während des Projekts?',
    answer:
      'Wir arbeiten über einen eigenen Kundenaccount in unserer VAE-Cloud mit Chat und Dateiablage. Dort laufen Übergaben, Status-Updates und Abstimmungen zusammen. Ergänzend vereinbaren wir regelmäßige Calls, damit Entscheidungen nicht im Chat stecken bleiben.',
    keywords: ['kommunikation', 'kundenaccount', 'chat', 'calls'],
    tags: ['prozess', 'betreuung', 'setup', 'consulting'],
  },
  {
    id: 'general-nda',
    categoryId: 'general',
    question: 'Unterschreiben Sie ein NDA?',
    answer:
      'Ja, selbstverständlich. Vertraulichkeit ist die Basis. Wir unterschreiben gerne Ihre Geheimhaltungserklärung (NDA), bevor wir sensible Daten sehen.',
    keywords: ['nda', 'vertraulichkeit', 'geheimhaltung'],
  },
  {
    id: 'general-contact',
    categoryId: 'general',
    question: 'Wie kann ich Sie am besten erreichen?',
    answer:
      'Schreiben Sie uns einfach eine E-Mail. Für bestehende Kunden richten wir direkte Chat-Kanäle in unserer App ein. Telefonisch sind wir nach Vereinbarung erreichbar, damit wir uns dann auch wirklich Zeit für Sie nehmen können.',
    keywords: ['kontakt', 'email', 'chat', 'telefon'],
    cta: CONTACT_CTA,
  },
]

export function getFaqCounts(): Record<FaqCategoryId, number> {
  const counts: Record<FaqCategoryId, number> = {
    technology: 0,
    business: 0,
    career: 0,
    projects: 0,
    general: 0,
  }
  for (const entry of faqEntries) {
    counts[entry.categoryId] = (counts[entry.categoryId] || 0) + 1
  }
  return counts
}

export function getCategoriesWithCounts() {
  const counts = getFaqCounts()
  return faqCategories.map(cat => ({
    ...cat,
    actualCount: counts[cat.id],
  }))
}
