###################
# BUILD FOR LOCAL DEVELOPMENT
###################

# No se usa NGINX en desarrollo local generalmente, se utiliza el servidor de desarrollo de Angular CLI
FROM node:20-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency files.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command for consistency with the lock file.
RUN npm ci

# Copy the application source files.
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# Installing Angular CLI globally to use for building the project
RUN npm install -g @angular/cli && npm ci

COPY --chown=node:node . .

# Build the Angular application in production mode
RUN ng build --configuration production

###################
# PRODUCTION
###################

FROM nginx:alpine As production

# Copy custom NGINX configuration (if you have any)
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from the 'build' stage
COPY --chown=node:node --from=build /usr/src/app/dist/fuse /usr/share/nginx/html

# Expose port 80 to the outside
EXPOSE 80

# Start Nginx and keep the process in the foreground
CMD ["nginx", "-g", "daemon off;"]
