import { api } from '@/src/lib/api';

export const getTutors = async (category?: string) => {
  let url = '/tutors?';
  if (category) url += `category=${category}&`;
  const res = await api.get(url);
  return res.data.data.tutors;
};