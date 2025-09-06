# 🎨 **VAE Blog - Farbsystem & Styleguide**

## 📋 **Übersicht**

Dieses Farbsystem wurde speziell für eine VAE Blog-Website entwickelt und bietet vollständige Unterstützung für:

- **Light Mode**: Optimale Lesbarkeit bei hellem Hintergrund
- **Dark Mode**: Augenfreundliche dunkle Oberfläche
- **High Contrast Mode**: Maximale Zugänglichkeit für Sehbehinderte

## 🎯 **Farbphilosophie**

### **VAE Brand Colors**
- **Primary**: Türkis (#00ffa5) - Innovation & Technologie
- **Secondary**: Dunkelgrau - Professionalität & Seriosität

### **Accessibility First**
- **Kontrastverhältnis**: Minimum 4.5:1 für normalen Text
- **Farbblindheit**: Berücksichtigt alle Formen von Farbfehlsichtigkeit
- **High Contrast**: Zusätzliche Option für maximale Lesbarkeit

---

## 🌈 **Vollständige Farbpalette**

### **1. Brand Colors**
```css
/* Light Mode */
--color-brand-primary: hsl(157, 100%, 47%);   /* #00ffa5 */
--color-brand-secondary: hsl(0, 0%, 20%);     /* Dunkelgrau */

/* Dark Mode */
--color-brand-primary: hsl(157, 100%, 60%);   /* Heller Türkis */
--color-brand-secondary: hsl(0, 0%, 85%);     /* Hellgrau */

/* High Contrast Mode */
--color-brand-primary: hsl(157, 100%, 70%);   /* Sehr hell Türkis */
--color-brand-secondary: hsl(0, 0%, 95%);     /* Sehr hell grau */
```

### **2. Background Colors**
```css
/* Light Mode */
--color-bg-primary: hsl(0, 0%, 100%);       /* Reinweiß */
--color-bg-secondary: hsl(0, 0%, 98%);      /* Sehr hell grau */
--color-bg-tertiary: hsl(0, 0%, 96%);       /* Hell grau */
--color-bg-accent: hsl(157, 100%, 97%);     /* Hell türkis */

/* Dark Mode */
--color-bg-primary: hsl(0, 0%, 6%);         /* Sehr dunkel */
--color-bg-secondary: hsl(0, 0%, 10%);      /* Dunkel grau */
--color-bg-tertiary: hsl(0, 0%, 12%);       /* Mittel dunkel */
--color-bg-accent: hsl(157, 20%, 15%);      /* Subtil türkis */

/* High Contrast Mode */
--color-bg-primary: hsl(0, 0%, 0%);         /* Reines Schwarz */
--color-bg-secondary: hsl(0, 0%, 5%);       /* Sehr dunkel */
--color-bg-tertiary: hsl(0, 0%, 8%);        /* Dunkel */
--color-bg-accent: hsl(157, 30%, 20%);      /* Deutlicher türkis */
```

### **3. Text Colors**
```css
/* Light Mode */
--color-text-primary: hsl(0, 0%, 10%);      /* Sehr dunkel */
--color-text-secondary: hsl(0, 0%, 35%);    /* Mittel grau */
--color-text-tertiary: hsl(0, 0%, 55%);     /* Hell grau */
--color-text-muted: hsl(0, 0%, 70%);        /* Sehr hell grau */

/* Dark Mode */
--color-text-primary: hsl(0, 0%, 95%);      /* Sehr hell */
--color-text-secondary: hsl(0, 0%, 75%);    /* Hell grau */
--color-text-tertiary: hsl(0, 0%, 60%);     /* Mittel grau */
--color-text-muted: hsl(0, 0%, 50%);        /* Dunkel grau */

/* High Contrast Mode */
--color-text-primary: hsl(0, 0%, 100%);     /* Reines Weiß */
--color-text-secondary: hsl(0, 0%, 90%);    /* Sehr hell */
--color-text-tertiary: hsl(0, 0%, 80%);     /* Hell */
--color-text-muted: hsl(0, 0%, 70%);        /* Mittel hell */
```

### **4. Border Colors**
```css
/* Light Mode */
--color-border-light: hsl(0, 0%, 90%);      /* Hell grau */
--color-border-medium: hsl(0, 0%, 80%);     /* Mittel hell */
--color-border-dark: hsl(0, 0%, 60%);       /* Dunkel grau */

/* Dark Mode */
--color-border-light: hsl(0, 0%, 20%);      /* Dunkel grau */
--color-border-medium: hsl(0, 0%, 25%);     /* Mittel dunkel */
--color-border-dark: hsl(0, 0%, 35%);       /* Hell grau */

/* High Contrast Mode */
--color-border-light: hsl(0, 0%, 40%);      /* Mittel grau */
--color-border-medium: hsl(0, 0%, 50%);     /* Mittel */
--color-border-dark: hsl(0, 0%, 70%);       /* Hell */
```

### **5. Accent Colors (Semantic)**
```css
/* Success - Light/Dark/Contrast */
--color-accent-success: hsl(142, 76%, 36%)/hsl(142, 76%, 65%)/hsl(142, 76%, 75%);

/* Warning - Light/Dark/Contrast */
--color-accent-warning: hsl(38, 92%, 50%)/hsl(38, 92%, 60%)/hsl(38, 92%, 70%);

/* Error - Light/Dark/Contrast */
--color-accent-error: hsl(0, 84%, 60%)/hsl(0, 84%, 70%)/hsl(0, 84%, 80%);

/* Info - Light/Dark/Contrast */
--color-accent-info: hsl(199, 89%, 48%)/hsl(199, 89%, 60%)/hsl(199, 89%, 70%);
```

### **6. Interactive Colors**
```css
/* Hover States */
--color-interactive-hover: /* Brand-abhängig, angepasst pro Modus */

/* Active States */
--color-interactive-active: /* Dunkler als hover */

/* Focus States */
--color-interactive-focus: /* Mit gutem Kontrast */
```

### **7. Semantic Colors**
```css
/* Links */
--color-link: /* Blau-Töne für alle Modi */
--color-link-hover: /* Dunkler/heller je nach Modus */

/* Code */
--color-code: /* Dunkel für Light, hell für Dark */
--color-code-bg: /* Subtile Hintergründe */
```

---

## 🚀 **Implementierung**

### **1. CSS-Variablen Setup**
```css
:root {
  /* Alle Farbvariablen werden automatisch gesetzt */
}

[data-color-mode="dark"] {
  /* Dark Mode Überschreibungen */
}

[data-color-mode="contrast"] {
  /* High Contrast Überschreibungen */
}
```

### **2. JavaScript Integration**
```typescript
import { applyColorMode, toggleColorMode } from './colorSystem'

// Modus setzen
applyColorMode('dark')

// Toggle zwischen Light/Dark
toggleColorMode()

// High Contrast aktivieren
enableHighContrast()
```

### **3. React Hook**
```typescript
const useColorMode = () => {
  const [mode, setMode] = useState(getCurrentColorMode())

  const changeMode = (newMode) => {
    applyColorMode(newMode)
    setMode(newMode)
  }

  return { mode, changeMode }
}
```

---

## 📱 **Verwendung in Komponenten**

### **Blog Post Cards**
```css
.blog-card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-light);
  color: var(--color-text-primary);
}

.blog-card:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-interactive-hover);
}
```

### **Buttons**
```css
.btn-primary {
  background: var(--color-brand-primary);
  color: var(--color-bg-primary);
}

.btn-primary:hover {
  background: var(--color-interactive-hover);
}
```

### **Links**
```css
.link {
  color: var(--color-link);
}

.link:hover {
  color: var(--color-link-hover);
}
```

### **Code Blocks**
```css
.code {
  background: var(--color-code-bg);
  color: var(--color-code);
  border: 1px solid var(--color-border-medium);
}
```

---

## ♿ **Accessibility Richtlinien**

### **Kontrastverhältnisse**
- **Normaler Text**: Minimum 4.5:1
- **Großer Text**: Minimum 3:1
- **UI-Elemente**: Minimum 3:1

### **Farbblindheit**
- **Nicht nur Farbe** für Bedeutung verwenden
- **Icons + Text** kombinieren
- **Unterstreichungen** für Links

### **High Contrast Mode**
- **Automatische Aktivierung** bei Systemeinstellung
- **Manuelle Option** in Einstellungen
- **Testen** mit verschiedenen Browser-Tools

---

## 🛠️ **Entwicklungs-Tools**

### **Browser DevTools**
```javascript
// Farbmodus im Browser testen
document.documentElement.setAttribute('data-color-mode', 'dark')
```

### **Color Contrast Checker**
- Verwende Tools wie:
  - WebAIM Contrast Checker
  - Stark (Mac App)
  - Chrome DevTools

### **Farbblindheit-Simulation**
- Chrome DevTools: Rendering → Emulate vision deficiencies
- Online-Tools: Coblis, Color Oracle

---

## 📊 **Testing Checklist**

### **Light Mode**
- [ ] Alle Texte gut lesbar
- [ ] Kontrastverhältnisse ≥ 4.5:1
- [ ] Brand Colors deutlich sichtbar
- [ ] Hover/Active States funktionieren

### **Dark Mode**
- [ ] Kein Blaulicht-Filter nötig
- [ ] Texte gut lesbar
- [ ] Akkulaufzeit berücksichtigt
- [ ] System-Dark-Mode respektiert

### **High Contrast Mode**
- [ ] Alle Elemente deutlich sichtbar
- [ ] Keine grauen Texte
- [ ] Fokus-Indikatoren klar
- [ ] Icons + Text für Bedeutung

---

## 🎯 **Best Practices**

### **Do's**
- ✅ **CSS-Variablen** für alle Farben verwenden
- ✅ **Semantische Namen** für Variablen
- ✅ **Fallbacks** für ältere Browser
- ✅ **System-Prefs** respektieren
- ✅ **Testing** auf verschiedenen Geräten

### **Don'ts**
- ❌ **Hardcoded Hex-Werte** verwenden
- ❌ **Farbe allein** für Bedeutung
- ❌ **Niedrige Kontraste** akzeptieren
- ❌ **Blinkende Elemente** ohne Kontrolle
- ❌ **Autoplay-Videos** ohne Pause-Option

---

## 📞 **Support & Kontakt**

Bei Fragen zum Farbsystem:
- **Design Team**: design@vae-systems.com
- **Development**: dev@vae-systems.com
- **Accessibility**: a11y@vae-systems.com

**Letzte Aktualisierung**: September 2025
**Version**: 2.0
**WCAG Compliance**: AA
