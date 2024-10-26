import { prisma } from './client';
import slugify from 'slugify';

export async function createCategory(data: {
  name: string;
  description?: string;
}) {
  const slug = slugify(data.name, { lower: true, strict: true });

  return prisma.category.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
    },
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });
}