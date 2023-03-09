FROM node:19.3.0

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]