#!/bin/bash

# Script zum Löschen ungenutzter Bilder
# Erstellt am: 9. Januar 2026

echo "🗑️  Lösche ungenutzte Bilder..."
echo ""

OPTIMIZED_DIR="/Users/juliandini/Dev/vae/vae_intern/web_projects/vae-web-project/public/images/optimized"

# Array mit zu löschenden Dateien
UNUSED_FILES=(
  "Background-3-Wege.png"
  "Background-3-Wege.webp"
  "Background-3Wege-ausgeschnitten.png"
  "Background-3Wege-ausgeschnitten.webp"
  "Background-Für-Hero-Leitung.png"
  "Background-Für-Hero-Leitung.webp"
  "Bild-von-OpenProject-Ticketing-Software-1.jpg"
  "Bild-von-OpenProject-Ticketing-Software-1.webp"
  "Bild-von-OpenProject-Ticketing-Software-2.jpg"
  "Bild-von-OpenProject-Ticketing-Software-2.webp"
  "Hand-mit-Brille-zeigt-auf-Text-an-Leinwand-1.jpg"
  "Hand-mit-Brille-zeigt-auf-Text-an-Leinwand-1.webp"
  "Hand-mit-Brille-zeigt-auf-Text-an-Leinwand-3.jpg"
  "Hand-mit-Brille-zeigt-auf-Text-an-Leinwand-3.webp"
  "Hand-mit-Brille-zeigt-auf-Text-an-Leinwand-4.jpg"
  "Hand-mit-Brille-zeigt-auf-Text-an-Leinwand-4.webp"
  "Hand-mit-Brille-zeigt-auf-Text-an-Leinwand-5.jpg"
  "Hand-mit-Brille-zeigt-auf-Text-an-Leinwand-5.webp"
  "Hero-Infrastruktur.jpg"
  "Hero_langfristige.JPG.jpg"
  "Hero_langfristige.JPG.webp"
  "Jakob-Leitung-Aufnahme.png"
  "Jakob-Leitung-Aufnahme.webp"
  "Jakob-Portrait-2-Lächelnd.png"
  "Jakob-Portrait-2-Lächelnd.webp"
  "Jakob-Portrait-Leitung-mit-Schatten.png"
  "Jakob-Portrait-Leitung-mit-Schatten.webp"
  "Jakob-Portrait-Leitung.png"
  "Jakob-Portrait-Leitung.webp"
  "Jakob-steht-vor-Leinwand-erklärt-und-zeigt-auf-Texte-seitliche-Ansicht.jpg"
  "Jakob-steht-vor-Leinwand-erklärt-und-zeigt-auf-Texte-seitliche-Ansicht.webp"
  "Julian-Portrait-2-weniger-gut.png"
  "Julian-Portrait-2-weniger-gut.webp"
  "Julian-Portrait-Leitung-mit-Schatten.png"
  "Julian-Portrait-Leitung-mit-Schatten.webp"
  "Julian-Portrait-Leitung-ohne-Schatten.png"
  "Julian-Portrait-Leitung-ohne-Schatten.webp"
  "P1010798.JPG.jpg"
  "ausgeschnitten-Hände-Programmieren-am-Laptop-bw.png"
  "ausgeschnitten-Hände-Programmieren-am-Laptop-bw.webp"
  "ausgeschnitten-Hände-Programmieren-am-Laptop.png"
  "ausgeschnitten-Hände-Programmieren-am-Laptop.webp"
)

DELETED_COUNT=0
NOTFOUND_COUNT=0

for file in "${UNUSED_FILES[@]}"; do
  filepath="$OPTIMIZED_DIR/$file"
  if [ -f "$filepath" ]; then
    rm "$filepath"
    echo "✓ Gelöscht: $file"
    ((DELETED_COUNT++))
  else
    echo "⚠️  Nicht gefunden: $file"
    ((NOTFOUND_COUNT++))
  fi
done

echo ""
echo "✅ Fertig!"
echo "   Gelöscht: $DELETED_COUNT Dateien"
echo "   Nicht gefunden: $NOTFOUND_COUNT Dateien"
echo ""

# Raw-Ordner leeren (alle Dateien außer .DS_Store)
RAW_DIR="/Users/juliandini/Dev/vae/vae_intern/web_projects/vae-web-project/public/images/raw"
echo "🗑️  Lösche Raw-Dateien (optimierte Versionen existieren)..."

RAW_COUNT=0
for file in "$RAW_DIR"/*; do
  if [ -f "$file" ] && [ "$(basename "$file")" != ".DS_Store" ]; then
    rm "$file"
    echo "✓ Gelöscht: $(basename "$file")"
    ((RAW_COUNT++))
  fi
done

echo ""
echo "✅ Raw-Ordner bereinigt: $RAW_COUNT Dateien gelöscht"
echo ""

# Größe vorher/nachher
echo "📊 Speicherplatz-Analyse..."
du -sh "$OPTIMIZED_DIR" 2>/dev/null || echo "Optimized: Ordner nicht gefunden"
du -sh "$RAW_DIR" 2>/dev/null || echo "Raw: Ordner nicht gefunden"
