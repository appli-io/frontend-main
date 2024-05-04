# Stage 1: Build the Angular app in a node environment
FROM node:20-alpine as build

WORKDIR /app

COPY package.json package-lock.yaml ./

RUN npm install

COPY . .

RUN npm cache clean --force

RUN npm run build

# Stage 2: Serve the app with nginx
FROM nginx:alpine

ENV NODE_ENV production

# Remove the default server definition
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy build output from the 'build' stage
COPY --from=build /app/dist/fuse /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
