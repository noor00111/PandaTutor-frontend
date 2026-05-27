
import { api } from '@/src/lib/api';

export const getAdminDashboardStats = async () => {
  const [usersRes, bookingsRes, categoriesRes] = await Promise.all([
    api.get('/admin/users'),
    api.get('/admin/bookings'),
    api.get('/categories'),
  ]);

  const users = usersRes.data.data.users;
  const bookings = bookingsRes.data.data.bookings;
  const categories = categoriesRes.data.data.categories;

  return {
    totalUsers: users.length,
    activeUsers: users.filter((u: { isBanned?: boolean }) => !u.isBanned).length,
    bannedUsers: users.filter((u: { isBanned?: boolean }) => u.isBanned).length,

    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(
      (b: { status?: string }) => b.status === 'CONFIRMED').length,

    completedBookings: bookings.filter(
      (b: { status?: string }) => b.status === 'COMPLETED').length,

    totalCategories: categories.length,
    tutors: users.filter((u: { role?: string }) => u.role === 'TUTOR').length,
    students: users.filter((u: { role?: string }) => u.role === 'STUDENT').length,
  };
};