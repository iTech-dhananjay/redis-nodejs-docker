FROM node:18-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install application dependencies
COPY package*.json ./
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy application code
COPY . .

# Start the application
#CMD [ "node", "app.js" ]

# Command to run the application in development mode
CMD ["npm", "run", "dev"]