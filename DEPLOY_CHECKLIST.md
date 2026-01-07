# Deploy-Checklist für Komodo

## ✅ VOR DEM PUSH

- [x] Build lokal getestet (`npm run build` → 4.5s, erfolgreich)
- [x] Config-Fehler behoben (vite.config.ts)
- [x] SEO optimiert (Schema.org, Geo, Email)
- [x] Git commit erstellt
- [ ] **JETZT:** Push zu GitHub

## 📦 PUSH ABLAUF

```bash
# 1. Push zu GitHub
git push origin vae-consulting-main

# 2. Komodo zieht automatisch neuen Code (wenn Webhook eingerichtet)
# ODER manuell auf Komodo:
# - SSH in Server
# - cd /path/to/vae-web-project
# - git pull origin vae-consulting-main
```

## 🐳 DOCKER BUILD AUF KOMODO

### Automatisch (wenn Komodo Auto-Deploy configured):

Komodo erkennt neuen Code → triggert `docker compose build` → startet Container neu

### Manuell (falls nötig):

```bash
# SSH auf Komodo-Server
ssh user@komodo-server

# Navigate to project
cd /path/to/vae-web-project

# Pull latest code
git pull origin vae-consulting-main

# Rebuild Docker Image
docker compose build

# Restart Container
docker compose up -d

# Check logs
docker compose logs -f vae-web
```

## 🔍 NACH DEM DEPLOY - VALIDIERUNG

### 1. Container läuft?

```bash
docker compose ps
# → STATUS: Up (healthy)
```

### 2. HTML wird served?

```bash
curl https://vae.systems | head -50
# → Sollte <html lang="de"> und Schema.org zeigen
```

### 3. SEO-Tags vorhanden?

```bash
curl -s https://vae.systems | grep -E "(application/ld\+json|og:title|geo.region)"
# → Sollte Schema.org + OG-Tags + Geo-Tags zeigen
```

### 4. Google kann crawlen?

- Gehe zu [Google Search Console](https://search.google.com/search-console)
- URL-Prüfung: `https://vae.systems`
- "Indexierung beantragen"

### 5. robots.txt + sitemap.xml erreichbar?

- https://vae.systems/robots.txt → Sollte "Sitemap: https://vae.systems/sitemap.xml" zeigen
- https://vae.systems/sitemap.xml → Sollte XML mit allen URLs zeigen

## 🐛 TROUBLESHOOTING

### Problem: Container startet nicht

```bash
docker compose logs vae-web
# → Check auf Fehler
```

### Problem: 404 auf allen Routen

→ Nginx SPA-Routing fehlt → Check `deploy/nginx.conf`:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Problem: SEO-Tags fehlen

→ Browser-Cache → Strg+F5 oder Incognito-Mode testen

### Problem: Google crawlt nicht

→ robots.txt blockiert? → Check `User-agent: *` → `Allow: /`

## 📊 GOOGLE INDEXIERUNG (nach Deploy)

### Schritt 1: Search Console Setup

1. Gehe zu [Google Search Console](https://search.google.com/search-console)
2. Property hinzufügen: `vae.systems`
3. Verifizierung: HTML-Tag in `<head>` (oder DNS TXT-Record)

### Schritt 2: Sitemap einreichen

1. In Search Console → Sitemaps
2. Neue Sitemap: `https://vae.systems/sitemap.xml`
3. → Google crawlt innerhalb 24-48h

### Schritt 3: Monitoring

- **Search Console:** Indexierte Seiten, Suchbegriffe, Fehler
- **PageSpeed Insights:** Performance-Score
- **Rich Results Test:** Schema.org Validierung

## ⏱️ TIMELINE: Was passiert wann?

| Zeitpunkt    | Was passiert                 | Status             |
| ------------ | ---------------------------- | ------------------ |
| **Jetzt**    | Push zu GitHub               | Bereit             |
| **+5 Min**   | Komodo zieht Code            | Auto/Manuell       |
| **+10 Min**  | Docker Build läuft           | 5-10 Min           |
| **+15 Min**  | Container läuft              | Live!              |
| **+1-2h**    | Google crawlt erste Seiten   | Discovery          |
| **+24-48h**  | Google indexiert Hauptseiten | Indexing           |
| **+1 Woche** | Erste Rankings sichtbar      | Long-Tail Keywords |

## ✅ SUCCESS CRITERIA

Nach Deploy sollte das funktionieren:

- ✅ Website lädt unter https://vae.systems
- ✅ Alle Routen funktionieren (/contact, /services, etc.)
- ✅ SEO-Meta-Tags im `<head>` sichtbar
- ✅ Schema.org im HTML-Source
- ✅ robots.txt + sitemap.xml erreichbar
- ✅ Mobile-responsive (Chrome DevTools)
- ✅ Core Web Vitals grün (PageSpeed Insights)

## 🚀 NÄCHSTE SCHRITTE (nach erfolgreichem Deploy)

1. **Google My Business** erstellen (kritisch für lokale SEO!)
2. **Google Search Console** einrichten + Sitemap einreichen
3. **Erste Blog-Posts** schreiben (siehe SEO_ROADMAP.md)
4. **Backlinks** aufbauen (GitHub, LinkedIn, etc.)

---

**Ready to deploy? Let's go! 🎯**
