import { Post } from '@/lib/types';
import { TableOfContents } from './table-of-contents';
import { RecentPosts } from './recent-posts';
import { ContentFeedback } from '@/components/blog/content-feedback';
import { Card } from '@/components/ui/card';

interface PostSidebarProps {
  post: Post;
}

export function PostSidebar({ post }: PostSidebarProps) {
  return (
    <div className="space-y-8 sticky top-24">
      <Card className="p-6">
        <TableOfContents content={post.content} />
      </Card>
      <Card className="p-6">
        <RecentPosts currentPostId={post.id} />
      </Card>
      <ContentFeedback postId={post.id} />
    </div>
  );
}