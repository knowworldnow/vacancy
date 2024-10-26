import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler } from '@/lib/api';
import { commentSchema } from '@/lib/api/validation';
import { withAuth } from '@/lib/api/auth';
import { rateLimiter } from '@/lib/api/rate-limit';

export async function POST(request: NextRequest) {
  return withErrorHandler(async () => {
    const rateLimit = await rateLimiter(request, 10, 60); // 10 comments per minute
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    return withAuth(request, async (userId) => {
      const body = await request.json();
      const data = await commentSchema.parse({ ...body, userId });
      
      // In production, save to database
      return NextResponse.json({ success: true }, { status: 201 });
    });
  });
}