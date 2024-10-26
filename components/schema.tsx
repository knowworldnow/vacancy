import { Post, Author, Category } from '@/lib/types';

interface SchemaProps {
  post: Post;
  author: Author;
  category: Category;
}

export function Schema({ post, author, category }: SchemaProps) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: author.name,
      description: author.bio,
      image: author.avatar,
    },
    publisher: {
      '@type': 'Organization',
      name: 'VacancyBee',
      logo: {
        '@type': 'ImageObject',
        url: 'https://vacancybee.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://vacancybee.com/posts/${post.slug}/`,
    },
    articleSection: category.name,
  };

  const faqSchema = post.faqs?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}