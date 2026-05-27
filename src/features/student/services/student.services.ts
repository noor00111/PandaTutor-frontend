import { api } from '@/src/lib/api';

export const getStudentBookings = async () => {
  const res = await api.get('/bookings');
  return res.data.data.bookings;
};

export const submitReview = async (payload: {
  tutorId: string;
  rating: number;
  comment: string;
}) => {
  const res = await api.post('/reviews', payload);
  return res.data;
};

export const getStudentProfile = async () => {
  const res = await api.get('/auth/me');
  return res.data.data.user;
};
