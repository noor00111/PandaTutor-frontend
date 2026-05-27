'use client';

import { useQuery } from '@tanstack/react-query';
import { getAdminDashboardStats } from '../services/adminDashboard.service';

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: getAdminDashboardStats,
  });
};