import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';

export function generateCsrfToken(): string {
  return randomBytes(32).toString('hex');
}

export function setCsrfToken(): string {
  const token = generateCsrfToken();
  cookies().set('csrf_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  return token;
}

export function validateCsrfToken(token: string): boolean {
  const storedToken = cookies().get('csrf_token')?.value;
  return token === storedToken;
}