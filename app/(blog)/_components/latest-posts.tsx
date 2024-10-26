'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { posts } from '@/lib/db';
import { Badge } from '@/components/ui/badge';

interface LatestPostsProps {
  limit?: number;
}

export function LatestPosts({ limit = 10 }: LatestPostsProps) {
  const latestPosts = [...posts]
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, limit);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
      <div className="space-y-6">
        {latestPosts.map((post) => (
          <Card key={post.id} className="bg-card">
            <Link href={`/posts/${post.slug}`}>
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-48 h-48">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                    sizes="(max-width: 768px) 100vw, 192px"
                  />
                </div>
                <div className="p-4 flex-1">
                  <Badge variant="secondary" className="mb-2">
                    {post.categoryId}
                  </Badge>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 text-foreground hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <time className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  </time>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
