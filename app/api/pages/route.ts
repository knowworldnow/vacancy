import { NextResponse } from 'next/server';
import { pages } from '@/lib/db';
import { pageSchema } from '@/lib/types';

export async function GET() {
  return NextResponse.json(pages);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = pageSchema.parse({
      ...body,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    pages.push(validatedData);
    return NextResponse.json(validatedData, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}