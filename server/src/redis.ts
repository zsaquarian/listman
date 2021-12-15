import { createNodeRedisClient } from 'handy-redis';

export const redis = createNodeRedisClient({ url: process.env.REDIS_URL });
