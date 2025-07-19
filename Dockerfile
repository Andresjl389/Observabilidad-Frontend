# Etapa 1: build
FROM node:18-alpine AS build

WORKDIR /app
COPY . .

# Toma la variable en tiempo de build (NO en tiempo de ejecución)
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Asegúrate de que CRA/Vite use la variable correctamente
RUN npm install && npm run build

# Etapa 2: nginx para servir la app
FROM nginx:alpine

# Configura nginx para usar el puerto 8080 (requerido por Cloud Run)
COPY nginx.conf /etc/nginx/nginx.conf

# Copia el build de React desde la etapa anterior
COPY --from=build /app/build /usr/share/nginx/html

# Expón el puerto que Cloud Run espera
EXPOSE 8080

# Arranca nginx
CMD ["nginx", "-g", "daemon off;"]
