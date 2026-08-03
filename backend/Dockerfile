 FROM node:22
 WORKDIR /APP
 COPY package*.json ./
 Run npm install
 COPY . .
 EXPOSE 5000
 CMD ["npm", "run", "dev"]