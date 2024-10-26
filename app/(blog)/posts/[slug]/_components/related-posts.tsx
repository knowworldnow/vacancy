import Image from 'next/image';
import Link from 'next/link';
import { posts } from '@/lib/db';

interface RelatedPostsProps {
  currentPostId: string;
  categoryId: string;
}

export function RelatedPosts({ currentPostId, categoryId }: RelatedPostsProps) {
  const relatedPosts = posts
    .filter(
      (p) => p.categoryId === categoryId && p.id !== currentPostId
    )
    .slice(0, 4);

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="group"
          >
            <div className="relative aspect-[3/2] mb-4 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1533929736458-ca588d08c8be"
                alt={post.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <h3 className="font-semibold group-hover:text-primary line-clamp-2">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}