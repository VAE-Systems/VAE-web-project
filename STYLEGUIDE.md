# Design System Styleguide

## Übersicht

Dieses Design-System stellt sicher, dass alle visuellen Elemente konsistent und proportional skalieren. Änderungen an der Textgröße oder anderen Design-Elementen wirken sich automatisch auf das gesamte System aus, ohne das Design zu zerstören.

## Zentrales Design-System

### Scale Factor
- **Basis**: 1.0 (Standardgröße)
- **Bereich**: 0.5 - 1.5 (50% bis 150% der Standardgröße)
- **Verwendung**: Alle Größen werden proportional skaliert

### Typografie-System

#### Verwendung der neuen Klassen
```tsx
// Statt hardcoded Werten:
<p className="text-lg">Text</p>

// Verwende Design-System-Klassen:
<p className="ds-text-lg">Text</p>
```

#### Verfügbare Größen
- `ds-text-xs` bis `ds-text-6xl`
- Alle verwenden responsive clamp()-Funktionen
- Automatische Skalierung mit dem Scale Factor

### Spacing-System

#### Verfügbare Spacing-Klassen
- `ds-p-xs` bis `ds-p-3xl` (Padding)
- `ds-m-xs` bis `ds-m-3xl` (Margin)
- Proportionale Skalierung mit dem Design-System

## Responsive Design

### Clamp-Funktionen
Alle Größen verwenden automatisch clamp()-Funktionen:
```
clamp(minimum, fluid, maximum)
```

**Beispiel für ds-text-base:**
```
clamp(1rem, 0.9rem + 0.3vw, 1.125rem)
```

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Verwendung im Code

### 1. Design-System initialisieren
```tsx
import './config/designSystem' // Wird automatisch in main.tsx geladen
```

### 2. Scale Factor ändern
```tsx
import { scaleDesignSystem } from './config/designSystem'

// 10% größer machen
scaleDesignSystem(1.1)

// Zurücksetzen
scaleDesignSystem(1.0)
```

### 3. CSS-Variablen verwenden
```css
.my-element {
  font-size: var(--ds-font-size-base);
  padding: var(--ds-spacing-base);
}
```

## Demo und Testing

### Design-System-Demo
Besuche `/design-system` um das System zu testen und anzupassen.

### Design-System-Controls
Ein schwebendes Control-Panel zum Testen verschiedener Scale Factors.

## Best Practices

### ✅ Do's
- Immer Design-System-Klassen verwenden
- Scale Factor für globale Änderungen nutzen
- Responsive clamp()-Funktionen respektieren
- Konsistente Spacing-Skalen einhalten

### ❌ Don'ts
- Harcoded Pixel-/Rem-Werte verwenden
- Einzelne Elemente manuell skalieren
- Media Queries für Typografie verwenden
- Inkonsistente Spacing-Werte verwenden

## Technische Details

### CSS-Variablen
- `--ds-font-size-*`: Typografie-Skalen
- `--ds-spacing-*`: Spacing-Skalen
- `--ds-scale-factor`: Aktueller Scale Factor

### JavaScript API
- `updateDesignSystem(scale)`: Scale Factor setzen
- `scaleDesignSystem(factor)`: Relativ skalieren
- `resetDesignSystem()`: Zurücksetzen
- `getCurrentScaleFactor()`: Aktuellen Wert abrufen

## Vorteile

1. **Konsistenz**: Alle Elemente skalieren proportional
2. **Wartbarkeit**: Zentrale Änderungen wirken global
3. **Responsive**: Automatische Anpassung an alle Bildschirmgrößen
4. **Performance**: Keine Media Queries nötig
5. **Flexibilität**: Einfache Anpassung des gesamten Designs
