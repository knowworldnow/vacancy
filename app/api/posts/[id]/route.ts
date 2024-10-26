import { NextResponse } from 'next/server';
import { posts } from '@/lib/db';
import { postSchema } from '@/lib/types';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = posts.find((p) => p.id === params.id);
  
  if (!post) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = postSchema.parse({
      ...body,
      id: params.id,
      updatedAt: new Date(),
    });

    const index = posts.findIndex((p) => p.id === params.id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    posts[index] = validatedData;
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
  const index = posts.findIndex((p) => p.id === params.id);
  if (index === -1) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }

  posts.splice(index, 1);
  return new NextResponse(null, { status: 204 });
}