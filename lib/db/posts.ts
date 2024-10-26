import { prisma } from './client';
import { Post, Category, FAQ, SEO } from '@prisma/client';
import slugify from 'slugify';

export type PostWithRelations = Post & {
  category: Category;
  faqs: FAQ[];
  seo: SEO | null;
};

export async function createPost(data: {
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  categoryId: string;
  keywords?: string[];
  faqs?: { question: string; answer: string }[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    featuredImage?: string;
    canonicalUrl?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  };
}) {
  const slug = slugify(data.title, { lower: true, strict: true });

  return prisma.post.create({
    data: {
      title: data.title,
      slug,
      content: data.content,
      excerpt: data.excerpt,
      featuredImage: data.featuredImage,
      categoryId: data.categoryId,
      keywords: data.keywords || [],
      faqs: data.faqs ? {
        create: data.faqs,
      } : undefined,
      seo: data.seo ? {
        create: data.seo,
      } : undefined,
    },
    include: {
      category: true,
      faqs: true,
      seo: true,
    },
  });
}

export async function publishPost(id: string) {
  return prisma.post.update({
    where: { id },
    data: { published: true },
    include: {
      category: true,
      faqs: true,
      seo: true,
    },
  });
}

export async function unpublishPost(id: string) {
  return prisma.post.update({
    where: { id },
    data: { published: false },
    include: {
      category: true,
      faqs: true,
      seo: true,
    },
  });
}

export async function getPublishedPosts(options?: {
  categoryId?: string;
  limit?: number;
  offset?: number;
  orderBy?: 'latest' | 'popular';
}) {
  return prisma.post.findMany({
    where: {
      published: true,
      ...(options?.categoryId ? { categoryId: options.categoryId } : {}),
    },
    include: {
      category: true,
      faqs: true,
      seo: true,
    },
    orderBy: {
      createdAt: options?.orderBy === 'latest' ? 'desc' : undefined,
    },
    take: options?.limit,
    skip: options?.offset,
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: {
      category: true,
      faqs: true,
      seo: true,
    },
  });
}

export async function getRelatedPosts(postId: string, categoryId: string, limit = 4) {
  return prisma.post.findMany({
    where: {
      published: true,
      categoryId,
      NOT: { id: postId },
    },
    include: {
      category: true,
      seo: true,
    },
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });
}