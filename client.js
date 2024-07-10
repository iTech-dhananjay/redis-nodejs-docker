const redis = require('redis');

const redisHost = '127.0.0.1'; // Ensure this matches the Redis container host
const redisPort = 6379;        // Ensure this matches the Redis container port

const client = redis.createClient({
    url: `redis://${redisHost}:${redisPort}`,
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis connection error:', err);
});

client.connect().catch(console.error);

module.exports = client;
