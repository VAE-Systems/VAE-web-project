#!/bin/sh
# Schreibe ggf. Umgebungsvariablen in config.js (optional)
echo "window.RUNTIME_CONFIG = {};" > /usr/share/nginx/html/config.js
exec "$@"
