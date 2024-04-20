# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG configuration
RUN npm run build -- --output-path=./dist/webapp --configuration $configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.18
#Copy ci-dashboard-dist
COPY --from=build-stage /app/dist/webapp/ /usr/share/nginx/html
#Copy default nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
