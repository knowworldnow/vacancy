import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-key-for-development-only'
);

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.enum(['ADMIN', 'AUTHOR', 'USER']),
});

export type User = z.infer<typeof userSchema>;

export async function signJWT(payload: { sub: string; email: string; role: string }) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);

  return token;
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function authenticate(email: string, password: string) {
  // In production, validate against database
  const user = {
    id: '1',
    email: 'admin@example.com',
    role: 'ADMIN',
  } as const;

  const token = await signJWT({
    sub: user.id,
    email: user.email,
    role: user.role,
  });

  cookies().set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return user;
}

export async function logout() {
  cookies().delete('auth-token');
  return NextResponse.json({ success: true });
}

export async function getSession() {
  const token = cookies().get('auth-token')?.value;
  if (!token) return null;

  const payload = await verifyJWT(token);
  if (!payload) return null;

  return {
    id: payload.sub,
    email: payload.email as string,
    role: payload.role as string,
  };
}