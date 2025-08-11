Workflow: SEO Metadata Check
Purpose: Stellt sicher, dass jede Seite Title & Meta-Description hat.
Trigger: Vor Deployment

Steps:
1. Scan: Finde alle Seiten in /pages und /components/pages.
2. Check: Prüfe auf <Seo>-Komponente oder <head>-Block.
3. Output: Liste Seiten ohne Meta-Tags.
4. Optional Fix: Füge Standard-SEO-Meta automatisch ein.