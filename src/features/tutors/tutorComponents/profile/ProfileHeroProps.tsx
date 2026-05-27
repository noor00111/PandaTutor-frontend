import { TutorProfileHeroProps } from '@/src/types';
import { motion } from 'framer-motion';
import { Mail, DollarSign, Star } from 'lucide-react';

export function ProfileHero({ profile }: TutorProfileHeroProps) {
  const tutorProfile = profile?.tutorProfile;

  return (
    <div className="rounded-3xl overflow-hidden shadow-xl max-w-7xl mx-auto my-12">
      <div className="relative h-36 flex items-end px-10 pb-0 bg-brand-600">
        <div className="absolute top-4 right-8 w-24 h-24 rounded-full opacity-20 bg-accent-500"/>
        <div className="absolute top-8 right-24 w-12 h-12 rounded-full opacity-10 bg-accent-500"/>

        <motion.div
          className="absolute -bottom-10 left-10 w-24 h-24 rounded-3xl flex items-center justify-center text-4xl font-black shadow-2xl border-4 text-accent-500 bg-accent-100"
          whileHover={{ scale: 1.08, rotate: 3 }}
          transition={{ type: 'spring', stiffness: 300 }}>
          {profile?.name?.charAt(0)?.toUpperCase()}
        </motion.div>
      </div>

      <div className="pt-16 px-10 pb-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div>
            <h2
              className="text-3xl mb-1">
              {profile?.name}
            </h2>

            <p className="flex items-center gap-2 font-medium mb-4">
              <Mail className="w-4 h-4 text-accent-400" />
              {profile?.email}
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest">
                {profile?.role}
              </span>

              {tutorProfile && (
                <>
                  <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold">
                    <DollarSign className="w-3.5 h-3.5 text-accent-400" />
                    {tutorProfile.hourlyRate}/hr
                  </span>

                  <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold">
                    <Star className="w-3.5 h-3.5 fill-current text-accent-400"/>
                    {tutorProfile.rating?.toFixed(1)} Rating
                  </span>
                </>
              )}
            </div>
          </div>

          {tutorProfile && (
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-3xl font-black text-accent-400">
                  {tutorProfile.subjects?.length ?? 0}
                </p>

                <p className="text-xs font-bold uppercase tracking-wide"                >
                  Subjects
                </p>
              </div>

              <div className="w-px"/>
              <div className="text-center">
                <p className="text-3xl font-black text-accent-400">
                  {tutorProfile.rating?.toFixed(1)}
                </p>

                <p
                  className="text-xs font-bold uppercase tracking-wide">
                  Rating
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}