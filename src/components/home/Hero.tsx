'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {ChevronRight, Star, Users,GraduationCap,} from 'lucide-react';
import { fadeUp, stagger } from '@/src/lib/animation';
import heroImage from '@/public/images/hero.jpg';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="min-h-screen overflow-hidden flex flex-col lg:flex-row items-center bg-[#F5F7EE]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-10 w-full flex-1 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}>

            <motion.div variants={fadeUp} className="mb-8">
              <span
                className="inline-flex items-center px-7 py-3 rounded-full border text-sm font-bold tracking-[0.25em] uppercase backdrop-blur-xl"
                style={{
                  borderColor: 'rgba(38,84,82,0.12)',
                  background: 'linear-gradient(135deg, rgba(216,164,127,0.12), rgba(255,255,255,0.55))',
                  color: '#265452',
                  boxShadow: '0 10px 30px rgba(216,164,127,0.08)',
                }}>
                Learn. Grow. Succeed!
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.95] tracking-[-0.05em] mb-8"
              style={{fontFamily: 'var(--font-playfair)', color: '#18302E'}}>
              Your Journey to{' '}
              <span className="text-accent-500 relative inline-block">
                Success
                </span>{' '}
              Starts Smoothly Here!
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl leading-relaxed max-w-2xl mb-10 text-[#5B6B67]">
              Get in touch with knowledgeable tutors, schedule
              individualized lessons, and expedite your educational
              process, all in one location!
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-5 mb-8">
              <Link href="/register">
                <motion.button
                  whileHover={{scale: 1.04,y: -2,}}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-lg transition-all text-gray-100 bg-brand-600 shadow-xl hover:shadow-2xl">
                  Get Started
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </Link>

              <Link href="/tutors">
                <motion.button
                  whileHover={{scale: 1.04, backgroundColor: 'rgba(255,255,255,0.95)'}}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-5 rounded-2xl font-black text-lg border backdrop-blur-xl transition-all text-[#18302E] border-gray-300 bg-white/60 shadow-lg">
                  Find a Tutor
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-3 pt-2 border-t border-[rgba(38,84,82,0.08)]">
              {[
                {icon: Users, value: '10K+', label: 'Happy Learners'},
                {icon: GraduationCap, value: '500+',label: 'Expert Tutors'},
                {icon: Star, value: '98%', label: 'Success Rate'},
              ].map(({ icon: Icon, value, label }) => (
                <motion.div
                  whileHover={{ y: -5 }}
                  key={label}
                  className="flex items-center gap-4 bg-white/70 backdrop-blur-xl px-5 py-5 rounded-3xl shadow-lg border border-white/50">

                  <div className="w-16 h-16 rounded-2xl bg-accent-300 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#265452]" />
                  </div>

                  <div>
                    <p className="text-3xl font-black leading-none text-[#18302E]">
                      {value}
                    </p>

                    <p className="text-sm mt-1 font-medium tracking-wide text-gray-600">
                      {label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </div>


      <div className="flex-1 flex justify-center items-center px-6 pb-12 lg:pb-0">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative">

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{duration: 4, repeat: Infinity}}
            className="absolute -top-6 -left-6 bg-white shadow-2xl rounded-2xl px-5 py-4 z-20 hidden md:block">

            <p className="text-sm text-gray-500 font-medium">
              Trusted by Students
            </p>

            <h4 className="text-xl font-black text-[#18302E]">
              10K+ Learners
            </h4>
          </motion.div>

          <div className="overflow-hidden rounded-full shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
            <Image
              src={heroImage}
              alt="hero image"
              width={620}
              height={700}
              priority
              className="object-cover hover:scale-105 transition-transform duration-700"/>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
