# Build stage
FROM node:16 as builder
ARG ENV=production
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build:$ENV

# Stage 1: serve by nginx
FROM nginx:stable-alpine
COPY ./bin/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
