FROM node:lts-slim AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run clean
RUN npm run build
# Our Second stage, that creates an image for production
FROM node:lts-slim AS runner
WORKDIR /app
COPY --from=builder ./app/build ./build
COPY package* ./
RUN npm ci --production
CMD npm start