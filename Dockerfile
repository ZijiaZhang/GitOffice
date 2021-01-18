FROM node:14
COPY ./ /app
WORKDIR /app
ENTRYPOINT ["npm", "start"]
