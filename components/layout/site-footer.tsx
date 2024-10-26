import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">About VacancyBee</h3>
            <p className="text-sm text-muted-foreground">
              Your premier destination for celebrity news, entertainment updates, and the latest in 
              fashion and lifestyle trends. We bring you exclusive stories and behind-the-scenes 
              coverage of your favorite stars.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </Link>
              <Link href="/advertise" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Advertise with Us
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Categories</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/categories/celebrity-news" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Celebrity News
              </Link>
              <Link href="/categories/fashion" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Fashion
              </Link>
              <Link href="/categories/lifestyle" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Lifestyle
              </Link>
              <Link href="/categories/entertainment" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Entertainment
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
              <Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Disclaimer
              </Link>
            </nav>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Social Links */}
        <div className="flex flex-col items-center space-y-6">
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:contact@vacancybee.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p>© {currentYear} VacancyBee. All rights reserved.</p>
            <p className="mt-1">
              Made with ❤️ for the entertainment community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}