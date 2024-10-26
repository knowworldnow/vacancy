import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Twitter, Globe } from 'lucide-react';

export function AuthorBox() {
  return (
    <Card className="my-12">
      <CardContent className="flex gap-6 p-6">
        <div className="relative h-24 w-24 flex-shrink-0">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            alt="Author"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <Link href="/author/name">
              <h3 className="text-xl font-bold hover:text-primary">Author Name</h3>
            </Link>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Globe className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground">
            Author bio goes here. This is a brief description about the author,
            their expertise, and what they write about.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}