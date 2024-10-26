'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Post, postSchema } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { InterlinkSuggestions } from './interlink-suggestions';
import { SEOForm } from './seo-form';
import { FAQForm } from './faq-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PostFormProps {
  post?: Post;
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showInterlinkSuggestions, setShowInterlinkSuggestions] = useState(false);

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: post || {
      title: '',
      content: '',
      excerpt: '',
      published: false,
      seo: {
        metaTitle: '',
        metaDescription: '',
        featuredImage: '',
        canonicalUrl: '',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
      },
      faqs: [],
    },
  });

  const onSubmit = async (data: Post) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/posts${post ? `/${post.id}` : ''}`,
        {
          method: post ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast({
          title: 'Success',
          description: `Post ${post ? 'updated' : 'created'} successfully`,
        });
        router.push('/dashboard/posts');
      } else {
        throw new Error('Failed to save post');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const insertLink = (linkText: string) => {
    const contentField = form.getValues('content');
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
    const cursorPosition = textarea?.selectionStart || contentField.length;
    
    const newContent = 
      contentField.slice(0, cursorPosition) +
      linkText +
      contentField.slice(cursorPosition);
    
    form.setValue('content', newContent);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="content" className="space-y-4">
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isLoading}
                          className="h-20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <div className="flex items-center gap-2 mb-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setShowInterlinkSuggestions(!showInterlinkSuggestions)}
                        >
                          {showInterlinkSuggestions ? 'Hide' : 'Show'} Interlink Suggestions
                        </Button>
                      </div>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isLoading}
                          className="min-h-[400px] font-mono"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormLabel>Published</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="seo">
                <SEOForm form={form} disabled={isLoading} />
              </TabsContent>

              <TabsContent value="faq">
                <FAQForm form={form} disabled={isLoading} />
              </TabsContent>
            </Tabs>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
            </Button>
          </form>
        </Form>
      </div>
      
      <div className="md:col-span-1">
        {showInterlinkSuggestions && post && (
          <InterlinkSuggestions
            postId={post.id}
            onSelect={insertLink}
          />
        )}
      </div>
    </div>
  );
}