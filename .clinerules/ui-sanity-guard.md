Rule: Vor dem Umsetzen eines neuen UI-Elements analysiere „Nachher“-Wirkung.
Reason: Verhindert logische Darstellungsfehler, die erst nach dem Einbau sichtbar werden.
Check:

- Responsive-Vorschau (xs/sm/md/lg): bricht Grid? überläuft Text?
- Kontrast (WCAG AA); Fokus/Keyboard-Navigation vorhanden.
- Dark/Light Parität (falls vorhanden).
- Kollisionen mit benachbarten Komponenten (Spacing, Shadow, Border-Radius).
  Severity: Error
