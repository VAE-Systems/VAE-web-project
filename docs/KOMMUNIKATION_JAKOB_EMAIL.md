# E-Mail-Nachricht an Jakob – Backend-Requirements

**An:** Jakob  
**Von:** Julian  
**Betreff:** E-Mail-Backend-Integration für vae.systems – Requirements & Specs

---

Hey Jakob,

ich habe die Requirements für die E-Mail-Backend-Integration zusammengestellt. Das Ziel ist, die aktuellen `mailto:`-Links auf der Website durch eine Backend-gestützte E-Mail-Logik zu ersetzen.

## 📄 Wichtigste Dokumente

1. **Backend-Requirements (vollständig):**  
   [`docs/EMAIL_BACKEND_REQUIREMENTS.md`](./EMAIL_BACKEND_REQUIREMENTS.md)  
   → Komplette Specs: API-Schema, Validierung, E-Mail-Templates, Rate-Limiting, Security

2. **Frontend-Implementierungs-Checklist:**  
   [`docs/FRONTEND_IMPLEMENTATION_CHECKLIST.md`](./FRONTEND_IMPLEMENTATION_CHECKLIST.md)  
   → Was ich im Frontend ändern muss (wartet auf deine Staging-URL)

---

## 🎯 Quick Summary (TL;DR)

**Was wir brauchen:**

- **1 API-Endpoint:** `POST /api/contact` (JSON-Request → 2 E-Mails versenden)
- **2 E-Mails:**
  1. An VAE (`info@vae.systems`) – Kontaktanfrage mit allen Daten
  2. An User – Auto-Reply mit Bestätigung
- **Security:** Rate-Limiting (3 Requests/15min), Validierung, CORS, XSS-Schutz
- **E-Mail-Provider:** Empfehlung ist **Resend** (einfache Dart-Integration, DSGVO-konform)

---

## 📋 Request-Format (Beispiel)

```json
POST /api/contact
{
  "name": "Max Mustermann",
  "email": "max@beispiel.de",
  "company": "Beispiel GmbH",
  "message": "Wir interessieren uns für KI-Automatisierung.",
  "source": "mail-builder",
  "intent": "automation",
  "timeline": "soon",
  "companyStage": "scaleup",
  "collabMode": "project",
  "timestamp": "2026-01-07T14:30:00.000Z"
}
```

**Response (Success):**

```json
{
  "success": true,
  "data": {
    "submissionId": "contact_1704627340123_abc123def",
    "confirmationSent": true,
    "estimatedResponse": "24-48 Stunden"
  },
  "timestamp": "2026-01-07T14:30:00.000Z"
}
```

---

## 🔧 Was du technisch bauen musst

### 1. API-Endpoint

- **Route:** `POST /api/contact`
- **Input:** JSON (siehe Schema im Requirements-Doc)
- **Output:** JSON (Success oder Error)

### 2. Validierung

- **Pflichtfelder:** `name` (2-100 Zeichen), `email` (valide E-Mail), `message` (10-2000 Zeichen)
- **Optionale Felder:** `company`, `phone`, `subject`, `intent`, `timeline`, etc.
- **Validierungs-Errors:** Strukturiertes JSON (siehe Requirements-Doc, Sektion 3.1)

### 3. E-Mail-Versand

- **E-Mail 1:** An `info@vae.systems` – Kontaktanfrage (HTML + Plain-Text)
- **E-Mail 2:** An User (`{email}`) – Auto-Reply-Bestätigung (HTML + Plain-Text)
- **Templates:** Siehe Requirements-Doc, Sektion 3.3

### 4. Rate-Limiting

- **Per IP:** Max. 3 Requests / 15 Minuten
- **Per E-Mail:** Max. 5 Requests / 24 Stunden
- **Response bei Limit:** HTTP 429, `{ "error": { "code": "RATE_LIMIT_EXCEEDED", "retryAfter": 900 } }`

### 5. Security

- **CORS:** Nur Requests von `https://vae.systems` zulassen
- **XSS-Schutz:** Escape HTML-Tags in allen String-Feldern
- **HTTPS-Only:** Keine Plaintext-Kommunikation

---

## 📧 E-Mail-Provider-Empfehlung

**Resend** (https://resend.com)

- Modern, einfache API
- Gute Dart-Unterstützung (oder REST-API via HTTP)
- DSGVO-konform
- Günstiger als SendGrid/Postmark

**Alternative:** SendGrid (falls du schon Erfahrung damit hast)

---

## 🧪 Deployment & Staging

**Bitte gib mir:**

1. **Staging-URL** (z.B. `https://staging-api.vae.systems/contact`)
2. **API-Dokumentation** (falls du von meinem Schema abweichst)
3. **Credentials** (falls ich testen soll)

**Dann kann ich:**

- Frontend anpassen (Contact Form, Mail Builder, Setup Page)
- E2E-Tests schreiben
- Gegen dein Staging-Backend testen

---

## ⏱️ Timeline

**Deine Seite (Backend):**

- API-Endpoint: ~2-3 Tage
- Tests: ~1 Tag
- Staging-Deployment: ~0.5 Tag

**Meine Seite (Frontend):**

- Warte auf Staging-URL
- Frontend-Anpassung: ~1-2 Tage
- E2E-Tests: ~1 Tag

**Zusammen:** ~7-10 Tage bis Production

---

## 🤝 Zusammenarbeit

**Was ich von dir brauche:**

1. ✅ Bestätigung, dass du die Requirements verstanden hast
2. ✅ Feedback, falls etwas unklar ist (insbesondere E-Mail-Templates, Rate-Limiting)
3. ✅ Staging-URL, wenn Backend fertig ist

**Was du von mir bekommst:**

- Frontend-Code, der gegen deine API läuft
- E2E-Tests, die wir gemeinsam validieren können

---

## 📞 Offene Fragen an dich

1. **E-Mail-Provider:** Welchen Provider möchtest du nutzen? (Empfehlung: Resend)
2. **Rate-Limiting:** Sind 3 Requests / 15min OK? Oder lieber anders?
3. **Auto-Reply:** Sofort versenden oder zeitverzögert (z.B. 1min)?
4. **Logging:** Wo sollen Logs gespeichert werden? (Dateisystem, Datenbank, Sentry?)
5. **Deployment:** Wo deployest du das Backend? (Hetzner, Cloud-Provider?)

---

## 📚 Ressourcen

- **Vollständige Backend-Requirements:** [`docs/EMAIL_BACKEND_REQUIREMENTS.md`](./EMAIL_BACKEND_REQUIREMENTS.md) (~40 Seiten, sehr detailliert)
- **Frontend-Checklist:** [`docs/FRONTEND_IMPLEMENTATION_CHECKLIST.md`](./FRONTEND_IMPLEMENTATION_CHECKLIST.md)
- **Aktueller Frontend-Code:**
  - Contact Service: [`src/services/contactService.ts`](../src/services/contactService.ts#L72)
  - Contact Page: [`src/components/pages/ContactPage.tsx`](../src/components/pages/ContactPage.tsx#L358)
  - Setup Page: [`src/components/pages/SetupPage.tsx`](../src/components/pages/SetupPage.tsx#L464)

---

## 🚀 Next Steps

1. **Du:** Liest Requirements-Doc durch → Feedback/Fragen
2. **Du:** Baust Backend-API + Tests
3. **Du:** Deployest auf Staging + schickst mir URL
4. **Ich:** Passe Frontend an + schreibe E2E-Tests
5. **Zusammen:** Integration-Testing + Production-Deployment

---

Falls irgendwas unklar ist oder du Feedback hast, melde dich einfach! Ich bin flexibel bei Details (z.B. E-Mail-Templates, Rate-Limits), solange die Grundstruktur passt.

Beste Grüße,  
Julian

---

**P.S.:** Ich habe bewusst sehr detailliert dokumentiert, damit wir beide eine klare Basis haben und später nicht im Code suchen müssen. Falls dir etwas zu viel ist, sag Bescheid – ich kann's kürzen 😄
