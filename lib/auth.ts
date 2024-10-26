import { NextResponse } from 'next/server';
import { z } from 'zod';
import { cookies } from 'next/headers';

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'AUTHOR']),
});

export type User = z.infer<typeof userSchema>;

// Mock users - in production, use a proper database
export const users: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'ADMIN',
  },
  {
    id: '2',
    email: 'author@example.com',
    password: 'author123',
    role: 'AUTHOR',
  },
];

export async function authenticate(email: string, password: string): Promise<User | null> {
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // In production, use proper session management
    cookies().set('auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  }
  
  return user || null;
}

export async function logout() {
  cookies().delete('auth');
  return NextResponse.json({ success: true });
}