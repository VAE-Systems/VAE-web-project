# VAE Web Project — AI Handover Briefing

## Projektüberblick

- **Ziel**: Marketing- und Produktseite für VAE Systems mit Fokus auf KI-Automatisierung (VAEKTRA CORE Ökosystem).
- **Tech-Stack**: React 18 + TypeScript, Vite, Tailwind CSS, Custom Design System (Tokens + Theme Manager), GSAP/Framer Motion optional, PWA-fähig mit Service Worker.
- **Struktur**: Komponenten in `src/components`, thematische Sektionen unter `src/components/sections`, Seitencontainer in `src/components/pages`, zentrale Konfiguration in `src/config`, geteilte Hooks/Utils unter `src/hooks` bzw. `src/lib`.
- **Deployment-Modell**: Static build via Vite, PWA-Metadaten in `public/manifest.json`, SEO-Metadaten in `src/components/Seo.tsx` und `index.html`.

## Aktueller Status (Oktober 2024)

1. **Neue Logos integriert**
   - Primäres Logo: `public/App_Logo_light.svg` (weiß, invertierungsfreundlich; identisch mit `dist/VAE_Logo_Vector.svg`).
   - Partnerlogo: `public/art-affair-logo.svg`, ebenfalls auf Weiß umgestellt.
   - Alle Referenzen (Header, Footer, Meta-Tags, Manifest, Service Worker, README) zeigen auf das neue Asset.
2. **Design System konsolidiert**
   - Tokens: `src/design-system/tokens.ts` (Farbpalette, Typografie, Spacing, Radius, Shadow, Transition).
   - Theme Manager: `src/design-system/themeManager.ts` setzt CSS Custom Properties + `data-theme-mode`.
   - Typografie-Hilfen: `src/design-system/typography.ts` exportiert `getTypographyStyle` + `isTypographyPreset`; nutzt Fallback auf Registry.
3. **Typografie (zusätzliche Utilities)**
   - Utility-Typen & Tailwind-Klassen: `src/types/typography.ts`, Styles in `src/styles/typography.css`.
4. **PWA & Meta**
   - Service Worker (`public/sw.js`) cached neues Logo.
   - Manifest (`public/manifest.json`) + `src/config/manifest.ts` aktuell, Icons verweisen auf SVG.
   - `index.html` OpenGraph/Twitter sowie Apple Touch Icons aktualisiert.
5. **Reports & Guidelines**
   - Architektur: `ARCHITECTURE.md`, Styleguide: `STYLEGUIDE.md`, Performance/Cleanup Reports vorhanden.

## Farb- und Typografie-Referenz

- **Primär**: `#00ffa5` (Turquoise) – siehe `colorSystem.ts`, `designTokens.ts`.
- **Light Theme Palette** (`src/design-system/tokens.ts`, Auszug):
  - Background `hsl(0 0% 98%)`, Surface `hsl(210 20% 96%)`, Text `hsl(220 47% 15%)`.
  - Akzente: Secondary `hsl(212 90% 56%)`, Accent `hsl(278 90% 60%)`.
- **Dark Theme Palette**:
  - Background `hsl(222 47% 6%)`, Surface `hsl(222 47% 8%)`, Text `hsl(215 25% 92%)`.
- **Typografische Presets** (`themeRegistry.typography`):
  - `display`, `headline`, `subheadline`, `body`, `bodySmall`, `label`, `mono` – jeweils mit FontFamily, FontSize (Clamp), LineHeight, Weight, LetterSpacing.
- **Utility-Klassen**: `text-{size}`, `font-{weight}`, `leading-{tight|normal|loose}`, `tracking-{...}` aus `src/styles/typography.css`.

## Wichtige Komponenten & Hooks

- **Layout**: `src/components/layout/Header.tsx`, `Footer.tsx` – nutzen neues Logo + Theme Toggle.
- **Hero / Landing**: `src/components/sections/HeroSection.tsx`, `ServicesHeroSection.tsx`, `ProductsHeroSection.tsx`.
- **Dynamic UI**: `src/components/ui/MagneticButton.tsx` (magnetische Interaktion), `FloatingElement.tsx`, `Reveal.tsx`.
- **State/Context**: `src/contexts/ThemeContext.tsx`, Hooks `useDesignSystem.ts`, `usePerformance.ts`, `useAccessibility.ts`, `useAdvancedAnimation.ts`.
- **SEO**: `src/components/Seo.tsx` + Page-spezifische metas in jeweiligen Seitenkomponenten.

## Offene Punkte / Beobachtungen

- **Design Review**: Neue Logo-Ästhetik evtl. an Tailwind-Klassen (Größe/Spacing) anpassen; `light-invert` Utility in `src/styles/globals.css` sorgt dafür, dass weiße Logos in Light Theme invertiert werden.
- **Typo-Redundanz**: Es existieren Legacy-Typografie-Dateien (`src/config/typography.ts`, `src/types/typography.ts`) parallel zu Design-System-Presets. Konsolidierung prüfen.
- **Dist-Ordner**: Enthält `dist/VAE_Logo_Vector.svg` (Quelle des Logos) – derzeit gespiegelt nach `public/App_Logo_light.svg`.
- **Build/Tests**: Keine automatisierten Tests nach den Logo-Änderungen gelaufen; empfohlen `npm run build` + E2E/Visual Check.

## Erwartete nächste Schritte für Folgebots (High Priority)

1. **Visuelle QA**: Prüfen, ob das neue Logo in allen Themes und Breakpoints korrekt wirkt (Größe, Kontrast, invert).
2. **Website-Überarbeitung**: Nutzer plant „Website sau(f)“ zu überarbeiten – Fokus vermutlich auf Layout, Texte, neue Sektionen. Vor Änderungen Nutzer- oder PM-Briefing einholen.
3. **Typografie & Tokens**: Verifizieren, ob Tokens & Tailwind-Klassen doppelt sind; ggf. vereinheitlichen und Dokumentation updaten.
4. **Asset-Clean-Up**: Entfernte Alt-Assets (LOGO_01_white.svg etc.) aus README/Docs/CI entfernen (README bereits angepasst).
5. **Tests/Builds**: Sicherstellen, dass `npm run build` und `npm run lint` sauber durchlaufen; Service Worker nach Build prüfen.

## Kontakthinweise

- Übergabepartner (User): `juliandini` fungiert als Schnittstelle.
- Dieses Dokument dient als Einstieg für eine weiterführende KI-Agentin, die eigenständige Architektur-/Feature-Anpassungen ausarbeiten soll.

> Bitte auf konsistente Nutzung der Design Tokens achten, insbesondere bei neuen Komponenten oder Animations-Features. Prüfe State-Management (Context + Hooks) auf Performance/Accessibility, bevor umfangreiche UI-Reworks beginnen.
