# frontend
FROM node:16-alpine3.11 AS builder

# Install dependencies
WORKDIR /tmp/ramranch-web

COPY frontend/package.json frontend/yarn.lock frontend/tsconfig.json ./
RUN mkdir ../lib && yarn install

########################################
# ramranch-lib
WORKDIR /tmp/lib

# Install dependencies
COPY lib/package*.json lib/tsconfig.json ./
RUN npm ci

# Build
COPY lib/src ./src
RUN npm run build
########################################

WORKDIR /tmp/ramranch-web
# Use ramranch-lib
RUN yarn upgrade ramranch-lib

# Build frontend
COPY frontend/public ./public
COPY frontend/src ./src
ARG REACT_APP_API_PREFIX
RUN yarn build

# Run
FROM nginx:1.21.1-alpine AS runner

COPY --from=builder /tmp/ramranch-web/build /usr/share/nginx/html
COPY frontend/nginx-local.conf /etc/nginx/nginx.conf
