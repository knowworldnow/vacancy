import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function PopularCategories() {
  const categories = [
    { name: "Celebrity News", count: 42, slug: "celebrity-news" },
    { name: "Fashion", count: 38, slug: "fashion" },
    { name: "Lifestyle", count: 31, slug: "lifestyle" },
    { name: "Entertainment", count: 27, slug: "entertainment" },
    { name: "Red Carpet", count: 24, slug: "red-carpet" },
  ];

  return (
    <Card className="bg-card">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Popular Categories</h2>
        <div className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="flex items-center justify-between p-2 rounded-md hover:bg-accent"
            >
              <span>{category.name}</span>
              <span className="text-muted-foreground">{category.count}</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}