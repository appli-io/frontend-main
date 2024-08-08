# Stage 1: Build the Angular app in a node environment
FROM node:20-alpine as build

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . ./

ENV SENTRY_AUTH_TOKEN $SENTRY_AUTH_TOKEN

RUN yarn run build

# Stage 2: Serve the app with nginx
FROM caddy:alpine

ENV NODE_ENV production

COPY --from=build /app/dist/fuse/browser /dist

COPY Caddyfile /etc/caddy/Caddyfile

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]

