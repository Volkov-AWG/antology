FROM node:10.19.0
WORKDIR /app_back
COPY package*.json . /app_back/
RUN npm install
COPY . . /app_back/
CMD node server.js
EXPOSE 4402
