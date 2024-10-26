import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TrendingTopics() {
  const topics = [
    "Oscar Nominations 2024",
    "Met Gala Highlights",
    "Celebrity Weddings",
    "Fashion Week",
    "Award Season",
    "Red Carpet Looks",
    "Celebrity Style",
    "Movie Premieres"
  ];

  return (
    <Card className="bg-card">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Trending Topics</h2>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Link key={topic} href={`/topic/${topic.toLowerCase().replace(/\s+/g, "-")}`}>
              <Badge variant="secondary" className="cursor-pointer hover:bg-accent">
                {topic}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}