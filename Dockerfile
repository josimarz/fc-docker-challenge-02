FROM node:lts-alpine

WORKDIR /var/app

COPY package.json ./
COPY package-lock.json ./
COPY . .

RUN npm install

ENTRYPOINT [ "node", "src/index" ]