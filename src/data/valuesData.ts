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
      'Du siehst jede Entscheidung – Architektur, Budget, Risiken – weil sie direkt in deinen Tools dokumentiert wird. Wir kommentieren Pull Requests so, dass du sie auch als Nicht-Entwicklerin nachvollziehst. Open Source als Prinzip bedeutet, dass du Code, Infrastruktur und Daten behältst. Vertrauen entsteht nicht als Versprechen, sondern als prüfbare Spur.',
    benefits: [
      'Live-Dokumentation in Git, Notion und Tickets statt Präsentationen im Nachgang',
      'Risiken und Annahmen werden sofort gekennzeichnet – kein Schönreden',
      'Open-Source-Stacks geben dir die volle Kontrolle über Code und Infrastruktur',
      'Audits bleiben möglich, weil jedes Artefakt versioniert ist',
    ],
    deepDive:
      'Digitale Partnerschaften scheitern selten an Technik, sondern am Misstrauen. Sobald Informationen gefiltert werden, verlieren Entscheider:innen die Kontrolle. Deshalb legen wir Architektur-Entscheidungen, Budgetstände und Risiken sofort offen – sogar wenn das unbequem ist.\n\nJedes Artefakt landet in deinen Repositories: Meeting-Notizen, Architektur-Entwürfe, Migrationspläne. Wir kommentieren Tickets so, dass du Entscheidungen nachvollziehen kannst, auch wenn du nicht täglich commitest. So kannst du prüfen, statt blind zu vertrauen.\n\nTransparenz schützt auch uns. Wenn Erwartungen schriftlich festgehalten sind, merken alle früh, wenn etwas kippt. Das beschleunigt Eskalationen, erhöht Verlässlichkeit und macht Zusammenarbeit messbar.',
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
      'Du bekommst Klartext statt Buzzword-Salven. Wir melden Abweichungen unmittelbar – nicht erst im Monatsreport. Jede Zielgruppe erhält das Format, das sie braucht, damit dein Projekt steuerbar bleibt. So weißt du jederzeit, was als Nächstes passiert.',
    benefits: [
      'Workshops übersetzen komplexe Technik in Entscheidungen für Business-Teams',
      'Status-Reports zeigen Abweichungen früh statt im Nachgang',
      'Stakeholder erhalten personalisierte Updates – C-Level, Fachbereiche, Betriebsrat',
      'Entscheidungen werden schriftlich bestätigt, damit niemand überrascht wird',
    ],
    deepDive:
      'Komplexe Projekte scheitern, wenn Beteiligte nicht das gleiche Bild teilen. Deshalb starten wir jedes Mandat mit einer Kommunikationsarchitektur: Wer braucht welche Information, in welchem Takt und in welcher Tiefe?\n\nWorkshops für Fachbereiche, Executive-Summaries für Entscheider:innen und asynchrone Loom-Updates sorgen dafür, dass alle den gleichen Wissensstand haben. So verschwinden Missverständnisse, bevor sie teuer werden.\n\nKlartext heißt auch: Wir sprechen unangenehme Dinge an. Verzögerungen, Budgetverschiebungen oder Fehlentscheidungen landen sofort bei dir – inklusive Handlungsempfehlung. So planst du aktiv statt zu reagieren.',
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
      'Du kannst morgen den Partner wechseln, ohne dein System zu verlieren. Wir planen offene Schnittstellen, dokumentieren Schlüsselentscheidungen und vermeiden proprietäre Lizenzfallen. So bleibt deine Organisation souverän – unabhängig davon, wer liefert. Unabhängigkeit ist kein Risiko, sondern ein Wettbewerbsvorteil.',
    benefits: [
      'Vendor-Lock-ins werden identifiziert und durch offene Alternativen ersetzt',
      'Schlüsselprozesse sind dokumentiert, damit kein Einzelner kritisch ist',
      'Architekturentscheidungen priorisieren austauschbare Komponenten',
      'Du besitzt Deployment-Pipelines und Zugänge selbst',
    ],
    deepDive:
      'Echte Partnerschaft entsteht, wenn beide Seiten freiwillig bleiben. Deshalb analysieren wir zuerst, an wen oder was du gebunden bist: proprietäre Tools, einzelne Personen, überalterte Hosting-Verträge.\n\nWir ersetzen kritische Komponenten, wo sinnvoll, durch offene Standards oder orchestrieren Übergangsmodelle. Wichtig ist, dass du Infrastruktur, Code und Zugangsdaten selbst kontrollierst – nicht wir, nicht ein Hyperscaler.\n\nParadoxerweise stärkt Unabhängigkeit die Zusammenarbeit. Wenn du frei bist zu gehen, entscheiden wir uns bewusst jeden Tag füreinander – und genau das hebt die Qualität.',
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
      'Schnelle Hacks kosten langfristig mehr als sauber geplante Systeme. Wir liefern Architektur, die wächst, Code, der lesbar bleibt, und Tests, die Änderungen absichern. Qualität ist kein Luxus, sondern die günstigste Art, komplexe Plattformen zu betreiben. Du investierst einmal und erhältst Stabilität für Jahre.',
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
      'Technologie wirkt nur, wenn sie sich richtig anfühlt. Wir verbinden Performance, Accessibility und visuelle Präzision, damit Nutzer:innen intuitiv ins Ziel kommen. Details wie Motion, Microcopy und Error-States sind geplant, nicht zufällig. Design ist keine Dekoration, sondern der sichtbare Teil deiner Produktstrategie.',
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
  {
    id: 'skalierbarkeit',
    title: 'Skalierbarkeit als Fundament — Ideen brauchen Raum',
    intro:
      'Wir planen Plattformen so, dass sie heute effizient laufen und morgen zehnmal so viele Nutzer:innen tragen. Kapazitäten, Datenflüsse und Betriebsprozesse werden von Anfang an gemessen. So wächst dein System ohne Re-Write und ohne Überraschungskosten. Skalierbarkeit ist das Fundament, nicht die Kür.',
    benefits: [
      'Kapazitätsplanung orientiert sich an deinen Drei- bis Fünf-Jahres-Zielen',
      'Cloud-native Patterns kommen nur zum Einsatz, wenn sie echten Nutzen bringen',
      'Observability und Alerting starten mit dem ersten Deploy',
      'Runbooks und Handover sichern den Betrieb im eigenen Team',
    ],
    deepDive:
      'Viele Plattformen sind nach dem ersten Wachstumsschub am Limit. Jede neue Kund:in macht das System instabil und das Team reagiert nur noch auf Feuer. Das ist vermeidbar, wenn Skalierungsziele von Anfang an Teil des Scope sind.\n\nWir definieren daher Szenarien: doppelter Traffic, neue Märkte, regulatorische Anforderungen. Für jedes Szenario planen wir Architektur, Kosten und Betrieb durch – inklusive Lasttests und Observability-KPIs.\n\nSkalierbarkeit bedeutet nicht überall Microservices, sondern bewusste Entscheidungen. Manchmal reicht ein modulärer Monolith, manchmal braucht es Event-Streaming. Wichtig ist, dass du jederzeit weißt, wie du wachsen kannst.',
    seoKeywords: [
      'skalierbare Cloud-Architektur',
      'Kapazitätsplanung IT',
      'Observability ab Tag eins',
      'zukunftssichere Plattformen',
    ],
    link: {
      text: 'Weiterlesen: Skalierung planen',
      href: '/wissen/skalierbare-architektur',
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
  copy: 'Diese Werte sind keine Floskeln – sie sind unser Arbeitsalltag. Wenn das zu deiner Vorstellung von Technologiepartnerschaft passt, sprechen wir darüber.',
  text: 'Kostenloses Erstgespräch vereinbaren',
  href: '/kontakt',
}
