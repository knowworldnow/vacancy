import { z } from 'zod';

export const commentSchema = z.object({
  content: z.string().min(1).max(1000),
  postId: z.string(),
  userId: z.string().optional(),
});

export const ratingSchema = z.object({
  value: z.number().min(1).max(5),
  postId: z.string(),
  userId: z.string().optional(),
});

export const feedbackSchema = z.object({
  type: z.enum(['suggestion', 'issue', 'praise']),
  content: z.string().min(10).max(1000),
  postId: z.string(),
  userId: z.string().optional(),
});