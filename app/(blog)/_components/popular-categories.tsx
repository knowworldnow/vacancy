import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { categories } from '@/lib/db';
import { posts } from '@/lib/db';

export function PopularCategories() {
  const categoryCounts = categories.map(category => ({
    ...category,
    count: posts.filter(post => post.categoryId === category.id).length
  }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {categoryCounts.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <span className="font-medium">{category.name}</span>
              <span className="text-sm text-muted-foreground">
                {category.count} {category.count === 1 ? 'post' : 'posts'}
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}