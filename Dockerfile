# Stage 1: Build the Angular app in a node environment
FROM node:20-alpine as build

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar archivos de configuración de pnpm y archivos de proyecto
COPY pnpm-lock.yaml ./
COPY package.json ./

# Instalar dependencias usando pnpm
RUN pnpm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación
RUN pnpm run build

# Stage 2: Serve the app with nginx
FROM nginx:alpine

# Remove the default server definition
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy build output from the 'build' stage
COPY --from=build /app/dist/fuse /usr/share/nginx/html

EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
CMD ["sh", "-c", "envsubst < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]
