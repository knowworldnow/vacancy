import { Post, Author, Category } from '@/types/blog';

export const authors: Author[] = [
  {
    id: '1',
    name: 'John Smith',
    bio: 'Entertainment journalist with over a decade of experience covering Hollywood.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'Celebrity News',
    slug: 'celebrity-news',
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
  },
  {
    id: '3',
    name: 'Lifestyle',
    slug: 'lifestyle',
  },
];

export const posts: Post[] = [
  {
    id: '1',
    title: "Behind the Scenes with Hollywood's Rising Stars",
    slug: 'behind-the-scenes-hollywood-rising-stars',
    excerpt: 'An exclusive look at the next generation of Hollywood talent and their journey to stardom.',
    content: `
      <p>Get an intimate look at the next generation of Hollywood talent as we go behind the scenes with today's rising stars. From their early struggles to their breakthrough moments, we explore the journeys that shaped their careers.</p>
      
      <h2>The New Wave of Talent</h2>
      <p>Hollywood is experiencing a renaissance of fresh talent, with newcomers bringing diverse perspectives and unprecedented creativity to the screen.</p>
      
      <h2>Breaking Into the Industry</h2>
      <p>These rising stars share their experiences of breaking into the industry, from their first auditions to landing breakthrough roles.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=1200&h=800&fit=crop',
    categoryId: '1',
    authorId: '1',
    publishedAt: '2024-01-15T12:00:00Z',
    tags: ['hollywood', 'actors', 'entertainment'],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  const post = posts.find(p => p.slug === slug);
  if (!post) return undefined;

  const author = authors.find(a => a.id === post.authorId);
  const category = categories.find(c => c.id === post.categoryId);

  return {
    ...post,
    author: author!,
    category: category!,
  };
}

export function getRelatedPosts(postId: string, categoryId: string): Post[] {
  return posts
    .filter(p => p.id !== postId && p.categoryId === categoryId)
    .slice(0, 4)
    .map(post => ({
      ...post,
      author: authors.find(a => a.id === post.authorId)!,
      category: categories.find(c => c.id === post.categoryId)!,
    }));
}

export function getRecentPosts(): Post[] {
  return posts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5)
    .map(post => ({
      ...post,
      author: authors.find(a => a.id === post.authorId)!,
      category: categories.find(c => c.id === post.categoryId)!,
    }));
}