import { motion, AnimatePresence } from 'framer-motion';
import { CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Star } from 'lucide-react';
import { ReviewModalProps } from '@/src/types';


export function ReviewModal({open, rating, comment, isPending, onClose, onRating, onComment, onSubmit}: ReviewModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white/90 backdrop-blur-xl border border-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative">
 
            <div className="h-2 w-full bg-linear-to-r from-amber-400 to-orange-500" />
            <CardHeader className="bg-slate-50/50 border-b border-slate-100/50 pt-8 pb-6 px-8">
              <CardTitle className="text-2xl font-black text-slate-900 flex items-center">
                <div className="bg-amber-100 p-2 rounded-xl text-amber-500 mr-3">
                  <Star className="w-5 h-5 fill-amber-500" />
                </div>
                Rate Session
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-8 px-8 pb-8 space-y-6">
              <div>
                <label className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">
                  Overall Rating
                </label>
                <div className="flex gap-2 bg-slate-50 p-4 rounded-2xl justify-center border border-slate-100">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => onRating(star)}
                      type="button"
                      className="transform hover:scale-110 transition-transform">
                      <Star className={`w-10 h-10 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'} transition-colors duration-300 drop-shadow-sm`}/>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">
                  Feedback (optional)
                </label>
                <textarea
                  className="w-full h-36 rounded-2xl border border-slate-200 p-4 text-[15px] font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white shadow-inner resize-none"
                  placeholder="How was your tutor? Did they help you understand the material?"
                  value={comment}
                  onChange={(e) => onComment(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="ghost" className="rounded-xl font-bold hover:bg-slate-100" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  className="rounded-xl font-bold shadow-lg shadow-amber-500/25 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-none text-white h-11"
                  isLoading={isPending}
                  onClick={onSubmit}>
                  Submit Review
                </Button>
              </div>
            </CardContent>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
