# VAE Design System v3.0 — Verbindliche Spezifikation

Dieses Dokument definiert die einzigen gültigen Design-Entscheidungen für vae-systems.com. Jede Abweichung bedarf expliziter Begründung.

---

## 1. Radius-System (verbindlich)

Nur diese 4 Werte sind erlaubt:

| Token          | Wert   | Verwendung                                       | Beispiele                             |
| -------------- | ------ | ------------------------------------------------ | ------------------------------------- |
| `rounded-full` | 9999px | Navigation, Actions, Badges, Filter              | `.nav-link`, `.badge`, Status-Chips   |
| `rounded-xl`   | 12px   | Cards, Panels, Buttons, Form-Container           | `.card-vae`, `.btn-primary`, Modals   |
| `rounded-lg`   | 8px    | Icons in Cards, kleine Elemente                  | `.dropdown-card__icon`, Feature-Icons |
| `rounded-none` | 0      | Editorial-Bilder, Artikel-Container, Trennlinien | Hero-Bilder, Case-Study-Photos        |

**Anti-Patterns (verboten):**

- `rounded-md` (10px) – weder Token noch konsistent
- `rounded-2xl` (16px) – zu nah an xl, verwirrt
- `rounded-sm` (4px) – zu subtil, nicht im System
- Hardcoded `border-radius` in px/rem – immer Tokens verwenden

---

## 2. Typografie-Skala (fluid)

```css
/* Nur diese Clamp-Werte erlaubt */
--text-hero: clamp(2.5rem, 5vw + 1rem, 4.5rem); /* H1 Hero */
--text-headline: clamp(1.75rem, 3vw + 0.5rem, 3rem); /* H2 Section */
--text-subhead: clamp(1.25rem, 2vw + 0.25rem, 2rem); /* H3 Card-Title */
--text-body: clamp(1rem, 1vw + 0.5rem, 1.125rem); /* Body */
--text-small: clamp(0.875rem, 0.5vw + 0.5rem, 1rem); /* Caption, Meta */
```

**Regeln:**

- Nie `font-size` in px hardcoden
- Nie mehr als 5 Schriftgrößen pro Seite
- Editorial: Geist 400–600
- UI/Buttons: Geist 500–700

---

## 3. Farb-Hierarchie (Theme-aware)

### Dark Mode (Default)

```css
--bg-primary: hsl(0 0% 8%); /* Haupt-Background */
--bg-secondary: hsl(0 0% 12%); /* Elevated Cards */
--text-primary: hsl(0 0% 95%); /* Headlines */
--text-secondary: hsl(0 0% 75%); /* Body */
--brand: hsl(157 100% 47%); /* VAE-Türkis */
```

### Light Mode

```css
--bg-primary: #f4f1ec; /* Warmes Linen */
--bg-secondary: #ece8e0; /* Sandstone */
--text-primary: #111110; /* Ink Black */
--text-secondary: #5a5754; /* Ink Medium */
--brand: hsl(157 85% 30%); /* Dunkleres Türkis für Kontrast */
```

**Regeln:**

- Keine reinen Schwarz/Weiß-Werte (`#000`, `#fff`)
- Keine Graustufen ohne Wärme/Kühle-Definition
- Brand-Color nur für Actions, nie für große Flächen

---

## 4. Spacing-System (8px-Grid)

| Token      | Wert | Verwendung                    |
| ---------- | ---- | ----------------------------- |
| `space-1`  | 4px  | Icon-Padding, kleine Gaps     |
| `space-2`  | 8px  | Inline-Spacing, Tight-Gaps    |
| `space-3`  | 12px | Button-Padding, Card-Gap      |
| `space-4`  | 16px | Standard-Section-Padding      |
| `space-6`  | 24px | Card-Padding, Gruppen-Abstand |
| `space-8`  | 32px | Section-Gaps, große Cards     |
| `space-12` | 48px | Hero-Padding, Major-Sections  |
| `space-16` | 64px | Page-Breaks, große Abstände   |

**Regeln:**

- Nie 20px, 28px, 36px (nicht im Grid)
- Vertical Rhythm: Vielfache von 8px
- Section-Padding: Mindestens `space-12` (48px)

---

## 5. Schatten & Effekte

### Nur diese 3 Shadow-Levels:

```css
/* Level 1: Subtil (Cards default) */
shadow-card: 0 4px 16px -4px rgba(0, 0, 0, 0.08);

/* Level 2: Elevated (Hover, Dropdowns) */
shadow-elevated: 0 8px 32px -8px rgba(0, 0, 0, 0.12);

/* Level 3: Modal, Overlays */
shadow-modal: 0 24px 64px -24px rgba(0, 0, 0, 0.24);

/* Brand-Glow (nur für Focus/Active) */
glow-brand: 0 0 20px hsla(var(--brand), 0.4);
```

**Regeln:**

- Keine mehrfachen Schatten (nur eine Ebene)
- Keine farbigen Schatten außer Brand-Glow
- Backdrop-Blur nur für Overlays: `blur(20px)`

---

## 6. Layout-Grid

```css
/* Container */
container-max: 1280px;   /* 7xl */
container-reading: 768px; /* 3xl — Text-Content */
container-form: 480px;    /* Formulare, schmale Panels */

/* Columns */
grid-12: 12 Spalten, 24px Gap
grid-4: 4 Spalten, 16px Gap (Cards, Features)

/* Breakpoints */
sm: 640px   /* Mobile Landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Wide Desktop */
```

---

## 7. Animation-Regeln

### Nur diese 3 Timing-Funktionen:

```css
--ease-default: cubic-bezier(0.16, 1, 0.3, 1); /* Standard */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful */
--ease-linear: linear; /* Continuous */
```

### Durations:

| Kontext                  | Dauer   |
| ------------------------ | ------- |
| Hover-States             | 200ms   |
| Transitions              | 300ms   |
| Page-Transitions         | 400ms   |
| Continuous (Pulse, etc.) | 2000ms+ |

**Verboten:**

- Keine Animationen > 500ms für UI-Feedback
- Kein `animation-delay` > 100ms (fühlt sich broken an)
- Keine Layout-Animations (width, height, top, left)

---

## 8. Komponenten-Spezifikationen

### Button-System

```
PRIMARY (CTA)
├── Radius: rounded-xl (12px)
├── Padding: space-3 x space-6 (12px 24px)
├── Font: Geist 600, 1rem
└── Shadow: shadow-card (default), shadow-elevated (hover)

SECONDARY (Outline)
├── Radius: rounded-xl (12px)
├── Border: 2px solid brand
└── Background: transparent (default), brand/10 (hover)

GHOST (Subtle)
├── Radius: rounded-lg (8px)
├── Border: 1px solid text-secondary/20
└── Kein Shadow
```

### Card-System

```
DEFAULT CARD
├── Radius: rounded-xl (12px)
├── Padding: space-6 (24px)
├── Background: bg-secondary
└── Border: 1px solid transparent (default), brand/20 (hover)

DROPDOWN CARD
├── Radius: rounded-xl (12px)
├── Padding: space-4 (16px)
├── Background: bg-primary/95 + backdrop-blur
└── Shadow: shadow-modal
```

---

## 9. Seiten-Templates (verbindlich)

Jede Seite folgt diesem Aufbau:

```
Page
├── SEO-Header (Canonical, Meta, JSON-LD)
├── Header (Navigation)
├── HeroSection
│   ├── Headline (text-hero)
│   ├── Subline (text-body, max 2 Zeilen)
│   └── CTA-Group (max 2 Buttons)
├── ContentSections (1–4)
│   └── Jede Section: Headline + Content + Optional Visual
├── FinalCtaSection (immer vor Footer)
└── Footer
```

**Regeln:**

- Maximal 4 Content-Sections pro Seite (Cognitive Load)
- Jede Section muss eigenständig verständlich sein (Scroll-Stop-Test)
- Keine Section ohne entweder Visual oder CTA

---

## 10. Quality-Gates (Pre-Deploy)

Jede Änderung muss diese Checks bestehen:

- [ ] Lighthouse Score ≥ 90 (Performance, Accessibility, Best Practices)
- [ ] Keine Kontrast-Fehler (WCAG AA)
- [ ] Keine `console.error` im Production-Build
- [ ] Keine 404s bei internen Links
- [ ] Meta-Tags vollständig (Title 50–60 Zeichen, Description 150–160)
- [ ] Canonical-URL gesetzt
- [ ] Alt-Text bei allen Bildern
- [ ] Mobile: Touch-Targets ≥ 44px
- [ ] Reduced Motion respektiert (`prefers-reduced-motion`)

---

## Anwendung

1. **Bei jedem neuen Feature:** Dieses Dokument checken
2. **Bei Code-Review:** Abweichungen markieren
3. **Bei Unsicherheit:** Hier nachschlagen, nicht raten
4. **Bei neuem Design-Pattern:** Hier dokumentieren, nicht in Kommentaren

**Version:** 3.0 — Stand 28.03.2026  
**Branch:** `vae-consulting-redesign`  
**Nächste Review:** Nach Fertigstellung jeder Seite
