import { BookingsTableProps } from '@/src/types';
import { format } from 'date-fns';

export function BookingsTable({ bookings, isLoading }: BookingsTableProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-slate-100 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl border-2 border-dashed border-slate-200">
        <p className="text-slate-500">
          No students have booked you yet. Make sure your profile and availability are updated!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 uppercase font-semibold text-xs border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Date &amp; Time</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs">
                    {booking.student.name.charAt(0)}
                  </div>
                  {booking.student.name}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {format(new Date(booking.date), 'MMM dd, yyyy')}
                  <span className="text-slate-400 mx-1">•</span>
                  {format(new Date(booking.date), 'h:mm a')}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      booking.status === 'COMPLETED'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-brand-100 text-brand-700'
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
