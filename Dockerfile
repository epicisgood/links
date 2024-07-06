# Use an official Node.js runtime as the base image
FROM node:14

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy all files from your host machine to the container in the working directory
COPY . .

# Expose a port that your app will listen on (if required)
EXPOSE 3000

# Specify the command to run your app when the container starts
CMD [ "node", "index.js" ]
