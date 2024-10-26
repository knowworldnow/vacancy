import { Input } from '@/components/ui/input';
import { categories } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export function BlogHeader() {
  return (
    <div className="mb-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Latest Stories</h1>
        <p className="text-muted-foreground text-lg">
          Discover the latest celebrity news, entertainment updates, and lifestyle trends
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`}>
            <Badge variant="secondary" className="hover:bg-secondary/80">
              {category.name}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}