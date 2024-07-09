const Redis = require('ioredis');

const redisHost = '127.0.0.1';
const redisPort = 6379;
// const redisDatabase = 0; // Uncomment if you need to specify a database

const client = new Redis({
    host: redisHost,
    port: redisPort,
    // db: redisDatabase, // Uncomment if you need to specify a database
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis connection error:', err);
});

module.exports = client;