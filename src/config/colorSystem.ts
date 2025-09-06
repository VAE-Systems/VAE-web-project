/**
 * VAE Blog - Vollständiges Farbsystem
 * ===================================
 *
 * Umfassende Farbpalette für Light, Dark und High Contrast Modi
 * Optimiert für Blog-Inhalte, Lesbarkeit und Accessibility
 *
 * DESIGN-PHILOSOPHIE:
 * ===================
 *
 * Dieses Farbsystem wurde speziell für den VAE Blog entwickelt, um eine kohärente
 * und zugängliche Benutzererfahrung zu gewährleisten. Die Farben sind so gewählt,
 * dass sie die Markenidentität von VAE (Vollständige Automatisierte Erfassung)
 * widerspiegeln und gleichzeitig eine hohe Lesbarkeit für Blog-Inhalte bieten.
 *
 * SCHLÜSSELPRINZIPIEN: 
 * - Türkis als Brand-Farbe: Symbolisiert Innovation und Technologie, wie sie in
 *   der VAE-Methodik verwendet wird.
 * - Grautöne für Neutralität: Ermöglichen eine ruhige, lesefreundliche Umgebung
 *   für Text-lastige Inhalte.
 * - Drei Modi: Light für helle Umgebungen, Dark für nächtliche Nutzung,
 *   Contrast für Benutzer mit Sehbehinderungen.
 * - Konsistente Karten-Styles: Alle Karten (z.B. Blog-Posts, Testimonials,
 *   Service-Karten) verwenden dieselben Hintergrund- und Rahmenfarben für
 *   visuelle Einheitlichkeit.
 *
 * FARBAUSWAHL BEGRÜNDUNG:
 * =======================
 *
 * - Brand Primary (Türkis): HSL(157, 100%, 47%) - Ein lebendiges, aber nicht
 *   zu grelles Türkis, das Vertrauen und Modernität ausstrahlt.
 * - Textfarben: Hochkontrast für Lesbarkeit, mit abgestuften Grautönen für
 *   Hierarchie (primary > secondary > tertiary > muted).
 * - Hintergründe: Subtile Abstufungen für Tiefe ohne Ablenkung.
 * - Akzentfarben: Standard-Semantik (Grün für Erfolg, Orange für Warnung,
 *   Rot für Fehler, Blau für Info) für intuitive Benutzerführung.
 *
 * VERWENDUNG IN KARTEN:
 * =====================
 *
 * Karten-Styles sollten folgende Farben verwenden:
 * - Hintergrund: background.secondary oder background.tertiary
 * - Rahmen: border.light
 * - Text: text.primary für Titel, text.secondary für Beschreibungen
 * - Hover-Effekte: background.accent für subtile Hervorhebung
 *
 * Dies stellt sicher, dass alle Karten auf der Website einheitlich aussehen
 * und das Gesamtdesign unterstützen.
 */

export const VAE_COLOR_SYSTEM = {
  // === BRAND COLORS ===
  // Diese Farben repräsentieren die VAE-Marke und werden für primäre Elemente
  // wie Buttons, Links und Akzenten verwendet. Türkis steht für Innovation
  // und technologischen Fortschritt, wie in der VAE-Methodik.
  brand: {
    primary: {
      light: 'hsl(157, 100%, 47%)',    // #00ffa5 - VAE Türkis, lebendig und vertrauensvoll
      dark: 'hsl(157, 100%, 60%)',     // Heller für Dark Mode, um Sichtbarkeit zu erhalten
      contrast: 'hsl(157, 100%, 70%)'  // Noch heller für maximale Kontrastierung
    },
    secondary: {
      light: 'hsl(0, 0%, 20%)',        // Dunkelgrau für Light Mode
      dark: 'hsl(0, 0%, 85%)',         // Hellgrau für Dark Mode
      contrast: 'hsl(0, 0%, 95%)'      // Sehr hell für High Contrast
    }
  },

  // === BACKGROUND COLORS ===
  // Hintergründe sind subtil abgestuft, um Tiefe zu schaffen ohne vom Inhalt
  // abzulenken. Primary für Hauptbereiche, Secondary für Karten und Abschnitte,
  // Tertiary für eingebettete Elemente, Accent für subtile Hervorhebungen.
  background: {
    primary: {
      light: 'hsl(0, 0%, 100%)',       // Reinweiß für saubere Light Mode
      dark: 'hsl(0, 0%, 6%)',          // Sehr dunkel für Dark Mode
      contrast: 'hsl(0, 0%, 0%)'       // Reines Schwarz für maximale Kontrastierung
    },
    secondary: {
      light: 'hsl(0, 0%, 98%)',        // Sehr hell grau für Karten-Hintergründe
      dark: 'hsl(0, 0%, 10%)',         // Dunkel grau für Dark Mode Karten
      contrast: 'hsl(0, 0%, 5%)'       // Sehr dunkel für Contrast Karten
    },
    tertiary: {
      light: 'hsl(0, 0%, 96%)',        // Hell grau für eingebettete Bereiche
      dark: 'hsl(0, 0%, 12%)',         // Dunkel grau für Dark Mode
      contrast: 'hsl(0, 0%, 8%)'       // Dunkel für Contrast
    },
    accent: {
      light: 'hsl(157, 100%, 97%)',    // Sehr hell türkis für Hover-Effekte
      dark: 'hsl(157, 20%, 15%)',      // Subtil türkis für Dark Mode
      contrast: 'hsl(157, 30%, 20%)'   // Deutlicher türkis für Contrast
    }
  },

  // === TEXT COLORS ===
  // Textfarben sind hierarchisch abgestuft für optimale Lesbarkeit.
  // Primary für Überschriften, Secondary für Untertitel, Tertiary für
  // Beschreibungen, Muted für weniger wichtige Informationen.
  text: {
    primary: {
      light: 'hsl(0, 0%, 10%)',        // Sehr dunkel für maximale Lesbarkeit
      dark: 'hsl(0, 0%, 95%)',         // Sehr hell für Dark Mode
      contrast: 'hsl(0, 0%, 100%)'     // Reines Weiß für High Contrast
    },
    secondary: {
      light: 'hsl(0, 0%, 35%)',        // Mittel grau für Untertitel
      dark: 'hsl(0, 0%, 75%)',         // Hell grau für Dark Mode
      contrast: 'hsl(0, 0%, 90%)'      // Sehr hell für Contrast
    },
    tertiary: {
      light: 'hsl(0, 0%, 55%)',        // Hell grau für Beschreibungen
      dark: 'hsl(0, 0%, 60%)',         // Dunkel grau für Dark Mode
      contrast: 'hsl(0, 0%, 80%)'      // Mittel hell für Contrast
    },
    muted: {
      light: 'hsl(0, 0%, 70%)',        // Sehr hell grau für Metadaten
      dark: 'hsl(0, 0%, 50%)',         // Mittel grau für Dark Mode
      contrast: 'hsl(0, 0%, 70%)'      // Hell grau für Contrast
    }
  },

  // === BORDER COLORS ===
  // Rahmenfarben sind subtil und unterstützen die Hierarchie.
  // Light für feine Trennungen, Medium für stärkere Abgrenzungen,
  // Dark für prominente Elemente wie Karten-Rahmen.
  border: {
    light: {
      light: 'hsl(0, 0%, 90%)',        // Hell grau für subtile Rahmen
      dark: 'hsl(0, 0%, 20%)',         // Dunkel grau für Dark Mode
      contrast: 'hsl(0, 0%, 40%)'      // Mittel grau für Contrast
    },
    medium: {
      light: 'hsl(0, 0%, 80%)',        // Mittel hell für stärkere Rahmen
      dark: 'hsl(0, 0%, 25%)',         // Mittel dunkel für Dark Mode
      contrast: 'hsl(0, 0%, 50%)'      // Mittel für Contrast
    },
    dark: {
      light: 'hsl(0, 0%, 60%)',        // Dunkel grau für prominente Rahmen
      dark: 'hsl(0, 0%, 35%)',         // Hell grau für Dark Mode
      contrast: 'hsl(0, 0%, 70%)'      // Hell für Contrast
    }
  },

  // === ACCENT COLORS ===
  // Semantische Farben für Status und Feedback.
  // Verwende Success für positive Aktionen, Warning für Vorsicht,
  // Error für Fehler, Info für neutrale Informationen.
  accent: {
    success: {
      light: 'hsl(142, 76%, 36%)',     // Dunkel grün für Erfolg
      dark: 'hsl(142, 76%, 65%)',      // Hell grün für Dark Mode
      contrast: 'hsl(142, 76%, 75%)'   // Sehr hell grün für Contrast
    },
    warning: {
      light: 'hsl(38, 92%, 50%)',      // Orange für Warnungen
      dark: 'hsl(38, 92%, 60%)',       // Hell orange für Dark Mode
      contrast: 'hsl(38, 92%, 70%)'    // Sehr hell orange für Contrast
    },
    error: {
      light: 'hsl(0, 84%, 60%)',       // Rot für Fehler
      dark: 'hsl(0, 84%, 70%)',        // Hell rot für Dark Mode
      contrast: 'hsl(0, 84%, 80%)'     // Sehr hell rot für Contrast
    },
    info: {
      light: 'hsl(199, 89%, 48%)',     // Blau für Informationen
      dark: 'hsl(199, 89%, 60%)',      // Hell blau für Dark Mode
      contrast: 'hsl(199, 89%, 70%)'   // Sehr hell blau für Contrast
    }
  },

  // === INTERACTIVE COLORS ===
  // Farben für Benutzerinteraktionen wie Hover, Active und Focus.
  // Hover für Mausüberfahrten, Active für Klicks, Focus für Tastatur-Navigation.
  // Alle basieren auf der Brand-Farbe für Konsistenz.
  interactive: {
    hover: {
      light: 'hsl(157, 100%, 45%)',    // Dunkler türkis für Hover
      dark: 'hsl(157, 100%, 65%)',     // Heller türkis für Dark Mode
      contrast: 'hsl(157, 100%, 75%)'  // Sehr hell türkis für Contrast
    },
    active: {
      light: 'hsl(157, 100%, 40%)',    // Noch dunkler für Active
      dark: 'hsl(157, 100%, 70%)',     // Noch heller für Dark Mode
      contrast: 'hsl(157, 100%, 80%)'  // Sehr hell für Contrast
    },
    focus: {
      light: 'hsl(157, 100%, 50%)',    // Medium türkis für Focus
      dark: 'hsl(157, 100%, 60%)',     // Hell türkis für Dark Mode
      contrast: 'hsl(157, 100%, 70%)'  // Sehr hell türkis für Contrast
    }
  },

  // === SEMANTIC COLORS ===
  // Spezielle Farben für semantische Elemente wie Links und Code.
  // Link für normale Links, LinkHover für Hover-Zustand,
  // Code für Inline-Code, CodeBg für Code-Blöcke.
  semantic: {
    link: {
      light: 'hsl(199, 89%, 48%)',     // Blau für Links
      dark: 'hsl(199, 89%, 65%)',      // Hell blau für Dark Mode
      contrast: 'hsl(199, 89%, 75%)'   // Sehr hell blau für Contrast
    },
    linkHover: {
      light: 'hsl(199, 89%, 35%)',     // Dunkel blau für Hover
      dark: 'hsl(199, 89%, 75%)',      // Sehr hell blau für Dark Mode
      contrast: 'hsl(199, 89%, 85%)'   // Extrem hell blau für Contrast
    },
    code: {
      light: 'hsl(0, 0%, 15%)',        // Dunkel für Inline-Code
      dark: 'hsl(0, 0%, 90%)',         // Hell für Inline-Code
      contrast: 'hsl(0, 0%, 95%)'      // Sehr hell für Inline-Code
    },
    codeBg: {
      light: 'hsl(0, 0%, 96%)',        // Hell grau Hintergrund für Code-Blöcke
      dark: 'hsl(0, 0%, 12%)',         // Dunkel grau Hintergrund für Code-Blöcke
      contrast: 'hsl(0, 0%, 8%)'       // Sehr dunkel für Code-Blöcke
    }
  }
} as const

// === UTILITY FUNCTIONS ===

/**
 * Holt eine Farbe aus dem Farbsystem
 *
 * Verwendung: getColor('brand', 'primary', 'light')
 * Gibt die entsprechende HSL-Farbe zurück oder null wenn nicht gefunden.
 */
export const getColor = (
  category: keyof typeof VAE_COLOR_SYSTEM,
  subcategory: string,
  mode: 'light' | 'dark' | 'contrast' = 'light'
) => {
  const categoryColors = VAE_COLOR_SYSTEM[category] as any
  if (!categoryColors) return null

  const subCategoryColors = categoryColors[subcategory]
  if (!subCategoryColors) return null

  return subCategoryColors[mode] || subCategoryColors.light
}

/**
 * Generiert CSS-Variablen für einen Modus
 *
 * Erstellt ein Objekt mit CSS-Custom-Properties für alle Farben eines Modus.
 * Kann direkt in CSS verwendet werden: --color-brand-primary: hsl(...);
 */
export const generateColorVariables = (mode: 'light' | 'dark' | 'contrast' = 'light') => {
  const variables: Record<string, string> = {}

  // Brand colors
  variables['--color-brand-primary'] = getColor('brand', 'primary', mode)
  variables['--color-brand-secondary'] = getColor('brand', 'secondary', mode)

  // Background colors
  variables['--color-bg-primary'] = getColor('background', 'primary', mode)
  variables['--color-bg-secondary'] = getColor('background', 'secondary', mode)
  variables['--color-bg-tertiary'] = getColor('background', 'tertiary', mode)
  variables['--color-bg-accent'] = getColor('background', 'accent', mode)

  // Text colors
  variables['--color-text-primary'] = getColor('text', 'primary', mode)
  variables['--color-text-secondary'] = getColor('text', 'secondary', mode)
  variables['--color-text-tertiary'] = getColor('text', 'tertiary', mode)
  variables['--color-text-muted'] = getColor('text', 'muted', mode)

  // Border colors
  variables['--color-border-light'] = getColor('border', 'light', mode)
  variables['--color-border-medium'] = getColor('border', 'medium', mode)
  variables['--color-border-dark'] = getColor('border', 'dark', mode)

  // Accent colors
  variables['--color-accent-success'] = getColor('accent', 'success', mode)
  variables['--color-accent-warning'] = getColor('accent', 'warning', mode)
  variables['--color-accent-error'] = getColor('accent', 'error', mode)
  variables['--color-accent-info'] = getColor('accent', 'info', mode)

  // Interactive colors
  variables['--color-interactive-hover'] = getColor('interactive', 'hover', mode)
  variables['--color-interactive-active'] = getColor('interactive', 'active', mode)
  variables['--color-interactive-focus'] = getColor('interactive', 'focus', mode)

  // Semantic colors
  variables['--color-link'] = getColor('semantic', 'link', mode)
  variables['--color-link-hover'] = getColor('semantic', 'linkHover', mode)
  variables['--color-code'] = getColor('semantic', 'code', mode)
  variables['--color-code-bg'] = getColor('semantic', 'codeBg', mode)

  return variables
}

/**
 * Wendet Farbvariablen auf das Dokument an
 *
 * Setzt alle CSS-Variablen für den gewählten Modus und aktualisiert
 * das data-color-mode Attribut am Root-Element.
 */
export const applyColorMode = (mode: 'light' | 'dark' | 'contrast' = 'light') => {
  const variables = generateColorVariables(mode)
  const root = document.documentElement

  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value)
  })

  // Setze data-attribute für CSS
  root.setAttribute('data-color-mode', mode)
}

/**
 * Holt den aktuellen Farbmodus
 *
 * Liest das data-color-mode Attribut vom Root-Element.
 * Fallback auf 'light' wenn nicht gesetzt.
 */
export const getCurrentColorMode = (): 'light' | 'dark' | 'contrast' => {
  const mode = document.documentElement.getAttribute('data-color-mode')
  return (mode as 'light' | 'dark' | 'contrast') || 'light'
}

/**
 * Toggle zwischen Light und Dark Mode
 *
 * Wechselt zwischen Light und Dark Mode, ignoriert Contrast Mode.
 * Gibt den neuen Modus zurück.
 */
export const toggleColorMode = () => {
  const current = getCurrentColorMode()
  const next = current === 'light' ? 'dark' : 'light'
  applyColorMode(next)
  return next
}

/**
 * Aktiviert High Contrast Mode
 *
 * Schaltet auf Contrast Mode für bessere Accessibility.
 */
export const enableHighContrast = () => {
  applyColorMode('contrast')
}

/**
 * Deaktiviert High Contrast Mode
 *
 * Kehrt zum vorherigen Modus zurück (Light oder Dark).
 */
export const disableHighContrast = () => {
  const current = getCurrentColorMode()
  const fallback = current === 'contrast' ? 'light' : current
  applyColorMode(fallback)
}
