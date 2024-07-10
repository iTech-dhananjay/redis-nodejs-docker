```markdown
# Node.js Application with Redis Stack and RedisInsight

This repository contains a Node.js application configured to use Redis Stack, along with RedisInsight for GUI-based management of Redis.

## Prerequisites

Ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (for local development)

## Setup

### 1. Clone the Repository

```sh
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Node.js Dependencies

```sh
npm install
```

### 3. Docker Compose Configuration

The `docker-compose.yml` file is already configured to set up the necessary services:

- `redis-stack`: Runs Redis Stack and exposes ports `6379` for Redis and `8001` for RedisInsight.
- `nodejs-app`: Builds and runs the Node.js application, exposing port `3000`.

Here is the `docker-compose.yml` configuration:

```yaml
version: '3.8'

services:
  redis-stack:
    image: redis/redis-stack:latest
    ports:
      - "6379:6379"
      - "8001:8001"  # RedisInsight GUI
    networks:
      - my-network

  nodejs-app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - redis-stack
    networks:
      - my-network

networks:
  my-network:
    driver: bridge
```

### 4. Update Redis Configuration in Node.js Application

Make sure your Node.js application uses `ioredis` to connect to the `redis-stack` service. The configuration in your application should look like this:

```javascript
const Redis = require('ioredis');
const redis = new Redis({
  host: 'redis-stack',  // Docker service name for Redis Stack
  port: 6379
});

redis.on('connect', () => {
  console.log('Connected to Redis Stack');
});

redis.on('error', (err) => {
  console.error('Redis Stack connection error:', err);
});

// Your application logic here
```

### 5. Build and Start the Containers

Use Docker Compose to build and start the containers:

```sh
docker-compose up --build
```

### 6. Access the Application and RedisInsight

- **Node.js Application:** Open your browser and navigate to `http://localhost:3000`.
- **RedisInsight GUI:** Open your browser and navigate to `http://localhost:8001` to access the RedisInsight web interface.

## Usage

The Node.js application is set up to use Redis Stack for caching, data storage, or other Redis-based functionalities. You can interact with your Redis instance through RedisInsight, providing a user-friendly GUI for managing and monitoring your Redis data.

## Troubleshooting

- Ensure Docker and Docker Compose are properly installed and running.
- Check the logs for any errors using `docker-compose logs`.
- Verify the service names and ports are correctly configured in the `docker-compose.yml` file.

## Cleanup

To stop and remove the containers, networks, and volumes created by Docker Compose, run:

```sh
docker-compose down
```

This will stop and remove all the containers defined in your `docker-compose.yml` file.

---

Enjoy using your Node.js application with Redis Stack and RedisInsight!
