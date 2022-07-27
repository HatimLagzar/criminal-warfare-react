FROM node:17-alpine

WORKDIR /var/www

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "start"]