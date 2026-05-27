import { api } from '@/src/lib/api';

export const categoryService = {
  getCategories: async () => {
    const res = await api.get('/categories');
    return res.data.data.categories;
  },

  createCategory: async (name: string) => {
    return api.post('/admin/categories', { name });
  },

  updateCategory: async (id: string, name: string) => {
    return api.put(`/admin/categories/${id}`, { name });
  },

  deleteCategory: async (id: string) => {
    return api.delete(`/admin/categories/${id}`);
  }
};