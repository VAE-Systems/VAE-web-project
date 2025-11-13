export interface ValueLink {
  text: string
  href: string
}

export interface Value {
  id: string
  title: string
  intro: string
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
      'Unternehmertum braucht Selbstbewusstsein. Und Selbstbewusstsein bedeutet: zu den eigenen Stärken stehen — genauso wie zu den Schwächen. Wir verstecken uns nicht hinter Marketingsprech. Wir sagen, was wir können. Wir sagen auch, was wir nicht können. Diese Ehrlichkeit ist unser größter Vorteil.',
    deepDive:
      'Im digitalen Zeitalter wird Vertrauen zur wertvollsten Währung. Kunden verlassen sich nicht auf perfekte Websites oder glänzende Case Studies — sie verlassen sich auf Transparenz. Sie möchten wissen, wer hinter der Agentur steht. Sie möchten verstehen, wie Entscheidungen getroffen werden. Sie erwarten ehrliche Antworten auf schwierige Fragen.\n\nBei VAE Systems ist das selbstverständlich. Wir dokumentieren unsere Projekte. Wir sprechen über unsere Fehler. Wir zeigen, wie wir lernen. Unsere Kunden profitieren davon, weil sie verstehen, wie ihre Systeme entstehen — nicht am Ende, sondern von Anfang an.\n\nDiese Transparenz gilt auch intern. Unsere Teams arbeiten offen zusammen. Meetings sind ergebnisorientiert. Feedback ist konstruktiv und direkt. Wir verschwenden keine Zeit mit politischen Spielchen.',
    seoKeywords: [
      'Transparenz in der Tech-Beratung',
      'ehrliche Unternehmenskommunikation',
      'vertrauenswürdige Partnerschaften',
      'offene Unternehmenskultur',
    ],
  },
  {
    id: 'kommunikation',
    title: 'Klare Kommunikation — Die Grundlage für Erfolg',
    intro:
      'Missverständnisse entstehen nicht durch fehlende Information. Sie entstehen durch schlechte Kommunikation. Ein Projekt scheitert nicht an der technischen Komplexität — es scheitert, weil die Anforderungen nicht verstanden wurden.',
    deepDive:
      'Wir haben gelernt: Die beste Technologie der Welt hilft nichts, wenn niemand versteht, warum sie gebaut wurde.\n\nBei unseren Projekten beginnt alles mit Kommunikation. Wir sprechen mit Stakeholdern. Wir stellen Fragen. Wir wiederholen, bis wir sicher sind, dass wir verstanden haben. Diese Investition am Anfang spart am Ende zehnmal Zeit und Kosten.\n\nKlare Kommunikation bedeutet auch: Komplexität übersetzen. Nicht für Dumme — sondern für Menschen, die in ihrem Bereich Experten sind, aber nicht in unserem. Ein CTO braucht andere Informationen als ein CFO. Ein Gründer braucht einen anderen Überblick als ein Projektleiter. Wir passen unsere Kommunikation an.\n\nGleichzeitig bedeutet klar kommunizieren: Unangenehmes aussprechen. Wenn ein Projekt länger wird, sagen wir es. Wenn ein Budget überschritten wird, sagen wir es. Wenn wir einen Fehler machen, sagen wir es. Diese Klarheit verhindert, dass Überraschungen am Ende das Projekt zerstören.',
    seoKeywords: [
      'Effektive Projektkommunikation',
      'Stakeholder Management',
      'klare Anforderungsdefinition',
      'Projektmissverständnisse vermeiden',
    ],
  },
  {
    id: 'unabhaengigkeit',
    title: 'Unabhängigkeit & Freiheit — Das Recht zu wählen',
    intro:
      'Abhängigkeit ist der Feind von Innovation. Wenn Sie an einen Vendor gekettet sind, können Sie nicht frei entscheiden. Wenn Sie von einer Person abhängig sind, wird Ihr Unternehmen zerbrechlich. Unabhängigkeit ist nicht nur ein Wert — sie ist ein Überlebensmechanismus.',
    deepDive:
      'Echte Freiheit gibt es nicht, wenn Sie abhängig sind. Deshalb ist eine unserer ersten Fragen an neue Kunden: "Von wem sind Sie abhängig?" Vendor Lock-ins. Key-Person Dependencies. Alte Technologie-Schulden.\n\nBei VAE Systems arbeiten wir nach dem Open-Source-First-Prinzip. Das ist nicht ideologisch — das ist praktisch. Open Source bedeutet: Sie besitzen Ihre Daten. Sie besitzen Ihren Code. Sie können sich morgen einen anderen Partner suchen, und alles läuft weiter.\n\nAber Unabhängigkeit ist nicht isoliert zu verstehen. Paradoxerweise: Je unabhängiger beide Partner sind, desto stärker ist die Partnerschaft. Warum? Weil sie freiwillig bleibt. Nicht aus Abhängigkeit — sondern aus Wahl.\n\nDas ist die moderne Definition von Partnerschaft: jeden Tag aufs Neue sich dafür entscheiden, zusammenzuarbeiten. Nicht, weil man gebunden ist. Sondern, weil es Sinn ergibt. Das ändert die Dynamik fundamental. Beide Seiten müssen kontinuierlich beweisen, dass die Zusammenarbeit Wert bringt. Das führt zu besseren Ergebnissen. Zu mehr Respekt. Zu echten Beziehungen statt transaktionalen Verbindungen.',
    seoKeywords: [
      'Vendor-Unabhängigkeit',
      'Open Source Infrastruktur',
      'Daten-Eigentumsrechte',
      'langfristige Technologie-Partnerschaften',
    ],
  },
  {
    id: 'qualitaet',
    title: 'Qualität führt zu Quantität — Das geheime Wachstum',
    intro:
      'Der Druck ist immer da: schneller, billiger, jetzt. Aber wir haben gelernt: Die beste Geschäftsstrategie ist, weniger zu versprechen und mehr zu liefern. Quality beats Speed. Immer.',
    deepDive:
      'Auf dem freien Markt belohnt sich Qualität selbst. Ein Produkt, das gut gemacht ist, spricht sich herum. Es generiert zufriedene Kunden. Die empfehlen es weiter. Das kostet keine Marketingbudgets — das ist organisches Wachstum.\n\nWir haben gesehen, wie Unternehmen dabei gescheitert sind, weil sie Qualität für Geschwindigkeit geopfert haben. Schnelle Implementierung, billige Lösungen, technische Schulden. Sechs Monate später: Das System ist unmöglich zu warten. Die Entwickler sind frustriert. Neue Features dauern dreimal so lange. Und jetzt müssen sie alles umschreiben.\n\nDas ist teuer. Das kostet Zeit. Das kostet Talent.\n\nUmgekehrt: Wenn wir Zeit in gutes Design investieren, in sauberen Code, in Architektur, die wächst — dann zahlt sich das aus. Features werden schneller gebaut. Bugs sind seltener. Neue Entwickler onboarden schneller. Das System wird ein Vorteil, nicht ein Ballast.\n\nDiese Philosophie gilt auch für Beratung. Wir machen nicht zehn oberflächliche Audits. Wir machen drei tiefe Strategieberatungen. Das Resultat: Kunden verstehen ihre Probleme wirklich. Sie können entscheiden, nicht nur reagieren.',
    seoKeywords: [
      'Qualität statt Quantität',
      'technische Exzellenz',
      'nachhaltige Softwareentwicklung',
      'ROI von guter Architektur',
    ],
  },
  {
    id: 'design',
    title: 'Liebe fürs Detail & Design — Exzellenz spüren',
    intro:
      'Julian Goertz Dini, CEO von VAE Systems, wächst auf in einer Familie von Künstlern und Bildhauern. Sein Großvater, Jürgen Goertz, ist ein renommierter Bildhauer. Diese künstlerische DNA fließt durch VAE Systems. Qualität muss nicht nur funktionieren — sie muss spürbar sein.',
    deepDive:
      'Es gibt einen Unterschied zwischen “funktioniert” und “gut designed”. Ein Programm kann technisch funktionieren und trotzdem ein Albtraum in der Nutzung sein. Ein Dashboard kann alle Daten zeigen und trotzdem unlesbar sein. Ein System kann skalierbar sein und trotzdem langsam.\n\nBei VAE Systems denken wir in Details. Wie fühlt sich die Software an? Wie schnell lädt sie? Wie intuitiv ist die Navigation? Wie elegant ist der Code? Diese Details entscheiden, ob eine Lösung großartig ist oder nur okay.\n\nDas kommt aus unserer künstlerischen Tradition. Ein Bildhauer sieht nicht nur den Stein — er sieht die Form, die darin verborgen ist. Er arbeitet, bis jede Linie stimmt. Jede Kurve. Jeder Winkel.\n\nDas gleiche tun wir mit Software. Wir arbeiten, bis das Design stimmt. Nicht “gerade gut genug”, sondern exzellent. Das ist nicht Perfektionismus im krankhaften Sinne — das ist Handwerkskunst.\n\nBesuch: Jürgen Goertz — Werke & Arbeiten. Exzellenz ist unsere Definition von Perfektion. Nicht, dass alles fehlerfrei ist. Sondern, dass es absichtlich ist. Durchdacht. Elegant. Nachhaltig.',
    seoKeywords: ['Design Excellence', 'Benutzererfahrung UX', 'Software-Ästhetik', 'Handwerkskunst in der Tech'],
    link: {
      text: 'Mehr über Jürgen Goertz erfahren',
      href: 'https://www.juergen-goertz.info/work/',
    },
  },
  {
    id: 'skalierbarkeit',
    title: 'Skalierbarkeit als Fundament — Ideen brauchen Raum',
    intro:
      'Eine großartige Idee heute ist morgen nichts wert, wenn die Infrastruktur nicht mit ihr wachsen kann. Skalierbarkeit ist nicht ein optionales Feature — sie ist das Fundament.',
    deepDive:
      'Viele Unternehmen bauen für heute. Sie schaffen ein System, das heute funktioniert. Aber was ist in sechs Monaten, wenn Sie zehnmal so viele Nutzer haben? Was ist in zwei Jahren, wenn sich Ihr Markt sich verdoppelt?\n\nSchlechte Skalierbarkeit ist teuer. Sehr teuer. Ein System umzuschreiben, weil es nicht wächst, kostet mehr als es richtig zu bauen.\n\nDas ist warum Skalierbarkeit den Wert einer Investition bestimmt. Ein System, das mit Ihrem Geschäft wächst, ist ein Vorteil. Ein System, das Sie limitiert, ist ein Ballast.\n\nBei der Infrastruktur-Planung fragen wir immer: “Was sind Ihre Ziele für die nächsten fünf Jahre?” Dann bauen wir danach. Nicht “warum sind Ihre Ziele so groß”, sondern “wie machen wir die Infrastruktur zukunftssicher”.\n\nDas bedeutet: Cloud-native Architektur. Microservices wenn sinnvoll. Datenbanken, die skalieren. APIs, die erweiterbar sind. Monitoring und Alerting von Anfang an.\n\nGleichzeitig: Nicht alles braucht Hyperscale. Manchmal ist Skalierbarkeit, dass Ihr System in zwei Jahren problemlos doppelt so viel Traffic verkraftet. Manchmal ist es, dass ein Mitarbeiter doppelt so viele Nutzer betreuen kann. Skalierbarkeit ist kontextabhängig. Aber die Fähigkeit zu wachsen ist immer kritisch.',
    seoKeywords: ['Cloud-Architektur', 'System-Skalierbarkeit', 'Microservices', 'Langzeit-Tech-Planning'],
  },
]

export const VISION_CONTENT = {
  title: 'Unsere Vision für Deutschland',
  quote: '“Digitale Infrastruktur, die in Deutschland geplant, gebaut und betrieben wird.”',
  explanation:
    'Deutschland verfügt über starke Ingenieurteams, doch häufig fehlen moderne Plattformen, definierte Zuständigkeiten und echte Eigenständigkeit. Wir unterstützen Unternehmen dabei, dokumentierte und souveräne Systeme aufzubauen – sicher, skalierbar und betreibbar im eigenen Haus.',
}

export const TESTIMONIAL = {
  quote:
    '“VAE Systems hat uns nicht einfach beraten, sondern unser Verständnis von Partnerschaft verändert. Heute kennen wir jede Abhängigkeit, jede Entscheidung ist dokumentiert und wir wissen genau, wie wir wachsen können.”',
  author: 'Clara W., COO eines Industrie-Mittelständlers',
  meta: 'Transformationsprojekt 2024 · Infrastruktur & Automatisierung',
}

export const CTA = {
  heading: 'Lassen Sie uns zusammenarbeiten',
  copy: 'Wenn diese Werte mit Ihrem Verständnis von Technologie und Partnerschaft resonieren, sollten wir sprechen. Wir begleiten strategische Roadmaps, Infrastruktur-Audits und komplexe Transformationsprojekte — oder beginnen mit einem ehrlichen Gespräch über Ihre Tech-Zukunft.',
  text: 'Kontakt aufnehmen',
  href: '/kontakt',
}
