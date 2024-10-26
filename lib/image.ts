export const imageDefaults = {
  defaultFeaturedImage: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be',
  defaultAvatarImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  sizes: {
    featured: {
      width: 1200,
      height: 800,
    },
    thumbnail: {
      width: 400,
      height: 300,
    },
    avatar: {
      width: 100,
      height: 100,
    },
  },
};

export function getImageUrl(url: string, width: number, height: number): string {
  // If it's an Unsplash image, use their image optimization API
  if (url.includes('unsplash.com')) {
    return `${url}?w=${width}&h=${height}&fit=crop&q=80`;
  }
  
  // For other images, return as is (in production, implement your image optimization logic)
  return url;
}

export function getFeaturedImageUrl(url: string): string {
  const { width, height } = imageDefaults.sizes.featured;
  return getImageUrl(url || imageDefaults.defaultFeaturedImage, width, height);
}

export function getThumbnailUrl(url: string): string {
  const { width, height } = imageDefaults.sizes.thumbnail;
  return getImageUrl(url || imageDefaults.defaultFeaturedImage, width, height);
}

export function getAvatarUrl(url: string): string {
  const { width, height } = imageDefaults.sizes.avatar;
  return getImageUrl(url || imageDefaults.defaultAvatarImage, width, height);
}