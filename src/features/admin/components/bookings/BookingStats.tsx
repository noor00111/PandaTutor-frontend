import { Card, CardContent } from '@/src/components/ui/Card';
import {BookOpen,Calendar,TrendingUp,User} from 'lucide-react';

interface StatsProps {
  stats: {
    total: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
}

export const BookingStats = ({stats}: StatsProps) => {
  const cards = [
    {
      title: 'Total Bookings',
      value: stats.total,
      icon: <BookOpen className="w-6 h-6" />,
      // gradient: 'bg-gradient-to-br from-brand-700 to-brand-500',
    },

    {
      title: 'Confirmed',
      value: stats.confirmed,
      icon: <Calendar className="w-6 h-6" />,
      // gradient: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    },

    {
      title: 'Completed',
      value: stats.completed,
      icon: <TrendingUp className="w-6 h-6" />,
      // gradient: 'bg-gradient-to-br from-red-500 to-accent-400',
    },

    {
      title: 'Cancelled',
      value: stats.cancelled,
      icon: <User className="w-6 h-6" />,
      // gradient: 'bg-yellow-700',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card
          key={card.title}
          className='text-brand-500 border-0 shadow-lg rounded-3xl overflow-hidden'>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium mb-1">
                  {card.title}
                </p>

                <h3 className="text-3xl font-black">
                  {card.value}
                </h3>
              </div>

              <div className="text-accent-400 w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                {card.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};