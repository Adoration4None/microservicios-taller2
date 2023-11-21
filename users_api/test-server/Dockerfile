FROM node:18-alpine

ENV DIRECTORY='/home/test_server/'
WORKDIR ${DIRECTORY}

COPY . .

RUN npm install

EXPOSE 8080

CMD node index.js