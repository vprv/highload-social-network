FROM node:14

WORKDIR /app

ENV PORT 5000
ENV HOST 0.0.0.0

EXPOSE 5000

COPY . /app
RUN npm install

CMD npm start
