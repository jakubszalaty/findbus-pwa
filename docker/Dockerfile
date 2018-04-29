FROM node:carbon-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

RUN apk add --update \
    curl \
    git \
    ghostscript &&\
    rm -rf /var/cache/apk/*

RUN npm install pm2 -g

USER node

# COPY . /app

# # RUN yarn install --prod && \
# RUN yarn install &&\
#     yarn build &&\
#     mkdir -p /root/.prisma/ &&\
#     cp /app/.prismarc /root/.prisma/config.yml

# CMD [ "yarn", "start:prod" ]

