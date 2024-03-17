FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json

RUN npm ci

COPY app ./app
COPY src ./src
COPY public ./public
COPY next.config.mjs .
COPY tsconfig.json .

# Note: Don't expose ports here, Compose will handle that for us

RUN npm run prebuild

RUN npm run build

CMD npm run start