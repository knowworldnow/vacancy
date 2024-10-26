'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InterlinkSuggestion } from '@/lib/types';
import { Loader2, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

interface InterlinkSuggestionsProps {
  postId: string;
  onSelect: (link: string) => void;
}

export function InterlinkSuggestions({ postId, onSelect }: InterlinkSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<InterlinkSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}/interlinks`);
        if (!response.ok) throw new Error('Failed to fetch suggestions');
        const data = await response.json();
        setSuggestions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [postId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error: {error}
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="text-muted-foreground p-4">
        No relevant interlink suggestions found.
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Suggested Internal Links
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.targetPostId}
            className="border rounded-lg p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{suggestion.targetTitle}</h4>
              <Badge variant="secondary">
                {Math.round(suggestion.relevanceScore * 100)}% match
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {suggestion.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {suggestion.matchedKeywords.map((keyword) => (
                <Badge key={keyword} variant="outline">
                  {keyword}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelect(`[${suggestion.targetTitle}](/posts/${suggestion.targetSlug})`)}
              >
                <LinkIcon className="h-4 w-4 mr-2" />
                Insert Link
              </Button>
              <Link
                href={`/dashboard/posts/${suggestion.targetPostId}/edit`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="sm">
                  View Post
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}