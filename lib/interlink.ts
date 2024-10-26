import { Post } from './types';
import { posts } from './db';

// Function to extract keywords from content
function extractKeywords(content: string): string[] {
  // Remove HTML tags and special characters
  const cleanContent = content.replace(/<[^>]*>/g, '').toLowerCase();
  
  // Split into words and remove common words
  const commonWords = new Set(['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with']);
  const words = cleanContent.split(/\W+/).filter(word => 
    word.length > 3 && !commonWords.has(word)
  );
  
  // Return unique keywords
  return Array.from(new Set(words));
}

// Function to calculate relevance score between two posts
function calculateRelevanceScore(sourcePost: Post, targetPost: Post): number {
  const sourceKeywords = new Set(sourcePost.keywords || extractKeywords(sourcePost.content));
  const targetKeywords = new Set(targetPost.keywords || extractKeywords(targetPost.content));
  
  // Find common keywords
  const commonKeywords = new Set(
    Array.from(sourceKeywords).filter(x => targetKeywords.has(x))
  );
  
  // Calculate Jaccard similarity coefficient
  const union = new Set([...sourceKeywords, ...targetKeywords]);
  return commonKeywords.size / union.size;
}

// Function to get excerpt around matching keywords
function getExcerpt(content: string, keywords: string[]): string {
  const cleanContent = content.replace(/<[^>]*>/g, '');
  const words = cleanContent.split(/\s+/);
  
  for (let i = 0; i < words.length; i++) {
    for (const keyword of keywords) {
      if (words[i].toLowerCase().includes(keyword.toLowerCase())) {
        const start = Math.max(0, i - 5);
        const end = Math.min(words.length, i + 6);
        return words.slice(start, end).join(' ') + '...';
      }
    }
  }
  
  return cleanContent.slice(0, 100) + '...';
}

export function findInterlinkSuggestions(sourcePost: Post, maxSuggestions: number = 5) {
  const suggestions = posts
    .filter(targetPost => 
      targetPost.id !== sourcePost.id && 
      targetPost.published &&
      !sourcePost.relatedPosts?.includes(targetPost.id)
    )
    .map(targetPost => {
      const relevanceScore = calculateRelevanceScore(sourcePost, targetPost);
      const sourceKeywords = sourcePost.keywords || extractKeywords(sourcePost.content);
      const targetKeywords = targetPost.keywords || extractKeywords(targetPost.content);
      const matchedKeywords = sourceKeywords.filter(k => targetKeywords.includes(k));
      
      return {
        sourcePostId: sourcePost.id,
        targetPostId: targetPost.id,
        relevanceScore,
        matchedKeywords,
        targetTitle: targetPost.title,
        targetSlug: targetPost.slug,
        excerpt: getExcerpt(targetPost.content, matchedKeywords),
      };
    })
    .filter(suggestion => suggestion.relevanceScore > 0.1) // Minimum relevance threshold
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, maxSuggestions);

  return suggestions;
}