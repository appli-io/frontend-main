# Stage 1: Build the Angular app in a node environment
FROM node:20-alpine as build

WORKDIR /app

ARG SENTRY_AUTH_TOKEN=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

ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN

COPY package*.json ./

RUN npm ci

COPY . ./

RUN npm run build

# Stage 2: Serve the app with nginx
FROM caddy:alpine

ENV NODE_ENV production

COPY --from=build /app/dist/fuse/browser /dist

COPY Caddyfile /etc/caddy/Caddyfile

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]

