# Etapa 1: build
FROM node:18-alpine AS build

WORKDIR /app
COPY . .

# Para usar una variable de entorno en tiempo de build
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm install && npm run build

# Etapa 2: nginx para servir
FROM nginx:alpine

# Cambia la configuración de nginx para usar el puerto 8080
COPY nginx.conf /etc/nginx/nginx.conf

# Copia archivos compilados desde la etapa anterior
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
