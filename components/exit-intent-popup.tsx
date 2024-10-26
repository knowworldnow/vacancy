'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { posts } from '@/lib/db';
import { formatDistanceToNow } from 'date-fns';

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 0 && // User's mouse leaves through the top of the page
        !hasShown && // Popup hasn't been shown yet
        !sessionStorage.getItem('exitPopupShown') // Not shown in this session
      ) {
        timeout = setTimeout(() => {
          setIsOpen(true);
          setHasShown(true);
          sessionStorage.setItem('exitPopupShown', 'true');
        }, 100);
      }
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (timeout) clearTimeout(timeout);
    };
  }, [hasShown]);

  // Get 3 most recent posts
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="space-y-6 py-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Before You Go!</h2>
              <p className="text-muted-foreground">
                Check out these trending stories you might have missed
              </p>
            </div>

            <div className="grid gap-6">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex gap-4 group"
                >
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}