# Estágio de compilação
FROM node:16 as build-stage
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

# Estágio de produção
FROM nginx:latest as production-stage
COPY --from=build-stage /app/dist/dropmail.me-challenge /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
