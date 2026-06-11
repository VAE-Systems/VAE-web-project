# 🚀 BeratungPage - Quick Reference

> **Route:** `/services/beratung`
> **Status:** ✅ Production-Ready
> **Komponente:** `src/components/pages/BeratungPage.tsx`

---

## 📍 Navigation

**Desktop:**
Header → Services → Strategische Beratung

**Direkt:**
`https://vae-systems.com/services/beratung`

---

## 🎯 Conversion-Flow

```
Hero (CTA) → Calendly-Popup
    ↓
FAQ → Letzte Zweifel ausräumen
    ↓
Final CTA → Calendly-Popup
```

---

## 🔧 Quick-Edit-Guide

### CTA-Button ändern

**Calendly-URL:** Zeile 35

```tsx
window.open('https://nc.intern.vae.systems/apps/calendar/appointment/RgxJERqNkfZz', '_blank')
```

### Pricing anpassen

**Section 6:** Zeilen 370–410

```tsx
{
  title: 'Erstberatung',
  price: 'Kostenlos', // ← Hier ändern
  description: '45 Minuten Video-Call',
  // ...
}
```

### FAQ hinzufügen

**Section 7:** Zeilen 450–470

```tsx
{
  question: 'Neue Frage?',
  answer: 'Antwort hier.'
}
```

---

## 🎨 Design-Tokens

```tsx
Primary-Color:     #00ffa5 (Türkis)
Background-Dark:   #1a1a1a
Background-Light:  #f8f8f8
Border:            #e0e0e0
Font:              Inter, Poppins
```

---

## 📱 Breakpoints

```
Mobile:   < 640px
Tablet:   640px - 1024px
Desktop:  > 1024px
```

---

## 🧪 Testing-Checkliste

- [ ] Calendly-Popup öffnet korrekt
- [ ] Smooth-Scroll zu Prozess-Section
- [ ] Accordion öffnet/schließt
- [ ] Hover-Effekte auf Cards
- [ ] Mobile: Buttons vertikal
- [ ] SEO-Meta-Tags gesetzt

---

## 🔗 Wichtige Dateien

| Datei              | Zweck               |
| ------------------ | ------------------- |
| `BeratungPage.tsx` | Haupt-Komponente    |
| `App.tsx`          | Routing-Integration |
| `HeaderModern.tsx` | Navigation-Link     |
| `Seo.tsx`          | Meta-Tags-Component |

---

## 📊 Metriken (KPIs)

**Zielwerte:**

- Conversion-Rate: > 3%
- Bounce-Rate: < 40%
- Avg. Time on Page: > 2min
- CTA-Click-Rate: > 10%

**Tracking:**

- Google Analytics: `/services/beratung`
- Events: `calendly_open`, `process_scroll`, `faq_toggle`

---

## 🚨 Troubleshooting

### Calendly öffnet nicht?

**Check:**

1. Popup-Blocker deaktiviert?
2. URL korrekt? (`nc.intern.vae.systems...`)
3. Browser-Konsole für Fehler prüfen

### Smooth-Scroll funktioniert nicht?

**Check:**

1. Element-ID `process-flow` existiert?
2. `scrollIntoView` unterstützt? (IE11 ❌)

### Fade-in-Animation fehlt?

**Check:**

1. Klasse `fade-in-on-scroll` vorhanden?
2. IntersectionObserver läuft? (useEffect)

---

## 🔄 Update-Workflow

1. **Änderung durchführen** (z.B. Pricing)
2. **Fehler-Check:** `npm run build`
3. **Lokal testen:** `npm run dev`
4. **Commit:** `git commit -m "fix(beratung): Update pricing"`
5. **Deploy:** `git push origin main`

---

## 📞 Support

**Code-Review:**
Julian Dini (@juliandini)

**Fragen:**
VAE-Dev-Channel (Slack/Discord)

**Bug-Report:**
GitHub Issues → Label: `page:beratung`

---

**Last Updated:** 07.11.2025
**Version:** 1.0.0
