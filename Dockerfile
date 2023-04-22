FROM node:alpine
COPY ./server /app
WORKDIR /app
RUN npm run predeploy
EXPOSE 8080

CMD npm start
