FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json first (to optimize build caching)
COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 3000

# Spustenie servera
CMD ["node", "src/server.js"]
