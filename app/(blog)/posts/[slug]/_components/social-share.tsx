'use client';

import { Post } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Link2,
  Mail,
  Instagram,
  Share2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PinterestIcon } from './pinterest-icon';

interface SocialShareProps {
  post: Post;
  orientation?: 'vertical' | 'horizontal';
}

export function SocialShare({ post, orientation = 'vertical' }: SocialShareProps) {
  const { toast } = useToast();
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const title = post.title;
  const description = post.excerpt || '';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}&media=${encodeURIComponent(post.seo?.ogImage || '')}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`,
    instagram: `instagram://share?url=${encodeURIComponent(url)}`,
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'Link copied',
        description: 'The post URL has been copied to your clipboard.',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to copy link to clipboard.',
        variant: 'destructive',
      });
    }
  };

  const handleInstagramShare = () => {
    // Instagram doesn't have a direct share URL, so we'll show a toast with instructions
    toast({
      title: 'Instagram Sharing',
      description: 'To share on Instagram, please screenshot the article or use the Instagram app sharing features.',
    });
  };

  const containerClass = orientation === 'vertical' 
    ? 'flex flex-col gap-2' 
    : 'flex flex-wrap gap-2';

  return (
    <div className={containerClass}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(shareLinks.facebook, '_blank')}
        title="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(shareLinks.twitter, '_blank')}
        title="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(shareLinks.linkedin, '_blank')}
        title="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(shareLinks.pinterest, '_blank')}
        title="Share on Pinterest"
      >
        <PinterestIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(shareLinks.whatsapp, '_blank')}
        title="Share on WhatsApp"
      >
        <Share2 className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(shareLinks.email)}
        title="Share via Email"
      >
        <Mail className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleInstagramShare}
        title="Share on Instagram"
      >
        <Instagram className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={copyLink}
        title="Copy Link"
      >
        <Link2 className="h-4 w-4" />
      </Button>
    </div>
  );
}