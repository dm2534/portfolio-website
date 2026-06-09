# Build stage
FROM node:20-slim AS build
WORKDIR /app

# Copy lockfile and package.json first for better layer caching
# Use npm ci for a faster, more reliable, and secure production install
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the code
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html
# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]