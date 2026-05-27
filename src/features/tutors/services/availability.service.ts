import { api } from '@/src/lib/api';
import { AvailabilitySlot } from '@/src/types';

export const updateAvailability = async (availabilities: AvailabilitySlot[]) => {
  const res = await api.put('/tutors/availability', { availabilities });
  return res.data;
};
