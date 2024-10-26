// API route handlers with proper error handling and validation
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { getFromCache, setInCache } from '@/lib/cache';

export async function withErrorHandler(handler: Function) {
  try {
    return await handler();
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function withValidation<T>(schema: z.Schema<T>, data: any) {
  try {
    return schema.parse(data);
  } catch (error) {
    throw new Error('Validation failed');
  }
}

export async function withCache<T>(
  key: string,
  handler: () => Promise<T>,
  ttl?: number
): Promise<T> {
  const cached = await getFromCache<T>(key);
  if (cached) return cached;

  const data = await handler();
  await setInCache(key, data, { ttl });
  return data;
}