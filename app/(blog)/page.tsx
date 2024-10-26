import { FeaturedPosts } from './_components/featured-posts';
import { LatestPosts } from './_components/latest-posts';
import { PopularCategories } from './_components/popular-categories';
import { TrendingTopics } from './_components/trending-topics';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <FeaturedPosts />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-2">
          <LatestPosts limit={10} />
        </div>
        <aside className="space-y-8">
          <TrendingTopics />
          <PopularCategories />
        </aside>
      </div>
    </div>
  );
}