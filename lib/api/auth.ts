import { NextRequest, NextResponse } from 'next/server';
import { getFromCache } from '@/lib/cache';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function withAuth(
  request: NextRequest,
  handler: (userId: string) => Promise<NextResponse>
) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) throw new Error('No token provided');

    const decoded = verify(token, JWT_SECRET) as { userId: string };
    return await handler(decoded.userId);
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}