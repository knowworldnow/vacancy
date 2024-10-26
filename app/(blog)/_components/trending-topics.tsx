import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const trendingTopics = [
  'Celebrity Weddings',
  'Red Carpet Fashion',
  'Summer Style',
  'Wellness Tips',
  'Beauty Trends',
  'Celebrity Homes',
  'Award Shows',
  'Fashion Week',
];

export function TrendingTopics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic) => (
            <Link key={topic} href={`/search?q=${encodeURIComponent(topic)}`}>
              <Badge 
                variant="secondary" 
                className="cursor-pointer hover:bg-secondary/80 transition-colors"
              >
                {topic}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}