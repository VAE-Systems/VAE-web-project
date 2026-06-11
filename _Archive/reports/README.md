# 📦 Archiv – Ungenutzte Komponenten

Dieser Ordner enthält **inaktive Components**, die aktuell nicht in der Live-Website genutzt werden.

## 📅 Archiviert am: 2. November 2025

## 🎯 Grund für Archivierung

Diese Dateien wurden entwickelt, sind aber **nicht in der aktiven Routing-Struktur** (`App.tsx`) eingebunden.
Sie wurden archiviert um:

- Das Projekt übersichtlich zu halten
- Die aktive Codebasis klar zu strukturieren
- Alte Konzepte als Referenz zu bewahren

## 📁 Struktur

```
archive/
├── pages/          → Seiten-Komponenten ohne aktive Route
├── sections/       → Section-Komponenten ohne aktive Nutzung
└── content/        → Content-Dateien ohne aktive Referenzen
```

## 🔄 Wiederverwendung

Falls eine dieser Komponenten wieder benötigt wird:

1. Datei aus `archive/` zurück nach `src/components/` verschieben
2. Entsprechende Route in `App.tsx` hinzufügen
3. Imports und Dependencies prüfen
4. Testen und deployen

## ⚠️ Wichtig

Diese Dateien wurden **nicht gelöscht**, sondern archiviert.
Bei Bedarf können sie jederzeit reaktiviert werden.

---

**VAE Systems** – Strukturiertes Projekt-Management
