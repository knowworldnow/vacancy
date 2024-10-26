'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  lowQualityUrl?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  lowQualityUrl,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
  }, [src]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {lowQualityUrl && isLoading && (
        <Image
          src={lowQualityUrl}
          alt={alt}
          className="absolute inset-0 blur-lg scale-110"
          {...props}
        />
      )}
      <Image
        src={src}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => setError(true)}
        {...props}
      />
    </div>
  );
}