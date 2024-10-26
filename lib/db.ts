import { Post, Category, Author } from '@/types/blog';

export const posts: Post[] = [
  {
    id: "1",
    title: "Behind the Scenes with Hollywood Rising Stars",
    slug: "behind-the-scenes-hollywood-rising-stars",
    content: "Get an intimate look at the next generation of Hollywood talent as we explore their journeys, challenges, and aspirations.",
    excerpt: "An exclusive behind-the-scenes look at Hollywood's most promising newcomers.",
    categoryId: "1",
    authorId: "1",
    createdAt: new Date("2024-03-20T10:00:00Z"),
    updatedAt: new Date("2024-03-20T10:00:00Z"),
    featuredImage: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be",
    published: true,
    keywords: ["hollywood", "actors", "entertainment", "rising stars", "behind the scenes"],
    relatedPosts: [],
    seo: {
      metaTitle: "Behind the Scenes with Hollywood Rising Stars",
      metaDescription: "Get an exclusive look at the next generation of Hollywood talent and their journey to stardom.",
      ogImage: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be"
    },
    faqs: []
  },
  {
    id: "2",
    title: "Fashion Week Highlights: Spring Collection",
    slug: "fashion-week-highlights-spring",
    content: "Discover the latest trends and stunning designs from this year's Spring Fashion Week showcase.",
    excerpt: "The most memorable moments and trends from Spring Fashion Week.",
    categoryId: "2",
    authorId: "2",
    createdAt: new Date("2024-03-19T15:30:00Z"),
    updatedAt: new Date("2024-03-19T15:30:00Z"),
    featuredImage: "https://images.unsplash.com/photo-1523941920143-f4b8813f3bdd",
    published: true,
    keywords: ["fashion week", "spring collection", "fashion", "trends", "runway"],
    relatedPosts: [],
    seo: {
      metaTitle: "Fashion Week Highlights: Spring Collection 2024",
      metaDescription: "Explore the latest trends and stunning designs from this year's Spring Fashion Week showcase.",
      ogImage: "https://images.unsplash.com/photo-1523941920143-f4b8813f3bdd"
    },
    faqs: []
  }
];

export const categories: Category[] = [
  {
    id: "1",
    name: "Celebrity News",
    slug: "celebrity-news",
    description: "Latest updates from the world of celebrities"
  },
  {
    id: "2",
    name: "Fashion",
    slug: "fashion",
    description: "Fashion trends and style updates"
  },
  {
    id: "3",
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Celebrity lifestyle and wellness"
  }
];

export const authors: Author[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    bio: "Entertainment journalist with over a decade of experience covering Hollywood and celebrity culture.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    id: "2",
    name: "Michael Chen",
    bio: "Fashion editor and style consultant who has worked with leading fashion magazines and designers.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
  }
];

export const pages = [
  {
    id: '1',
    title: 'About Us',
    slug: 'about',
    content: 'About page content...',
    published: true,
    authorId: '1',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
    keywords: ['about', 'company', 'team'],
    seo: {
      metaTitle: 'About Us - VacancyBee',
      metaDescription: 'Learn more about our team and mission.'
    }
  },
  {
    id: '2',
    title: 'Contact',
    slug: 'contact',
    content: 'Contact page content...',
    published: true,
    authorId: '1',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
    keywords: ['contact', 'support', 'help'],
    seo: {
      metaTitle: 'Contact Us - VacancyBee',
      metaDescription: 'Get in touch with our team.'
    }
  }
];