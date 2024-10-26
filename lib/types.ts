import { z } from 'zod';

export const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const seoSchema = z.object({
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  featuredImage: z.string().url().optional(),
  canonicalUrl: z.string().url().optional(),
  ogTitle: z.string().max(60).optional(),
  ogDescription: z.string().max(160).optional(),
  ogImage: z.string().url().optional(),
});

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  slug: z.string(),
  excerpt: z.string().max(160),
  featuredImage: z.string().url(),
  published: z.boolean(),
  authorId: z.string(),
  categoryId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  keywords: z.array(z.string()).default([]),
  relatedPosts: z.array(z.string()).optional(),
  seo: seoSchema.optional(),
  faqs: z.array(faqSchema).optional(),
});

export const pageSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  slug: z.string(),
  published: z.boolean(),
  authorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  keywords: z.array(z.string()).default([]),
  seo: seoSchema.optional(),
  faqs: z.array(faqSchema).optional(),
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
});

export type Post = z.infer<typeof postSchema>;
export type Page = z.infer<typeof pageSchema>;
export type Category = z.infer<typeof categorySchema>;
export type FAQ = z.infer<typeof faqSchema>;
export type SEO = z.infer<typeof seoSchema>;

export interface InterlinkSuggestion {
  sourcePostId: string;
  targetPostId: string;
  relevanceScore: number;
  matchedKeywords: string[];
  targetTitle: string;
  targetSlug: string;
  excerpt: string;
}