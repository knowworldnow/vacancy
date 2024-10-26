import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/auth';

const PROTECTED_PATHS = ['/dashboard'];
const AUTH_PATHS = ['/login', '/register'];

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

  // Authentication Check
  const token = request.cookies.get('auth-token')?.value;
  const isProtectedPath = PROTECTED_PATHS.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );
  const isAuthPath = AUTH_PATHS.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = await verifyJWT(token);
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (isAuthPath && token) {
    const payload = await verifyJWT(token);
    if (payload) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
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

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};