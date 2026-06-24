FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm config set fetch-timeout 600000
RUN npm config set fetch-retries 10

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]