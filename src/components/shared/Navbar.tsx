'use client';

import Link from 'next/link';
import { useAuthStore } from '@/src/store/useAuthStore';
import { Button } from '../ui/Button';
import { LogOut, User as UserIcon, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout, isHydrated } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const renderLinks = () => {
    if (!isHydrated) return null;

    if (!user) {
      return (
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-bold text-brand-800/70 hover:text-brand-600 transition-colors">
            Log in
          </Link>
          <Link href="/register">
            <Button size="sm" className="rounded-full font-bold">Get Started</Button>
          </Link>
        </div>
      );
    }

    if (user.role === 'STUDENT') {
      return (
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="text-sm font-bold text-brand-800/70 hover:text-brand-600 transition-colors">Dashboard</Link>
          <Link href="/dashboard/profile" className="text-sm font-bold text-brand-800/70 hover:text-brand-600 transition-colors">Profile</Link>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-brand-800/70 hover:bg-brand-500/10 hover:text-brand-900 font-bold">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      );
    }

    if (user.role === 'TUTOR') {
      return (
        <div className="flex items-center gap-8">
          <Link href="/tutor/dashboard" className="text-sm font-bold text-brand-800/70 hover:text-brand-600 transition-colors">My Sessions</Link>
          <Link href="/tutor/availability" className="text-sm font-bold text-brand-800/70 hover:text-brand-600 transition-colors">Calendar</Link>
          <Link href="/tutor/profile">
            <Button variant="soft" size="sm" className="rounded-full font-bold">
              <UserIcon className="w-4 h-4 mr-2" /> Profile
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-brand-800/70 hover:bg-brand-500/10 hover:text-brand-900 font-bold">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      );
    }

    if (user.role === 'ADMIN') {
      return (
        <div className="flex items-center gap-8">
          <Link href="/admin" className="text-sm font-bold text-brand-800/70 hover:text-brand-600 transition-colors">Dashboard</Link>
          <Link href="/admin/users" className="text-sm font-bold text-brand-800/70 hover:text-brand-600 transition-colors">Users</Link>
          <Link href="/admin/bookings" className="text-sm font-bold text-brand-800/70 hover:text-brand-600 transition-colors">Bookings</Link>
          <Link href="/admin/categories" className="text-sm font-bold text-brand-800/70 hover:text-brand-600 transition-colors">Categories</Link>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-brand-800/70 hover:bg-brand-500/10 hover:text-brand-900 font-bold">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      );
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#F5FAE1]/80 backdrop-blur-md border-b border-brand-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-brand-600 text-white p-2 rounded-2xl shadow-lg shadow-brand-600/20 transition-all duration-300">
              <BookOpen className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-brand-900 group-hover:text-brand-600 transition-colors">PandaTutor</span>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {(!user || user?.role === 'STUDENT') && (
               <Link href="/tutors" className="text-sm font-bold text-brand-800/70 hover:text-brand-600 transition-colors tracking-wide">Browse</Link>
            )}
            {renderLinks()}
          </div>
        </div>
      </div>
    </nav>
  );
}
