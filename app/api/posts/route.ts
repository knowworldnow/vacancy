import { NextResponse } from 'next/server';
import { posts } from '@/lib/db';
import { postSchema } from '@/lib/types';

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = postSchema.parse({
      ...body,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // In production, save to database
    posts.push(validatedData);

    return NextResponse.json(validatedData, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}