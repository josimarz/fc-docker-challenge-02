FROM node:lts-alpine AS builder

WORKDIR /var/app

COPY package.json ./
COPY package-lock.json ./
COPY index.js ./

RUN npm install
RUN npm run build

FROM node:lts-alpine AS deploy

WORKDIR /var/app

COPY --from=builder /var/app/dist ./dist

ENTRYPOINT [ "node", "dist/index" ]