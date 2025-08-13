# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Passe den Build-Befehl an dein Setup an (npm/yarn/pnpm)
RUN npm run build

# --- Serve stage ---
FROM nginx:1.27-alpine
# Nginx-Konfiguration
COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf
# Runtime-Config: kleines Entry-Script generiert /usr/share/nginx/html/config.js
COPY ./deploy/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
# Statisches Frontend
COPY --from=build /app/dist /usr/share/nginx/html
# HEALTHCHECK
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1
EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]