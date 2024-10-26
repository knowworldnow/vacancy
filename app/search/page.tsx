import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { posts } from '@/lib/db';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

export const metadata: Metadata = {
  title: 'Search Results',
  description: 'Search results for blog posts',
};

interface SearchPageProps {
  searchParams: { q?: string };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.toLowerCase() || '';
  
  const searchResults = posts.filter((post) => {
    const searchContent = `${post.title} ${post.content} ${post.excerpt}`.toLowerCase();
    return searchContent.includes(query);
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {query ? `Search results for &quot;${query}&quot;` : 'Search Results'}
      </h1>

      {query ? (
        <div className="space-y-6">
          {searchResults.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                No results found for &quot;{query}&quot;
              </p>
              <p className="text-sm text-muted-foreground">
                Try searching with different keywords or browse our categories
              </p>
            </div>
          ) : (
            searchResults.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/posts/${post.slug}`}>
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-48 h-48">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 192px"
                      />
                    </div>
                    <CardContent className="flex-1 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">
                          {post.categoryId}
                        </Badge>
                        <time className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                        </time>
                      </div>
                      <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.keywords?.map((keyword) => (
                          <Badge key={keyword} variant="outline">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </Link>
              </Card>
            ))
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Enter a search term to find posts
          </p>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
          </p>
        </div>
      )}
    </div>
  );
}