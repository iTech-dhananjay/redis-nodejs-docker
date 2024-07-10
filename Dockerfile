FROM node:18-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install application dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Start the application
CMD [ "node", "app.js" ]