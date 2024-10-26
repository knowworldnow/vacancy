'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from '@/components/ui/motion';

interface ContentRatingProps {
  postId: string;
}

export function ContentRating({ postId }: ContentRatingProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [hasRated, setHasRated] = useState(false);
  const { toast } = useToast();

  const handleRate = async (value: number) => {
    if (hasRated) return;

    try {
      // In production, make API call to save rating
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRating(value);
      setHasRated(true);
      
      toast({
        title: "Thank you for rating!",
        description: "Your feedback helps us improve our content.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit rating. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Rate this article</h3>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <motion.div
            key={value}
            whileHover={{ scale: hasRated ? 1 : 1.1 }}
            whileTap={{ scale: hasRated ? 1 : 0.9 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "hover:bg-transparent transition-colors duration-200",
                (hoveredRating >= value || rating >= value) && "text-yellow-400"
              )}
              onMouseEnter={() => !hasRated && setHoveredRating(value)}
              onMouseLeave={() => !hasRated && setHoveredRating(0)}
              onClick={() => handleRate(value)}
              disabled={hasRated}
            >
              <Star 
                className="h-5 w-5 transition-transform duration-200" 
                fill={hoveredRating >= value || rating >= value ? "currentColor" : "none"} 
              />
            </Button>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {hasRated && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-muted-foreground"
          >
            You rated this article {rating} star{rating !== 1 ? 's' : ''}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}