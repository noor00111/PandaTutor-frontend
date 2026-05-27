import { useQuery } from '@tanstack/react-query';
import { getAdminBookings } from '../services/booking.service';

export const useAdminBookings = () => {
  return useQuery({
    queryKey: ['admin-bookings'],
    queryFn: getAdminBookings,
  });
};