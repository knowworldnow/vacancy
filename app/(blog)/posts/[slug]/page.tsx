import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { posts, categories, authors } from '@/lib/db';
import { PostContent } from './_components/post-content';
import { PostSidebar } from './_components/post-sidebar';
import { SocialShare } from './_components/social-share';
import { AuthorBox } from './_components/author-box';
import { Comments } from './_components/comments';
import { RelatedPosts } from './_components/related-posts';
import { Schema } from '@/components/schema';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};

  const category = categories.find((c) => c.id === post.categoryId);
  const author = authors.find((a) => a.id === post.authorId);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vacancybee.com';
  const canonicalUrl = `${baseUrl}/posts/${post.slug}/`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      url: canonicalUrl,
      siteName: 'VacancyBee',
      authors: [author?.name || 'VacancyBee'],
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 800,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      tags: post.keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
      creator: '@vacancybee',
      site: '@vacancybee',
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': 160,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    authors: [{ name: author?.name || 'VacancyBee' }],
    category: category?.name,
    keywords: post.keywords,
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = posts.find((p) => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  const category = categories.find((c) => c.id === post.categoryId);
  const author = authors.find((a) => a.id === post.authorId);

  if (!category || !author) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <Schema post={post} author={author} category={category} />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8">
          {/* Social Share - Fixed on left for desktop */}
          <div className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 z-10">
            <SocialShare post={post} orientation="vertical" />
          </div>

          {/* Content */}
          <div className="lg:pl-16">
            <PostContent post={post} category={category} author={author} />
            
            {/* Social Share - Below content for mobile */}
            <div className="lg:hidden mb-8">
              <SocialShare post={post} orientation="horizontal" />
            </div>

            <AuthorBox author={author} />
            <Comments postId={post.id} />
            <RelatedPosts currentPostId={post.id} categoryId={post.categoryId} />
          </div>
        </div>

        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden lg:block lg:col-span-4">
          <PostSidebar post={post} />
        </aside>
      </div>
    </article>
  );
}