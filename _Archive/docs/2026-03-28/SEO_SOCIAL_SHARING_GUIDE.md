# 🚀 SEO & Social Sharing Guide – VAE Systems

**Datum:** 22. Dezember 2025
**Status:** ✅ Aktiv

---

## 📱 Open Graph Tags – WAS GERADE AKTIV IST

### Global Tags (in `index.html`)

```html
<meta property="og:title" content="VAE Systems - KI-Lösungen für Datensouveränität" />
<meta
  property="og:description"
  content="Strategische Beratung, Open-Source-Infrastruktur & KI-Workflow-Automatisierung. DSGVO-konform, selbstgehostet."
/>
<meta property="og:image" content="https://vae.systems/App_Logo_light.svg" />
<meta property="og:url" content="https://vae.systems" />
<meta property="og:type" content="website" />

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="VAE Systems - KI & Open Source" />
<meta
  name="twitter:description"
  content="Pragmatische KI-Lösungen für deutsche Unternehmen. Self-Hosted, DSGVO-konform, ohne Vendor-Lock-in."
/>
<meta name="twitter:image" content="https://vae.systems/App_Logo_light.svg" />
```

### Was das macht:

- 📲 **LinkedIn:** Nice Preview beim Teilen des Links
- 💬 **WhatsApp:** Titel + Bild + Beschreibung
- 🐦 **Twitter/X:** Card-Preview statt nur Link
- 📘 **Facebook:** Rich Preview

---

## 🤖 KI-SCHUTZ – WAS BLOCKIERT IST

### In `robots.txt`:

```
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Googlebot-Extended
Disallow: /
```

### In `index.html` Meta-Tags:

```html
<meta name="robots" content="..., noai, noimageai" /> <meta name="ai-content-rewriting" content="forbidden" />
```

### Was das bewirkt:

- ✅ **Google:** Kann normal indexieren
- ❌ **ChatGPT, Claude:** Können nicht crawlen
- ❌ **Image Training:** Blockiert
- ⚠️ **Nicht 100% sicher:** Illegale Scraper ignorieren das
- ✅ **Aber:** Macht es schwerer / weniger einfach

---

## 📊 SEO STATUS

| Komponente       | Status | Impact                  |
| ---------------- | ------ | ----------------------- |
| Meta Description | ✅     | Google Snippets         |
| Open Graph Tags  | ✅     | Social Media Sharing    |
| Twitter Cards    | ✅     | Twitter/X Preview       |
| robots.txt       | ✅     | Crawler Control         |
| sitemap.xml      | ✅     | Search Engine Discovery |
| KI-Blockade      | ✅     | Content Protection      |
| Canonical URLs   | ❓     | (Pro Seite needed)      |
| Schema.org Data  | ❌     | (Später: Rich Snippets) |

---

## 🎯 PRO-SEITEN META-TAGS (FÜR SPÄTER)

Falls ihr später unterschiedliche Meta-Tags pro Seite wollt:

### Beispiel: /leistungen/strategie

```html
<meta property="og:title" content="Strategieberatung - VAE Systems" />
<meta
  property="og:description"
  content="KI-Roadmap, Workflow-Optimierung, Architektur-Design für deutsche Unternehmen."
/>
<meta property="og:image" content="https://vae.systems/og-strategie.png" />
```

**So geht das in React:**

```typescript
// src/hooks/useMetaTags.ts
export const useMetaTags = (title: string, description: string, image: string) => {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', image)
  }, [title, description, image])
}

// In jeder Page:
useMetaTags(
  'Strategieberatung - VAE Systems',
  'KI-Roadmap für deutsche Unternehmen...',
  'https://vae.systems/og-strategie.png'
)
```

---

## 🔒 DESIGN-SCHUTZ – WAS MÖGLICH IST

### Level 1: Grundschutz (kostenlos, aktiv)

- ✅ CSS/JS Minification (tut euer Build eh)
- ✅ Copyright-Notice im Footer
- ✅ Terms of Service mit "Keine Vervielfältigung"

### Level 2: Mittlerer Schutz (einfach)

- ⚠️ Watermarks auf kritischen Images
- ⚠️ `right-click: disabled` (nervt aber User)
- ⚠️ CSS Obfuscation

### Level 3: Rechtlicher Schutz (wichtig)

- ✅ Registrierung: eures Designs bei DPMA/EUIPO
- ✅ Copyright-Vermerk: © 2025 VAE Systems
- ✅ Rechtliche Abmahnung bei Diebstahl

**Realität:**

- HTML/CSS lässt sich immer inspizieren (DevTools)
- Designs lassen sich immer screenshotten
- **Best Defense:** Rechtliches Setup + schnelle Legal Action

**Empfehlung:** Footer-Copyright + Terms of Service. Das reicht für 95% der Fälle.

---

## 📈 ANALYTICS – SELBSTGEHOSTET (SPÄTER)

Wenn ihr bereit seid, **Umami Analytics** selbst zu hosten:

```html
<!-- In <head> -->
<script async src="https://YOUR_SERVER/script.js" data-website-id="YOUR_ID"></script>
```

**Umami Docker Setup:**

```bash
docker run -d \
  -e DATABASE_URL=postgresql://user:password@db:5432/umami \
  -e APP_SECRET=your-secret \
  -p 3001:3000 \
  umami:latest
```

- ✅ Open Source
- ✅ DSGVO-konform (auf eurem Server)
- ✅ Kostenlos
- ✅ Keine externen Tracker

---

## ✅ NÄCHSTE SCHRITTE

1. ✅ **Jetzt:** robots.txt + Open Graph Tags sind live
2. 📅 **Später:** Meta-Tags pro Seite (React Hook)
3. 📅 **Später:** Umami Analytics selbst hosten
4. 📅 **Optional:** Design-Watermarks + rechtlicher Schutz

---

## 🔗 TESTING TOOLS

### Open Graph Tester

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### Twitter Card Tester

- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### General SEO

- [Google Search Console](https://search.google.com/search-console)
- [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider/)

---

**Fragen?** → Sag Bescheid, dann machen wir weitere Optimierungen! 🚀
