'use client';

import { useState } from 'react';
import { Shield, Plus, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';

interface FormProps {
  onCreate: (name: string) => void;
  isPending: boolean;
}

export function Form({onCreate, isPending}: FormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;
    onCreate(name.trim());
    setName('');
    setIsAdding(false);
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-brand-800 mb-2 tracking-tight">
          Category{' '} Management
        </h1>

        <p className="text-lg text-slate-500 mb-8 font-medium flex items-center">
          <Shield className="w-5 h-5 mr-2 text-accent-400" />
          Organize and manage subject categories for tutors.
        </p>
      </div>

      <Card className="bg-white/80 backdrop-blur-md border-slate-100 shadow-xl rounded-3xl p-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              Add New Category
            </CardTitle>

            {!isAdding && (
              <Button onClick={() => setIsAdding(true)}>
                <Plus className="w-4 h-4 mr-2" /> Add Category
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {isAdding && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input className='mt-5'
                value={name}
                onChange={(e) =>setName(e.target.value)}
                placeholder="Enter category name"/>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {setIsAdding(false); setName('');}}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>

                <Button
                  type="submit"
                  isLoading={isPending}>
                  <Save className="w-4 h-4 mr-2" />
                  Create
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </>
  );
}