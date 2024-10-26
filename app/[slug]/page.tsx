import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PostContent } from '@/components/blog/post-content';
import { Sidebar } from '@/components/blog/sidebar';
import { getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { SocialShare } from '@/components/blog/social-share';
import { AuthorBox } from '@/components/blog/author-box';
import { Comments } from '@/components/blog/comments';
import { RelatedPosts } from '@/components/blog/related-posts';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.featuredImage }],
      type: 'article',
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.id, post.categoryId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <SocialShare post={post} className="hidden lg:block lg:col-span-1" />
      <article className="lg:col-span-8">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-[400px] md:h-[600px] object-cover rounded-lg mb-8"
        />
        <PostContent post={post} />
        <AuthorBox author={post.author} />
        <Comments postId={post.id} />
        <RelatedPosts posts={relatedPosts} />
      </article>
      <aside className="lg:col-span-3">
        <Sidebar post={post} />
      </aside>
    </div>
  );
}