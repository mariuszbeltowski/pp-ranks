FROM node:17.0.1-alpine3.14

WORKDIR /backend

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 4000

CMD yarn serve