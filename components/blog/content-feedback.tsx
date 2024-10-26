import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ContentRating } from './content-rating';
import { FeedbackForm } from './feedback-form';

interface ContentFeedbackProps {
  postId: string;
}

export function ContentFeedback({ postId }: ContentFeedbackProps) {
  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <ContentRating postId={postId} />
        <Separator />
        <FeedbackForm postId={postId} />
      </CardContent>
    </Card>
  );
}