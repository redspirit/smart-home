FROM node:18-alpine
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

# EXPOSE 8081
CMD npm start
