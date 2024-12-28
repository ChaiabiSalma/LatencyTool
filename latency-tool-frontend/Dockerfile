# Étape 1 : Construction du frontend avec Node.js
FROM node:18 AS builder

WORKDIR /app

# Installer les dépendances et construire le frontend
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

# Étape 2 : Servir avec Nginx
FROM nginx:alpine

# Copier les fichiers de build dans Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Exposer le port du serveur
EXPOSE 80