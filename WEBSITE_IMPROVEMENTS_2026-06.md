# VAE-Website — Top 10 Verbesserungen (Stand 11.06.2026)

Analyse-Basis: lokaler Code (`vae-web-project`), Lighthouse-Report (09/2025, Perf 0.42 / A11y 0.92 / BP 0.79 / SEO 1.0), Input von Chris (Souveränität, KISS, Förderung).
Constraint: Hero-Background (Neural Network / Netze) bleibt — nur Text-Layout und Drumherum werden angefasst.

---

## A · Conversion / Positionierung

### 1. Souveränitäts-Narrativ als Lead-Message ausbauen ⭐ größter Hebel
Die Site sagt „Self-Hosted-First" als **Feature**. Der Markt 2026 kauft es als **Risikoabsicherung** (US-Abhängigkeit, EU-Debatte, Nextcloud-Beispiel im heute journal). Genau das fehlt auf der Homepage komplett — „Souveränität" taucht nur auf Unterseiten (`storyTeam`, `valuesData`) auf.

- Neue Section auf Home (oder Umbau von `WhyOpenSourceSection`): **„Digitale Souveränität"** mit Risiko-Framing: *„Was passiert mit Ihrer Firma, wenn Ihr US-Anbieter morgen abschaltet, Preise verdoppelt oder per Dekret gesperrt wird?"*
- Positionierung gegen Nextcloud nutzen, nicht verstecken: *„Alles, was Nextcloud kann — plus CRM, Automationen und KI auf Ihrer eigenen Hardware."*
- Chris' Punkt ist richtig, aber: **seriöses Risiko-Framing statt Angstmache.** Faktenbasiert (EU-Position, reale Vorfälle), keine Panik-Rhetorik — Zielgruppe Geschäftsführer reagiert auf Haftungs-/Ausfallrisiko, nicht auf Alarmismus.

### 2. KISS: Texte für Entscheider, nicht für Informatiker
Chris' stärkster Punkt. Die `heroDescription` ist ein Jargon-Bandwurm: *„Self-Hosted-First Infrastruktur – volle Datenkontrolle, klare Kosten, vendor-neutral geplant…"* Ein Nicht-IT-Geschäftsführer versteht „vendor-neutral geplant" nicht.

- Hero-Description auf 1–2 einfache Sätze: Problem → Ergebnis. Beispiel-Richtung: *„Ihre Software, Ihre Daten, Ihre KI – auf Servern, die Ihnen gehören. Unabhängig von US-Konzernen, planbar in den Kosten."*
- Typewriter-Begriffe prüfen: „DSGVO by design" und „Open Source + Standards" sind Fachsprache; „Kontrolle statt Abos" und „KI auf Ihrer Hardware" funktionieren.
- Das Tresor-Bild aus Chris' Doc ist als Erklär-Metapher für die Souveränitäts-Section brauchbar.

### 3. Outcome-Metriken absichern oder entschärfen (rechtliches Risiko)
`home.ts` zeigt „68 % Zeiteinsparung", „€2.400 SaaS-Ersparnis", „9,6/10 Zufriedenheit" — ohne sichtbare Quelle/Case. Nicht belegbare Zahlen sind UWG-angreifbar (irreführende Werbung) und wirken auf skeptische Entscheider erfunden.

- Jede Zahl mit Case verlinken oder umformulieren („in Pilotprojekt X…"). Was nicht belegbar ist: raus oder qualitativ formulieren.
- Echte Kundenstimme mit Name/Firma (eine reicht) schlägt vier anonyme Kennzahlen.

### 4. Fördermittel als Sales-Argument einbauen
Chris' Förder-Hinweis ist real, aber der Hebel liegt **beim Kunden, nicht bei VAE**: Digitalisierungsprogramme (L-Bank BW, KfW, regionale Digitalprämien) können Kundenprojekte bezuschussen → senkt die Kaufschwelle massiv.

- CTA-Verstärker auf Home + Beratungsseite: *„Viele unserer Projekte sind förderfähig – wir prüfen das im Erstgespräch."*
- ⚠️ Vorher verifizieren, welche Programme 2026 aktiv sind und ob Beratung/Setup tatsächlich förderfähig ist. Keine Quoten versprechen. EXIST/Horizon aus dem ChatGPT-Doc sind für VAE selbst größtenteils unpassend (UG existiert bereits, kein Forschungsprojekt) — Digital Europe nur via Konsortium realistisch.

---

## B · UX / Layout

### 5. Hero-Text-Layout neu hierarchisieren (Julians Punkt)
Background bleibt. Problem ist die Text-Konkurrenz: Eyebrow + zweizeilige H1 + Typewriter (gleiche Brandfarbe, fast H1-Größe, `lg:text-4xl`) + Description + 2 CTAs + 3 laute Uppercase-Trust-Badges — alles zentriert, alles schreit gleich laut.

- **Eine** dominante Aussage: H1. Typewriter eine Stufe kleiner und visuell sekundär (oder in die Description integriert), nicht als zweite H1 in Turquoise.
- Eyebrow „Structure is strategy" prüfen — englischer Insider-Slogan, trägt für Erstbesucher nichts. Kandidat für Ersatz durch z. B. „Digitale Souveränität für den Mittelstand".
- Trust-Badges: tracking/uppercase reduzieren, damit sie Trust geben statt Aufmerksamkeit ziehen.
- Option: asymmetrisches Layout (Text links, Netz-Dichte rechts) statt Vollzentrierung — gibt dem Background Raum und dem Text Lesefluss.

### 6. Netz-Background ausbaufähig machen (Julians „genial, aber ausbaufähig")
`NeuralNetworkBackground` (1.285 Zeilen, Three.js) hat bereits Mouse-Interaktion auf Desktop. Ausbau-Ideen mit gutem Aufwand/Wirkung-Verhältnis: Scroll-Reaktion (Netz verdichtet sich Richtung Services), Farb-Puls beim CTA-Hover, sanfte Reaktion auf Typewriter-Wechsel. Kein Rebuild — Tuning der bestehenden Engine.

### 7. Section-Flow auf Home straffen + Farbbrüche fixen
7 Sections mit teils redundanter Botschaft (WhyOpenSource und TechStack erzählen beide „Unabhängigkeit"). Die orange/rosa „Problem"-Karte in `WhyOpenSourceSection` bricht die Brand-Farbwelt (Turquoise/Black) hart. Flow-Vorschlag: Hero → Souveränität (neu, #1) → Services → Social Proof → Process → CTA; TechStack auf Unterseite.

---

## C · Mobile

### 8. Three.js-Background auf Mobile ersetzen
`isMobile` deaktiviert nur die Maus-Interaktion — die 460-KB-Three.js-Lib lädt und rendert trotzdem auf jedem Smartphone (Akku, Daten, Low-End-Geräte). Auf Mobile: statisches SVG/Canvas-2D-Netz oder CSS-Gradient-Fallback, Three.js nur ≥ 768px laden. Bonus: Typewriter-`minWidth` in `ch` auf schmalen Screens auf Overflow prüfen.

---

## D · Performance

### 9. Asset- und Bundle-Diät
- `public/` = **14 MB**, einzelne PNGs bis 436 KB, `langchain.png` (Logo!) 420 KB, `images/raw/` liegt mit im Deploy-Ordner. → WebP/AVIF-Pipeline, raw raus aus `public/`.
- Lighthouse: total-byte-weight 8,8 MB. JS gesamt ~1,5 MB: three (460 KB) + framer-motion (108 KB) + GSAP + ogl = **vier Animations-/3D-Libs parallel**. Auf zwei konsolidieren (GSAP + eine 3D-Lib; `ogl` ist als leichtere Three-Alternative bereits installiert und ungenutzt).
- Lighthouse-Report ist von 09/2025 gegen Dev-Server — nach Fixes neuen Prod-Audit fahren.

---

## E · Codequalität

### 10. Hygiene-Sweep
- **Doppelte Komponente:** `ui/MagneticButton.tsx` und `ui/buttons/MagneticButton.tsx` existieren beide und sind divergiert — eine Quelle der Wahrheit herstellen.
- 53 `console.log/warn` in `src/` → Logger oder raus.
- `archive/` (672 KB) + `src/archive/` aus dem Projekt in echtes Archiv außerhalb von `src`.
- `dist/`, `build-log.txt`, `lighthouse-report.json`, `playwright-report/` aus dem Repo (gitignore prüfen).

---

## Bewertung Chris' Input (Kurzfassung)

| Idee | Bewertung |
|---|---|
| Souveränitäts-/Angst-Marketing | ✅ Kern richtig, als seriöses Risiko-Framing umsetzen (#1) |
| KISS — Texte zu fachlich | ✅ Voll zutreffend, höchste Text-Priorität (#2) |
| Tresor-Metapher | ✅ Brauchbar für Souveränitäts-Section |
| Fördermittel | ⚠️ Als Kunden-Argument stark (#4); für VAE selbst nur selektiv (L-Bank/KfW ja, EXIST/Horizon eher nein) |
| Nachrichten-Clips im Marketing | ⚠️ Verlinken/zitieren ok, ZDF-Material nicht einbetten (Urheberrecht). Besser: eigener Blog-/LinkedIn-Beitrag, der die Debatte aufgreift |

## Empfohlene Reihenfolge
1. Quick Wins (1 Tag): #2 Hero-Texte, #5 Hero-Hierarchie, #3 Metriken entschärfen
2. Sprint 1: #1 Souveränitäts-Section, #4 Förder-Hinweis, #7 Section-Flow
3. Sprint 2: #8 Mobile-Fallback, #9 Assets/Bundle, #10 Hygiene, #6 Netz-Ausbau
