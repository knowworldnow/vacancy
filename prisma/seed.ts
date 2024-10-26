import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = [
    { name: 'Celebrity News', description: 'Latest updates from the world of celebrities' },
    { name: 'Fashion', description: 'Fashion trends and style updates' },
    { name: 'Lifestyle', description: 'Celebrity lifestyle and wellness' },
    { name: 'Entertainment', description: 'Movies, TV shows, and music news' },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: {
        name: category.name,
        slug: slugify(category.name, { lower: true, strict: true }),
        description: category.description,
      },
    });
  }

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });