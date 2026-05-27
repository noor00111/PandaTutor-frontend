'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useAuthStore } from '@/src/store/useAuthStore';
import { useAvailability } from '@/src/features/tutors/hooks/useAvailability';
import { AddSlotForm } from '@/src/features/tutors/tutorComponents/availability/AddSlotForm';
import { SlotList } from '@/src/features/tutors/tutorComponents/availability/SlotList';
import { WeeklyOverview } from '@/src/features/tutors/tutorComponents/availability/WeeklyOverview';
import { AccessDenied } from '@/src/components/ui/AccessDenied';

export default function TutorAvailability() {
  const { user } = useAuthStore();
  const {
    isLoading,
    availabilities,
    newSlot,
    setNewSlot,
    addSlot,
    removeSlot,
    handleSave,
    formatTime,
    isSaving,
  } = useAvailability();

  if (!user || user.role !== 'TUTOR') {
    return <AccessDenied role="TUTOR" />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl text-teal-800 mb-2 tracking-tight">
            My Availability
          </h1>
          <p className="text-lg text-slate-500 mb-8 font-medium flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-accent-400" />
            Set your teaching schedule and availability for bookings.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-6">
            <div className="h-48 bg-white/50 border border-slate-100 rounded-3xl animate-pulse shadow-sm" />
            <div className="h-96 bg-white/50 border border-slate-100 rounded-3xl animate-pulse shadow-sm" />
          </div>
        ) : (
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <AddSlotForm newSlot={newSlot} setNewSlot={setNewSlot} onAdd={addSlot} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <SlotList
                availabilities={availabilities}
                onRemove={removeSlot}
                onSave={handleSave}
                isSaving={isSaving}
                formatTime={formatTime}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <WeeklyOverview availabilities={availabilities} formatTime={formatTime} />
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}
