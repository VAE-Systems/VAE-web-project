# 🚀 VAE Systems Website - Modern Rebuild

<div align="center">
  <img src="public/LOGO_01_white.svg" alt="VAE Systems Logo" width="200"/>
  
  **Enterprise-grade KI-Lösungen für maximale Effizienz und Datensouveränität**
  
  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.15-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

## ✨ Features

### 🎨 **Modern Design System**
- **VAE Corporate Identity** - Authentic turquoise branding (`#00ffa5`)
- **Glassmorphism Effects** - Modern translucent UI elements
- **Responsive Design** - Mobile-first approach for all devices
- **Dark Theme** - Professional dark mode with accent colors

### 🏗️ **Technical Architecture**
- **React 18** - Latest React with concurrent features
- **TypeScript** - Strict type safety and better DX
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Material Symbols** - Google's latest icon system
- **Framer Motion** - Smooth animations and transitions
- **GSAP** - Professional-grade animation library

### 📱 **Components & Sections**

#### 🎯 **Hero Section**
- Typewriter effect with VAE branding
- Network visualization with animated connections
- Professional trust indicators
- Direct contact integration

#### 🛠️ **Services Portfolio**
1. **Open Source Consulting** - Transparente Lösungen ohne Vendor-Lock-ins
2. **Setup & Training** - Umfassende Implementierung und Schulungen
3. **Startup Tech Stack** - Kosteneffiziente, skalierbare Infrastruktur
4. **KI-Beratung & Integration** - Lokale AI-Modelle und Workflow-Engines
5. **Local Hosting Solutions** - Container-Orchestrierung mit Docker/Kubernetes
6. **VAEKTRA CORE Enterprise** - All-in-One Enterprise-Lösung (Coming Q1 2026)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/vae-web-project.git
cd vae-web-project

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
vae-web-project/
├── 📁 public/                  # Static assets
│   ├── LOGO_01_white.svg      # VAE logo variants
│   ├── LOGO_02.svg
│   └── logo.svg
├── 📁 src/
│   ├── 📄 App.tsx              # Main application component
│   ├── 📄 main.tsx             # Application entry point
│   ├── 📁 components/
│   │   ├── 📁 layout/
│   │   │   ├── Header.tsx      # Navigation header
│   │   │   └── Footer.tsx      # Site footer
│   │   ├── 📁 pages/
│   │   │   └── HomePage.tsx    # Main landing page
│   │   └── 📁 sections/
│   │       ├── HeroSection.tsx     # Hero with animations
│   │       └── ServicesSection.tsx # Service portfolio
│   └── 📁 styles/
│       └── globals.css         # Design system & custom styles
├── 📄 tailwind.config.js       # Tailwind configuration
├── 📄 vite.config.ts          # Vite build configuration
└── 📄 tsconfig.json           # TypeScript configuration
```

## 🎨 Design System

### Colors
```css
--vae-turquoise: #00ffa5        /* Primary brand color */
--vae-turquoise-dark: #00cc84   /* Darker variant */
--vae-turquoise-light: #33ffb8  /* Lighter variant */
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Responsive Scale**: 14px → 96px
- **Font Weights**: 400, 500, 600, 700

## 📞 Contact

**VAE Systems**
- Email: info@vae.systems
- Website: [vae.systems](https://vae.systems)

---

<div align="center">
  <p><strong>Built with ❤️ by VAE Systems</strong></p>
  <p><em>VERSATILE AI/ENHANCED/SYSTEMS_</em></p>
</div>

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
