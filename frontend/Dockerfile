# Stage 1: Build the React application using Node
FROM node:20-alpine AS build

WORKDIR /app

# Copy package management files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your React frontend application code
COPY . .

# Run the production build command (creates the optimized 'dist' folder)
RUN npm run build

# Stage 2: Serve the compiled static assets using Nginx
FROM nginx:alpine

# 💥 FIX: Copy our custom configuration file into Nginx config folder
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the compiled assets from Stage 1 into the Nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to handle standard web traffic
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]