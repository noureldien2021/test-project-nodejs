#create base image
FROM node


#create directory inside container
WORKDIR /app

#install dependencies
COPY package.json .

#copy all files
COPY . .

#install dependencies
RUN npm install

#expose port
EXPOSE 3000

#run app
CMD ["npm", "start"]


