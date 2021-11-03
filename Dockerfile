# Building Node
FROM node:14 as build-stage
ENV NODE_ENV=production
WORKDIR /var/uinterface
COPY . .
RUN yarn install
RUN yarn build:production

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:stable
COPY --from=build-stage /var/uinterface/build/ /var/uinterface/build
COPY ./bin/nginx.conf /etc/nginx/conf.d/default.conf
