'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Post } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface BlogPostGridProps {
  posts: Post[];
}

export function BlogPostGrid({ posts }: BlogPostGridProps) {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {posts.map((post) => (
        <motion.div
          key={post.id}
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden hover-lift">
            <Link href={`/posts/${post.slug}`}>
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover image-zoom"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-2">
                  {post.categoryId}
                </Badge>
                <h2 className="text-xl font-bold mb-2 line-clamp-2 transition-colors duration-200 group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="text-muted-foreground line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <time className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </time>
              </CardContent>
            </Link>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}