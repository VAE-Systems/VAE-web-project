# 🎯 VAE Help System – Wiederverwendbares Hilfesystem

**Version:** 1.0.0
**Erstellt:** 15. November 2025
**Zweck:** Dokumentation für KI-Agenten und Entwickler zur Implementierung kontextsensitiver Hilfe

---

## 📋 Übersicht

Das VAE Help System ist ein vollständig wiederverwendbares System zur Implementierung von kontextsensitiver Hilfe in React-Anwendungen. Es ermöglicht Benutzern, einen "Hilfe-Modus" zu aktivieren und durch Klick auf UI-Elemente detaillierte Erklärungen zu erhalten.

### ✨ Features

- ✅ **Global State Management** – Funktioniert app-weit über React Context
- ✅ **Type-Safe** – Vollständig typisiert mit TypeScript
- ✅ **Accessibility** – ARIA-Labels, Keyboard-Navigation (Escape zum Schließen)
- ✅ **Mobile-Friendly** – Responsive Popups und Touch-Support
- ✅ **Flexible Styling** – Anpassbar über Props und Tailwind CSS
- ✅ **Zero Dependencies** – Nur React und Lucide Icons

---

## 📦 Komponenten-Übersicht

```
src/components/ui/help/
├── HelpModeContext.tsx       # Context + Provider für globalen State
├── HelpButton.tsx             # Fragezeichen-Button zum Aktivieren
├── HelpPopup.tsx              # Zentriertes Modal für Hilfe-Texte
├── useHelpMode.ts             # Custom Hook mit Helper-Funktionen
└── index.ts                   # Exports

src/components/ui/validation/
├── ValidationPopup.tsx        # Popup für Validierungsfehler
└── index.ts                   # Exports
```

---

## 🚀 Quick Start

### 1. Provider einbinden (z.B. in `App.tsx` oder Layout)

```tsx
import { HelpModeProvider } from '@/components/ui/help'

function App() {
  return (
    <HelpModeProvider>
      <YourApp />
    </HelpModeProvider>
  )
}
```

### 2. Hilfe-Texte definieren

```tsx
import { HelpText } from '@/components/ui/help'

const helpTexts: Record<string, HelpText> = {
  username: {
    title: 'Benutzername',
    description: 'Ihr eindeutiger Benutzername für die Anmeldung. Mindestens 3 Zeichen, nur Buchstaben und Zahlen.',
  },
  email: {
    title: 'E-Mail-Adresse',
    description: 'Ihre primäre E-Mail-Adresse. Wird für Benachrichtigungen und Passwort-Reset verwendet.',
  },
}
```

### 3. In Komponente verwenden

```tsx
import { useHelpMode, HelpButton, HelpModeIndicator, HelpPopup } from '@/components/ui/help'

function MyForm() {
  const { helpMode, showHelp } = useHelpMode(helpTexts)

  return (
    <div>
      {/* Hilfe-Button */}
      <HelpButton />

      {/* Optional: Indicator wenn Hilfe aktiv */}
      <HelpModeIndicator />

      {/* Ihre Felder mit Hilfe-Support */}
      <button
        onClick={() => (helpMode ? showHelp('username') : handleSubmit())}
        className={helpMode ? 'cursor-help ring-2 ring-vae-turquoise/20' : ''}
      >
        Benutzername
      </button>

      {/* Hilfe-Popup (automatisch gesteuert) */}
      <HelpPopup />
    </div>
  )
}
```

---

## 🎨 Styling-Anleitung

### Standard VAE Design System

Das Help System verwendet das VAE Design System mit folgenden Farben:

- **Primary:** `vae-turquoise` (`#05f8c8`)
- **Background:** `bg-darker`, `bg-dark`
- **Text:** `text-light`, `text-muted`
- **Borders:** `border-white/10`

### Anpassung

Alle Komponenten akzeptieren `className` Props:

```tsx
<HelpButton className="my-custom-class" />
<HelpPopup className="max-w-xl" />
<ValidationPopup className="border-blue-500/40" />
```

---

## 📚 Detaillierte API-Dokumentation

### `HelpModeProvider`

**Props:** `{ children: ReactNode }`

Wrapper-Komponente für den gesamten Help-Mode State. Muss alle Komponenten umschließen, die Help-Funktionalität nutzen.

```tsx
<HelpModeProvider>
  <App />
</HelpModeProvider>
```

---

### `useHelpMode(helpTexts?)`

**Parameter:**

- `helpTexts?` – Optional: Dictionary von Hilfe-Texten, die automatisch registriert werden

**Returns:**

```tsx
{
  helpMode: boolean              // Ist Hilfe-Modus aktiv?
  activeHelp: string | null      // Aktuell angezeigte Hilfe (Key)
  toggleHelpMode: () => void     // Hilfe-Modus an/aus
  showHelp: (key: string) => void // Zeige Hilfe für Key
  closeHelp: () => void          // Schließe aktive Hilfe
  helpTexts: Record<string, HelpText> // Alle registrierten Texte
  registerHelpTexts: (texts) => void  // Registriere neue Texte
}
```

**Beispiel:**

```tsx
const { helpMode, showHelp, closeHelp } = useHelpMode({
  myField: {
    title: 'Mein Feld',
    description: 'Dies ist eine ausführliche Erklärung.',
  },
})
```

---

### `HelpButton`

**Props:**

```tsx
{
  className?: string           // Custom CSS classes
  position?: 'inline' | 'fixed' // Position (inline oder fixed floating)
  label?: string               // Optional: Text-Label neben Icon
}
```

**Beispiele:**

```tsx
// Standard inline Button
<HelpButton />

// Floating Button (rechts unten)
<HelpButton position="fixed" />

// Mit Label
<HelpButton label="Hilfe aktivieren" />
```

---

### `HelpModeIndicator`

Zeigt Banner mit Hinweis an, wenn Help-Mode aktiv ist.

**Props:** `{ className?: string }`

```tsx
<HelpModeIndicator />
```

---

### `HelpPopup`

**Props:**

```tsx
{
  className?: string          // Custom CSS classes
  showConfirmButton?: boolean // "Verstanden" Button zeigen? (default: true)
}
```

**Beispiel:**

```tsx
<HelpPopup />
<HelpPopup showConfirmButton={false} />
```

---

### `ValidationPopup`

**Props:**

```tsx
{
  message: string              // Fehlermeldung
  isOpen: boolean              // Sichtbarkeit
  onClose: () => void          // Callback zum Schließen
  title?: string               // Titel (default: "Pflichtfelder fehlen")
  className?: string           // Custom CSS
  autoCloseDuration?: number   // Auto-Close in ms (default: 5000, 0 = aus)
}
```

**Beispiel:**

```tsx
const [error, setError] = useState('')

<ValidationPopup
  message={error}
  isOpen={!!error}
  onClose={() => setError('')}
  title="Eingabefehler"
  autoCloseDuration={3000}
/>
```

---

## 🛠️ Helper-Funktionen

### `createHelpAwareHandler`

Erstellt einen onClick-Handler, der entweder Hilfe zeigt oder eine Aktion ausführt.

```tsx
import { createHelpAwareHandler } from '@/components/ui/help'

const handler = createHelpAwareHandler(
  helpMode,
  'myKey',
  showHelp,
  () => console.log('Normal action')
)

<button onClick={handler}>Click me</button>
```

### `getHelpModeClasses`

Fügt Hilfe-Mode CSS-Klassen hinzu (z.B. `cursor-help`, `ring-2`).

```tsx
import { getHelpModeClasses } from '@/components/ui/help'

;<button className={getHelpModeClasses(helpMode, 'btn-primary')}>Button</button>
```

---

## 💡 Implementierungs-Patterns

### Pattern 1: Simple Button mit Hilfe

```tsx
const { helpMode, showHelp } = useHelpMode(helpTexts)

<button
  onClick={() => {
    if (helpMode) {
      showHelp('myButton')
    } else {
      handleClick()
    }
  }}
  className={helpMode ? 'cursor-help ring-2 ring-vae-turquoise/20' : ''}
>
  Click me
</button>
```

### Pattern 2: Multi-Button Selection (wie ContactPage)

```tsx
const options = [
  { id: 'option1', label: 'Option 1' },
  { id: 'option2', label: 'Option 2' },
]

{
  options.map(option => (
    <button
      key={option.id}
      onClick={() => {
        if (helpMode) {
          showHelp(option.id)
        } else {
          selectOption(option.id)
        }
      }}
      className={`base-classes ${helpMode ? 'cursor-help ring-2 ring-vae-turquoise/20' : ''}`}
    >
      {option.label}
    </button>
  ))
}
```

### Pattern 3: Form mit Validation

```tsx
import { ValidationPopup } from '@/components/ui/validation'
import { HelpButton, HelpPopup, useHelpMode } from '@/components/ui/help'

function MyForm() {
  const [error, setError] = useState('')
  const { helpMode, showHelp } = useHelpMode(helpTexts)

  const handleSubmit = () => {
    if (!name) {
      setError('Bitte Name eingeben')
      return
    }
    // ... submit logic
  }

  return (
    <>
      <HelpButton />
      <HelpPopup />

      <input
        onClick={() => helpMode && showHelp('name')}
        className={helpMode ? 'cursor-help ring-2 ring-vae-turquoise/20' : ''}
      />

      <button onClick={handleSubmit}>Absenden</button>

      <ValidationPopup message={error} isOpen={!!error} onClose={() => setError('')} />
    </>
  )
}
```

---

## 🎯 Best Practices

### ✅ DO

- **Platziere HelpModeProvider möglichst weit oben** (App-Level oder Page-Level)
- **Registriere Hilfe-Texte mit `useHelpMode()`** beim Component-Mount
- **Verwende semantische Keys** für Hilfe-Texte (z.B. `'email'`, `'timeline'`)
- **Gib visuelles Feedback** im Help-Mode (cursor-help, ring)
- **Schreibe klare, handlungsrelevante Beschreibungen**

### ❌ DON'T

- ❌ Help-Mode State lokal duplizieren (nutze Context)
- ❌ Hilfe-Texte hardcoden (verwende separates Dictionary)
- ❌ Help-Mode ohne visuelles Feedback aktivieren
- ❌ Zu lange Beschreibungen (max. 2-3 Sätze)
- ❌ Provider mehrfach verschachteln

---

## 🧪 Testing

### Unit Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { HelpModeProvider } from '@/components/ui/help'

test('opens help popup on button click', () => {
  render(
    <HelpModeProvider>
      <MyComponent />
    </HelpModeProvider>
  )

  const helpButton = screen.getByRole('button', { name: /hilfe-modus/i })
  fireEvent.click(helpButton)

  // Assert help mode active...
})
```

---

## 🌍 Internationalisierung

Für mehrsprachige Apps, verwende i18n-Keys:

```tsx
import { useTranslation } from 'react-i18next'

const { t } = useTranslation()

const helpTexts = {
  username: {
    title: t('help.username.title'),
    description: t('help.username.description'),
  },
}
```

---

## 🔄 Migration von alten Lösungen

### Vorher (inline State):

```tsx
const [helpMode, setHelpMode] = useState(false)
const [activeHelp, setActiveHelp] = useState<string | null>(null)

// ... viel Boilerplate
```

### Nachher (mit Help System):

```tsx
const { helpMode, showHelp } = useHelpMode(helpTexts)

// Fertig! 🎉
```

---

## 🤖 Für KI-Agenten: Implementierungs-Checkliste

Wenn du als KI diese Funktion in einer neuen Page implementieren sollst:

1. ✅ **Provider prüfen:** Ist `HelpModeProvider` in App/Layout vorhanden?
2. ✅ **Hilfe-Texte definieren:** Dictionary mit allen erklärungsbedürftigen Elementen
3. ✅ **useHelpMode importieren:** `import { useHelpMode, HelpButton, HelpPopup } from '@/components/ui/help'`
4. ✅ **Hook aufrufen:** `const { helpMode, showHelp } = useHelpMode(helpTexts)`
5. ✅ **Button platzieren:** `<HelpButton />` an sichtbarer Stelle
6. ✅ **Popup platzieren:** `<HelpPopup />` einmal pro Page
7. ✅ **onClick erweitern:** `onClick={() => helpMode ? showHelp('key') : action()}`
8. ✅ **Styling hinzufügen:** `className={helpMode ? 'cursor-help ring-2 ring-vae-turquoise/20' : ''}`
9. ✅ **Testen:** Hilfe-Modus aktivieren und alle Felder durchklicken

---

## 📖 Referenz-Implementierung

Siehe `ContactPage.tsx` (nach Refactoring) für vollständiges Beispiel einer komplexen Form mit:

- Multi-Selection Buttons (Themen)
- Radio-Style Buttons (Timeline, Setup)
- Text Inputs (Name, Company)
- Validation mit Popup
- Boss-Style Email Signature

---

## 🐛 Troubleshooting

### Fehler: "useHelpModeContext must be used within HelpModeProvider"

**Lösung:** Stelle sicher, dass `HelpModeProvider` die Komponente umschließt.

### Hilfe-Text wird nicht angezeigt

**Lösung:** Prüfe, ob der Key in `helpTexts` existiert und mit `showHelp()` übereinstimmt.

### Popup schließt nicht

**Lösung:** Stelle sicher, dass `HelpPopup` nur einmal gerendert wird (nicht in Loops).

---

## 📝 Changelog

**v1.0.0** (15. Nov 2025)

- Initial release mit ContactPage als Referenz-Implementierung
- HelpModeContext, HelpButton, HelpPopup, useHelpMode
- ValidationPopup für zentrale Error-Anzeige
- Vollständige TypeScript-Unterstützung
- Accessibility (ARIA, Keyboard)

---

## 🎓 Weitere Ressourcen

- **Tailwind CSS Docs:** https://tailwindcss.com
- **React Context API:** https://react.dev/reference/react/useContext
- **ARIA Best Practices:** https://www.w3.org/WAI/ARIA/apg/

---

**Erstellt von:** Codex AI Agent
**Projekt:** VAE Systems Web
**Lizenz:** Proprietär (Internal Use Only)
