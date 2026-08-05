 FROM node:22
 WORKDIR /APP
 COPY package*.json ./
 RUN npm install
 COPY . .
 EXPOSE 5000
 CMD ["npm", "run", "dev"]