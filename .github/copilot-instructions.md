<!-- GitHub Copilot / AI agent instructions for vae-web-project -->

# Kurz-Anleitung für AI-Coding-Agenten

Dieses Projekt ist eine moderne React + TypeScript Website (Vite, Tailwind, Framer Motion, GSAP). Die folgenden Hinweise helfen dir, schnell produktiv zu werden und sich an projekt-spezifische Konventionen zu halten.

1. Schnellstart (Dev / Build / Tests)
   - Dev: `npm install` → `npm run dev` (Vite, Standard-Port 3000)
   - Build: `npm run build` (führt `tsc` + assets build + `vite build` aus)
   - Preview: `npm run preview`
   - Lint / Format: `npm run lint`, `npm run format`
   - Typecheck: `npm run type-check`
   - Storybook: `npm run storybook`
   - E2E: `npm run test:e2e` (Playwright)

2. Architektur — Big picture
   - Frontend-only monorepo für die Marketing-/Product-Site: React 18 + Vite + TypeScript.
   - Design tokens & Theme Manager leben in `src/design-system` (tokens, themeManager, typography).
   - Komponentenstruktur:
     - `src/components/layout` — Header, Footer, globale Navigation
     - `src/components/pages` / `src/pages` — Page-Container (Routing targets)
     - `src/components/sections` — große Inhaltsblöcke (Hero, Services, etc.)
     - `src/components/ui` — kleine, wiederverwendbare UI-Bausteine (Buttons, Inputs, Glossary)
   - Vite-Aliase: `@` → `src`, weitere Aliase: `@components`, `@styles`, `@design-system` (siehe `vite.config.ts`). Verwende diese Aliase in Imports.

3. Wichtige Patterns & Konventionen
   - Styling: Tailwind-Utility-First + CSS-Custom-Properties aus `design-system`.
   - Animation: Framer Motion + GSAP koexistieren; für UI-Transitions bevorzugt Framer Motion, komplexe Timeline-Animationen nutzen GSAP.
   - Datenfluss: Seiten tendieren dazu, lokale UI-Logik (z. B. Preis-/Rechner-Berechnungen) in der Page-Komponente zu halten. Wenn Logik wiederverwendbar ist, wurde sie in `src/hooks` oder `src/lib` ausgelagert.
   - Tutorial/Spotlight: Interaktive Tutorials nutzen selektoren / data-attributes (z. B. `data-calculator-tutorial`) und ein zentrales Overlay; sei vorsichtig mit direkten Inline-Style-Mutationen an DOM-Elementen.
   - Accessibility: Fokus-Management und `prefers-reduced-motion`-Handling sind relevant — prüfe `components` auf entsprechende Hints.

4. Files & dirs to inspect first (high value)
   - `src/design-system` — Theme tokens & usage examples
   - `src/components/ui` — reusable UI controls (MagneticButton, Glossary etc.)
   - `src/hooks` — reusable hooks (scroll, animation helpers)
   - `vite.config.ts` — path aliases, build chunking rules
   - `package.json` — scripts (dev, build, lint, storybook, e2e)
   - `playwright.config.ts` — e2e config

5. Recommended agent behaviors (do these first)
   - Preserve public APIs: when refactoring, keep component props / exported hook names stable where possible.
   - Small, focused PRs: prefer extracting a single utility or hook per change (e.g., `useSaaSCosts` or `number.utils`) rather than large page rewrites.
   - Use project aliases in imports (`@/…`) and match existing code style (Prettier + Tailwind plugin present).
   - Avoid changing design tokens or themeManager unless the change is explicitly requested — many components depend on CSS custom props.

6. Things to watch out for (gotchas)
   - Tutorial targeting is fragile: many tutorials rely on matching `data-*` selectors; renaming DOM attributes without updating configs will silently break flows.
   - Calculator logic is often implemented inline in pages. If you extract logic, add unit tests and keep the UI contract unchanged.
   - Inline DOM style mutations: overlays sometimes modify target element `style.position` — prefer adding/removing CSS classes when safe.

7. Examples (how to import / where to look)
   - Import a UI component: `import { MagneticButton } from '@/components/ui'`
   - Use design token helper: `import { getTypographyStyle } from '@design-system/typography'`

8. Tests & CI hints
   - Linting is strict (`--max-warnings 0`) — run `npm run lint` before PRs.
   - Typecheck is enforced in the build pipeline (`tsc --noEmit`).
   - E2E tests: Playwright is configured — run `npm run test:e2e` locally to validate critical flows.

9. When in doubt
   - Search the repo for `data-` selectors before renaming elements used by tutorials.
   - Prefer adding a small helper in `src/hooks` or `src/lib` rather than duplicating logic in pages.
   - If a change touches theme tokens or global CSS, run a visual check (`npm run dev`) and Storybook (`npm run storybook`).

10. VAE-Machine PDF Generation (separate workspace context)

- **Location:** `VAE-Machine/` folder (separate from main web project, sometimes opened standalone in VS Code)
- **Purpose:** HTML templates for PDF generation (Runbooks, Proposals, Service Sheets)
- **Tech Stack:** Paged.js (automatic pagination) + Pure CSS (no build step, browser-printable)
- **Rules:** Read `VAE-Machine/PDF_GENERATION_RULES.md` BEFORE creating/editing PDFs
- **Template:** Use `VAE-Machine/_templates/runbook/runbook-template.html` for new runbooks
- **Shared CSS (V2):** Use `VAE-Machine/_templates/shared/print-components.css` + `preview-wrapper.css`
- **Validation:** Run HTML in browser → Check Console (F12) for overflow warnings before exporting PDF
- **Export:** CMD+P (Chrome/Edge) with "Background Graphics" enabled OR Playwright script
- **Anti-Patterns to AVOID:**
  - Manual `.runbook-page` divs (Paged.js auto-paginates)
  - `position: absolute` for footers (use `@page` CSS instead)
    - Inline styles (use CSS custom properties from V2 shared tokens)
  - More than 4 sections with callouts per logical unit (overflow risk)
- **Content Limits:** Max ~217mm content height per page, max 4 callouts per section
- **Proof of Concept:** See `VAE-Machine/runbooks/sales/lead-process-paged-demo.html` for reference

---

Bitte Feedback: soll ich noch konkrete PR-Templates oder example-refs (Konstanten für tutorial-selectors) hinzufügen? Ich kann das File iterativ anpassen.
