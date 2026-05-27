import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Plus } from 'lucide-react';
import { AvailabilitySlot } from '@/src/types';
import { DAYS_OF_WEEK } from '../../hooks/useAvailability';

interface AddSlotFormProps {
  newSlot: AvailabilitySlot;
  setNewSlot: (slot: AvailabilitySlot) => void;
  onAdd: () => void;
}

export function AddSlotForm({ newSlot, setNewSlot, onAdd }: AddSlotFormProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-md border-slate-100 shadow-xl shadow-slate-200/40 rounded-3xl">
      <CardHeader className="border-b border-slate-100/50">
        <CardTitle className="px-4 py-6 text-xl font-black flex items-center text-slate-900">
          <Plus className="w-5 h-5 mr-3 text-accent-400 " />
          Add Availability Slot
        </CardTitle>
      </CardHeader>

      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-600 uppercase tracking-widest mb-2">
              Day
            </label>
            <select
              value={newSlot.dayOfWeek}
              onChange={(e) => setNewSlot({ ...newSlot, dayOfWeek: parseInt(e.target.value) })}
              className="w-full rounded-2xl border border-slate-200 p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
              {DAYS_OF_WEEK.map((day, index) => (
                <option key={index} value={index}>{day}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-600 uppercase tracking-widest mb-2">
              Start Time
            </label>
            <input
              type="time"
              value={newSlot.startTime}
              onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-600 uppercase tracking-widest mb-2">
              End Time
            </label>
            <input
              type="time"
              value={newSlot.endTime}
              onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={onAdd}
              className="w-full rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold">
              <Plus className="w-4 h-4 mr-2 text-accent-300" />
              Add Slot
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
