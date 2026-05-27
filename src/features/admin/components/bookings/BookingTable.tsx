import {Card, CardContent, CardHeader,CardTitle,} from '@/src/components/ui/Card';
import { format } from 'date-fns';
import { Clock, BookOpen } from 'lucide-react';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'CONFIRMED':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';

    case 'COMPLETED':
      return 'bg-blue-100 text-blue-700 border-blue-200';

    case 'CANCELLED':
      return 'bg-red-100 text-red-700 border-red-200';

    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export const BookingTable = ({bookings,isLoading}: {bookings: any[]; isLoading: boolean;})=> {
  if (isLoading) {
    return (
      <div className="h-96 bg-white/50 border border-slate-100 rounded-3xl animate-pulse shadow-sm" />
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-md border-slate-100 shadow-xl rounded-3xl overflow-hidden">
      <CardHeader className="border-b border-slate-100/50">
        <CardTitle className="text-xl font-black text-brand-900 p-6">
          All Bookings
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        {bookings.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-slate-400" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">
              No bookings found
            </h3>

            <p className="text-slate-500">
              There are no bookings on the platform yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">
                    Student
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">
                    Tutor
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">
                    Date & Time
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">
                    Created
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {bookings.map((booking: any) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-700 mr-3">
                          {booking.student.name.charAt(0)}
                        </div>

                        <div>
                          <div className="font-semibold text-slate-900">
                            {booking.student.name}
                          </div>

                          <div className="text-xs text-slate-500">
                            {booking.student.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-brand-200 rounded-full flex items-center justify-center text-xs font-bold text-brand-700 mr-3">
                          {booking.tutor.name.charAt(0)}
                        </div>

                        <div>
                          <div className="font-semibold text-slate-900">
                            {booking.tutor.name}
                          </div>

                          <div className="text-xs text-slate-500">
                            {booking.tutor.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-slate-700">
                        <Clock className="w-4 h-4 mr-2 text-slate-400" />

                        {format(
                          new Date(booking.date),
                          'MMM dd, yyyy'
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                          booking.status
                        )}`}>
                        {booking.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {format(
                        new Date(booking.createdAt),
                        'MMM dd, yyyy'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};