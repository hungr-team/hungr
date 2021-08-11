FROM node:latest

ENV CI=true

WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY ./ ./

CMD ["npm", "start"]