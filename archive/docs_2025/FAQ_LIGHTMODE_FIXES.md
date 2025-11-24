# FAQ Light Mode Fixes - Detaillierte Todo-Liste

## Probleme identifiziert

- ✅ FAB (Floating Action Button) Konflikte mit schwarzem Hintergrund im Light Mode
- ✅ Hero Text "Keine Standardpakete · 100% transparente Kommunikation" nicht lesbar (fest auf text-white/80 gesetzt)

## Lösungsschritte

- [x] FAQ-Seite lokalisieren (ResourcesFaqPage.tsx gefunden)
- [x] ResourcesFaqPage.tsx analysiert - Hero-Sektion mit problemática Text gefunden
- [x] Theme-System analysiert - theming-aware Klassen verfügbar
- [x] Hero Text Farb-Problem im Light Mode behoben (Zeile 87-89: text-white/80 → text-text-secondary)
- [ ] Hero Tag Hintergrund theme-aware machen (bg-white/5 → bg-bg-secondary/20)
- [ ] FAB-Komponente im Projekt lokalisieren (Floating Action Button)
- [ ] Light Mode Styles für FAQ-Hintergrund und FAB identifizieren
- [ ] FAB-Konflikt im Light Mode beheben
- [ ] Weitere mögliche Light Mode Konflikte in FAQ-Sektionen prüfen
- [ ] Änderungen testen und validieren

## Nächste Aktion

Hero Tag Hintergrund theme-aware machen und FAB-Problem lokalisieren
