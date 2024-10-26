import { z } from 'zod';

export const imageSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
  alt: z.string(),
  size: z.number(),
  type: z.string(),
});

export type ImageMetadata = z.infer<typeof imageSchema>;

export const imageConfig = {
  maxSize: 5 * 1024 * 1024, // 5MB
  acceptedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  dimensions: {
    featured: {
      width: 1200,
      height: 800,
      aspectRatio: 1.5,
    },
    thumbnail: {
      width: 400,
      height: 300,
      aspectRatio: 1.33,
    },
    avatar: {
      width: 200,
      height: 200,
      aspectRatio: 1,
    },
  },
};

export async function uploadImage(file: File): Promise<ImageMetadata> {
  if (!imageConfig.acceptedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.');
  }

  if (file.size > imageConfig.maxSize) {
    throw new Error('File size too large. Maximum size is 5MB.');
  }

  // In production, implement your image upload logic here
  // For example, upload to Cloudinary, AWS S3, or another service
  
  // Mock implementation for development
  return {
    url: URL.createObjectURL(file),
    width: 1200,
    height: 800,
    alt: file.name,
    size: file.size,
    type: file.type,
  };
}

export function getOptimizedImageUrl(url: string, width: number, height: number): string {
  // If using Cloudinary
  if (url.includes('cloudinary.com')) {
    return url.replace('/upload/', `/upload/c_fill,w_${width},h_${height},q_auto,f_auto/`);
  }
  
  // If using Imgix
  if (url.includes('imgix.net')) {
    return `${url}?w=${width}&h=${height}&fit=crop&auto=format,compress`;
  }
  
  // If using Unsplash
  if (url.includes('unsplash.com')) {
    return `${url}?w=${width}&h=${height}&fit=crop&q=80`;
  }
  
  // Default: return original URL
  return url;
}

export function generateBlurDataUrl(width: number, height: number): string {
  return `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="%23f3f4f6"/></svg>`;
}