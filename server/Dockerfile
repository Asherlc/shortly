FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json

RUN npm ci

COPY index.ts  .
COPY url.ts  .
COPY tsconfig.json .

# Note: Don't expose ports here, Compose will handle that for us

RUN npm run build

CMD npm run start