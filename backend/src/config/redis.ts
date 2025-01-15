import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

// docker run --name redis -p 6379:6379 -d redis

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export default redisClient;
