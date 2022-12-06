FROM node:16-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN yarn install

FROM deps as builder
COPY . .
RUN yarn build

FROM nginx:stable-alpine AS release
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
