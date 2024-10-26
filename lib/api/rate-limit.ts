import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || '',
  token: process.env.UPSTASH_REDIS_TOKEN || '',
});

export async function rateLimiter(
  request: NextRequest,
  limit: number = 60,
  window: number = 60
) {
  const ip = request.ip ?? '127.0.0.1';
  const key = `rate_limit:${ip}`;
  
  const count = await redis.incr(key);
  
  if (count === 1) {
    await redis.expire(key, window);
  }
  
  const remaining = Math.max(0, limit - count);
  
  return {
    success: count <= limit,
    remaining,
    reset: await redis.ttl(key),
  };
}