import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || 'http://localhost:6379',
  token: process.env.UPSTASH_REDIS_TOKEN || '',
});

export async function rateLimit(ip: string) {
  const now = Date.now();
  const windowSize = 60 * 1000; // 1 minute
  const maxRequests = 60; // 60 requests per minute

  const key = `rate_limit:${ip}`;
  const requests = await redis.zrangebyscore(key, now - windowSize, now);

  if (requests.length >= maxRequests) {
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      reset: Math.ceil((parseInt(requests[0]) + windowSize) / 1000),
    };
  }

  await redis.zadd(key, now, now.toString());
  await redis.zremrangebyscore(key, 0, now - windowSize);
  await redis.expire(key, 60);

  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - requests.length - 1,
    reset: Math.ceil((now + windowSize) / 1000),
  };
}