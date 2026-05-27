import { api } from '@/src/lib/api';

export const getAdminBookings = async () => {
  const res = await api.get('/admin/bookings');
  return res.data.data.bookings;
};