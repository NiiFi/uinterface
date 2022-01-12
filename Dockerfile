# Stage 0: building Node
FROM node:14 as build-stage
ENV NODE_ENV=production
WORKDIR /var/uinterface
COPY . .
RUN yarn install --production=false
RUN yarn build:production

# Stage 1: serve by nginx
FROM nginx:stable
COPY --from=build-stage /var/uinterface/build/ /var/uinterface/build
COPY ./bin/nginx.conf /etc/nginx/conf.d/default.conf
