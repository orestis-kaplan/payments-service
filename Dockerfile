# Install dependencies only when needed
FROM node:lts-slim AS deps
WORKDIR /payments-service
COPY package.json package-lock.json ./ 
RUN npm ci

# Final image
FROM node:lts-slim AS builder
WORKDIR /payments-service
ENV NODE_ENV=production

COPY --from=deps /payments-service/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:lts-slim AS runner
WORKDIR /payments-service

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --home /home/paymentsuser --uid 1001 paymentsuser

# Copy built artifacts and dependencies
COPY --from=builder --chown=paymentsuser:nodejs /payments-service/package.json ./package.json
COPY --from=builder --chown=paymentsuser:nodejs /payments-service/build ./build
COPY --from=builder --chown=paymentsuser:nodejs /payments-service/node_modules ./node_modules

USER paymentsuser

# Health check
# HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
#     CMD wget --quiet --tries=1 --spider https://kaplan-is.space:3000/actuator/health || exit 1
# RUN npm ci --only=production

# Command to run the application
CMD ["npm", "run", "start"]