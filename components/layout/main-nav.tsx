'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Search as SearchComponent } from '@/components/search';
import { useState, useEffect } from 'react';

export function MainNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl">
              VacancyBee
            </Link>
          </div>
          <div className="w-[300px]" />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl">
            VacancyBee
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/blog" className="text-muted-foreground hover:text-foreground">
              Blog
            </Link>
            <Link href="/categories" className="text-muted-foreground hover:text-foreground">
              Categories
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <SearchComponent />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}