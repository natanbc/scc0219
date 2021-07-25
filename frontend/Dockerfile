# Build
FROM node:16-alpine3.11 AS builder

WORKDIR /tmp/ramranch-web

COPY package.json yarn.lock ./
RUN yarn install

COPY public ./public
COPY src ./src
RUN yarn build 

# Run
FROM nginx:1.21.1-alpine AS runner

COPY --from=builder /tmp/ramranch-web/build /usr/share/nginx/html
