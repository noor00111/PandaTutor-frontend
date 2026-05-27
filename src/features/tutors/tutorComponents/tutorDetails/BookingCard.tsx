'use client';

import { CalendarDays, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { TutorBookingCardProps} from '@/src/types';
import { DAYS } from '../../hooks/useTutor';



export function TutorBookingCard({tutor, currentUser, selectedDate, setSelectedDate, selectedTime, setSelectedTime, bookMutation, handleBooking}: TutorBookingCardProps) {

  return (
    <motion.div className="lg:col-span-1"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>

      <div className="sticky top-24 rounded-3xl overflow-hidden shadow-2xl border border-brand-100/30">
        <div className="relative px-8 py-7 overflow-hidden bg-brand-600">
          <div className="absolute top-2 right-4 w-24 h-24 rounded-full opacity-10 bg-accent-200" />
          <h3 className="text-2xl font-black relative z-10 text-accent-200">Book a Session</h3>
          <p className="text-sm font-medium mt-1 relative z-10 text-accent-200/65">
            Reserve your spot with {tutor.user.name.split(' ')[0]}
          </p>
          <div className="flex items-center gap-2 mt-4 relative z-10 text-accent-200">
            <span className="text-3xl font-black">${tutor.hourlyRate}</span>
            <span className="text-sm font-medium">/hour</span>
          </div>
        </div>

        <div className="p-6 space-y-6 bg-body-500">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CalendarDays className="w-4 h-4 text-brand-500" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">Availability</p>
            </div>
            {tutor.availabilities?.length ? (
              <div className="space-y-2">
                {tutor.availabilities.map((avail) => (
                  <div key={avail.id}
                    className="flex justify-between items-center px-4 py-3 rounded-2xl text-sm bg-surface-400 border border-brand-100/20">
                    <span className="font-bold text-brand-900">{DAYS[avail.dayOfWeek]}</span>
                    <span className="flex items-center gap-1 font-bold text-xs px-2.5 py-1 rounded-full bg-brand-600 text-accent-200">
                      <Clock className="w-3 h-3" />
                      {avail.startTime} – {avail.endTime}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm p-4 rounded-2xl font-medium bg-surface-400 text-brand-400">
                No availability set yet.
              </p>
            )}
          </div>
          <div className="space-y-4 border-t border-brand-100/20 pt-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2 text-brand-400">
                Select Date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full h-12 rounded-2xl px-4 text-sm outline-none transition-all bg-surface-400 text-brand-900 border-2 border-transparent focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2 text-brand-400">
                Select Time
              </label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full h-12 rounded-2xl px-4 text-sm outline-none transition-all bg-surface-400 text-brand-900 border-2 border-transparent focus:border-brand-500"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBooking}
            disabled={bookMutation.isPending || !tutor.availabilities?.length}
            className="w-full h-14 rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-lg transition-opacity disabled:opacity-60 bg-gradient-to-br from-brand-700 to-brand-500 text-accent-200">
            {bookMutation.isPending ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 rounded-full border-2 border-t-transparent border-accent-200" />
            ) : (
              <>Confirm Booking <ChevronRight className="w-5 h-5" /></>
            )}
          </motion.button>

          {currentUser?.role === 'TUTOR' && (
            <p className="text-center text-xs font-semibold px-4 py-2.5 rounded-xl bg-surface-400 text-brand-500">
              Tutors cannot book sessions with other tutors.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
