# Etapa 1: build
FROM node:18-alpine AS build

WORKDIR /app
COPY . .

# Define un argumento de build
ARG REACT_APP_API_URL

# Exporta como variable de entorno para que React pueda leerla
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm install && npm run build

# Etapa 2: nginx para servir
FROM nginx:alpine

# Borra contenido por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia archivos compilados desde la etapa anterior
COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto que Cloud Run usa
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
