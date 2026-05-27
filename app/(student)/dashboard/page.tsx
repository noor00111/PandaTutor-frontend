'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useAuthStore } from '@/src/store/useAuthStore';
import { AccessDenied } from '@/src/components/ui/AccessDenied';
import { BlobBackground } from '@/src/components/ui/BlobBackground';
import { useStudentDashboard } from '@/src/features/student/hooks/useStudentDashboard';
import { BookingCard } from '@/src/features/student/studentComponents/dashboard/BookingCard';
import { EmptyBookings } from '@/src/features/student/studentComponents/dashboard/EmptyBookings';
import { ReviewModal } from '@/src/features/student/studentComponents/dashboard/ReviewModal';
import { Booking } from '@/src/types';

export default function StudentDashboard() {
  const { user } = useAuthStore();
  const {bookings, isLoading, reviewModalOpen, setReviewModalOpen, rating, setRating, comment, setComment, reviewMutation, handleOpenReview} = useStudentDashboard();

  if (!user || user.role !== 'STUDENT') {
    return <AccessDenied role="STUDENT" />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 relative overflow-hidden">
      <BlobBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-black text-brand-800 mb-2 tracking-tight">
            My Learning Dashboard
          </h1>
          <p className="text-lg text-slate-500 mb-10 font-medium flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-accent-400" />
            Manage your upcoming and past tutoring sessions.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-white/50 border border-slate-100 rounded-3xl animate-pulse shadow-sm" />
            ))}
          </div>
        ) : !bookings?.length ? (
          <EmptyBookings />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence>
              {bookings.map((booking: Booking, index: number) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  index={index}
                  onReview={handleOpenReview}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        <ReviewModal
          open={reviewModalOpen}
          rating={rating}
          comment={comment}
          isPending={reviewMutation.isPending}
          onClose={() => setReviewModalOpen(false)}
          onRating={setRating}
          onComment={setComment}
          onSubmit={() => reviewMutation.mutate()}
        />
      </div>
    </div>
  );
}
