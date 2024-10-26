import { NextResponse } from 'next/server';
import { posts } from '@/lib/db';
import { findInterlinkSuggestions } from '@/lib/interlink';

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

  const suggestions = findInterlinkSuggestions(post);
  return NextResponse.json(suggestions);
}