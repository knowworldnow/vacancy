import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { posts, categories, authors } from '@/lib/db';
import { PostContent } from './_components/post-content';
import { PostSidebar } from './_components/post-sidebar';
import { SocialShare } from './_components/social-share';
import { AuthorBox } from './_components/author-box';
import { Comments } from './_components/comments';
import { RelatedPosts } from './_components/related-posts';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const category = categories.find((c) => c.id === post.categoryId);
  const author = authors.find((a) => a.id === post.authorId);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [author?.name || 'Unknown'],
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 800,
          alt: post.title,
        },
      ],
    },
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = posts.find((p) => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  const category = categories.find((c) => c.id === post.categoryId);
  const author = authors.find((a) => a.id === post.authorId);

  return (
    <article className="container mx-auto px-4 py-8">
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