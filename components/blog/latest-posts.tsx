import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function LatestPosts() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
      <div className="space-y-6">
        {[...Array(10)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Link href={`/post-${i + 1}`} className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-48 h-48">
                <Image
                  src={`https://images.unsplash.com/photo-${500000000 + i}`}
                  alt={`Latest Post ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="flex-1 p-4">
                <h3 className="text-xl font-bold mb-2">Latest Celebrity News {i + 1}</h3>
                <p className="text-muted-foreground">Breaking entertainment news and updates...</p>
                <div className="flex items-center mt-4 text-sm text-muted-foreground">
                  <span>April {i + 1}, 2024</span>
                  <span className="mx-2">•</span>
                  <span>5 min read</span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}