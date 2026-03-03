# 1️⃣ Use a lightweight Node.js base image
FROM node:20-alpine AS builder

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy package files
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy rest of your source code
COPY . .

# 6️⃣ Generate Prisma client
RUN npx prisma generate

# 7️⃣ Build your app (if using TypeScript)
RUN npm run build

# ----------- Production stage -----------
FROM node:20-alpine

WORKDIR /app

# Copy only what's needed for runtime
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expose your app port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
