# VAE Systems – Corporate Identity & Design DNA

> **Vollständige Marken-DNA für VAE Systems**
> Farben, UI-Elemente, Typografie, Light/Dark Mode
> Stand: Dezember 2025

---

## 1. MARKENESSENZ

### Markenname & Claim

- **Firmierung:** VAE Systems UG (haftungsbeschränkt)
- **Marke:** VAE Systems
- **Domain:** vae.systems
- **Akronym:** VAE = **V**ersatile **A**I **E**nhanced

### Kernbotschaften

| Typ                     | Text                                                                | Kontext                    |
| ----------------------- | ------------------------------------------------------------------- | -------------------------- |
| **Primär-Claim (EN)**   | `Structure is strategy.`                                            | Header, Hero, Social Media |
| **Sekundär-Claim (EN)** | `Business efficiency through open source.`                          | Subtitle, Footer           |
| **Produktiv (DE)**      | `Arbeitsinfrastruktur, KI-Optimierung und Betreuung aus einer Hand` | Service-Beschreibungen     |

### Markenpersönlichkeit

- **Klar & direkt** – keine Marketing-Buzzwords
- **Fachlich, aber zugänglich** – Tech-Kompetenz ohne Fachjargon
- **Pragmatisch** – Substanz statt Hype
- **Ehrlich** – wenn etwas nicht passt, sagen wir das
- **Ownership-Culture** – Verantwortung statt Ausreden

---

## 2. FARBSYSTEM

### 2.1 Primärfarbe – VAE Turquoise

Die **VAE Turquoise** ist unsere Hauptmarkenfarbe und zentrale visuelle Identität.

| Variante       | HEX         | HSL                         | RGB                      | Verwendung                      |
| -------------- | ----------- | --------------------------- | ------------------------ | ------------------------------- |
| **Standard**   | `#00FFA5`   | `hsl(157, 100%, 50%)`       | `rgb(0, 255, 165)`       | Hauptakzent, CTAs, Links, Focus |
| **Dark**       | `#00B374`   | `hsl(157, 100%, 35%)`       | `rgb(0, 179, 116)`       | Hover-States, Active-States     |
| **Light**      | `#33FFBA`   | `hsl(157, 100%, 60%)`       | `rgb(51, 255, 186)`      | Highlights, Glows, Shadows      |
| **Opacity 50** | `#00FFA580` | `hsla(157, 100%, 50%, 0.5)` | `rgba(0, 255, 165, 0.5)` | Overlays, Borders               |
| **Opacity 30** | `#00FFA54D` | `hsla(157, 100%, 50%, 0.3)` | `rgba(0, 255, 165, 0.3)` | Subtle Highlights               |

**CSS Custom Property:**

```css
--color-vae-turquoise: 157 100% 50%;
/* Usage: hsl(var(--color-vae-turquoise) / <alpha-value>) */
```

---

### 2.2 Dark Mode Farbpalette (Standard)

Dark Mode ist **Default** für vae.systems.

#### Hintergründe

| Name                  | HEX       | HSL                  | Verwendung                          |
| --------------------- | --------- | -------------------- | ----------------------------------- |
| **VAE Black**         | `#050505` | `hsl(0, 0%, 2%)`     | Tiefster Hintergrund, Out-of-bounds |
| **Background Darker** | `#0A0A0A` | `hsl(0, 0%, 4%)`     | Primary Background (body)           |
| **Background Dark**   | `#141414` | `hsl(0, 0%, 8%)`     | Secondary Background (sections)     |
| **Surface**           | `#1A1A1A` | `hsl(222, 47%, 8%)`  | Cards, elevated content             |
| **Surface Muted**     | `#1F1F1F` | `hsl(222, 36%, 12%)` | Secondary surfaces, disabled states |

#### Text & Borders

| Name             | HEX       | HSL                  | Verwendung             |
| ---------------- | --------- | -------------------- | ---------------------- |
| **Text Primary** | `#F2F2F2` | `hsl(215, 25%, 92%)` | Headlines, Body        |
| **Text Muted**   | `#A3AEB8` | `hsl(216, 12%, 64%)` | Captions, Meta         |
| **Border**       | `#333333` | `hsl(220, 30%, 20%)` | Dividers, Card-Borders |
| **Divider**      | `#2E2E2E` | `hsl(220, 27%, 18%)` | Subtle Separators      |

#### Akzentfarben (Dark)

| Name              | HEX       | HSL                   | Verwendung             |
| ----------------- | --------- | --------------------- | ---------------------- |
| **Primary**       | `#00FFA5` | `hsl(157, 100%, 47%)` | CTAs, Links, Focus     |
| **Primary Muted** | `#00B374` | `hsl(157, 80%, 38%)`  | Hover, Active          |
| **Secondary**     | `#3B8DFF` | `hsl(212, 88%, 56%)`  | Info, Alternative CTAs |
| **Accent**        | `#D946EF` | `hsl(278, 96%, 62%)`  | Special Highlights     |
| **Success**       | `#22C55E` | `hsl(155, 85%, 45%)`  | Positive States        |
| **Warning**       | `#FFB020` | `hsl(40, 100%, 52%)`  | Caution States         |
| **Danger**        | `#EF4444` | `hsl(356, 95%, 60%)`  | Error States           |
| **Info**          | `#3B8DFF` | `hsl(210, 100%, 64%)` | Neutral Info           |

#### Schatten (Dark)

```css
--shadow-xs: 0 1px 2px rgba(15, 23, 42, 0.1);
--shadow-sm: 0 4px 8px rgba(15, 23, 42, 0.18);
--shadow-md: 0 8px 24px rgba(15, 23, 42, 0.16);
--shadow-lg: 0 20px 40px rgba(15, 23, 42, 0.18);
--shadow-inner: inset 0 1px 0 rgba(255, 255, 255, 0.08);
--shadow-glow: 0 0 24px rgba(0, 255, 165, 0.35);
```

---

### 2.3 Light Mode Farbpalette

Light Mode für Accessibility & User-Präferenzen.

#### Hintergründe

| Name              | HEX       | HSL                 | Verwendung                           |
| ----------------- | --------- | ------------------- | ------------------------------------ |
| **Background**    | `#F5F7F5` | `hsl(160, 8%, 97%)` | Primary Background (soft sage)       |
| **Surface**       | `#FFFFFF` | `hsl(0, 0%, 100%)`  | Cards, elevated content (pure white) |
| **Surface Muted** | `#E8EBE9` | `hsl(160, 6%, 91%)` | Secondary surfaces                   |
| **Off-White**     | `#FAFAFA` | `hsl(0, 0%, 98%)`   | Alternative Background               |

#### Text & Borders

| Name             | HEX       | HSL                  | Verwendung                    |
| ---------------- | --------- | -------------------- | ----------------------------- |
| **Text Primary** | `#1A2320` | `hsl(160, 14%, 13%)` | Headlines, Body (deep forest) |
| **Text Muted**   | `#394642` | `hsl(160, 9%, 25%)`  | Captions, Meta (slate gray)   |
| **Border**       | `#C5CCC8` | `hsl(160, 8%, 78%)`  | Dividers, Card-Borders        |
| **Divider**      | `#D8DDD9` | `hsl(160, 7%, 85%)`  | Subtle Separators             |

#### Akzentfarben (Light)

| Name              | HEX       | HSL                   | Verwendung              |
| ----------------- | --------- | --------------------- | ----------------------- |
| **Primary**       | `#1DB87A` | `hsl(157, 72%, 42%)`  | CTAs, Links (VAE Green) |
| **Primary Muted** | `#16A068` | `hsl(157, 72%, 36%)`  | Hover, Active           |
| **Secondary**     | `#0085FF` | `hsl(212, 100%, 50%)` | Info, Alternative CTAs  |
| **Accent**        | `#A500FF` | `hsl(278, 100%, 50%)` | Special Highlights      |
| **Success**       | `#1DB87A` | `hsl(155, 72%, 42%)`  | Positive States         |
| **Warning**       | `#FF8C00` | `hsl(38, 100%, 50%)`  | Caution States          |
| **Danger**        | `#DC2626` | `hsl(358, 80%, 52%)`  | Error States            |
| **Info**          | `#0085FF` | `hsl(210, 100%, 50%)` | Neutral Info            |

#### Schatten (Light)

```css
--shadow-xs: 0 1px 2px rgba(26, 35, 32, 0.08);
--shadow-sm: 0 2px 8px rgba(26, 35, 32, 0.12);
--shadow-md: 0 4px 16px rgba(26, 35, 32, 0.14);
--shadow-lg: 0 8px 32px rgba(26, 35, 32, 0.18);
--shadow-inner: inset 0 1px 0 rgba(255, 255, 255, 0.5);
--shadow-glow: 0 0 24px rgba(29, 184, 122, 0.25);
```

---

### 2.4 Tailwind Farb-Klassen

#### VAE Turquoise Opacity Scale

```css
vae-turquoise-50  /* 5% opacity */
vae-turquoise-100 /* 10% opacity */
vae-turquoise-200 /* 20% opacity */
vae-turquoise-300 /* 30% opacity */
vae-turquoise-400 /* 40% opacity */
vae-turquoise     /* 100% opacity (default) */
vae-turquoise-600 /* 60% opacity */
vae-turquoise-700 /* 70% opacity */
vae-turquoise-800 /* 80% opacity */
vae-turquoise-900 /* 90% opacity */
vae-turquoise-light /* Alias für 60% */
vae-turquoise-dark  /* Alias für 70% */
```

#### Theme-aware Klassen

```css
bg-dark          /* Theme background */
bg-darker        /* Deeper background */
bg-secondary     /* Secondary surfaces */
text-light       /* Primary text color */
text-muted       /* Muted text color */
text-secondary   /* Secondary text */
```

---

## 3. TYPOGRAFIE

### 3.1 Schriftfamilien

| Typ                   | Font               | Fallback                 | Verwendung               |
| --------------------- | ------------------ | ------------------------ | ------------------------ |
| **Primary Sans**      | **Geist**          | system-ui, -apple-system | Body, UI-Texte, Standard |
| **Display/Headlines** | **Space Grotesk**  | Geist, system-ui         | Headlines, Hero-Text     |
| **Monospace**         | **JetBrains Mono** | Consolas, monospace      | Code, Technical Content  |

**Font Loading:**

```css
--font-base: 'Geist', system-ui, sans-serif;
--font-display: 'Space Grotesk', 'Geist', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', Consolas, monospace;
```

---

### 3.2 Typografie-Skala

#### Display (Hero Headlines)

```css
font-family: Space Grotesk
font-size: clamp(2.75rem, 2.2vw + 1.5rem, 3.5rem)  /* 44px → 56px */
line-height: 1.1
font-weight: 600
letter-spacing: -0.02em
```

#### Headline (Section Headlines)

```css
font-family: Space Grotesk
font-size: clamp(2rem, 1.5vw + 1rem, 2.75rem)  /* 32px → 44px */
line-height: 1.15
font-weight: 600
letter-spacing: -0.015em
```

#### Subheadline

```css
font-family: Space Grotesk
font-size: clamp(1.375rem, 1vw + 1rem, 1.75rem)  /* 22px → 28px */
line-height: 1.2
font-weight: 500
letter-spacing: -0.01em
```

#### Body (Standard Text)

```css
font-family: Geist
font-size: 1rem  /* 16px */
line-height: 1.6
font-weight: 400
letter-spacing: -0.005em
```

#### Body Small

```css
font-family: Geist
font-size: 0.9375rem  /* 15px */
line-height: 1.55
font-weight: 400
letter-spacing: -0.003em
```

#### Label (Uppercase, Small)

```css
font-family: Geist
font-size: 0.8125rem  /* 13px */
line-height: 1.4
font-weight: 600
letter-spacing: 0.08em
text-transform: uppercase
```

#### Mono (Code)

```css
font-family: JetBrains Mono
font-size: 0.875rem  /* 14px */
line-height: 1.5
font-weight: 500
letter-spacing: 0.01em
```

---

### 3.3 Font Weights

| Weight       | Value | Verwendung                      |
| ------------ | ----- | ------------------------------- |
| **Regular**  | 400   | Body-Text, Fließtext            |
| **Medium**   | 500   | Subheadlines, wichtige Elemente |
| **Semibold** | 600   | Headlines, Buttons, Labels      |

---

## 4. UI-ELEMENTE

### 4.1 Buttons

#### Primary Button (CTA)

```css
/* Dark Mode */
background: #00FFA5 (vae-turquoise)
color: #0A0A0A (dark text on bright bg)
padding: 0.75rem 1.5rem (12px 24px)
border-radius: 10px (--ds-radius-md)
font-weight: 600
font-size: 1rem
transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1)

hover:
  background: #00B374
  box-shadow: 0 0 24px rgba(0, 255, 165, 0.35)
  transform: translateY(-2px)

/* Light Mode */
background: #1DB87A
color: #FFFFFF
hover:
  background: #16A068
  box-shadow: 0 0 24px rgba(29, 184, 122, 0.25)
```

#### Secondary Button

```css
/* Dark Mode */
background: transparent
border: 1.5px solid rgba(0, 255, 165, 0.3)
color: #00FFA5
padding: 0.75rem 1.5rem
border-radius: 10px

hover:
  border-color: #00FFA5
  background: rgba(0, 255, 165, 0.1)

/* Light Mode */
border: 1.5px solid rgba(29, 184, 122, 0.4)
color: #1DB87A
hover:
  border-color: #1DB87A
  background: rgba(29, 184, 122, 0.05)
```

#### Ghost Button

```css
background: transparent
border: none
color: var(--theme-text)
padding: 0.75rem 1.5rem

hover:
  background: var(--theme-surface-muted)
  color: var(--theme-primary)
```

---

### 4.2 Cards

#### Standard Card

```css
/* Dark Mode */
background: #1A1A1A (surface)
border: 1px solid #333333 (border)
border-radius: 14px (--ds-radius-lg)
padding: 2rem
box-shadow: 0 8px 24px rgba(15, 23, 42, 0.16)

hover:
  border-color: rgba(0, 255, 165, 0.3)
  transform: translateY(-4px)
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.24)

/* Light Mode */
background: #FFFFFF
border: 1px solid #C5CCC8
box-shadow: 0 4px 16px rgba(26, 35, 32, 0.14)

hover:
  border-color: rgba(29, 184, 122, 0.4)
  box-shadow: 0 8px 24px rgba(26, 35, 32, 0.18)
```

#### Highlighted Card (with accent)

```css
/* Dark Mode */
background: linear-gradient(135deg, #1A1A1A 0%, #1F1F1F 100%)
border: 1px solid rgba(0, 255, 165, 0.3)
border-radius: 14px
box-shadow: 0 0 24px rgba(0, 255, 165, 0.15)

/* Light Mode */
background: #FFFFFF
border: 1px solid rgba(29, 184, 122, 0.4)
box-shadow: 0 0 24px rgba(29, 184, 122, 0.12)
```

---

### 4.3 Form Elements

#### Input Field

```css
/* Dark Mode */
background: #141414
border: 1px solid #333333
color: #F2F2F2
padding: 0.75rem 1rem
border-radius: 10px

focus:
  border-color: #00FFA5
  box-shadow: 0 0 0 3px rgba(0, 255, 165, 0.15)
  outline: none

/* Light Mode */
background: #FFFFFF
border: 1px solid #C5CCC8
color: #1A2320

focus:
  border-color: #1DB87A
  box-shadow: 0 0 0 3px rgba(29, 184, 122, 0.15)
```

#### Textarea

```css
/* Same as Input, but: */
min-height: 120px
resize: vertical
```

#### Select / Dropdown

```css
/* Same as Input */
appearance: none
background-image: url("data:image/svg+xml,...") /* Custom arrow */
background-position: right 1rem center
background-repeat: no-repeat
padding-right: 2.5rem
```

---

### 4.4 Navigation

#### Header

```css
/* Dark Mode */
background: rgba(10, 10, 10, 0.8)
backdrop-filter: blur(12px)
border-bottom: 1px solid rgba(255, 255, 255, 0.1)
height: 4rem

/* Light Mode */
background: rgba(250, 250, 250, 0.8)
backdrop-filter: blur(12px)
border-bottom: 1px solid rgba(26, 35, 32, 0.1)
```

#### Navigation Links

```css
/* Dark Mode */
color: #A3AEB8 (text-muted)
font-size: 0.9375rem
font-weight: 500

hover:
  color: #00FFA5

active:
  color: #00FFA5
  border-bottom: 2px solid #00FFA5

/* Light Mode */
color: #394642
hover:
  color: #1DB87A
active:
  color: #1DB87A
  border-bottom: 2px solid #1DB87A
```

---

### 4.5 Icons & Badges

#### Icon Sizes

```css
xs: 1rem (16px)
sm: 1.25rem (20px)
md: 1.5rem (24px)
lg: 2rem (32px)
xl: 3rem (48px)
```

#### Badge

```css
/* Dark Mode */
background: rgba(0, 255, 165, 0.15)
color: #00FFA5
padding: 0.25rem 0.75rem
border-radius: 999px (full)
font-size: 0.8125rem
font-weight: 600

/* Light Mode */
background: rgba(29, 184, 122, 0.1)
color: #16A068
```

---

## 5. SPACING & LAYOUT

### 5.1 Spacing Scale

```css
xs:  0.25rem (4px)
sm:  0.5rem (8px)
md:  0.75rem (12px)
lg:  1rem (16px)
xl:  1.5rem (24px)
2xl: 2rem (32px)
3xl: 3rem (48px)
4xl: 4rem (64px)
5xl: 6rem (96px)
6xl: 8rem (128px)
```

### 5.2 Border Radius

```css
xs:   4px   (subtle rounding)
sm:   6px   (small elements)
md:   10px  (buttons, inputs)
lg:   14px  (cards)
xl:   18px  (large containers)
full: 999px (pills, badges)
```

### 5.3 Container

```css
max-width: 1200px
padding: 2rem (mobile), 3rem (desktop)
margin: 0 auto

Breakpoints:
sm:  640px
md:  768px
lg:  1024px
xl:  1200px
```

---

## 6. ANIMATIONEN & TRANSITIONS

### 6.1 Transition Presets

```css
--transition-default: all 0.28s cubic-bezier(0.4, 0, 0.2, 1) --transition-fast: all 0.18s cubic-bezier(0.4, 0, 0.2, 1)
  --transition-slow: all 0.45s cubic-bezier(0.33, 1, 0.68, 1);
```

### 6.2 Standard Animations

#### Fade In

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
animation: fadeIn 0.5s ease-in-out;
```

#### Slide Up

```css
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
animation: slideUp 0.5s ease-out;
```

#### Glow (Hover Effect)

```css
@keyframes glow {
  0% {
    box-shadow: 0 0 5px hsla(157, 100%, 47%, 0.5);
  }
  100% {
    box-shadow:
      0 0 20px hsla(157, 100%, 47%, 0.7),
      0 0 30px hsla(157, 100%, 47%, 0.5);
  }
}
animation: glow 2s ease-in-out infinite alternate;
```

---

## 7. ACCESSIBILITY & KONTRASTE

### 7.1 WCAG-Konformität

Alle Farbkombinationen erfüllen **WCAG 2.1 Level AA** (min. 4.5:1 für normalen Text, 3:1 für große Headlines).

#### Dark Mode – Kontraste

| Kombination                             | Kontrast | WCAG |
| --------------------------------------- | -------- | ---- |
| Text (#F2F2F2) auf Background (#0A0A0A) | 18.5:1   | AAA  |
| Text Muted (#A3AEB8) auf Background     | 8.2:1    | AAA  |
| Primary (#00FFA5) auf Background        | 12.1:1   | AAA  |

#### Light Mode – Kontraste

| Kombination                             | Kontrast | WCAG |
| --------------------------------------- | -------- | ---- |
| Text (#1A2320) auf Background (#F5F7F5) | 13.8:1   | AAA  |
| Text Muted (#394642) auf Background     | 8.5:1    | AAA  |
| Primary (#1DB87A) auf White (#FFFFFF)   | 3.2:1    | AA   |

### 7.2 Focus States

Alle interaktiven Elemente müssen sichtbare Focus-States haben:

```css
:focus-visible {
  outline: 2px solid var(--theme-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(var(--color-vae-turquoise) / 0.15);
}
```

### 7.3 Prefers Reduced Motion

Respektiere User-Präferenz für reduzierte Animationen:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. LOGO & ASSETS

### 8.1 Logo-Varianten

| Variante                 | Datei                | Verwendung                   |
| ------------------------ | -------------------- | ---------------------------- |
| **Full Logo (Dark BG)**  | `vae-logo-dark.svg`  | Header, Hero (Dark Mode)     |
| **Full Logo (Light BG)** | `vae-logo-light.svg` | Header, Hero (Light Mode)    |
| **Icon Only**            | `vae-icon.svg`       | Favicon, Social Media Avatar |
| **Wordmark**             | `vae-wordmark.svg`   | Alternative Header           |

### 8.2 Logo-Verwendung

#### Mindestgröße

- **Full Logo:** 120px Breite
- **Icon:** 32px × 32px

#### Schutzraum

Mindestens **0.5x Logo-Höhe** freier Raum um das Logo.

#### Farben

- **Dark Mode:** Logo in `#00FFA5` (VAE Turquoise) oder White (`#FFFFFF`)
- **Light Mode:** Logo in `#1DB87A` (VAE Green) oder Dark (`#1A2320`)

---

## 9. RESPONSIVE DESIGN

### 9.1 Breakpoints

```css
/* Mobile First */
sm:  640px   /* Tablet Portrait */
md:  768px   /* Tablet Landscape */
lg:  1024px  /* Desktop */
xl:  1200px  /* Large Desktop */
```

### 9.2 Responsive Typography

Alle Headlines nutzen `clamp()` für fluid scaling:

```css
/* Display */
font-size: clamp(2.75rem, 2.2vw + 1.5rem, 3.5rem);

/* Headline */
font-size: clamp(2rem, 1.5vw + 1rem, 2.75rem);

/* Subheadline */
font-size: clamp(1.375rem, 1vw + 1rem, 1.75rem);
```

### 9.3 Mobile Anpassungen

#### Spacing

```css
/* Desktop */
padding: 3rem;
gap: 2rem;

/* Mobile (< 768px) */
@media (max-width: 767px) {
  padding: 1.5rem;
  gap: 1rem;
}
```

#### Buttons

```css
/* Desktop */
padding: 0.75rem 1.5rem;

/* Mobile */
@media (max-width: 767px) {
  padding: 0.625rem 1.25rem;
  font-size: 0.9375rem;
}
```

---

## 10. ANWENDUNGSBEISPIELE

### 10.1 Hero Section

```jsx
<section className="flex min-h-screen items-center bg-bg-darker">
  <div className="container">
    <h1 className="text-display mb-4 text-text-light">Structure is strategy.</h1>
    <p className="text-subheadline mb-8 text-text-muted">Business efficiency through open source.</p>
    <button
      className="
      hover:shadow-glow transition-default
      rounded-md bg-vae-turquoise px-6
      py-3
      font-semibold
      text-vae-black
      hover:bg-vae-turquoise-dark
    "
    >
      Erstgespräch buchen
    </button>
  </div>
</section>
```

### 10.2 Service Card

```jsx
<div
  className="
  border-border
  transition-default rounded-lg
  border
  bg-bg-secondary
  p-8
  hover:-translate-y-1
  hover:border-vae-turquoise-300
"
>
  <h3 className="text-headline mb-4 text-text-light">Strategieberatung</h3>
  <p className="text-body mb-6 text-text-muted">Discovery, Architektur-Design, Roadmap</p>
  <a
    href="/leistungen/strategie"
    className="
    transition-fast
    font-semibold
    text-vae-turquoise
    hover:text-vae-turquoise-light
  "
  >
    Mehr erfahren →
  </a>
</div>
```

### 10.3 Form Input

```jsx
<input
  type="email"
  placeholder="name@firma.de"
  className="
    border-border
    transition-fast
    w-full rounded-md
    border
    bg-bg-dark px-4
    py-3
    text-text-light
    focus:border-vae-turquoise
    focus:shadow-[0_0_0_3px_rgba(0,255,165,0.15)]
    focus:outline-none
  "
/>
```

---

## 11. IMPLEMENTIERUNGS-CHECKLISTE

### Design System Setup

- [ ] Fonts geladen (Geist, Space Grotesk, JetBrains Mono)
- [ ] CSS Custom Properties in `:root` definiert
- [ ] Tailwind Config mit VAE-Farben erweitert
- [ ] Dark/Light Mode Toggle implementiert
- [ ] Theme Manager aktiv

### UI-Komponenten

- [ ] Button-Varianten (Primary, Secondary, Ghost)
- [ ] Card-Komponenten (Standard, Highlighted)
- [ ] Form-Elemente (Input, Textarea, Select)
- [ ] Navigation (Header, Footer, Links)
- [ ] Badges & Icons

### Accessibility

- [ ] WCAG AA Kontraste geprüft
- [ ] Focus States auf allen interaktiven Elementen
- [ ] `prefers-reduced-motion` respektiert
- [ ] Alt-Texte für alle Bilder
- [ ] Semantic HTML

### Performance

- [ ] Font-Loading optimiert (font-display: swap)
- [ ] Critical CSS inline
- [ ] Lazy Loading für Images
- [ ] Animations mit `will-change` optimiert

---

## 12. TOOLS & RESSOURCEN

### Design Tools

- **Figma:** Für UI-Design & Prototyping
- **Realtime Colors:** Farbpaletten testen (realtimecolors.com)
- **Coolors:** Farbharmonien generieren (coolors.co)

### Accessibility Checks

- **WebAIM Contrast Checker:** Kontraste prüfen
- **axe DevTools:** Accessibility-Tests (Browser-Extension)
- **Lighthouse:** Performance & A11y Audit

### Code

- **Tailwind CSS:** v3.4+ (Utility-First)
- **CSS Custom Properties:** Browser-native Theming
- **TypeScript:** Type-sichere Design Tokens

---

## 13. ÄNDERUNGSVERLAUF

| Datum      | Version | Änderungen                                |
| ---------- | ------- | ----------------------------------------- |
| 27.12.2025 | 1.0     | Initiale Corporate Identity Dokumentation |

---

**Kontakt bei Fragen:**
Julian Görtz – juliangoertz@vae.systems
VAE Systems UG (haftungsbeschränkt)
vae.systems
