import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { categories, posts } from '@/lib/db';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string;
  };
}

const POSTS_PER_PAGE = 12;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} - VacancyBee`,
    description: `Latest ${category.name} news and updates`,
    openGraph: {
      title: `${category.name} - VacancyBee`,
      description: `Latest ${category.name} news and updates`,
      type: 'website',
    },
  };
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  const currentPage = Number(searchParams.page) || 1;
  
  const categoryPosts = posts
    .filter(post => post.categoryId === category.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const totalPosts = categoryPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const paginatedPosts = categoryPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Badge className="mb-4">{totalPosts} posts</Badge>
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        <p className="text-muted-foreground text-lg">
          Latest {category.name.toLowerCase()} news and updates
        </p>
      </div>

      <div className="grid gap-8">
        {paginatedPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <Link href={`/posts/${post.slug}/`}>
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-72 h-48 md:h-auto">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 288px"
                  />
                </div>
                <CardContent className="flex-1 p-6">
                  <h2 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <time>
                      {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                    </time>
                  </div>
                </CardContent>
              </div>
            </Link>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={`/categories/${category.slug}`}
          />
        </div>
      )}
    </div>
  );
}