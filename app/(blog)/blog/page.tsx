import { Metadata } from 'next';
import { posts } from '@/lib/db';
import { BlogPostGrid } from './_components/blog-post-grid';
import { BlogHeader } from './_components/blog-header';
import { Pagination } from '@/components/ui/pagination';

export const metadata: Metadata = {
  title: 'Blog - Celebrity News & Entertainment',
  description: 'Latest celebrity news, entertainment updates, and lifestyle trends',
};

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

const POSTS_PER_PAGE = 12;

export default function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const paginatedPosts = posts
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogHeader />
      <BlogPostGrid posts={paginatedPosts} />
      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/blog"
        />
      </div>
    </div>
  );
}