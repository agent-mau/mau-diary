# 1. Build Stage
FROM docker.io/node:20-alpine AS builder

WORKDIR /app

# Paket-Definition kopieren und installieren
COPY package*.json ./
RUN npm ci

# Restlichen Source-Code kopieren
COPY . .

# Anwendung bauen (erzeugt den statischen /out Ordner durch output: 'export' in next.config.ts)
RUN npm run build

# 2. Production Stage
FROM docker.io/nginx:alpine

# Statischen Output in Nginx kopieren
COPY --from=builder /app/out /usr/share/nginx/html

# Nginx muss Port 80 freigeben
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
