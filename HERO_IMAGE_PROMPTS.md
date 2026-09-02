# KI-Bild-Prompts für VAE-Heros (Firefly / Google Imagen)

Ziel: lebendigere Heros, ohne die Marke zu verwässern. Alle Bilder folgen EINER visuellen Welt,
damit die Site wie aus einem Guss wirkt — dunkle Tiefe, Turquoise-Akzent (#00ffa5), Netz-/Infrastruktur-Motive.

## Basis-Stil (an jeden Prompt anhängen)

```
Style: cinematic dark tech photography meets abstract 3D render. Near-black background
(#050505 to #0a1410), single accent color: luminous mint-turquoise (#00ffa5) used sparingly
as glowing lines and light sources. Soft volumetric light, shallow depth of field,
premium minimalist composition with generous negative space on the left side for text.
Mood: calm, sovereign, precise – German engineering, not sci-fi spectacle.
No text, no logos, no people's faces in focus.
--ar 16:9, highest detail
```

**Negative Prompt (Firefly: „Ausschließen", Imagen: ans Ende):**
`neon cyberpunk, purple/blue color cast, lens flare kitsch, stock-photo people smiling at camera, text, watermark, cluttered composition, bright daylight`

---

## 1. Home / Souveränitäts-Treppe (Unterstützungsbild, optional)

> Abstract glass staircase of three wide steps ascending from left to right, each step glowing
> subtly stronger in mint-turquoise, the top step crowned by a small constellation of connected
> light nodes (neural network motif). Dark void background with faint network lines.
> Symbolism: step-by-step rise to digital independence. + Basis-Stil

## 2. Services → Infrastruktur / Setup

> Macro photograph of a pristine server rack bathed in deep shadow, one elegant stream of
> turquoise light flowing through fiber-optic cables like a calm river, condensation-free
> clean metal, extreme detail. Symbolism: power under control. + Basis-Stil

## 3. Services → Strategieberatung

> Top-down view of a dark architect's desk: a glowing turquoise blueprint of a network
> topology projected onto matte black paper, a hand with a pen at the edge of frame (no face),
> instruments laid out with Swiss precision. Symbolism: plan before build. + Basis-Stil

## 4. Services → Betreuung / Hosting

> A lighthouse made of thin turquoise light lines standing on a dark digital sea rendered
> as a subtle wireframe grid, steady beam sweeping, stars as data points. Symbolism:
> reliable operation, watchful guardianship. + Basis-Stil

## 5. Leadership („Die Köpfe hinter VAE Systems")

> Two empty modern chairs facing a large dark window overlooking a city at night, between
> them a holographic turquoise network sphere floating above a table, warm rim light.
> Symbolism: partnership and vision without showing faces. + Basis-Stil
> (Alternative: euer echtes Duo-Foto in BW behalten — Authentizität schlägt KI bei Team-Seiten.)

## 6. Blog-Listing

> An open book whose pages dissolve into flowing turquoise network lines and small glowing
> nodes drifting upward, on a dark desk, single soft light source. Symbolism: knowledge
> becoming infrastructure. + Basis-Stil

## 7. Blog-Artikel „Die Souveränitäts-Treppe"

> Minimalist 3D render: three floating dark glass platforms at ascending heights connected
> by a thin turquoise light path, tiny figure silhouette standing on the second platform
> looking up (no face). Symbolism: the journey, mid-way. + Basis-Stil

## 8. Blog-Artikel „Eigene KI im Unternehmen"

> A glowing turquoise brain made of fine network filaments inside a glass house model
> standing on a dark wooden table, the house windows softly lit. Symbolism: intelligence
> that stays in the house. + Basis-Stil

## 9. Blog-Artikel „Wann lohnt sich Self-Hosting"

> A precise balance scale rendered in dark metal: on one side a stack of glowing subscription
> cards, on the other a small solid server cube with turquoise core, perfectly balanced.
> Symbolism: honest weighing of options. + Basis-Stil

## 10. Referenzen / Social Proof

> A constellation of small turquoise light nodes over a dark map of the Rhine-Neckar region,
> connected by elegant thin lines, viewed from high above at night. Symbolism: a growing,
> connected network of real projects. + Basis-Stil

---

## Einbau-Spezifikation (für mich / den nächsten Arbeitsschritt)

| Punkt | Vorgabe |
|---|---|
| Format | 16:9, mind. 2400×1350 px erzeugen |
| Export | WebP (Qualität ~80), Ziel < 250 KB; PNG nur als Fallback |
| Ablage | `public/images/blog/` bzw. `public/images/heroes/`, sprechende Kebab-Case-Namen |
| Komposition | Negative Space links lassen — Text liegt links über dem Bild |
| Einbau | Immer unter dunklem Gradient-Overlay (Lesbarkeit), `loading="lazy"` außer above-the-fold |
| Blog | In `src/content/blog.ts` beim Artikel `heroImage: { src, alt }` setzen — Slot existiert schon |

**Rechtlich:** Firefly-Output ist kommerziell nutzbar; bei Google-Tools Lizenzbedingungen des
jeweiligen Modells prüfen. Keine erkennbaren realen Personen oder Marken generieren lassen.
