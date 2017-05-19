FROM node:7.10
WORKDIR app
COPY . .
RUN yarn install
RUN yarn run test
EXPOSE 5000
CMD yarn start
