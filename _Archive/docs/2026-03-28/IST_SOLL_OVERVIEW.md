# IST-Zustand & SOLL-Zustand – E-Mail-Integration (Kompakt-Übersicht)

**Erstellt:** 7. Januar 2026
**Für:** Julian (Schnelle Orientierung)

---

## 🔍 IST-ZUSTAND: Wo sind die E-Mail-Stellen?

### 1. **Contact Page – Mail Builder**

📁 **Datei:** [`src/components/pages/ContactPage.tsx`](../src/components/pages/ContactPage.tsx#L358)
📍 **Zeile:** 358 (Funktion `handlePrepareEmail()`)

**Was passiert:**

- User füllt 3-Schritte-Formular aus (Thema, Timeline, Setup, Notizen)
- Klickt "Mail vorbereiten"
- `mailto:`-Link öffnet Mail-Client mit vorbefülltem Text

**Betroffene Daten:**

```tsx
{
  name: contactName,
  company: companyName,
  position: position,
  phone: phone,
  intent: selectedIntents,  // z.B. ["automation", "infrastructure"]
  timeline: timeline,       // z.B. "soon"
  companyStage: companyStage,
  collabMode: collabMode,
  notes: notes
}
```

**Aktueller Code:**

```tsx
const mailto = `mailto:info@vae.systems?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailPreview)}`
window.location.href = mailto // ← Öffnet Mail-Client
```

---

### 2. **Setup Page – Sparpotenzial anfragen**

📁 **Datei:** [`src/components/pages/SetupPage.tsx`](../src/components/pages/SetupPage.tsx#L464)
📍 **Zeile:** 464 (Funktion `buildSavingsMailto()`)

**Was passiert:**

- User berechnet SaaS-Kosten mit Rechner
- Klickt "Sparpotenzial anfordern"
- `mailto:`-Link öffnet Mail-Client mit Kalkulationsdaten

**Betroffene Daten:**

```tsx
{
  monthlySaaSCost: number,      // z.B. 4500€
  estimatedSetupCost: number,   // z.B. 12000€
  yearOneSavings: number,       // z.B. 42000€
  yearTwoSavings: number,
  toolSelection: { [key: string]: boolean }  // z.B. { "Slack": true, "Notion": true }
}
```

**Aktueller Code:**

```tsx
const mailto = `mailto:juliangoertz@vae.systems?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`
```

---

### 3. **General Contact Form** (aktuell deaktiviert)

📁 **Datei:** [`src/components/forms/ContactForm.tsx`](../src/components/forms/ContactForm.tsx#L29)
📁 **Service:** [`src/services/contactService.ts`](../src/services/contactService.ts#L72)

**Was passiert:**

- Standard-Kontaktformular (Name, E-Mail, Message)
- Aktuell nur Mock-API (kein echter Versand)
- Zeile 72 in `contactService.ts`: API-Call ist auskommentiert

**Betroffene Daten:**

```tsx
{
  name: string,
  email: string,
  company?: string,
  phone?: string,
  subject?: string,
  message: string,
  source: "website"
}
```

---

## 🎯 SOLL-ZUSTAND: Was ändern wir?

### Neuer Flow (für alle 3 Stellen)

```
VORHER:
User füllt Formular → Klickt Button → mailto: öffnet Mail-Client → User sendet manuell

NACHHER:
User füllt Formular → Gibt E-Mail an → Klickt Button → POST-Request → Backend versendet 2 E-Mails
                                                                      ↓
                                                      1. An VAE (info@vae.systems)
                                                      2. Auto-Reply an User
```

---

### UI-Änderungen (was User sieht)

| **Vorher**                           | **Nachher**                                    |
| ------------------------------------ | ---------------------------------------------- |
| Pop-up: "Öffnet sich Mail-Client..." | Pop-up: "E-Mail wird versendet..." (+ Spinner) |
| Kein E-Mail-Feld (nur Name/Company)  | **NEU:** E-Mail-Eingabefeld (für Auto-Reply)   |
| Keine Bestätigung                    | Success-Message: "✅ Anfrage gesendet!"        |
| Button: "Mail vorbereiten"           | Button: "Anfrage senden"                       |

---

## 📊 Welche Dateien müssen geändert werden?

### Frontend (Julian)

1. **`src/services/contactService.ts`**
   - Uncomment API-Call (Zeile 72-82)
   - Ersetze Mock-Logik durch echten API-Call
   - Füge neue Funktionen hinzu: `sendMailBuilderRequest()`, `sendSavingsPotentialRequest()`

2. **`src/components/pages/ContactPage.tsx`**
   - Ersetze `handlePrepareEmail()` durch `handleSubmitForm()` (API-Call)
   - Füge E-Mail-Eingabefeld hinzu
   - Füge Loading- und Success-States hinzu

3. **`src/components/pages/SetupPage.tsx`**
   - Ersetze `buildSavingsMailto()` durch `handleSubmitSavings()` (API-Call)
   - Passe `LockedSection` an (E-Mail-Eingabefeld)

4. **`src/components/forms/ContactForm.tsx`**
   - Setze `useMockApi={false}` als Default

5. **`src/components/ui/LockedSection.tsx`**
   - Füge E-Mail-Eingabefeld im Overlay hinzu

### Backend (Jakob)

1. **Dart-Backend (neues Projekt)**
   - API-Endpoint: `POST /api/contact`
   - Validierung (Name, E-Mail, Message)
   - E-Mail-Versand (2 E-Mails: an VAE + Auto-Reply)
   - Rate-Limiting (3 Requests / 15min pro IP)
   - Security (CORS, XSS-Schutz, HTTPS)

---

## 🔑 Wichtigste Änderungen (Beispiel: ContactPage)

### VORHER (mailto:)

```tsx
const handlePrepareEmail = () => {
  // Validation
  if (!contactName.trim()) { ... }

  // Generate mailto: link
  const mailto = `mailto:info@vae.systems?subject=${...}&body=${...}`
  window.location.href = mailto  // ← Öffnet Mail-Client
}
```

### NACHHER (API-Call)

```tsx
const handleSubmitForm = async () => {
  // Validation
  if (!contactName.trim() || !userEmail.trim()) { ... }

  // Send to backend
  try {
    setIsSubmitting(true)
    const response = await fetch('https://api.vae.systems/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: contactName,
        email: userEmail,  // ← NEU: User gibt E-Mail an
        company: companyName,
        message: notes,
        source: 'mail-builder',
        intent: selectedIntents.join(', '),
        timestamp: new Date().toISOString(),
      })
    })

    if (!response.ok) throw new Error('API Error')

    setSuccessMessage('✅ Anfrage gesendet!')
  } catch (error) {
    setValidationError('❌ Fehler beim Senden.')
  } finally {
    setIsSubmitting(false)
  }
}
```

---

## 📋 Nächste Schritte (Zusammenarbeit mit Jakob)

### Phase 1: Planung (DONE ✅)

- [x] IST-Analyse
- [x] Requirements-Dokument für Jakob
- [x] Frontend-Checklist für Julian

### Phase 2: Backend-Entwicklung (Jakob)

- [ ] API-Endpoint bauen (`POST /api/contact`)
- [ ] E-Mail-Versand implementieren (Resend oder SendGrid)
- [ ] Rate-Limiting + Validierung
- [ ] Tests schreiben
- [ ] Staging-Deployment → URL an Julian schicken

### Phase 3: Frontend-Anpassung (Julian)

- [ ] Warte auf Staging-URL von Jakob
- [ ] Passe `contactService.ts` an (echte API-URL)
- [ ] Ändere ContactPage, SetupPage (E-Mail-Feld + API-Call)
- [ ] Schreibe E2E-Tests (Playwright)
- [ ] Teste gegen Staging-Backend

### Phase 4: Integration & Production

- [ ] Gemeinsam: E2E-Tests validieren
- [ ] Production-Deployment
- [ ] Smoke-Test auf Production

---

## 📚 Wo finde ich Details?

1. **Backend-Requirements (für Jakob):**
   [`docs/EMAIL_BACKEND_REQUIREMENTS.md`](./EMAIL_BACKEND_REQUIREMENTS.md)
   → Vollständige API-Specs, E-Mail-Templates, Security, Rate-Limiting

2. **Frontend-Implementierungs-Checklist (für Julian):**
   [`docs/FRONTEND_IMPLEMENTATION_CHECKLIST.md`](./FRONTEND_IMPLEMENTATION_CHECKLIST.md)
   → Schritt-für-Schritt-Anleitung, Code-Beispiele, Testing

3. **Kommunikation mit Jakob:**
   [`docs/KOMMUNIKATION_JAKOB_EMAIL.md`](./KOMMUNIKATION_JAKOB_EMAIL.md)
   → Kurze Nachricht mit TL;DR + offenen Fragen

---

## ⏱️ Timeline

**Geschätzt:** ~7-10 Tage

| **Phase**             | **Verantwortlich** | **Dauer** |
| --------------------- | ------------------ | --------- |
| Backend-Entwicklung   | Jakob              | 2-3 Tage  |
| Backend-Tests         | Jakob              | 1 Tag     |
| Frontend-Anpassung    | Julian             | 1-2 Tage  |
| E2E-Tests             | Julian             | 1 Tag     |
| Integration-Testing   | Beide              | 1 Tag     |
| Production-Deployment | Beide              | 0.5 Tag   |

---

## ✅ Fertig, wenn...

1. ✅ Alle 3 Formulare senden POST-Requests (kein `mailto:` mehr)
2. ✅ E2E-Tests bestehen (Success-Cases + Error-Cases)
3. ✅ Success-Messages werden korrekt angezeigt
4. ✅ Auto-Reply-E-Mails werden versendet
5. ✅ Production-Deployment erfolgreich

---

**Das war's! Jetzt hast du einen kompletten Überblick.** 🎉

Nächster Schritt: Schick Jakob die [Kommunikations-Nachricht](./KOMMUNIKATION_JAKOB_EMAIL.md) und warte auf Staging-URL.
