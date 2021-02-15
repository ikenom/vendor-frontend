FROM node:14 as build

WORKDIR /fytr-frontend

COPY . .

RUN  yarn install --network-timeout 300000

FROM node:8-alpine

EXPOSE 8000 9929 9230 9001

CMD ["yarn", "develop-container"]