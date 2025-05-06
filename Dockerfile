# Base image with Node.js 18
FROM node:18

# Set environment variables
ENV NODE_ENV=production \
    NPM_CONFIG_PRODUCTION=false
# Create app directory
WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the rest of the application
COPY . .

# Build the application
RUN --mount=type=bind,source=/data/coolify/applications/rosowsoo0oscksk0ssoksg48/data/lib,target=/app/src/lib \
    --mount=type=bind,source=/data/coolify/applications/rosowsoo0oscksk0ssoksg48/data/static/thumbnails,target=/app/static \
    npm run build

# Expose app port (assumed; adjust if needed)
EXPOSE 3000

# Run the app
CMD ["node", "build"]
