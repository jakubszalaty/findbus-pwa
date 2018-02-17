# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:carbon-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

RUN npm install pm2 -g