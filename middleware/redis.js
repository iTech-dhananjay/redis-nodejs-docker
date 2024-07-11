
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


export const rateLimiter = ({limit,timer, key}) => async (req, res, next) => {
    const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const fullKey = `${clientIP}:${key}:request_count`;

    const requestCount = await redis.incr(fullKey);
    if (requestCount === 1) {
        await redis.expire(fullKey, timer);
    }

    const timeRemaining = await redis.ttl(fullKey)
    if (requestCount > limit) {
        return res.status(429).send(`Too many requests, Please try again after ${timeRemaining} seconds`);
    }

    next()
}