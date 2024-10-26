'use client';

import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Post, Author, Category } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { getFeaturedImageUrl } from '@/lib/image';

interface PostContentProps {
  post: Post;
  category: Category;
  author: Author;
}

export function PostContent({ post, category, author }: PostContentProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* Featured Image */}
      <div className="relative aspect-[3/2] mb-8 rounded-lg overflow-hidden">
        <Image
          src={getFeaturedImageUrl(post.featuredImage)}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
        <Badge variant="secondary">{category.name}</Badge>
        <span>By {author.name}</span>
        <time dateTime={post.createdAt.toISOString()}>
          {formatDistanceToNow(post.createdAt, { addSuffix: true })}
        </time>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

      {/* Content */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* FAQs */}
      {post.faqs && post.faqs.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {post.faqs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {post.keywords && post.keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8">
          {post.keywords.map((keyword) => (
            <Badge key={keyword} variant="outline">
              {keyword}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}