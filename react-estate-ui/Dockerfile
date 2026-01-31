# 1. Use Node.js LTS
FROM node:20-slim

# 2. Working dir
WORKDIR /app

# 3. Install deps
COPY package*.json ./
RUN npm install

# 4. Copy source
COPY . .

# since we are running on vite , expose this PORT 
EXPOSE 5000

#run this app locally
CMD ["npm" , "run" , "dev"]

# 5. Build React app
RUN npm run build

# 6. Serve with Nginx
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
