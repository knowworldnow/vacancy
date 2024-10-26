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
  createdAt: Date | string;
  updatedAt: Date | string;
  published: boolean;
  keywords: string[];
  relatedPosts: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}