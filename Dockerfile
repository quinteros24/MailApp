# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración de npm
COPY package*.json ./

# Instalar TODAS las dependencias (incluyendo devDependencies para el build)
RUN npm install 

# Copiar el código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build --prod

# ... el resto de tu Dockerfile (Etapa 2 con Nginx) ...