
import { redis } from '../app.js'

export const getCachedData = (key)=> async (req, res, next) =>
{
    let data = await redis.get(key);

    if (data) {
        // Products found in cache, return them
        return res.json({
            products: JSON.parse(data)
        });
    }

    next()
}

