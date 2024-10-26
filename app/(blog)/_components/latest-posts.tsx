import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { posts } from '@/lib/db';

interface LatestPostsProps {
  limit?: number;
}

export function LatestPosts({ limit = 10 }: LatestPostsProps) {
  const latestPosts = [...posts]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
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
                    src="https://images.unsplash.com/photo-1533929736458-ca588d08c8be"
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  />
                </div>
                <div className="p-4 flex-1">
                  <p className="text-sm font-medium text-primary mb-1">
                    {post.categoryId}
                  </p>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 text-foreground">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 mb-4">
                    {post.content}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>Author Name</span>
                    <span className="mx-2">•</span>
                    <time>
                      {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                    </time>
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}