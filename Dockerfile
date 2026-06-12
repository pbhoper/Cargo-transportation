FROM node:20-alpine AS backend-builder
WORKDIR /app/backend
COPY ./backend/package*.json ./
RUN npm install && npm install @nestjs/swagger @nestjs/mapped-types exceljs
COPY ./backend/ .
RUN npx tsc --noEmit false || true
RUN npm run build

FROM node:20-alpine AS backend
WORKDIR /app/backend
COPY ./backend/package*.json ./
RUN npm install --only=production && npm install @nestjs/swagger @nestjs/mapped-types exceljs
COPY --from=backend-builder /app/backend/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]

FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend/ .
RUN npm run build

FROM nginx:alpine AS frontend
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]