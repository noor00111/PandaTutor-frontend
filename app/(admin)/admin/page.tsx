'use client';

import { Shield } from 'lucide-react';
import { BlobBackground } from '@/src/components/ui/BlobBackground';
import { AccessDenied } from '@/src/components/ui/AccessDenied';
import { useAuthStore } from '@/src/store/useAuthStore';
import { useAdminDashboard } from '@/src/features/admin/hooks/useAdminDashboard';
import Overview from '@/src/features/admin/components/dashboard/OverView';
import StatsCards from '@/src/features/admin/components/dashboard/StatsCards';

export default function AdminDashboardPage() {
  const { user } = useAuthStore();

  const { data: stats, isLoading } = useAdminDashboard();

  if (!user || user.role !== 'ADMIN') {
    return <AccessDenied role="ADMIN" />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 relative overflow-hidden">
      <BlobBackground />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-5xl font-black">
            Admin Dashboard
          </h1>

          <p className="flex items-center mt-2 text-slate-500">
            <Shield className="w-5 h-5 mr-2 text-accent-400" />
            Monitor and manage the platform
          </p>
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-8">
            <StatsCards stats={stats} />
            <Overview stats={stats} />
          </div>
        )}
      </div>
    </div>
  );
}