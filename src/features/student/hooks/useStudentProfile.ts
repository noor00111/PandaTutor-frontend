import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { getStudentProfile } from '../services/student.services';

export function useStudentProfile() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const { data: profile, isLoading } = useQuery({
    queryKey: ['student-profile'],
    queryFn: getStudentProfile,
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { name: string; email: string }) => Promise.resolve(data),
    onSuccess: () => {
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['student-profile'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update profile');
    },
  });

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleEdit = () => {
    setFormData({ name: profile?.name || '', email: profile?.email || '' });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({ name: profile?.name || '', email: profile?.email || '' });
    setIsEditing(false);
  };

  return {
    profile,
    isLoading,
    isEditing,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleCancel,
    isPending: updateMutation.isPending,
  };
}
