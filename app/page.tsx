import { FeaturedPosts } from "@/components/blog/featured-posts";
import { LatestPosts } from "@/components/blog/latest-posts";
import { PopularCategories } from "@/components/blog/popular-categories";
import { TrendingTopics } from "@/components/blog/trending-topics";

export default async function HomePage() {
  return (
    <div className="space-y-10">
      <FeaturedPosts />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <LatestPosts />
        </div>
        <div className="space-y-6">
          <PopularCategories />
          <TrendingTopics />
        </div>
      </div>
    </div>
  );
}