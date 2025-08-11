Workflow: Check Folder Structure
Purpose: Überprüft, ob Dateien außerhalb der erlaubten Ordner /components, /pages, /content, /assets liegen, und listet sie auf.
Trigger: Manuell oder vor Commit

Steps:
1. Scan: Suche alle Dateien im Projektordner außer node_modules und .git.
2. Filter: Zeige nur Dateien, die nicht in /components, /pages, /content, /assets liegen.
3. Output: Liste diese Dateien mit Pfad und Dateiname auf.
4. Optional Fix: Biete an, jede Datei in einen der erlaubten Ordner zu verschieben.