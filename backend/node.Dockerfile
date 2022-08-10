FROM node:16.13.2

WORKDIR /src

COPY package*.json /src 

RUN npm install

COPY . /src 

EXPOSE 3000