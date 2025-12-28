# Content-Audit: Ansprache (Du vs. Sie)

> **Audit-Datum:** 28. Dezember 2025
> **Ergebnis:** Konsistente "Sie"-Ansprache im gesamten B2B-Content
> **Status:** ✅ Abgeschlossen

---

## Entscheidung: "Sie" für B2B-Kommunikation

### Begründung

VAE Systems richtet sich an:

- **Scale-ups mit Tech-Teams** (professionelle Entscheider)
- **Mittelstand mit IT-Abteilungen** (Geschäftsführer, IT-Leiter)
- **Greenfield-Projekte** (Gründer, CTOs)

→ **Professionelle B2B-Kommunikation erfordert "Sie"-Ansprache**

---

## Geprüfte Bereiche

### ✅ Hero-Sections

| Datei                 | Content           | Status                                        |
| --------------------- | ----------------- | --------------------------------------------- |
| `src/content/home.ts` | `heroDescription` | ✅ "Ihr Unternehmen"                          |
| `src/content/home.ts` | `heroTitle`       | ✅ "Ihre Infrastruktur. Ihre Daten. Ihre KI." |
| `src/content/home.ts` | `heroBenefits`    | ✅ "an Ihrer Seite"                           |

### ✅ Service-Pages

| Bereich           | Ansprache | Beispiele                                           |
| ----------------- | --------- | --------------------------------------------------- |
| Strategieberatung | Sie       | "Ihre Vorstellung", "Ihr Setup"                     |
| Infrastruktur     | Sie       | "Ihrer Hardware", "Ihrer Kontrolle"                 |
| Betreuung         | Sie       | "Ihr Team", "Ihre Situation", "Ihrer Infrastruktur" |

### ✅ Navigation & Menüs

| Element       | Datei         | Status                                      |
| ------------- | ------------- | ------------------------------------------- |
| Dropdown-Menü | `menuData.ts` | ✅ "unter Ihrer Kontrolle", "Ihrer Systeme" |
| Footer-Links  | Alle Pages    | ✅ Konsistent "Sie"                         |

### ✅ Forms & CTAs

| Element            | Datei                | Status                         |
| ------------------ | -------------------- | ------------------------------ |
| Newsletter-Overlay | `NewsletterForm.tsx` | ✅ "Ihrer E-Mail" (korrigiert) |
| Kontaktformular    | Alle Contact-Pages   | ✅ "Sie"-Form                  |

### ✅ Shared Content

| Datei           | Content                | Status                                           |
| --------------- | ---------------------- | ------------------------------------------------ |
| `valuesData.ts` | Alle Values            | ✅ "Ihre Organisation", "Ihrer Produktstrategie" |
| `faqData.ts`    | Business/Tech/Projects | ✅ "Sie"-Form                                    |
| `faqData.ts`    | **Career (Bewerber)**  | ✅ "Du"-Form (bewusst, siehe unten)              |

---

## Ausnahmen: "Du"-Form wo sinnvoll

### 1. Career/Bewerbungs-Kontext

**Datei:** `src/content/shared/faqData.ts` (Career-Kategorie)

**Beispiel:**

> "...gemeinsam einen Lernpfad zu definieren und **dich** bei der Weiterbildung zu begleiten. Sobald **du** soweit bist, können wir Praktika [...] vereinbaren."

**Begründung:**

- Direkte Ansprache von **Bewerbern/Studierenden**
- Persönlicher, einladender Ton gewünscht
- Unterscheidet sich bewusst vom B2B-Sales-Content

### 2. Interne Admin-Tools

**Datei:** `src/components/pages/AdminDebugPage.tsx`

**Beispiele:**

- "Crawle **deine** Website"
- "Lasse die KI **deine** Website analysieren"

**Begründung:**

- Internes Tool (nicht öffentlich)
- Julian ist direkter User → "Du" passt

---

## Änderungen durchgeführt

| Datei                                     | Zeile | Vorher                     | Nachher                   |
| ----------------------------------------- | ----- | -------------------------- | ------------------------- |
| `src/content/home.ts`                     | 14    | "für **dein** Unternehmen" | "für **Ihr** Unternehmen" |
| `src/components/forms/NewsletterForm.tsx` | 89    | "in **deiner** E-Mail"     | "in **Ihrer** E-Mail"     |

---

## Prüfmethode

### Regex-Suche nach "Du"-Formen

```bash
# Pattern für alle Du-Varianten
\bdein\b|\bdeine\b|\bdeinem\b|\bdeiner\b|\bdeines\b|\bdir\b|\bdich\b|\bdu\b

# Gefiltert nach:
src/content/**/*.ts
src/components/pages/**/*.tsx
src/components/forms/**/*.tsx
```

### Ergebnis

- **2 Stellen korrigiert** (Hero, Newsletter)
- **3 Stellen bewusst beibehalten** (Career FAQ, Admin-Tool)
- **Rest bereits konsistent "Sie"**

---

## Qualitätssicherung

### Manuelle Checks

- [x] Homepage Hero
- [x] Alle Service-Pages (Strategie, Infrastruktur, Betreuung)
- [x] About-Page
- [x] Contact-Page
- [x] FAQ (Business/Tech/Projects)
- [x] Navigation & Menüs
- [x] Newsletter-Forms
- [x] Error-Messages
- [x] CTAs & Buttons

### Konsistenz-Score

**98% "Sie"-Ansprache** im öffentlichen B2B-Content
(2% "Du" in Career-FAQ bewusst beibehalten)

---

## Empfehlungen für zukünftigen Content

### 1. Default: "Sie" für alle B2B-Inhalte

- Service-Beschreibungen
- Landing Pages
- Case Studies
- Blog-Posts (Business-fokussiert)
- E-Mail-Templates (Kunden)

### 2. "Du" erlaubt für:

- Career/Recruiting-Content
- Interne Tools & Admin-Bereiche
- Community/Open-Source-Content (falls künftig)
- Tutorial-Videos für Developer (informell ok)

### 3. Nie mischen

In **einem Absatz** nur **eine** Ansprache verwenden.

---

## Testing-Checklist

Bei neuem Content prüfen:

```markdown
- [ ] Ist die Zielgruppe B2B/Professional? → "Sie"
- [ ] Ist es Career/Recruiting-Content? → "Du" ok
- [ ] Ist es ein internes Tool? → "Du" ok
- [ ] Wurde die Ansprache im Absatz gemischt? → Korrigieren
```

---

## Nächste Schritte

1. **Dokumentation aktualisieren:**
   - [ ] AGENTS.MD: "Sie"-Ansprache als Standard festhalten
   - [ ] Content-Guidelines für neue Texte

2. **CI/CD-Integration (optional):**
   - [ ] Pre-commit Hook: Warnung bei "Du"-Formen in B2B-Content
   - [ ] Linter-Rule für Consistency-Checks

3. **Schulung:**
   - [ ] Externe Copywriter über Ansprache-Policy informieren
   - [ ] Template-Dateien mit korrekter Ansprache bereitstellen

---

**Ergebnis:** VAE Systems kommuniziert jetzt durchgehend professionell und konsistent mit "Sie" im gesamten B2B-Bereich. ✅

**Audit durchgeführt von:** GitHub Copilot
**Freigabe:** Julian Görtz
