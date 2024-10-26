import Image from 'next/image';
import Link from 'next/link';
import { posts } from '@/lib/db';
import { formatDistanceToNow } from 'date-fns';

interface RecentPostsProps {
  currentPostId: string;
}

export function RecentPosts({ currentPostId }: RecentPostsProps) {
  const recentPosts = posts
    .filter((p) => p.id !== currentPostId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  return (
    <div>
      <h3 className="font-semibold mb-4">Recent Posts</h3>
      <div className="space-y-4">
        {recentPosts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="flex gap-4 group"
          >
            <div className="relative w-20 h-20 flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1533929736458-ca588d08c8be"
                alt={post.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium group-hover:text-primary line-clamp-2">
                {post.title}
              </h4>
              <time className="text-sm text-muted-foreground">
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}