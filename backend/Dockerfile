# Build
FROM node:16-alpine3.11 AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /tmp/ramranch-api

COPY package*.json tsconfig.json ./
RUN npm ci

COPY src ./src
RUN npm run build && rm build/**/*.d.ts build/tsbuildinfo

# Run
FROM node:16-alpine3.11 AS runner

WORKDIR /opt/ramranch-api

COPY --from=builder /tmp/ramranch-api/node_modules ./node_modules
COPY --from=builder /tmp/ramranch-api/build ./
COPY package.json ./
COPY dev_data ./dev_data

CMD [ "node", "index.js" ]
