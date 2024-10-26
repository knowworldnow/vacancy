'use client';

import { useState, useCallback, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from './use-debounce';

export function useSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  
  const debouncedQuery = useDebounce(query, 300);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      
      startTransition(() => {
        if (value) {
          router.push(`/search?q=${encodeURIComponent(value)}`);
        } else {
          router.push('/search');
        }
      });
    },
    [router]
  );

  return {
    query,
    debouncedQuery,
    handleSearch,
    isPending,
  };
}