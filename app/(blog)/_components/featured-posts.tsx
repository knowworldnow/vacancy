'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const featuredPosts = [
  {
    id: '1',
    title: 'Behind the Scenes with Hollywood&apos;s Rising Stars',
    excerpt: 'Get an intimate look at the next generation of Hollywood talent...',
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6',
    category: 'Celebrities',
    slug: 'behind-the-scenes-hollywood-rising-stars'
  },
  {
    id: '2',
    title: 'Summer Fashion Trends: What Celebrities Are Wearing',
    excerpt: 'Discover the hottest fashion trends celebrities are embracing...',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b',
    category: 'Fashion',
    slug: 'summer-fashion-trends-celebrities'
  },
  {
    id: '3',
    title: 'Celebrity Wellness Secrets Revealed',
    excerpt: 'Learn the wellness routines of your favorite stars...',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
    category: 'Lifestyle',
    slug: 'celebrity-wellness-secrets'
  }
];

export function FeaturedPosts() {
  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold mb-8">Featured Stories</h2>
      <Carousel>
        <CarouselContent>
          {featuredPosts.map((post) => (
            <CarouselItem key={post.id}>
              <Link href={`/posts/${post.slug}`}>
                <Card className="overflow-hidden">
                  <div className="relative aspect-[2/1]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 p-6 text-white">
                      <p className="text-sm font-medium mb-2">{post.category}</p>
                      <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
                      <p className="text-sm line-clamp-2">{post.excerpt}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
