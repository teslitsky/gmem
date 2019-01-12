FROM node:10.15.0-alpine

COPY . /app
WORKDIR /app

ENV NODE_ENV production

ENV PORT "3000"
ENV JWT_SECRET "secret"
ENV DB_CONNECTION_STRING "mysql://root:example@localhost/genesis"

RUN npm install --ignore-scripts --no-progress --no-audit

CMD ["node", "index.js"]

EXPOSE 3000
