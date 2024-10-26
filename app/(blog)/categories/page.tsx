import { Metadata } from 'next';
import Link from 'next/link';
import { categories, posts } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Categories - VacancyBee',
  description: 'Browse all categories on VacancyBee',
};

export default function CategoriesPage() {
  const categoriesWithCount = categories.map(category => ({
    ...category,
    postCount: posts.filter(post => post.categoryId === category.id).length,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesWithCount.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}/`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {category.name}
                  <Badge variant="secondary">
                    {category.postCount} {category.postCount === 1 ? 'post' : 'posts'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Browse the latest {category.name.toLowerCase()} updates and news
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}