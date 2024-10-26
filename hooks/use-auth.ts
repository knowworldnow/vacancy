'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface LoginCredentials {
  email: string;
  password: string;
}

export function useAuth() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async ({ email, password }: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      router.push('/dashboard');
      return data.user;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid credentials',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [router, toast]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to logout',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [router, toast]);

  return {
    login,
    logout,
    isLoading,
  };
}