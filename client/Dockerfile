FROM node:14.15.0-alpine as build-stage
WORKDIR /app
ARG API_ENDPOINT
ENV VUE_APP_API_ENDPOINT=$API_ENDPOINT
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY ./ .
RUN yarn build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
