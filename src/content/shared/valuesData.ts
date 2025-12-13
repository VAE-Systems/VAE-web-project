export interface ValueLink {
  text: string
  href: string
  external?: boolean
}

export interface Value {
  id: string
  title: string
  intro: string
  benefits: string[]
  deepDive: string
  seoKeywords: string[]
  link?: ValueLink
}

export const HERO_COPY = {
  title: 'Unsere Werte – verlässliche Zusammenarbeit',
  subheading: 'Verbindliche Standards für transparente, belastbare Technologieprojekte.',
  body: 'Wir arbeiten dokumentiert, respektvoll und unabhängig. Entscheidungen werden begründet, Verantwortung wird übernommen und jede Lösung bleibt betreibbar.',
}

export const VALUES_DATA: Value[] = [
  {
    id: 'transparenz',
    title: 'Transparenz & Ehrlichkeit — Der Anfang von Vertrauen',
    intro:
      'Sie sehen jede Entscheidung – Architektur, Budget, Risiken – weil sie direkt in Ihren Tools dokumentiert wird. Wir dokumentieren jede Entscheidung so, dass Sie sie auch als Nicht‑Entwicklerin nachvollziehen können. Open Source als Prinzip bedeutet, dass Sie Code, Infrastruktur und Daten behalten. Vertrauen entsteht nicht als Versprechen, sondern als prüfbare Spur.',
    benefits: [
      'Live-Dokumentation in Git und Tickets statt Präsentationen im Nachgang',
      'Risiken und Annahmen werden sofort gekennzeichnet – kein Schönreden',
      'Open-Source-Stacks geben Ihnen die volle Kontrolle über Code und Infrastruktur',
      'Audits bleiben möglich, weil jedes Artefakt versioniert ist',
    ],
    deepDive:
      'Digitale Partnerschaften scheitern selten an Technik, sondern am Misstrauen. Sobald Informationen gefiltert werden, verlieren Entscheider:innen die Kontrolle. Deshalb legen wir Architektur-Entscheidungen, Budgetstände und Risiken sofort offen – sogar wenn das unbequem ist.\n\nJedes Artefakt landet in Ihren Repositories: Meeting-Notizen, Architektur-Entwürfe, Migrationspläne. Wir kommentieren Tickets so, dass Sie Entscheidungen nachvollziehen können, auch wenn Sie nicht täglich committen. So können Sie prüfen, statt blind zu vertrauen.\n\nTransparenz schützt auch uns. Wenn Erwartungen schriftlich festgehalten sind, merken alle früh, wenn etwas kippt. Das beschleunigt Eskalationen, erhöht Verlässlichkeit und macht Zusammenarbeit messbar.',
    seoKeywords: [
      'Transparenz in Technologieprojekten',
      'Open Source als Prinzip',
      'nachvollziehbare Architektur',
      'Projekt-Dokumentation in Echtzeit',
    ],
    link: {
      text: 'Weiterlesen: Transparenz bei VAE',
      href: '/wissen/transparenz-open-source',
    },
  },
  {
    id: 'kommunikation',
    title: 'Klare Kommunikation — Die Grundlage für Erfolg',
    intro:
      'Sie bekommen klare Informationen, keine Schlagworte.\nAbweichungen sprechen wir an, sobald sie entstehen – nicht erst im Monatsreport.\nJede Zielgruppe erhält genau die Inhalte, die sie für Entscheidungen braucht.\nSo bleibt Ihr Projekt jederzeit steuerbar.',
    benefits: [
      'Workshops übersetzen komplexe Technik in Entscheidungen für Business-Teams',
      'Status-Reports zeigen Abweichungen früh statt im Nachgang',
      'Stakeholder erhalten personalisierte Updates – C-Level, Fachbereiche, Betriebsrat',
      'Entscheidungen werden schriftlich bestätigt, damit niemand überrascht wird',
    ],
    deepDive:
      'Komplexe Projekte scheitern, wenn Beteiligte nicht das gleiche Bild teilen. Deshalb starten wir jedes Mandat mit einer Kommunikationsarchitektur: Wer braucht welche Information, in welchem Takt und in welcher Tiefe?\n\nWorkshops für Fachbereiche, Executive-Summaries für Entscheider:innen und asynchrone Loom-Updates sorgen dafür, dass alle den gleichen Wissensstand haben. So verschwinden Missverständnisse, bevor sie teuer werden.\n\nKlartext heißt auch: Wir sprechen unangenehme Dinge an. Verzögerungen, Budgetverschiebungen oder Fehlentscheidungen landen sofort bei Ihnen – inklusive Handlungsempfehlung. So planen Sie aktiv statt zu reagieren.',
    seoKeywords: [
      'klare Projektkommunikation',
      'Stakeholder-Updates',
      'transparente Statusmeldungen',
      'Change-Kommunikation in Tech-Projekten',
    ],
    link: {
      text: 'Weiterlesen: Kommunikation in Projekten',
      href: '/wissen/klare-projektkommunikation',
    },
  },
  {
    id: 'unabhaengigkeit',
    title: 'Unabhängigkeit & Freiheit — Das Recht zu wählen',
    intro:
      'Sie können morgen den Partner wechseln, ohne Ihr System zu verlieren. Wir planen offene Schnittstellen, dokumentieren Schlüsselentscheidungen und vermeiden proprietäre Lizenzfallen. So bleibt Ihre Organisation souverän – unabhängig davon, wer liefert. Unabhängigkeit ist kein Risiko, sondern ein Wettbewerbsvorteil.',
    benefits: [
      'Vendor-Lock-ins werden identifiziert und durch offene Alternativen ersetzt',
      'Schlüsselprozesse sind dokumentiert, damit kein Einzelner kritisch ist',
      'Architekturentscheidungen priorisieren austauschbare Komponenten',
      'Sie besitzen Deployment-Pipelines und Zugänge selbst',
    ],
    deepDive:
      'Echte Partnerschaft entsteht, wenn beide Seiten freiwillig bleiben. Deshalb analysieren wir zuerst, an wen oder was Sie gebunden sind: proprietäre Tools, einzelne Personen, überalterte Hosting-Verträge.\n\nWir ersetzen kritische Komponenten, wo sinnvoll, durch offene Standards oder orchestrieren Übergangsmodelle. Wichtig ist, dass Sie Infrastruktur, Code und Zugangsdaten selbst kontrollieren – nicht wir, nicht ein Hyperscaler.\n\nParadoxerweise stärkt Unabhängigkeit die Zusammenarbeit. Wenn Sie frei sind zu gehen, entscheiden wir uns bewusst jeden Tag füreinander – und genau das hebt die Qualität.',
    seoKeywords: [
      'Vendor-Lock-in vermeiden',
      'technologische Souveränität',
      'Open-Source-Infrastruktur',
      'Lieferantenunabhängigkeit IT',
    ],
    link: {
      text: 'Weiterlesen: Unabhängigkeit sichern',
      href: '/wissen/vendor-lock-in-vermeiden',
    },
  },
  {
    id: 'qualitaet',
    title: 'Exzellenz als Standard — Handwerkskunst statt Schnellschuss',
    intro:
      'Schnelle Hacks kosten langfristig mehr als sauber geplante Systeme. Wir liefern Architektur, die wächst, Code, der lesbar bleibt, und Tests, die Änderungen absichern. Qualität ist kein Luxus, sondern die günstigste Art, komplexe Plattformen zu betreiben. Sie investieren einmal und erhalten Stabilität für Jahre.',
    benefits: [
      'Lesbarer Code und Architecture Decision Records beschleunigen Onboarding',
      'Automatisierte Tests und Observability reduzieren Ausfälle',
      'Design- und Tech-Reviews verhindern technische Schulden',
      'Saubere Systeme bleiben günstiger zu betreiben',
    ],
    deepDive:
      'Organisationen verlieren Millionen, weil sie Geschwindigkeit über Sorgfalt stellen. Nach wenigen Monaten wird der Code unbeweglich, Features dauern dreimal so lange und Teams brennen aus.\n\nWir planen deshalb mit Qualitäts-Gates: Pairing, automatisierte Tests, Observability und klare Definition-of-Done-Kriterien. Dadurch bleibt das System verlässlich und Änderungswünsche landen schneller in Produktion.\n\nQualität zahlt direkt auf Business-Ziele ein: weniger Bugs, kürzere Release-Zyklen, messbarer ROI. So wird Technologie zum Vorteil statt zum Kostenblock.',
    seoKeywords: ['Softwarequalität', 'nachhaltige Architektur', 'technische Exzellenz', 'ROI von sauberem Code'],
    link: {
      text: 'Weiterlesen: Qualität liefert ROI',
      href: '/wissen/handwerkskunst-statt-schnellschuss',
    },
  },
  {
    id: 'design',
    title: 'Liebe fürs Detail & Design — Exzellenz spüren',
    intro:
      'Technologie wirkt nur, wenn sie sich richtig anfühlt. Wir verbinden Performance, Accessibility und visuelle Präzision, damit Nutzer:innen intuitiv ins Ziel kommen. Details wie Motion, Microcopy und Error-States sind geplant, nicht zufällig. Design ist keine Dekoration, sondern der sichtbare Teil Ihrer Produktstrategie.',
    benefits: [
      'UX-Flows werden getestet, bevor sie live gehen',
      'Motion und Microcopy unterstützen Orientierung und Markenwirkung',
      'Design- und Dev-Teams arbeiten im selben Token- und Komponenten-System',
      'Performance-Budgets und Accessibility-Checks sind verbindlich',
    ],
    deepDive:
      'Zwischen "funktioniert" und "fühlt sich großartig an" liegen hunderte Detailentscheidungen. Kontrast, Abstände, Timing und Typografie bestimmen, ob Menschen Vertrauen fassen und Aufgaben abschließen.\n\nWir bauen deshalb Design-Systeme, die technische und gestalterische Teams gemeinsam pflegen. Komponenten, Tokens und Content-Guidelines stellen sicher, dass jedes Feature gleich hochwertig wirkt – unabhängig davon, wer es entwickelt.\n\nUnsere künstlerischen Wurzeln erinnern uns daran, dass jedes Detail zählt. Die ganze Geschichte erzählen wir unten – sie erklärt, warum Handwerk für uns keine Floskel ist.',
    seoKeywords: ['UX-Exzellenz', 'Designsystem-Komponenten', 'Performance-orientiertes UI', 'zugängliche Software'],
    link: {
      text: 'Mehr erfahren: Design-Handwerk',
      href: '/ueber-uns/design-handwerk',
      external: false,
    },
  },
]

export const VISION_CONTENT = {
  title: 'Unsere Vision für Deutschland',
  quote: '"Digitale Infrastruktur, die in Deutschland geplant, gebaut und betrieben wird."',
  explanation:
    'Deutschland verfügt über starke Ingenieurteams, doch häufig fehlen moderne Plattformen, definierte Zuständigkeiten und echte Eigenständigkeit. Wir unterstützen Unternehmen dabei, dokumentierte und souveräne Systeme aufzubauen – sicher, skalierbar und betreibbar im eigenen Haus.',
}

export const TESTIMONIAL = {
  quote:
    '"VAE Systems hat uns nicht einfach beraten, sondern unser Verständnis von Partnerschaft verändert. Heute kennen wir jede Abhängigkeit, jede Entscheidung ist dokumentiert und wir wissen genau, wie wir wachsen können."',
  author: 'Clara W., COO eines Industrie-Mittelständlers',
  meta: 'Transformationsprojekt 2024 · Infrastruktur & Automatisierung',
}

export const CTA = {
  heading: 'Lassen Sie uns zusammenarbeiten',
  copy: 'Wenn diese Werte zu Ihrer Vorstellung von Technologiepartnerschaft passen, nehmen wir uns Zeit für Ihr Setup. Im Erstgespräch erhalten Sie eine ehrliche Einschätzung, wo wir Sie entlasten und welchen Hebel VAE für Ihr Team haben kann.',
  text: 'Kostenloses Erstgespräch vereinbaren',
  href: '/contact',
}
