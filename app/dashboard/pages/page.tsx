import { Metadata } from 'next';
import { pages } from '@/lib/db';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pages - Blog Management',
  description: 'Manage your static pages',
};

export default function PagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pages</h1>
        <Link href="/dashboard/pages/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Page
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={pages} />
    </div>
  );
}