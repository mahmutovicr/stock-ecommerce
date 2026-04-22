FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
ARG VITE_ADMIN_PASSWORD
ENV VITE_ADMIN_PASSWORD=$VITE_ADMIN_PASSWORD
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY backend/ ./backend/
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

EXPOSE 5000
CMD ["node", "backend/server.js"]