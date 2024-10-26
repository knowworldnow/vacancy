import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function FeaturedPosts() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Featured Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <Link href="/behind-the-scenes-hollywood-rising-stars">
            <div className="relative h-[300px]">
              <Image
                src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6"
                alt="Hollywood Rising Stars"
                fill
                className="object-cover"
                priority
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-bold mb-2">Behind the Scenes with Hollywood's Rising Stars</h3>
              <p className="text-muted-foreground">An intimate look at the next generation of talent...</p>
            </CardContent>
          </Link>
        </Card>
        <Card className="overflow-hidden">
          <Link href="/fashion-week-highlights">
            <div className="relative h-[300px]">
              <Image
                src="https://images.unsplash.com/photo-1523260578934-e9318da58c8d"
                alt="Fashion Week Highlights"
                fill
                className="object-cover"
                priority
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-bold mb-2">Fashion Week Highlights</h3>
              <p className="text-muted-foreground">The most stunning moments from this year's runway...</p>
            </CardContent>
          </Link>
        </Card>
      </div>
    </section>
  );
}