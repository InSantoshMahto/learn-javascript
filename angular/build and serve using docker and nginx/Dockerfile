### STAGE 1: Build ###
FROM node:14.16.0-alpine AS build
WORKDIR /usr/share/angular
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build --prod

## STAGE 2: Run ###
FROM nginx:1.18-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/share/angular/dist/ng /usr/share/nginx/html
