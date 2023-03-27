FROM node:18.8.0-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY ./ .
EXPOSE 3001

CMD [ "npm", "run", "serve" ]