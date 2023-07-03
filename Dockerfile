FROM node:lts-alpine

WORKDIR /var/app

COPY package.json ./
COPY package-lock.json ./
COPY ./src ./

RUN npm install

ENTRYPOINT [ "node", "src/index" ]