'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { uploadImage, ImageMetadata, imageConfig } from '@/lib/image-upload';

interface ImageUploadProps {
  onUpload: (image: ImageMetadata) => void;
  onRemove?: () => void;
  defaultImage?: string;
  aspectRatio?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export function ImageUpload({
  onUpload,
  onRemove,
  defaultImage,
  aspectRatio = 1.5,
  maxWidth = 1200,
  maxHeight = 800,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const image = await uploadImage(file);
      setPreview(image.url);
      onUpload(image);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
    onRemove?.();
  };

  return (
    <div className="space-y-4">
      <div
        className="relative border-2 border-dashed rounded-lg p-4 hover:bg-accent/50 transition-colors"
        style={{ aspectRatio }}
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground text-center">
              Drag and drop or click to upload
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Max file size: {imageConfig.maxSize / (1024 * 1024)}MB
            </p>
          </div>
        )}
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="image">Image</Label>
        <Input
          ref={inputRef}
          id="image"
          type="file"
          accept={imageConfig.acceptedTypes.join(',')}
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </div>
    </div>
  );
}