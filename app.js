import express from 'express';
import { getProducts, getProductDetail } from "./api/products.js";
import Redis from 'ioredis';
import {getCachedData} from "./middleware/redis.js";

const app = express();

export const redis = new Redis({
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
app.get('/products', getCachedData("products"), async(req, res) => {
    try {
        // Products not found in cache, fetch from database
       let products = await getProducts();

        // Set products in Redis cache with expiration (50 seconds)
        await redis.setex("products", 100, JSON.stringify(products));

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

// Endpoint to fetch product detail by ID
app.get('/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const key = `product:${id}`;
        let product = await redis.get(key)
        if(product){
            return res.json({
                product: JSON.parse(product)
            });
        }

        product =  await getProductDetail(id)
        await redis.set(key, JSON.stringify(product));
        return res.json(product);

    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

app.get('/order/:id', async (req, res) => {
    const productId = req.params.id;
    const key = `product:${productId}`;

    //Any Mutation to database here, like creating new order in database, reducing/increasing product stock in database

    await redis.del(key)


    return res.json({
        message: `Order Placed Successfully, product ${productId} is ordered`,
    })

})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});