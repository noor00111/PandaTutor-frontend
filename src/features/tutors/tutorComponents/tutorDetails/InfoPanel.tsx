'use client';

import { format } from 'date-fns';
import { Star, BookOpen, MessageSquare, GraduationCap, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TutorInfoPanelProps } from '@/src/types';
import { fadeUp, stagger } from '@/src/lib/animation';

export function TutorInfoPanel({ tutor }: TutorInfoPanelProps) {
  
  return (
    <motion.div
      className="lg:col-span-2 space-y-8"
      initial="hidden"
      animate="visible"
      variants={stagger}>
        
      <motion.div variants={fadeUp} custom={0}>
        <div className="rounded-3xl overflow-hidden shadow-xl">
          <div className="px-8 py-5 flex items-center gap-3 border-b bg-brand-600">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-accent-200">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-black text-accent-200">About Me</h2>
          </div>
          <div className="p-8">
            <p className="leading-relaxed text-base">
              {tutor.bio || "This tutor hasn't added a bio yet."}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} custom={1} className="grid grid-cols-3 gap-4">
        {[
          { icon: Star, label: 'Rating', value: tutor.rating.toFixed(1), },
          { icon: MessageSquare, label: 'Reviews', value: tutor.totalReviews, },
          { icon: BookOpen, label: 'Subjects', value: tutor.subjects.length, },
        ].map(({ icon: Icon, label, value }) => (
          <motion.div
            key={label}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="rounded-3xl p-6 text-center shadow-md">
            <Icon className="w-6 h-6 mx-auto mb-2 text-accent-400" />
            <p className="text-3xl font-black mb-1 text-brand-900">{value}</p>
            <p className="text-xs font-bold uppercase tracking-wide text-brand-400">{label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} custom={2}>
        <div className="rounded-3xl overflow-hidden shadow-xl border border-brand-100/40">
          <div className="px-8 py-5 flex items-center gap-3 bg-brand-600 border-b border-brand-700">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-accent-200">
              <Award className="w-4 h-4 text-brand-700" />
            </div>
            <h2 className="text-xl font-black text-accent-200">
              Student Reviews
              <span className="ml-2 text-sm font-bold px-2.5 py-0.5 rounded-full bg-accent-400 text-white">
                {tutor.reviews?.length || 0}
              </span>
            </h2>
          </div>

          <div className="p-8 space-y-6 bg-body-500">
            <AnimatePresence>
              {tutor.reviews?.length ? tutor.reviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-2xl p-6 bg-surface-400 border border-brand-100/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0 bg-brand-600 text-accent-200">
                      {review.student.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm leading-none mb-1 text-brand-900">{review.student.name}</p>
                      <p className="text-xs text-brand-400">{format(new Date(review.createdAt), 'MMM d, yyyy')}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className={`w-3.5 h-3.5 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-brand-300'}`} />
                      ))}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-sm leading-relaxed italic pl-1 text-brand-900/80">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  )}
                </motion.div>
              )) : (
                <div className="text-center py-10">
                  <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30 text-brand-500" />
                  <p className="font-medium text-brand-400">No reviews yet. Be the first to book!</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
