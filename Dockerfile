## Production-ready multi-stage Dockerfile for Next.js applications
# Builder stage
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency manifests and install production+dev dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application and build
COPY . ./
RUN npm run build

# Runner stage
FROM node:22-alpine AS runner

# Set working directory
WORKDIR /app

# Enable production environment and disable telemetry
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

# Install any system dependencies needed at runtime
RUN apk add --no-cache libc6-compat

# Copy minimal output from builder
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Expose default Next.js port
EXPOSE 3000
ENV PORT=3000

# Application-specific environment variable
# This must be provided at runtime (e.g., via GitHub Actions)
ARG NEXT_PUBLIC_BOOKINGS_API_HOST
ENV NEXT_PUBLIC_BOOKINGS_API_HOST=${NEXT_PUBLIC_BOOKINGS_API_HOST}

# Start the server
CMD ["node", "server.js"]
