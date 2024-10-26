import sharp from 'sharp';
import { imageSize } from 'image-size';

interface OptimizeImageOptions {
  quality?: number;
  width?: number;
  height?: number;
  format?: 'webp' | 'avif' | 'jpeg';
}

export async function optimizeImage(
  input: Buffer,
  options: OptimizeImageOptions = {}
): Promise<Buffer> {
  const {
    quality = 80,
    width,
    height,
    format = 'webp',
  } = options;

  let pipeline = sharp(input);

  // Get original dimensions if not provided
  if (!width && !height) {
    const dimensions = imageSize(input);
    if (dimensions.width && dimensions.width > 1920) {
      pipeline = pipeline.resize(1920, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });
    }
  } else {
    pipeline = pipeline.resize(width, height, {
      withoutEnlargement: true,
      fit: 'inside',
    });
  }

  // Convert to specified format
  switch (format) {
    case 'webp':
      pipeline = pipeline.webp({ quality });
      break;
    case 'avif':
      pipeline = pipeline.avif({ quality });
      break;
    case 'jpeg':
      pipeline = pipeline.jpeg({ quality, progressive: true });
      break;
  }

  return pipeline.toBuffer();
}