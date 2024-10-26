'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Page } from '@/lib/types';
import { PageForm } from '../../../_components/page-form';

export default function EditPagePage() {
  const params = useParams();
  const router = useRouter();
  const [page, setPage] = useState<Page | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(`/api/pages/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setPage(data);
        }
      } catch (error) {
        console.error('Error fetching page:', error);
      }
    };

    fetchPage();
  }, [params.id]);

  if (!page) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Page</h1>
      <PageForm page={page} />
    </div>
  );
}