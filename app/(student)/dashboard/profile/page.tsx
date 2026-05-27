'use client';

import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/src/store/useAuthStore';
import { AccessDenied } from '@/src/components/ui/AccessDenied';
import { BlobBackground } from '@/src/components/ui/BlobBackground';
import { useStudentProfile } from '@/src/features/student/hooks/useStudentProfile';
import { ProfileOverviewCard } from '@/src/features/student/studentComponents/profile/ProfileOverviewCard';
import { ProfileEditForm } from '@/src/features/student/studentComponents/profile/ProfileEditForm';

export default function StudentProfile() {
  const { user } = useAuthStore();
  const { profile, isLoading, isEditing, formData, setFormData, handleSubmit, handleEdit, handleCancel, isPending } = useStudentProfile();

  if (!user || user.role !== 'STUDENT') {
    return <AccessDenied role="STUDENT" />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 relative overflow-hidden">
      <BlobBackground />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-brand-800 mb-2 tracking-tight">
            My Profile
          </h1>
          <p className="text-lg text-slate-500 mb-8 font-medium flex items-center">
            <User className="w-5 h-5 mr-2 text-accent-400" />
            Manage your personal information and preferences.
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
              <ProfileOverviewCard profile={profile} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <ProfileEditForm
                profile={profile}
                isEditing={isEditing}
                formData={formData}
                isPending={isPending}
                setFormData={setFormData}
                onEdit={handleEdit}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
