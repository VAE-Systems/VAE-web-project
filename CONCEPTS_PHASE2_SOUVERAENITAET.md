# Phase-2-Konzepte — Souveränitäts-Section & Referenz-Leiste

Status: Konzept, noch nichts gebaut. Entscheidung Julian erforderlich.

---

## Souveränitäts-Section — 2 Varianten

### Variante A · „Der Risiko-Brief" (ruhig, seriös, konservativ)

**Platzierung:** Direkt nach Hero, ersetzt nicht WhyOpenSource, sondern schärft dessen Einstieg — oder wird dessen neuer oberer Block.

**Dramaturgie:** Eine Frage, drei Fakten, eine Antwort.

> **Eyebrow:** Digitale Souveränität
> **H2:** Was passiert mit Ihrer Firma, wenn Ihr Cloud-Anbieter morgen abschaltet?
> **Intro (2 Sätze):** Die EU stuft die Abhängigkeit von US-Cloud-Anbietern inzwischen als strategisches Risiko ein. Für Unternehmen heißt das konkret: Preise, Funktionen und sogar der Zugang zu den eigenen Daten liegen in fremder Hand.

Drei ruhige Karten (kein Alarm-Rot, Brand-Farbwelt):
1. **Zugriff** — „Konten können gesperrt, Dienste eingestellt werden – ohne dass Sie etwas falsch gemacht haben."
2. **Kosten** — „Preiserhöhungen kommen per Mail. Ihre Alternative: zahlen oder migrieren."
3. **Recht** — „Das DSGVO-Risiko für Datenflüsse in Drittstaaten tragen Sie, nicht Ihr Anbieter."

**Antwort-Statement:** „Unsere Antwort: Ihre Systeme, Ihre Daten, Ihre KI – auf Infrastruktur, die Ihnen gehört. Betrieben und betreut von uns." → CTA „Souveränität im Erstgespräch prüfen" + Link auf bestehende Seite `/wissen/vendor-lock-in-vermeiden`.

**Stärke:** Seriös, null Angstmache-Vorwurf, juristisch wasserdicht (keine Behauptungen über konkrete Anbieter).
**Schwäche:** Weniger memorable als B.

---

### Variante B · „Die Souveränitäts-Treppe" (offensiv, mit Nextcloud-Anker)

**Platzierung:** Wie A. Nutzt das mediale Momentum (heute journal, Nextcloud als bekannter Name) aktiv.

**Dramaturgie:** Drei Stufen der Unabhängigkeit, VAE als oberste Stufe.

> **Eyebrow:** Digitale Souveränität
> **H2:** Nextcloud ist ein guter Anfang. Wir bauen die ganze Treppe.
> **Intro:** Europa diskutiert über digitale Unabhängigkeit – und meistens fällt dabei ein Name: Nextcloud. Gut so. Aber Dateien sind nur der Anfang.

Drei Stufen (visuell aufsteigend, kann die bestehende `AnimatedSaaSTransformation` weiterverwenden):
1. **Stufe 1 — Fremde Cloud:** Microsoft 365, Google & Co. Bequem, aber fremdbestimmt.
2. **Stufe 2 — Eigene Dateien:** Nextcloud self-hosted. Dateien, Kalender, Kontakte in Ihrer Hand.
3. **Stufe 3 — Volle Souveränität (VAE):** Dateien + CRM + Automationen + eigene KI. Ein System, ein Ansprechpartner, alles im Haus.

**CTA:** „Welche Stufe ist die richtige für Sie? → Kostenlose Analyse"

**Stärke:** Memorable, positioniert VAE klar über dem bekanntesten Namen im Markt, nutzt Suchinteresse „Nextcloud Alternative/Erweiterung".
**Schwäche:** Markennennung erfordert sauberes Wording (Nextcloud positiv erwähnen = ok; nicht herabsetzen, keine Logo-Nutzung, ®-Hinweis unnötig bei redaktioneller Nennung).
**Hinweis:** VAE setzt Nextcloud selbst ein (steht in techShowcaseTools) — das macht die Story glaubwürdig: „Wir bauen MIT Nextcloud, plus alles darüber."

---

## Referenz-/Logo-Sektion (betreute Projekte) — Vordenken

**Kandidaten:** kulturfuereuropa.eu, lukas-sosnowski.de, malermeisterberndgronewold.de, aion-projects.de, aktiv-kollektiv.de

### Datenstruktur (`src/content/managedReferences.ts`)

```ts
export type ReferenceRelation =
  | 'kunde'              // zahlender Kunde
  | 'betreutes-projekt'  // Hosting/Betrieb durch VAE
  | 'partner'            // Geschäftspartner (nur wenn vertraglich sauber)
  | 'sponsoring'         // Pro-bono / gesponsert
  | 'eigenes-projekt'    // Eigenbezug (AION, Aktiv Kollektiv) → Offenlegung Pflicht

export interface ManagedReference {
  id: string
  name: string
  url?: string                 // live-Link, rel="noopener"
  logo?: string                // lokaler Pfad — NIE von fremden Sites kopieren
  relation: ReferenceRelation
  services: Array<'hosting' | 'betrieb' | 'entwicklung' | 'beratung' | 'ki'>
  since?: string               // '2025'
  consent: {
    logoUsage: boolean         // schriftliche Freigabe liegt vor
    namingAllowed: boolean     // Namensnennung freigegeben
    source?: string            // wo dokumentiert (Mail vom…, Vertrag §…)
  }
  disclosure?: string          // z. B. 'Julian Goertz ist Vorstand des Vereins'
}
```

### Platzierung & Darstellung
- Dezente Leiste **unterhalb der bestehenden SocialProofSection**, Titel: **„Betrieb & Hosting in der Praxis"** (kein „Unsere Kunden", solange Relationen gemischt sind).
- Logos einfarbig/graustufen, Hover → Farbe + Domain-Link. Ohne Logo: Name als Text-Chip.
- Pro Eintrag ein Mikro-Label aus `relation` („Betreutes Projekt", „Kunde") — trennt sauber Kunden von Eigenprojekten.
- Ergänzen neuer Logos = ein neuer Eintrag im Content-File + SVG nach `public/logos/managed/`. Kein Komponenten-Code anfassen.

### Rechtliche Leitplanken
- Logo nur mit dokumentierter Freigabe (`consent.logoUsage`), sonst Text-Nennung — und auch die nur mit `namingAllowed`.
- AION & Aktiv Kollektiv: Eigenbezug offenlegen (`disclosure`), sonst wirkt es wie Fremdreferenz.
- Nie „offizieller Partner" ohne Vertrag. Render-Guard: Komponente zeigt nur Einträge mit `namingAllowed: true`.
