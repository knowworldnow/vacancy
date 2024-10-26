import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createHash, randomBytes } from 'crypto';

// Use environment variable for JWT secret with a secure fallback
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || randomBytes(32).toString('hex')
);

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.enum(['ADMIN', 'AUTHOR', 'USER']),
  name: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

// Mock users with hashed passwords (in production, use a database)
const users = [
  {
    id: '1',
    email: 'admin@example.com',
    // In production, store hashed passwords in the database
    passwordHash: createHash('sha256')
      .update('admin123' + process.env.JWT_SECRET)
      .digest('hex'),
    role: 'ADMIN',
    name: 'Admin User',
  },
];

function hashPassword(password: string): string {
  return createHash('sha256')
    .update(password + process.env.JWT_SECRET)
    .digest('hex');
}

async function signJWT(payload: { sub: string; email: string; role: string; name?: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
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
  try {
    // Validate input
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Find user (in production, query database)
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify password
    const hashedPassword = hashPassword(password);
    if (hashedPassword !== user.passwordHash) {
      throw new Error('Invalid password');
    }

    // Generate JWT
    const token = await signJWT({
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    // Set secure cookie
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    // Return user data (exclude sensitive information)
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function logout() {
  try {
    cookies().delete('auth-token');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
}

export async function getSession() {
  try {
    const token = cookies().get('auth-token')?.value;
    if (!token) return null;

    const payload = await verifyJWT(token);
    if (!payload) return null;

    return {
      id: payload.sub as string,
      email: payload.email as string,
      role: payload.role as string,
      name: payload.name as string,
    };
  } catch (error) {
    console.error('Session error:', error);
    return null;
  }
}

// Utility function to check if user has required role
export async function checkRole(requiredRole: 'ADMIN' | 'AUTHOR' | 'USER') {
  const session = await getSession();
  if (!session) return false;
  return session.role === requiredRole || session.role === 'ADMIN';
}