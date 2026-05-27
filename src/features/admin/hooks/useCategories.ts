import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { categoryService } from '../services/category.service';

export const useCategories = () => {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: ['categories']
    });
  };

  //--------- Get Category ---------//
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getCategories
  });

  //---------------- Create Category ----------------//
  const createCategory = useMutation({
    mutationFn: categoryService.createCategory,

    onSuccess: () => {
      toast.success('Category created successfully!');
      invalidate();
    },

    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || 'Failed to create category');
    }
  });

  //----------------- Update Category ----------------//
  const updateCategory = useMutation({
    mutationFn: ({ id, name}: {id: string; name: string;}) =>
      categoryService.updateCategory(id, name),

    onSuccess: () => {
      toast.success('Category updated successfully!');
      invalidate();
    },

    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || 'Failed to update category');
    }
  });

  //---------------- Delete Category ---------------//
  const deleteCategory = useMutation({
    mutationFn: categoryService.deleteCategory,
    onSuccess: () => {
      toast.success('Category deleted successfully!');
      invalidate();
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete category');
    }
  });

  return {
    //----------------- query --------------//
    categories:
      categoriesQuery.data || [],
    isLoading:
      categoriesQuery.isLoading,

    //------------- mutations ---------------//
    createCategory,
    updateCategory,
    deleteCategory
  };
};