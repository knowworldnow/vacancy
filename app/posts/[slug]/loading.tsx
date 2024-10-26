import { Skeleton } from '@/components/ui/skeleton';

export default function PostLoading() {
  return (
    <article className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Social Share Loading */}
        <div className="hidden lg:flex lg:col-span-1 flex-col gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-10" />
          ))}
        </div>

        {/* Main Content Loading */}
        <div className="lg:col-span-8">
          <Skeleton className="aspect-[3/2] w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <div className="flex gap-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
            </div>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>

        {/* Sidebar Loading */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[400px] w-full" />
        </aside>
      </div>
    </article>
  );
}