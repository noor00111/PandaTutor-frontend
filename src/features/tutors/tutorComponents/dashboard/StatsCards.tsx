import { Card, CardContent } from '@/src/components/ui/Card';
import { BookOpen, Users } from 'lucide-react';

interface StatsCardsProps {
  upcomingCount: number;
  completedCount: number;
}

export function StatsCards({ upcomingCount, completedCount }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <Card className="bg-linear-to-br from-brand-500 to-brand-700 text-white border-0 shadow-lg">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <BookOpen className="w-8 h-8 text-accent-300" />
          </div>
          <div>
            <p className="text-emerald-100 font-medium mb-1">Upcoming Sessions</p>
            <h2 className="text-5xl font-bold">{upcomingCount}</h2>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-linear-to-br from-brand-500 to-brand-700 text-white border-0 shadow-lg">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Users className="w-8 h-8 text-accent-300" />
          </div>
          <div>
            <p className="text-emerald-100 font-medium mb-1">Completed Sessions</p>
            <h2 className="text-5xl font-bold">{completedCount}</h2>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
