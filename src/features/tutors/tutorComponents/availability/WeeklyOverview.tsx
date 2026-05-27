import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Calendar } from 'lucide-react';
import { AvailabilitySlot } from '@/src/types';
import { DAYS_OF_WEEK } from '../../hooks/useAvailability';

interface WeeklyOverviewProps {
  availabilities: AvailabilitySlot[];
  formatTime: (time: string) => string;
}

export function WeeklyOverview({ availabilities, formatTime }: WeeklyOverviewProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-md border-slate-100 shadow-xl shadow-slate-200/40 rounded-3xl">
      <CardHeader className="border-b border-slate-100/50">
        <CardTitle className="px-10 py-6 text-xl font-black text-slate-900 flex items-center">
          <Calendar className="w-5 h-5 mr-3 text-accent-400" />
          Weekly Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {DAYS_OF_WEEK.map((day, dayIndex) => {
            const daySlots = availabilities.filter((slot) => slot.dayOfWeek === dayIndex);
            return (
              <div key={day} className="text-center">
                <h4 className="font-bold text-slate-900 mb-3">{day.slice(0, 3)}</h4>
                <div className="space-y-2">
                  {daySlots.length === 0 ? (
                    <div className="text-xs text-slate-400 py-2">No slots</div>
                  ) : (
                    daySlots.map((slot, index) => (
                      <div
                        key={index}
                        className="bg-brand-100 text-brand-700 text-xs font-bold py-1 px-2 rounded-lg"
                      >
                        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
