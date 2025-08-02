# VAE Systems Website v2

Eine moderne, professionelle Website für VAE Systems, entwickelt mit React, TypeScript und Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + CSS Custom Properties  
- **Icons**: Material Symbols (Google Fonts)
- **Animationen**: Framer Motion + GSAP
- **Responsive Design**: Mobile-First Approach
- **Performance**: Optimierte Bundles und Code-Splitting

## 🎨 Design System

### Farbpalette
- **Hauptfarbe**: `#00ffa5` (VAE Türkis)
- **Hintergrund**: Schwarzgrau-Töne
- **Text**: Weiß mit Transparenzen
- **Akzente**: Türkis-Variationen

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 🛠️ Development

### Setup
```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Build für Produktion
npm run build

# Type Checking
npm run type-check
```

### Projekt-Struktur
```
src/
├── components/
│   ├── layout/          # Header, Footer, Navigation
│   ├── pages/           # Seiten-Komponenten
│   └── ui/              # Wiederverwendbare UI-Komponenten
├── styles/
│   └── globals.css      # Design System + Tailwind
├── assets/              # Bilder, Icons
└── types/               # TypeScript-Definitionen
```

### Design-Tokens
Das Design System verwendet CSS Custom Properties für einfache Anpassungen:

```css
:root {
  --color-vae-turquoise: 157 100% 47%;
  --spacing-md: 1rem;
  --radius-md: 0.375rem;
}
```

### Komponenten-Konventionen
- **React.FC** für alle Komponenten
- **Tailwind Classes** für Styling
- **Material Symbols** für Icons
- **TypeScript** für Type-Safety

## 🎯 Roadmap

### Phase 1: Fundament ✅
- [x] Projekt-Setup (Vite + React + TypeScript)
- [x] Design System (Tailwind + Custom Properties)
- [x] Basis-Layout (Header, Footer)
- [x] Homepage (Hero + Services Preview)

### Phase 2: Core Features
- [ ] Services-Seite
- [ ] About-Seite  
- [ ] Kontakt-Formulare
- [ ] Navigation zwischen Seiten

### Phase 3: Advanced Features
- [ ] GSAP-Animationen
- [ ] Scroll-Trigger-Effekte
- [ ] Performance-Optimierung
- [ ] SEO + Accessibility

### Phase 4: Specialized
- [ ] Blog-System (optional)
- [ ] Chatbot-Integration
- [ ] CMS-Integration

## 📋 Best Practices

- **Mobile-First**: Responsive Design von Grund auf
- **Performance**: Code-Splitting und Bundle-Optimierung  
- **Accessibility**: WCAG 2.1 Compliance
- **SEO**: Meta-Tags und strukturierte Daten
- **Type Safety**: Vollständige TypeScript-Abdeckung

## 🔧 Technologie-Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, CSS Custom Properties
- **Icons**: Material Symbols (Google Fonts)
- **Animationen**: Framer Motion, GSAP
- **Routing**: React Router DOM
- **Build**: Vite mit optimierten Rollup-Konfigurationen

---

**VAE Systems** - Innovative KI-Lösungen für die Zukunft
