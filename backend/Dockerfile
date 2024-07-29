FROM node:18-alpine

WORKDIR .
COPY package.json .
RUN npm install
COPY . .
CMD node ./server.js \
    nodemon ./server.js localhost 8085