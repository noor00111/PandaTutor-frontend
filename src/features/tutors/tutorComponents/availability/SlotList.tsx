import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Calendar, Clock, Save, Trash2 } from 'lucide-react';
import { AvailabilitySlot } from '@/src/types';
import { DAYS_OF_WEEK } from '../../hooks/useAvailability';

interface SlotListProps {
  availabilities: AvailabilitySlot[];
  onRemove: (index: number) => void;
  onSave: () => void;
  isSaving: boolean;
  formatTime: (time: string) => string;
}

export function SlotList({ availabilities, onRemove, onSave, isSaving, formatTime }: SlotListProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-md border-slate-100 shadow-xl shadow-slate-200/40 rounded-3xl">
      <CardHeader className="border-b border-slate-100/50">
        <div className="flex justify-between items-center">
          <CardTitle className="px-8 py-6 text-xl font-black text-slate-900 flex items-center">
            <Clock className="w-5 h-5 mr-3 text-accent-400" />
            Current Availability ({availabilities.length} slots)
          </CardTitle>
          <Button
            onClick={onSave}
            className="rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-lg"
            isLoading={isSaving}
          >
            <Save className="w-4 h-4 mr-2 text-accent-300" />
            Save Changes
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        {availabilities.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No availability set</h3>
            <p className="text-slate-500">Add your first availability slot above to start accepting bookings.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {availabilities.map((slot, index) => (
                <motion.div
                  key={`${slot.dayOfWeek}-${slot.startTime}-${slot.endTime}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-brand-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{DAYS_OF_WEEK[slot.dayOfWeek]}</h4>
                      <p className="text-slate-600 text-sm">
                        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
