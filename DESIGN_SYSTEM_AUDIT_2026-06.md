# VAE Systems – Design-System-Audit

**Datum:** 2026-06-12
**Rolle:** Lead Product Designer / Design-System-Architekt
**Scope:** Gesamte Website (alle Routen) außer **Home-Hero (`HeroSection.tsx`) – bleibt unangetastet**
**Status:** Audit abgeschlossen. **Noch keine Code-Änderungen.** Freigabe für Refactor ausstehend.

---

## 0. Kernbefund (eine Diagnose, nicht 30 Bugs)

Die Website hat **kein** Designproblem auf Komponentenebene. Sie hat **vier parallele, gleichzeitig aktive Farb-/Token-Systeme**, die denselben Begriff (z. B. „dunkler Hintergrund", „Markengrün") mit **unterschiedlichen Werten** definieren. Jede Unterseite greift – je nachdem, wann und von wem sie gebaut wurde – ein anderes System ab. Deshalb wirken Seiten „wie aus verschiedenen Websites".

Die sichtbaren Symptome (schwarzer statt weißer Text, falsche Grüntöne, springende Cards) sind **Folgen genau dieser System-Konkurrenz**, nicht isolierte Fehler. Einzelfixes verschieben das Problem nur auf die nächste Seite.

**Die vier konkurrierenden Systeme:**

| System | Definiert in | Aktiv über | Beispiel „Markenfarbe" | Beispiel „Dark BG" |
|---|---|---|---|---|
| **A. Tailwind/`--color-*`** (statisch) | `globals.css` `:root` | Tailwind-Klassen `bg-vae-black`, `text-vae-turquoise` | `--color-vae-turquoise: 157 75% 40%` | `--color-bg-dark: 0 0% 8%` (#141414) |
| **B. `--theme-*`** (statisch + JS-überschrieben) | `theme.css` + `themeManager.ts` | `.theme-*`-Klassen, `theme.css`-Komponenten | `#1db87a` | `#0a0a0a` |
| **C. `tokens.ts` Palette** (JS-injiziert) | `design-system/tokens.ts` | `themeManager.applyTheme()` → inline `:root` | dark `hsl(157 100% 47%)` | **`hsl(222 47% 6%)` (BLAU-Slate!)** |
| **D. `--ds-*`** (statisch) | `design-system.css` | `.ds-*`-Utilities | – | – |

Dazu kommt als **Soll-Referenz** der dokumentierte Styleguide (`VAE_BRAND_STYLEGUIDE.md`), der wiederum **von allen vieren abweicht**: Primär `#00FFA5` / `hsl(157 100% 50%)`, neutrale Schwarz-Stufen `#050505 / #0A0A0A / #141414 / #1F1F1F`, Light-Akzent `#00B374`.

→ **Fünf Wahrheiten für eine Markenfarbe. Niemand gewinnt konsistent.**

---

## A) Design-System-Probleme (die eigentlichen Ursachen)

**A1 — Markenfarbe existiert in 5+ Werten.**
Belegt im Code: `#00ffa5`, `#1db87a`, `#00ff88`, `hsl(157 100% 47%)`, `hsl(157 75% 40%)`. Styleguide-Soll ist `#00FFA5` / `hsl(157 100% 50%)`.
- `globals.css`: `--color-vae-turquoise: 157 75% 40%` → spürbar **dunkler/entsättigt** als Marke. Kommentar daneben behauptet fälschlich „#00ffa5".
- `tokens.ts` dark: `hsl(157 100% 47%)` (nicht 50%). Light-Primary: `#1db87a` – ein **anderes Grün** als das Styleguide-Light `#00B374`.
→ Grün/Türkis wirkt je nach Seite mal neon, mal gedämpft, mal gräulich.

**A2 — „Dunkler Hintergrund" ist in 10+ Werten codiert.**
`#0a0a0a, #101513, #050505, #0f1c17, #07100d, #1a1a1a, #0d0d0d, #0b0e13, #050a0c, #0f1f1f` + HSL-Varianten. Teilweise **neutral-schwarz**, teilweise **grün getönt** (`#101513`, `#0f1c17`), und in `tokens.ts` sogar **blau-slate** (`hsl(222 47% 6%)`). Das blau-slate-Token wird von `themeManager` **inline auf `:root` injiziert** und überschreibt damit das neutrale `theme.css`-Schwarz zur Laufzeit – aber nur dort, wo Komponenten `--theme-background` nutzen. Komponenten mit `bg-vae-black` (System A) bleiben neutral. → **Zwei verschiedene Schwarztöne auf derselben Seite.**

**A3 — Vier Typo-Skalen nebeneinander.**
`globals.css --font-size-*` (statische rem) · `design-system.css --ds-font-size-*` (clamp) · `tokens.ts typography` (clamp, andere Werte) · `theme.css`. Es gibt keine eine Quelle für „wie groß ist H2".

**A4 — Vier Spacing-Skalen, drei Radius-Skalen, zwei Shadow-Systeme.**
Radius: `tokens.ts` (4/6/10/14/18px) vs. `globals.css --radius-*` (rem) vs. `theme.css --theme-border-radius: 8px`. Shadows: `tokens.ts` slate-rgba `rgba(15,23,42,…)` vs. `theme.css` `rgba(0,0,0,…)`/`rgba(26,35,32,…)`. → Abstände und Ecken „springen" zwischen Seiten.

**A5 — JS-injizierte Inline-Variablen schlagen statisches CSS.**
`themeManager.setCssVariables()` schreibt `--theme-*`, `--ds-color-*`, `--ds-radius-*` etc. als **Inline-Style auf `:root`**. Inline gewinnt gegen `theme.css`/`design-system.css`. Welcher Wert „gilt", hängt davon ab, ob JS schon gelaufen ist und welches Var-Präfix eine Komponente zufällig nutzt. → Nicht-deterministische Optik, schwer zu debuggen.

---

## B) Komponenten-Probleme

**B1 — Cards haben keinen Radius-Standard.**
Gemessen über alle `.tsx`: `rounded-2xl` ×169, `rounded-3xl` ×68, `rounded-xl` ×68, `rounded-lg` ×61. Vier „normale" Card-Radien gleichzeitig im Einsatz.

**B2 — Glasmorphismus ohne Standard.**
`backdrop-blur` in 6 Stärken: `-sm` ×41, `-md` ×18, `-xl` ×15, `-2xl` ×3, `-lg` ×1, `-none` ×1. Kombiniert mit beliebigen `bg-white/x` → jede Card hat eine eigene „Glas-Rezeptur".

**B3 — Surface-/Border-Farben als rohe Tailwind-White-Alpha.**
`bg-white/5` ×88, `/10` ×57, `/70` ×43, `/80` ×26 … und `border-white/10` ×200, `/5` ×88, plus `/15,/20,/30,/35,/40,/50,/70,/80`. Diese Werte sind **nur für Dark Mode** sinnvoll gewählt. Es gibt keine semantische Surface-/Border-Komponente.

**B4 — Hero-Sektionen folgen unterschiedlicher Logik.**
Drei Hero-Bausteine (`HeroSection`, `ProductsHeroSection`, `ServicesHeroSection`) + Hero-Varianten in einzelnen Pages. `ProductsHeroSection` und `ServicesHeroSection` enthalten eigene Hardcoded-Hex – andere Hintergrund-/Overlay-Logik als der Home-Hero. (Home-Hero bleibt laut Auftrag Referenz und unangetastet.)

**B5 — 27 Komponenten mit Hardcoded-Hex** statt Tokens (u. a. `Card.tsx`, `ServiceCard.tsx`, `SpotlightCard.tsx`, `Header.tsx`, `DropdownMenu.tsx`, `KiOptimierungPage`, `BeratungPage`, `ContactPage`, `SetupPage` …). Jede dieser Stellen ist gegen Theme-Wechsel immun und driftet von der Marke ab.

---

## C) Theme-Probleme (Light/Dark)

**C1 — Light Mode ist als „Blanket-Override-Friedhof" gebaut – die zentrale Fehlerquelle für schwarzen-Text-auf-Dunkel.**
Light Mode korrigiert nicht Tokens, sondern **patcht hunderte einzelne Tailwind-Utilities global**:
`globals.css` enthält `.theme-light .text-white {…}`, `.theme-light .bg-white\/5 {…}`, `html:not(.theme-light) .border-white\/10 {…}` usw. – eine **manuell gepflegte Liste**. Der Code selbst kommentiert das als „Legacy-Blanket-Overrides" (Z. ~1914).
**Mechanismus des Bugs:** Komponenten werden in Dark-Mode-Utilities (`text-white`, `bg-white/5`) geschrieben; Light Mode muss jede einzelne überschreiben. Sobald eine neue Seite eine Variante nutzt, die **nicht** in der Liste steht, schlägt das Override fehl → weißer Text bleibt weiß auf hellem Grund / schwarzer Block bleibt dunkel.
**Konkreter Beleg:** Die Override-Liste deckt `bg-white/5`, `/10`, `/[0.035]`, `/[0.025]`, `/[0.05]` ab – aber `bg-white/8` (×6 im Code) **fehlt** in der Liste → diese Flächen brechen im Light Mode.

**C2 — Theme-Schalter ändert zwei verschiedene „Wahrheiten" nicht synchron.**
`themeManager` setzt `--theme-*`/`--ds-*` (System B/C), lässt aber `--color-*` (System A, statisch in `globals.css`) unberührt. Tailwind-Klassen wie `bg-bg-dark`/`text-text-light` ändern sich beim Theme-Wechsel **nicht**, weil ihre Variablen statisch dark-only definiert sind. → Teile der Seite „kippen" beim Umschalten, andere bleiben dunkel.

**C3 — Drei zusätzliche, halbfertige Schemata** (`high-contrast`, `colorblind`) in `theme.css` definieren nur Primär-/Sekundär-/Akzentfarben, keine Flächen/Text → bei Aktivierung garantiert gebrochene Kontraste. Aktuell totes, riskantes Gewicht.

---

## D) Einzelne Seitenfehler (Symptome, nicht Ursachen)

Diese sind Ausprägungen von A–C und werden durch die systemische Lösung großteils automatisch behoben:

- **Werte-/Wissen-Unterseiten** (`values/*`, `wissen/*`): eigene `accent-section`-Sonderlogik mit eigenem Button-/Border-/Pill-Styling (`globals.css` ~1309–1401) – wirkt wie ein Fremdkörper-Subtheme.
- **Service-/Produkt-Heroes**: abweichende Overlay-/Hintergrundlogik vs. Home (B4).
- **Hardcoded-Hex-Pages** (`KiOptimierung`, `Beratung`, `Setup`, `Betreuung`, `Contact`, `ResourcesFaq`): theme-immun, eigene Grün-/BG-Töne (A1/A2).
- **Dropdown/Header/CommandPalette**: eigene Hex-Werte → Navigation passt farblich nicht exakt zum Body.

---

## Zielästhetik (verbindlich, abgeleitet aus dem Styleguide)

> **„Jede Seite wirkt, als sei sie von derselben Person am selben Tag gestaltet worden."**

- **Charakter:** ruhiges, technisches Dark-First-Interface; ein einziger Türkis-Akzent als Marke; viel Schwarz/Neutral, sparsame Glas-Flächen, präzise dünne Borders.
- **Primärfarbe:** **`#00FFA5` / `hsl(157 100% 50%)`** (Dark). Light-Akzent dunkler: **`#00B374`**.
- **Flächen (Dark):** `#050505` (tiefster Grund) → `#0A0A0A` (Standard) → `#141414` (Sektion) → `#1F1F1F` (Card). **Neutral, kein Blau-, kein Grünstich.**
- **Flächen (Light):** `#FFFFFF` Cards, `#F5F7F5/#FAFAFA` Grund, Text `#1A2B1F`.
- **Ein Card-Stil:** Radius `rounded-2xl`, Border `1px` Türkis@~12–20 % bzw. neutral, optionaler Glow nur als Akzent.
- **Ein Glas-Rezept:** `backdrop-blur-md` + definierte Surface-Token.
- **Eine Typo-, eine Spacing-, eine Radius-, eine Shadow-Skala.**

---

## Designregeln (die ab sofort gelten sollen)

1. **Eine Quelle der Wahrheit.** Genau **ein** Token-Layer (Vorschlag: `--ds-color-*` semantisch: `bg`, `surface`, `surface-muted`, `border`, `text`, `text-muted`, `primary`, `primary-hover`). Tailwind mappt nur noch darauf. Systeme A/B werden auf C zurückgeführt.
2. **Keine rohen `*-white/x` mehr in Komponenten.** Stattdessen semantische Klassen (`bg-surface`, `border-subtle`). Light/Dark wird **im Token** gelöst, nicht per Override-Liste.
3. **Kein Hardcoded-Hex in `.tsx`.** Ausnahmslos Token/Tailwind-Klassen.
4. **Theme = nur Token-Werte tauschen.** Kein einziges `.theme-light .konkrete-utility {…}`-Override mehr. Die Blanket-Override-Blöcke in `globals.css` werden ersatzlos entfernt, sobald Tokens semantisch sind.
5. **Fixe Skalen:** Radius {sm 8 / md 12 / **card 16 (`2xl`)** / pill full}; Blur {card = `md`}; Spacing- und Typo-Skala = je eine.
6. **Home-Hero ist eingefroren** und dient als visuelle Referenz für alle anderen Heroes.

---

## Vorgehen (systemisch, in dieser Reihenfolge)

**Phase 1 – Token-Konsolidierung (höchster Hebel, kleinster Sichtbar-Bruch).**
Eine semantische Token-Datei definieren (Light/Dark). `globals.css --color-*`, `theme.css --theme-*` und `tokens.ts`-Palette darauf zusammenführen; Tailwind-`colors` darauf mappen. Werte = Styleguide.

**Phase 2 – Theme-Mechanik vereinfachen.**
`themeManager` schreibt nur noch die eine Token-Gruppe. Blanket-Override-Blöcke in `globals.css` (Light-Mode-Patches, `html:not(.theme-light) …`) **entfernen**. Tote Schemata `high-contrast`/`colorblind` entfernen oder vollständig definieren.

**Phase 3 – Komponenten-Primitiven.**
Ein `Card`, ein `Surface`, ein `Eyebrow`, ein Button-Set – mit den Standard-Radien/Blur/Borders. 27 Hardcoded-Hex-Stellen auf Tokens umstellen.

**Phase 4 – Seiten angleichen.**
`accent-section`-Sonderlogik auflösen, Service-/Produkt-Heroes an Home-Hero-Logik angleichen, Pages durchgehen.

**Phase 5 – Verifikation.**
Build grün + visueller Vorher/Nachher-Vergleich pro Route (Light & Dark) per Screenshot, Kontrast-Check (WCAG AA) auf Text/Flächen-Paaren.

---

## Risiko / Hinweis

Phase 1+2 sind **invasiv** (sie berühren globale Dateien, von denen praktisch jede Seite abhängt) – aber genau deshalb der einzige nachhaltige Hebel. Empfehlung: auf eigenem Branch, mit Build- und Screenshot-Gate vor Merge. Der Home-Hero bleibt durchgängig unangetastet und dient als Kontroll-Referenz.
