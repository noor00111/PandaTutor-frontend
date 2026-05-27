'use client';

import { useState } from 'react';
import {Shield, Edit3, Trash2, Save, X} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Category, CategoryListProps } from '@/src/types';

export function List({categories, onUpdate, onDelete, isUpdating, isDeleting}: CategoryListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const startEditing = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-md border-slate-100 shadow-xl rounded-3xl">
      <CardHeader>
        <CardTitle className='mb-8'>
          All Categories ({categories.length})
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <Shield className="w-10 h-10 mx-auto text-slate-300 mb-3" />

            <h3 className="font-bold text-lg">
              No categories found
            </h3>

            <p className="text-slate-500">
              Start by creating one.
            </p>
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-6 rounded-2xl border border-brand-100 bg-slate-50">

              {editingId === category.id ? (
                <div className="flex-1 flex gap-4 items-center">

                  <Input
                    value={editName}
                    onChange={(e) =>setEditName(e.target.value)}/>

                  <Button
                    onClick={() => {
                      onUpdate(category.id, editName);
                      cancelEditing();
                    }}
                    isLoading={isUpdating}>
                    <Save className="w-4 h-4 text-accent-300" />
                  </Button>

                  <Button onClick={cancelEditing} variant="outline">
                    <X className="w-4 h-4 text-accent-500" />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-accent-400" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button  onClick={() => startEditing(category)} variant="outline">
                      <Edit3 className="w-4 h-4 mr-2 text-accent-400" />
                      Edit
                    </Button>

                    <Button onClick={() => onDelete(category.id,category.name)}
                      variant="outline"
                      className="border-red-200 text-red-600"
                      isLoading={isDeleting}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}