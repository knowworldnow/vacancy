import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PostNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
      <p className="text-muted-foreground mb-8">
        The post you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
