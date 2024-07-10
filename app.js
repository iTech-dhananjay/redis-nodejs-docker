import express from 'express';
import { getProducts } from "./api/products.js";
import Redis from 'ioredis';

const app = express();

// export const redis = new Redis({
//     host: "127.0.0.1",
//     port: 6379,
// });

const redis = new Redis({
    host: 'redis',  // Docker service name for Redis
    port: 6379
});

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
        const isExists = await redis.exists("products");

        if (isExists) {
            const products = await redis.get("products");
            return res.json({
                products: JSON.parse(products)
            });
        }

        const products = await getProducts();
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