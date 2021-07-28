# Build
FROM node:16-alpine3.11 AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /tmp/ramranch-api

COPY backend/package*.json backend/tsconfig.json ./
RUN mkdir ../lib && npm ci

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

WORKDIR /tmp/ramranch-api

RUN npm update ramranch-lib

COPY backend/src ./src
RUN npm run build && rm build/**/*.d.ts build/tsbuildinfo

# Run
FROM node:16-alpine3.11 AS runner

WORKDIR /opt/ramranch-api

COPY --from=builder /tmp/ramranch-api/node_modules ./node_modules
COPY --from=builder /tmp/ramranch-api/build ./
COPY backend/package.json ./
COPY backend/dev_data ./dev_data

CMD [ "node", "index.js" ]
