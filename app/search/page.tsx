import { Metadata } from 'next';
import { posts } from '@/lib/db';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

interface SearchPageProps {
  searchParams: { q?: string };
}

export const metadata: Metadata = {
  title: 'Search Results',
  description: 'Search results for blog posts',
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.toLowerCase() || '';
  
  const searchResults = posts.filter((post) => {
    const searchContent = `${post.title} ${post.content}`.toLowerCase();
    return searchContent.includes(query);
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {query ? `Search results for "${query}"` : 'Search Results'}
      </h1>

      {query ? (
        <div className="space-y-6">
          {searchResults.length === 0 ? (
            <p className="text-muted-foreground">
              No results found for "{query}". Try a different search term.
            </p>
          ) : (
            searchResults.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <Link href={`/posts/${post.slug}`}>
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-48 h-48">
                      <Image
                        src="https://images.unsplash.com/photo-1533929736458-ca588d08c8be"
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-2 hover:text-primary">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground line-clamp-2">
                        {post.content}
                      </p>
                    </div>
                  </div>
                </Link>
              </Card>
            ))
          )}
        </div>
      ) : (
        <p className="text-muted-foreground">
          Enter a search term to find posts.
        </p>
      )}
    </div>
  );
}