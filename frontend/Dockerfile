# Build
FROM node:16-alpine3.11 AS builder

WORKDIR /tmp/ramranch-web

COPY package.json yarn.lock tsconfig.json ./
RUN yarn install

COPY public ./public
COPY src ./src
ARG REACT_APP_API_PREFIX
RUN yarn build

# Run
FROM nginx:1.21.1-alpine AS runner

COPY --from=builder /tmp/ramranch-web/build /usr/share/nginx/html
COPY nginx-local.conf /etc/nginx/nginx.conf
