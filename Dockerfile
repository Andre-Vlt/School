FROM node:20.14.0

RUN apt-get update && apt-get install -y nano

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "build/server.js"]