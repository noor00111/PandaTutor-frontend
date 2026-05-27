import { api } from '@/src/lib/api';

export const getAdminUsers = async () => {
  const res = await api.get('/admin/users');
  return res.data.data.users;
};

export const toggleUserStatus = async ({id, isBanned}: {id: string;isBanned: boolean;}) => {
  const res = await api.patch(`/admin/users/${id}`, {isBanned,});
  return res.data;
};