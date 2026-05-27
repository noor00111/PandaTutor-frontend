import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Calendar } from 'lucide-react';

export function EmptyBookings() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
      <Card className="text-center py-20 px-4 bg-white/70 backdrop-blur-xl border-slate-100 shadow-xl shadow-slate-200/40 rounded-3xl">
        <CardContent className="flex flex-col items-center">
          <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <Calendar className="w-12 h-12 text-brand-400" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">No scheduled sessions</h3>
          <p className="text-slate-500 mb-8 max-w-sm text-lg">
            You don&apos;t have any past or upcoming bookings yet. Ready to start learning?
          </p>
          <Link href="/tutors">
            <Button className="h-14 rounded-full px-8 text-lg font-bold shadow-lg shadow-brand-500/25 transition-all hover:-translate-y-1">
              Find an Expert Tutor
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
