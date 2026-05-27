import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { ProfileOverviewCardProps } from '@/src/types';
import { Mail } from 'lucide-react';

export function ProfileOverviewCard({ profile }: ProfileOverviewCardProps) {
  return (
    <Card className=" bg-accent-200/20 backdrop-blur-md border-slate-100 shadow-xl shadow-slate-200/40 rounded-3xl overflow-hidden">
      <CardHeader className=" text-white relative p-4">
        <div className="absolute inset-0 bg-brand-500/10" />
        <div className="relative z-10">
          <CardTitle className="text-2xl font-black flex items-center px-5 py-2">
            Profile Overview
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-linear-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center text-slate-700 font-black text-3xl shadow-lg">
            {profile?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 mb-1">{profile?.name}</h3>
            <p className="text-slate-500 font-medium flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              {profile?.email}
            </p>
            <div className="mt-2">
              <span className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm font-bold uppercase tracking-widest">
                {profile?.role}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
