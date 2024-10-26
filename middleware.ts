import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

const CSRF_SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS'];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const headers = response.headers;
  
  // Security Headers
  headers.set('X-DNS-Prefetch-Control', 'on');
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://plausible.io; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://plausible.io;"
  );

  // Preconnect to required origins
  headers.append('Link', '<https://images.unsplash.com>; rel=preconnect');
  headers.append('Link', '<https://fonts.gstatic.com>; rel=preconnect');

  // Cache Control Headers
  const url = request.nextUrl;
  
  if (url.pathname.startsWith('/api/')) {
    headers.set('Cache-Control', 'no-store');
  } else if (
    url.pathname.match(/\.(jpg|jpeg|png|webp|avif|gif|ico)$/) ||
    url.pathname.includes('_next/image')
  ) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (url.pathname.match(/\.(css|js)$/)) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else {
    headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=60, stale-while-revalidate=300'
    );
  }

  // Compression
  if (
    !request.headers.get('accept-encoding')?.includes('br') &&
    !request.headers.get('accept-encoding')?.includes('gzip')
  ) {
    headers.set('Content-Encoding', 'identity');
  }

  return response;
}