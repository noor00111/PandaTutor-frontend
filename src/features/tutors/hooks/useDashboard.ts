import { useQuery } from '@tanstack/react-query';
import { getTutorBookings } from '../services/dashboard.service';

export function useDashboard() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['tutor-bookings'],
    queryFn: getTutorBookings,
  });

  const upcomingCount = bookings?.filter((b: { status: string }) => b.status === 'CONFIRMED').length ?? 0;
  const completedCount = bookings?.filter((b: { status: string }) => b.status === 'COMPLETED').length ?? 0;

  return { bookings, isLoading, upcomingCount, completedCount };
}
