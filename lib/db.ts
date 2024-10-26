export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  categoryId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  featuredImage: string;
  excerpt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
}

export const posts: Post[] = [
  {
    id: "1",
    title: "Behind the Scenes with Hollywood Rising Stars",
    slug: "behind-the-scenes-hollywood-rising-stars",
    content: "Get an intimate look at the next generation of Hollywood talent as we explore their journeys, challenges, and aspirations.",
    categoryId: "1",
    authorId: "1",
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
    featuredImage: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be",
    excerpt: "An exclusive behind-the-scenes look at Hollywood's most promising newcomers."
  },
  {
    id: "2",
    title: "Fashion Week Highlights: Spring Collection",
    slug: "fashion-week-highlights-spring",
    content: "Discover the latest trends and stunning designs from this year's Spring Fashion Week showcase.",
    categoryId: "2",
    authorId: "2",
    createdAt: "2024-03-19T15:30:00Z",
    updatedAt: "2024-03-19T15:30:00Z",
    featuredImage: "https://images.unsplash.com/photo-1523941920143-f4b8813f3bdd",
    excerpt: "The most memorable moments and trends from Spring Fashion Week."
  }
];

export const categories: Category[] = [
  {
    id: "1",
    name: "Celebrity News",
    slug: "celebrity-news",
    postCount: 15
  },
  {
    id: "2",
    name: "Fashion",
    slug: "fashion",
    postCount: 12
  },
  {
    id: "3",
    name: "Lifestyle",
    slug: "lifestyle",
    postCount: 8
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