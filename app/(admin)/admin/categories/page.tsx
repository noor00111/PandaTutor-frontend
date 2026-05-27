'use client';

import { BlobBackground } from '@/src/components/ui/BlobBackground';
import { AccessDenied } from '@/src/components/ui/AccessDenied';
import { useAuthStore } from '@/src/store/useAuthStore';
import { Form } from '@/src/features/admin/components/categories/AddCategory';
import { List } from '@/src/features/admin/components/categories/List';
import { useCategories } from '@/src/features/admin/hooks/useCategories';

export default function AdminCategoriesPage() {
  const { user } = useAuthStore();
  const {categories, isLoading, createCategory, updateCategory, deleteCategory} = useCategories();

  if (!user || user.role !== 'ADMIN') {
    return <AccessDenied role="ADMIN" />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
      <BlobBackground />

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 space-y-8">
        <Form
          onCreate={(name) =>createCategory.mutate(name)}
          isPending={createCategory.isPending}/>

        {!isLoading && (
          <List categories={categories}
            onUpdate={(id, name) => updateCategory.mutate({id, name})}
            onDelete={(id, name) => {
              const confirmed = confirm(`Delete "${name}"?`);
              if (confirmed) {
                deleteCategory.mutate(id);
              }
            }}
            isUpdating={updateCategory.isPending}
            isDeleting={deleteCategory.isPending}
          />
        )}
      </div>
    </div>
  );
}