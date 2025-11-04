# Multi-stage Dockerfile for Solar Panda application
# Stage 1: Build frontend and backend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build frontend (Vite) and backend (TypeScript)
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --production

# Copy built assets from builder
COPY --from=builder /app/dist ./dist

# Copy static files if any
COPY --from=builder /app/public ./public

# Expose port (default 3000, can be overridden by PORT env var)
EXPOSE 3000

# Set production environment
ENV NODE_ENV=production

# Start the server
CMD ["node", "dist/index.js"]
