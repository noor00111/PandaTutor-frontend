import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Calendar, Clock, Star, PlayCircle } from 'lucide-react';
import { BookingCardProps } from '@/src/types';



export function BookingCard({ booking, index, onReview }: BookingCardProps) {
  const isCompleted = booking.status === 'COMPLETED';
  const isCancelled = booking.status === 'CANCELLED';
  const dateStr = format(new Date(booking.date), 'EEEE, MMMM do, yyyy');
  const timeStr = format(new Date(booking.date), 'h:mm a');


  return (
    <motion.div
      key={booking.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}>

      <Card className="overflow-hidden bg-accent-100/40 backdrop-blur-md shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-3xl relative group">
        <div className="flex flex-col p-8 pl-10 h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-linear-to-br from-brand-50 to-brand-100 rounded-xl flex items-center justify-center text-brand-700 font-black text-2xl shadow-sm border border-white shrink-0 group-hover:scale-105 transition-transform">
                {booking.tutor.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-black text-xl text-brand-900 leading-tight mb-1">{booking.tutor.name}</h3>
                <p className="text-brand-600 font-semibold text-sm bg-brand-50 inline-flex px-2 py-0.5 rounded border border-brand-100">Tutor</p>
              </div>
            </div>
            <span className='px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest shadow-sm border'>
              {booking.status}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-slate-50/50 p-4 rounded-2xl border border-brand-100">
            <div className="flex items-center font-semibold text-slate-700 text-sm">
              <div className="p-2 bg-white rounded-lg shadow-sm mr-3 text-slate-400"><Calendar className="w-4 h-4 text-brand-500" /></div>
              {dateStr}
            </div>
            <div className="flex items-center font-semibold text-slate-700 text-sm">
              <div className="p-2 bg-white rounded-lg shadow-sm mr-3 text-slate-400"><Clock className="w-4 h-4 text-brand-500" /></div>
              {timeStr}
            </div>
          </div>

          <div className="mt-auto flex justify-end gap-3 pt-2">
            {!isCompleted && !isCancelled && (
              <Button variant="outline" className="rounded-full shadow-sm hover:bg-brand-50 hover:text-brand-600 border-slate-200">
                <PlayCircle className="w-4 h-4 mr-2" /> Join Call
              </Button>
            )}
            {isCompleted && (
              <Button
                className="rounded-full shadow-md bg-amber-500 hover:bg-amber-600 text-white font-bold transition-transform"
                onClick={() => onReview(booking.tutorId)}>
                <Star className="w-4 h-4 mr-2 fill-white" /> Leave Feedback
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
