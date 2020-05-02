FROM node:10

WORKDIR /code
COPY package*.json .
RUN yarn
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
