# Stage 1: Build the Angular app in a node environment
FROM node:20-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . ./
# echo all environment variables
RUN printenv


ENTRYPOINT echo $SENTRY_AUTH_TOKEN

RUN SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN npm run build


# Stage 2: Serve the app with nginx
FROM caddy:alpine

ENV NODE_ENV production

COPY --from=build /app/dist/fuse/browser /dist

COPY Caddyfile /etc/caddy/Caddyfile

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]

