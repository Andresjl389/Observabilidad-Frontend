# Etapa 1: build
FROM node:18-alpine AS build

WORKDIR /app
COPY . .

# Usa la configuración de producción
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm install && npm run build

# Etapa 2: nginx para servir
FROM nginx:alpine

# Borra contenido por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia archivos compilados desde la etapa anterior
COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto que Cloud Run usa
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
