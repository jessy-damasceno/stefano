FROM node:18

# Create app directory
WORKDIR /app-backend

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "run", "dev" ]

# docker run -p 3306:3306 --name mysql_80 -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=stefano -d mysql:8.0.32 mysqld