FROM node:17.0.1-alpine3.14

WORKDIR /frontend

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD yarn start