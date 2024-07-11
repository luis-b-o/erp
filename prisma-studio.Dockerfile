FROM node:20-alpine

RUN mkdir /app
WORKDIR /app

RUN npm install prisma --save-dev

RUN npm init -y

CMD [ "npx", "prisma", "studio" ]