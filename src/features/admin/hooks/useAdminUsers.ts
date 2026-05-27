import {useMutation, useQuery,useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {getAdminUsers, toggleUserStatus} from '../services/adminUsers.service';

export const useAdminUsers = () => {
  const queryClient = useQueryClient();
  const usersQuery = useQuery({
    queryKey: ['admin-users'],
    queryFn: getAdminUsers,
  });

  const toggleStatusMutation = useMutation({
    mutationFn: toggleUserStatus,
    onSuccess: (data) => {
      toast.success(`User ${data.data.user.isBanned? 'banned': 'unbanned'} successfully`);
      queryClient.invalidateQueries({queryKey: ['admin-users'],});
    },
    onError: () => {toast.error('Action failed');}
  });

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    toggleUserStatus:
      toggleStatusMutation.mutate,
    isUpdating:
      toggleStatusMutation.isPending,
  };
};