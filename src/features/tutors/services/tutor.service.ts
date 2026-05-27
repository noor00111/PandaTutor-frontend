import { api } from '@/src/lib/api';

export const getTutor = async (id: string) => {
  const res = await api.get(`/tutors/${id}`);
  return res.data.data.tutor;
};

export const createBooking = async (tutorUserId: string, dateISO: string) => {
  const res = await api.post('/bookings', { tutorId: tutorUserId, date: dateISO });
  return res.data;
};
