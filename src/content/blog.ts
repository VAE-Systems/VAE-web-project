/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  BLOG CONTENT                                                             ┃
 * ┃  Interner Blog – keine externe Plattform mehr.                            ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 📐 STRUKTUR
 * ├── BlogPost      → Metadaten + geordnete Content-Blöcke
 * ├── BlogBlock     → paragraph | heading | list | quote | callout
 * └── heroImage     → optionaler Slot für KI-generierte Hero-Bilder
 *                     (Pfade unter /public/images/blog/, WebP bevorzugt)
 *
 * ✍️ NEUER ARTIKEL = neues Objekt in blogPosts. Kein Komponenten-Code nötig.
 * ⚖️ Keine unbelegten Zahlen/Claims. Beratender Ton, kein Alarmismus.
 */

export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'callout'; title: string; text: string }

export type BlogCategory = 'KI & Automatisierung' | 'Self-Hosting & Infrastruktur' | 'Produkt & Strategie'

export interface BlogPost {
  slug: string
  title: string
  subtitle: string
  excerpt: string
  category: BlogCategory
  /** ISO-Datum für <time> und Sortierung */
  date: string
  dateLabel: string
  readingTime: string
  author: string
  tags: string[]
  featured?: boolean
  heroImage?: { src: string; alt: string }
  blocks: BlogBlock[]
}

export const blogContent = {
  eyebrow: 'Unser Blog',
  heading: 'Klar denken über souveräne Technologie',
  description:
    'Methoden, Einordnungen und Werkzeuge aus echten Projekten – geschrieben für Entscheider, nicht für Maschinen.',
} as const

export const blogPosts: BlogPost[] = [
  {
    slug: 'souveraenitaets-treppe',
    title: 'Die Souveränitäts-Treppe',
    subtitle: 'In drei Stufen zur digitalen Unabhängigkeit – ohne Sprung ins kalte Wasser',
    excerpt:
      'Digitale Unabhängigkeit ist kein Alles-oder-nichts-Projekt. Wer in Stufen denkt, senkt Risiko und Kosten – und behält die Kontrolle über das Tempo.',
    category: 'Self-Hosting & Infrastruktur',
    date: '2026-06-09',
    dateLabel: '9. Juni 2026',
    readingTime: '6 Min.',
    author: 'VAE Systems',
    tags: ['Digitale Souveränität', 'Nextcloud', 'Self-Hosting', 'Strategie'],
    featured: true,
    heroImage: {
      src: '/images/blog/souveraenitaets-treppe.webp',
      alt: 'Abstrakte Glastreppe mit drei Stufen, auf der obersten ein leuchtendes Netzwerk aus verbundenen Knoten',
    },
    blocks: [
      {
        type: 'paragraph',
        text: 'Europa diskutiert über digitale Unabhängigkeit – und meistens fällt dabei der Name Nextcloud. Zu Recht: Eigene Dateiablage ist der sichtbarste Schritt raus aus der Abhängigkeit. Aber wer dort stehen bleibt, hat erst ein Drittel des Weges geschafft. Wir denken Unabhängigkeit als Treppe mit drei Stufen.',
      },
      { type: 'heading', text: 'Stufe 1: Der Status quo – verstreute Abo-Tools' },
      {
        type: 'paragraph',
        text: 'Office beim einen Anbieter, CRM beim zweiten, Cloud-Speicher beim dritten. Jedes Tool für sich ist bequem. In Summe entsteht etwas anderes: Ihre Geschäftsprozesse liegen verteilt auf Servern, deren Preise, Funktionen und Standorte andere bestimmen. Das ist kein Vorwurf – es ist der normale Ausgangspunkt fast jedes Unternehmens, das in den letzten zehn Jahren digitalisiert hat.',
      },
      {
        type: 'paragraph',
        text: 'Wichtig ist nur, die Lage nüchtern zu sehen: Bei jeder Preisrunde, jeder Funktionsänderung und jeder Frage zum Datenstandort sitzen Sie auf der Zuschauerbank.',
      },
      { type: 'heading', text: 'Stufe 2: Datenhoheit – die eigene Ablage' },
      {
        type: 'paragraph',
        text: 'Die zweite Stufe holt das Fundament ins Haus: Dateien, Kalender und Zusammenarbeit ziehen auf Server, die Ihnen gehören oder exklusiv für Sie betrieben werden – zum Beispiel mit Nextcloud. Ab hier gilt: Ihre Daten verlassen Ihren Kontrollbereich nicht mehr. Für viele Unternehmen ist das der Moment, in dem aus dem abstrakten Wort „Souveränität" ein konkretes Gefühl wird.',
      },
      {
        type: 'callout',
        title: 'Praxis-Hinweis',
        text: 'Stufe 2 ist der richtige Einstieg, wenn Sie zum ersten Mal migrieren: überschaubarer Umfang, sofort spürbarer Effekt, und das Team lernt die neue Umgebung an einem vertrauten Anwendungsfall – den eigenen Dateien.',
      },
      { type: 'heading', text: 'Stufe 3: Eigene Systeme und KI' },
      {
        type: 'paragraph',
        text: 'Die oberste Stufe verbindet alles: CRM, Automatisierungen und KI laufen auf Ihrer Infrastruktur, als ein zusammenhängendes System statt als Sammlung von Einzellösungen. Eine KI, die auf dieser Stufe arbeitet, kennt Ihre Dokumente, Ihre Prozesse und Ihre Kunden – und kein Byte davon verlässt das Haus.',
      },
      {
        type: 'paragraph',
        text: 'Das ist die Stufe, auf der Unabhängigkeit vom Schutzkonzept zum Wettbewerbsvorteil wird: Während andere darauf warten, welche KI-Funktionen ihr Anbieter freischaltet (und was sie kosten), bauen Sie die Workflows, die Ihr Geschäft tatsächlich braucht.',
      },
      { type: 'heading', text: 'Warum eine Treppe und kein Sprung?' },
      {
        type: 'list',
        items: [
          'Jede Stufe liefert für sich einen abgeschlossenen, nutzbaren Zustand – kein monatelanges „Großprojekt" ohne Zwischenergebnis.',
          'Das Risiko bleibt klein: Was auf Stufe 2 nicht passt, korrigieren Sie, bevor Stufe 3 darauf aufbaut.',
          'Budget und Tempo bestimmen Sie – die Treppe funktioniert in Monaten genauso wie in Jahren.',
        ],
      },
      {
        type: 'quote',
        text: 'Unabhängigkeit ist kein Risiko, sondern ein Wettbewerbsvorteil. Die Frage ist nicht ob, sondern in welcher Reihenfolge.',
        author: 'VAE Systems',
      },
      {
        type: 'paragraph',
        text: 'Wo Ihr Unternehmen heute steht und welche Stufe als nächste sinnvoll ist, lässt sich in einem Gespräch meist schnell einordnen – die Ausgangslagen ähneln sich mehr, als man denkt.',
      },
    ],
  },
  {
    slug: 'eigene-ki-im-unternehmen',
    title: 'Eigene KI im Unternehmen',
    subtitle: 'Wie eine KI Ihre Firmendaten nutzen kann, ohne dass sie das Haus verlassen',
    excerpt:
      'Eine KI, die Ihre Angebote, Verträge und Prozesse kennt – und trotzdem kein Byte nach außen sendet. Das Prinzip dahinter ist einfacher, als es klingt.',
    category: 'KI & Automatisierung',
    date: '2026-05-26',
    dateLabel: '26. Mai 2026',
    readingTime: '7 Min.',
    author: 'VAE Systems',
    tags: ['Lokale KI', 'RAG', 'Open Source', 'Datenschutz'],
    heroImage: {
      src: '/images/blog/eigene-ki-im-unternehmen.webp',
      alt: 'Leuchtendes Gehirn aus feinen Netzwerklinien in einem gläsernen Hausmodell auf dunklem Tisch',
    },
    blocks: [
      {
        type: 'paragraph',
        text: 'ChatGPT kennt Ihre Firmengeheimnisse nicht – und das soll auch so bleiben. Trotzdem wünschen sich viele Geschäftsführer genau das Gegenteil: eine KI, die die eigenen Angebote, Verträge und Abläufe kennt und Mitarbeitern fundierte Antworten gibt. Beides zusammen geht. Die Lösung heißt: die KI kommt zu den Daten, nicht die Daten zur KI.',
      },
      { type: 'heading', text: 'Das Prinzip: Bibliothekar statt Bauchgefühl' },
      {
        type: 'paragraph',
        text: 'Eine lokale Unternehmens-KI besteht aus drei Teilen, die man sich wie eine Bibliothek vorstellen kann. Das Sprachmodell ist der Bibliothekar: Es kann lesen, zusammenfassen und formulieren. Die Wissensdatenbank ist das Regal: Dort liegen Ihre Dokumente, sauber indexiert. Und die Verbindung zwischen beiden sorgt dafür, dass der Bibliothekar vor jeder Antwort erst im Regal nachschlägt, statt aus dem Gedächtnis zu raten. Fachleute nennen das RAG – Retrieval-Augmented Generation.',
      },
      {
        type: 'paragraph',
        text: 'Der entscheidende Punkt: Alle drei Teile laufen auf Ihrem Server. Es gibt keinen Moment, in dem ein Dokument zu einem US-Anbieter wandert. Die Antwortqualität steigt sogar, weil die KI nicht halluzinieren muss – sie liest die Antwort schwarz auf weiß in Ihren eigenen Unterlagen nach.',
      },
      { type: 'heading', text: 'Was dafür nötig ist' },
      {
        type: 'list',
        items: [
          'Ein Server mit ausreichend Rechenleistung – je nach Anspruch vom soliden Firmenserver bis zur GPU-Maschine. Er kann bei Ihnen stehen oder in einem deutschen Rechenzentrum, exklusiv für Sie.',
          'Ein offenes Sprachmodell (etwa aus den Familien Llama oder Mistral), das lokal betrieben wird – ohne Lizenzkosten pro Nutzer.',
          'Eine Anbindung an Ihre Datenquellen: Dateiablage, E-Mail-Archiv, CRM. Hier entscheidet sich, wie nützlich die KI im Alltag wirklich wird.',
        ],
      },
      {
        type: 'callout',
        title: 'Ehrliche Einordnung',
        text: 'Eine lokale KI ist heute sehr gut in: Dokumente finden und zusammenfassen, Entwürfe schreiben, Wissen verfügbar machen. Sie ersetzt kein Spezialistenteam und keine Entscheidung. Wer Ihnen lokale KI als Alleskönner verkauft, verkauft zu viel.',
      },
      { type: 'heading', text: 'Was das im Alltag bedeutet' },
      {
        type: 'paragraph',
        text: 'Konkrete Anwendungsfälle aus Projekten: ein Assistent, der zu jeder Kundenanfrage die passenden früheren Angebote und Konditionen heraussucht. Eine Suche, die „Wo steht unsere Kündigungsfrist im Vertrag mit X?" in Sekunden beantwortet. Automatische Entwürfe für wiederkehrende Berichte, die ein Mensch nur noch prüft statt schreibt.',
      },
      {
        type: 'paragraph',
        text: 'Der gemeinsame Nenner: Es geht selten um spektakuläre KI-Magie. Es geht darum, dass Wissen, das im Unternehmen längst existiert, endlich auffindbar und nutzbar wird – ohne dass dafür ein Datenschutzkonzept neu geschrieben werden muss.',
      },
      {
        type: 'quote',
        text: 'Die beste Unternehmens-KI ist die, über deren Datenflüsse Sie in einem Satz Auskunft geben können: Alles bleibt im Haus.',
        author: 'VAE Systems',
      },
      {
        type: 'paragraph',
        text: 'Ob sich der Einstieg für Ihre Unternehmensgröße lohnt und welche Hardware-Klasse realistisch ist, hängt von wenigen Faktoren ab – Dokumentenmenge, Nutzerzahl, Anwendungsfälle. Das lässt sich in einem Erstgespräch gut abschätzen.',
      },
    ],
  },
  {
    slug: 'wann-lohnt-sich-self-hosting',
    title: 'Wann sich eigene Infrastruktur lohnt – und wann nicht',
    subtitle: 'Eine ehrliche Entscheidungshilfe jenseits von Ideologie',
    excerpt:
      'Self-Hosting ist kein Selbstzweck. Manchmal ist das SaaS-Abo die richtige Antwort. Eine nüchterne Entscheidungshilfe in vier Fragen.',
    category: 'Produkt & Strategie',
    date: '2026-05-12',
    dateLabel: '12. Mai 2026',
    readingTime: '5 Min.',
    author: 'VAE Systems',
    tags: ['Entscheidungshilfe', 'SaaS', 'Kosten', 'Strategie'],
    heroImage: {
      src: '/images/blog/wann-lohnt-sich-self-hosting.webp',
      alt: 'Präzise Balkenwaage aus dunklem Metall: Stapel leuchtender Abo-Karten gegen einen massiven Server-Würfel',
    },
    blocks: [
      {
        type: 'paragraph',
        text: 'Wir verdienen unser Geld mit selbstgehosteter Infrastruktur – und trotzdem beginnt fast jede unserer Analysen mit der Option „Status quo beibehalten". Warum? Weil Self-Hosting kein Glaubensbekenntnis ist, sondern eine Investitionsentscheidung. Vier Fragen bringen Klarheit.',
      },
      { type: 'heading', text: '1. Wie kritisch sind die Daten?' },
      {
        type: 'paragraph',
        text: 'Personaldaten, Kundenverträge, Kalkulationen, Gesundheitsdaten: Je sensibler die Information, desto stärker wiegt das Argument, sie im eigenen Kontrollbereich zu halten. Für das Tool, mit dem Sie Social-Media-Posts planen, gilt das eher nicht. Die Kunst liegt darin, nicht alles über einen Kamm zu scheren.',
      },
      { type: 'heading', text: '2. Wie viele Nutzer, wie lange?' },
      {
        type: 'paragraph',
        text: 'SaaS-Preise skalieren pro Kopf und pro Monat – eigene Infrastruktur skaliert mit der Hardware. Daraus folgt eine einfache Faustregel: Je größer das Team und je länger der Zeithorizont, desto eher rechnet sich die Anfangsinvestition. Ein Drei-Personen-Team mit unklarer Zukunft fährt mit Abos oft besser. Ein 30-Personen-Betrieb, der in zehn Jahren noch existieren will, zahlt im Abo-Modell meist drauf.',
      },
      { type: 'heading', text: '3. Wie weh tut ein Ausfall oder Anbieterwechsel?' },
      {
        type: 'paragraph',
        text: 'Stellen Sie sich vor, Ihr wichtigstes Tool wird übernommen, eingestellt oder ändert sein Preismodell. Wie lange bräuchten Sie für einen Wechsel? Wenn die ehrliche Antwort „Monate" oder „wir wissen es nicht" lautet, haben Sie ein Klumpenrisiko – unabhängig davon, wie zufrieden Sie heute sind.',
      },
      { type: 'heading', text: '4. Wer betreibt es?' },
      {
        type: 'paragraph',
        text: 'Die unbequeme Wahrheit: Eigene Infrastruktur will betrieben werden. Updates, Backups, Sicherheit – das verschwindet nicht, nur weil der Server Ihnen gehört. Es gibt zwei ehrliche Antworten: ein eigenes Team, das die Kompetenz aufbaut, oder ein Partner, der den Betrieb verantwortet. Wer beides nicht will, sollte beim Abo bleiben.',
      },
      {
        type: 'callout',
        title: 'Unser Modell',
        text: 'Genau für die zweite Antwort gibt es betreutes Hosting: Die Systeme gehören Ihnen, der Betrieb – Monitoring, Updates, Sicherheit – liegt bei uns. Souveränität ohne eigene IT-Abteilung.',
      },
      { type: 'heading', text: 'Das Fazit' },
      {
        type: 'paragraph',
        text: 'Self-Hosting lohnt sich, wenn sensible Daten, Teamgröße und Zeithorizont zusammenkommen – und der Betrieb geklärt ist. Es lohnt sich nicht als Prinzipienreiterei für jedes Randtool. Eine gute Analyse unterscheidet genau das, System für System. Deshalb enthält unser Fahrplan immer auch die Option, Dinge zu lassen, wie sie sind.',
      },
    ],
  },
] as const

// ── HELPERS ──────────────────────────────────────────────────────────────────

export const sortedBlogPosts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))

export const getBlogPost = (slug: string): BlogPost | undefined => blogPosts.find(post => post.slug === slug)

export const getRelatedPosts = (slug: string, limit = 2): BlogPost[] =>
  sortedBlogPosts.filter(post => post.slug !== slug).slice(0, limit)
