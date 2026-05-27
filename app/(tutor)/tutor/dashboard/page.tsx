'use client';

import { useAuthStore } from '@/src/store/useAuthStore';
import { useDashboard } from '@/src/features/tutors/hooks/useDashboard';
import { StatsCards } from '@/src/features/tutors/tutorComponents/dashboard/StatsCards';
import { BookingsTable } from '@/src/features/tutors/tutorComponents/dashboard/BookingsTable';
import { AccessDenied } from '@/src/components/ui/AccessDenied';

export default function TutorDashboard() {
  const { user } = useAuthStore();
  const { bookings, isLoading, upcomingCount, completedCount } = useDashboard();

  if (!user || user.role !== 'TUTOR') {
    return <AccessDenied role="TUTOR" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Tutor Dashboard
          </h1>
          <p className="text-slate-600 text-lg">
            {user.name}! Here&apos;s your teaching overview.
          </p>
        </div>
      </div>

      <StatsCards upcomingCount={upcomingCount} completedCount={completedCount} />
      <h2 className="text-2xl font-bold text-slate-900 mb-6 px-5">Your Teaching Schedule</h2>
      <BookingsTable bookings={bookings} isLoading={isLoading} />
    </div>
  );
}
