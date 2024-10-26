'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Restore scroll position
      const scrollPos = sessionStorage.getItem(`scroll_${pathname}`);
      if (scrollPos) {
        window.scrollTo(0, parseInt(scrollPos));
        sessionStorage.removeItem(`scroll_${pathname}`);
      }

      // Save scroll position before unload
      const handleBeforeUnload = () => {
        sessionStorage.setItem(
          `scroll_${pathname}`,
          window.scrollY.toString()
        );
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [pathname]);
}