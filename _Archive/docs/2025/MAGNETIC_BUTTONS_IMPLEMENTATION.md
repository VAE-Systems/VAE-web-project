# Magnetic Ghost Buttons Implementation Plan

## Ziel

Magnetische Funktionalität für alle Ghost Buttons auf Values-Seiten hinzufügen, um konsistentes Design zu gewährleisten.

## Betroffene Dateien

### 1. ValueSection.tsx (Values Page Hauptseite)

- Ghost button "Mehr erfahren" zu MagneticButton hinzufügen
- Standard-Intensität: 0.075
- Scale-Effekt aktiviert für bessere UX

### 2. Values Detailseiten ("Zurück zu den Werten" Buttons)

- QualitaetPage.tsx
- TransparenzPage.tsx
- SkalierbarkeitPage.tsx
- KommunikationPage.tsx
- UnabhaengigkeitPage.tsx
- DesignHeritagePage.tsx

## Implementierungsdetails

- Bestehende Link-Funktionalität beibehalten
- React Router Link und externe Links unterstützen
- Accessibility-Standards einhalten
- Einheitliche Parameter verwenden
