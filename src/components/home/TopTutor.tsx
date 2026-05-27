'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Star, ChevronRight } from 'lucide-react';
import { fadeUp, stagger } from '@/src/lib/animation';
import { getTutors } from '@/src/features/tutors/services/tutors.service';
import { Tutor } from '@/src/types';

export default function TopTutor() {
  const { data: tutors, isLoading } = useQuery<Tutor[]>({
    queryKey: ['tutors', ''],
    queryFn: () => getTutors(),
  });

  const topTutors = tutors?.slice(0, 3) ?? [];

  return (
    <section className="py-24" style={{ backgroundColor: '#F5FBE6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="text-center mb-16">
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-black tracking-tight mb-4"
            style={{ color: '#233D4D', fontFamily: 'var(--font-playfair)' }}>
            Our Top Tutors
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-md max-w-xl mx-auto subtitle">
            Hand picked teachers with strong track records and great reviews from students. Each one was carefully chosen for their knowledge, determination, and proven ability to help students really improve their grades!!
          </motion.p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-72 rounded-3xl animate-pulse" style={{ backgroundColor: '#F5FBE6' }} />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topTutors.map((tutor, i) => (
              <motion.div
                key={tutor.id}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300 }}>
                <div
                  className="rounded-3xl p-8 h-full flex flex-col shadow-lg"
                  style={{ backgroundColor: '#F5FBE6', border: '1px solid rgba(21,94,97,0.15)' }}>
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-md"
                      style={{ backgroundColor: '#215E61', color: '#F5FBE6' }}>
                      {tutor.user.name.charAt(0).toUpperCase()}
                    </div>
                    <span
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold"
                      style={{ backgroundColor: '#F5FBE6', color: '#215E61' }}>
                      <Star className="w-3.5 h-3.5 fill-current" style={{ color: '#f18512ff' }} />
                      {tutor.rating.toFixed(1)}
                    </span>
                  </div>

                  <h3 className="text-xl font-black mb-1" style={{ color: '#433636' }}>
                    {tutor.user.name}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutor.subjects.slice(0, 3).map((s) => (
                      <span
                        key={s.id}
                        className="text-xs font-bold px-3 py-1 rounded-full">
                        {s.name}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: '#896C6C' }}>
                    {tutor.bio || 'Passionate educator dedicated to helping students reach their full potential.'}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-black">
                      ${tutor.hourlyRate}<span className="text-sm font-medium">/hr</span>
                    </span>
                    <Link href={`/tutors/${tutor.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-2 rounded-full font-black text-sm"
                        style={{ backgroundColor: '#215E61', color: '#F5FBE6' }}>
                        Book
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12">

          <Link href="/tutors">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-md border-2 transition-all"
              style={{ borderColor: '#FE7F2D', color: '#FE7F2D' }}>
              View All Tutors
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
