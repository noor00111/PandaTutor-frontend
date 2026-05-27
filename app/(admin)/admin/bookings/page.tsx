'use client';

import { useAuthStore } from '@/src/store/useAuthStore';
import { BlobBackground } from '@/src/components/ui/BlobBackground';
import { AccessDenied } from '@/src/components/ui/AccessDenied';
import { useAdminBookings } from '@/src/features/admin/hooks/useAdminBookings';
import { BookingTable } from '@/src/features/admin/components/bookings/BookingTable';
import { BookingStats } from '@/src/features/admin/components/bookings/BookingStats';


export default function AdminBookingsPage() {
  const { user } = useAuthStore();

  const {
    data: bookings = [],
    isLoading,
  } = useAdminBookings();

  if (!user || user.role !== 'ADMIN') {
    return <AccessDenied role="ADMIN" />;
  }

  const stats = {
    total: bookings.length,

    confirmed: bookings.filter(
      (b: any) => b.status === 'CONFIRMED'
    ).length,

    completed: bookings.filter(
      (b: any) => b.status === 'COMPLETED'
    ).length,

    cancelled: bookings.filter(
      (b: any) => b.status === 'CANCELLED'
    ).length,
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 relative overflow-hidden">
      <BlobBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-brand-800 mb-2">
            Booking Management
          </h1>
        </div>

        <div className="space-y-8">
          <BookingStats stats={stats} />

          <BookingTable
            bookings={bookings}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}