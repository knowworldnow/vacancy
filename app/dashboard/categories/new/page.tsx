import { CategoryForm } from '../../_components/category-form';

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Category</h1>
      <CategoryForm />
    </div>
  );
}