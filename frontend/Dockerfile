# ==========================================
# Stage 1: Build React/Vite application
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency files first for better Docker caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source
COPY . .

# Build production application
RUN npm run build


# ==========================================
# Stage 2: Serve with Nginx
# ==========================================
FROM nginx:alpine

# Remove default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy production build
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx listens on port 80
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]