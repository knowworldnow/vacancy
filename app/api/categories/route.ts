import { NextResponse } from 'next/server';
import { categories } from '@/lib/db';
import { categorySchema } from '@/lib/types';

export async function GET() {
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = categorySchema.parse({
      ...body,
      id: crypto.randomUUID(),
    });

    categories.push(validatedData);
    return NextResponse.json(validatedData, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}