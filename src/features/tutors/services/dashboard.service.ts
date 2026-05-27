import { api } from '@/src/lib/api';

export const getTutorBookings = async () => {
  const res = await api.get('/bookings');
  return res.data.data.bookings;
};
