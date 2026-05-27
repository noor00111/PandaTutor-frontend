'use client';

import { use } from 'react';
import { Star, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTutorProfile } from '@/src/features/tutors/hooks/useTutor';
import { fadeUp, stagger } from '@/src/lib/animation';
import { TutorInfoPanel } from '@/src/features/tutors/tutorComponents/tutorDetails/InfoPanel';
import { TutorBookingCard } from '@/src/features/tutors/tutorComponents/tutorDetails/BookingCard';


export default function TutorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const {user, tutor, isLoading, selectedDate, setSelectedDate, selectedTime, setSelectedTime, bookMutation, handleBooking} = useTutorProfile(id);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-body-500">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 rounded-full border-4 border-t-transparent border-brand-500"
      />
    </div>
  );

  if (!tutor) return (
    <div className="min-h-screen flex items-center justify-center bg-body-500">
      <p className="text-xl font-bold text-brand-500">Tutor not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-body-500">

      <div className="relative overflow-hidden bg-linear-to-br from-brand-900 via-brand-600 to-brand-500">
        <div className="absolute top-6 right-16 w-40 h-40 rounded-full opacity-10 bg-accent-200" />
        <div className="absolute top-16 right-40 w-20 h-20 rounded-full opacity-10 bg-accent-400" />
        <div className="absolute bottom-0 left-10 w-32 h-32 rounded-full opacity-10 bg-accent-200" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-12">
            <motion.div variants={fadeUp} custom={0}>
              <motion.div
                whileHover={{ scale: 1.06, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 280 }}
                className="w-36 h-36 md:w-44 md:h-44 rounded-3xl flex items-center justify-center text-6xl font-black shadow-2xl border-4 shrink-0 bg-accent-200 border-accent-300 text-brand-700">
                {tutor.user.name.charAt(0).toUpperCase()}
              </motion.div>
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <motion.div variants={fadeUp} custom={1} className="flex items-center gap-2 justify-center md:justify-start mb-3">
                <Sparkles className="w-4 h-4 text-accent-300" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent-300">Expert Tutor</span>
              </motion.div>

              <motion.h1
                variants={fadeUp} custom={2}
                className="text-5xl md:text-6xl font-black tracking-tight mb-4 text-accent-200">
                {tutor.user.name}
              </motion.h1>

              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 justify-center md:justify-start mb-5">
                <span className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold shadow-md bg-white/10 text-accent-200 border border-white/20">
                  <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                  {tutor.rating.toFixed(1)}
                  <span className="text-accent-200/60">({tutor.totalReviews})</span>
                </span>
                <span className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold shadow-md bg-white/10 text-accent-200 border border-white/20">
                  <span className="text-base font-black">${tutor.hourlyRate}</span>/hr
                </span>
              </motion.div>

              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-2 justify-center md:justify-start">
                {tutor.subjects.map((s: { id: string; name: string }) => (
                  <motion.span
                    key={s.id}
                    whileHover={{ scale: 1.07 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 text-accent-200 border border-white/20">
                    <BookOpen className="w-3 h-3" />
                    {s.name}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-20 -mt-16">
        <TutorInfoPanel tutor={tutor} />
        <TutorBookingCard
          tutor={tutor}
          currentUser={user}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          bookMutation={bookMutation}
          handleBooking={handleBooking}
        />
      </div>
    </div>
  );
}
