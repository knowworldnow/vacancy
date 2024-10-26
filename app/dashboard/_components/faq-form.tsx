'use client';

import { useState } from 'react';
import { FAQ } from '@/lib/types';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface FAQFormProps {
  form: UseFormReturn<any>;
  disabled?: boolean;
}

export function FAQForm({ form, disabled }: FAQFormProps) {
  const faqs = form.watch('faqs') || [];

  const addFAQ = () => {
    const currentFaqs = form.getValues('faqs') || [];
    form.setValue('faqs', [...currentFaqs, { question: '', answer: '' }]);
  };

  const removeFAQ = (index: number) => {
    const currentFaqs = form.getValues('faqs') || [];
    form.setValue(
      'faqs',
      currentFaqs.filter((_, i) => i !== index)
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>FAQs</CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addFAQ}
          disabled={disabled}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add FAQ
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.map((_, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg relative">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => removeFAQ(index)}
              disabled={disabled}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>

            <FormField
              control={form.control}
              name={`faqs.${index}.question`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question {index + 1}</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`faqs.${index}.answer`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer {index + 1}</FormLabel>
                  <FormControl>
                    <Textarea {...field} disabled={disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}