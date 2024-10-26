'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

interface CommentsProps {
  postId: string;
}

export function Comments({ postId }: CommentsProps) {
  const [comment, setComment] = useState('');

  // Mock comments data
  const comments = [
    {
      id: '1',
      author: 'John Doe',
      content: 'Great article! Very informative.',
      createdAt: new Date('2024-03-01'),
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
    // Add more comments
  ];

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      
      {/* Comment Form */}
      <div className="mb-8">
        <Textarea
          placeholder="Leave a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mb-4"
        />
        <Button>Post Comment</Button>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={comment.avatar} alt={comment.author} />
              <AvatarFallback>{comment.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">{comment.author}</span>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                </span>
              </div>
              <p className="text-muted-foreground">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}