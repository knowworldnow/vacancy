import { NextResponse } from 'next/server';
import { pages } from '@/lib/db';
import { pageSchema } from '@/lib/types';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const page = pages.find((p) => p.id === params.id);
  
  if (!page) {
    return NextResponse.json(
      { error: 'Page not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(page);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = pageSchema.parse({
      ...body,
      id: params.id,
      updatedAt: new Date(),
    });

    const index = pages.findIndex((p) => p.id === params.id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }

    pages[index] = validatedData;
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
  const index = pages.findIndex((p) => p.id === params.id);
  if (index === -1) {
    return NextResponse.json(
      { error: 'Page not found' },
      { status: 404 }
    );
  }

  pages.splice(index, 1);
  return new NextResponse(null, { status: 204 });
}