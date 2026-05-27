'use client';

import { Card, CardContent } from '@/src/components/ui/Card';
import {Users,BookOpen,TrendingUp, Shield} from 'lucide-react';



export default function StatsCards({ stats }: {stats: any}) {
  const cards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      },
    {
      title: 'Active Bookings',
      value: stats?.confirmedBookings || 0,
      icon: BookOpen,
    },
    {
      title: 'Tutors',
      value: stats?.tutors || 0,
      icon: TrendingUp,
    },
    {
      title: 'Categories',
      value: stats?.totalCategories || 0,
      icon: Shield,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className={`bg-linear-to-br bg-brand-50 border-0 shadow-lg rounded-3xl overflow-hidden`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium mb-1">{card.title}</p>
                  
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                </div>

                  <h3 className="text-3xl font-black">
                    {card.value}
                  </h3>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}