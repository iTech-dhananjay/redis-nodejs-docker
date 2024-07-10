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

app.get('/products', async (req, res) => {
    try {
        let products = redis.get("products");

        if (products) {
            return res.json({
                products: JSON.parse(products)
            });
        }

         products = await getProducts();
        await redis.set("products", JSON.stringify(products));
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});