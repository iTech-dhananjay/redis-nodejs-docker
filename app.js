import express from 'express';
import { getProducts } from "./api/products.js";
import Redis from 'ioredis';

const app = express();

const redis = new Redis({
    host: 'redis-stack',  // Docker service name for Redis Stack
    port: 6379
});

// const redis = new Redis({
//     host: 'redis',  // Docker service name for Redis
//     port: 6379
// });

redis.on("connect", () => {
    console.log('Redis connected');
});

redis.on("error", (err) => {
    console.error('Redis connection error:', err);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Endpoint to fetch products
app.get('/products', async (req, res) => {
    try {
        // Attempt to fetch products from Redis cache
        let products = await redis.get("products");

        if (products) {
            // Products found in cache, return them
            return res.json({
                products: JSON.parse(products)
            });
        }

        // Products not found in cache, fetch from database
        products = await getProducts();

        // Set products in Redis cache with expiration (50 seconds)
        await redis.setex("products", 50, JSON.stringify(products));

        // Check if the key is set correctly with expiration
        const ttl = await redis.ttl('products');
        console.log('TTL for products key:', ttl);

        // Return products to client
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});