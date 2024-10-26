import { NextResponse } from 'next/server';
import { categories } from '@/lib/db';
import { categorySchema } from '@/lib/types';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const category = categories.find((c) => c.id === params.id);
  
  if (!category) {
    return NextResponse.json(
      { error: 'Category not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(category);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = categorySchema.parse({
      ...body,
      id: params.id,
    });

    const index = categories.findIndex((c) => c.id === params.id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    categories[index] = validatedData;
    return NextResponse.json(validatedData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = categories.findIndex((c) => c.id === params.id);
  if (index === -1) {
    return NextResponse.json(
      { error: 'Category not found' },
      { status: 404 }
    );
  }

  categories.splice(index, 1);
  return new NextResponse(null, { status: 204 });
}