export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  categoryId: string;
  authorId: string;
  publishedAt: string;
  tags: string[];
  author?: Author;
  category?: Category;
}