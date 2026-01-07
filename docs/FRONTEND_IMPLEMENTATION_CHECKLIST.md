# Frontend-Implementierungs-Checklist – E-Mail-Backend-Integration

**Erstellt:** 7. Januar 2026
**Owner:** Julian
**Abhängigkeiten:** Jakob muss Backend-API fertigstellen (siehe `EMAIL_BACKEND_REQUIREMENTS.md`)

---

## 🎯 ÜBERBLICK

Diese Checklist führt dich Schritt für Schritt durch die Frontend-Änderungen, um von `mailto:`-Links auf Backend-gestützte E-Mail-Logik umzustellen.

---

## 📋 PHASE 1: Contact Form (Standard-Kontaktformular)

**Dateien:** `src/services/contactService.ts`, `src/components/forms/ContactForm.tsx`

### ✅ Tasks

- [ ] **1.1 Aktiviere API-Call in `contactService.ts`**
  - Datei: [`src/services/contactService.ts`](../src/services/contactService.ts#L72)
  - Aktuelle Zeile 72-82: Uncomment den API-Call
  - Ersetze `'/api/contact'` durch Jakobs Backend-URL (z.B. `'https://api.vae.systems/contact'`)
  - Entferne die Mock-Fallback-Logik

- [ ] **1.2 Setze `useMockApi={false}` als Default**
  - Datei: [`src/components/forms/ContactForm.tsx`](../src/components/forms/ContactForm.tsx#L29)
  - Zeile 29: Ändere `useMockApi = true` → `useMockApi = false`

- [ ] **1.3 Teste Contact Form**
  - Dev-Server starten: `npm run dev`
  - Gehe zu einer Seite mit Contact Form (z.B. `/contact`)
  - Fülle Formular aus → Submit → Check Success-Message

---

## 📋 PHASE 2: Contact Page – Mail Builder

**Datei:** `src/components/pages/ContactPage.tsx`

### ✅ Tasks

- [ ] **2.1 Ersetze `mailto:`-Link durch API-Call**
  - Datei: [`src/components/pages/ContactPage.tsx`](../src/components/pages/ContactPage.tsx#L338)
  - Zeile 338-362: Entferne `handlePrepareEmail()` (öffnet `mailto:`)
  - Erstelle neue Funktion `handleSubmitForm()` mit POST-Request

**Beispiel-Code:**

```tsx
const handleSubmitForm = async () => {
  // Validation
  const missingFields: string[] = []
  if (!contactName.trim()) missingFields.push('Name')
  if (!companyName.trim()) missingFields.push('Unternehmen')
  if (!userEmail.trim()) missingFields.push('E-Mail') // ← NEU

  if (missingFields.length > 0) {
    setValidationError(`Bitte ausfüllen: ${missingFields.join(', ')}`)
    return
  }

  // Send to backend
  try {
    setIsSubmitting(true)
    const response = await fetch('https://api.vae.systems/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: contactName,
        email: userEmail, // ← NEU
        company: companyName,
        message: notes || 'Kein zusätzlicher Kontext angegeben.',
        source: 'mail-builder',
        intent: selectedIntents.join(', '),
        timeline: timeline,
        companyStage: companyStage,
        collabMode: collabMode,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) throw new Error('API Error')

    const result = await response.json()
    setValidationError('')
    setSuccessMessage('✅ Anfrage gesendet! Sie erhalten in Kürze eine Bestätigung.')
  } catch (error) {
    setValidationError('❌ Fehler beim Senden. Bitte versuchen Sie es erneut.')
  } finally {
    setIsSubmitting(false)
  }
}
```

- [ ] **2.2 Füge E-Mail-Eingabefeld hinzu**
  - Zeile ~860 (im Mail Builder Form-Bereich)
  - Füge Input-Feld für User-E-Mail hinzu (für Auto-Reply)

**Beispiel-Code:**

```tsx
<label className="block">
  <span className="...">Ihre E-Mail (für Rückmeldung) *</span>
  <input
    type="email"
    value={userEmail}
    onChange={e => setUserEmail(e.target.value)}
    placeholder="ihre.email@beispiel.de"
    className="..."
    required
  />
</label>
```

- [ ] **2.3 Füge State-Variable für E-Mail hinzu**
  - Zeile ~147 (bei den anderen State-Variablen)
  - `const [userEmail, setUserEmail] = React.useState('')`

- [ ] **2.4 Ändere Button-Handler**
  - Zeile ~890 (Button "Mail vorbereiten")
  - Ändere `onClick={handlePrepareEmail}` → `onClick={handleSubmitForm}`
  - Ändere Button-Text: "Mail vorbereiten" → "Anfrage senden"

- [ ] **2.5 Füge Loading- und Success-States hinzu**
  - Zeile ~147: `const [isSubmitting, setIsSubmitting] = React.useState(false)`
  - Zeile ~147: `const [successMessage, setSuccessMessage] = React.useState('')`
  - Zeile ~920: Zeige `successMessage` als Pop-up (ähnlich wie `ValidationPopup`)

---

## 📋 PHASE 3: Setup Page – Sparpotenzial

**Datei:** `src/components/pages/SetupPage.tsx`

### ✅ Tasks

- [ ] **3.1 Ersetze `buildSavingsMailto()` durch API-Call**
  - Datei: [`src/components/pages/SetupPage.tsx`](../src/components/pages/SetupPage.tsx#L433)
  - Zeile 433-465: Ersetze `buildSavingsMailto()` durch neue Funktion `handleSubmitSavings()`

**Beispiel-Code:**

```tsx
const handleSubmitSavings = async (userEmail: string) => {
  try {
    const response = await fetch('https://api.vae.systems/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Sparpotenzial-Anfrage', // Kann später durch User-Input ersetzt werden
        email: userEmail,
        company: '', // Optional
        message: 'Ich möchte mein Sparpotenzial berechnen (Setup-Seite).',
        source: 'setup-page',
        calculationData: {
          monthlySaaSCost,
          estimatedSetupCost,
          yearOneSavings,
          toolSelection: Object.keys(toolSelection).filter(t => toolSelection[t]),
        },
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) throw new Error('API Error')

    setMailHintVisible(true)
    setTimeout(() => setMailHintVisible(false), 4500)
  } catch (error) {
    alert('❌ Fehler beim Senden. Bitte versuchen Sie es später erneut.')
  }
}
```

- [ ] **3.2 Passe `LockedSection`-Component an**
  - Datei: [`src/components/ui/LockedSection.tsx`](../src/components/ui/LockedSection.tsx#L35)
  - Füge E-Mail-Eingabefeld im Overlay hinzu
  - Pass `handleSubmitSavings` als Prop

**Beispiel-Code (in LockedSection.tsx):**

```tsx
interface LockedSectionProps {
  // ... existing props
  onUnlock: (email: string) => void  // ← NEU: Email als Parameter
}

const LockedSection: React.FC<LockedSectionProps> = ({ onUnlock, ... }) => {
  const [email, setEmail] = React.useState('')

  return (
    <div className="overlay">
      <input
        type="email"
        placeholder="Ihre E-Mail für Rückmeldung"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={() => onUnlock(email)}>
        {ctaText}
      </button>
    </div>
  )
}
```

- [ ] **3.3 Update Zeile ~1313 (wo `LockedSection` verwendet wird)**
  - Ersetze `onUnlock={handleUnlockContent}` → `onUnlock={handleSubmitSavings}`

---

## 📋 PHASE 4: Shared Service-Logic

**Datei:** `src/services/contactService.ts`

### ✅ Tasks

- [ ] **4.1 Erstelle `sendMailBuilderRequest()`**
  - Füge neue Funktion für Mail Builder hinzu (siehe Requirements-Doc)

- [ ] **4.2 Erstelle `sendSavingsPotentialRequest()`**
  - Füge neue Funktion für Setup-Page hinzu

- [ ] **4.3 Teile gemeinsame Logik**
  - Validierung, Error-Handling, Retry-Logic können geteilt werden

**Beispiel-Struktur:**

```typescript
// src/services/contactService.ts

// Shared helper
const sendContactRequest = async (endpoint: string, payload: any) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'API Error')
  }

  return await response.json()
}

// Mail Builder
export const sendMailBuilderRequest = async (data: {...}) => {
  return sendContactRequest('https://api.vae.systems/contact', {
    ...data,
    source: 'mail-builder',
    timestamp: new Date().toISOString(),
  })
}

// Savings Potential
export const sendSavingsPotentialRequest = async (data: {...}) => {
  return sendContactRequest('https://api.vae.systems/contact', {
    ...data,
    source: 'setup-page',
    timestamp: new Date().toISOString(),
  })
}
```

---

## 📋 PHASE 5: UI/UX-Verbesserungen

### ✅ Tasks

- [ ] **5.1 Ändere Pop-up-Texte**
  - Alle Stellen, wo "Öffnet sich Mail-Client..." steht
  - Ersetze durch: "E-Mail wird versendet..." + Spinner-Icon

- [ ] **5.2 Füge Success-Messages hinzu**
  - Nach erfolgreichem Submit: "✅ Anfrage gesendet! Sie erhalten in Kürze eine Bestätigung."
  - Auto-Dismiss nach 5 Sekunden

- [ ] **5.3 Füge Error-Messages hinzu**
  - Bei API-Error: "❌ Fehler beim Senden. Bitte versuchen Sie es später erneut."
  - Bei Validation-Error: "⚠️ Bitte korrigieren Sie Ihre Eingaben."

- [ ] **5.4 Loading-States**
  - Button: Zeige Spinner während `isSubmitting === true`
  - Disable Button während Submit

**Beispiel-Code:**

```tsx
<button onClick={handleSubmitForm} disabled={isSubmitting} className="btn-primary">
  {isSubmitting ? (
    <>
      <Spinner className="mr-2" />
      Wird gesendet...
    </>
  ) : (
    'Anfrage senden'
  )}
</button>
```

---

## 📋 PHASE 6: Testing

### ✅ Tasks

- [ ] **6.1 Unit-Tests: Validierung**
  - Datei: `src/services/contactService.test.ts` (neu erstellen)
  - Teste `validateContactForm()` mit verschiedenen Inputs

- [ ] **6.2 Integration-Tests: API-Call**
  - Mock `fetch()` und teste Success- / Error-Cases

- [ ] **6.3 E2E-Tests (Playwright)**
  - Datei: `tests/e2e/contact.spec.ts` (neu erstellen)
  - **Test 1:** Contact Form ausfüllen → Submit → Success-Message
  - **Test 2:** Mail Builder ausfüllen → Submit → Success-Message
  - **Test 3:** Setup Page → Sparpotenzial anfordern → Success-Message
  - **Test 4:** Ungültige E-Mail → Error-Message
  - **Test 5:** Rate-Limiting (4. Request) → Error-Message

**Beispiel-Test:**

```typescript
// tests/e2e/contact.spec.ts
import { test, expect } from '@playwright/test'

test('Contact Form: Submit erfolgreich', async ({ page }) => {
  await page.goto('/contact')

  // Fill form
  await page.fill('input[name="name"]', 'Test User')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('textarea[name="message"]', 'Dies ist eine Testnachricht.')

  // Submit
  await page.click('button[type="submit"]')

  // Check success message
  await expect(page.locator('text=Anfrage gesendet')).toBeVisible()
})
```

- [ ] **6.4 Manuelle Tests**
  - Alle 3 Formulare durchgehen
  - Success-Cases + Error-Cases testen
  - Cross-Browser-Test (Chrome, Firefox, Safari)

---

## 📋 PHASE 7: Deployment

### ✅ Tasks

- [ ] **7.1 Update Environment-Variables**
  - Datei: `.env.production`
  - Füge hinzu: `VITE_API_BASE_URL=https://api.vae.systems`

- [ ] **7.2 Build & Preview**
  - `npm run build`
  - `npm run preview`
  - Teste alle Formulare im Production-Build

- [ ] **7.3 Deployment**
  - Deploy auf Staging-Environment
  - Teste gegen Jakobs Backend (Staging-URL)
  - Nach erfolgreichen Tests: Deploy auf Production

---

## 📋 PHASE 8: Monitoring & Cleanup

### ✅ Tasks

- [ ] **8.1 Entferne alte mailto:-Logik**
  - Datei: [`src/config/cta.ts`](../src/config/cta.ts#L85)
  - Prüfe, ob `buildMailto()` noch benötigt wird (für andere Stellen)
  - Falls nicht: Kommentiere aus oder entferne

- [ ] **8.2 Update Datenschutzerklärung**
  - Datei: [`src/content/privacy.tsx`](../src/content/privacy.tsx#L260)
  - Füge Abschnitt hinzu: "Kontaktformulare – Datenverarbeitung"
  - Erwähne: "Daten werden 90 Tage gespeichert, IP-Adressen 7 Tage für Rate-Limiting"

- [ ] **8.3 Analytics (optional)**
  - Füge Event-Tracking hinzu: "contact_form_submit", "mail_builder_submit", "savings_potential_submit"
  - Google Analytics oder Posthog

- [ ] **8.4 Sentry Error-Tracking (optional)**
  - Alle API-Fehler in Sentry loggen

---

## 🔧 HILFREICHE COMMANDS

```bash
# Dev-Server starten
npm run dev

# Build (Production)
npm run build

# Linting
npm run lint

# Type-Check
npm run type-check

# E2E-Tests
npm run test:e2e

# E2E-Tests (UI-Mode)
npm run test:e2e -- --ui
```

---

## 📚 RESSOURCEN

- **Backend-Requirements:** [`docs/EMAIL_BACKEND_REQUIREMENTS.md`](./EMAIL_BACKEND_REQUIREMENTS.md)
- **Aktueller Code:**
  - Contact Service: [`src/services/contactService.ts`](../src/services/contactService.ts)
  - Contact Page: [`src/components/pages/ContactPage.tsx`](../src/components/pages/ContactPage.tsx)
  - Setup Page: [`src/components/pages/SetupPage.tsx`](../src/components/pages/SetupPage.tsx)
- **TypeScript Types:** [`src/types/index.ts`](../src/types/index.ts#L73) (ContactFormData, ContactSubmissionResponse)

---

## ✅ DONE CRITERIA

**Diese Implementierung ist fertig, wenn:**

1. ✅ Alle 3 Formulare (Contact Form, Mail Builder, Setup Page) senden POST-Requests statt `mailto:`
2. ✅ E2E-Tests bestehen (alle Formulare + Error-Cases)
3. ✅ Success- und Error-Messages werden korrekt angezeigt
4. ✅ Loading-States funktionieren (Spinner, Disable-Button)
5. ✅ Production-Deployment erfolgreich + Smoke-Test

---

**Geschätzte Zeit:** 3-4 Tage (inkl. Tests)
**Abhängigkeiten:** Jakob muss Backend-API fertigstellen (Staging-URL)

**Nächster Schritt:** Warte auf Jakobs Staging-URL, dann starte mit Phase 1 ✨
